"use client"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import Button from "@/components/Button"
const languages = [
  { code: "ar", name: "ARABIC", flag: "🇸🇦" },
  { code: "bn", name: "BENGALI", flag: "🇧🇩" },
  { code: "cs", name: "CZECH", flag: "🇨🇿" },
  { code: "de", name: "GERMAN", flag: "🇩🇪" },
  { code: "el", name: "GREEK", flag: "🇬🇷" },
  { code: "en", name: "ENGLISH", flag: "🇺🇸" },
  { code: "es", name: "SPANISH", flag: "🇪🇸" },
  { code: "fr", name: "FR", flag: "🇫🇷" },
]


export default function Component() {
  const [currentLanguage, setCurrentLanguage] = useState("ENGLISH")

  return (
    <div className="min-h-screen bg-[#235390] text-white relative overflow-hidden">
      {/* Stars background */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-white rounded-full"
            style={{
              width: Math.random() * 3 + "px",
              height: Math.random() * 3 + "px",
              top: Math.random() * 100 + "%",
              left: Math.random() * 100 + "%",
              opacity: Math.random() * 0.5 + 0.5,
            }}
          />
        ))}
      </div>

      {/* Header */}
      <header className="relative z-10 flex justify-between items-center p-4 md:p-6">
        <Link href="/" className="text-xl md:text-2xl font-bold flex flex-row text-green-500 items-center">
          <Image src = "/logo.png" width={40} height = {40}></Image>Lingo
        </Link>
        <Button variant="ghost" className="text-white hover:text-white/80">
          {/* <Globe className="mr-2 h-4 w-4" /> */}

          SITE LANGUAGE: {currentLanguage}
        </Button>
      </header>

      {/* Main content */}
      <main className="relative z-10 container mx-auto px-4 py-12 md:py-24 flex flex-col md:flex-row items-center justify-between">
        <div className="w-full md:w-1/2 flex justify-center mb-8 md:mb-0">
          <div className="relative w-64 h-64 md:w-96 md:h-96">
            <div className="absolute inset-0 bg-[#1B4079] rounded-full opacity-20 blur-2xl" />
            <Image
              src="/earth.png"
              alt="Earth illustration"
              width={400}
              height={400}
              className="relative z-10"
              priority
            />
          </div>
        </div>
        <div className="w-full md:w-1/2 text-center md:text-left">
          <h1 className="text-3xl md:text-5xl font-bold mb-8 leading-tight">
            The free, fun, and effective way to learn a language!
          </h1>
          <div className="space-y-4">
            <Button className="w-full md:w-auto bg-[#58CC02] hover:bg-[#58CC02]/90 text-white text-lg py-6 px-8">
              GET STARTED
            </Button>
            <Button
              variant="outline"
              className="w-full md:w-auto border-white text-white hover:bg-white/10 text-lg py-6 px-8"
            >
              I ALREADY HAVE AN ACCOUNT
            </Button>
          </div>
        </div>
      </main>

      {/* Language carousel */}
      <div className="relative z-10 w-full bg-[#1B4079]/50 py-6 mt-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center space-x-8 overflow-x-auto scrollbar-hide">
            <Button variant="ghost" className="text-white p-2">
              {/* <ChevronLeft className="h-6 w-6" /> */}
            </Button>
            {languages.map((lang) => (
              <Button
                key={lang.code}
                variant="ghost"
                className="text-white hover:bg-white/10 space-x-2 min-w-[120px]"
                onClick={() => setCurrentLanguage(lang.name)}
              >
                <span className="text-2xl">{lang.flag}</span>
                <span className="font-medium">{lang.name}</span>
              </Button>
            ))}
            <Button variant="ghost" className="text-white p-2">
              {/* <ChevronRight className="h-6 w-6" /> */}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}