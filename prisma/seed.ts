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

  // ----- Comprehension Passages -----
  const comp1 = await prisma.comprehension.create({
    data: {
      passage: "Artificial intelligence (AI) is transforming the way we live and work. From virtual assistants that help us manage our daily schedules to sophisticated algorithms that power recommendation systems, AI has become an integral part of modern technology. Machine learning, a subset of AI, enables computers to learn from data without being explicitly programmed. This technology is revolutionizing industries such as healthcare, where AI can assist in diagnosing diseases with greater accuracy, and transportation, where self-driving vehicles promise to reduce accidents and improve efficiency. As AI continues to evolve, it raises important questions about privacy, ethics, and the future of human employment in an increasingly automated world.",
      questions: {
        create: [
          {
            category: "Comprehension",
            question: "What is the main topic of this passage?",
            options: {
              create: [
                { text: "Virtual assistants" },
                { text: "Artificial intelligence" },
                { text: "Healthcare technology" },
                { text: "Transportation systems" },
              ],
            },
            correctOptionId: 2,
          },
          {
            category: "Comprehension",
            question: "According to the passage, what enables computers to learn from data?",
            options: {
              create: [
                { text: "Explicit programming" },
                { text: "Virtual assistance" },
                { text: "Machine learning" },
                { text: "Algorithm design" },
              ],
            },
            correctOptionId: 3,
          },
          {
            category: "Comprehension",
            question: "Which industry is mentioned as benefiting from AI in disease diagnosis?",
            options: {
              create: [
                { text: "Transportation" },
                { text: "Entertainment" },
                { text: "Healthcare" },
                { text: "Education" },
              ],
            },
            correctOptionId: 3,
          },
          {
            category: "Comprehension",
            question: "What concern does the passage raise about AI's evolution?",
            options: {
              create: [
                { text: "Cost of implementation" },
                { text: "Privacy and ethics" },
                { text: "Technical complexity" },
                { text: "User adoption" },
              ],
            },
            correctOptionId: 2,
          },
          {
            category: "Comprehension",
            question: "What promise do self-driving vehicles offer according to the passage?",
            options: {
              create: [
                { text: "Lower fuel costs" },
                { text: "Reduced accidents" },
                { text: "Faster travel" },
                { text: "More comfort" },
              ],
            },
            correctOptionId: 2,
          },
        ],
      },
    },
  });

  const comp2 = await prisma.comprehension.create({
    data: {
      passage: "Climate change represents one of the most significant challenges facing humanity in the 21st century. The scientific consensus is clear: human activities, particularly the burning of fossil fuels and deforestation, are the primary drivers of global warming. Rising temperatures lead to melting ice caps, rising sea levels, and more extreme weather events including hurricanes, droughts, and floods. These changes threaten ecosystems, agriculture, and human communities worldwide. However, there is hope. Renewable energy technologies like solar and wind power are becoming more efficient and affordable. International agreements such as the Paris Climate Accord aim to unite nations in reducing greenhouse gas emissions. Individual actions, from reducing energy consumption to supporting sustainable businesses, also play a crucial role in addressing this global crisis. The transition to a low-carbon economy requires collective action across governments, businesses, and citizens.",
      questions: {
        create: [
          {
            category: "Comprehension",
            question: "What does the passage identify as the primary drivers of global warming?",
            options: {
              create: [
                { text: "Natural climate cycles" },
                { text: "Solar activity" },
                { text: "Human activities" },
                { text: "Ocean currents" },
              ],
            },
            correctOptionId: 3,
          },
          {
            category: "Comprehension",
            question: "Which consequence of rising temperatures is NOT mentioned in the passage?",
            options: {
              create: [
                { text: "Melting ice caps" },
                { text: "Rising sea levels" },
                { text: "Extreme weather events" },
                { text: "Increased biodiversity" },
              ],
            },
            correctOptionId: 4,
          },
          {
            category: "Comprehension",
            question: "What renewable energy technologies are mentioned as becoming more efficient?",
            options: {
              create: [
                { text: "Nuclear and hydroelectric" },
                { text: "Solar and wind power" },
                { text: "Geothermal and biomass" },
                { text: "Tidal and wave energy" },
              ],
            },
            correctOptionId: 2,
          },
          {
            category: "Comprehension",
            question: "What international agreement is mentioned in the passage?",
            options: {
              create: [
                { text: "Kyoto Protocol" },
                { text: "Paris Climate Accord" },
                { text: "Copenhagen Summit" },
                { text: "Geneva Convention" },
              ],
            },
            correctOptionId: 2,
          },
          {
            category: "Comprehension",
            question: "What role do individual actions play according to the passage?",
            options: {
              create: [
                { text: "Minimal impact" },
                { text: "Crucial role" },
                { text: "No significance" },
                { text: "Secondary importance" },
              ],
            },
            correctOptionId: 2,
          },
        ],
      },
    },
  });

  // ----- Questions -----
  const questionData = [
    // Aptitude Questions (10)
    { category: "Aptitude", question: "What is 15 + 27?", correctOptionId: 1 },
    { category: "Aptitude", question: "What is 144 ÷ 12?", correctOptionId: 1 },
    { category: "Aptitude", question: "What is 25% of 80?", correctOptionId: 1 },
    { category: "Aptitude", question: "What is the next number in the sequence: 2, 4, 8, 16, ?", correctOptionId: 3 },
    { category: "Aptitude", question: "What is 7² + 3²?", correctOptionId: 1 },
    { category: "Aptitude", question: "What is the square root of 169?", correctOptionId: 1 },
    { category: "Aptitude", question: "What is 3.5 × 4?", correctOptionId: 1 },
    { category: "Aptitude", question: "What is 100 - 37?", correctOptionId: 1 },
    { category: "Aptitude", question: "What is the next number: 1, 1, 2, 3, 5, ?", correctOptionId: 3 },
    { category: "Aptitude", question: "What is 2³ + 4²?", correctOptionId: 1 },
    
    // Verbal Questions (5)
    { category: "Verbal", question: "Choose the synonym of 'eloquent'.", correctOptionId: 2 },
    { category: "Verbal", question: "Choose the antonym of 'benevolent'.", correctOptionId: 3 },
    { category: "Verbal", question: "Which word is spelled correctly: accomodate, accommodate, acommodate?", correctOptionId: 2 },
    { category: "Verbal", question: "What is the plural of 'phenomenon'?", correctOptionId: 1 },
    { category: "Verbal", question: "Choose the correct word: The team ___ playing well.", correctOptionId: 1 },
    
    // Core Questions (20)
    { category: "Core", question: "What is the time complexity of binary search?", correctOptionId: 2 },
    { category: "Core", question: "Which data structure uses LIFO principle?", correctOptionId: 2 },
    { category: "Core", question: "What is the purpose of an operating system?", correctOptionId: 1 },
    { category: "Core", question: "Which protocol is used for secure web browsing?", correctOptionId: 3 },
    { category: "Core", question: "What is normalization in database design?", correctOptionId: 1 },
    { category: "Core", question: "Which sorting algorithm has O(n log n) average time complexity?", correctOptionId: 2 },
    { category: "Core", question: "What is the difference between TCP and UDP?", correctOptionId: 3 },
    { category: "Core", question: "What is a deadlock in operating systems?", correctOptionId: 3 },
    { category: "Core", question: "Which OSI layer handles routing?", correctOptionId: 2 },
    { category: "Core", question: "What is the purpose of virtual memory?", correctOptionId: 3 },
    { category: "Core", question: "Which data structure is best for implementing priority queue?", correctOptionId: 3 },
    { category: "Core", question: "What is the difference between process and thread?", correctOptionId: 3 },
    { category: "Core", question: "Which database model represents many-to-many relationships?", correctOptionId: 3 },
    { category: "Core", question: "What is the purpose of DNS in networking?", correctOptionId: 2 },
    { category: "Core", question: "Which algorithm is used for finding shortest path in graphs?", correctOptionId: 1 },
    { category: "Core", question: "What is the difference between primary and secondary memory?", correctOptionId: 2 },
    { category: "Core", question: "Which OSI layer provides end-to-end communication?", correctOptionId: 3 },
    { category: "Core", question: "What is the purpose of cache memory?", correctOptionId: 1 },
    { category: "Core", question: "Which data structure is used for implementing recursion?", correctOptionId: 2 },
    { category: "Core", question: "What is the difference between compiler and interpreter?", correctOptionId: 3 },
    
    // Programming Questions (10)
    { category: "Programming", question: "Which keyword declares a constant in JavaScript?", correctOptionId: 3 },
    { category: "Programming", question: "What is the output of: print(2 + '2') in Python?", correctOptionId: 2 },
    { category: "Programming", question: "Which loop is guaranteed to execute at least once?", correctOptionId: 3 },
    { category: "Programming", question: "What is the purpose of a constructor in OOP?", correctOptionId: 1 },
    { category: "Programming", question: "Which access modifier makes a member accessible only within the class?", correctOptionId: 2 },
    { category: "Programming", question: "What is the difference between == and === in JavaScript?", correctOptionId: 2 },
    { category: "Programming", question: "Which method is used to add elements to the end of an array in JavaScript?", correctOptionId: 1 },
    { category: "Programming", question: "What is the purpose of the 'finally' block in exception handling?", correctOptionId: 2 },
    { category: "Programming", question: "Which keyword is used to inherit a class in Java?", correctOptionId: 1 },
    { category: "Programming", question: "What is the output of: typeof null in JavaScript?", correctOptionId: 2 },
  ];

  const createdQuestions = await prisma.question.createMany({
    data: questionData,
    skipDuplicates: true,
  });

  // ----- Options for the non-comprehension questions -----
  const questions = await prisma.question.findMany({
    where: { category: { not: "Comprehension" } },
  });

  const optionData: Array<{ questionId: number; text: string }> = [];
  
  questions.forEach((q, index) => {
    if (q.category === "Aptitude") {
      const aptitudeOptions = [
        ["42", "40", "45", "38"],
        ["12", "14", "10", "8"],
        ["20", "25", "30", "15"],
        ["32", "24", "64", "8"],
        ["58", "68", "78", "48"],
        ["13", "11", "15", "17"],
        ["14", "12", "16", "10"],
        ["63", "73", "67", "57"],
        ["8", "13", "21", "34"],
        ["24", "16", "32", "8"]
      ];
      const options = aptitudeOptions[index % aptitudeOptions.length];
      if (options) {
        options.forEach((text) => {
          optionData.push({ questionId: q.id, text });
        });
      }
    } else if (q.category === "Verbal") {
      const verbalOptions = [
        ["Silent", "Articulate", "Confused", "Quiet"],
        ["Malevolent", "Kind", "Hostile", "Generous"],
        ["accommodate", "accomodate", "acommodate", "accommodate"],
        ["Phenomena", "Phenomenons", "Phenomenon", "Phenomenae"],
        ["is", "are", "was", "were"]
      ];
      const options = verbalOptions[index % verbalOptions.length];
      if (options) {
        options.forEach((text) => {
          optionData.push({ questionId: q.id, text });
        });
      }
    } else if (q.category === "Core") {
      const coreOptions = [
        ["O(n)", "O(log n)", "O(n²)", "O(1)"],
        ["Queue", "Stack", "Array", "Tree"],
        ["Hardware management", "User interface", "Application software", "Network security"],
        ["HTTP", "FTP", "HTTPS", "SMTP"],
        ["Data organization", "Data encryption", "Data backup", "Data recovery"],
        ["Bubble sort", "Quick sort", "Selection sort", "Insertion sort"],
        ["Speed vs reliability", "Cost vs security", "Connection-oriented vs connectionless", "Wired vs wireless"],
        ["Resource allocation", "Process synchronization", "Circular wait condition", "Memory management"],
        ["Physical layer", "Network layer", "Data link layer", "Transport layer"],
        ["Speed improvement", "Security enhancement", "Memory extension", "Data backup"],
        ["Array", "Linked list", "Heap", "Stack"],
        ["Execution speed", "Memory usage", "Independence vs sharing", "User interaction"],
        ["Hierarchical", "Network", "Relational", "Object-oriented"],
        ["Address resolution", "Name resolution", "Port resolution", "MAC resolution"],
        ["Dijkstra's", "Bubble sort", "Binary search", "Quick sort"],
        ["Speed vs cost", "Volatility vs permanence", "Size vs capacity", "Access method"],
        ["Physical layer", "Network layer", "Transport layer", "Application layer"],
        ["Speed improvement", "Cost reduction", "Data backup", "Security enhancement"],
        ["Queue", "Stack", "Array", "Tree"],
        ["Speed vs compilation", "Memory usage", "Execution vs translation", "Debugging vs testing"]
      ];
      const options = coreOptions[index % coreOptions.length];
      if (options) {
        options.forEach((text) => {
          optionData.push({ questionId: q.id, text });
        });
      }
    } else if (q.category === "Programming") {
      const programmingOptions = [
        ["var", "let", "const", "static"],
        ["22", "4", "Error", "NaN"],
        ["for loop", "while loop", "do-while loop", "foreach loop"],
        ["Initialization", "Destruction", "Inheritance", "Polymorphism"],
        ["public", "private", "protected", "internal"],
        ["No difference", "Type checking", "Performance", "Scope"],
        ["push()", "pop()", "shift()", "unshift()"],
        ["Exception handling", "Code cleanup", "Loop control", "Conditional execution"],
        ["extends", "implements", "inherits", "super"],
        ["object", "null", "undefined", "string"]
      ];
      const options = programmingOptions[index % programmingOptions.length];
      if (options) {
        options.forEach((text) => {
          optionData.push({ questionId: q.id, text });
        });
      }
    }
  });

  await prisma.option.createMany({
    data: optionData,
    skipDuplicates: true,
  });

  console.log("Seed data created successfully!");
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
