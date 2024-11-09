'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import axios from 'axios'
const languages = [
  "English","Hindi", "Spanish", "Punjabi"
]
const flag = [
    "flag_1", "flag_2", "flag_3", "flag_2"
]
const proficiencyLevels = [
  { value: 1, label: "Beginner - No prior knowledge" },
  { value: 2, label: "Basic - Know a few words" },
  { value: 3, label: "Intermediate - Can form simple sentences" },
  { value: 4, label: "Advanced - Conversational skills" }
]

const referralSources = [
  "Friend or family", "Social media", "Search engine", "Advertisement", "App store", "Other"
]

export default function OnboardingPage() {
  const [step, setStep] = useState(0)
  const [selectedLanguage, setSelectedLanguage] = useState('')
  const [proficiency, setProficiency] = useState('')
  const [referral, setReferral] = useState('')
  const [token, setToken] = useState('')
  const router = useRouter();
  const [submitted, setSubmitted] = useState(false);
  const nextStep = () => setStep((prev) => prev + 1)
  const prevStep = () => setStep((prev) => prev - 1)
  useEffect(() => {
    const token = localStorage.getItem("token");
    setToken(token);
  }, []);
  const steps = [
    // Step 1: Language Selection
    <motion.div
      key="language"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.3 }}
      className="space-y-4"
    >
      <h2 className="text-2xl font-bold text-center mb-6">Which language do you want to learn?</h2>
      <center>{selectedLanguage && <img src={`/${flag[languages.indexOf(selectedLanguage)]}.png`} alt="flag" className="w-15 h-15" />}</center>
      <select
        className="nes-select.is-success w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#58CC02]"
        value={selectedLanguage}
        onChange={(e) => setSelectedLanguage(e.target.value)}
      >
        <option value="">Select a language</option>
        {languages.map((lang) => (
          <option key={lang} value={lang}>{lang}</option>
        ))}
      </select>
    </motion.div>,

    // Step 2: Proficiency Level
    <motion.div
      key="proficiency"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.3 }}
      className="space-y-4"
    >
      <h2 className="text-2xl font-bold text-center mb-6">What's your current level in {selectedLanguage}?</h2>
      {proficiencyLevels.map((level) => (
        <label key={level.value} className="flex items-center space-x-2 cursor-pointer">
          <input
            type="radio"
            name="proficiency"
            value={level.value}
            checked={proficiency === level.value}
            onChange={() => setProficiency(level.value)}
            className="form-radio text-[#58CC02] focus:ring-[#58CC02]"
          />
          <span>{level.label}</span>
        </label>
      ))}
    </motion.div>,

    // Step 3: Referral Source
    <motion.div
      key="referral"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.3 }}
      className="space-y-4"
    >
      <h2 className="text-2xl font-bold text-center mb-6">How did you hear about us?</h2>
      {referralSources.map((source) => (
        <label key={source} className="flex items-center space-x-2 cursor-pointer">
          <input
            type="radio"
            name="referral"
            value={source}
            checked={referral === source}
            onChange={() => setReferral(source)}
            className="form-radio text-[#58CC02] focus:ring-[#58CC02]"
          />
          <span>{source}</span>
        </label>
      ))}
    </motion.div>
  ]
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const handleSubmit = async (e) => {
    console.log("hi")
    // e.preventDefault();
    try {
      await axios.post('http://localhost:8080/user/setonboarding', {
        "language":selectedLanguage,
        "level": proficiency,
        "referral":referral
      },{
        headers: {
          "Content-Type": "application/json",
          "Authorization": token
        }
      });
      setSuccess(true);
      setError('');
      router.push("/dashboard")
      setSubmitted(true);
    } catch (err) {
      console.log(err)
      setError('Onboarding failed.' + err?.message);
      setSuccess('false')
      setSubmitted(false);
    }
  };

  return (
    <div style={{backgroundImage:"url(Designer.jpeg)"}}>
    <div className="min-h-screen flex flex-col items-center justify-center p-4" style={{backdropFilter:"blur(2px)"}}>
      <div className="w-full max-w-md bg-white rounded-lg shadow-xl overflow-hidden">
        <div className="p-6 sm:p-8">
          <AnimatePresence mode="wait">
            {steps[step]}
          </AnimatePresence>
          <div className="mt-8 flex justify-between">
            {step > 0 && (
              <button
                onClick={prevStep}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#58CC02]"
              >
                Back
              </button>
            )}
            {step < steps.length - 1 ? (
              <button 
                onClick={nextStep} 
                className="ml-auto px-4 py-2 bg-[#58CC02] hover:bg-[#58CC02]/90 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#58CC02]"
                disabled={
                  (step === 0 && !selectedLanguage) ||
                  (step === 1 && !proficiency)
                }
              >
                Continue
              </button>
            ) : (
              <button 
                onClick={handleSubmit} 
                className="ml-auto px-4 py-2 bg-[#58CC02] hover:bg-[#58CC02]/90 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#58CC02]"
                disabled={submitted}
              >
                Finish
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}