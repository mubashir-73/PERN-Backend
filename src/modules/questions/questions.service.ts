import prisma from "../../utils/prisma.js";

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
