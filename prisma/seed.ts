import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!, // ensure this is set
});

const prisma = new PrismaClient({ adapter });
async function main() {
  // ----- Users -----
  const user = await prisma.user.create({
    data: {
      email: "student@svce.ac.in",
      name: "John Doe",
      role: "STUDENT",
    },
  });

  // ----- Comprehension -----
  const comp1 = await prisma.comprehension.create({
    data: {
      passage:
        "This is a sample comprehension passage about technology and learning.",
      questions: {
        create: [
          {
            category: "Comprehension",
            question: "What is the main topic of the passage?",
            options: {
              create: [
                { text: "Technology" },
                { text: "Cooking" },
                { text: "Sports" },
                { text: "Music" },
              ],
            },
            correctOptionId: 1,
          },
          {
            category: "Comprehension",
            question: "Which skill is emphasized?",
            options: {
              create: [
                { text: "Learning" },
                { text: "Sleeping" },
                { text: "Running" },
                { text: "Singing" },
              ],
            },
            correctOptionId: 1,
          },
        ],
      },
    },
  });

  // ----- Questions -----
  await prisma.question.createMany({
    data: [
      {
        category: "Aptitude",
        question: "What is 2 + 2?",
        correctOptionId: 1,
      },
      {
        category: "Aptitude",
        question: "What is 5 * 3?",
        correctOptionId: 1,
      },
      {
        category: "Verbal",
        question: "Choose the synonym of 'Happy'.",
        correctOptionId: 1,
      },
      {
        category: "Core",
        question: "What is a stack in computer science?",
        correctOptionId: 1,
      },
      {
        category: "Programming",
        question: "Which keyword declares a variable in JavaScript?",
        correctOptionId: 1,
      },
    ],
  });

  // ----- Options for the non-comprehension questions -----
  const questions = await prisma.question.findMany({
    where: { category: { not: "Comprehension" } },
  });

  for (const q of questions) {
    await prisma.option.createMany({
      data: [
        { questionId: q.id, text: "Option 1" },
        { questionId: q.id, text: "Option 2" },
        { questionId: q.id, text: "Option 3" },
        { questionId: q.id, text: "Option 4" },
      ],
    });
  }

  console.log("Seed data created successfully!");
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
