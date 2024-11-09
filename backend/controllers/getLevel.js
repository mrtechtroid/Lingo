const mongoose = require("mongoose");
const Lesson = require("../models/Lessons");
const joi = require("joi")
const { GoogleGenerativeAI, SchemaType } = require('@google/generative-ai');
const dotenv = require('dotenv');
dotenv.config();

// GoogleGenerativeAI required config
const configuration = new GoogleGenerativeAI(process.env.API_KEY);

// Model initialization
const modelId = "gemini-1.5-flash-8b";
// const fillBlankSchema = {
//   description: "List of translations with options for each word",
// }

// const schema = {
//   description: "List of related words and their translations, and sentences related to the word with their translations",
//   type: SchemaType.OBJECT,
//   properties: {
//     type: SchemaType.OBJECT,
//     properties: {
//       recipeName: {
//         type: SchemaType.STRING,
//         description: "Name of the recipe",
//         nullable: false,
//       },
//     },
//     required: ["question", "options", "sentence"],
//   },
// };
// const newWordSchema = {
//   description: "List of translations with options for each word",
//   // type: SchemaType.ARRAY,
//   // items: {
//     type: SchemaType.OBJECT,
//     properties: {
//       question: {
//         type: SchemaType.STRING,
//         description: "The translated word in hindi script",
//         nullable: false,
//       },
//       options: {
//         type: SchemaType.ARRAY,
//         items: {
//           type: SchemaType.STRING,
//           description: "Related options of word in hindi",
//           nullable: false,
//         },
//         description: "Array of words differnt in meaning to word but not very different",
//       },
//       sentence: {
//         type: SchemaType.STRING,
//         description: "Sentence using the word in it",
//         nullable: true,
//       }
//     },
//     required: ["question", "options", "sentence"],
// };

// const model = configuration.getGenerativeModel({
//   model: modelId,
//   generationConfig: {
//     responseMimeType: "application/json",
//     responseSchema: newWordSchema,
//   },
// });

// const model2 = configuration.getGenerativeModel({
//   model: modelId,
//   generationConfig: {
//     responseMimeType: "application/json",
//     responseSchema: newWordSchema,
//   },
// });
const newWordSchema3 = {
  type: "object",
  properties: {
    word: { 
      type: "string", 
      description: "The word provided as input" 
    },
    translation: { 
      type: "string", 
      description: "The translation of the input word in Hindi" 
    },
    relatedWords: {
      type: "array",
      description: "A list of words related to the input word and their translations in Hindi",
      items: {
        type: "object",
        properties: {
          word: { 
            type: "string", 
            description: "A related word to the input word" 
          },
          translation: { 
            type: "string", 
            description: "The translation of the related word in Hindi" 
          }
        },
        required: ["word", "translation"]
      }
    },
    exampleSentences: {
      type: "array",
      description: "A list of example sentences using the input word and their translations in Hindi",
      items: {
        type: "object",
        properties: {
          sentence: { 
            type: "string", 
            description: "An example sentence using the input word" 
          },
          translation: { 
            type: "string", 
            description: "The translation of the example sentence in Hindi" 
          }
        },
        required: ["sentence", "translation"]
      }
    }
  },
  required: ["word", "translation", "relatedWords", "exampleSentences"]
};
const model3 = configuration.getGenerativeModel({
  model: modelId,
  generationConfig: {
    responseMimeType: "application/json",
    responseSchema: newWordSchema3,
  },
});
const getRelated = async(word) =>{
  const result = await model3.generateContent(`The input word is "${word}" Give me its translations. Also give me a list of example sentences with their translations in Hindi. Try to make at least 4 sentences and give at least 6 words.`);
  let parsedResponse;
  // Parse the Gemini API response
  try {
    console.log(result.response.text())
    parsedResponse = JSON.parse(result.response.text());
  } catch (error) {
    console.error("Error parsing response:", error);
    return;
  }
  return parsedResponse;
}
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    // Generate a random index from 0 to i
    const j = Math.floor(Math.random() * (i + 1));
    
    // Swap elements array[i] and array[j]
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
// Controller function to handle fetching lesson details and generating questions
const getLevel = async (req, res) => {
  const schema = joi.object({
    level: joi.number().min(0).required(),
    lessonID: joi.string().required(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  try {

    const { lessonID, level } = req.body;

    // Fetch the lesson document by its ID
    const lesson = await Lesson.findOne({_id:lessonID});
    console.log(lesson,lessonID,level)
    if (!lesson) {
      return res.status(404).json({ message: "Lesson not found" });
    }

    // Validate the level index
    const keywords = lesson.keywords;
    // const keywords = [["cat", "dog"], ["apple", "banana"], ["tree", "flower"]];
    if (level < 0 || level >= keywords.length) {
      return res.status(400).json({ message: "Invalid level" });
    }

    // Retrieve keywords at the specified level
    
    const wordList = keywords[level];
    if (!Array.isArray(wordList)) {
      return res.status(400).json({ message: "wordList must be an array of strings" });
    }

    // Generate responses for each word in wordList using both functions
    let responses = [] 
    async function getRelatedWords(wordList) {
      const responses = await Promise.all(
        wordList.map(async (word) => {
          const t = await getRelated(word);
          return t;
        })
      );
      return responses;
    }
    await getRelatedWords(wordList).then((responses) => {
      console.log(responses);
      questions = [];
      responses.forEach((response) => {
        let t = generateQuestions(response);
        t.forEach((q)=>{
          questions.push(q)
        })
      });
      res.json(questions);
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};
// hello -> goodbye, later, mayin

// const questions = [
//   {
//     id: 1,
//     type: 'NEW_WORD',
//     question: "Which one of these is 'the cat'?",
//     options: [
//       { id: 1, text: "l'homme", image: "https://image.pollinations.ai/prompt/dog" },
//       { id: 2, text: "le chat", image: "https://image.pollinations.ai/prompt/cat" }
//     ],
//     correctAnswer: 2,
//     newWord: true
//   },
//   {
//     id: 2,
//     type: 'NEW_WORD',
//     question: "Which one means 'the dog'?",
//     options: [
//       { id: 1, text: "le chien", image: "/placeholder.svg?height=150&width=150" },
//       { id: 2, text: "l'oiseau", image: "/placeholder.svg?height=150&width=150" }
//     ],
//     correctAnswer: 1,
//     newWord: true
//   },
//   {
//     id: 3,
//     type: 'TRANSLATION',
//     question: "How do you say 'cat'?",
//     inputFields: ['', ''],
//     correctAnswer: ['chat', 'le'],
//     hint: "Don't forget the article!"
//   },
//   {
//     id: 4,
//     type: 'TRANSLATION',
//     question: "How do you say 'dog'?",
//     inputFields: ['', ''],
//     correctAnswer: ['chien', 'le'],
//     hint: "Don't forget the article!"
//   },
//   {
//     id: 5,
//     type: 'WORD_BANK',
//     question: "Write this in English",
//     phrase: "Tu es un chat ?",
//     wordBank: ['Are', 'you', 'a', 'cat', 'horse', 'girl', "It's", 'woman'],
//     correctAnswer: ['Are', 'you', 'a', 'cat'],
//     audio: true
//   },
//   {
//     id: 6,
//     type: 'WORD_BANK',
//     question: "Write this in English",
//     phrase: "Je suis un homme",
//     wordBank: ['I', 'am', 'a', 'man', 'woman', 'they', 'we', 'are'],
//     correctAnswer: ['I', 'am', 'a', 'man'],
//     audio: true
//   },
//   {
//     id: 7,
//     type: 'FILL_BLANK',
//     question: "Fill in the blank",
//     sentence: "__ et un chat",
//     options: ['un', 'garçon', 'homme', 'et'],
//     correctAnswer: 'un'
//   },
//   {
//     id: 8,
//     type: 'FILL_BLANK',
//     question: "Fill in the blank",
//     sentence: "Je suis __",
//     options: ['un', 'une', 'le', 'la'],
//     correctAnswer: 'un'
//   },
//   {
//     id: 9,
//     type: 'MATCHING',
//     question: "Tap the matching pairs",
//     pairs: [
//       { word: 'chat', translation: 'cat' },
//       { word: 'homme', translation: 'man' },
//       { word: 'garçon', translation: 'boy' },
//       { word: 'et', translation: 'and' }
//     ]
//   },
//   {
//     id: 10,
//     type: 'MATCHING',
//     question: "Tap the matching pairs",
//     pairs: [
//       { word: 'chien', translation: 'dog' },
//       { word: 'oiseau', translation: 'bird' },
//       { word: 'chat', translation: 'cat' },
//       { word: 'poisson', translation: 'fish' }
//     ]
//   }
// ]
function generateQuestions(data) {
  const { word, translation, exampleSentences, relatedWords } = data;
  let idCounter = 1;

  const questions = [];

  // Helper function to pick 4 random unique options from related words
  function getRandomOptions(correctAnswer) {
    const allOptions = [...relatedWords.map(rw => rw.translation)];
    const shuffledOptions = allOptions
      .filter(option => option !== correctAnswer)
      .sort(() => 0.5 - Math.random());

    const options = [correctAnswer, ...shuffledOptions.slice(0, 3)];
    return options.sort(() => 0.5 - Math.random()); // Shuffle options
  }

  // Helper function to add random words for extra complexity
  function addRandomWords(words, count = 4) {
    const extraWords = relatedWords.map(rw => rw.translation).sort(() => 0.5 - Math.random());
    return [...words, ...extraWords.slice(0, count - words.length)].sort(() => 0.5 - Math.random());
  }
  function findTranslation(relatedWords,translated){
    for (let i = 0;i<relatedWords.length;i++){
      if (translated == relatedWords[i].translation){
        return relatedWords[i].word
      }
    }
  }
  function findCorrect(t,correct){
    for (let i = 0;i<t.length;i++){
      if (t[i].text == correct){
        return t[i].id
      }
    }
  }
  // NEW_WORD question: Choose the correct translation for the main word
  let t = getRandomOptions(translation).map((text, index) => ({ id: index + 1, text,image:"https://image.pollinations.ai/prompt/"+ findTranslation(relatedWords,text)}))
  questions.push({
    id: idCounter++,
    type: 'NEW_WORD',
    question: `Which one of these is '${word}'?`,
    options: t,
    correctAnswer: findCorrect(t,translation),
    newWord: true,
  });

  // TRANSLATION question: Translate the main word into Hindi
  questions.push({
    id: idCounter++,
    type: 'TRANSLATION',
    question: `How do you say '${translation}' in English?`,
    inputFields: [''],
    correctAnswer: [word],
    hint: "Translate it to Hindi",
  });

  // WORD_BANK questions: Add random words for complexity
  let flag = false
  exampleSentences.forEach((example) => {
    if (flag == true){
      return
    }
    if (Math.random()>0.6){
      return
    }
    questions.push({
      id: idCounter++,
      type: 'WORD_BANK',
      question: `Translate this to Hindi`,
      phrase: example.sentence,
      wordBank: addRandomWords(example.translation.split(' ')),
      correctAnswer: example.translation.split(' '),
      audio: true,
    });
    flag = true
  });
  if (flag==false){questions.push({
    id: idCounter++,
    type: 'WORD_BANK',
    question: `Translate this to Hindi`,
    phrase: exampleSentences[0].sentence,
    wordBank: addRandomWords(exampleSentences[0].translation.split(' ')),
    correctAnswer: exampleSentences[0].translation.split(' '),
    audio: true,
  });}
  flag = false
  // FILL_BLANK questions: Generated from example sentences with blanks and random options
  exampleSentences.forEach((example) => {
    if (flag == true){
      return
    }
    if (Math.random()>0.6){
      return
    }
    questions.push({
      id: idCounter++,
      type: 'FILL_BLANK',
      question: "Fill in the blank",
      sentence: example.sentence.replace(word, "__"),
      options: addRandomWords([translation]),
      correctAnswer: translation,
    });
  });
  if (flag==false){questions.push({
    id: idCounter++,
    type: 'FILL_BLANK',
    question: "Fill in the blank",
    sentence: exampleSentences[0].sentence.replace(word, "__"),
    options: addRandomWords([translation]),
    correctAnswer: translation,
  });}
  flag = false

  // MATCHING questions: Pair related words with their translations
  if (relatedWords.length > 0) {
    questions.push({
      id: idCounter++,
      type: 'MATCHING',
      question: "Match the words with their translations",
      pairs: relatedWords.map(rw => ({ word: rw.word, translation: rw.translation })),
    });
  }

  // // Additional NEW_WORD questions for each related word
  // relatedWords.forEach((rw) => {
  //   questions.push({
  //     id: idCounter++,
  //     type: 'NEW_WORD',
  //     question: `Which one means '${rw.word}'?`,
  //     options: getRandomOptions(rw.translation).map((text, index) => ({ id: index + 1, text })),
  //     correctAnswer: rw.translation,
  //     newWord: true,
  //   });
  // });

  return questions;
}
// const getNewWord = async (word,i) => {
//   try {
//     const prompt = `Translate "${word}" to Hindi, provide 3 other words in English different in meaning to word but not very different`;
//     const result = await model.generateContent(prompt);
//     let parsedResponse;

//     // Parse the Gemini API response
//     try {
//       const responseText = JSON.parse(result.response.text());
//       parsedResponse = {
//         id: i,
//         type: "NEW_WORD",
//         question: word,
//         options: responseText.options,
//         correctAnswer: responseText.correct_answer,
//       };
//     } catch (parseError) {
//       console.error("Error parsing response as JSON:", parseError);
//       parsedResponse = {
//         question: word,
//         options: [],
//       };
//     }

//     return parsedResponse;
//   } catch (error) {
//     console.error("Gemini API call failed:", error);
//     return { question: word, options: [] };
//   }
// };

// const getFillInTheBlank = async (word, i) => {
//   try {
//     // Step 1: Formulate the prompt for generating a sentence and options
//     const prompt = `Create a sentence with the word "${word}" in it. Translate the sentence to Hindi with a blank where the word would be. Provide four options, including "${word}" as the correct answer and three other related words that are close in meaning but not exactly the same, everything is in hindi`;
    
//     // Step 2: Send the prompt to the Gemini API and await response
//     const result = await model.generateContent(prompt);
//     let parsedResponse;

//     // Step 3: Parse the Gemini API response
//     try {
//       const responseText = JSON.parse(result.response.text());
//       parsedResponse = {
//         id: i,
//         type: 'FILL_BLANK',
//         question: "Fill in the blank",
//         sentence: responseText.sentence, // Sentence with a blank in place of the word
//         options: responseText.options,   // Four options, including the correct word
//         correctAnswer: responseText.correct_answer, // The correct word
//       };
//     } catch (parseError) {
//       console.error("Error parsing response as JSON:", parseError);
//       parsedResponse = {
//         id: i,
//         type: 'FILL_BLANK',
//         question: "Fill in the blank",
//         sentence: `__ ${word}`, // Fallback example if parsing fails
//         options: [word, "option1", "option2", "option3"],
//         correctAnswer: word,
//       };
//     }

//     return parsedResponse;
//   } catch (error) {
//     console.error("Gemini API call failed:", error);
//     return {
//       id: i,
//       type: 'FILL_BLANK',
//       question: "Fill in the blank",
//       sentence: `__ ${word}`,
//       options: [word, "option1", "option2", "option3"],
//       correctAnswer: word,
//     };
//   }
// };

module.exports = getLevel;