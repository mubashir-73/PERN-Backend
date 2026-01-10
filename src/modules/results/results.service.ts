import type { SubmitAnswersPayload } from "./results.schema.ts";
import prisma from "../../utils/prisma.js";

export async function submitAnswersAndCalculateResult(
  payload: SubmitAnswersPayload,
  userId: number,
  dept: string,
) {
  try {
    const CORE_CATEGORIES = ["CS", "IT", "EE"];

    function resolveScoreBucket(category: string, dept: string) {
      const normalized = category.toUpperCase();

      if (CORE_CATEGORIES.includes(normalized)) {
        return "core";
      }

      return normalized.toLowerCase();
    }

    return await prisma.$transaction(async (tx) => {
      // 1. Verify the session
      const session = await tx.testSession.findFirst({
        where: {
          id: payload.sessionId,
          UserId: userId,
          CompletedAt: null,
          ExpiresAt: { gt: new Date() },
        },
        include: {
          questions: {
            include: {
              question: {
                include: {
                  options: true, // contains isCorrect
                },
              },
            },
          },
        },
      });

      if (!session) {
        throw new Error("Session not found, already completed, or expired");
      }

      // 2. Prevent resubmission
      const existingResult = await tx.result.findUnique({
        where: { sessionId: payload.sessionId },
      });

      if (existingResult) {
        throw new Error("Answers already submitted for this session");
      }

      // 3. Score buckets
      const scores = {
        aptitude: { correct: 0, total: 0 },
        core: { correct: 0, total: 0 },
        verbal: { correct: 0, total: 0 },
        programming: { correct: 0, total: 0 },
        comprehension: { correct: 0, total: 0 },
      };

      const answersToInsert = [];

      // 4. Process answers
      for (const answer of payload.answers) {
        const sessionQuestion = session.questions.find(
          (sq) => sq.questionId === answer.questionId,
        );

        if (!sessionQuestion) {
          throw new Error(
            `Question ${answer.questionId} not part of this session`,
          );
        }

        const question = sessionQuestion.question;

        // 🔑 Find selected option
        const selectedOption = question.options.find(
          (opt) => opt.id === answer.optionId,
        );

        if (!selectedOption) {
          throw new Error(
            `Invalid option ${answer.optionId} for question ${question.id}`,
          );
        }

        const isCorrect = selectedOption.isCorrect === true;

        // 5. Category scoring

        const bucket = resolveScoreBucket(question.category, dept);

        if (scores[bucket as keyof typeof scores]) {
          scores[bucket as keyof typeof scores].total++;
          if (isCorrect) {
            scores[bucket as keyof typeof scores].correct++;
          }
        }

        // 6. Save answer
        answersToInsert.push({
          sessionId: payload.sessionId,
          questionId: answer.questionId,
          optionId: answer.optionId,
          isCorrect,
        });
      }

      // 7. Insert answers
      await tx.answer.createMany({
        data: answersToInsert,
      });

      // 8. Total points
      const totalPoints =
        scores.aptitude.correct +
        scores.core.correct +
        scores.verbal.correct +
        scores.programming.correct +
        scores.comprehension.correct;

      // 9. Create result
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

      // 10. Close session
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
