import type { SubmitAnswersPayload } from "./results.schema.ts";
import prisma from "../../utils/prisma.js";

export async function submitAnswersAndCalculateResult(
  payload: SubmitAnswersPayload,
  userId: number,
) {
  try {
    return await prisma.$transaction(async (tx) => {
      // 1. Verify the session belongs to the user and is not completed
      const session = await tx.testSession.findFirst({
        where: {
          id: payload.sessionId,
          UserId: userId,
          CompletedAt: null, // Not already completed
          ExpiresAt: {
            gt: new Date(), // Not expired
          },
        },
        include: {
          questions: {
            include: {
              question: {
                include: {
                  options: true,
                },
              },
            },
          },
        },
      });

      if (!session) {
        throw new Error("Session not found, already completed, or expired");
      }

      // 2. Check if result already exists
      const existingResult = await tx.result.findUnique({
        where: { sessionId: payload.sessionId },
      });

      if (existingResult) {
        throw new Error("Answers already submitted for this session");
      }

      // 3. Initialize score tracking
      const scores = {
        aptitude: { correct: 0, total: 0 },
        core: { correct: 0, total: 0 },
        verbal: { correct: 0, total: 0 },
        programming: { correct: 0, total: 0 },
        comprehension: { correct: 0, total: 0 },
      };

      // 4. Process each answer
      const answersToInsert = [];

      for (const answer of payload.answers) {
        const sessionQuestion = session.questions.find(
          (sq) => sq.questionId === answer.questionId,
        );

        if (!sessionQuestion) {
          throw new Error(`Question ${answer.questionId} not in this session`);
        }

        const question = sessionQuestion.question;
        const isCorrect = question.correctOptionId === answer.optionId;

        // Track scores by category
        const category = question.category.toLowerCase();
        if (scores[category as keyof typeof scores]) {
          scores[category as keyof typeof scores].total++;
          if (isCorrect) {
            scores[category as keyof typeof scores].correct++;
          }
        }

        // Prepare answer for insertion
        answersToInsert.push({
          sessionId: payload.sessionId,
          questionId: answer.questionId,
          optionId: answer.optionId,
          isCorrect,
        });
      }

      // 5. Insert all answers
      await tx.answer.createMany({
        data: answersToInsert,
      });

      // 6. Calculate total points (each correct answer = 1 point)
      const totalPoints =
        scores.aptitude.correct +
        scores.core.correct +
        scores.verbal.correct +
        scores.programming.correct +
        scores.comprehension.correct;

      // 7. Create result
      const result = await tx.result.create({
        data: {
          userId,
          sessionId: payload.sessionId,
          totalPoints,
          aptitude: scores.aptitude.correct,
          core: scores.core.correct,
          verbal: scores.verbal.correct,
          programming: scores.programming.correct,
          comprehension: scores.comprehension.correct,
        },
      });

      // 8. Mark session as completed
      await tx.testSession.update({
        where: { id: payload.sessionId },
        data: { CompletedAt: new Date() },
      });

      return {
        result,
        breakdown: scores,
        answersSubmitted: answersToInsert.length,
      };
    });
  } catch (error) {
    console.error("Error submitting answers:", error);
    throw error;
  }
}

// Get result for a specific session
export async function getResultBySessionId(sessionId: number, userId: number) {
  return await prisma.result.findFirst({
    where: {
      sessionId,
      userId,
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          regNo: true,
          dept: true,
        },
      },
      session: {
        select: {
          id: true,
          StartedAt: true,
          CompletedAt: true,
        },
      },
    },
  });
}

// Get all results for a user
export async function getAllResultsByUserId(userId: number) {
  return await prisma.result.findMany({
    where: { userId },
    include: {
      session: {
        select: {
          id: true,
          StartedAt: true,
          CompletedAt: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

// Get detailed results with answers (for review)
export async function getDetailedResultBySessionId(
  sessionId: number,
  userId: number,
) {
  const result = await prisma.result.findFirst({
    where: {
      sessionId,
      userId,
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          regNo: true,
          dept: true,
        },
      },
    },
  });

  if (!result) {
    return null;
  }

  // Get all answers with question details
  const answers = await prisma.answer.findMany({
    where: { sessionId },
    include: {
      // You'll need to add relations to Answer model for this
    },
  });

  return {
    result,
    answers,
  };
}
