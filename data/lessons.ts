// data/lessons.ts
import type { Lesson } from "@/types/learning";

export const lessons: Lesson[] = [
  // ─── Spanish Unit 1 – Lesson 1: Vocabulary ───────────────────
  {
    id: "es-u1-l1",
    unitId: "es-unit-1",
    languageCode: "es",
    title: "Hello & Goodbye",
    description: "Learn the most essential Spanish greetings.",
    type: "vocabulary",
    order: 1,
    totalXP: 20,
    durationMinutes: 5,
    goals: [
      { description: "Say hello and goodbye in Spanish" },
      { description: "Understand basic greeting responses" },
    ],
    vocabulary: [
      {
        word: "Hola",
        pronunciation: "OH-lah",
        translation: "Hello",
        partOfSpeech: "phrase",
        exampleSentence: "¡Hola! ¿Cómo estás?",
        exampleTranslation: "Hello! How are you?",
      },
      {
        word: "Adiós",
        pronunciation: "ah-DYOS",
        translation: "Goodbye",
        partOfSpeech: "phrase",
        exampleSentence: "Adiós, hasta mañana.",
        exampleTranslation: "Goodbye, see you tomorrow.",
      },
      {
        word: "Por favor",
        pronunciation: "por fah-VOR",
        translation: "Please",
        partOfSpeech: "phrase",
      },
      {
        word: "Gracias",
        pronunciation: "GRAH-syahs",
        translation: "Thank you",
        partOfSpeech: "phrase",
      },
    ],
    activities: [
      {
        id: "es-u1-l1-a1",
        type: "multiple-choice",
        instruction: "What does 'Hola' mean?",
        prompt: "Hola",
        correctAnswer: "Hello",
        options: [
          { id: "a", text: "Goodbye" },
          { id: "b", text: "Hello" },
          { id: "c", text: "Please" },
          { id: "d", text: "Thank you" },
        ],
        xpReward: 5,
      },
      {
        id: "es-u1-l1-a2",
        type: "translate",
        instruction: "Translate to Spanish",
        prompt: "Thank you",
        correctAnswer: "Gracias",
        hint: "Sounds like 'GRAH-syahs'",
        xpReward: 5,
      },
      {
        id: "es-u1-l1-a3",
        type: "match-pairs",
        instruction: "Match each word to its translation",
        prompt: "Match the pairs",
        options: [
          { id: "hola", text: "Hola" },
          { id: "hello", text: "Hello" },
          { id: "adios", text: "Adiós" },
          { id: "goodbye", text: "Goodbye" },
        ],
        xpReward: 10,
      },
    ],
  },

  // ─── Spanish Unit 1 – Lesson 2: Numbers ──────────────────────
  {
    id: "es-u1-l2",
    unitId: "es-unit-1",
    languageCode: "es",
    title: "Numbers 1–10",
    description: "Count to ten in Spanish.",
    type: "vocabulary",
    order: 2,
    totalXP: 20,
    durationMinutes: 5,
    goals: [
      { description: "Count from 1 to 10 in Spanish" },
    ],
    vocabulary: [
      { word: "uno", pronunciation: "OO-noh", translation: "one", partOfSpeech: "number" },
      { word: "dos", pronunciation: "dohs", translation: "two", partOfSpeech: "number" },
      { word: "tres", pronunciation: "trehs", translation: "three", partOfSpeech: "number" },
      { word: "cuatro", pronunciation: "KWAH-troh", translation: "four", partOfSpeech: "number" },
      { word: "cinco", pronunciation: "SEEN-koh", translation: "five", partOfSpeech: "number" },
    ],
    activities: [
      {
        id: "es-u1-l2-a1",
        type: "multiple-choice",
        instruction: "What does 'tres' mean?",
        prompt: "tres",
        correctAnswer: "three",
        options: [
          { id: "a", text: "one" },
          { id: "b", text: "two" },
          { id: "c", text: "three" },
          { id: "d", text: "four" },
        ],
        xpReward: 5,
      },
      {
        id: "es-u1-l2-a2",
        type: "translate",
        instruction: "Translate to Spanish",
        prompt: "five",
        correctAnswer: "cinco",
        xpReward: 5,
      },
      {
        id: "es-u1-l2-a3",
        type: "fill-blank",
        instruction: "Fill in the blank",
        prompt: "uno, dos, ___, cuatro",
        correctAnswer: "tres",
        xpReward: 10,
      },
    ],
  },

  // ─── Spanish Unit 1 – Lesson 3: AI Teacher ───────────────────
  {
    id: "es-u1-l3",
    unitId: "es-unit-1",
    languageCode: "es",
    title: "Meet Your AI Teacher",
    description: "Practice your first Spanish words with an AI language coach.",
    type: "ai-teacher",
    order: 3,
    totalXP: 30,
    durationMinutes: 8,
    goals: [
      { description: "Have a simple conversation using greetings" },
      { description: "Practice pronunciation with AI feedback" },
    ],
    phrases: [
      { phrase: "¿Cómo te llamas?", translation: "What is your name?", context: "Asking someone's name" },
      { phrase: "Me llamo ...", translation: "My name is ...", context: "Introducing yourself" },
      { phrase: "Mucho gusto.", translation: "Nice to meet you.", context: "Greeting someone new" },
    ],
    activities: [
      {
        id: "es-u1-l3-a1",
        type: "ai-conversation",
        instruction: "Chat with your AI teacher in Spanish",
        prompt: "Start by saying 'Hola' to your teacher.",
        xpReward: 30,
      },
    ],
    aiTeacher: {
      systemPrompt:
        "You are a friendly Spanish teacher for absolute beginners. Keep sentences very short. Only use words: hola, adiós, gracias, por favor, cómo te llamas, me llamo, mucho gusto. Correct mistakes gently. Respond in both Spanish and English. Encourage the learner often.",
      openingLine: "¡Hola! I'm your Spanish teacher. Ready to practice? Say 'Hola' to get started! 😊",
      focusTopics: ["greetings", "introductions", "saying thank you"],
    },
  },

  // ─── Spanish Unit 2 – Lesson 1: Introductions ────────────────
  {
    id: "es-u2-l1",
    unitId: "es-unit-2",
    languageCode: "es",
    title: "Introducing Yourself",
    description: "Learn to say your name and ask for others'.",
    type: "conversation",
    order: 1,
    totalXP: 25,
    durationMinutes: 6,
    goals: [
      { description: "Ask someone's name in Spanish" },
      { description: "Introduce yourself confidently" },
    ],
    phrases: [
      { phrase: "¿Cómo te llamas?", translation: "What is your name?", context: "Asking name informally" },
      { phrase: "Me llamo Ana.", translation: "My name is Ana.", context: "Stating your name" },
      { phrase: "¿De dónde eres?", translation: "Where are you from?", context: "Asking origin" },
      { phrase: "Soy de España.", translation: "I am from Spain.", context: "Stating your country" },
    ],
    activities: [
      {
        id: "es-u2-l1-a1",
        type: "translate",
        instruction: "Translate to English",
        prompt: "¿Cómo te llamas?",
        correctAnswer: "What is your name?",
        xpReward: 8,
      },
      {
        id: "es-u2-l1-a2",
        type: "multiple-choice",
        instruction: "How do you say 'I am from Spain'?",
        prompt: "I am from Spain.",
        correctAnswer: "Soy de España.",
        options: [
          { id: "a", text: "Me llamo España." },
          { id: "b", text: "Soy de España." },
          { id: "c", text: "Estoy España." },
          { id: "d", text: "De España soy." },
        ],
        xpReward: 8,
      },
      {
        id: "es-u2-l1-a3",
        type: "fill-blank",
        instruction: "Complete the sentence",
        prompt: "___ de México.",
        correctAnswer: "Soy",
        hint: "Use the verb 'to be'",
        xpReward: 9,
      },
    ],
  },

  // ─── French Unit 1 – Lesson 1: Vocabulary ────────────────────
  {
    id: "fr-u1-l1",
    unitId: "fr-unit-1",
    languageCode: "fr",
    title: "Hello & Goodbye",
    description: "Learn the most essential French greetings.",
    type: "vocabulary",
    order: 1,
    totalXP: 20,
    durationMinutes: 5,
    goals: [
      { description: "Say hello and goodbye in French" },
    ],
    vocabulary: [
      {
        word: "Bonjour",
        pronunciation: "bohn-ZHOOR",
        translation: "Hello / Good morning",
        partOfSpeech: "phrase",
        exampleSentence: "Bonjour, comment ça va?",
        exampleTranslation: "Hello, how are you?",
      },
      {
        word: "Au revoir",
        pronunciation: "oh ruh-VWAR",
        translation: "Goodbye",
        partOfSpeech: "phrase",
      },
      {
        word: "Merci",
        pronunciation: "mehr-SEE",
        translation: "Thank you",
        partOfSpeech: "phrase",
      },
      {
        word: "S'il vous plaît",
        pronunciation: "seel voo PLAY",
        translation: "Please (formal)",
        partOfSpeech: "phrase",
      },
    ],
    activities: [
      {
        id: "fr-u1-l1-a1",
        type: "multiple-choice",
        instruction: "What does 'Bonjour' mean?",
        prompt: "Bonjour",
        correctAnswer: "Hello",
        options: [
          { id: "a", text: "Goodbye" },
          { id: "b", text: "Hello" },
          { id: "c", text: "Thank you" },
          { id: "d", text: "Please" },
        ],
        xpReward: 5,
      },
      {
        id: "fr-u1-l1-a2",
        type: "translate",
        instruction: "Translate to French",
        prompt: "Thank you",
        correctAnswer: "Merci",
        xpReward: 5,
      },
      {
        id: "fr-u1-l1-a3",
        type: "match-pairs",
        instruction: "Match each word to its translation",
        prompt: "Match the pairs",
        options: [
          { id: "bonjour", text: "Bonjour" },
          { id: "hello", text: "Hello" },
          { id: "aurevoir", text: "Au revoir" },
          { id: "goodbye", text: "Goodbye" },
        ],
        xpReward: 10,
      },
    ],
  },

  // ─── French Unit 1 – Lesson 2: Numbers ───────────────────────
  {
    id: "fr-u1-l2",
    unitId: "fr-unit-1",
    languageCode: "fr",
    title: "Numbers 1–10",
    description: "Count to ten in French.",
    type: "vocabulary",
    order: 2,
    totalXP: 20,
    durationMinutes: 5,
    goals: [{ description: "Count from 1 to 10 in French" }],
    vocabulary: [
      { word: "un", pronunciation: "uhn", translation: "one", partOfSpeech: "number" },
      { word: "deux", pronunciation: "duh", translation: "two", partOfSpeech: "number" },
      { word: "trois", pronunciation: "twah", translation: "three", partOfSpeech: "number" },
      { word: "quatre", pronunciation: "KAH-truh", translation: "four", partOfSpeech: "number" },
      { word: "cinq", pronunciation: "sank", translation: "five", partOfSpeech: "number" },
    ],
    activities: [
      {
        id: "fr-u1-l2-a1",
        type: "multiple-choice",
        instruction: "What does 'trois' mean?",
        prompt: "trois",
        correctAnswer: "three",
        options: [
          { id: "a", text: "one" },
          { id: "b", text: "two" },
          { id: "c", text: "three" },
          { id: "d", text: "four" },
        ],
        xpReward: 5,
      },
      {
        id: "fr-u1-l2-a2",
        type: "translate",
        instruction: "Translate to French",
        prompt: "five",
        correctAnswer: "cinq",
        xpReward: 5,
      },
      {
        id: "fr-u1-l2-a3",
        type: "fill-blank",
        instruction: "Fill in the blank",
        prompt: "un, deux, ___, quatre",
        correctAnswer: "trois",
        xpReward: 10,
      },
    ],
  },

  // ─── French Unit 1 – Lesson 3: AI Teacher ────────────────────
  {
    id: "fr-u1-l3",
    unitId: "fr-unit-1",
    languageCode: "fr",
    title: "Meet Your AI Teacher",
    description: "Practice French greetings with an AI language coach.",
    type: "ai-teacher",
    order: 3,
    totalXP: 30,
    durationMinutes: 8,
    goals: [
      { description: "Use greetings naturally in a short conversation" },
    ],
    phrases: [
      { phrase: "Comment vous appelez-vous?", translation: "What is your name? (formal)", context: "Formal introduction" },
      { phrase: "Je m'appelle ...", translation: "My name is ...", context: "Stating your name" },
      { phrase: "Enchanté(e).", translation: "Nice to meet you.", context: "Greeting someone new" },
    ],
    activities: [
      {
        id: "fr-u1-l3-a1",
        type: "ai-conversation",
        instruction: "Chat with your AI teacher in French",
        prompt: "Start by saying 'Bonjour' to your teacher.",
        xpReward: 30,
      },
    ],
    aiTeacher: {
      systemPrompt:
        "You are a warm French teacher for absolute beginners. Use only simple words: bonjour, au revoir, merci, s'il vous plaît, comment vous appelez-vous, je m'appelle, enchanté. Keep sentences short. Gently correct mistakes. Always translate to English. Be encouraging.",
      openingLine: "Bonjour! I'm your French teacher. Say 'Bonjour' to begin! 🥐",
      focusTopics: ["greetings", "introductions", "polite expressions"],
    },
  },

  // ─── German Unit 1 – Lesson 1: Vocabulary ────────────────────
  {
    id: "de-u1-l1",
    unitId: "de-unit-1",
    languageCode: "de",
    title: "Hello & Goodbye",
    description: "Your first German greetings.",
    type: "vocabulary",
    order: 1,
    totalXP: 20,
    durationMinutes: 5,
    goals: [{ description: "Greet people in German" }],
    vocabulary: [
      {
        word: "Hallo",
        pronunciation: "HAH-loh",
        translation: "Hello",
        partOfSpeech: "phrase",
        exampleSentence: "Hallo, wie geht es Ihnen?",
        exampleTranslation: "Hello, how are you?",
      },
      {
        word: "Auf Wiedersehen",
        pronunciation: "owf VEE-dehr-zayn",
        translation: "Goodbye",
        partOfSpeech: "phrase",
      },
      {
        word: "Danke",
        pronunciation: "DAHN-keh",
        translation: "Thank you",
        partOfSpeech: "phrase",
      },
      {
        word: "Bitte",
        pronunciation: "BIT-teh",
        translation: "Please / You're welcome",
        partOfSpeech: "phrase",
      },
    ],
    activities: [
      {
        id: "de-u1-l1-a1",
        type: "multiple-choice",
        instruction: "What does 'Danke' mean?",
        prompt: "Danke",
        correctAnswer: "Thank you",
        options: [
          { id: "a", text: "Hello" },
          { id: "b", text: "Goodbye" },
          { id: "c", text: "Thank you" },
          { id: "d", text: "Please" },
        ],
        xpReward: 5,
      },
      {
        id: "de-u1-l1-a2",
        type: "translate",
        instruction: "Translate to German",
        prompt: "Hello",
        correctAnswer: "Hallo",
        xpReward: 5,
      },
      {
        id: "de-u1-l1-a3",
        type: "match-pairs",
        instruction: "Match each word to its translation",
        prompt: "Match the pairs",
        options: [
          { id: "hallo", text: "Hallo" },
          { id: "hello", text: "Hello" },
          { id: "danke", text: "Danke" },
          { id: "thankyou", text: "Thank you" },
        ],
        xpReward: 10,
      },
    ],
  },

  // ─── German Unit 1 – Lesson 2 ────────────────────────────────
  {
    id: "de-u1-l2",
    unitId: "de-unit-1",
    languageCode: "de",
    title: "Numbers 1–10",
    description: "Count to ten in German.",
    type: "vocabulary",
    order: 2,
    totalXP: 20,
    durationMinutes: 5,
    goals: [{ description: "Count from 1 to 10 in German" }],
    vocabulary: [
      { word: "eins", pronunciation: "ayns", translation: "one", partOfSpeech: "number" },
      { word: "zwei", pronunciation: "tsvay", translation: "two", partOfSpeech: "number" },
      { word: "drei", pronunciation: "dry", translation: "three", partOfSpeech: "number" },
      { word: "vier", pronunciation: "feer", translation: "four", partOfSpeech: "number" },
      { word: "fünf", pronunciation: "fuenf", translation: "five", partOfSpeech: "number" },
    ],
    activities: [
      { id: "de-u1-l2-a1", type: "multiple-choice", instruction: "What does 'drei' mean?", prompt: "drei", correctAnswer: "three", options: [{ id: "a", text: "one" }, { id: "b", text: "two" }, { id: "c", text: "three" }, { id: "d", text: "four" }], xpReward: 5 },
      { id: "de-u1-l2-a2", type: "translate", instruction: "Translate to German", prompt: "five", correctAnswer: "fünf", xpReward: 5 },
    ],
  },

  // ─── German Unit 1 – Lesson 3 ────────────────────────────────
  {
    id: "de-u1-l3",
    unitId: "de-unit-1",
    languageCode: "de",
    title: "Meet Your AI Teacher",
    description: "Practice German greetings with an AI language coach.",
    type: "ai-teacher",
    order: 3,
    totalXP: 30,
    durationMinutes: 8,
    goals: [{ description: "Use greetings naturally in German" }],
    phrases: [
      { phrase: "Wie heißen Sie?", translation: "What is your name? (formal)", context: "Formal introduction" },
      { phrase: "Ich heiße ...", translation: "My name is ...", context: "Stating your name" },
    ],
    activities: [{ id: "de-u1-l3-a1", type: "ai-conversation", instruction: "Chat with your AI teacher in German", prompt: "Start by saying 'Hallo'.", xpReward: 30 }],
    aiTeacher: {
      systemPrompt: "You are a friendly German teacher for beginners. Use simple words: hallo, tschüss, danke, bitte, wie heißen Sie, ich heiße. Be encouraging.",
      openingLine: "Hallo! Ich bin dein Deutschlehrer. Say 'Hallo' to begin! 🥨",
      focusTopics: ["greetings", "introductions"],
    },
  },

  // ─── German Unit 1 – Lesson 4 ────────────────────────────────
  {
    id: "de-u1-l4",
    unitId: "de-unit-1",
    languageCode: "de",
    title: "Colors & Adjectives",
    description: "Learn basic German colors.",
    type: "vocabulary",
    order: 4,
    totalXP: 25,
    durationMinutes: 6,
    goals: [{ description: "Name 5 colors in German" }],
    vocabulary: [
      { word: "rot", pronunciation: "roht", translation: "red", partOfSpeech: "adjective" },
      { word: "blau", pronunciation: "blau", translation: "blue", partOfSpeech: "adjective" },
      { word: "grün", pronunciation: "gruen", translation: "green", partOfSpeech: "adjective" },
      { word: "gelb", pronunciation: "gelp", translation: "yellow", partOfSpeech: "adjective" },
    ],
    activities: [
      { id: "de-u1-l4-a1", type: "multiple-choice", instruction: "What does 'blau' mean?", prompt: "blau", correctAnswer: "blue", options: [{ id: "a", text: "red" }, { id: "b", text: "blue" }, { id: "c", text: "green" }, { id: "d", text: "yellow" }], xpReward: 10 },
    ],
  },

  // ─── German Unit 1 – Lesson 5 ────────────────────────────────
  {
    id: "de-u1-l5",
    unitId: "de-unit-1",
    languageCode: "de",
    title: "Food & Drinks",
    description: "Vocabulary for ordering at a café.",
    type: "vocabulary",
    order: 5,
    totalXP: 25,
    durationMinutes: 7,
    goals: [{ description: "Order food and drinks in German" }],
    vocabulary: [
      { word: "Wasser", pronunciation: "VAH-ser", translation: "water", partOfSpeech: "noun" },
      { word: "Brot", pronunciation: "broht", translation: "bread", partOfSpeech: "noun" },
      { word: "Kaffee", pronunciation: "KAH-fay", translation: "coffee", partOfSpeech: "noun" },
    ],
    activities: [
      { id: "de-u1-l5-a1", type: "translate", instruction: "Translate to German", prompt: "coffee", correctAnswer: "Kaffee", xpReward: 10 },
    ],
  },

  // ─── German Unit 1 – Lesson 6 ────────────────────────────────
  {
    id: "de-u1-l6",
    unitId: "de-unit-1",
    languageCode: "de",
    title: "Family & Friends",
    description: "Talk about your family in German.",
    type: "conversation",
    order: 6,
    totalXP: 25,
    durationMinutes: 7,
    goals: [{ description: "Describe family members in German" }],
    phrases: [
      { phrase: "Das ist meine Mutter.", translation: "This is my mother.", context: "Introducing family" },
      { phrase: "Ich habe einen Bruder.", translation: "I have a brother.", context: "Describing family" },
    ],
    activities: [
      { id: "de-u1-l6-a1", type: "translate", instruction: "Translate to German", prompt: "This is my mother.", correctAnswer: "Das ist meine Mutter.", xpReward: 15 },
    ],
  },

  // ─── Japanese Unit 1 – Lesson 1 ──────────────────────────────
  {
    id: "ja-u1-l1",
    unitId: "ja-unit-1",
    languageCode: "ja",
    title: "Hello & Goodbye",
    description: "Your first Japanese greetings.",
    type: "vocabulary",
    order: 1,
    totalXP: 20,
    durationMinutes: 5,
    goals: [{ description: "Greet people in Japanese" }],
    vocabulary: [
      { word: "こんにちは", pronunciation: "kon-ni-chi-wa", translation: "Hello", partOfSpeech: "phrase", exampleSentence: "こんにちは！", exampleTranslation: "Hello!" },
      { word: "さようなら", pronunciation: "sa-yo-u-na-ra", translation: "Goodbye", partOfSpeech: "phrase" },
      { word: "ありがとう", pronunciation: "a-ri-ga-to-u", translation: "Thank you", partOfSpeech: "phrase" },
      { word: "おねがいします", pronunciation: "o-ne-ga-i-shi-ma-su", translation: "Please", partOfSpeech: "phrase" },
    ],
    activities: [
      { id: "ja-u1-l1-a1", type: "multiple-choice", instruction: "What does 'ありがとう' mean?", prompt: "ありがとう", correctAnswer: "Thank you", options: [{ id: "a", text: "Hello" }, { id: "b", text: "Goodbye" }, { id: "c", text: "Thank you" }, { id: "d", text: "Please" }], xpReward: 10 },
    ],
  },

  // ─── Japanese Unit 1 – Lesson 2 ──────────────────────────────
  {
    id: "ja-u1-l2",
    unitId: "ja-unit-1",
    languageCode: "ja",
    title: "Hiragana Basics",
    description: "Learn your first hiragana characters.",
    type: "vocabulary",
    order: 2,
    totalXP: 25,
    durationMinutes: 8,
    goals: [{ description: "Read and write basic hiragana" }],
    vocabulary: [
      { word: "あ", pronunciation: "a", translation: "a (vowel)", partOfSpeech: "noun" },
      { word: "い", pronunciation: "i", translation: "i (vowel)", partOfSpeech: "noun" },
      { word: "う", pronunciation: "u", translation: "u (vowel)", partOfSpeech: "noun" },
      { word: "え", pronunciation: "e", translation: "e (vowel)", partOfSpeech: "noun" },
      { word: "お", pronunciation: "o", translation: "o (vowel)", partOfSpeech: "noun" },
    ],
    activities: [
      { id: "ja-u1-l2-a1", type: "multiple-choice", instruction: "Which character makes the 'u' sound?", prompt: "う", correctAnswer: "u", options: [{ id: "a", text: "a" }, { id: "b", text: "i" }, { id: "c", text: "u" }, { id: "d", text: "e" }], xpReward: 10 },
    ],
  },

  // ─── Japanese Unit 1 – Lesson 3 ──────────────────────────────
  {
    id: "ja-u1-l3",
    unitId: "ja-unit-1",
    languageCode: "ja",
    title: "Numbers 1–10",
    description: "Count to ten in Japanese.",
    type: "vocabulary",
    order: 3,
    totalXP: 20,
    durationMinutes: 5,
    goals: [{ description: "Count from 1 to 10 in Japanese" }],
    vocabulary: [
      { word: "いち", pronunciation: "i-chi", translation: "one", partOfSpeech: "number" },
      { word: "に", pronunciation: "ni", translation: "two", partOfSpeech: "number" },
      { word: "さん", pronunciation: "san", translation: "three", partOfSpeech: "number" },
      { word: "し", pronunciation: "shi", translation: "four", partOfSpeech: "number" },
      { word: "ご", pronunciation: "go", translation: "five", partOfSpeech: "number" },
    ],
    activities: [
      { id: "ja-u1-l3-a1", type: "translate", instruction: "Translate to Japanese", prompt: "three", correctAnswer: "さん", xpReward: 10 },
    ],
  },

  // ─── Japanese Unit 1 – Lesson 4 ──────────────────────────────
  {
    id: "ja-u1-l4",
    unitId: "ja-unit-1",
    languageCode: "ja",
    title: "Introductions",
    description: "Introduce yourself in Japanese.",
    type: "conversation",
    order: 4,
    totalXP: 25,
    durationMinutes: 6,
    goals: [{ description: "Say your name in Japanese" }],
    phrases: [
      { phrase: "わたしは___です。", translation: "I am ___.", context: "Introducing yourself" },
      { phrase: "はじめまして。", translation: "Nice to meet you.", context: "First meeting" },
    ],
    activities: [
      { id: "ja-u1-l4-a1", type: "translate", instruction: "Translate: Nice to meet you", prompt: "はじめまして。", correctAnswer: "Nice to meet you.", xpReward: 15 },
    ],
  },

  // ─── Japanese Unit 1 – Lesson 5 ──────────────────────────────
  {
    id: "ja-u1-l5",
    unitId: "ja-unit-1",
    languageCode: "ja",
    title: "AI Teacher Session",
    description: "Practice Japanese with an AI coach.",
    type: "ai-teacher",
    order: 5,
    totalXP: 30,
    durationMinutes: 8,
    goals: [{ description: "Have a simple conversation in Japanese" }],
    phrases: [
      { phrase: "おはようございます。", translation: "Good morning.", context: "Morning greeting" },
    ],
    activities: [
      { id: "ja-u1-l5-a1", type: "ai-conversation", instruction: "Chat in Japanese with your AI teacher", prompt: "Start by saying 'こんにちは'.", xpReward: 30 },
    ],
    aiTeacher: {
      systemPrompt: "You are a friendly Japanese teacher for beginners. Use very simple Japanese with romaji and English. Be encouraging.",
      openingLine: "こんにちは！I'm your Japanese teacher. Say 'こんにちは' to start! 🌸",
      focusTopics: ["greetings", "hiragana", "numbers"],
    },
  },

  // ─── Arabic Unit 1 – Lesson 1 ────────────────────────────────
  {
    id: "ar-u1-l1",
    unitId: "ar-unit-1",
    languageCode: "ar",
    title: "Hello & Goodbye",
    description: "Your first Arabic greetings.",
    type: "vocabulary",
    order: 1,
    totalXP: 20,
    durationMinutes: 5,
    goals: [{ description: "Greet people in Arabic" }],
    vocabulary: [
      { word: "مرحبا", pronunciation: "mar-ha-ban", translation: "Hello", partOfSpeech: "phrase", exampleSentence: "مرحبا! كيف حالك؟", exampleTranslation: "Hello! How are you?" },
      { word: "مع السلامة", pronunciation: "ma'a as-salama", translation: "Goodbye", partOfSpeech: "phrase" },
      { word: "شكراً", pronunciation: "shuk-ran", translation: "Thank you", partOfSpeech: "phrase" },
      { word: "من فضلك", pronunciation: "min fad-lak", translation: "Please", partOfSpeech: "phrase" },
    ],
    activities: [
      { id: "ar-u1-l1-a1", type: "multiple-choice", instruction: "What does 'شكراً' mean?", prompt: "شكراً", correctAnswer: "Thank you", options: [{ id: "a", text: "Hello" }, { id: "b", text: "Goodbye" }, { id: "c", text: "Thank you" }, { id: "d", text: "Please" }], xpReward: 10 },
    ],
  },

  // ─── Arabic Unit 1 – Lesson 2 ────────────────────────────────
  {
    id: "ar-u1-l2",
    unitId: "ar-unit-1",
    languageCode: "ar",
    title: "Arabic Alphabet Basics",
    description: "Learn your first Arabic letters.",
    type: "vocabulary",
    order: 2,
    totalXP: 25,
    durationMinutes: 8,
    goals: [{ description: "Recognize 5 Arabic letters" }],
    vocabulary: [
      { word: "ا", pronunciation: "alif", translation: "a (letter)", partOfSpeech: "noun" },
      { word: "ب", pronunciation: "ba", translation: "b (letter)", partOfSpeech: "noun" },
      { word: "ت", pronunciation: "ta", translation: "t (letter)", partOfSpeech: "noun" },
    ],
    activities: [
      { id: "ar-u1-l2-a1", type: "multiple-choice", instruction: "Which letter is 'ba'?", prompt: "ب", correctAnswer: "ba", options: [{ id: "a", text: "alif" }, { id: "b", text: "ba" }, { id: "c", text: "ta" }, { id: "d", text: "tha" }], xpReward: 10 },
    ],
  },

  // ─── Arabic Unit 1 – Lesson 3 ────────────────────────────────
  {
    id: "ar-u1-l3",
    unitId: "ar-unit-1",
    languageCode: "ar",
    title: "Numbers 1–5",
    description: "Count in Arabic.",
    type: "vocabulary",
    order: 3,
    totalXP: 20,
    durationMinutes: 5,
    goals: [{ description: "Count from 1 to 5 in Arabic" }],
    vocabulary: [
      { word: "واحد", pronunciation: "wa-hid", translation: "one", partOfSpeech: "number" },
      { word: "اثنان", pronunciation: "ith-nan", translation: "two", partOfSpeech: "number" },
      { word: "ثلاثة", pronunciation: "tha-la-tha", translation: "three", partOfSpeech: "number" },
    ],
    activities: [
      { id: "ar-u1-l3-a1", type: "translate", instruction: "Translate to Arabic", prompt: "three", correctAnswer: "ثلاثة", xpReward: 10 },
    ],
  },

  // ─── Arabic Unit 1 – Lesson 4 ────────────────────────────────
  {
    id: "ar-u1-l4",
    unitId: "ar-unit-1",
    languageCode: "ar",
    title: "Introductions",
    description: "Introduce yourself in Arabic.",
    type: "conversation",
    order: 4,
    totalXP: 25,
    durationMinutes: 6,
    goals: [{ description: "Say your name in Arabic" }],
    phrases: [
      { phrase: "اسمي ___.", translation: "My name is ___.", context: "Introducing yourself" },
      { phrase: "تشرفت بمعرفتك.", translation: "Nice to meet you.", context: "First meeting" },
    ],
    activities: [
      { id: "ar-u1-l4-a1", type: "translate", instruction: "How do you say 'My name is'?", prompt: "اسمي", correctAnswer: "My name is", xpReward: 15 },
    ],
  },

  // ─── Arabic Unit 1 – Lesson 5 ────────────────────────────────
  {
    id: "ar-u1-l5",
    unitId: "ar-unit-1",
    languageCode: "ar",
    title: "AI Teacher Session",
    description: "Practice Arabic with an AI coach.",
    type: "ai-teacher",
    order: 5,
    totalXP: 30,
    durationMinutes: 8,
    goals: [{ description: "Have a simple Arabic conversation" }],
    phrases: [
      { phrase: "كيف حالك؟", translation: "How are you?", context: "Casual greeting" },
    ],
    activities: [
      { id: "ar-u1-l5-a1", type: "ai-conversation", instruction: "Chat with your AI Arabic teacher", prompt: "Start by saying 'مرحبا'.", xpReward: 30 },
    ],
    aiTeacher: {
      systemPrompt: "You are a friendly Arabic teacher for beginners. Use simple Arabic with transliteration and English. Be encouraging.",
      openingLine: "مرحبا! I'm your Arabic teacher. Say 'مرحبا' to begin! 🌙",
      focusTopics: ["greetings", "alphabet", "numbers"],
    },
  },

  // ─── French Unit 2 – Lesson 2 ────────────────────────────────
  {
    id: "fr-u2-l1",
    unitId: "fr-unit-2",
    languageCode: "fr",
    title: "Introducing Yourself",
    description: "Learn to say your name and ask for others'.",
    type: "conversation",
    order: 1,
    totalXP: 25,
    durationMinutes: 6,
    goals: [{ description: "Introduce yourself in French" }],
    phrases: [
      { phrase: "Comment vous appelez-vous?", translation: "What is your name? (formal)" },
      { phrase: "Je m'appelle ...", translation: "My name is ..." },
      { phrase: "D'où venez-vous?", translation: "Where are you from?" },
    ],
    activities: [
      { id: "fr-u2-l1-a1", type: "translate", instruction: "Translate: What is your name?", prompt: "Comment vous appelez-vous?", correctAnswer: "What is your name?", xpReward: 10 },
    ],
  },
];

// ──────────────────── Helper Functions ────────────────────────

/** Get all lessons for a unit, sorted by order. */
export function getLessonsByUnit(unitId: string): Lesson[] {
  return lessons
    .filter((l) => l.unitId === unitId)
    .sort((a, b) => a.order - b.order);
}

/** Get all lessons for a language, sorted by unit order then lesson order. */
export function getLessonsByLanguage(languageCode: string): Lesson[] {
  return lessons
    .filter((l) => l.languageCode === languageCode)
    .sort((a, b) => {
      if (a.unitId < b.unitId) return -1;
      if (a.unitId > b.unitId) return 1;
      return a.order - b.order;
    });
}

/** Look up a single lesson by ID. */
export function getLessonById(lessonId: string): Lesson | undefined {
  return lessons.find((l) => l.id === lessonId);
}
