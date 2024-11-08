'use client'

import { useState } from 'react'
import Link from 'next/link'
import { 
  Home, 
  Store, 
  User, 
  MoreHorizontal, 
  Star, 
  Book, 
  Lock, 
  Dumbbell,
  Zap,
  ChevronRight,
  Trophy,
  Users,
  Settings
} from 'lucide-react'
import Image from 'next/image'
import withAuth from '../components/withAuth'
const tabs = ['Learn', 'Rankings', 'Shop', 'Profile']
const units = [
  {
    id: 1,
    title: 'Unit 1',
    subtitle: 'Form basic sentences, greet people',
    lessons: [
      { id: 1, title: 'Basics 1', icon: <Star className="w-6 h-6" />, status: 'completed' },
      { id: 2, title: 'Greetings', icon: <Book className="w-6 h-6" />, status: 'unlocked' },
      { id: 3, title: 'People', icon: <Lock className="w-6 h-6" />, status: 'locked' },
      { id: 4, title: 'Travel', icon: <Lock className="w-6 h-6" />, status: 'locked' },
      { id: 5, title: 'Restaurant', icon: <Lock className="w-6 h-6" />, status: 'locked' },
      { id: 6, title: 'Family', icon: <Lock className="w-6 h-6" />, status: 'locked' },
      { id: 7, title: 'Shopping', icon: <Lock className="w-6 h-6" />, status: 'locked' },
      { id: 8, title: 'Work', icon: <Lock className="w-6 h-6" />, status: 'locked' },
      { id: 9, title: 'Weather', icon: <Lock className="w-6 h-6" />, status: 'locked' },
      { id: 10, title: 'Hobbies', icon: <Lock className="w-6 h-6" />, status: 'locked' },
    ]
  },
  {
    id: 2,
    title: 'Unit 2',
    subtitle: 'Expand vocabulary and grammar',
    lessons: [
      { id: 11, title: 'Basics 2', icon: <Lock className="w-6 h-6" />, status: 'locked' },
      { id: 12, title: 'Food', icon: <Lock className="w-6 h-6" />, status: 'locked' },
      { id: 13, title: 'Animals', icon: <Lock className="w-6 h-6" />, status: 'locked' },
      { id: 14, title: 'Clothing', icon: <Lock className="w-6 h-6" />, status: 'locked' },
      { id: 15, title: 'Colors', icon: <Lock className="w-6 h-6" />, status: 'locked' },
      { id: 16, title: 'Dates & Time', icon: <Lock className="w-6 h-6" />, status: 'locked' },
      { id: 17, title: 'Feelings', icon: <Lock className="w-6 h-6" />, status: 'locked' },
      { id: 18, title: 'Education', icon: <Lock className="w-6 h-6" />, status: 'locked' },
      { id: 19, title: 'Technology', icon: <Lock className="w-6 h-6" />, status: 'locked' },
      { id: 20, title: 'Sports', icon: <Lock className="w-6 h-6" />, status: 'locked' },
    ]
  }
]

function Component() {
  const [activeTab, setActiveTab] = useState('Learn')
  const [xp, setXp] = useState(0)
  const dailyGoal = 10

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Learn':
        return (
          <>
            {units.map((unit, unitIndex) => (
              <div key={unit.id} className="mb-12">
                <div className="bg-[#58CC02] text-white p-6 rounded-2xl mb-8">
                  <div className="flex justify-between items-center">
                    <div>
                      <h2 className="text-2xl font-bold mb-2">{unit.title}</h2>
                      <p className="text-lg">{unit.subtitle}</p>
                    </div>
                    <button className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-xl flex items-center gap-2">
                      <Book className="w-5 h-5" />
                      GUIDEBOOK
                    </button>
                  </div>
                </div>

                <div className="flex justify-center">
                  <div className="relative flex flex-col items-center">
                    {unit.lessons.map((lesson, index) => (
                      <div 
                        key={lesson.id} 
                        className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${
                          index % 2 === 0 ? '-translate-x-8' : 'translate-x-8'
                        } ${
                          lesson.status === 'completed' ? 'bg-[#58CC02] text-white' :
                          lesson.status === 'unlocked' ? 'bg-white border-2 border-[#58CC02] text-[#58CC02]' :
                          'bg-gray-200 text-gray-400'
                        }`}
                        style={{
                          transition: 'all 0.3s ease',
                          zIndex: unit.lessons.length - index
                        }}
                      >
                        {lesson.icon}
                      </div>
                    ))}
                    <div className="absolute h-full w-1 bg-gray-200 rounded-full" style={{ zIndex: 0 }} />
                  </div>
                </div>
              </div>
            ))}
          </>
        )
      case 'Stories':
        return <div className="p-6 bg-white rounded-2xl">Stories content coming soon!</div>
      case 'Discuss':
        return <div className="p-6 bg-white rounded-2xl">Discussion forum coming soon!</div>
      case 'Shop':
        return <div className="p-6 bg-white rounded-2xl">Shop items coming soon!</div>
      case 'More':
        return <div className="p-6 bg-white rounded-2xl">Additional features coming soon!</div>
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-[#F7F7F7] flex">
      {/* Left Sidebar */}
      <nav className="w-[240px] bg-white p-4 flex flex-col gap-2 border-r">
        <Link href="/" className="text-[#58CC02] text-2xl font-bold mb-8">
          Lingo
        </Link>
        
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex items-center gap-3 p-3 rounded-xl ${
              activeTab === tab 
                ? 'bg-[#E5F7E5] text-[#58CC02]' 
                : 'hover:bg-gray-100 text-gray-500'
            }`}
          >
            {tab === 'Learn' && <Image src="/icons/green/house_green.png" width={24} height={24} alt="home" />}
            {tab === 'Rankings' && <Image src="/icons/green/Letter R Yellow_Green.png" width={24} height={24} alt="book" />}
            {/* {tab === 'Discuss' && <Image src="/users.png" width={24} height={24} alt="users" />} */}
            {tab === 'Shop' && <Image src="/icons/green/Handbag_Green.png" width={24} height={24} alt="store" />}
            {tab === 'Profile' && <Image src="/icons/green/Contacts_Green.png" width={24} height={24} alt="more" />} 
            
            <span className="font-bold text-lg">{tab.toUpperCase()}</span>
          </button>
        ))}
      </nav>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto">
        {renderTabContent()}
      </main>

      {/* Right Sidebar */}
      <aside className="w-[320px] p-4 border-l bg-white">
        {/* Language Selector */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#FF9600] rounded-lg" />
            <span className="font-bold">BENGALI</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
                <Image src = "/icons/red/Heart_Red.png" width={24} height = {24}></Image>
              {/* <div className="w-6 h-6 rounded-full bg-gray-200" /> */}
              <span>5</span>
            </div>
            <div className="flex items-center gap-1">
            <Image src = "/icons/red/Crown_Red.png" width={24} height = {24}></Image>
              <span>0</span>
            </div>
          </div>
        </div>

        {/* Daily Quests */}
        <div className="bg-white rounded-2xl p-4 border mb-4">
          <h2 className="text-xl font-bold mb-4">Daily Quests</h2>
          <div className="flex items-center gap-3 mb-2">
            <Zap className="w-6 h-6 text-yellow-400" />
            <span>Earn 10 XP</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex-1 h-3 bg-gray-100 rounded-full">
              <div 
                className="h-full bg-gray-300 rounded-full"
                style={{ width: `${(xp / dailyGoal) * 100}%` }}
              />
            </div>
            <span className="text-sm text-gray-500">{xp}/{dailyGoal}</span>
          </div>
        </div>

        {/* XP Progress */}
        <div className="bg-white rounded-2xl p-4 border mb-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">XP Progress</h2>
            <button className="text-[#1CB0F6]">EDIT GOAL</button>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-yellow-400 rounded-xl" />
            <div className="flex-1">
              <div className="flex justify-between mb-1">
                <span>Daily goal</span>
                <span>{xp}/{dailyGoal} XP</span>
              </div>
              <div className="h-3 bg-gray-100 rounded-full">
                <div 
                  className="h-full bg-gray-300 rounded-full"
                  style={{ width: `${(xp / dailyGoal) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>

      </aside>
    </div>
  )
}
export default withAuth(Component)