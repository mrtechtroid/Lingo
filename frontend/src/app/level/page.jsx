'use client'

import { useState, useEffect } from 'react'
import { Volume2, X, Heart } from 'lucide-react'

// Sample questions data
// const questions_ = [
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
const questions = 
[
  {
    "id": 1,
    "type": "NEW_WORD",
    "question": "Which one of these is 'नमस्ते'?",
    "options": [
      {
        "id": 1,
        "text": "नमस्ते",
        "image": "https://image.pollinations.ai/prompt/hello"
      },
      {
        "id": 2,
        "text": "अच्छा",
        "image": "https://image.pollinations.ai/prompt/good"
      },
      {
        "id": 3,
        "text": "कैसे",
        "image": "https://image.pollinations.ai/prompt/how"
      },
      {
        "id": 4,
        "text": "आपका स्वागत है",
        "image": "https://image.pollinations.ai/prompt/welcome"
      }
    ],
    "correctAnswer": 1,
    "newWord": true
  },
  {
    "id": 2,
    "type": "TRANSLATION",
    "question": "How do you say 'hello' in Hindi?",
    "inputFields": [
      ""
    ],
    "correctAnswer": [
      "नमस्ते"
    ],
    "hint": "Translate it to Hindi"
  },
  {
    "id": 3,
    "type": "WORD_BANK",
    "question": "Translate this to Hindi",
    "phrase": "Hello, how are you?",
    "wordBank": [
      "आप",
      "हैं?",
      "नमस्ते,",
      "कैसे"
    ],
    "correctAnswer": [
      "नमस्ते,",
      "आप",
      "कैसे",
      "हैं?"
    ],
    "audio": true
  },
  {
    "id": 4,
    "type": "WORD_BANK",
    "question": "Translate this to Hindi",
    "phrase": "Hello, my name is John.",
    "wordBank": [
      "शुभेच्छाएँ",
      "नमस्ते",
      "जॉन",
      "अच्छा",
      "नाम",
      "आपका स्वागत है",
      "मेरा",
      "है।",
      "नमस्ते,"
    ],
    "correctAnswer": [
      "नमस्ते,",
      "मेरा",
      "नाम",
      "जॉन",
      "है।"
    ],
    "audio": true
  },
  {
    "id": 5,
    "type": "WORD_BANK",
    "question": "Translate this to Hindi",
    "phrase": "Hello everyone!",
    "wordBank": [
      "शुभेच्छाएँ",
      "नमस्ते!",
      "को",
      "सभी"
    ],
    "correctAnswer": [
      "सभी",
      "को",
      "नमस्ते!"
    ],
    "audio": true
  },
  {
    "id": 6,
    "type": "WORD_BANK",
    "question": "Translate this to Hindi",
    "phrase": "Hello! Can I help you?",
    "wordBank": [
      "हूँ?",
      "नमस्ते!",
      "आपकी",
      "क्या",
      "मैं",
      "शुभेच्छाएँ",
      "सकता",
      "कर",
      "मदद"
    ],
    "correctAnswer": [
      "नमस्ते!",
      "क्या",
      "मैं",
      "आपकी",
      "मदद",
      "कर",
      "सकता",
      "हूँ?"
    ],
    "audio": true
  },
  {
    "id": 7,
    "type": "FILL_BLANK",
    "question": "Fill in the blank",
    "sentence": "Hello, how are you?",
    "options": [
      "नमस्ते",
      "नमस्ते",
      "शुभेच्छाएँ",
      "अच्छा"
    ],
    "correctAnswer": "नमस्ते"
  },
  {
    "id": 8,
    "type": "FILL_BLANK",
    "question": "Fill in the blank",
    "sentence": "Hello, my name is John.",
    "options": [
      "नमस्ते",
      "नमस्ते",
      "शुभेच्छाएँ",
      "आपका स्वागत है"
    ],
    "correctAnswer": "नमस्ते"
  },
  {
    "id": 9,
    "type": "FILL_BLANK",
    "question": "Fill in the blank",
    "sentence": "Hello everyone!",
    "options": [
      "नमस्ते",
      "कैसे",
      "आपका स्वागत है",
      "अच्छा"
    ],
    "correctAnswer": "नमस्ते"
  },
  {
    "id": 10,
    "type": "FILL_BLANK",
    "question": "Fill in the blank",
    "sentence": "Hello! Can I help you?",
    "options": [
      "आपका स्वागत है",
      "शुभेच्छाएँ",
      "नमस्ते",
      "नमस्ते"
    ],
    "correctAnswer": "नमस्ते"
  },
  {
    "id": 11,
    "type": "MATCHING",
    "question": "Match the words with their translations",
    "pairs": [
      {
        "word": "hello",
        "translation": "नमस्ते"
      },
      {
        "word": "greetings",
        "translation": "शुभेच्छाएँ"
      },
      {
        "word": "welcome",
        "translation": "आपका स्वागत है"
      },
      {
        "word": "good",
        "translation": "अच्छा"
      },
      {
        "word": "how",
        "translation": "कैसे"
      }
    ]
  },
  {
    "id": 12,
    "type": "NEW_WORD",
    "question": "Which one means 'hello'?",
    "options": [
      {
        "id": 1,
        "text": "नमस्ते"
      },
      {
        "id": 2,
        "text": "आपका स्वागत है"
      },
      {
        "id": 3,
        "text": "अच्छा"
      },
      {
        "id": 4,
        "text": "कैसे"
      }
    ],
    "correctAnswer": "नमस्ते",
    "newWord": true
  },
  {
    "id": 13,
    "type": "NEW_WORD",
    "question": "Which one means 'greetings'?",
    "options": [
      {
        "id": 1,
        "text": "आपका स्वागत है"
      },
      {
        "id": 2,
        "text": "नमस्ते"
      },
      {
        "id": 3,
        "text": "कैसे"
      },
      {
        "id": 4,
        "text": "शुभेच्छाएँ"
      }
    ],
    "correctAnswer": "शुभेच्छाएँ",
    "newWord": true
  },
  {
    "id": 14,
    "type": "NEW_WORD",
    "question": "Which one means 'welcome'?",
    "options": [
      {
        "id": 1,
        "text": "आपका स्वागत है"
      },
      {
        "id": 2,
        "text": "अच्छा"
      },
      {
        "id": 3,
        "text": "शुभेच्छाएँ"
      },
      {
        "id": 4,
        "text": "नमस्ते"
      }
    ],
    "correctAnswer": "आपका स्वागत है",
    "newWord": true
  },
  {
    "id": 15,
    "type": "NEW_WORD",
    "question": "Which one means 'good'?",
    "options": [
      {
        "id": 1,
        "text": "शुभेच्छाएँ"
      },
      {
        "id": 2,
        "text": "नमस्ते"
      },
      {
        "id": 3,
        "text": "आपका स्वागत है"
      },
      {
        "id": 4,
        "text": "अच्छा"
      }
    ],
    "correctAnswer": "अच्छा",
    "newWord": true
  },
  {
    "id": 16,
    "type": "NEW_WORD",
    "question": "Which one means 'how'?",
    "options": [
      {
        "id": 1,
        "text": "आपका स्वागत है"
      },
      {
        "id": 2,
        "text": "नमस्ते"
      },
      {
        "id": 3,
        "text": "शुभेच्छाएँ"
      },
      {
        "id": 4,
        "text": "कैसे"
      }
    ],
    "correctAnswer": "कैसे",
    "newWord": true
  }
]
export default function Level() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [inputValues, setInputValues] = useState([])
  const [selectedWords, setSelectedWords] = useState([])
  const [matchedPairs, setMatchedPairs] = useState([])
  const [isCorrect, setIsCorrect] = useState(null)
  const [hearts, setHearts] = useState(5)
  const [showError, setShowError] = useState(false)
  const [selectedMatchingWord, setSelectedMatchingWord] = useState(null)

  const currentQuestion = questions[currentQuestionIndex]

  useEffect(() => {
    // Reset states when question changes
    setSelectedAnswer(null)
    setInputValues([])
    setSelectedWords([])
    setMatchedPairs([])
    setIsCorrect(null)
    setShowError(false)
  }, [currentQuestionIndex])

  const playSound = () => {
    // const audio = new Audio(type === 'success' ? '/success.mp3' : '/error.mp3')
    // audio.play()
  }

  const handleCheck = () => {
    let correct = false

    switch (currentQuestion.type) {
      case 'NEW_WORD':
        correct = selectedAnswer === currentQuestion.correctAnswer
        break
      case 'TRANSLATION':
        correct = inputValues.every((value, index) => 
          value.toLowerCase().trim() === currentQuestion.correctAnswer[index].toLowerCase()
        )
        break
      case 'WORD_BANK':
        correct = selectedWords.join(' ') === currentQuestion.correctAnswer.join(' ')
        break
      case 'FILL_BLANK':
        correct = selectedAnswer === currentQuestion.correctAnswer
        break
      case 'MATCHING':
        correct = matchedPairs.length === currentQuestion.pairs.length * 2
        break
    }

    setIsCorrect(correct)
    
    if (correct) {
      playSound('success')
      setTimeout(() => {
        if (currentQuestionIndex < questions.length - 1) {
          setCurrentQuestionIndex(prev => prev + 1)
        }
      }, 1500)
    } else {
      playSound('error')
      setHearts(prev => prev - 1)
      setShowError(true)
      setTimeout(() => setShowError(false), 2000)
    }
  }
  useEffect(()=>{
    if (hearts<=0){
      alert("You have no hearts left. To continue further. ")
    }
  },[hearts])
  const handleSkip = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1)
    }
  }

  const renderQuestion = () => {
    switch (currentQuestion.type) {
      case 'NEW_WORD':
        return (
          <div className="space-y-4">
            {currentQuestion.newWord && (
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-purple-100 text-purple-600 text-sm font-medium">
                NEW WORD
              </div>
            )}
            <h2 className="text-xl font-bold">{currentQuestion.question}</h2>
            <div className="grid grid-cols-2 gap-4">
              {currentQuestion.options.map(option => (
                <button
                  key={option.id}
                  onClick={() => setSelectedAnswer(option.id)}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    selectedAnswer === option.id
                      ? 'border-[#58CC02] bg-[#E5F7E5]'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <img src={option.image} alt={option.text} className="w-full h-32 object-cover rounded-lg mb-2" />
                  <p className="text-center font-medium">{option.text}</p>
                </button>
              ))}
            </div>
          </div>
        )

      case 'TRANSLATION':
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-bold">{currentQuestion.question}</h2>
            <div className="space-y-2">
              {currentQuestion.inputFields.map((_, index) => (
                <input
                  key={index}
                  type="text"
                  value={inputValues[index] || ''}
                  onChange={(e) => {
                    const newValues = [...inputValues]
                    newValues[index] = e.target.value
                    setInputValues(newValues)
                  }}
                  className="w-full p-3 rounded-lg border-2 border-gray-200 focus:border-[#58CC02] focus:ring-0"
                  placeholder="Type your answer"
                />
              ))}
            </div>
          </div>
        )

      case 'WORD_BANK':
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-bold">{currentQuestion.question}</h2>
            <div className="flex items-center gap-2 p-4 bg-gray-100 rounded-lg">
              <Volume2 className="w-6 h-6 text-blue-500" />
              <p className="text-lg">{currentQuestion.phrase}</p>
            </div>
            <div className="min-h-[100px] p-4 border-2 border-dashed border-gray-300 rounded-lg">
              {selectedWords.map((word, index) => (
                <span
                  key={index}
                  onClick={() => {
                    const newWords = [...selectedWords]
                    newWords.splice(index, 1)
                    setSelectedWords(newWords)
                  }}
                  className="inline-block m-1 px-3 py-1 bg-white border rounded-lg cursor-pointer"
                >
                  {word}
                </span>
              ))}
            </div>
            <div className="flex flex-wrap gap-2">
              {currentQuestion.wordBank.map((word, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedWords([...selectedWords, word])}
                  disabled={selectedWords.includes(word)}
                  className="px-3 py-1 bg-white border rounded-lg disabled:opacity-50"
                >
                  {word}
                </button>
              ))}
            </div>
          </div>
        )

      case 'FILL_BLANK':
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-bold">{currentQuestion.question}</h2>
            <div className="text-lg">
              {currentQuestion.sentence.split('__').map((part, index, array) => (
                <span key={index}>
                  {part}
                  {index < array.length - 1 && (
                    <span className="mx-2 px-4 py-1 bg-gray-100 rounded">
                      {selectedAnswer || '___'}
                    </span>
                  )}
                </span>
              ))}
            </div>
            <div className="flex flex-wrap gap-2">
              {currentQuestion.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedAnswer(option)}
                  className={`px-4 py-2 rounded-lg transition-all ${
                    selectedAnswer === option
                      ? 'bg-[#E5F7E5] border-2 border-[#58CC02]'
                      : 'bg-white border-2 border-gray-200 hover:border-gray-300'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        )

      case 'MATCHING':
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-bold">{currentQuestion.question}</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                {currentQuestion.pairs.map(pair => (
                  <button
                    key={pair.word}
                    onClick={() => {
                      if (selectedMatchingWord === pair.word) {
                        setSelectedMatchingWord(null)
                      } else {
                        setSelectedMatchingWord(pair.word)
                        if (selectedMatchingWord) {
                          setMatchedPairs([...matchedPairs, selectedMatchingWord, pair.word])
                        }
                      }
                    }}
                    disabled={matchedPairs.includes(pair.word)}
                    className={`w-full p-2 rounded-lg transition-all ${
                      selectedMatchingWord === pair.word
                        ? 'bg-[#E5F7E5] border-2 border-[#58CC02]'
                        : matchedPairs.includes(pair.word)
                        ? 'bg-gray-100 opacity-50'
                        : 'bg-white border-2 border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {pair.word}
                  </button>
                ))}
              </div>
              <div className="space-y-2">
                {currentQuestion.pairs.map(pair => (
                  <button
                    key={pair.translation}
                    onClick={() => {
                      if (selectedMatchingWord === pair.translation) {
                        setSelectedMatchingWord(null)
                      } else {
                        setSelectedMatchingWord(pair.translation)
                        if (selectedMatchingWord) {
                          setMatchedPairs([...matchedPairs, selectedMatchingWord, pair.translation])
                        }
                      }
                    }}
                    disabled={matchedPairs.includes(pair.translation)}
                    className={`w-full p-2 rounded-lg transition-all ${
                      selectedMatchingWord === pair.translation
                        ? 'bg-[#E5F7E5] border-2 border-[#58CC02]'
                        : matchedPairs.includes(pair.translation)
                        ? 'bg-gray-100 opacity-50'
                        : 'bg-white border-2 border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {pair.translation}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="flex items-center justify-between p-4 border-b">
        <button className="p-2 hover:bg-gray-100 rounded-full">
          <X className="w-6 h-6" />
        </button>
        <div className="flex items-center gap-2">
          {hearts>=0 && [...Array(hearts)].map((_, i) => (
            <Heart key={i} className="w-6 h-6 text-red-500 fill-current" />
          ))}
        </div>
        <div className="w-6" /> {/* Spacer */}
      </header>

      {/* Main content */}
      <main className="max-w-2xl mx-auto p-4 space-y-6">
        {/* Progress bar */}
        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-[#58CC02] transition-all"
            style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
          />
        </div>

        {/* Question */}
        {renderQuestion()}

        {/* Error message */}
        {showError && (
          <div className="fixed bottom-20 left-1/2 transform -translate-x-1/2 bg-red-100 text-red-600 px-6 py-3 rounded-lg shadow-lg">
            That's not correct. Try again!
          </div>
        )}

        {/* Success message */}
        {isCorrect && (
          <div className="fixed bottom-20 left-1/2 transform -translate-x-1/2 bg-green-100 text-green-600 px-6 py-3 rounded-lg shadow-lg">
            Excellent!
          </div>
        )}

        {/* Buttons */}
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t">
          <div className="max-w-2xl mx-auto flex gap-4">
            <button
              onClick={handleSkip}
              className="px-6 py-3 text-[#58CC02] font-bold rounded-xl hover:bg-[#E5F7E5]"
            >
              SKIP
            </button>
            <button
              onClick={handleCheck}
              disabled={!selectedAnswer && inputValues.length === 0 && selectedWords.length === 0 && matchedPairs.length === 0}
              className="flex-1 px-6 py-3 bg-[#58CC02] text-white font-bold rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#58CC02]/90"
            >
              CHECK
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}