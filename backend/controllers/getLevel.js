const mongoose = require("mongoose");
const Lesson = require("../models/Lesson");
//const { makeGeminiAPICall } = require("../services/geminiService");

const { GoogleGenerativeAI, SchemaType } = require('@google/generative-ai');
const dotenv = require('dotenv');
dotenv.config();

// GoogleGenerativeAI required config
const configuration = new GoogleGenerativeAI(process.env.API_KEY);

// Model initialization
const modelId = "gemini-1.5-pro";
const fillBlankSchema = {
  description: "List of translations with options for each word",
}
const newWordSchema = {
  description: "List of translations with options for each word",
  // type: SchemaType.ARRAY,
  // items: {
    type: SchemaType.OBJECT,
    properties: {
      question: {
        type: SchemaType.STRING,
        description: "The translated word in hindi script",
        nullable: false,
      },
      options: {
        type: SchemaType.ARRAY,
        items: {
          type: SchemaType.STRING,
          description: "Related options of word in hindi",
          nullable: false,
        },
        description: "Array of words differnt in meaning to word but not very different",
      },
      sentence: {
        type: SchemaType.STRING,
        description: "Sentence using the word in it",
        nullable: true,
      }
    },
    required: ["question", "options", "sentence"],
  
};

const model = configuration.getGenerativeModel({
  model: modelId,
  generationConfig: {
    responseMimeType: "application/json",
    responseSchema: newWordSchema,
  },
});

const model2 = configuration.getGenerativeModel({
  model: modelId,
  generationConfig: {
    responseMimeType: "application/json",
    responseSchema: newWordSchema,
  },
});

// Controller function to handle fetching lesson details and generating questions
const getLevel = async (req, res) => {
  try {
    const { lessonId, level } = req.body;

    // Fetch the lesson document by its ID
    // const lesson = await Lesson.findById(lessonId);
    // if (!lesson) {
    //   return res.status(404).json({ message: "Lesson not found" });
    // }

    // Validate the level index
    const keywords = [["cat", "dog"], ["apple", "banana"], ["tree", "flower"]];
    if (level < 0 || level >= keywords.length) {
      return res.status(400).json({ message: "Invalid level" });
    }

    // Retrieve keywords at the specified level
    
    const wordList = keywords[level];
    if (!Array.isArray(wordList)) {
      return res.status(400).json({ message: "wordList must be an array of strings" });
    }

    let i = 0;

    // Generate responses for each word in wordList using both functions
    const responses = await Promise.all(wordList.flatMap(async (word) => {
      // Call both functions for each word
      const newWordResponse = await getNewWord(word, i++);
      const fillInTheBlankResponse = await getFillInTheBlank(word, i++);
      
      // Return an array with both responses for each word
      return [newWordResponse, fillInTheBlankResponse];
    }));
    
    // Flatten the array and send the response as a single array of JSON objects
    res.json(responses.flat());

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getNewWord = async (word,i) => {
  try {
    const prompt = `Translate "${word}" to Hindi, provide 3 other words in English different in meaning to word but not very different`;
    const result = await model.generateContent(prompt);
    let parsedResponse;

    // Parse the Gemini API response
    try {
      const responseText = JSON.parse(result.response.text());
      parsedResponse = {
        id: i,
        type: "NEW_WORD",
        question: word,
        options: responseText.options,
        correctAnswer: responseText.correct_answer,
      };
    } catch (parseError) {
      console.error("Error parsing response as JSON:", parseError);
      parsedResponse = {
        question: word,
        options: [],
      };
    }

    return parsedResponse;
  } catch (error) {
    console.error("Gemini API call failed:", error);
    return { question: word, options: [] };
  }
};

const getFillInTheBlank = async (word, i) => {
  try {
    // Step 1: Formulate the prompt for generating a sentence and options
    const prompt = `Create a sentence with the word "${word}" in it. Translate the sentence to Hindi with a blank where the word would be. Provide four options, including "${word}" as the correct answer and three other related words that are close in meaning but not exactly the same, everything is in hindi`;
    
    // Step 2: Send the prompt to the Gemini API and await response
    const result = await model.generateContent(prompt);
    let parsedResponse;

    // Step 3: Parse the Gemini API response
    try {
      const responseText = JSON.parse(result.response.text());
      parsedResponse = {
        id: i,
        type: 'FILL_BLANK',
        question: "Fill in the blank",
        sentence: responseText.sentence, // Sentence with a blank in place of the word
        options: responseText.options,   // Four options, including the correct word
        correctAnswer: responseText.correct_answer, // The correct word
      };
    } catch (parseError) {
      console.error("Error parsing response as JSON:", parseError);
      parsedResponse = {
        id: i,
        type: 'FILL_BLANK',
        question: "Fill in the blank",
        sentence: `__ ${word}`, // Fallback example if parsing fails
        options: [word, "option1", "option2", "option3"],
        correctAnswer: word,
      };
    }

    return parsedResponse;
  } catch (error) {
    console.error("Gemini API call failed:", error);
    return {
      id: i,
      type: 'FILL_BLANK',
      question: "Fill in the blank",
      sentence: `__ ${word}`,
      options: [word, "option1", "option2", "option3"],
      correctAnswer: word,
    };
  }
};

module.exports = getLevel;