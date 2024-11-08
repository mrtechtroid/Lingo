  const { GoogleGenerativeAI, SchemaType } = require('@google/generative-ai');
  const dotenv = require('dotenv');
  dotenv.config();

  // GoogleGenerativeAI required config
  const configuration = new GoogleGenerativeAI(process.env.API_KEY);

  // Model initialization
  const modelId = "gemini-1.5-pro";
  const schema = {
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
            description: "Related options of word in english",
            nullable: false,
          },
          description: "Array of words differnt in meaning to word but not very different",
        },
      },
      required: ["question", "options"],
    
  };

  const model = configuration.getGenerativeModel({
    model: modelId,
    generationConfig: {
      responseMimeType: "application/json",
      responseSchema: schema,
    },
  });
  const generateResponse = async (req, res) => {
    //console.log("generating");
    try {
      const { wordList } = req.body;

      // Validate that wordList is an array
      if (!Array.isArray(wordList)) {
        return res.status(400).json({ message: "wordList must be an array of strings" });
      }

      // Process each word in the wordList
      const responses = await Promise.all(wordList.map(async (word) => {
        const prompt = `Translate "${word}" to hindi, provide 3 other words in english different in meaning to word but not very different`;
        const result = await model.generateContent(prompt);
        console.log(result.response.text());

        // Parse response into schema format
        let parsedResponse;
      try {
        const responseText = JSON.parse(result.response.text());
        parsedResponse = {
          question: responseText.question,
          options: responseText.options,
        };
      } catch (parseError) {
        console.error("Error parsing response as JSON:", parseError);
        parsedResponse = {
          question: word,
          options: [],
        };
      }
        return parsedResponse;
      }));

      // Send the structured response
      res.json(responses);

    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    }
  };

  module.exports = { generateResponse };
