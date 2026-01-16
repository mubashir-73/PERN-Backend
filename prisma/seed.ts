import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcrypt";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("🌱 Seeding database...");

  const hashedPassword = await bcrypt.hash("forese2026@Mocks", 10);
  await prisma.user.create({
    data: {
      email: "admin@forese.co.in",
      name: "foreseadmin",
      password: hashedPassword,
      role: "ADMIN",
    },
  });
  await prisma.user.create({
    data: {
      email: "builder@forese.co.in",
      name: "Builder",
      password: hashedPassword,
      role: "BUILDER",
    },
  });
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

  // ==============================
  // REGULAR QUESTIONS
  // ==============================
  const regularQuestions = [
    // Aptitude Questions
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

    // Verbal Questions
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
        "She don't like coffee.",
        "She didn't liked coffee.",
        "She doesn't like coffee.",
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

    // Computer Science Questions
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

    // Programming Questions
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

    // AI and Data Science Questions
    {
      category: "AD",
      question: "What does ML stand for in AI?",
      correctOptionId: 2,
      options: [
        "Multiple Learning",
        "Machine Learning",
        "Manual Logic",
        "Memory Logging",
      ],
    },
    {
      category: "AD",
      question: "Which algorithm is used for classification tasks?",
      correctOptionId: 3,
      options: ["K-Means", "Linear Regression", "Decision Tree", "DBSCAN"],
    },
    {
      category: "AD",
      question: "What is overfitting in machine learning?",
      correctOptionId: 2,
      options: [
        "Model performs well on all data",
        "Model performs well on training data but poorly on new data",
        "Model has too few parameters",
        "Model takes too long to train",
      ],
    },
    {
      category: "AD",
      question: "Which library is commonly used for deep learning in Python?",
      correctOptionId: 1,
      options: ["TensorFlow", "NumPy", "Pandas", "Matplotlib"],
    },
    {
      category: "AD",
      question: "What does CNN stand for in deep learning?",
      correctOptionId: 3,
      options: [
        "Central Neural Network",
        "Computer Neural Network",
        "Convolutional Neural Network",
        "Connected Neural Network",
      ],
    },
    {
      category: "AD",
      question: "Which metric is used to evaluate classification models?",
      correctOptionId: 2,
      options: ["MSE", "Accuracy", "R-squared", "RMSE"],
    },
    {
      category: "AD",
      question: "What is the purpose of feature scaling?",
      correctOptionId: 4,
      options: [
        "Increase dataset size",
        "Remove outliers",
        "Add more features",
        "Normalize feature ranges",
      ],
    },
    {
      category: "AD",
      question: "Which is an unsupervised learning algorithm?",
      correctOptionId: 1,
      options: ["K-Means", "Logistic Regression", "SVM", "Random Forest"],
    },
    {
      category: "AD",
      question: "What does NLP stand for?",
      correctOptionId: 2,
      options: [
        "Neural Logic Processing",
        "Natural Language Processing",
        "Network Layer Protocol",
        "Numeric Linear Programming",
      ],
    },
    {
      category: "AD",
      question: "Which activation function is commonly used in hidden layers?",
      correctOptionId: 3,
      options: ["Sigmoid", "Softmax", "ReLU", "Linear"],
    },

    // Information Technology Questions
    {
      category: "IT",
      question: "What does VPN stand for?",
      correctOptionId: 2,
      options: [
        "Virtual Personal Network",
        "Virtual Private Network",
        "Verified Public Network",
        "Visual Protocol Network",
      ],
    },
    {
      category: "IT",
      question: "Which protocol is used for secure web browsing?",
      correctOptionId: 1,
      options: ["HTTPS", "FTP", "SMTP", "SNMP"],
    },
    {
      category: "IT",
      question: "What is the purpose of a firewall?",
      correctOptionId: 3,
      options: [
        "Speed up internet",
        "Store data",
        "Block unauthorized access",
        "Encrypt files",
      ],
    },
    {
      category: "IT",
      question: "Which database is an example of NoSQL?",
      correctOptionId: 2,
      options: ["MySQL", "MongoDB", "PostgreSQL", "Oracle"],
    },
    {
      category: "IT",
      question: "What does API stand for?",
      correctOptionId: 4,
      options: [
        "Automated Programming Interface",
        "Advanced Protocol Integration",
        "Application Process Integration",
        "Application Programming Interface",
      ],
    },
    {
      category: "IT",
      question: "Which cloud service model provides infrastructure?",
      correctOptionId: 1,
      options: ["IaaS", "SaaS", "PaaS", "DaaS"],
    },
    {
      category: "IT",
      question: "What is the default SSH port?",
      correctOptionId: 3,
      options: ["21", "80", "22", "443"],
    },
    {
      category: "IT",
      question: "Which language is primarily used for web development?",
      correctOptionId: 2,
      options: ["Python", "JavaScript", "C++", "Java"],
    },
    {
      category: "IT",
      question: "What does DNS stand for?",
      correctOptionId: 1,
      options: [
        "Domain Name System",
        "Digital Network Service",
        "Data Node Server",
        "Directory Name Space",
      ],
    },
    {
      category: "IT",
      question: "Which HTTP method is used to retrieve data?",
      correctOptionId: 2,
      options: ["POST", "GET", "PUT", "DELETE"],
    },

    // Electronics and Communication Engineering Questions
    {
      category: "EC",
      question: "What does AM stand for in communication?",
      correctOptionId: 1,
      options: [
        "Amplitude Modulation",
        "Angular Modulation",
        "Audio Modulation",
        "Automated Modulation",
      ],
    },
    {
      category: "EC",
      question: "Which device is used to amplify signals?",
      correctOptionId: 3,
      options: ["Diode", "Resistor", "Transistor", "Capacitor"],
    },
    {
      category: "EC",
      question: "What is the unit of frequency?",
      correctOptionId: 2,
      options: ["Volt", "Hertz", "Ampere", "Watt"],
    },
    {
      category: "EC",
      question: "Which material is commonly used in semiconductor devices?",
      correctOptionId: 4,
      options: ["Copper", "Aluminum", "Gold", "Silicon"],
    },
    {
      category: "EC",
      question: "What does PCB stand for?",
      correctOptionId: 1,
      options: [
        "Printed Circuit Board",
        "Programmable Circuit Board",
        "Power Control Board",
        "Parallel Circuit Base",
      ],
    },
    {
      category: "EC",
      question: "Which law states V = IR?",
      correctOptionId: 2,
      options: ["Kirchhoff's Law", "Ohm's Law", "Faraday's Law", "Lenz's Law"],
    },
    {
      category: "EC",
      question: "What is the primary function of a capacitor?",
      correctOptionId: 3,
      options: [
        "Amplify signals",
        "Conduct current",
        "Store electrical energy",
        "Resist current flow",
      ],
    },
    {
      category: "EC",
      question: "Which modulation technique is used in FM radio?",
      correctOptionId: 2,
      options: [
        "Amplitude Modulation",
        "Frequency Modulation",
        "Phase Modulation",
        "Pulse Modulation",
      ],
    },
    {
      category: "EC",
      question: "What does VLSI stand for?",
      correctOptionId: 4,
      options: [
        "Very Large System Integration",
        "Virtual Large Scale Integration",
        "Voltage Large Scale Integration",
        "Very Large Scale Integration",
      ],
    },
    {
      category: "EC",
      question: "Which component converts AC to DC?",
      correctOptionId: 1,
      options: ["Rectifier", "Inverter", "Transformer", "Amplifier"],
    },

    // Electrical and Electronics Engineering Questions
    {
      category: "EE",
      question: "What is the SI unit of power?",
      correctOptionId: 3,
      options: ["Joule", "Volt", "Watt", "Ampere"],
    },
    {
      category: "EE",
      question: "Which motor is used in electric vehicles?",
      correctOptionId: 2,
      options: [
        "DC Series Motor",
        "Brushless DC Motor",
        "Synchronous Motor",
        "Stepper Motor",
      ],
    },
    {
      category: "EE",
      question: "What does EMF stand for?",
      correctOptionId: 1,
      options: [
        "Electromotive Force",
        "Electric Motor Function",
        "Energy Magnetic Field",
        "Electrical Mechanism Force",
      ],
    },
    {
      category: "EE",
      question: "Which device is used to step up or step down voltage?",
      correctOptionId: 3,
      options: ["Capacitor", "Inductor", "Transformer", "Resistor"],
    },
    {
      category: "EE",
      question: "What is the frequency of AC supply in India?",
      correctOptionId: 2,
      options: ["40 Hz", "50 Hz", "60 Hz", "70 Hz"],
    },
    {
      category: "EE",
      question: "Which law is used for mesh analysis in circuits?",
      correctOptionId: 4,
      options: [
        "Ohm's Law",
        "Faraday's Law",
        "Lenz's Law",
        "Kirchhoff's Voltage Law",
      ],
    },
    {
      category: "EE",
      question: "What type of energy does a battery store?",
      correctOptionId: 1,
      options: ["Chemical", "Mechanical", "Thermal", "Nuclear"],
    },
    {
      category: "EE",
      question: "Which material is used as a conductor in transmission lines?",
      correctOptionId: 2,
      options: ["Silicon", "Aluminum", "Plastic", "Rubber"],
    },
    {
      category: "EE",
      question: "What does SCADA stand for?",
      correctOptionId: 3,
      options: [
        "System Control And Digital Acquisition",
        "Software Control And Data Analysis",
        "Supervisory Control And Data Acquisition",
        "Systematic Control And Device Activation",
      ],
    },
    {
      category: "EE",
      question: "Which protection device is used to prevent overcurrent?",
      correctOptionId: 1,
      options: ["Circuit Breaker", "Voltmeter", "Ammeter", "Oscilloscope"],
    },

    // Biotechnology Questions
    {
      category: "BT",
      question: "What does DNA stand for?",
      correctOptionId: 2,
      options: [
        "Deoxyribose Nucleic Acid",
        "Deoxyribonucleic Acid",
        "Diribonucleic Acid",
        "Deoxyribonitrogen Acid",
      ],
    },
    {
      category: "BT",
      question: "Which technique is used to amplify DNA?",
      correctOptionId: 1,
      options: ["PCR", "ELISA", "Western Blot", "Chromatography"],
    },
    {
      category: "BT",
      question: "What is the powerhouse of the cell?",
      correctOptionId: 3,
      options: ["Nucleus", "Ribosome", "Mitochondria", "Chloroplast"],
    },
    {
      category: "BT",
      question: "Which enzyme is known as molecular scissors?",
      correctOptionId: 2,
      options: [
        "DNA Ligase",
        "Restriction Enzyme",
        "DNA Polymerase",
        "Helicase",
      ],
    },
    {
      category: "BT",
      question: "What does CRISPR stand for?",
      correctOptionId: 4,
      options: [
        "Common Repeated Interspaced Palindromic Repeats",
        "Chemical Reaction In Specified Palindromic Region",
        "Cellular Repeated Interspaced Short Palindromic Repeats",
        "Clustered Regularly Interspaced Short Palindromic Repeats",
      ],
    },
    {
      category: "BT",
      question: "Which organism is used as a model in genetic studies?",
      correctOptionId: 1,
      options: ["E. coli", "Elephant", "Tiger", "Whale"],
    },
    {
      category: "BT",
      question: "What is the process of creating identical organisms called?",
      correctOptionId: 3,
      options: ["Mutation", "Hybridization", "Cloning", "Fermentation"],
    },
    {
      category: "BT",
      question: "Which protein carries oxygen in blood?",
      correctOptionId: 2,
      options: ["Insulin", "Hemoglobin", "Albumin", "Collagen"],
    },
    {
      category: "BT",
      question: "What is the study of microorganisms called?",
      correctOptionId: 1,
      options: ["Microbiology", "Zoology", "Botany", "Ecology"],
    },
    {
      category: "BT",
      question: "Which technique separates DNA fragments by size?",
      correctOptionId: 4,
      options: ["PCR", "ELISA", "Centrifugation", "Gel Electrophoresis"],
    },

    // Chemical Engineering Questions
    {
      category: "CH",
      question: "What is the SI unit of pressure?",
      correctOptionId: 2,
      options: ["Newton", "Pascal", "Joule", "Watt"],
    },
    {
      category: "CH",
      question: "Which process separates liquids based on boiling points?",
      correctOptionId: 1,
      options: ["Distillation", "Filtration", "Crystallization", "Evaporation"],
    },
    {
      category: "CH",
      question: "What does pH measure?",
      correctOptionId: 3,
      options: ["Temperature", "Pressure", "Acidity or Alkalinity", "Density"],
    },
    {
      category: "CH",
      question:
        "Which law states that total pressure equals sum of partial pressures?",
      correctOptionId: 2,
      options: [
        "Boyle's Law",
        "Dalton's Law",
        "Charles' Law",
        "Avogadro's Law",
      ],
    },
    {
      category: "CH",
      question: "What is the process of converting solid to gas called?",
      correctOptionId: 4,
      options: ["Melting", "Evaporation", "Condensation", "Sublimation"],
    },
    {
      category: "CH",
      question: "Which catalyst is used in Haber process?",
      correctOptionId: 1,
      options: ["Iron", "Platinum", "Nickel", "Copper"],
    },
    {
      category: "CH",
      question: "What does the term 'stoichiometry' refer to?",
      correctOptionId: 3,
      options: [
        "Heat transfer",
        "Fluid mechanics",
        "Quantitative relationships in reactions",
        "Phase equilibrium",
      ],
    },
    {
      category: "CH",
      question: "Which unit operation involves mass transfer between phases?",
      correctOptionId: 2,
      options: ["Crushing", "Absorption", "Mixing", "Heating"],
    },
    {
      category: "CH",
      question: "What is the ideal gas constant value approximately?",
      correctOptionId: 1,
      options: ["8.314 J/mol·K", "10 J/mol·K", "6.022 J/mol·K", "1.38 J/mol·K"],
    },
    {
      category: "CH",
      question: "Which reactor type has the highest conversion efficiency?",
      correctOptionId: 3,
      options: [
        "Batch reactor",
        "CSTR",
        "Plug flow reactor",
        "Semi-batch reactor",
      ],
    },

    // Mechanical Engineering Questions
    {
      category: "ME",
      question: "What is the SI unit of force?",
      correctOptionId: 2,
      options: ["Joule", "Newton", "Watt", "Pascal"],
    },
    {
      category: "ME",
      question: "Which law states action and reaction are equal and opposite?",
      correctOptionId: 3,
      options: [
        "First Law of Motion",
        "Second Law of Motion",
        "Third Law of Motion",
        "Law of Gravitation",
      ],
    },
    {
      category: "ME",
      question: "What is the efficiency of a Carnot engine dependent on?",
      correctOptionId: 1,
      options: [
        "Temperature difference",
        "Fuel type",
        "Engine size",
        "Pressure",
      ],
    },
    {
      category: "ME",
      question: "Which material property resists deformation?",
      correctOptionId: 4,
      options: ["Ductility", "Malleability", "Brittleness", "Hardness"],
    },
    {
      category: "ME",
      question: "What does CAD stand for?",
      correctOptionId: 2,
      options: [
        "Computer Aided Development",
        "Computer Aided Design",
        "Central Aided Design",
        "Computer Automatic Design",
      ],
    },
    {
      category: "ME",
      question: "Which type of stress acts parallel to the surface?",
      correctOptionId: 3,
      options: [
        "Tensile stress",
        "Compressive stress",
        "Shear stress",
        "Bending stress",
      ],
    },
    {
      category: "ME",
      question: "What is the unit of torque?",
      correctOptionId: 1,
      options: ["Newton-meter", "Watt", "Joule", "Pascal"],
    },
    {
      category: "ME",
      question: "Which cycle is used in petrol engines?",
      correctOptionId: 2,
      options: ["Diesel cycle", "Otto cycle", "Rankine cycle", "Brayton cycle"],
    },
    {
      category: "ME",
      question: "What is the modulus of elasticity also called?",
      correctOptionId: 4,
      options: [
        "Poisson's ratio",
        "Bulk modulus",
        "Shear modulus",
        "Young's modulus",
      ],
    },
    {
      category: "ME",
      question: "Which manufacturing process removes material?",
      correctOptionId: 1,
      options: ["Machining", "Casting", "Welding", "Forging"],
    },

    // Automobile Engineering Questions
    {
      category: "AE",
      question: "What does ABS stand for in vehicles?",
      correctOptionId: 3,
      options: [
        "Automatic Brake System",
        "Advanced Braking System",
        "Anti-lock Braking System",
        "Assisted Brake System",
      ],
    },
    {
      category: "AE",
      question:
        "Which component converts reciprocating motion to rotary motion?",
      correctOptionId: 2,
      options: ["Camshaft", "Crankshaft", "Piston", "Connecting rod"],
    },
    {
      category: "AE",
      question: "What is the typical compression ratio of a diesel engine?",
      correctOptionId: 4,
      options: ["8:1", "10:1", "12:1", "16:1 to 20:1"],
    },
    {
      category: "AE",
      question: "Which fuel system component atomizes fuel?",
      correctOptionId: 1,
      options: ["Injector", "Carburetor", "Fuel pump", "Fuel filter"],
    },
    {
      category: "AE",
      question: "What does EFI stand for?",
      correctOptionId: 2,
      options: [
        "Engine Fuel Integration",
        "Electronic Fuel Injection",
        "Electric Fuel Ignition",
        "Enhanced Fuel Intake",
      ],
    },
    {
      category: "AE",
      question: "Which type of suspension uses springs and shock absorbers?",
      correctOptionId: 3,
      options: [
        "Air suspension",
        "Hydraulic suspension",
        "Coil spring suspension",
        "Magnetic suspension",
      ],
    },
    {
      category: "AE",
      question: "What is the function of a differential?",
      correctOptionId: 4,
      options: [
        "Increase speed",
        "Reduce emissions",
        "Cool engine",
        "Allow wheels to rotate at different speeds",
      ],
    },
    {
      category: "AE",
      question: "Which emission control device reduces NOx?",
      correctOptionId: 1,
      options: [
        "Catalytic converter",
        "Muffler",
        "Air filter",
        "Fuel injector",
      ],
    },
    {
      category: "AE",
      question: "What type of transmission has no clutch pedal?",
      correctOptionId: 2,
      options: ["Manual", "Automatic", "Sequential", "Dual-clutch"],
    },
    {
      category: "AE",
      question: "Which cooling system component regulates coolant flow?",
      correctOptionId: 3,
      options: ["Radiator", "Water pump", "Thermostat", "Fan"],
    },

    // Civil Engineering Questions
    {
      category: "CE",
      question: "What is the compressive strength of concrete measured in?",
      correctOptionId: 2,
      options: ["kN", "MPa", "kg", "N"],
    },
    {
      category: "CE",
      question: "Which cement is used for underwater construction?",
      correctOptionId: 1,
      options: [
        "Portland Pozzolana Cement",
        "Ordinary Portland Cement",
        "White Cement",
        "Quick Setting Cement",
      ],
    },
    {
      category: "CE",
      question: "What is the standard size of a modular brick in India?",
      correctOptionId: 3,
      options: [
        "230×115×75 mm",
        "200×100×50 mm",
        "190×90×90 mm",
        "250×125×100 mm",
      ],
    },
    {
      category: "CE",
      question: "Which test is used to determine the fineness of cement?",
      correctOptionId: 4,
      options: [
        "Slump test",
        "Compaction test",
        "Consistency test",
        "Sieve analysis",
      ],
    },
    {
      category: "CE",
      question: "What does DPC stand for in construction?",
      correctOptionId: 2,
      options: [
        "Direct Pressure Course",
        "Damp Proof Course",
        "Deep Pile Course",
        "Design Planning Course",
      ],
    },
    {
      category: "CE",
      question: "Which structural element primarily resists bending?",
      correctOptionId: 1,
      options: ["Beam", "Column", "Slab", "Foundation"],
    },
    {
      category: "CE",
      question: "What is the water-cement ratio for normal concrete?",
      correctOptionId: 3,
      options: ["0.3", "0.35", "0.4 to 0.5", "0.6"],
    },
    {
      category: "CE",
      question:
        "Which survey instrument measures horizontal and vertical angles?",
      correctOptionId: 2,
      options: ["Compass", "Theodolite", "Level", "Chain"],
    },
    {
      category: "CE",
      question: "What is the minimum grade of concrete for RCC work?",
      correctOptionId: 4,
      options: ["M10", "M15", "M25", "M20"],
    },
    {
      category: "CE",
      question: "Which soil has the highest bearing capacity?",
      correctOptionId: 1,
      options: ["Rock", "Clay", "Silt", "Sand"],
    },

    // Mechanical and Automation Engineering Questions
    {
      category: "MN",
      question: "What does PLC stand for in automation?",
      correctOptionId: 3,
      options: [
        "Program Logic Computer",
        "Power Line Controller",
        "Programmable Logic Controller",
        "Parallel Logic Circuit",
      ],
    },
    {
      category: "MN",
      question: "Which sensor detects the presence of objects?",
      correctOptionId: 2,
      options: [
        "Temperature sensor",
        "Proximity sensor",
        "Pressure sensor",
        "Flow sensor",
      ],
    },
    {
      category: "MN",
      question: "What does CNC stand for?",
      correctOptionId: 1,
      options: [
        "Computer Numerical Control",
        "Central Numeric Controller",
        "Computerized Navigation Control",
        "Continuous Numeric Computation",
      ],
    },
    {
      category: "MN",
      question: "Which control system uses feedback?",
      correctOptionId: 4,
      options: [
        "Open loop",
        "Manual control",
        "Sequential control",
        "Closed loop",
      ],
    },
    {
      category: "MN",
      question: "What type of motor is commonly used in robotics?",
      correctOptionId: 3,
      options: ["AC motor", "DC motor", "Servo motor", "Induction motor"],
    },
    {
      category: "MN",
      question: "Which protocol is widely used in industrial automation?",
      correctOptionId: 2,
      options: ["HTTP", "Modbus", "FTP", "SMTP"],
    },
    {
      category: "MN",
      question: "What does SCARA stand for in robotics?",
      correctOptionId: 1,
      options: [
        "Selective Compliance Assembly Robot Arm",
        "System Control And Robot Automation",
        "Sequential Control Automated Robot Assembly",
        "Smart Controlled Articulated Robot Arm",
      ],
    },
    {
      category: "MN",
      question:
        "Which component converts electrical signals to mechanical motion?",
      correctOptionId: 4,
      options: ["Sensor", "Controller", "Encoder", "Actuator"],
    },
    {
      category: "MN",
      question: "What is the main advantage of automation?",
      correctOptionId: 2,
      options: [
        "Higher initial cost",
        "Increased productivity",
        "More manual work",
        "Complex maintenance",
      ],
    },
    {
      category: "MN",
      question: "Which technology enables machine-to-machine communication?",
      correctOptionId: 3,
      options: ["PLC", "SCADA", "IoT", "HMI"],
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
