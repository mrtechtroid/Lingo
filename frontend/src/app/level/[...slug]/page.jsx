'use client'

import { useState, useEffect } from 'react'
import { Volume2, X, Heart } from 'lucide-react'
import { useRouter,useParams } from 'next/navigation'
import Image from 'next/image'
import axios from 'axios'
// import {ToastContainer, toast} from 'react-toastify';
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
  const [questions, setQuestions] = useState('')
  const [mistakes, setMistakes] = useState(0)
  const [xpGained, setXpGained] = useState(0)
  const [skipped, setSkipped] = useState(0)
  const [user, setUser] = useState({})
  // const currentQuestion = questions[currentQuestionIndex]
  const router = useRouter();
  const path = useParams().slug;
  const lessonID = path[0];
  const level = path[1];
  // alert(lessonID,level)
  useEffect(() => {
    // Reset states when question changes
    setSelectedAnswer(null)
    setInputValues([])
    setSelectedWords([])
    setMatchedPairs([])
    setIsCorrect(null)
    setShowError(false)
  }, [currentQuestionIndex])
  const [token, setToken] = useState('')
  useEffect(() => {
    const token = localStorage.getItem('token')
    setToken(token)
  }, [])
  useEffect(()=>{
    if (hearts<=0){
      alert("You have no hearts left. To continue further. ")
      // setshowError(true)
      router.push("/dashboard")
    }
  },[hearts])
  useEffect(() => {
    console.log(token)
    async function getUser(){
      await axios.get('http://localhost:8080/user/get',{ headers:{"authorization":token}}).then((res) => {
        setUser(res.data)
        setHearts(res.data.hearts)
      }).catch((err)=>{
        if (err.response.status == 411){
          router.push("/login")
        }
      })
    }
    getUser()
    
    // setXp(user.experience)
  }, [token])
  useEffect(() => {
    console.log(token)
    async function getLevel(){
      await axios.post('http://localhost:8080/level/getlevel',{"lessonID":lessonID,"level":level},{headers:{"authorization":token}}).then((res) => {
        setQuestions(res.data)
      }).catch((err)=>{
        if (err.response.status == 411){
          router.push("/login")
        }
      })
    }
    getLevel()
  }, [path,token])
  const playSound = () => {
    // const audio = new Audio(type === 'success' ? '/success.mp3' : '/error.mp3')
    // audio.play()
  }

  const handleCheck = () => {
    let correct = false
    const currentQuestion = questions[currentQuestionIndex]
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
    async function updateeExp(){
      await axios.post('http://localhost:8080/user/updatexp',{"experience":10},{headers:{"authorization":token}}).then((res) => {
        console.log(res.data)
        setXpGained(prev=>prev+10)
        // toast.success("+10 Crowns")
      }).catch((err)=>{
        if (err.response.status == 411){
          router.push("/login")
        }
      })
    }
    async function updateHeart(){
      await axios.post('http://localhost:8080/user/updateheart',{"hearts":1},{headers:{"authorization":token}}).then((res) => {
        console.log(res.data)
        setMistakes(prev=>prev+1)
        // toast.error("-1 Heart")
      }).catch((err)=>{
        if (err.response.status == 411){
          router.push("/login")
        }
      })
    }
    if (correct) {
      playSound('success')
      updateeExp(10)
      setTimeout(() => {
        if (currentQuestionIndex < questions.length - 1) {
          setCurrentQuestionIndex(prev => prev + 1)
        }else{
          completeLesson()
        }
      }, 900)

    } else {
      playSound('error')
      updateHeart(hearts-1).then(()=>{
        setHearts(hearts-1)
        setShowError(true)
        setTimeout(() => setShowError(false), 2000)
      })
    }
  }
  useEffect(()=>{
    if (hearts<=0){
      alert("You have no hearts left. To continue further. ")
    }
  },[hearts])
  const completeLesson = async () =>{
    await axios.post('http://localhost:8080/user/updatelevel',{"lesson":lessonID,"level":level},{headers:{"authorization":token}}).then((res) => {
      console.log(res.data)
      setCurrentQuestionIndex(-1)
    }).catch((err)=>{
      if (err.response.status == 411){
        router.push("/login")
      }
    })
  }
  const handleSkip = () => {
    setSkipped(prev=>prev+1)
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1)
    }else{
      completeLesson()
      // setCurrentQuestionIndex(-1)
    }
  }

  const renderQuestion = () => {
    if(currentQuestionIndex === -1){
      return <div className="space-y-4">
        <div className="inline-flex items-center px-3 py-1 rounded-full bg-purple-100 text-purple-600 text-sm font-medium">
          FINISHED! 
        </div>
        <h2 className="text-xl font-bold">You have completed the lesson!</h2>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Image className="w-8 h-8 bg-[#FF9600] rounded-lg" src="/icons/red/Arrow Left_Red.png" width={24} height={24} alt="heart"></Image>
            <span>You have skipped {skipped} questions</span>
          </div>
          <div className="flex items-center gap-2">
          <Image className="w-8 h-8 bg-[#FF9600] rounded-lg" src="/icons/red/Questionmark_Red.png" width={24} height={24} alt="heart"></Image>
            <span>You have made {mistakes} mistakes</span>
          </div>
          <div className="flex items-center gap-2">
          <Image className="w-8 h-8 bg-[#FF9600] rounded-lg" src="/icons/red/Crown_Red.png" width={24} height={24} alt="heart"></Image>
            <span>You gained {xpGained} Crowns</span>
          </div>
        </div>
      </div>
    }
    const currentQuestion = questions[currentQuestionIndex]
    switch (currentQuestion &&currentQuestion.type) {
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
      {/* <ToastContainer /> */}
      {/* Header */}
      <header className="flex items-center justify-between p-4 border-b">
        <button className="p-2 hover:bg-gray-100 rounded-full" onClick={()=>router.push("/dashboard")}>
          <Image src = "/icons/red/Arrow Left_Red.png" width={24} height = {24} alt = "X"/>
          {/* <X className="w-6 h-6" /> */}
        </button>
        <div className="flex items-center gap-2">
          {hearts>=0 && [...Array(hearts)].map((_, i) => (
            <i key={i} className="w-6 h-6 text-red-500 fill-current nes-icon heart" />
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
        {currentQuestionIndex !== -1 &&
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
}
        {currentQuestionIndex === -1 &&
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t">
          <div className="max-w-2xl mx-auto flex gap-4">
            <button
              onClick={function(){router.push("/dashboard")}}
              className="px-6 py-3 text-[#58CC02] font-bold rounded-xl hover:bg-[#E5F7E5]"
            >
              FINISH
            </button>
          </div>
        </div>
}
      </main>
    </div>
  )
}