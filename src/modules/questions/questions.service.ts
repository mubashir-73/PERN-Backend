import prisma from "../../utils/prisma.js";
import type {
  QuestionUploadPayload,
  BulkQuestionUploadPayload,
} from "./questions.schema.ts";
import type { QuestionPayload } from "./questions.schema.ts";

function shuffleArray<T>(array: readonly T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = shuffled[i] as T;
    shuffled[i] = shuffled[j] as T;
    shuffled[j] = temp;
  }
  return shuffled;
}

export async function getActiveSessionByUserId(userId: number) {
  return await prisma.testSession.findFirst({
    where: {
      UserId: userId,
      ExpiresAt: {
        gt: new Date(), // Greater than current time (not expired)
      },
    },
    include: {
      questions: {
        include: {
          question: true,
        },
        orderBy: {
          order: "asc",
        },
      },
    },
  });
}

//Check for an active session conflict or User is already done with their session
export async function checkForActiveSessionConflict(userId: number) {
  try {
    const activeSession = await prisma.testSession.findFirst({
      where: {
        UserId: userId,
        CompletedAt: null, // Session is not completed
        ExpiresAt: {
          gt: new Date(), // AND not expired
        },
      },
    });

    return activeSession;
  } catch (error) {
    console.error("Error checking for active session conflict:", error);
    return null;
  }
}

export async function alreadyCompletedSession(userId: number) {
  const session = await prisma.testSession.findFirst({
    where: {
      UserId: userId,
    },
    select: {
      id: true,
    },
  });

  return !!session; // true if exists, false if not
}

export async function createTestSession(userId: number, dept: string) {
  const distribution = {
    Aptitude: 10,
    Verbal: 5,
    Comprehension: 5,
    [dept]: 20,
    Programming: 10,
  };

  try {
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 3);

    return await prisma.$transaction(async (tx) => {
      // Create the session
      const session = await tx.testSession.create({
        data: {
          UserId: userId,
          ExpiresAt: expiresAt,
        },
      });

      console.log("Test session created with ID:", session.id);

      let currentOrder = 1;

      for (const [category, count] of Object.entries(distribution)) {
        console.log(`Fetching ${count} questions for category: ${category}`);

        let selectedQuestions;

        // Special handling for Comprehension
        if (category === "Comprehension") {
          // Get one random comprehension with at least 5 questions
          const comprehensions = await tx.comprehension.findMany({
            include: {
              questions: true,
            },
          });

          // Filter comprehensions that have enough questions
          const validComprehensions = comprehensions.filter(
            (c: { id: number; passage: string; questions: any[] }) =>
              c.questions.length >= count,
          );

          if (validComprehensions.length === 0) {
            throw new Error(
              `No comprehension passages with at least ${count} questions found`,
            );
          }

          // Pick one random comprehension
          const randomComp = validComprehensions[
            Math.floor(Math.random() * validComprehensions.length)
          ] as { id: number; passage: string; questions: any[] };

          console.log(
            `Selected comprehension ID: ${randomComp.id} with ${randomComp.questions.length} questions`,
          );

          // Shuffle and take required count
          selectedQuestions = shuffleArray(randomComp.questions).slice(
            0,
            count,
          );
        } else {
          // Regular questions - fetch all, shuffle, take count
          const allQuestions = await tx.question.findMany({
            where: {
              category,
              comprehensionId: null, // Exclude comprehension questions
            },
          });

          if (allQuestions.length === 0) {
            throw new Error(`No questions found for category: ${category}`);
          }

          selectedQuestions = shuffleArray(allQuestions).slice(0, count);
        }

        console.log(
          `Selected ${selectedQuestions.length} questions for ${category}`,
        );

        // Create session questions
        const sessionQuestions = selectedQuestions.map((question, index) => ({
          sessionId: session.id,
          questionId: question.id,
          order: currentOrder + index,
        }));

        await tx.testSessionQuestion.createMany({
          data: sessionQuestions,
        });

        currentOrder += selectedQuestions.length;
      }

      // Fetch the complete session with questions, options, and comprehension
      const completeSession = await tx.testSession.findFirst({
        where: {
          id: session.id,
          UserId: userId,
        },
        include: {
          questions: {
            include: {
              question: {
                include: {
                  options: {
                    select: {
                      id: true,
                      text: true,
                      // IMPORTANT: Do NOT include isCorrect
                    },
                  },
                  comprehension: {
                    select: {
                      id: true,
                      passage: true,
                    },
                  },
                },
              },
            },
            orderBy: {
              order: "asc",
            },
          },
        },
      });

      if (!completeSession) {
        throw new Error("Failed to fetch complete session");
      }

      // Transform the data
      const transformedSession = {
        sessionId: completeSession.id,
        userId: completeSession.UserId,
        startedAt: completeSession.StartedAt,
        expiresAt: completeSession.ExpiresAt,
        questions: completeSession.questions.map((sq) => {
          const question = sq.question;

          const transformedQuestion: {
            id: number;
            category: string;
            subCategory: string | null;
            question: string;
            image: string | null;
            options: Array<{ id: number; text: string }>;
            type: string;
            passage?: string;
            comprehensionId?: number;
          } = {
            id: question.id,
            category: question.category,
            subCategory: question.subCategory,
            question: question.question,
            image: question.image || null,
            options: question.options.map((opt) => ({
              id: opt.id,
              text: opt.text,
            })),
            type: question.comprehensionId ? "comprehension" : "regular",
          };

          // Add comprehension passage if exists
          if (question.comprehension) {
            transformedQuestion.passage = question.comprehension.passage;
            transformedQuestion.comprehensionId = question.comprehension.id;
          }

          return transformedQuestion;
        }),
      };

      return transformedSession;
    });
  } catch (error) {
    console.error("Error in createTestSession transaction:", error);
    throw error;
  }
}
export async function getTestSessionById(sessionId: number, userId: number) {
  return await prisma.$transaction(async (tx) => {
    const completeSession = await tx.testSession.findFirst({
      where: {
        id: sessionId,
        UserId: userId,
      },
      include: {
        questions: {
          include: {
            question: {
              include: {
                options: {
                  select: {
                    id: true,
                    text: true,
                  },
                },
                comprehension: {
                  select: {
                    id: true,
                    passage: true,
                  },
                },
              },
            },
          },
          orderBy: {
            order: "asc",
          },
        },
      },
    });

    if (!completeSession) {
      throw new Error("Test session not found or access denied");
    }

    // 🔥 Same transformation logic as createTestSession
    const transformedSession = {
      sessionId: completeSession.id,
      userId: completeSession.UserId,
      startedAt: completeSession.StartedAt,
      expiresAt: completeSession.ExpiresAt,
      questions: completeSession.questions.map((sq) => {
        const question = sq.question;

        const transformedQuestion: any = {
          id: question.id,
          category: question.category,
          subCategory: question.subCategory,
          question: question.question,
          image: question.image || null,
          options: question.options.map((opt) => ({
            id: opt.id,
            text: opt.text,
          })),
          type: question.comprehensionId ? "comprehension" : "regular",
        };

        if (question.comprehension) {
          transformedQuestion.passage = question.comprehension.passage;
          transformedQuestion.comprehensionId = question.comprehension.id;
        }

        return transformedQuestion;
      }),
    };

    return transformedSession;
  });
}

function prepareQuestionData(data: {
  category: string;
  subCategory: string | undefined; // Match the actual type being passed
  question: string;
  image: string | undefined; // Match the actual type being passed
  comprehensionId?: number;
  correctOptionId: number;
}): {
  category: string;
  subCategory: string | null;
  question: string;
  image: string | null;
  comprehensionId: number | null;
  correctOptionId: number;
} {
  return {
    category: data.category,
    subCategory: data.subCategory ?? null,
    question: data.question,
    image: data.image ?? null,
    comprehensionId: data.comprehensionId ?? null,
    correctOptionId: data.correctOptionId,
  };
}

export async function InsertQuestion(payload: QuestionUploadPayload) {
  try {
    return await prisma.$transaction(async (tx) => {
      // ─────────────────────────────────────────────
      // COMPREHENSION QUESTIONS
      // ─────────────────────────────────────────────
      if (payload.type === "comprehension") {
        const createdComprehension = await tx.comprehension.create({
          data: {
            passage: payload.comprehension.passage,
          },
        });

        const createdQuestions = [];

        for (const questionData of payload.comprehension.questions) {
          // 1. Create question (NO correctOptionId)
          const createdQuestion = await tx.question.create({
            data: {
              category: questionData.category,
              subCategory: questionData.subCategory ?? null,
              question: questionData.question,
              image: questionData.image ?? null,
              comprehensionId: createdComprehension.id,
            },
          });

          // 2. Create options with isCorrect
          if (questionData.options?.length) {
            await tx.option.createMany({
              data: questionData.options.map((option, index) => ({
                questionId: createdQuestion.id,
                text: option.text,
                isCorrect: index === questionData.correctOptionId, //TODO: Only when sending data from frontend include this
              })),
            });
          }

          createdQuestions.push(createdQuestion);
        }

        return {
          type: "comprehension" as const,
          comprehension: createdComprehension,
          questions: createdQuestions,
        };
      }

      // ─────────────────────────────────────────────
      // REGULAR QUESTION
      // ─────────────────────────────────────────────
      const createdQuestion = await tx.question.create({
        data: {
          category: payload.category,
          subCategory: payload.subCategory ?? null,
          question: payload.question,
          image: payload.image ?? null,
        },
      });

      if (payload.options?.length) {
        await tx.option.createMany({
          data: payload.options.map((option, index) => ({
            questionId: createdQuestion.id,
            text: option.text,
            isCorrect: index === payload.correctOptionId, // ✅ FIX
          })),
        });
      }

      return {
        type: "regular" as const,
        question: createdQuestion,
      };
    });
  } catch (error) {
    console.error("Error inserting question:", error);
    throw error;
  }
}

export async function InsertBulkQuestions(payload: BulkQuestionUploadPayload) {
  try {
    return await prisma.$transaction(async (tx) => {
      const results = [];

      for (const questionPayload of payload.questions) {
        // ─────────────────────────────────────────────
        // COMPREHENSION
        // ─────────────────────────────────────────────
        if (questionPayload.type === "comprehension") {
          const createdComprehension = await tx.comprehension.create({
            data: {
              passage: questionPayload.comprehension.passage,
            },
          });

          const createdQuestions = [];

          for (const questionData of questionPayload.comprehension.questions) {
            const createdQuestion = await tx.question.create({
              data: {
                category: questionData.category,
                subCategory: questionData.subCategory ?? null,
                question: questionData.question,
                image: questionData.image ?? null,
                comprehensionId: createdComprehension.id,
              },
            });

            if (questionData.options?.length) {
              await tx.option.createMany({
                data: questionData.options.map((option, index) => ({
                  questionId: createdQuestion.id,
                  text: option.text,
                  isCorrect: index === questionData.correctOptionId, // ✅ FIX
                })),
              });
            }

            createdQuestions.push(createdQuestion);
          }

          results.push({
            type: "comprehension" as const,
            comprehension: createdComprehension,
            questions: createdQuestions,
          });
        }

        // ─────────────────────────────────────────────
        // REGULAR
        // ─────────────────────────────────────────────
        else {
          const createdQuestion = await tx.question.create({
            data: {
              category: questionPayload.category,
              subCategory: questionPayload.subCategory ?? null,
              question: questionPayload.question,
              image: questionPayload.image ?? null,
            },
          });

          if (questionPayload.options?.length) {
            await tx.option.createMany({
              data: questionPayload.options.map((option, index) => ({
                questionId: createdQuestion.id,
                text: option.text,
                isCorrect: index === questionPayload.correctOptionId, // ✅ FIX
              })),
            });
          }

          results.push({
            type: "regular" as const,
            question: createdQuestion,
          });
        }
      }

      return results;
    });
  } catch (error) {
    console.error("Error bulk inserting questions:", error);
    throw error;
  }
}

export async function deleteTestSession(userId: number) {
  try {
    return await prisma.$transaction(async (tx) => {
      // 1. Get ALL sessions for the user (edge-case safe)
      const sessions = await tx.testSession.findMany({
        where: { UserId: userId },
        select: { id: true },
      });

      if (sessions.length === 0) {
        return { deletedSessions: 0 };
      }

      const sessionIds = sessions.map((s) => s.id);

      // 2. Delete answers (not a Prisma relation but FK-dependent logically)
      await tx.answer.deleteMany({
        where: { sessionId: { in: sessionIds } },
      });

      // 3. Delete session-question mappings
      await tx.testSessionQuestion.deleteMany({
        where: { sessionId: { in: sessionIds } },
      });

      // 4. Delete results
      await tx.result.deleteMany({
        where: { sessionId: { in: sessionIds } },
      });

      // 5. Finally delete the sessions
      const deleted = await tx.testSession.deleteMany({
        where: { id: { in: sessionIds } },
      });

      return {
        deletedSessions: deleted.count,
      };
    });
  } catch (error) {
    console.error("Error deleting test sessions:", error);
    throw error;
  }
}
