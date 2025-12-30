import prisma from "../../utils/prisma.js";

export async function getActiveSessionByUserId(userId: number) {
  return await prisma.testSession.findFirst({
    where: {
      UserId: userId,
      CompletedAt: null,
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

export async function createTestSession(userId: number) {
  const distribution = {
    Aptitude: 10,
    Verbal: 5,
    Comprehension: 5,
    Core: 20,
    Programming: 10,
  };

  try {
    return await prisma.$transaction(async (tx) => {
      // Create the session
      const session = await tx.testSession.create({
        data: {
          UserId: userId,
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

