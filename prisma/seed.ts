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
    {
      category: "AD",
      question: "What is the purpose of backpropagation in neural networks?",
      correctOptionId: 2,
      options: [
        "To feed data forward",
        "To adjust weights during training",
        "To prevent overfitting",
        "To normalize inputs",
      ],
    },
    {
      category: "AD",
      question: "Which technique is used to reduce overfitting?",
      correctOptionId: 3,
      options: ["Increasing model complexity", "Adding more layers", "Dropout", "Removing validation data"],
    },
    {
      category: "AD",
      question: "What does LSTM stand for?",
      correctOptionId: 1,
      options: [
        "Long Short-Term Memory",
        "Linear System Time Model",
        "Large Scale Training Method",
        "Loop Sequential Training Model",
      ],
    },
    {
      category: "AD",
      question: "Which algorithm is best for finding patterns in unlabeled data?",
      correctOptionId: 4,
      options: ["Linear Regression", "Decision Tree", "SVM", "K-Means Clustering"],
    },
    {
      category: "AD",
      question: "What is gradient descent used for?",
      correctOptionId: 2,
      options: [
        "Data preprocessing",
        "Minimizing loss function",
        "Feature selection",
        "Model evaluation",
      ],
    },
    {
      category: "AD",
      question: "Which metric is NOT used for regression problems?",
      correctOptionId: 3,
      options: ["MSE", "RMSE", "F1-Score", "R-squared"],
    },
    {
      category: "AD",
      question: "What is the vanishing gradient problem?",
      correctOptionId: 1,
      options: [
        "Gradients become very small in deep networks",
        "Gradients become too large",
        "Loss function doesn't converge",
        "Data becomes corrupted",
      ],
    },
    {
      category: "AD",
      question: "Which activation function can output negative values?",
      correctOptionId: 4,
      options: ["ReLU", "Sigmoid", "Softmax", "Tanh"],
    },
    {
      category: "AD",
      question: "What is cross-validation used for?",
      correctOptionId: 2,
      options: [
        "Training the model",
        "Assessing model performance",
        "Cleaning data",
        "Feature engineering",
      ],
    },
    {
      category: "AD",
      question: "Which type of learning uses reward-based feedback?",
      correctOptionId: 3,
      options: ["Supervised", "Unsupervised", "Reinforcement", "Semi-supervised"],
    },
    {
      category: "AD",
      question: "What does GAN stand for?",
      correctOptionId: 1,
      options: [
        "Generative Adversarial Network",
        "General Automated Network",
        "Gradient Approximation Network",
        "Global Analysis Network",
      ],
    },
    {
      category: "AD",
      question: "Which library is primarily used for data manipulation in Python?",
      correctOptionId: 2,
      options: ["TensorFlow", "Pandas", "Keras", "Scikit-learn"],
    },
    {
      category: "AD",
      question: "What is the purpose of a confusion matrix?",
      correctOptionId: 3,
      options: [
        "To visualize training loss",
        "To show data distribution",
        "To evaluate classification performance",
        "To normalize features",
      ],
    },
    {
      category: "AD",
      question: "Which technique is used for dimensionality reduction?",
      correctOptionId: 4,
      options: ["K-Means", "Random Forest", "Naive Bayes", "Principal Component Analysis"],
    },
    {
      category: "AD",
      question: "What is the main purpose of regularization?",
      correctOptionId: 1,
      options: [
        "Prevent overfitting",
        "Increase training speed",
        "Reduce data size",
        "Improve accuracy on training data",
      ],
    },
    {
      category: "AD",
      question: "Which is a popular framework for building neural networks?",
      correctOptionId: 2,
      options: ["NumPy", "PyTorch", "Matplotlib", "Pandas"],
    },
    {
      category: "AD",
      question: "What does BERT stand for in NLP?",
      correctOptionId: 3,
      options: [
        "Basic Encoding Representation Technique",
        "Binary Encoded Recurrent Transformer",
        "Bidirectional Encoder Representations from Transformers",
        "Base Embedding Recursive Training",
      ],
    },
    {
      category: "AD",
      question: "Which optimizer is commonly used in deep learning?",
      correctOptionId: 1,
      options: ["Adam", "Bubble Sort", "Linear Search", "Binary Tree"],
    },
    {
      category: "AD",
      question: "What is transfer learning?",
      correctOptionId: 4,
      options: [
        "Moving data between systems",
        "Converting file formats",
        "Transferring weights manually",
        "Using pre-trained models for new tasks",
      ],
    },
    {
      category: "AD",
      question: "Which technique handles imbalanced datasets?",
      correctOptionId: 2,
      options: [
        "Removing all minority samples",
        "SMOTE (Synthetic Minority Over-sampling)",
        "Increasing learning rate",
        "Adding more layers",
      ],
    },
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
    {
      category: "IT",
      question: "What is the maximum length of an IPv4 address?",
      correctOptionId: 3,
      options: ["16 bits", "24 bits", "32 bits", "64 bits"],
    },
    {
      category: "IT",
      question: "Which layer of OSI model handles encryption?",
      correctOptionId: 4,
      options: ["Network", "Transport", "Application", "Presentation"],
    },
    {
      category: "IT",
      question: "What does REST stand for in web services?",
      correctOptionId: 2,
      options: [
        "Remote Execution Service Tool",
        "Representational State Transfer",
        "Rapid Exchange System Technology",
        "Resource Embedded System Transfer",
      ],
    },
    {
      category: "IT",
      question: "Which database uses tables to store data?",
      correctOptionId: 1,
      options: ["Relational Database", "Graph Database", "Document Database", "Key-Value Store"],
    },
    {
      category: "IT",
      question: "What is the purpose of a load balancer?",
      correctOptionId: 3,
      options: [
        "Store data",
        "Encrypt traffic",
        "Distribute traffic across servers",
        "Monitor network speed",
      ],
    },
    {
      category: "IT",
      question: "Which protocol is used for file transfer?",
      correctOptionId: 2,
      options: ["HTTP", "FTP", "SMTP", "DNS"],
    },
    {
      category: "IT",
      question: "What does CDN stand for?",
      correctOptionId: 4,
      options: [
        "Central Data Network",
        "Computer Distribution Network",
        "Core Domain Network",
        "Content Delivery Network",
      ],
    },
    {
      category: "IT",
      question: "Which is a containerization platform?",
      correctOptionId: 1,
      options: ["Docker", "Apache", "MySQL", "Nginx"],
    },
    {
      category: "IT",
      question: "What is the default port for HTTPS?",
      correctOptionId: 3,
      options: ["80", "8080", "443", "22"],
    },
    {
      category: "IT",
      question: "Which command is used to test network connectivity?",
      correctOptionId: 2,
      options: ["ipconfig", "ping", "tracert", "netstat"],
    },
    {
      category: "IT",
      question: "What does SQL stand for?",
      correctOptionId: 1,
      options: [
        "Structured Query Language",
        "Simple Query Language",
        "System Query Language",
        "Standard Queue Language",
      ],
    },
    {
      category: "IT",
      question: "Which encryption algorithm is symmetric?",
      correctOptionId: 4,
      options: ["RSA", "DSA", "ECC", "AES"],
    },
    {
      category: "IT",
      question: "What is the purpose of DNS?",
      correctOptionId: 2,
      options: [
        "Encrypt data",
        "Translate domain names to IP addresses",
        "Route packets",
        "Monitor bandwidth",
      ],
    },
    {
      category: "IT",
      question: "Which is a version control system?",
      correctOptionId: 3,
      options: ["Apache", "MySQL", "Git", "Docker"],
    },
    {
      category: "IT",
      question: "What does CRUD stand for in database operations?",
      correctOptionId: 1,
      options: [
        "Create, Read, Update, Delete",
        "Copy, Remove, Upload, Download",
        "Connect, Retrieve, Use, Disconnect",
        "Compile, Run, Use, Debug",
      ],
    },
    {
      category: "IT",
      question: "Which protocol is connectionless?",
      correctOptionId: 2,
      options: ["TCP", "UDP", "HTTP", "FTP"],
    },
    {
      category: "IT",
      question: "What is the purpose of a subnet mask?",
      correctOptionId: 4,
      options: [
        "Encrypt data",
        "Route packets",
        "Assign IP addresses",
        "Divide network into subnets",
      ],
    },
    {
      category: "IT",
      question: "Which HTTP status code indicates success?",
      correctOptionId: 1,
      options: ["200", "404", "500", "301"],
    },
    {
      category: "IT",
      question: "What does JWT stand for?",
      correctOptionId: 3,
      options: [
        "Java Web Token",
        "JavaScript Web Tool",
        "JSON Web Token",
        "Joint Web Technology",
      ],
    },
    {
      category: "IT",
      question: "Which cloud provider offers EC2 instances?",
      correctOptionId: 2,
      options: ["Google Cloud", "AWS", "Azure", "IBM Cloud"],
    },

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
    {
      category: "EC",
      question: "What is the function of a modulator?",
      correctOptionId: 1,
      options: [
        "Superimpose information on carrier wave",
        "Amplify signals",
        "Filter noise",
        "Convert digital to analog",
      ],
    },
    {
      category: "EC",
      question: "Which type of diode emits light?",
      correctOptionId: 3,
      options: ["Zener diode", "Schottky diode", "LED", "Varactor diode"],
    },
    {
      category: "EC",
      question: "What does MOSFET stand for?",
      correctOptionId: 1,
      options: [
        "Metal Oxide Semiconductor Field Effect Transistor",
        "Metal Oxide Silicon Field Effect Transistor",
        "Multiple Output Silicon Field Effect Transistor",
        "Magnetic Oxide Semiconductor Field Effect Transistor",
      ],
    },
    {
      category: "EC",
      question: "Which filter allows low frequencies to pass?",
      correctOptionId: 1,
      options: ["Low-pass filter", "High-pass filter", "Band-pass filter", "Band-stop filter"],
    },
    {
      category: "EC",
      question: "What is the bandwidth of AM radio?",
      correctOptionId: 4,
      options: ["5 kHz", "15 kHz", "20 kHz", "10 kHz"],
    },
    {
      category: "EC",
      question: "Which component stores charge?",
      correctOptionId: 2,
      options: ["Resistor", "Capacitor", "Inductor", "Transistor"],
    },
    {
      category: "EC",
      question: "What is the unit of capacitance?",
      correctOptionId: 3,
      options: ["Henry", "Ohm", "Farad", "Weber"],
    },
    {
      category: "EC",
      question: "Which multiplexing technique divides bandwidth?",
      correctOptionId: 1,
      options: ["FDM", "TDM", "WDM", "CDM"],
    },
    {
      category: "EC",
      question: "What does BJT stand for?",
      correctOptionId: 4,
      options: [
        "Basic Junction Transistor",
        "Bi-directional Junction Transistor",
        "Binary Junction Transistor",
        "Bipolar Junction Transistor",
      ],
    },
    {
      category: "EC",
      question: "Which antenna radiates equally in all directions?",
      correctOptionId: 2,
      options: ["Directional", "Isotropic", "Yagi", "Parabolic"],
    },
    {
      category: "EC",
      question: "What is the doping process used for?",
      correctOptionId: 3,
      options: [
        "Cooling semiconductors",
        "Cleaning circuits",
        "Adding impurities to semiconductors",
        "Removing defects",
      ],
    },
    {
      category: "EC",
      question: "Which oscillator uses LC circuit?",
      correctOptionId: 1,
      options: ["Hartley oscillator", "Crystal oscillator", "RC oscillator", "Relaxation oscillator"],
    },
    {
      category: "EC",
      question: "What is the primary function of an amplifier?",
      correctOptionId: 2,
      options: [
        "Filter signals",
        "Increase signal strength",
        "Convert AC to DC",
        "Modulate signals",
      ],
    },
    {
      category: "EC",
      question: "Which protocol is used in mobile communication?",
      correctOptionId: 4,
      options: ["HTTP", "FTP", "SMTP", "GSM"],
    },
    {
      category: "EC",
      question: "What does SNR stand for?",
      correctOptionId: 1,
      options: [
        "Signal-to-Noise Ratio",
        "System Network Ratio",
        "Synchronized Network Rate",
        "Signal Network Receiver",
      ],
    },
    {
      category: "EC",
      question: "Which generation of mobile networks introduced 4G?",
      correctOptionId: 3,
      options: ["Second", "Third", "Fourth", "Fifth"],
    },
    {
      category: "EC",
      question: "What is the function of a demodulator?",
      correctOptionId: 2,
      options: [
        "Amplify carrier wave",
        "Extract information from carrier wave",
        "Filter high frequencies",
        "Convert digital to analog",
      ],
    },
    {
      category: "EC",
      question: "Which theorem is fundamental to sampling?",
      correctOptionId: 4,
      options: [
        "Kirchhoff's theorem",
        "Thevenin's theorem",
        "Norton's theorem",
        "Nyquist-Shannon theorem",
      ],
    },
    {
      category: "EC",
      question: "What type of feedback reduces gain?",
      correctOptionId: 1,
      options: ["Negative feedback", "Positive feedback", "No feedback", "Forward feedback"],
    },
    {
      category: "EC",
      question: "Which device converts light to electrical signal?",
      correctOptionId: 3,
      options: ["LED", "Transistor", "Photodiode", "Capacitor"],
    },
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
    {
      category: "EE",
      question: "What is the power factor range?",
      correctOptionId: 2,
      options: ["-1 to 1", "0 to 1", "0 to 100", "1 to infinity"],
    },
    {
      category: "EE",
      question: "Which motor has the highest starting torque?",
      correctOptionId: 1,
      options: ["DC Series motor", "DC Shunt motor", "Synchronous motor", "Induction motor"],
    },
    {
      category: "EE",
      question: "What is the function of a commutator in DC motor?",
      correctOptionId: 3,
      options: [
        "Increase speed",
        "Reduce losses",
        "Convert AC to DC in armature",
        "Cool the motor",
      ],
    },
    {
      category: "EE",
      question: "Which material has the highest resistivity?",
      correctOptionId: 4,
      options: ["Copper", "Aluminum", "Silver", "Nichrome"],
    },
    {
      category: "EE",
      question: "What is the unit of inductance?",
      correctOptionId: 2,
      options: ["Farad", "Henry", "Ohm", "Siemens"],
    },
    {
      category: "EE",
      question: "Which relay is used for overload protection?",
      correctOptionId: 1,
      options: ["Thermal relay", "Reed relay", "Latching relay", "Solid-state relay"],
    },
    {
      category: "EE",
      question: "What is the slip of a synchronous motor?",
      correctOptionId: 3,
      options: ["5%", "10%", "0%", "Variable"],
    },
    {
      category: "EE",
      question: "Which instrument measures electric current?",
      correctOptionId: 2,
      options: ["Voltmeter", "Ammeter", "Wattmeter", "Ohmmeter"],
    },
    {
      category: "EE",
      question: "What is the typical voltage level for transmission lines in India?",
      correctOptionId: 4,
      options: ["11 kV", "33 kV", "132 kV", "400 kV"],
    },
    {
      category: "EE",
      question: "Which type of starter is used for large induction motors?",
      correctOptionId: 1,
      options: ["Star-delta starter", "DOL starter", "Soft starter", "Manual starter"],
    },
    {
      category: "EE",
      question: "What does PFC stand for in electrical systems?",
      correctOptionId: 3,
      options: [
        "Primary Frequency Control",
        "Parallel Function Circuit",
        "Power Factor Correction",
        "Protected Fuse Circuit",
      ],
    },
    {
      category: "EE",
      question: "Which loss occurs in the core of a transformer?",
      correctOptionId: 2,
      options: ["Copper loss", "Iron loss", "Friction loss", "Windage loss"],
    },
    {
      category: "EE",
      question: "What is the primary advantage of three-phase over single-phase?",
      correctOptionId: 4,
      options: [
        "Lower cost",
        "Simpler design",
        "Less maintenance",
        "More power for same conductor size",
      ],
    },
    {
      category: "EE",
      question: "Which device protects against short circuits?",
      correctOptionId: 1,
      options: ["Circuit breaker", "Ammeter", "Voltmeter", "Rheostat"],
    },
    {
      category: "EE",
      question: "What is the principle of operation of a DC generator?",
      correctOptionId: 2,
      options: [
        "Ohm's law",
        "Faraday's law of electromagnetic induction",
        "Lenz's law",
        "Kirchhoff's law",
      ],
    },
    {
      category: "EE",
      question: "Which motor is NOT self-starting?",
      correctOptionId: 3,
      options: ["DC shunt motor", "Induction motor", "Synchronous motor", "Universal motor"],
    },
    {
      category: "EE",
      question: "What is earthing used for?",
      correctOptionId: 4,
      options: [
        "Increase efficiency",
        "Reduce costs",
        "Improve power factor",
        "Prevent electric shock",
      ],
    },
    {
      category: "EE",
      question: "Which component opposes change in current?",
      correctOptionId: 2,
      options: ["Capacitor", "Inductor", "Resistor", "Diode"],
    },
    {
      category: "EE",
      question: "What is the efficiency of an ideal transformer?",
      correctOptionId: 1,
      options: ["100%", "95%", "90%", "85%"],
    },
    {
      category: "EE",
      question: "Which law is used for nodal analysis?",
      correctOptionId: 3,
      options: [
        "Ohm's law",
        "Faraday's law",
        "Kirchhoff's Current Law",
        "Lenz's law",
      ],
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
