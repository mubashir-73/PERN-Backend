import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcrypt";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("🌱 Seeding database...");

  const hashedPassword = await bcrypt.hash("forese2026@Mocks",10);
  await prisma.user.create({
	data:{
	email:"admin@forese.co.in",
	name:"foreseadmin",
	password:hashedPassword,
	role:"ADMIN",
	}
  })
 await prisma.user.create({
	data:{
	email:"builder@forese.co.in",
	name:"Builder",
	password:hashedPassword,
	role:"BUILDER",
	}
  })
  // ==============================
  // COMPREHENSION PASSAGES
  // ==============================
  await prisma.comprehension.create({
    data: {
      passage:
        "Artificial intelligence (AI) is transforming the way we live and work. From virtual assistants that help us manage our daily schedules to sophisticated algorithms that power recommendation systems, AI has become an integral part of modern technology.",
      questions: {
        create: [
          {
            category: "Comprehension",
            question: "What is the main topic of this passage?",
            options: {
              create: [
                { text: "Virtual assistants" },
                { text: "Artificial intelligence", isCorrect: true },
                { text: "Healthcare technology" },
                { text: "Transportation systems" },
              ],
            },
          },
          {
            category: "Comprehension",
            question:
              "According to the passage, what enables computers to learn from data?",
            options: {
              create: [
                { text: "Explicit programming" },
                { text: "Virtual assistance" },
                { text: "Machine learning", isCorrect: true },
                { text: "Algorithm design" },
              ],
            },
          },
          {
            category: "Comprehension",
            question:
              "Which industry is mentioned as benefiting from AI in disease diagnosis?",
            options: {
              create: [
                { text: "Transportation" },
                { text: "Entertainment" },
                { text: "Healthcare", isCorrect: true },
                { text: "Education" },
              ],
            },
          },
          {
            category: "Comprehension",
            question: "What concern does the passage raise about AI?",
            options: {
              create: [
                { text: "Cost of implementation" },
                { text: "Privacy and ethics", isCorrect: true },
                { text: "Technical complexity" },
                { text: "User adoption" },
              ],
            },
          },
          {
            category: "Comprehension",
            question: "What promise do self-driving vehicles offer?",
            options: {
              create: [
                { text: "Lower fuel costs" },
                { text: "Reduced accidents", isCorrect: true },
                { text: "Faster travel" },
                { text: "More comfort" },
              ],
            },
          },
        ],
      },
    },
  });

  // ==============================
  // REGULAR QUESTIONS
  // ==============================
  const regularQuestions = [
    {
      category: "Aptitude",
      question: "What is 25% of 200?",
      correctOptionId: 2,
      options: ["25", "50", "75", "100"],
    },
    {
      category: "Aptitude",
      question: "If a train travels 60 km in 1.5 hours, what is its speed?",
      correctOptionId: 2,
      options: ["30 km/h", "40 km/h", "45 km/h", "50 km/h"],
    },
    {
      category: "Aptitude",
      question: "What is the average of 10, 20, 30, 40?",
      correctOptionId: 3,
      options: ["20", "22.5", "25", "30"],
    },
    {
      category: "Aptitude",
      question:
        "If the ratio of boys to girls is 3:2 and there are 30 boys, how many girls are there?",
      correctOptionId: 2,
      options: ["15", "20", "25", "30"],
    },
    {
      category: "Aptitude",
      question:
        "What is the simple interest on ₹1000 at 10% per annum for 2 years?",
      correctOptionId: 2,
      options: ["₹100", "₹200", "₹250", "₹300"],
    },
    {
      category: "Aptitude",
      question: "Which number is divisible by 9?",
      correctOptionId: 3,
      options: ["2341", "4521", "729", "1001"],
    },
    {
      category: "Aptitude",
      question: "If x = 5, what is the value of 2x²?",
      correctOptionId: 3,
      options: ["25", "40", "50", "60"],
    },
    {
      category: "Aptitude",
      question: "What is the next number in the series: 2, 4, 8, 16, ?",
      correctOptionId: 3,
      options: ["18", "24", "32", "64"],
    },
    {
      category: "Aptitude",
      question: "What is 15 + 27?",
      correctOptionId: 2,
      options: ["58", "42", "68", "48"],
    },
    {
      category: "Aptitude",
      question: "What is the square root of 169?",
      correctOptionId: 2,
      options: ["24", "13", "16", "8"],
    },
    {
      category: "Verbal",
      question: "Choose the synonym of 'eloquent'.",
      correctOptionId: 2,
      options: ["Silent", "Articulate", "Confused", "Quiet"],
    },
    {
      category: "Verbal",
      question: "Choose the antonym of 'abundant'.",
      correctOptionId: 2,
      options: ["Plentiful", "Scarce", "Ample", "Excessive"],
    },
    {
      category: "Verbal",
      question: "Choose the correctly spelled word.",
      correctOptionId: 3,
      options: ["Definately", "Definetly", "Definitely", "Definatly"],
    },
    {
      category: "Verbal",
      question: "Choose the synonym of 'meticulous'.",
      correctOptionId: 2,
      options: ["Careless", "Thorough", "Lazy", "Quick"],
    },
    {
      category: "Verbal",
      question: "Fill in the blank: She is good ___ mathematics.",
      correctOptionId: 2,
      options: ["in", "at", "on", "for"],
    },
    {
      category: "Verbal",
      question: "Choose the antonym of 'transparent'.",
      correctOptionId: 3,
      options: ["Clear", "Visible", "Opaque", "Bright"],
    },
    {
      category: "Verbal",
      question: "Choose the synonym of 'brief'.",
      correctOptionId: 2,
      options: ["Long", "Short", "Detailed", "Extended"],
    },
    {
      category: "Verbal",
      question: "Identify the correct sentence.",
      correctOptionId: 3,
      options: [
        "She don’t like coffee.",
        "She didn’t liked coffee.",
        "She doesn’t like coffee.",
        "She not like coffee.",
      ],
    },
    {
      category: "Verbal",
      question: "Choose the antonym of 'expand'.",
      correctOptionId: 2,
      options: ["Increase", "Contract", "Grow", "Develop"],
    },
    {
      category: "Verbal",
      question: "Choose the correct passive voice: 'He wrote a letter.'",
      correctOptionId: 2,
      options: [
        "A letter was writing by him.",
        "A letter was written by him.",
        "A letter is written by him.",
        "A letter has written by him.",
      ],
    },
    {
      category: "CS",
      question: "What is the time complexity of binary search?",
      correctOptionId: 2,
      options: ["O(n)", "O(log n)", "O(n²)", "O(1)"],
    },
    {
      category: "CS",
      question: "Which data structure uses FIFO principle?",
      correctOptionId: 2,
      options: ["Stack", "Queue", "Tree", "Graph"],
    },
    {
      category: "CS",
      question: "What does RAM stand for?",
      correctOptionId: 1,
      options: [
        "Random Access Memory",
        "Read Access Memory",
        "Rapid Access Memory",
        "Run Access Memory",
      ],
    },
    {
      category: "CS",
      question:
        "Which sorting algorithm has the best average-case time complexity?",
      correctOptionId: 2,
      options: [
        "Bubble Sort",
        "Merge Sort",
        "Selection Sort",
        "Insertion Sort",
      ],
    },
    {
      category: "CS",
      question: "Which of the following is NOT an operating system?",
      correctOptionId: 3,
      options: ["Linux", "Windows", "Oracle", "macOS"],
    },
    {
      category: "CS",
      question: "What is the worst-case time complexity of linear search?",
      correctOptionId: 1,
      options: ["O(n)", "O(log n)", "O(n log n)", "O(1)"],
    },
    {
      category: "CS",
      question: "Which data structure is used for recursion?",
      correctOptionId: 2,
      options: ["Queue", "Stack", "Array", "Linked List"],
    },
    {
      category: "CS",
      question: "Which protocol is used to send emails?",
      correctOptionId: 3,
      options: ["HTTP", "FTP", "SMTP", "SNMP"],
    },
    {
      category: "CS",
      question: "Which of the following is a non-linear data structure?",
      correctOptionId: 4,
      options: ["Array", "Stack", "Queue", "Tree"],
    },
    {
      category: "CS",
      question: "What does CPU stand for?",
      correctOptionId: 1,
      options: [
        "Central Processing Unit",
        "Computer Processing Unit",
        "Central Programming Unit",
        "Core Processing Unit",
      ],
    },
    {
      category: "CS",
      question: "Which algorithm is used to find the shortest path in a graph?",
      correctOptionId: 2,
      options: [
        "Depth First Search",
        "Dijkstra's Algorithm",
        "Binary Search",
        "Bubble Sort",
      ],
    },
    {
      category: "CS",
      question: "Which memory is volatile?",
      correctOptionId: 2,
      options: ["ROM", "RAM", "Hard Disk", "SSD"],
    },
    {
      category: "CS",
      question:
        "Which of the following is used to uniquely identify a node on a network?",
      correctOptionId: 3,
      options: ["URL", "Domain Name", "IP Address", "MAC Protocol"],
    },
    {
      category: "CS",
      question: "What is the default port number for HTTP?",
      correctOptionId: 2,
      options: ["21", "80", "443", "8080"],
    },
    {
      category: "CS",
      question:
        "Which data structure is best suited for implementing priority queues?",
      correctOptionId: 3,
      options: ["Array", "Linked List", "Heap", "Stack"],
    },
    {
      category: "CS",
      question: "Which SQL command is used to remove all records from a table?",
      correctOptionId: 3,
      options: ["REMOVE", "DELETE *", "TRUNCATE", "DROP"],
    },
    {
      category: "CS",
      question: "Which of the following is NOT a programming paradigm?",
      correctOptionId: 4,
      options: ["Object-Oriented", "Functional", "Procedural", "Compilation"],
    },
    {
      category: "CS",
      question: "Which layer of the OSI model is responsible for routing?",
      correctOptionId: 3,
      options: ["Transport", "Session", "Network", "Data Link"],
    },
    {
      category: "CS",
      question: "Which of the following is a primary key constraint?",
      correctOptionId: 1,
      options: [
        "Uniquely identifies each record",
        "Allows duplicate values",
        "Can be NULL",
        "Stores multiple values",
      ],
    },
    {
      category: "CS",
      question:
        "What is the time complexity of accessing an element in an array by index?",
      correctOptionId: 4,
      options: ["O(n)", "O(log n)", "O(n log n)", "O(1)"],
    },
    {
      category: "Programming",
      question: "Which keyword declares a constant in JavaScript?",
      correctOptionId: 3,
      options: ["var", "let", "const", "static"],
    },
    {
      category: "Programming",
      question:
        "Which data type is used to store true or false values in most programming languages?",
      correctOptionId: 1,
      options: ["Boolean", "Integer", "String", "Float"],
    },
    {
      category: "Programming",
      question: "Which loop is guaranteed to execute at least once?",
      correctOptionId: 3,
      options: ["for loop", "while loop", "do-while loop", "foreach loop"],
    },
    {
      category: "Programming",
      question:
        "Which symbol is used to access members of an object in JavaScript?",
      correctOptionId: 2,
      options: ["#", ".", "::", "->"],
    },
    {
      category: "Programming",
      question: "What will be the output of: console.log(typeof null)?",
      correctOptionId: 3,
      options: ["null", "undefined", "object", "number"],
    },
    {
      category: "Programming",
      question: "Which keyword is used to handle exceptions in Java?",
      correctOptionId: 1,
      options: ["try-catch", "throw-catch", "error-handle", "exception"],
    },
    {
      category: "Programming",
      question:
        "Which of the following is NOT a valid variable name in most languages?",
      correctOptionId: 4,
      options: ["total_sum", "_count", "value1", "1value"],
    },
    {
      category: "Programming",
      question: "What is the purpose of a compiler?",
      correctOptionId: 2,
      options: [
        "Execute code line by line",
        "Convert source code into machine code",
        "Debug the program",
        "Manage memory",
      ],
    },
    {
      category: "Programming",
      question: "Which of the following best describes a function?",
      correctOptionId: 3,
      options: [
        "A variable that stores data",
        "A loop that repeats code",
        "A block of code that performs a specific task",
        "A data type",
      ],
    },
    {
      category: "Programming",
      question:
        "Which programming concept allows the same function name to behave differently?",
      correctOptionId: 2,
      options: ["Inheritance", "Polymorphism", "Encapsulation", "Abstraction"],
    },
    {
      category: "Programming",
      question: "Which operator is used for strict equality in JavaScript?",
      correctOptionId: 3,
      options: ["=", "==", "===", "!="],
    },
  ];

  for (const q of regularQuestions) {
    await prisma.question.create({
      data: {
        category: q.category,
        question: q.question,
        options: {
          create: q.options.map((text, index) => ({
            text,
            isCorrect: index + 1 === q.correctOptionId,
          })),
        },
      },
    });
  }
  console.log("✅ Seed completed successfully");
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

await prisma.comprehension.create({
  data: {
    passage:
      "The Internet of Things (IoT) refers to a network of physical devices embedded with sensors, software, and connectivity that enables them to collect and exchange data. These devices range from everyday household objects like smart thermostats and wearable fitness trackers to complex industrial machinery. IoT improves efficiency, automation, and decision-making across industries such as healthcare, agriculture, and manufacturing. However, it also introduces challenges related to security, data privacy, and system interoperability.",
    questions: {
      create: [
        {
          category: "Comprehension",
          question: "What does IoT primarily refer to?",
          options: {
            create: [
              { text: "Social media platforms" },
              {
                text: "Network of connected physical devices",
                isCorrect: true,
              },
              { text: "Cloud computing services" },
              { text: "Artificial intelligence models" },
            ],
          },
        },
        {
          category: "Comprehension",
          question: "Which of the following is an example of an IoT device?",
          options: {
            create: [
              { text: "Smart thermostat", isCorrect: true },
              { text: "Desktop computer" },
              { text: "Programming language" },
              { text: "Web browser" },
            ],
          },
        },
        {
          category: "Comprehension",
          question: "Which industry is mentioned as benefiting from IoT?",
          options: {
            create: [
              { text: "Entertainment" },
              { text: "Banking" },
              { text: "Healthcare", isCorrect: true },
              { text: "Gaming" },
            ],
          },
        },
        {
          category: "Comprehension",
          question: "What is one major advantage of IoT?",
          options: {
            create: [
              { text: "Increased manual labor" },
              { text: "Reduced connectivity" },
              { text: "Higher hardware costs" },
              { text: "Improved automation", isCorrect: true },
            ],
          },
        },
        {
          category: "Comprehension",
          question: "Which challenge is associated with IoT?",
          options: {
            create: [
              { text: "Faster internet speeds" },
              { text: "Security and privacy risks", isCorrect: true },
              { text: "Lower efficiency" },
              { text: "Limited scalability" },
            ],
          },
        },
      ],
    },
  },
});
