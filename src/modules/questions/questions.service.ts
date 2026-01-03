import prisma from "../../utils/prisma.js";
import type {
  QuestionUploadPayload,
  BulkQuestionUploadPayload,
} from "./questions.schema.ts";
import type { QuestionPayload } from "./questions.schema.ts";

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

export async function createTestSession(userId: number) {
  const distribution = {
    Aptitude: 10,
    Verbal: 5,
    Comprehension: 5,
    Core: 20,
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

        const questions = await tx.question.findMany({
          where: {
            category,
          },
          take: count,
        });

        console.log(`Found ${questions.length} questions for ${category}`);

        if (questions.length === 0) {
          throw new Error(`No questions found for category: ${category}`);
        }

        // Create session questions
        const sessionQuestions = questions.map((question, index) => ({
          sessionId: session.id,
          questionId: question.id,
          order: currentOrder + index,
        }));

        await tx.testSessionQuestion.createMany({
          data: sessionQuestions,
        });

        currentOrder += count;
      }

      // Fetch the complete session with questions
      const completeSession = await tx.testSession.findFirst({
        where: {
          id: session.id,
          UserId: userId,
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

      return completeSession;
    });
  } catch (error) {
    console.error("Error in createTestSession transaction:", error);
    throw error;
  }
}

export async function getTestSessionById(sessionId: number, userId: number) {
  return await prisma.testSession.findFirst({
    where: {
      id: sessionId,
      UserId: userId,
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

// Helper function to convert undefined to null for Prisma
// Helper function to convert undefined to null for Prisma
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
      // Handle comprehension type
      if (payload.type === "comprehension") {
        const createdComprehension = await tx.comprehension.create({
          data: {
            passage: payload.comprehension.passage,
          },
        });
        console.log("Comprehension created with ID:", createdComprehension.id);

        const createdQuestions = [];

        for (const questionData of payload.comprehension.questions) {
          // USE prepareQuestionData here
          const createdQuestion = await tx.question.create({
            data: prepareQuestionData({
              category: questionData.category,
              subCategory: questionData.subCategory,
              question: questionData.question,
              image: questionData.image,
              comprehensionId: createdComprehension.id,
              correctOptionId: questionData.correctOptionId,
            }),
          });
          console.log("Question created with ID:", createdQuestion.id);

          if (questionData.options && questionData.options.length > 0) {
            const options = questionData.options.map((option) => ({
              questionId: createdQuestion.id,
              text: option.text,
            }));

            await tx.option.createMany({
              data: options,
            });
            console.log("Options created for question:", createdQuestion.id);
          }

          createdQuestions.push(createdQuestion);
        }

        return {
          type: "comprehension" as const,
          comprehension: createdComprehension,
          questions: createdQuestions,
        };
      }
      // Handle regular question type
      else {
        // USE prepareQuestionData here
        const createdQuestion = await tx.question.create({
          data: prepareQuestionData({
            category: payload.category,
            subCategory: payload.subCategory,
            question: payload.question,
            image: payload.image,
            correctOptionId: payload.correctOptionId,
          }),
        });
        console.log("Question created with ID:", createdQuestion.id);

        if (payload.options && payload.options.length > 0) {
          const options = payload.options.map((option) => ({
            questionId: createdQuestion.id,
            text: option.text,
          }));

          await tx.option.createMany({
            data: options,
          });
          console.log("Options created for question:", createdQuestion.id);
        }

        return {
          type: "regular" as const,
          question: createdQuestion,
        };
      }
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
        if (questionPayload.type === "comprehension") {
          // Create comprehension
          const createdComprehension = await tx.comprehension.create({
            data: {
              passage: questionPayload.comprehension.passage,
            },
          });
          console.log(
            "Comprehension created with ID:",
            createdComprehension.id,
          );

          const createdQuestions = [];

          // Create all 5 questions for this comprehension
          for (const questionData of questionPayload.comprehension.questions) {
            const createdQuestion = await tx.question.create({
              data: prepareQuestionData({
                category: questionData.category,
                subCategory: questionData.subCategory,
                question: questionData.question,
                image: questionData.image,
                comprehensionId: createdComprehension.id,
                correctOptionId: questionData.correctOptionId,
              }),
            });

            // Create options
            if (questionData.options && questionData.options.length > 0) {
              const options = questionData.options.map((option) => ({
                questionId: createdQuestion.id,
                text: option.text,
              }));

              await tx.option.createMany({
                data: options,
              });
            }

            createdQuestions.push(createdQuestion);
          }

          results.push({
            type: "comprehension" as const,
            comprehension: createdComprehension,
            questions: createdQuestions,
          });
        } else {
          // Create regular question
          const createdQuestion = await tx.question.create({
            data: prepareQuestionData({
              category: questionPayload.category,
              subCategory: questionPayload.subCategory,
              question: questionPayload.question,
              image: questionPayload.image,
              correctOptionId: questionPayload.correctOptionId,
            }),
          });

          // Create options
          if (questionPayload.options && questionPayload.options.length > 0) {
            const options = questionPayload.options.map((option) => ({
              questionId: createdQuestion.id,
              text: option.text,
            }));

            await tx.option.createMany({
              data: options,
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
