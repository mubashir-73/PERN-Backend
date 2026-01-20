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
        "At this stage of civilization, when many nations are brought into close and vital contact for good and evil, it is essential, as never before, that their gross ignorance of one another should be diminished, that they should begin to understand a little of one another's historical experience and resulting mentality. It is the fault of the English to expect the people of other countries to react as they do, to political and international situations. Our genuine goodwill and good intentions are often brought to nothing, because we expect other people to be like us. This would be corrected if we knew the history, not necessarily in detail but in broad outlines, of the social and political conditions which have given to each nation its present character.",
      questions: {
        create: [
          {
            category: "Comprehension",
            question:
              "According to the author, the mentality of a nation is mainly the product of its?",
            options: {
              create: [
                { text: "History", isCorrect: true },
                { text: "International position" },
                { text: "Politics" },
                { text: "Present character" },
              ],
            },
          },
          {
            category: "Comprehension",
            question:
              "The need for a greater understanding between nations is?",
            options: {
              create: [
                { text: "Was always there" },
                { text: "Is no longer there" },
                { text: "Is more today than ever before", isCorrect: true },
                { text: "Will always be there" },
              ],
            },
          },
          {
            category: "Comprehension",
            question:
              "The character of a nation is the result of its?",
            options: {
              create: [
                { text: "Mentality" },
                { text: "Cultural heritage" },
                { text: "Gross ignorance" },
                { text: "Socio-political conditions", isCorrect: true },
              ],
            },
          },
          {
            category: "Comprehension",
            question:
              "According to the author, his countrymen should?",
            options: {
              create: [
                { text: "Read the story of other nations" },
                {
                  text: "Have a better understanding of other nations",
                  isCorrect: true,
                },
                { text: "Not react to others’ actions" },
                { text: "Have vital contacts with other nations" },
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
        "Laws of nature are not commands but statements of acts. The use of the word 'law' in this context is rather unfortunate. It would be better to speak of uniformities in nature. This would do away with the elementary fallacy that a law implies a law giver. If a piece of matter does not obey a law of nature it is punished. On the contrary, we say that the law has been incorrectly stated.",
      questions: {
        create: [
          {
            category: "Comprehension",
            question:
              "If a piece of matter violates nature's law, it is not punished because?",
            options: {
              create: [
                { text: "It is not binding to obey it" },
                { text: "There is no superior being to enforce it" },
                { text: "It cannot be punished" },
                {
                  text:
                    "The facts have not been correctly stated by the law",
                  isCorrect: true,
                },
              ],
            },
          },
          {
            category: "Comprehension",
            question:
              "Laws of nature differ from man-made laws because?",
            options: {
              create: [
                { text: "They state facts of nature", isCorrect: true },
                { text: "They must be obeyed" },
                { text: "They are natural" },
                { text: "They are systematic" },
              ],
            },
          },
          {
            category: "Comprehension",
            question:
              "The laws of nature based on observation are?",
            options: {
              create: [
                { text: "Conclusions about the universe" },
                { text: "True and unfalsifiable" },
                { text: "Figments of imagination" },
                {
                  text: "Subject to change in light of new facts",
                  isCorrect: true,
                },
              ],
            },
          },
          {
            category: "Comprehension",
            question:
              "The author is unhappy with the word 'law' because?",
            options: {
              create: [
                { text: "It connotes rigidity" },
                {
                  text: "It implies an agency that made them",
                  isCorrect: true,
                },
                { text: "It ignores uniformity" },
                { text: "It creates false beliefs" },
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
        "The object underlying the rules of natural justice is to prevent miscarriage of justice and secure fair play in action. The requirement of recording reasons for decisions by administrative authorities excludes arbitrariness and ensures fairness. The rules of natural justice are not embodied rules and their application depends on the statutory framework and discretion of the legislature.",
      questions: {
        create: [
          {
            category: "Comprehension",
            question:
              "‘The rules of natural justice are not embodied rules’ means they are?",
            options: {
              create: [
                { text: "Deliberately vague" },
                { text: "Cannot be interpreted" },
                { text: "Flexible", isCorrect: true },
                { text: "Impossible to visualize" },
              ],
            },
          },
          {
            category: "Comprehension",
            question:
              "From the passage, it is clear that the legislature?",
            options: {
              create: [
                {
                  text:
                    "Invests the administrative authority with powers",
                  isCorrect: true,
                },
                { text: "Embodies rules" },
                { text: "Acts only for public welfare" },
                { text: "Leaves no discretion" },
              ],
            },
          },
          {
            category: "Comprehension",
            question:
              "According to the passage, there is always a gap between?",
            options: {
              create: [
                {
                  text:
                    "Rules of natural justice and their application",
                  isCorrect: true,
                },
                { text: "Rule conception and concretization" },
                { text: "Demand and realization" },
                { text: "Intention and execution" },
              ],
            },
          },
          {
            category: "Comprehension",
            question:
              "‘To dispense with a requirement’ means?",
            options: {
              create: [
                { text: "To do without the demand", isCorrect: true },
                { text: "To drop the charge" },
                { text: "To cancel all procedure" },
                { text: "To alter provisions" },
              ],
            },
          },
          {
            category: "Comprehension",
            question:
              "Natural justice can be ensured by?",
            options: {
              create: [
                { text: "Administrative vigilance" },
                { text: "Strict rule enforcement" },
                { text: "Flexible rule framing" },
                {
                  text:
                    "Administrative authority observing fair play",
                  isCorrect: true,
                },
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
        "Australian researchers have discovered electroreceptors clustered at the tip of the spiny anteater’s snout. These receptors respond to extremely weak electrical fields, unlike tactile receptors which require much stronger stimulation. Experiments suggest anteaters use electroreceptors to locate prey.",
      questions: {
        create: [
          {
            category: "Comprehension",
            question:
              "What distinguishes electroreceptors from tactile receptors?",
            options: {
              create: [
                { text: "Response manner" },
                { text: "Location" },
                {
                  text:
                    "Amount of electrical stimulation required",
                  isCorrect: true,
                },
                { text: "Nervous activity transmitted" },
              ],
            },
          },
          {
            category: "Comprehension",
            question:
              "Which inference can be made about the experiment?",
            options: {
              create: [
                { text: "Verification was difficult" },
                { text: "Brain activity increased sharply" },
                {
                  text:
                    "Some snout areas were not sensitive",
                  isCorrect: true,
                },
                { text: "Only electroreceptors responded" },
              ],
            },
          },
          {
            category: "Comprehension",
            question:
              "Why does the author discuss tactile receptors?",
            options: {
              create: [
                {
                  text:
                    "To eliminate an alternative explanation",
                  isCorrect: true,
                },
                { text: "To highlight identical function" },
                { text: "To point out complications" },
                { text: "To introduce new factor" },
              ],
            },
          },
          {
            category: "Comprehension",
            question:
              "Which would most strengthen the hypothesis?",
            options: {
              create: [
                { text: "Training with strong signals" },
                {
                  text:
                    "Detection of weak electrical signals from ant nests",
                  isCorrect: true,
                },
                { text: "Different attack angles" },
                { text: "Same angles for other prey" },
              ],
            },
          },
          {
            category: "Comprehension",
            question:
              "What can be inferred about anteaters?",
            options: {
              create: [
                { text: "They confuse stimuli types" },
                { text: "They cannot distinguish nests" },
                {
                  text:
                    "They can be trained to recognize stimuli",
                  isCorrect: true,
                },
                { text: "They are better in labs only" },
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
      question:
        "In a coded message, SLOW MOVE, GET BACKWARDS, FIRE AWAY is written as VFMD ZMWE, BEN PCTLDCOXU, QHOE CDCI. What is the correct code?",
      correctOptionId: 1,
      options: ["UCFNI", "UCFIN", "UCINF", "UCHIN"],
    },
    {
      category: "Aptitude",
      question:
        "In a coded message, SLOW MOVE, GET BACKWARDS, FIRE AWAY is written as VFMD ZMWE, BEN PCTLDCOXU, QHOE CDCI. Choose the correct code.",
      correctOptionId: 3,
      options: ["POHTUL", "POHLLU", "POHTLU", "POHULT"],
    },
    {
      category: "Aptitude",
      question:
        "In a certain code, MEN is written as ABC and DARK is written as LSTZ. How can READ be written in this code?",
      correctOptionId: 2,
      options: ["TCSL", "TBSL", "TASL", "TLSL"],
    },
    {
      category: "Aptitude",
      question:
        'Pointing to a photograph, Suresh said, "He is the son of the only son of my mother." How is Suresh related to the boy?',
      correctOptionId: 4,
      options: ["Brother", "Uncle", "Cousin", "Father"],
    },
    {
      category: "Aptitude",
      question:
        "If A + B means A is the mother of B; A - B means A is the brother of B; A % B means A is the father of B and A x B means A is the sister of B, which shows that P is the maternal uncle of Q?",
      correctOptionId: 3,
      options: [
        "Q - N + M x P",
        "P + S x N - Q",
        "P - M + N x Q",
        "Q - S % P",
      ],
    },
    {
      category: "Aptitude",
      question:
        "If A + B means A is the father of B; A - B means A is the brother of B; A % B means A is the wife of B and A x B means A is the mother of B, which shows that M is the maternal grandmother of T?",
      correctOptionId: 1,
      options: [
        "M x N % S + T",
        "M x N - S % T",
        "M x S - N % T",
        "M x N x S % T",
      ],
    },
    {
      category: "Aptitude",
      question: "CUP : LIP :: BIRD : ?",
      correctOptionId: 4,
      options: ["BUSH", "GRASS", "FOREST", "BEAK"],
    },
    {
      category: "Aptitude",
      question: "Peacock : India :: Bear : ?",
      correctOptionId: 3,
      options: ["Australia", "America", "Russia", "England"],
    },
    {
      category: "Aptitude",
      question: "Peace : Chaos :: Creation : ?",
      correctOptionId: 3,
      options: ["Build", "Construction", "Destruction", "Manufacture"],
    },
    {
      category: "Aptitude",
      question:
        "In the series 2, 5, 10, 17, 26, ? what will be the next term?",
      correctOptionId: 3,
      options: ["38", "40", "42", "44"],
    },
    {
      category: "Aptitude",
      question: "What comes next in the series: 2P, 5M, 10J, 17G, ...?",
      correctOptionId: 3,
      options: ["24 F", "42 P", "26 D", "12 A"],
    },
    {
      category: "Aptitude",
      question:
        "A, P, R, X, S and Z are sitting in a row. S and Z are in the centre. A and P are at the ends. R is sitting to the left of A. Who is to the right of P?",
      correctOptionId: 2,
      options: ["A", "X", "S", "Z"],
    },
    {
      category: "Aptitude",
      question:
        "Eight persons E, F, G, H, I, J, K and L are seated around a square table. Who is to the immediate left of F?",
      correctOptionId: 3,
      options: ["G", "I", "J", "H"],
    },
    {
      category: "Aptitude",
      question:
        "Pepper Potts, Hulk, Ironman, Hawkeye, Thor, Loki and Black Widow are sitting in a circle. Which statement is not correct?",
      correctOptionId: 4,
      options: [
        "Loki is on the right of Hulk",
        "Hawkeye is sitting next to Ironman",
        "Thor is sitting adjacent to Loki",
        "All of the above",
      ],
    },
    {
      category: "Aptitude",
      question:
        "A and B together have Rs. 1210. If 4/15 of A’s amount is equal to 2/5 of B’s amount, how much amount does B have?",
      correctOptionId: 2,
      options: ["Rs. 460", "Rs. 484", "Rs. 550", "Rs. 664"],
    },
    {
      category: "Aptitude",
      question:
        "Two numbers are respectively 20% and 50% more than a third number. The ratio of the two numbers is:",
      correctOptionId: 3,
      options: ["2 : 5", "3 : 5", "4 : 5", "6 : 7"],
    },
    {
      category: "Aptitude",
      question:
        "In a mixture of 60 litres, the ratio of milk and water is 2 : 1. If the ratio is to be 1 : 2, how much water must be added?",
      correctOptionId: 4,
      options: ["20 litres", "30 litres", "40 litres", "60 litres"],
    },
    {
      category: "Aptitude",
      question:
        "Tickets numbered 1 to 20 are mixed and one ticket is drawn at random. What is the probability that the number is a multiple of 3 or 5?",
      correctOptionId: 4,
      options: ["1/2", "2/5", "8/15", "9/20"],
    },
    {
      category: "Aptitude",
      question:
        "In a class, there are 15 boys and 10 girls. Three students are selected at random. What is the probability that 1 girl and 2 boys are selected?",
      correctOptionId: 1,
      options: ["21/46", "25/117", "1/50", "3/25"],
    },
    {
      category: "Aptitude",
      question:
        "What are the chances that no two boys are sitting together for a photograph if there are 5 girls and 2 boys?",
      correctOptionId: 4,
      options: ["1/21", "4/7", "2/7", "5/7"],
    },

    // Verbal Questions
    {
      category: "Verbal",
      question:
        "Arrange the sentences to form a meaningful paragraph.\nA. As a result Indian people have been left subjected to high cost of living and inflation.\nB. Economists all over the world have expressed anxiety in this regard.\nC. But one of the primary reasons for such a situation has been the Indian Government’s inability to take tough decisions.\nD. The Indian economy has not shown desirable growth in recent years.\nE. The grim global economics scenario has also contributed to this problem and it seems a quick fix solution is yet far away.",
      correctOptionId: 4,
      options: ["EDCBA", "BCADE", "ACBED", "DEBCA"],
    },
    {
      category: "Verbal",
      question:
        "Arrange the sentences to form a meaningful paragraph.\nA. Scientists study animal behavior to understand ecosystems better.\nB. Observations help identify how species interact with each other.\nC. This knowledge supports conservation efforts worldwide.\nD. Many animals display complex social behaviors that surprise researchers.",
      correctOptionId: 2,
      options: ["BCDA", "ADBC", "CADB", "ACBD"],
    },
  
    // PARA JUMBLES – MODERATE
    {
      category: "Verbal",
      question:
        "Arrange the sentences logically.\nA. By reasoning we mean the mental process of drawing an inference.\nB. So logical reasoning covers those types of questions.\nC. Logic means the science of valid reasoning.\nD. Clearly, understanding statements is necessary to draw inferences.",
      correctOptionId: 2,
      options: ["ACBD", "CABD", "ABCD", "DBCA"],
    },
    {
      category: "Verbal",
      question:
        "Arrange the sentences logically.\nA. Since then, intelligence tests have been mostly used in schools.\nB. Intelligence tests give us a norm for each age.\nC. Intelligence is expressed as IQ.\nD. Binet developed the first set of such tests.\nE. Intelligence can be measured by tests.",
      correctOptionId: 3,
      options: ["CDABE", "DECAB", "EDACB", "CBADE"],
    },
  
    // PARA JUMBLES – HARD
    {
      category: "Verbal",
      question:
        "Arrange the sentences logically.\nA. The likelihood of an accident is determined by care.\nB. An accident involving a motorist and a pedestrian is such a case.\nC. Each must decide how much care to exercise.\nD. The simplest strategic problem arises when two individuals interact.",
      correctOptionId: 4,
      options: ["ABCD", "ADCB", "DBCA", "DBAC"],
    },
    {
      category: "Verbal",
      question:
        "Arrange the sentences logically.\nA. Passivity is not universal.\nB. In areas without laws, attitudes differ.\nC. So indeed it may be unsubmissive.\nD. For most peasants the issue is when to change state.\nE. This depends on political assessment.",
      correctOptionId: 4,
      options: ["BEDAC", "CDABE", "EDBAC", "ABCDE"],
    },
  
    // PARA COMPLETION – EASY
    {
      category: "Verbal",
      question:
        "Choose the sentence that best completes the paragraph about choosing a random number between 1 and 10.",
      correctOptionId: 3,
      options: [
        "This is interesting, as studies show even numbers are liked more.",
        "It turns out the world’s favorite number is seven.",
        "Seven feels more random and elusive, arithmetically speaking.",
        "Seven is more thought-provoking to the brain.",
      ],
    },
    {
      category: "Verbal",
      question:
        "Choose the sentence that best completes the paragraph about habits and motivation.",
      correctOptionId: 4,
      options: [
        "Make yourself watch Netflix on the treadmill.",
        "Maintain a food diary.",
        "Do squats while brushing teeth.",
        "Get rid of unhealthy cues and replace them with healthy ones.",
      ],
    },
  
    // GRAMMATICAL ERRORS
    {
      category: "Verbal",
      question:
        "Find the grammatical error.\n(A) We discussed about the problem\n(B) On the eve of the examination\n(C) That I found it easy\n(D) No error",
      correctOptionId: 1,
      options: ["A", "B", "C", "D"],
    },
    {
      category: "Verbal",
      question:
        "Find the grammatical error.\n(A) No sooner did I open the door\n(B) When the rain rushed in\n(C) Making us shiver\n(D) No error",
      correctOptionId: 2,
      options: ["A", "B", "C", "D"],
    },
    {
      category: "Verbal",
      question:
        "Find the grammatical error.\n(A) He fell from a train\n(B) And would have died\n(C) If villagers did not help\n(D) No error",
      correctOptionId: 3,
      options: ["A", "B", "C", "D"],
    },
  
    // VOCABULARY
    {
      category: "Verbal",
      question: "Choose the synonym of VENT.",
      correctOptionId: 1,
      options: ["Opening", "Stodge", "End", "Past tense"],
    },
    {
      category: "Verbal",
      question: "Choose the antonym of LUCID.",
      correctOptionId: 3,
      options: ["Glory", "Noisy", "Obscure", "Distinct"],
    },
  
    // IDIOMS
    {
      category: "Verbal",
      question: "Meaning of the idiom: To catch a tartar",
      correctOptionId: 4,
      options: [
        "Trap a criminal",
        "Catch a dangerous person",
        "Meet disaster",
        "Deal with someone stronger than oneself",
      ],
    },
  
    // VERBAL ANALOGIES
    {
      category: "Verbal",
      question: "DIVA : OPERA :: ?",
      correctOptionId: 4,
      options: ["producer:theatre", "director:drama", "conductor:bus", "thespian:play"],
    },
    {
      category: "Verbal",
      question: "THRUST : SPEAR :: ?",
      correctOptionId: 4,
      options: ["mangle:iron", "scabbard:sword", "bow:arrow", "fence:epee"],
    },
    {
      category: "Verbal",
      question: "CORPOREAL : SPIRITUAL :: ?",
      correctOptionId: 2,
      options: ["mesa:plateau", "moron:savant", "foreigner:immigrant", "pedagogue:teacher"],
    },
  
    // ONE WORD SUBSTITUTION
    {
      category: "Verbal",
      question: "Storehouses of grain are called?",
      correctOptionId: 2,
      options: ["barns", "granaries", "graineries", "warehouses"],
    },
    {
      category: "Verbal",
      question: "A strong believer in fate is called?",
      correctOptionId: 2,
      options: ["Atheist", "Fatalist", "Fatist", "Fate-believer"],
    },
    {
      category: "Verbal",
      question: "A person who talks in sleep is called?",
      correctOptionId: 3,
      options: ["Philatelist", "Somnambulist", "Somniloquist", "Oneirocritic"],
    },
    {
      category: "Verbal",
      question: "A person who eats too much is called?",
      correctOptionId: 1,
      options: ["Glutton", "Nibbler", "Cannibal", "Omnivore"],
    },
    {
      category: "Verbal",
      question: "Hole in a ship that drains water is called?",
      correctOptionId: 4,
      options: ["Sink", "Drain", "Scabbard", "Scupper"],
    },
    {
      category: "Verbal",
      question: "A general pardon granted by a government is called?",
      correctOptionId: 4,
      options: ["Exemption", "Discharge", "Reprieve", "Amnesty"],
    },
  
    // Computer Science Questions
    {
      category: "CS",
      question:
        "In the worst case, the number of comparisons needed to search a singly linked list of length n is:",
      correctOptionId: 4,
      options: ["log(2n)", "n/2", "log(2n) - 1", "n"],
    },
    {
      category: "CS",
      question:
        "The size of virtual memory is based on which of the following?",
      correctOptionId: 2,
      options: ["CPU", "Address Bus", "RAM", "Data Bus"],
    },
    {
      category: "CS",
      question:
        "The total number of access specifiers in OOPS for C++ is:",
      correctOptionId: 4,
      options: ["1", "4", "6", "3"],
    },
    {
      category: "CS",
      question:
        "Identify the type of learning in which labeled data is used:",
      correctOptionId: 2,
      options: [
        "Reinforcement Learning",
        "Supervised Learning",
        "Unsupervised Learning",
        "Semi-Unsupervised Learning",
      ],
    },
  
    // MEDIUM
    {
      category: "CS",
      question:
        "Among the following, which is an example of a spooled device?",
      correctOptionId: 1,
      options: [
        "A line printer that prints the output of a number of jobs",
        "A terminal that inputs user data",
        "An I/O device to display graphics",
        "None of the above",
      ],
    },
    {
      category: "CS",
      question:
        "Identify the data structure based on locality of reference used for symbol tables:",
      correctOptionId: 3,
      options: [
        "Linear list",
        "Search tree",
        "Self-organizing list",
        "Hash table",
      ],
    },
    {
      category: "CS",
      question:
        "The standard port number of secure MQTT is:",
      correctOptionId: 4,
      options: ["8000", "8888", "1883", "8883"],
    },
    {
      category: "CS",
      question:
        "Choose the option which is not applicable to agile software development:",
      correctOptionId: 3,
      options: [
        "Producing only the essential work products",
        "Rapid Application Development",
        "Abolishing project planning and testing",
        "Node",
      ],
    },
    {
      category: "CS",
      question:
        "What is the main limitation in the given C program for printing the right view of a binary tree?",
      correctOptionId: 4,
      options: [
        "Left and right nodes are NULL",
        "Queue will never be empty",
        "Queue is not initialized",
        "Queue size is fixed and may overflow for large trees",
      ],
    },
  
    // EASY (SET 2)
    {
      category: "CS",
      question:
        "Which array represents a binary max-heap?",
      correctOptionId: 2,
      options: [
        "{25, 12, 16, 13, 10, 8, 14}",
        "{25, 14, 16, 13, 10, 8, 12}",
        "{25, 14, 12, 13, 10, 8, 16}",
        "{25, 14, 13, 16, 10, 8, 12}",
      ],
    },
    {
      category: "CS",
      question:
        "What is the goal of structured programming?",
      correctOptionId: 1,
      options: [
        "Infer flow of control from program text",
        "Infer flow from compiled code",
        "Avoid use of GOTO statements",
        "None of the above",
      ],
    },
    {
      category: "CS",
      question:
        "To check whether an arithmetic expression has balanced parentheses, which data structure is best?",
      correctOptionId: 1,
      options: ["Stack", "Tree", "List", "Queue"],
    },
    {
      category: "CS",
      question:
        "Which statement is true for swapping values using the given function swap(int x, int y)?",
      correctOptionId: 1,
      options: [
        "Swap(a, b) cannot be used as parameters are passed by value",
        "Swap(a, b) cannot be used as it returns no value",
        "Call swap(&a, &b)",
        "Call swap(a, b)",
      ],
    },
  
    // MODERATE
    {
      category: "CS",
      question:
        "What is the postfix expression for: a + b × c − d ^ e ^ f ?",
      correctOptionId: 4,
      options: [
        "-+axbc∧∧def",
        "ab+cxd-e∧f∧",
        "abcx+de∧f∧",
        "abcx+def∧∧-",
      ],
    },
    {
      category: "CS",
      question:
        "The C declaration int (*f)(int *) declares:",
      correctOptionId: 1,
      options: [
        "Pointer to a function taking int pointer and returning int",
        "Function returning function pointer",
        "Function returning int pointer",
        "Function returning int",
      ],
    },
    {
      category: "CS",
      question:
        "For which values of x, y, z does the expression result in a = 4?",
      correctOptionId: 3,
      options: [
        "x=6, y=5, z=3",
        "x=5, y=4, z=5",
        "x=3, y=4, z=2",
        "x=6, y=3, z=5",
      ],
    },
  
    // HARD
    {
      category: "CS",
      question:
        "What is the output of the given C program manipulating strings?",
      correctOptionId: 4,
      options: ["string", "gnirt", "gnirts", "Output is not printed"],
    },
    {
      category: "CS",
      question:
        "What is the average stack-life of an element in the given stack scenario?",
      correctOptionId: 2,
      options: [
        "3y + 2x",
        "n(x + y) − x",
        "n(x + y)",
        "y + 2x",
      ],
    },
    {
      category: "CS",
      question:
        "Which expression will NOT give compile-time error?",
      correctOptionId: 3,
      options: ["i[5]", "i[1][2]", "j[2][3]", "j[6]"],
    },

    // Programming Questions
    {
      category: "Programming",
      question: "What does SDLC primarily define?",
      correctOptionId: 2,
      options: [
        "The programming language used in development",
        "The structured process of developing software",
        "The hardware requirements of a system",
        "The testing tools needed for automation",
      ],
    },
    {
      category: "Programming",
      question: "Verification vs Validation — which statement is correct?",
      correctOptionId: 3,
      options: [
        "Verification ensures product meets user needs; validation ensures specifications",
        "Verification is dynamic testing; validation is static testing",
        "Verification checks if the product is built correctly; validation checks if the right product is built",
        "Both verification and validation are only done after coding",
      ],
    },
    {
      category: "Programming",
      question: "Which best describes Agile vs DevOps vs Waterfall?",
      correctOptionId: 2,
      options: [
        "All three follow sequential development",
        "Agile is iterative, DevOps focuses on CI/CD, Waterfall is linear",
        "Waterfall focuses on automation, DevOps focuses on documentation",
        "Agile and DevOps do not involve customer feedback",
      ],
    },
  
    // OOPS
    {
      category: "Programming",
      question: "OOP is mainly based on which core principles?",
      correctOptionId: 2,
      options: [
        "Polymorphism, Inheritance, Compiling, Debugging",
        "Encapsulation, Inheritance, Polymorphism, Abstraction",
        "Procedures, Functions, Modules, Libraries",
        "Classes, Files, Packages, Threads",
      ],
    },
    {
      category: "Programming",
      question: "Which statement defines an object correctly?",
      correctOptionId: 3,
      options: [
        "A blueprint for creating classes",
        "A variable used for memory allocation",
        "An instance of a class",
        "A function that hides implementation",
      ],
    },
    {
      category: "Programming",
      question: "Compile-time polymorphism is achieved using?",
      correctOptionId: 3,
      options: ["Inheritance", "Virtual functions", "Method overloading", "Abstract classes"],
    },
    {
      category: "Programming",
      question: "What best describes abstraction in OOP?",
      correctOptionId: 1,
      options: [
        "Hiding data and showing only necessary parts",
        "Ability to acquire traits from a parent class",
        "Having multiple methods with same name",
        "Binding data and methods together",
      ],
    },
    {
      category: "Programming",
      question: "Virtual functions enable which feature?",
      correctOptionId: 3,
      options: [
        "Operator overloading",
        "Compile-time binding",
        "Runtime polymorphism",
        "Multiple inheritance",
      ],
    },
    {
      category: "Programming",
      question: "In SOLID, the Liskov Substitution Principle states:",
      correctOptionId: 2,
      options: [
        "A class should have only one reason to change",
        "Derived classes must be substitutable for base classes",
        "Depend on abstractions, not concrete classes",
        "Objects should not be forced to implement unused methods",
      ],
    },
  
    // FUNDAMENTALS
    {
      category: "Programming",
      question: "Which of the following is a function of an Operating System?",
      correctOptionId: 2,
      options: [
        "Compiling source code into machine code",
        "Managing memory, processes, and I/O",
        "Designing databases",
        "Writing application-level algorithms",
      ],
    },
    {
      category: "Programming",
      question: "Which statement is correct about Primary Key vs Foreign Key?",
      correctOptionId: 4,
      options: [
        "Both can contain duplicate values",
        "Primary key ensures referential integrity",
        "Foreign key uniquely identifies a row",
        "Primary key is unique; foreign key references another table’s primary key",
      ],
    },
    {
      category: "Programming",
      question: "What is the purpose of the TCP 3-way handshake?",
      correctOptionId: 2,
      options: [
        "Terminating a connection",
        "Establishing a reliable connection between sender and receiver",
        "Sending encrypted packets",
        "Checking IP address validity",
      ],
    },
  
    // DBMS
    {
      category: "Programming",
      question: "Which key uniquely identifies a record in a table?",
      correctOptionId: 2,
      options: ["Foreign Key", "Primary Key", "Candidate Key", "Alternate Key"],
    },
    {
      category: "Programming",
      question: "Which normal form removes partial dependency?",
      correctOptionId: 2,
      options: ["First Normal Form", "Second Normal Form", "Third Normal Form", "BCNF"],
    },
    {
      category: "Programming",
      question: "Which concurrency problem is prevented by SERIALIZABLE isolation?",
      correctOptionId: 4,
      options: ["Dirty Read", "Non-repeatable Read", "Phantom Read", "All of the above"],
    },
  
    // COMPUTER NETWORKS
    {
      category: "Programming",
      question: "Which device operates at the Network Layer (Layer 3) of OSI?",
      correctOptionId: 3,
      options: ["Hub", "Switch", "Router", "Repeater"],
    },
    {
      category: "Programming",
      question: "What is the main purpose of ARP?",
      correctOptionId: 1,
      options: [
        "Map IP address to MAC address",
        "Map MAC address to IP address",
        "Assign IP addresses dynamically",
        "Encrypt network packets",
      ],
    },
    {
      category: "Programming",
      question: "In TCP congestion control, which phase increases window exponentially?",
      correctOptionId: 3,
      options: ["Congestion Avoidance", "Fast Recovery", "Slow Start", "Flow Control"],
    },
  
    // OPERATING SYSTEM
    {
      category: "Programming",
      question: "Which is the core component of an Operating System?",
      correctOptionId: 2,
      options: ["Shell", "Kernel", "Compiler", "File Explorer"],
    },
    {
      category: "Programming",
      question: "Which CPU scheduling algorithm may cause starvation?",
      correctOptionId: 3,
      options: ["FCFS", "Round Robin", "Shortest Job First", "FIFO"],
    },
    {
      category: "Programming",
      question:
        "In a system with 5 processes each holding 2 resources, what is the minimum number of resources required for deadlock?",
      correctOptionId: 2,
      options: ["8", "9", "10", "11"],
    },
  
    // DATA STRUCTURES
    {
      category: "Programming",
      question: "Minimum number of stacks required to implement a queue?",
      correctOptionId: 3,
      options: ["3", "1", "2", "4"],
    },
    {
      category: "Programming",
      question: "Which is an application of Stack data structure?",
      correctOptionId: 4,
      options: [
        "Managing function calls",
        "Stock span problem",
        "Expression evaluation",
        "All of the above",
      ],
    },
    {
      category: "Programming",
      question: "After given stack/queue operations, which element is popped?",
      correctOptionId: 4,
      options: ["A", "B", "C", "D"],
    },
    {
      category: "Programming",
      question: "Which is true about linked list implementation of stack?",
      correctOptionId: 4,
      options: [
        "Push at beginning, pop at end",
        "Push at end, pop at beginning",
        "Both of the above",
        "None of the above",
      ],
    },
    {
      category: "Programming",
      question: "Which permutation is NOT possible using a stack?",
      correctOptionId: 3,
      options: ["b a c", "b c a", "c a b", "a b c"],
    },
    {
      category: "Programming",
      question: "Which linked list operation depends on list length?",
      correctOptionId: 3,
      options: [
        "Delete first element",
        "Swap first two elements",
        "Delete last element",
        "Insert at end",
      ],
    },
  
    // ALGORITHMS
    {
      category: "Programming",
      question: "Worst-case time complexity of searching in singly linked list?",
      correctOptionId: 3,
      options: ["O(log n)", "O(1)", "O(n)", "O(n log n)"],
    },
    {
      category: "Programming",
      question: "Time complexity of Radix Sort under given constraints?",
      correctOptionId: 3,
      options: ["O(n)", "O(kn)", "O(n log n)", "O(n²)"],
    },
    {
      category: "Programming",
      question: "Which of the following is NOT O(n²)?",
      correctOptionId: 3,
      options: ["15n²", "n^1.98", "n³/√n", "20n²"],
    },
  

    // AI and Data Science Questions (Original 10 + 20 new = 30 total)
    {
      category: "AD",
      question:
        "An artificially intelligent car decreases its speed based on its distance from the car in front of it. Which algorithm is used?",
      correctOptionId: 3,
      options: [
        "Naive Bayes",
        "Decision Tree",
        "Linear Regression",
        "Logistic Regression",
      ],
    },
    {
      category: "AD",
      question:
        "In k-fold cross-validation, how is the dataset divided?",
      correctOptionId: 2,
      options: [
        "It is divided into k equal datasets",
        "It is divided into k-1 training subsets and 1 validation subset",
        "It is divided into training and testing subsets based on a ratio",
        "It is divided randomly into disjointed subsets",
      ],
    },
    {
      category: "AD",
      question:
        "Which technique is used to reduce the impact of noise and outliers in a dataset?",
      correctOptionId: 2,
      options: [
        "Feature Extraction",
        "Regularization",
        "Cross-Validation",
        "Principal Component Analysis",
      ],
    },
    {
      category: "AD",
      question:
        "Which technique is used to combat the vanishing gradient problem in deep neural networks?",
      correctOptionId: 1,
      options: [
        "ReLU activation function",
        "Sigmoid activation function",
        "Tanh activation function",
        "Batch normalization",
      ],
    },
  
    // MODERATE
    {
      category: "AD",
      question:
        "In a CNN, which layer is primarily responsible for feature extraction?",
      correctOptionId: 3,
      options: [
        "Fully connected layer",
        "Pooling layer",
        "Convolution layer",
        "Output layer",
      ],
    },
    {
      category: "AD",
      question:
        "In LISP, the addition 3 + 2 is entered as?",
      correctOptionId: 4,
      options: [
        "3 + 2",
        "3 add 2",
        "3 + 2 =",
        "(+ 3 2)",
      ],
    },
    {
      category: "AD",
      question:
        "Weak AI is?",
      correctOptionId: 3,
      options: [
        "The embodiment of human intellectual capabilities within a computer",
        "A set of programs that produce human-like intelligence",
        "The study of mental faculties through models implemented on a computer",
        "All of the above",
      ],
    },
  
    // HARD
    {
      category: "AD",
      question:
        "If a self-driving car repeats a decision 5 times, what is the probability it brakes exactly 3 times?",
      correctOptionId: 1,
      options: ["0.2304", "0.3456", "0.2784", "0.1568"],
    },
    {
      category: "AD",
      question:
        "Given f(x)=x²+2x+1 and pixel values [1,2,3,4], what are the outputs?",
      correctOptionId: 1,
      options: [
        "[4, 9, 16, 25]",
        "[4, 12, 22, 34]",
        "[4, 9, 18, 27]",
        "[4, 12, 24, 38]",
      ],
    },
    {
      category: "AD",
      question:
        "How many total leaves are there in the given decision tree?",
      correctOptionId: 3,
      options: ["36", "48", "72", "96"],
    },
  
    // EASY (LATHIKA R)
    {
      category: "AD",
      question:
        "Which technique combines predictions from multiple models trained on different subsets of data?",
      correctOptionId: 2,
      options: ["Boosting", "Bagging", "Regularization", "Pruning"],
    },
    {
      category: "AD",
      question:
        "In supervised learning, the model learns using?",
      correctOptionId: 3,
      options: [
        "Unlabeled data",
        "Only numerical data",
        "Labeled data",
        "Only categorical data",
      ],
    },
    {
      category: "AD",
      question:
        "A model predicts correctly 80 times out of 100. What is its accuracy?",
      correctOptionId: 3,
      options: ["60%", "70%", "80%", "90%"],
    },
    {
      category: "AD",
      question:
        "If a dataset has 60 males and 40 females, what is the ratio of males to females?",
      correctOptionId: 2,
      options: ["2 : 3", "3 : 2", "4 : 3", "5 : 4"],
    },
  
    // MODERATE (LATHIKA R)
    {
      category: "AD",
      question:
        "Increasing the number of convolution filters in a CNN will MOST LIKELY?",
      correctOptionId: 3,
      options: [
        "Reduce model capacity",
        "Reduce training time",
        "Increase feature learning capability",
        "Eliminate overfitting",
      ],
    },
    {
      category: "AD",
      question:
        "Which of the following best describes Boosting?",
      correctOptionId: 2,
      options: [
        "Training models independently and averaging results",
        "Training models sequentially, focusing on previous errors",
        "Reducing features using dimensionality reduction",
        "Randomly sampling features",
      ],
    },
    {
      category: "AD",
      question:
        "What does kmeans.cluster_centers_ output?",
      correctOptionId: 1,
      options: [
        "Coordinates of the cluster centers",
        "Labels of each data point",
        "Number of iterations to converge",
        "Distances to cluster centers",
      ],
    },
    {
      category: "AD",
      question:
        "Which optimization method combines momentum and adaptive learning rates?",
      correctOptionId: 3,
      options: ["RMSprop", "AdaGrad", "Adam", "SGD with Momentum"],
    },
    {
      category: "AD",
      question:
        "Training loss decreases but validation loss increases. What does this indicate?",
      correctOptionId: 2,
      options: [
        "Underfitting",
        "Overfitting",
        "Low learning rate",
        "Wrong optimizer",
      ],
    },
  

    // Information Technology Questions (Original 10 + 20 new = 30 total)
    {
      category: "IT",
      question:
        "Programming a robot by physically moving it through the trajectory you want it to follow is called:",
      correctOptionId: 2,
      options: [
        "Contact sensing control",
        "Continuous-path control",
        "Robot vision control",
        "Pick-and-place control",
      ],
    },
    {
      category: "IT",
      question:
        "Frames from one LAN can be transmitted to another LAN via which device?",
      correctOptionId: 2,
      options: ["Router", "Bridge", "Repeater", "Modem"],
    },
    {
      category: "IT",
      question:
        "When you ping the loopback address, a packet is sent where?",
      correctOptionId: 2,
      options: [
        "On the network",
        "Down through the layers of the IP architecture and then up again",
        "Across the wire",
        "Through the loopback dongle",
      ],
    },
    {
      category: "IT",
      question:
        "Which command can you execute to count the number of lines in a file?",
      correctOptionId: 2,
      options: ["lc", "wc -l", "cl", "count"],
    },
  
    // MODERATE
    {
      category: "IT",
      question:
        "In a large DBMS:",
      correctOptionId: 1,
      options: [
        "Each user can see only a small part of the entire database",
        "Each user can access every subschema",
        "Each subschema contains every field in the logical schema",
        "All of the above",
      ],
    },
    {
      category: "IT",
      question:
        "An online softcopy display of a customer's charge account used to respond to an inquiry is an example of:",
      correctOptionId: 4,
      options: [
        "Forecasting report",
        "Exception report",
        "Regularly scheduled report",
        "On-demand report",
      ],
    },
    {
      category: "IT",
      question:
        "A system that provides integrated computer tools for semistructured and unstructured decisions is called:",
      correctOptionId: 1,
      options: ["DSS", "DBMS", "MIS", "Control"],
    },
  
    // HARD
    {
      category: "IT",
      question:
        "Convert the machine language instruction 11014B into assembly language:",
      correctOptionId: 3,
      options: [
        "ASRA",
        "LOADA h#0D4E, i",
        "STOREA h#014B, d",
        "ADDA h#01FE, i",
      ],
    },
    {
      category: "IT",
      question:
        "What is the main purpose of a context switch?",
      correctOptionId: 1,
      options: [
        "Save and load process state",
        "Allocate memory",
        "Execute system calls",
        "Handle I/O operations",
      ],
    },
  
    // EASY (SET 2)
    {
      category: "IT",
      question:
        "SQL views can be used to hide:",
      correctOptionId: 3,
      options: [
        "Columns and rows only",
        "Complicated SQL syntax only",
        "Both columns/rows and SQL syntax",
        "None of the above",
      ],
    },
    {
      category: "IT",
      question:
        "Which command sets the secret password to Cisco?",
      correctOptionId: 3,
      options: [
        "enable secret password Cisco",
        "enable secret cisco",
        "enable secret Cisco",
        "enable password Cisco",
      ],
    },
    {
      category: "IT",
      question:
        "RS-232-G is:",
      correctOptionId: 2,
      options: [
        "Interface between two DCE devices",
        "Interface standard between DTE and DCE",
        "Specifies only mechanical characteristics",
        "Requires only 7 pins for transmission",
      ],
    },
    {
      category: "IT",
      question:
        "In the absence of DHCP configuration problems, scopes on multiple DHCP servers are:",
      correctOptionId: 2,
      options: [
        "Unique to that subnet only",
        "For different subnets",
        "For no more than two subnets",
        "For no subnets",
      ],
    },
  
    // MEDIUM
    {
      category: "IT",
      question:
        "Which Layer 1 devices can enlarge the area covered by a single LAN segment?",
      correctOptionId: 3,
      options: [
        "1 only",
        "1 and 3",
        "3 and 4",
        "5 only",
      ],
    },
    {
      category: "IT",
      question:
        "Routers operate at layer __, LAN switches at layer __, hubs at layer __, and word processing at layer __.",
      correctOptionId: 2,
      options: [
        "3, 3, 1, 7",
        "3, 2, 1, none",
        "3, 2, 1, 7",
        "3, 3, 2, none",
      ],
    },
    {
      category: "IT",
      question:
        "Which statement is true regarding access lists applied to an interface?",
      correctOptionId: 3,
      options: [
        "Unlimited access lists can be placed",
        "Only one access list per interface",
        "One access list per direction per Layer 3 protocol",
        "Two access lists per interface",
      ],
    },
  
    // HARD (SET 2)
    {
      category: "IT",
      question:
        "Why does the data communication industry use the OSI reference model?",
      correctOptionId: 2,
      options: [
        "1 only",
        "1 and 4",
        "2 and 3",
        "3 only",
      ],
    },
    {
      category: "IT",
      question:
        "Which statement about an anonymous inner class is true?",
      correctOptionId: 3,
      options: [
        "Extends one class and implements one interface",
        "Extends one class and implements multiple interfaces",
        "Extends one class or implements one interface",
        "Implements multiple interfaces regardless of extension",
      ],
    },
    {
      category: "IT",
      question:
        "The 32-bit address 10000000 00001010 00000010 00011110 in dotted decimal is:",
      correctOptionId: 4,
      options: [
        "148.20.2.30",
        "164.100.9.61",
        "210.20.2.64",
        "128.10.2.30",
      ],
    },
  
    // Electronics and Communication Engineering Questions (Original 10 + 20 new = 30 total)
    {
      category: "EC",
      question:
        "At room temperature the current in an intrinsic semiconductor is due to:",
      correctOptionId: 4,
      options: ["Holes", "Electrons", "Ions", "Holes and Electrons"],
    },
    {
      category: "EC",
      question:
        "The velocity factor of a transmission line depends on:",
      correctOptionId: 3,
      options: [
        "Temperature",
        "Skin effect",
        "Relative permittivity of dielectric",
        "None of the above",
      ],
    },
    {
      category: "EC",
      question:
        "A duplexer is a device used to:",
      correctOptionId: 3,
      options: [
        "Feed more than one receiver from a single antenna",
        "Connect two transmitters to the same antenna",
        "Connect a receiver and a transmitter to the same antenna",
        "None of these",
      ],
    },
    {
      category: "EC",
      question:
        "ZL = 200 Ω and Zi = 50 Ω. The quarter wave transformer should have a characteristic impedance of:",
      correctOptionId: 1,
      options: ["100 Ω", "40 Ω", "10000 Ω", "4 Ω"],
    },
    {
      category: "EC",
      question:
        "In a half adder circuit, what is the Sum output when A = 1 and B = 0?",
      correctOptionId: 2,
      options: ["0", "1", "Carry", "Undefined"],
    },
    {
      category: "EC",
      question:
        "Two resistors of 10 Ω and 20 Ω are connected in series across a 30 V supply. What is the total current?",
      correctOptionId: 3,
      options: ["0.5 A", "1 A", "1.5 A", "2 A"],
    },
    {
      category: "EC",
      question:
        "The primary function of a low-pass filter is to:",
      correctOptionId: 2,
      options: [
        "Pass high frequencies and block low frequencies",
        "Pass low frequencies and attenuate high frequencies",
        "Amplify all frequencies",
        "Block all frequencies",
      ],
    },
    {
      category: "EC",
      question:
        "A 4-bit digital latch has input D = 1010 and Enable = 1. What will be the output?",
      correctOptionId: 3,
      options: ["0000", "0101", "1010", "Depends on clock"],
    },
  
    // MODERATE
    {
      category: "EC",
      question:
        "An ideal operational amplifier has:",
      correctOptionId: 1,
      options: [
        "Infinite input resistance and zero output resistance",
        "Zero input resistance and infinite output resistance",
        "Infinite input resistance and infinite output resistance",
        "Finite input resistance and zero output resistance",
      ],
    },
    {
      category: "EC",
      question:
        "In a 3-phase semiconverter, the freewheeling diode comes into operation only if firing angle:",
      correctOptionId: 3,
      options: [
        "Is zero",
        "Is 60°",
        "Is more than 60°",
        "Is more than 90°",
      ],
    },
    {
      category: "EC",
      question:
        "A unity feedback control system has open-loop transfer function G(s) = K / [ s(s+4) ]. What is the type of the system?",
      correctOptionId: 2,
      options: ["Type-0", "Type-1", "Type-2", "Type-3"],
    },
    {
      category: "EC",
      question:
        "In a series RLC circuit operating at resonance, which statement is true?",
      correctOptionId: 2,
      options: [
        "Impedance is maximum and current is minimum",
        "Impedance is minimum and current is maximum",
        "Impedance is infinite",
        "Phase angle is 90°",
      ],
    },
  
    // HARD
    {
      category: "EC",
      question:
        "A microprocessor with a 16-bit address bus is used with 4 memory chips in linear selection. What is the maximum addressable memory?",
      correctOptionId: 1,
      options: ["64 k", "16 k", "8 k", "4 k"],
    },
    {
      category: "EC",
      question:
        "Which of the following statements is false?",
      correctOptionId: 1,
      options: [
        "Impulse noise voltage does not depend on bandwidth",
        "Thermal noise is independent of frequency",
        "Industrial noise is mostly of impulse type",
        "Space noise is observable above 8 MHz",
      ],
    },
    {
      category: "EC",
      question:
        "In the self-biasing scheme of a BJT, S₁ tends to unity by:",
      correctOptionId: 3,
      options: [
        "Increasing RF",
        "Decreasing RF",
        "Decreasing RF and increasing RC",
        "Increasing RF and decreasing RC",
      ],
    },
    {
      category: "EC",
      question:
        "If port 2 of a two-port network is open-circuited, what is the input impedance at port 1?",
      correctOptionId: 2,
      options: ["20 Ω", "50 Ω", "70 Ω", "100 Ω"],
    },
    {
      category: "EC",
      question:
        "A BJT common-emitter amplifier has β = 100 and Rc = 4 kΩ. If base current increases by 10 μA, what is the change in collector voltage?",
      correctOptionId: 2,
      options: ["2 V", "4 V", "10 V", "40 V"],
    },
    {
      category: "EC",
      question:
        "The Butterworth filter is preferred when:",
      correctOptionId: 3,
      options: [
        "Sharp cutoff is required",
        "Linear phase is critical",
        "Flat magnitude response is required",
        "Stopband ripple is acceptable",
      ],
    },

    // Electrical and Electronics Engineering Questions (Original 10 + 20 new = 30 total)
    {
      category: "EE",
      question:
        "The RMS value is ______ times the maximum value.",
      correctOptionId: 4,
      options: ["1.414", "0.5", "2", "0.707"],
    },
    {
      category: "EE",
      question:
        "Usually phasor diagrams are drawn representing:",
      correctOptionId: 1,
      options: [
        "RMS value",
        "Peak value",
        "Average value",
        "Instantaneous value",
      ],
    },
    {
      category: "EE",
      question:
        "Which logic gate gives an output HIGH only when all inputs are HIGH?",
      correctOptionId: 3,
      options: ["OR", "NAND", "AND", "XOR"],
    },
    {
      category: "EE",
      question:
        "A thermistor is a type of:",
      correctOptionId: 2,
      options: ["Switch", "Resistor", "Battery", "Power supply"],
    },
    {
      category: "EE",
      question:
        "A proportional (P) controller mainly reduces:",
      correctOptionId: 2,
      options: [
        "Steady-state error",
        "Rise time",
        "Overshoot only",
        "Noise",
      ],
    },
    {
      category: "EE",
      question:
        "A Zener diode is primarily used for:",
      correctOptionId: 3,
      options: [
        "Amplification",
        "Rectification",
        "Voltage regulation",
        "Switching",
      ],
    },
    {
      category: "EE",
      question:
        "In a series RLC circuit operating above resonant frequency, the current:",
      correctOptionId: 1,
      options: [
        "Lags the applied voltage",
        "Leads the applied voltage",
        "Is in phase with the applied voltage",
        "Is zero",
      ],
    },
    {
      category: "EE",
      question:
        "An electric heater draws 3.5 A from a 110 V source. The resistance is approximately:",
      correctOptionId: 4,
      options: ["385 Ω", "38.5 Ω", "3.1 Ω", "31 Ω"],
    },
  
    // MODERATE
    {
      category: "EE",
      question:
        "Two current phasors of 12 A and 5 A intersect at 90°. What is the resultant current?",
      correctOptionId: 1,
      options: ["13 A", "10 A", "6 A", "5 A"],
    },
    {
      category: "EE",
      question:
        "In an ideal operational amplifier, the input impedance is:",
      correctOptionId: 4,
      options: ["Zero", "Very low", "Finite", "Infinite"],
    },
    {
      category: "EE",
      question:
        "How many flip-flops are required to design a MOD-16 counter?",
      correctOptionId: 3,
      options: ["2", "3", "4", "5"],
    },
    {
      category: "EE",
      question:
        "Let v = 2x²y + 3y²z + 4z³x. The curl of the gradient of v is:",
      correctOptionId: 1,
      options: ["0", "∞", "4ax + 6ay + 8az", "None of the above"],
    },
    {
      category: "EE",
      question:
        "Which amplifier configuration provides a voltage gain of approximately 1?",
      correctOptionId: 3,
      options: [
        "Inverting amplifier",
        "Non-inverting amplifier",
        "Voltage follower",
        "Differential amplifier",
      ],
    },
    {
      category: "EE",
      question:
        "What is the peak restriking voltage of the given 3-phase alternator system?",
      correctOptionId: 2,
      options: ["18.36 kV", "17.96 kV", "15.96 kV", "12.65 kV"],
    },
    {
      category: "EE",
      question:
        "What is the highest frequency contained in a pulse with 10 μs rise and fall time?",
      correctOptionId: 1,
      options: ["35 kHz", "3.5 kHz", "10 kHz", "100 kHz"],
    },
    {
      category: "EE",
      question:
        "A 3.3 kΩ resistor and 120 mH coil are in parallel across 2 kHz, 12 V AC. What is the total current?",
      correctOptionId: 1,
      options: ["8.74 mA", "874 mA", "874 μA", "8.74 μA"],
    },
    {
      category: "EE",
      question:
        "A PID controller is preferred over a PI controller because it:",
      correctOptionId: 2,
      options: [
        "Eliminates noise completely",
        "Improves transient response and stability",
        "Reduces system order",
        "Works only for DC systems",
      ],
    },
  
  // Biotechnology (BT) - 20 more questions
  {
    category: "BT",
    question:
      "In Hardy-Weinberg equilibrium, if p = 0.7 for allele A, what is the frequency of heterozygotes (2pq)?",
    correctOptionId: 1,
    options: ["0.42", "0.49", "0.21", "0.30"],
  },
  {
    category: "BT",
    question:
      "The primary site of ATP synthesis in eukaryotic cells is:",
    correctOptionId: 2,
    options: [
      "Nucleus",
      "Mitochondria",
      "Golgi apparatus",
      "Endoplasmic reticulum",
    ],
  },
  {
    category: "BT",
    question:
      "In a bioprocess with C6H12O6 → 2C2H5OH + 2CO2, the stoichiometric yield of ethanol is closest to:",
    correctOptionId: 1,
    options: ["0.51", "0.25", "0.90", "1.11"],
  },
  {
    category: "BT",
    question:
      "Penicillin is primarily produced by which fungal genus?",
    correctOptionId: 2,
    options: ["Aspergillus", "Penicillium", "Rhizopus", "Trichoderma"],
  },
  {
    category: "BT",
    question:
      "What term describes the joining of the nucleus of a sperm with the nucleus of an egg cell?",
    correctOptionId: 2,
    options: ["Sex", "Fertilisation", "Intercourse", "Reproduction"],
  },
  {
    category: "BT",
    question:
      "The molecular technique used to amplify DNA sequences between two primers is called:",
    correctOptionId: 3,
    options: [
      "Southern blotting",
      "Northern blotting",
      "Polymerase chain reaction",
      "DNA replication",
    ],
  },
  {
    category: "BT",
    question:
      "Sonti is a:",
    correctOptionId: 1,
    options: [
      "Rice beer or wine of India",
      "Wheat beer or wine",
      "Barley beer or wine",
      "Rice beer or wine of Japan",
    ],
  },
  {
    category: "BT",
    question:
      "Problems in obtaining large amounts of proteins from recombinant genes can be overcome by using:",
    correctOptionId: 2,
    options: [
      "BACs",
      "Expression vectors",
      "YACs",
      "All of these",
    ],
  },

  // MEDIUM
  {
    category: "BT",
    question:
      "When populations are small and allele frequencies change randomly, the phenomenon is called:",
    correctOptionId: 4,
    options: [
      "Assortative mating",
      "Inbreeding",
      "Heterosis",
      "Genetic drift",
    ],
  },
  {
    category: "BT",
    question:
      "Which restriction enzyme produces blunt ends?",
    correctOptionId: 2,
    options: ["SalI", "EcoRV", "XhoI", "HindIII"],
  },
  {
    category: "BT",
    question:
      "In sparkling wine production, the cuvée refers to:",
    correctOptionId: 4,
    options: [
      "Wire cage holding the cork",
      "Sugar added before corking",
      "Sugar/yeast added to base wine",
      "The base wine",
    ],
  },
  {
    category: "BT",
    question:
      "During DNA replication, the leading strand is synthesized:",
    correctOptionId: 2,
    options: [
      "Discontinuously",
      "Continuously",
      "Only in eukaryotes",
      "By RNA polymerase",
    ],
  },
  {
    category: "BT",
    question:
      "For a reaction with ΔH = −20 kJ/mol and ΔS = −50 J/mol·K at 298 K, the value of ΔG is:",
    correctOptionId: 1,
    options: [
      "−1.65 kJ/mol (spontaneous)",
      "+1.65 kJ/mol (non-spontaneous)",
      "0 kJ/mol",
      "−20 kJ/mol",
    ],
  },
  {
    category: "BT",
    question:
      "In microbial cultures, oxygen transfer rate (OTR) is given by kLa(Cs − C). Here, kLa represents:",
    correctOptionId: 1,
    options: [
      "Mass transfer coefficient",
      "Biomass concentration",
      "Substrate diffusivity",
      "Viscosity factor",
    ],
  },

  // HARD
  {
    category: "BT",
    question:
      "In Agrobacterium-mediated transformation, T-DNA is transferred via:",
    correctOptionId: 2,
    options: [
      "Type I secretion system",
      "Type IV secretion system",
      "Conjugation pilus",
      "Transposase enzyme",
    ],
  },
  {
    category: "BT",
    question:
      "The PAM sequence recognized by SpCas9 in CRISPR gene editing is:",
    correctOptionId: 1,
    options: ["NGG", "NGGNGG", "TTT", "N20NGC"],
  },
  {
    category: "BT",
    question:
      "For a chemostat with μ = 0.5 h⁻¹, D = 0.4 h⁻¹, YX/S = 0.5 g/g, and Sin = 20 g/L, the steady-state biomass X is:",
    correctOptionId: 1,
    options: ["4", "8", "10", "20"],
  },
  {
    category: "BT",
    question:
      "The RP13 gene of chromosome 17 codes for a protein:",
    correctOptionId: 3,
    options: [
      "Involved in glucose transport",
      "Component of hair and nails",
      "Involved in eye development",
      "Involved in personality determination",
    ],
  },
  {
    category: "BT",
    question:
      "Which of the following are used as selection markers in Agrobacterium transformation?",
    correctOptionId: 4,
    options: [
      "Neomycin phosphotransferase",
      "Streptomycin phosphotransferase",
      "Hygromycin phosphotransferase",
      "Any of the above",
    ],
  },
  {
    category: "BT",
    question:
      "The vast dominant woodlands in Europe, Asia, North America, and the Himalayas are mainly composed of:",
    correctOptionId: 3,
    options: [
      "All gymnosperms except conifers",
      "Only angiosperms",
      "Only conifers",
      "Angiosperms and gymnosperms except conifers",
    ],
  },


  // Chemical Engineering (CH) - 20 more questions
  {
    category: "CH",
    question:
      "The terminal velocity of a small sphere settling in a viscous fluid varies as the:",
    correctOptionId: 2,
    options: [
      "First power of its diameter",
      "Inverse of the fluid viscosity",
      "Square of the difference in specific weights of solid and fluid",
      "Inverse square of the diameter",
    ],
  },
  {
    category: "CH",
    question:
      "What is the heat transferred to the system if the change in internal energy is 10 J?",
    correctOptionId: 3,
    options: ["-10 J", "0", "10 J", "Cannot be determined"],
  },
  {
    category: "CH",
    question:
      "The ratio of shear stress to shear strain is called:",
    correctOptionId: 2,
    options: [
      "Bulk modulus",
      "Modulus of rigidity",
      "Modulus of elasticity",
      "Shear modulus",
    ],
  },
  {
    category: "CH",
    question:
      "Out of the following, depreciation calculated by which method is maximum?",
    correctOptionId: 2,
    options: [
      "Straight line",
      "Sum of the years digit",
      "Sinking fund",
      "Diminishing balance",
    ],
  },
  {
    category: "CH",
    question:
      "Internal energy change of a system over one complete cycle is:",
    correctOptionId: 1,
    options: ["Zero", "Positive", "Negative", "Dependent on path"],
  },
  {
    category: "CH",
    question:
      "Laminar flow of a Newtonian fluid ceases when Reynolds number exceeds:",
    correctOptionId: 2,
    options: ["4000", "2100", "1500", "3000"],
  },
  {
    category: "CH",
    question:
      "Which statement is NOT true about a catalyst?",
    correctOptionId: 3,
    options: [
      "Initiates a reaction",
      "Lowers activation energy",
      "Reacts with one of the reactants",
      "Can be recovered unchanged",
    ],
  },
  {
    category: "CH",
    question:
      "The process employing desorption of the absorbed solute by a solvent is called:",
    correctOptionId: 1,
    options: ["Elution", "Osmosis", "Reverse osmosis", "Sublimation"],
  },

  // MODERATE
  {
    category: "CH",
    question:
      "Which of the following reactors gives maximum gas conversion?",
    correctOptionId: 4,
    options: [
      "Fixed bed reactor",
      "Fluidised bed reactor",
      "Semi-fluidised bed reactor",
      "Plug-flow catalytic reactor",
    ],
  },
  {
    category: "CH",
    question:
      "The Fenske equation determines the:",
    correctOptionId: 3,
    options: [
      "Maximum number of ideal plates",
      "Height of distillation column",
      "Minimum number of theoretical plates",
      "Optimum reflux ratio",
    ],
  },
  {
    category: "CH",
    question:
      "Mercury does not wet glass due to:",
    correctOptionId: 4,
    options: ["Surface tension", "Viscosity", "Cohesion", "Adhesion"],
  },
  {
    category: "CH",
    question:
      "Pick out the wrong statement related to chemical plant economics:",
    correctOptionId: 4,
    options: [
      "Annual depreciation rate of buildings is about 3%",
      "Insurance rates may be about 1% of fixed capital",
      "R&D cost is about 15% of net sales realization",
      "Machinery depreciation is about 10% of fixed capital",
    ],
  },
  {
    category: "CH",
    question:
      "Pick out the wrong statement regarding valve, sieve and bubble cap trays:",
    correctOptionId: 3,
    options: [
      "Murphree efficiency is nearly equal for all trays",
      "Maintenance cost is higher for valve and sieve trays",
      "Valve trays have the lowest turndown ratio",
      "Bubble cap trays are best for low vapour rates",
    ],
  },
  {
    category: "CH",
    question:
      "A sphere of radius R1 is enclosed in a sphere of radius R2. The view factor of the outer sphere with respect to the inner sphere is:",
    correctOptionId: 2,
    options: ["0", "R2 / (R1 + R2)", "1", "(R1 / R2)²"],
  },

  // DIFFICULT
  {
    category: "CH",
    question:
      "For laminar flow in a circular tube, if velocity is reduced by half, the new heat transfer coefficient is:",
    correctOptionId: 2,
    options: ["0.794 h₁", "0.574 h₁", "1.741 h₁", "1.26 h₁"],
  },
  {
    category: "CH",
    question:
      "For a steam pipe insulated with 2 cm insulation, the heat loss will be:",
    correctOptionId: 2,
    options: [
      "Less than uninsulated pipe",
      "Equal to uninsulated pipe",
      "Less than pipe with 5 cm insulation",
      "Greater than uninsulated pipe",
    ],
  },
  {
    category: "CH",
    question:
      "The breakeven cost of energy (₹/GJ) for the given heat integration problem is closest to:",
    correctOptionId: 2,
    options: ["33500", "43800", "54200", "65400"],
  },
  {
    category: "CH",
    question:
      "Unsaturated air passed through a water spray chamber below its wet-bulb temperature will be:",
    correctOptionId: 1,
    options: [
      "Cooled and humidified",
      "Dehumidified and warmed",
      "Heated only",
      "No change",
    ],
  },
  {
    category: "CH",
    question:
      "The Thiele–Geddes equation is used in:",
    correctOptionId: 3,
    options: [
      "Liquid–liquid extraction",
      "Solid–liquid extraction",
      "Multicomponent absorption with reaction",
      "Multicomponent distillation",
    ],
  },
  {
    category: "CH",
    question:
      "Fresh water pipelines in chemical plants are coloured:",
    correctOptionId: 1,
    options: ["Sea green", "Brown", "Yellow", "Red"],
  },

  // Mechanical Engineering (ME) - 20 more questions
  {
    category: "ME",
    question:
      "A plain carbon steel has mean yield strength 300 N/mm² with standard deviation 50 N/mm². If mean tensile stress is 250 N/mm² with standard deviation 65 N/mm², what are the mean and standard deviation of margin of safety?",
    correctOptionId: 2,
    options: [
      "23.45 N/mm², 50 N/mm²",
      "50 N/mm², 82 N/mm²",
      "82 N/mm², 7.07 N/mm²",
      "7.07 N/mm², 50 N/mm²",
    ],
  },
  {
    category: "ME",
    question:
      "For a thin rotating ring of radius r, density ρ, rotating at angular velocity ω, the circumferential (hoop) stress is:",
    correctOptionId: 1,
    options: [
      "σ = ρ r² ω²",
      "σ = (ρ r² ω²)/2",
      "σ = (ρ r² ω²)/3",
      "σ = (E r² ω²)/ρ",
    ],
  },

  // MODERATE
  {
    category: "ME",
    question:
      "At any point on the saturation curve in a psychrometric chart, the dry bulb temperature is:",
    correctOptionId: 3,
    options: [
      "Less than the wet bulb temperature",
      "More than the wet bulb temperature",
      "Equal to the wet bulb temperature",
      "Cannot be predicted",
    ],
  },
  {
    category: "ME",
    question:
      "In a parallel flow heat exchanger:",
    correctOptionId: 3,
    options: [
      "Exit temperature of hot fluid equals cold fluid",
      "Exit temperature of hot fluid is less than cold fluid",
      "Exit temperature of hot fluid is more than cold fluid",
      "Exit temperatures cannot be predicted",
    ],
  },
  {
    category: "ME",
    question:
      "What happens when the distance between flange and cylinder block is varied?",
    correctOptionId: 2,
    options: [
      "Piston displacement cannot be varied",
      "Variable flow rate of fluid can be achieved",
      "Fixed flow rate can be achieved",
      "All of the above",
    ],
  },

{
  category: "ME",
  question:
    "If n₁ and n₂ are the indices of compression for the first and second stage of compression, then the ratio of work done on the first and second stages (W₁/W₂) with perfect intercooling is given by:",
  correctOptionId: 2,
  options: [
    "n₂(n₁ − 1) / [n₁(n₂ − 1)]",
    "n₁(n₂ − 1) / [n₂(n₁ − 1)]",
    "n₁ / n₂",
    "n₂ / n₁",
  ],
},
{
  category: "ME",
  question:
    "The boiler efficiency is given by (where mₛ = mass of steam generated, m_f = mass of fuel, C = calorific value of fuel, h = total heat of steam, h_f₁ = sensible heat of feed water):",
  correctOptionId: 3,
  options: [
    "m_f · C / [mₛ(h − h_f₁)]",
    "m_f · C / [mₛ(h + h_f₁)]",
    "mₛ(h − h_f₁) / (m_f · C)",
    "mₛ(h + h_f₁) / (m_f · C)",
  ],
},

  {
    category: "ME",
    question:
      "According to Boyle’s law, for a perfect gas:",
    correctOptionId: 2,
    options: [
      "p/T = constant, if v is constant",
      "p v = constant, if T is constant",
      "T/p = constant, if v is constant",
      "v/T = constant, if p is constant",
    ],
  },
  {
    category: "ME",
    question:
      "The theoretical power required to drive a reciprocating pump is:",
    correctOptionId: 4,
    options: [
      "w Q Hs",
      "w Q Hd",
      "w Q (Hs − Hd)",
      "w Q (Hs + Hd)",
    ],
  },
  {
    category: "ME",
    question:
      "Liquid fuels have higher calorific value than solid fuels.",
    correctOptionId: 1,
    options: ["True", "False"],
  },
  {
    category: "ME",
    question:
      "What is the common limitation of string law?",
    correctOptionId: 2,
    options: [
      "Valid when more than three particles are connected",
      "Direction of motion cannot be specified",
      "Both A and B",
      "None of the above",
    ],
  },

  // IC ENGINES / STRENGTH
  {
    category: "ME",
    question:
      "Reference fuels for knock rating of spark ignition engines are:",
    correctOptionId: 4,
    options: [
      "Iso-octane and alpha-methyl naphthalene",
      "Normal octane and aniline",
      "Iso-octane and normal hexane",
      "Normal heptane and iso-octane",
    ],
  },
  {
    category: "ME",
    question:
      "Euler’s formula for buckling holds good only for:",
    correctOptionId: 2,
    options: [
      "Short columns",
      "Long columns",
      "Both short and long columns",
      "Weak columns",
    ],
  },
  {
    category: "ME",
    question:
      "A column will tend to buckle about the axis having:",
    correctOptionId: 4,
    options: [
      "Axis of load",
      "Perpendicular to load axis",
      "Maximum moment of inertia",
      "Minimum moment of inertia",
    ],
  },
  {
    category: "ME",
    question:
      "Kinematic viscosity is defined as:",
    correctOptionId: 1,
    options: [
      "Ratio of absolute viscosity to density",
      "Ratio of density to absolute viscosity",
      "Product of absolute viscosity and density",
      "Product of absolute viscosity and mass",
    ],
  },

  // MEDIUM
  {
    category: "ME",
    question:
      "Thermal efficiency of an Otto cycle with compression ratio 5.5 is approximately:",
    correctOptionId: 2,
    options: ["25%", "50%", "70%", "100%"],
  },
  {
    category: "ME",
    question:
      "Which statement is wrong regarding boilers?",
    correctOptionId: 4,
    options: [
      "Locomotive boiler is a water tube boiler",
      "Water tube boilers are internally fired",
      "La-mont boiler is a low pressure boiler",
      "All of the above",
    ],
  },
  {
    category: "ME",
    question:
      "Side rake angle of a single point cutting tool is the angle:",
    correctOptionId: 2,
    options: [
      "Inclination towards back",
      "Inclination sideways",
      "Between flank and perpendicular plane",
      "Between flank and base line",
    ],
  },
  {
    category: "ME",
    question:
      "If energy radiated per second per cm² between λ and λ+dλ is eλ dλ, then eλ is called:",
    correctOptionId: 2,
    options: [
      "Absorptive power",
      "Emissive power",
      "Emissivity",
      "None of these",
    ],
  },



  // Automobile Engineering (AE) - 20 more questions
  {
    category: "AE",
    question:
      "In an automobile suspension system, unsprung mass consists of:",
    correctOptionId: 3,
    options: [
      "Chassis and body",
      "Engine and transmission",
      "Wheels, tyres, and part of axle",
      "Passengers and luggage",
    ],
  },
  {
    category: "AE",
    question:
      "When the top of the wheel is tilted outward, it is called:",
    correctOptionId: 1,
    options: [
      "Positive camber",
      "Negative camber",
      "Positive caster",
      "Negative caster",
    ],
  },
  {
    category: "AE",
    question:
      "The purpose of transmission in an automobile is to:",
    correctOptionId: 2,
    options: [
      "Vary the speed of automobile",
      "Vary the torque at the wheels",
      "Vary the power of automobile",
      "None of these",
    ],
  },
  {
    category: "AE",
    question:
      "Diesel engines are also known as:",
    correctOptionId: 2,
    options: [
      "Spark ignition engines",
      "Compression ignition engines",
      "Steam engines",
      "None of these",
    ],
  },

  // MEDIUM
  {
    category: "AE",
    question:
      "A four-cylinder engine has a capacity of 2.4 litres. The swept volume of one cylinder is:",
    correctOptionId: 2,
    options: [
      "400 cm³",
      "600 cm³",
      "1200 cm³",
      "2400 cm³",
    ],
  },
  {
    category: "AE",
    question:
      "Caster in an automobile is:",
    correctOptionId: 3,
    options: [
      "Forward tilt of the kingpin",
      "Backward tilt of the kingpin",
      "Either forward or backward tilt of the kingpin",
      "None of these",
    ],
  },
  {
    category: "AE",
    question:
      "The motion of the cam is transferred to the valves through:",
    correctOptionId: 2,
    options: [
      "Pistons",
      "Rocker arms",
      "Camshaft pulley",
      "Valve stems",
    ],
  },

  // HARD
  {
    category: "AE",
    question:
      "In a four-speed four-stroke diesel engine, the intake valve:",
    correctOptionId: 2,
    options: [
      "Opens at TDC and closes at BDC",
      "Opens before TDC and closes after BDC",
      "Opens after TDC and closes before BDC",
      "None of the above",
    ],
  },
  {
    category: "AE",
    question:
      "The correct sequence of force transmission from steering wheel to front wheels is:",
    correctOptionId: 2,
    options: [
      "Steering wheel → gearbox → shaft → tie rod → knuckle → wheels",
      "Steering wheel → shaft → gearbox → tie rod → knuckle → wheels",
      "Steering wheel → shaft → gearbox → knuckle → tie rod → wheels",
      "Steering wheel → tie rod → gearbox → shaft → knuckle → wheels",
    ],
  },
  {
    category: "AE",
    question:
      "Brake disc run-out mainly causes:",
    correctOptionId: 2,
    options: [
      "Ineffective braking",
      "Judder during braking",
      "Localized pad wear",
      "Rapid pad wear",
    ],
  },

  // EASY (ABS / CLUTCH / DIFFERENTIAL)
  {
    category: "AE",
    question:
      "During ABS operation, the brake pedal:",
    correctOptionId: 3,
    options: [
      "Is pushed upward forcefully",
      "Pedal stroke becomes longer",
      "Transmits slight kickback to the driver’s foot",
      "All of the above",
    ],
  },
  {
    category: "AE",
    question:
      "If engine coolant leaks into engine oil, the oil:",
    correctOptionId: 1,
    options: [
      "Appears milky",
      "Becomes foamy",
      "Turns black",
      "None of the above",
    ],
  },
  {
    category: "AE",
    question:
      "The main function of a clutch is to:",
    correctOptionId: 2,
    options: [
      "Transmit power permanently",
      "Disconnect engine from transmission when required",
      "Increase engine speed",
      "Reduce fuel consumption",
    ],
  },
  {
    category: "AE",
    question:
      "The function of a differential is to:",
    correctOptionId: 2,
    options: [
      "Increase vehicle speed",
      "Allow rear wheels to rotate at different speeds",
      "Reduce engine vibrations",
      "Control braking force",
    ],
  },

  // MEDIUM
  {
    category: "AE",
    question:
      "During braking, weight transfer from rear axle to front axle is due to:",
    correctOptionId: 2,
    options: [
      "Centrifugal force",
      "Inertia force",
      "Gyroscopic effect",
      "Frictional force",
    ],
  },
  {
    category: "AE",
    question:
      "In a four-stroke petrol engine, the inlet valve opens during:",
    correctOptionId: 1,
    options: [
      "Suction stroke only",
      "Suction and compression strokes",
      "Suction and exhaust strokes",
      "Compression stroke only",
    ],
  },
  {
    category: "AE",
    question:
      "The purpose of a synchromesh device in a gearbox is to:",
    correctOptionId: 2,
    options: [
      "Reduce friction between gears",
      "Allow smooth engagement of gears",
      "Increase torque transmission",
      "Prevent clutch slipping",
    ],
  },

  // HARD
  {
    category: "AE",
    question:
      "Brake fade in automobiles is mainly caused due to:",
    correctOptionId: 1,
    options: [
      "Loss of friction due to overheating",
      "Improper brake adjustment",
      "Excessive pedal travel",
      "Air leakage in brake lines",
    ],
  },
  {
    category: "AE",
    question:
      "The main purpose of firing order in a multi-cylinder engine is to:",
    correctOptionId: 1,
    options: [
      "Reduce vibration and ensure smooth running",
      "Increase engine power",
      "Improve fuel economy",
      "Reduce exhaust emissions",
    ],
  },
  {
    category: "AE",
    question:
      "The indicated power of a four-stroke engine is given by:",
    correctOptionId: 1,
    options: [
      "P × L × A × N / 2",
      "P × L × A × N",
      "2 × P × L × A × N",
      "P × L × A × N / 4",
    ],
  },


  // Civil Engineering (CE) - 20 more questions
  {
    category: "CE",
    question: "Which component of concrete provides binding action?",
    correctOptionId: 3,
    options: [
      "Fine aggregate",
      "Coarse aggregate",
      "Cement",
      "Water",
    ],
  },
  {
    category: "CE",
    question: "The standard size of a brick as per IS code is:",
    correctOptionId: 1,
    options: [
      "190 × 90 × 90 mm",
      "230 × 110 × 75 mm",
      "240 × 115 × 75 mm",
      "200 × 100 × 100 mm",
    ],
  },
  {
    category: "CE",
    question: "Which test is used to determine the standard consistency of cement?",
    correctOptionId: 2,
    options: [
      "Slump test",
      "Vicat test",
      "Compaction factor test",
      "Flow table test",
    ],
  },
  {
    category: "CE",
    question: "The SI unit of stress is:",
    correctOptionId: 3,
    options: [
      "N",
      "N/mm",
      "N/m²",
      "kg/m²",
    ],
  },
  {
    category: "CE",
    question: "Which foundation is suitable for weak soils?",
    correctOptionId: 3,
    options: [
      "Isolated footing",
      "Combined footing",
      "Raft foundation",
      "Strip footing",
    ],
  },
  {
    category: "CE",
    question: "In M25 concrete, what does 'M' and '25' represent?",
    correctOptionId: 1,
    options: [
      "Mix grade and characteristic compressive strength (N/mm²)",
      "Rolled Cement Concrete",
      "Reinforced Concrete Composite",
      "Reinforced Civil Construction",
    ],
  },
  {
    category: "CE",
    question: "Which instrument is used to measure horizontal angles in surveying?",
    correctOptionId: 2,
    options: [
      "Dumpy level",
      "Theodolite",
      "Chain",
      "Compass",
    ],
  },
  {
    category: "CE",
    question: "Temporary roads constructed during construction work are called:",
    correctOptionId: 3,
    options: [
      "National highways",
      "Expressways",
      "Katcha roads",
      "Bypass roads",
    ],
  },

  // MEDIUM
  {
    category: "CE",
    question: "Effective stress is equal to:",
    correctOptionId: 2,
    options: [
      "Total stress + pore pressure",
      "Total stress − pore pressure",
      "Pore pressure − total stress",
      "Zero",
    ],
  },
  {
    category: "CE",
    question: "A beam fixed at one end and free at the other is called:",
    correctOptionId: 3,
    options: [
      "Simply supported beam",
      "Continuous beam",
      "Cantilever beam",
      "Overhanging beam",
    ],
  },
  {
    category: "CE",
    question: "Curing of concrete is done to:",
    correctOptionId: 4,
    options: [
      "Increase workability",
      "Prevent cracking",
      "Increase strength",
      "All of the above",
    ],
  },
  {
    category: "CE",
    question: "The primary purpose of reinforcement in concrete is to resist:",
    correctOptionId: 3,
    options: [
      "Compression",
      "Shear",
      "Tension",
      "Shrinkage",
    ],
  },
  {
    category: "CE",
    question: "A slab is considered one-way when:",
    correctOptionId: 3,
    options: [
      "Both spans are equal",
      "One span is twice the other",
      "Longer span / shorter span > 2",
      "Thickness is less",
    ],
  },
  {
    category: "CE",
    question: "Slump test is mainly used to measure:",
    correctOptionId: 2,
    options: [
      "Strength",
      "Workability",
      "Durability",
      "Permeability",
    ],
  },

  // HARD
  {
    category: "CE",
    question: "Terzaghi’s bearing capacity theory assumes soil to be:",
    correctOptionId: 2,
    options: [
      "Elastic",
      "Homogeneous and isotropic",
      "Saturated only",
      "Layered",
    ],
  },
  {
    category: "CE",
    question: "Primary consolidation of soil occurs due to:",
    correctOptionId: 2,
    options: [
      "Expulsion of air",
      "Expulsion of water",
      "Compression of soil grains",
      "Chemical reaction",
    ],
  },
  {
    category: "CE",
    question: "Limit State Design is based on:",
    correctOptionId: 3,
    options: [
      "Elastic theory",
      "Factor of safety only",
      "Probability and safety margins",
      "Working stress theory",
    ],
  },
  {
    category: "CE",
    question: "The bending equation is:",
    correctOptionId: 1,
    options: [
      "M/I = σ/y = E/R",
      "M = σy/I",
      "E = σ/ε",
      "M/I = E/y",
    ],
  },
  {
    category: "CE",
    question: "Euler’s buckling formula is applicable for:",
    correctOptionId: 3,
    options: [
      "Short columns",
      "Intermediate columns",
      "Long columns",
      "All columns",
    ],
  },
  {
    category: "CE",
    question: "The stress–strain curve of concrete in compression is:",
    correctOptionId: 2,
    options: [
      "Linear till failure",
      "Parabolic then descending",
      "Hyperbolic",
      "Perfectly elastic",
    ],
  },

  // Mechanical and Automation (MN) - 20 more questions
  {
    category: "MN",
    question: "The main function of a flywheel in a mechanical system is to:",
    correctOptionId: 2,
    options: [
      "Increase torque",
      "Store kinetic energy",
      "Reduce friction",
      "Transmit power",
    ],
  },
  {
    category: "MN",
    question: "Which of the following is a renewable energy source?",
    correctOptionId: 4,
    options: [
      "Coal",
      "Petroleum",
      "Natural Gas",
      "Solar energy",
    ],
  },
  {
    category: "MN",
    question: "Which manufacturing process is primarily used to produce hollow pipes?",
    correctOptionId: 2,
    options: [
      "Forging",
      "Extrusion",
      "Casting",
      "Rolling",
    ],
  },
  {
    category: "MN",
    question: "For laminar flow in a circular pipe, the velocity profile is:",
    correctOptionId: 3,
    options: [
      "Uniform",
      "Linear",
      "Parabolic",
      "Exponential",
    ],
  },
  {
    category: "MN",
    question: "In a DC shunt motor, speed control is most effectively achieved by:",
    correctOptionId: 2,
    options: [
      "Armature resistance control",
      "Field flux control",
      "Supply frequency variation",
      "Rotor resistance control",
    ],
  },
  {
    category: "MN",
    question: "Which of the following methods is used to solve linear programming problems?",
    correctOptionId: 2,
    options: [
      "Newton-Raphson method",
      "Simplex method",
      "Runge-Kutta method",
      "Gauss-Seidel method",
    ],
  },
  {
    category: "MN",
    question: "Which numerical method is conditionally stable for solving parabolic partial differential equations?",
    correctOptionId: 2,
    options: [
      "Crank–Nicolson method",
      "Explicit finite difference method",
      "Implicit finite difference method",
      "Finite element method",
    ],
  },
  {
    category: "MN",
    question: "In a Carnot cycle, the efficiency depends on:",
    correctOptionId: 3,
    options: [
      "Type of working fluid",
      "Amount of heat supplied",
      "Temperatures of heat reservoirs",
      "Pressure ratio",
    ],
  },
  {
    category: "MN",
    question: "The degree of freedom (DOF) of a robot refers to:",
    correctOptionId: 3,
    options: [
      "Number of joints",
      "Number of links",
      "Number of independent motions",
      "Payload capacity",
    ],
  },
  {
    category: "MN",
    question: "Which valve is used to control the speed of a hydraulic actuator?",
    correctOptionId: 3,
    options: [
      "Pressure relief valve",
      "Directional control valve",
      "Flow control valve",
      "Check valve",
    ],
  },

  // Quant + Reasoning
  {
    category: "MN",
    question: "A component costs ₹800. If its price is increased by 10% and then decreased by 10%, what is the final price?",
    correctOptionId: 2,
    options: ["₹800", "₹792", "₹780", "₹810"],
  },
  {
    category: "MN",
    question: "A machine produces 120 parts in 6 hours. How many parts will it produce in 1 hour?",
    correctOptionId: 3,
    options: ["15", "18", "20", "24"],
  },
  {
    category: "MN",
    question: "The ratio of skilled to unskilled workers in a factory is 3 : 2. If there are 30 skilled workers, how many unskilled workers are there?",
    correctOptionId: 3,
    options: ["15", "18", "20", "25"],
  },
  {
    category: "MN",
    question: "The average of 5 numbers is 24. If four numbers are 20, 22, 26 and 30, what is the fifth number?",
    correctOptionId: 4,
    options: ["22", "24", "26", "32"],
  },
  {
    category: "MN",
    question: "A conveyor belt is 120 m long. A worker walks on it at 2 m/s and crosses it in 30 s. What is the speed of the belt?",
    correctOptionId: 2,
    options: ["1 m/s", "2 m/s", "3 m/s", "4 m/s"],
  },
  {
    category: "MN",
    question: "If the sum of two numbers is 30 and their difference is 6, what is the product?",
    correctOptionId: 3,
    options: ["192", "204", "216", "224"],
  },
  {
    category: "MN",
    question: "A company gains 20% by selling a product at ₹600. What should be the selling price to gain 30%?",
    correctOptionId: 4,
    options: ["₹625", "₹650", "₹675", "₹700"],
  },
  {
    category: "MN",
    question: "Machine A finishes work in 12 days and Machine B in 18 days. After working together for 4 days, how many more days will B take?",
    correctOptionId: 3,
    options: ["6", "7", "8", "9"],
  },
  {
    category: "MN",
    question: "A lead screw has pitch 5 mm and rotates at 600 rpm with 80% efficiency. What is the actual linear speed?",
    correctOptionId: 2,
    options: ["30 mm/s", "40 mm/s", "50 mm/s", "62.5 mm/s"],
  },
  {
    category: "MN",
    question: "In a manufacturing unit, all robots are automated systems and some automated systems use AI. Which conclusion is definitely true?",
    correctOptionId: 2,
    options: [
      "All robots use AI",
      "Robots may use AI",
      "No robot uses AI",
      "All AI systems are robots",
    ],
  },
];

  // Create all regular questions
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
