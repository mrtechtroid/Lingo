const mongoose = require("mongoose");
const Lesson = require("../models/Lessons");
const joi = require("joi");
const { GoogleGenerativeAI } = require('@google/generative-ai');
const dotenv = require('dotenv');
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.API_KEY);

// Model configuration with schema
const modelId = "gemini-1.5-flash-8b";
const model = genAI.getGenerativeModel({
  model: modelId,
  generationConfig: {
    responseMimeType: "application/json",
    responseSchema: {
      type: "object",
      properties: {
        chatSent: {
          type: "string",
          description: "Unique reply to the user's input in Hindi"
        },
        possibleReplies: {
          type: "array",
          description: "Three unique replies that the user could give in response",
          items: {
            type: "string",
            description: "A possible reply to the AI's response in Hindi"
          }
        }
      },
      required: ["chatSent", "possibleReplies"]
    }
  }
});

// Main conversation function
const Translate = async (req, res) => {
  const { userSent } = req.body;

  try {
    // Start a chat with the Hindi user input
    const chat = model.startChat({
      history: [
        {
          role: "user",
          parts: [{ text: `User input in Hindi: "${userSent}"` }]
        }
      ]
    });

    // Send the message with specific instructions
    const result = await chat.sendMessage("Please respond uniquely to the user input in Hindi, and also suggest three unique responses the user might give to your reply.");

    // Parsing the structured JSON response
    const { chatSent, possibleReplies } = JSON.parse(result.response.text());

    // Send the structured JSON response back to the client
    return res.json({
      userSent,
      chatSent,
      possibleReplies
    });

  } catch (error) {
    console.error("Error continuing conversation in Hindi:", error);
    res.status(500).json({ error: "Conversation continuation failed." });
  }
};

module.exports = Translate;
