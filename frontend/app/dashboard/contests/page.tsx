"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Home,
  Video,
  BookOpen,
  GraduationCap,
  Target,
  Award,
  Settings,
  LogOut,
  ChevronRight,
  Menu,
  X,
  Trophy,
  Clock,
  Crown,
  Flame,
  BarChart3,
  Coins,
  Medal,
  Check,
  Star,
  Brain,
  Zap,
  Sparkles,
  ArrowRight,
  History
} from "lucide-react"

export default function Contests() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("daily")
  const [activeChallenge, setActiveChallenge] = useState<string | null>(null)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  const [showResult, setShowResult] = useState(false)
  const [showCelebration, setShowCelebration] = useState(false)
  const [userCoins, setUserCoins] = useState(450)
  const [streakAnimating, setStreakAnimating] = useState(false)

  // Enhanced user data with academic progress
  const user = {
    name: "Adedeji",
    xp: 1250,
    coins: userCoins,
    avatar: "/placeholder-user.jpg",
    contestsWon: 8,
    contestsCompleted: 23,
    totalEarnings: 2340,
    winStreak: 3,
    longestStreak: 7,
    rank: "Gold",
    level: 12,
    academicPoints: 2840,
    dailyStreak: 15,
    badges: [
      { id: 'first_contest', name: 'First Steps', description: 'Completed your first contest', unlocked: true, icon: '🎯' },
      { id: 'contest_5', name: 'Getting Started', description: 'Completed 5 contests', unlocked: true, icon: '⭐' },
      { id: 'contest_10', name: 'Dedicated Student', description: 'Completed 10 contests', unlocked: true, icon: '🏆' },
      { id: 'contest_25', name: 'Academic Warrior', description: 'Completed 25 contests', unlocked: false, icon: '🛡️' },
      { id: 'math_master', name: 'Math Master', description: 'Won 3 math contests', unlocked: true, icon: '🧮' },
      { id: 'science_star', name: 'Science Star', description: 'Top 3 in science contests', unlocked: true, icon: '🔬' },
      { id: 'streak_7', name: 'On Fire', description: '7-day win streak', unlocked: true, icon: '🔥' },
      { id: 'early_bird', name: 'Early Bird', description: 'Join contests within first hour', unlocked: false, icon: '🌅' }
    ]
  }

  // Sample past contests results
  const pastContests = [
    {
      id: 6,
      title: "English Grammar Contest",
      result: "Winner",
      xpEarned: 250,
      rank: 1,
      participants: 67,
      date: "Last Week"
    },
    {
      id: 7,
      title: "Geography Quiz",
      result: "Top 10",
      xpEarned: 100,
      rank: 8,
      participants: 89,
      date: "2 Weeks Ago"
    }
  ]

  // Enhanced daily challenges with interactive quizzes
  const [dailyChallenges, setDailyChallenges] = useState([
    { 
      id: 'daily_math', 
      subject: 'Quick Math', 
      reward: 25, 
      completed: true, 
      streak: 15,
      icon: '🧮',
      color: 'from-blue-400 to-blue-600',
      borderColor: 'border-blue-300',
      questions: [
        { question: "What is 15 × 8?", options: ["120", "125", "130", "115"], correct: 0 },
        { question: "Solve: 144 ÷ 12", options: ["11", "12", "13", "14"], correct: 1 },
        { question: "What is 25% of 80?", options: ["15", "20", "25", "30"], correct: 1 },
        { question: "Find: 7² + 3²", options: ["52", "58", "49", "40"], correct: 1 },
        { question: "What is √81?", options: ["8", "9", "10", "7"], correct: 1 }
      ]
    },
    { 
      id: 'daily_vocab', 
      subject: 'Vocabulary', 
      reward: 20, 
      completed: false, 
      streak: 0,
      icon: '📖',
      color: 'from-green-400 to-green-600',
      borderColor: 'border-green-300',
      questions: [
        { question: "What does 'ubiquitous' mean?", options: ["Rare", "Everywhere", "Hidden", "Colorful"], correct: 1 },
        { question: "Synonym for 'benevolent':", options: ["Hostile", "Kind", "Neutral", "Clever"], correct: 1 },
        { question: "What is an 'enigma'?", options: ["Answer", "Mystery", "Fact", "Story"], correct: 1 },
        { question: "'Ephemeral' means:", options: ["Eternal", "Heavy", "Brief", "Complex"], correct: 2 },
        { question: "Opposite of 'verbose':", options: ["Talkative", "Silent", "Concise", "Loud"], correct: 2 }
      ]
    },
    { 
      id: 'daily_science', 
      subject: 'Science Fact', 
      reward: 30, 
      completed: true, 
      streak: 8,
      icon: '🔬',
      color: 'from-purple-400 to-purple-600',
      borderColor: 'border-purple-300',
      questions: [
        { question: "What is the fastest land animal?", options: ["Lion", "Cheetah", "Horse", "Gazelle"], correct: 1 },
        { question: "How many bones are in an adult human body?", options: ["198", "206", "215", "220"], correct: 1 },
        { question: "What gas do plants absorb from the atmosphere?", options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"], correct: 2 },
        { question: "Which planet is known as the Red Planet?", options: ["Venus", "Jupiter", "Mars", "Saturn"], correct: 2 },
        { question: "What is the chemical symbol for gold?", options: ["Go", "Gd", "Au", "Ag"], correct: 2 }
      ]
    }
  ])

  const tabs = [
    { id: "daily", name: "Daily" },
    { id: "results", name: "Results" },
  ]

  const startChallenge = (challengeId: string) => {
    setActiveChallenge(challengeId)
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setScore(0)
    setShowResult(false)
    setShowCelebration(false)
  }

  const selectAnswer = (answerIndex: number) => {
    setSelectedAnswer(answerIndex)
  }

  const nextQuestion = () => {
    const challenge = dailyChallenges.find(c => c.id === activeChallenge)
    if (!challenge) return

    if (selectedAnswer === challenge.questions[currentQuestion].correct) {
      setScore(score + 1)
    }

    if (currentQuestion < challenge.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer(null)
    } else {
      // Quiz completed
      setShowResult(true)
      
      if (score >= 3) { // Passing score
        // Update challenge as completed
        setDailyChallenges(prev => 
          prev.map(c => 
            c.id === activeChallenge 
              ? { ...c, completed: true, streak: c.streak + 1 }
              : c
          )
        )
        
        // Add coins
        setUserCoins(prev => prev + challenge.reward)
        
        // Show celebration
        setTimeout(() => {
          setShowCelebration(true)
          setStreakAnimating(true)
          setTimeout(() => setStreakAnimating(false), 2000)
        }, 1000)
      }
    }
  }

  const closeChallenge = () => {
    setActiveChallenge(null)
    setShowCelebration(false)
  }

  const getCurrentChallenge = () => {
    return dailyChallenges.find(c => c.id === activeChallenge)
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Mobile Sidebar Toggle */}
      <div className="fixed top-4 left-4 z-50 md:hidden">
        <Button
          variant="outline"
          size="icon"
          className="bg-white"
          onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
        >
          {isMobileSidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-40 w-64 transform bg-white shadow-lg transition-transform duration-300 ease-in-out md:translate-x-0 ${
          isMobileSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } ${isSidebarCollapsed ? "md:w-20" : "md:w-64"}`}
      >
        {/* Logo */}
        <div className="flex h-16 items-center justify-between px-4 border-b">
          <Link href="/" className={`flex items-center ${isSidebarCollapsed ? "justify-center" : ""}`}>
            
            {!isSidebarCollapsed && (
              <div className="flex items-center">
                <span className="text-lg font-bold text-black">EduMe</span>
                <span className="text-lg font-bold text-black bg-black/10 px-1 py-0.5 rounded-md border border-black/20 ml-1">
                  AI
                </span>
              </div>
            )}
          </Link>
          <Button
            variant="ghost"
            size="icon"
            className="hidden md:flex"
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          >
            <ChevronRight className={`h-4 w-4 transition-transform duration-300 ${isSidebarCollapsed ? "rotate-180" : ""}`} />
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col h-[calc(100vh-4rem)] overflow-y-auto px-2 py-4">
          {/* MAIN Section */}
          <div className="mb-4">
            {!isSidebarCollapsed && (
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 mb-2">MAIN</h3>
            )}
            <div className="space-y-0.5">
              <Link
                href="/dashboard"
                className="flex items-center px-4 py-2.5 text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Home className="h-5 w-5" />
                {!isSidebarCollapsed && <span className="ml-3 font-medium">Dashboard</span>}
              </Link>
              <Link
                href="/dashboard/ai-tutoring"
                className="flex items-center px-4 py-2.5 text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Video className="h-5 w-5" />
                {!isSidebarCollapsed && <span className="ml-3 font-medium">AI Tutoring</span>}
              </Link>
              <Link
                href="/dashboard/career-guide"
                className="flex items-center px-4 py-2.5 text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <GraduationCap className="h-5 w-5" />
                {!isSidebarCollapsed && <span className="ml-3 font-medium">Career Guide</span>}
              </Link>
              
            </div>
          </div>

          {/* LEARNING Section */}
          <div className="mb-4">
            {!isSidebarCollapsed && (
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 mb-2">LEARNING</h3>
            )}
            <div className="space-y-0.5">
              <Link
                href="/dashboard/skill-hub"
                className="flex items-center px-4 py-2.5 text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Target className="h-5 w-5" />
                {!isSidebarCollapsed && <span className="ml-3 font-medium">Skill Hub</span>}
              </Link>
              <Link
                href="/dashboard/contests"
                className="flex items-center px-4 py-2.5 text-white bg-black rounded-lg transition-colors"
              >
                <Trophy className="h-5 w-5" />
                {!isSidebarCollapsed && <span className="ml-3 font-medium">Contests</span>}
              </Link>
            </div>
          </div>

          {/* ENGAGEMENT Section */}
          <div className="mb-4">
            {!isSidebarCollapsed && (
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 mb-2">ENGAGEMENT</h3>
            )}
            <div className="space-y-0.5">
              <Link
                href="/dashboard/leaderboard"
                className="flex items-center px-4 py-2.5 text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Trophy className="h-5 w-5" />
                {!isSidebarCollapsed && <span className="ml-3 font-medium">Leaderboard</span>}
              </Link>
              <Link
                href="/dashboard/rewards"
                className="flex items-center px-4 py-2.5 text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Award className="h-5 w-5" />
                {!isSidebarCollapsed && <span className="ml-3 font-medium">Rewards</span>}
              </Link>
            </div>
          </div>

          {/* SETTINGS Section */}
          <div className="mt-auto pt-4 border-t border-gray-200">
            {!isSidebarCollapsed && (
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 mb-2">SETTINGS</h3>
            )}
            <div className="space-y-0.5">
              <Link
                href="/dashboard/settings"
                className="flex items-center px-4 py-2.5 text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Settings className="h-5 w-5" />
                {!isSidebarCollapsed && <span className="ml-3 font-medium">Settings</span>}
              </Link>
              <Link
                href="/logout"
                className="flex items-center px-4 py-2.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <LogOut className="h-5 w-5" />
                {!isSidebarCollapsed && <span className="ml-3 font-medium">Logout</span>}
              </Link>
            </div>
          </div>
        </nav>
      </div>

      {/* Challenge Modal Overlay */}
      {activeChallenge && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {!showResult ? (
              <ChallengeQuiz 
                challenge={getCurrentChallenge()!}
                currentQuestion={currentQuestion}
                selectedAnswer={selectedAnswer}
                onSelectAnswer={selectAnswer}
                onNext={nextQuestion}
                onClose={closeChallenge}
              />
            ) : (
              <ChallengeResult 
                challenge={getCurrentChallenge()!}
                score={score}
                totalQuestions={getCurrentChallenge()!.questions.length}
                showCelebration={showCelebration}
                onClose={closeChallenge}
              />
            )}
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className={`flex-1 transition-all duration-300 ${isSidebarCollapsed ? "md:ml-20" : "md:ml-64"} pt-0`}>
        <div className="px-6 py-8">
          <div className="max-w-4xl mx-auto">
            {/* Tabs */}
            <div className="flex items-center justify-center space-x-0 mb-10">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  className={`px-6 py-3 text-sm font-medium transition-colors border-b-2 ${
                    activeTab === tab.id
                      ? "text-black border-black"
                      : "text-gray-400 border-transparent hover:text-gray-600"
                  }`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  {tab.name}
                </button>
              ))}
            </div>

            {/* Daily Challenges */}
            {activeTab === "daily" && (
              <div className="space-y-6">
                {/* Daily Challenge Header with Animated Streak */}
                <div className="border border-gray-200 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2 flex items-center gap-2">
                        <Flame className="h-6 w-6 text-orange-500" />
                        Daily Challenges
                      </h3>
                      <p className="text-sm text-gray-600">Complete daily challenges to maintain your streak</p>
                    </div>
                    <div className="text-right">
                      <div className={`border border-gray-200 rounded-lg p-3 transition-all duration-500 ${
                        streakAnimating ? 'scale-110 border-orange-300 bg-orange-50' : ''
                      }`}>
                        <p className="text-xs text-gray-500 mb-1">Current Streak</p>
                        <p className={`text-lg font-semibold text-gray-900 flex items-center gap-1 ${
                          streakAnimating ? 'text-orange-600' : ''
                        }`}>
                          {user.dailyStreak} days
                          {streakAnimating && <Sparkles className="h-4 w-4 text-orange-500" />}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {dailyChallenges.map((challenge) => (
                      <div 
                        key={challenge.id} 
                        className={`relative border rounded-xl p-5 transition-all duration-300 hover:shadow-lg cursor-pointer overflow-hidden ${
                          challenge.completed ? 'border-gray-300 bg-gray-50' : `${challenge.borderColor} hover:border-gray-400 bg-white`
                        }`}
                      >
                        {/* Ribbon for completed challenges */}
                        {challenge.completed && (
                          <div className="absolute -top-1 -right-1">
                            <div className="bg-gradient-to-r from-green-400 to-green-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                              ✓ DONE
                            </div>
                          </div>
                        )}
                        
                        {/* Challenge Icon & Gradient Background */}
                        <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${challenge.color} opacity-10 rounded-bl-full`}></div>
                        
                        <div className="relative z-10">
                        <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2">
                              <span className="text-2xl">{challenge.icon}</span>
                              <h4 className="font-semibold text-gray-900">{challenge.subject}</h4>
                            </div>
                            <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                              challenge.completed ? 'bg-green-500' : 'border-2 border-gray-300'
                            }`}>
                              {challenge.completed ? (
                                <Check className="h-4 w-4 text-white" />
                              ) : (
                                <Brain className="h-3 w-3 text-gray-400" />
                              )}
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                            <div className="flex items-center gap-1">
                              <Coins className="h-4 w-4 text-yellow-500" />
                              <span className="font-medium">+{challenge.reward} coins</span>
                        </div>
                            <div className="flex items-center gap-1">
                              <Flame className="h-4 w-4 text-orange-500" />
                          <span>{challenge.streak} day streak</span>
                        </div>
                          </div>
                          
                          {!challenge.completed ? (
                          <Button 
                              onClick={() => startChallenge(challenge.id)}
                              className={`w-full bg-gradient-to-r ${challenge.color} hover:opacity-90 text-white font-medium py-2.5 rounded-lg transition-all duration-300 flex items-center justify-center gap-2`}
                          >
                              <Zap className="h-4 w-4" />
                              Start Challenge
                          </Button>
                          ) : (
                            <div className="text-center py-2.5 text-green-600 font-medium">
                              🎉 Completed Today!
                            </div>
                        )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Streak Milestones */}
                <div className="border border-gray-200 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <Star className="h-5 w-5 text-yellow-500" />
                    Streak Milestones
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {[
                      { days: 7, reward: 100, name: 'Week Warrior', unlocked: user.dailyStreak >= 7, icon: '🗡️', color: 'from-blue-400 to-blue-600' },
                      { days: 15, reward: 250, name: 'Diamond Dedication', unlocked: user.dailyStreak >= 15, icon: '💎', color: 'from-purple-400 to-purple-600' },
                      { days: 30, reward: 500, name: 'Monthly Master', unlocked: user.dailyStreak >= 30, icon: '👑', color: 'from-yellow-400 to-orange-500' },
                      { days: 100, reward: 1000, name: 'Century Scholar', unlocked: user.dailyStreak >= 100, icon: '🏆', color: 'from-green-400 to-emerald-600' }
                    ].map((milestone) => (
                      <div key={milestone.days} className={`relative border rounded-xl p-4 transition-all duration-300 overflow-hidden ${
                        milestone.unlocked 
                          ? 'border-yellow-300 bg-gradient-to-br from-yellow-50 to-orange-50 shadow-lg transform hover:scale-105' 
                          : 'border-gray-200 hover:border-gray-300 bg-white hover:shadow-md'
                      }`}>
                        {/* Gradient Background */}
                        {milestone.unlocked && (
                          <div className={`absolute top-0 right-0 w-16 h-16 bg-gradient-to-br ${milestone.color} opacity-10 rounded-bl-full`}></div>
                        )}
                        
                        {/* Unlock Ribbon */}
                          {milestone.unlocked && (
                          <div className="absolute -top-1 -right-1">
                            <div className={`bg-gradient-to-r ${milestone.color} text-white text-xs font-bold px-2 py-1 rounded-bl-lg shadow-md`}>
                              ✓
                            </div>
                          </div>
                        )}
                        
                        <div className="text-center relative z-10">
                          <div className="text-3xl mb-2">{milestone.icon}</div>
                          <h5 className="font-semibold text-sm text-gray-900 mb-1">{milestone.name}</h5>
                          <p className="text-xs text-gray-500 mb-3">{milestone.days} day streak</p>
                          <div className="flex items-center justify-center gap-1 mb-3">
                            <Coins className="h-4 w-4 text-yellow-500" />
                            <span className="font-bold text-gray-900">+{milestone.reward}</span>
                          </div>
                          {milestone.unlocked ? (
                            <div className="inline-flex items-center gap-1 text-xs text-green-600 font-semibold bg-green-100 px-2 py-1 rounded-full">
                              <Check className="h-3 w-3" />
                              Unlocked
                            </div>
                          ) : (
                            <div className="text-xs text-gray-400 font-medium bg-gray-100 px-2 py-1 rounded-full">
                              {milestone.days - user.dailyStreak} days to go
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Weekly Leaderboard */}
                <div className="border border-gray-200 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <Trophy className="h-5 w-5 text-blue-500" />
                    This Week's Top Performers
                  </h4>
                  <div className="space-y-3">
                    {[
                      { rank: 1, name: 'Sarah K.', points: 2840, isYou: false },
                      { rank: 2, name: 'Mohammed A.', points: 2650, isYou: false },
                      { rank: 3, name: 'Adedeji', points: 2340, isYou: true },
                      { rank: 4, name: 'Fatima B.', points: 2180, isYou: false },
                      { rank: 5, name: 'David O.', points: 1950, isYou: false }
                    ].map((player) => (
                      <div key={player.rank} className={`flex items-center justify-between p-4 border rounded-xl transition-all duration-300 ${
                        player.isYou 
                          ? 'border-blue-300 bg-gradient-to-r from-blue-50 to-indigo-50 shadow-md transform hover:scale-[1.02]' 
                          : 'border-gray-200 hover:border-gray-300 bg-white hover:shadow-sm'
                      }`}>
                        <div className="flex items-center space-x-4">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                            player.rank === 1 ? 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-white shadow-lg' :
                            player.rank === 2 ? 'bg-gradient-to-r from-gray-400 to-gray-600 text-white shadow-md' :
                            player.rank === 3 ? 'bg-gradient-to-r from-orange-400 to-orange-600 text-white shadow-md' :
                            'bg-gradient-to-r from-gray-200 to-gray-300 text-gray-600'
                          }`}>
                            {player.rank <= 3 ? (
                              <span className="text-lg">
                                {player.rank === 1 ? '🥇' : player.rank === 2 ? '🥈' : '🥉'}
                              </span>
                            ) : (
                              player.rank
                            )}
                          </div>
                          <div>
                            <p className={`font-semibold ${player.isYou ? 'text-blue-700' : 'text-gray-900'}`}>
                              {player.name} {player.isYou && '(You)'}
                            </p>
                            {player.isYou && (
                              <p className="text-xs text-blue-600 flex items-center gap-1">
                                <Sparkles className="h-3 w-3" />
                                Keep climbing! 🚀
                              </p>
                            )}
                            {player.rank <= 3 && !player.isYou && (
                              <p className="text-xs text-gray-500">
                                {player.rank === 1 ? '🏆 Champion' : player.rank === 2 ? '⭐ Rising Star' : '🔥 Hot Streak'}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="text-right">
                          <p className={`font-bold text-lg ${player.isYou ? 'text-blue-700' : 'text-gray-900'}`}>
                            {player.points.toLocaleString()}
                          </p>
                          <p className="text-xs text-gray-500 flex items-center gap-1 justify-end">
                            <Coins className="h-3 w-3 text-yellow-500" />
                            points
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Motivational Message */}
                  <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl">
                    <div className="flex items-center gap-2 mb-2">
                      <Target className="h-5 w-5 text-blue-500" />
                      <span className="font-semibold text-blue-700">Your Goal</span>
                    </div>
                                         <p className="text-sm text-blue-600">
                       You're only <strong>{2650 - 2340} points</strong> away from 2nd place! 
                       Complete more challenges to climb the leaderboard! 🎯
                     </p>
                  </div>
                </div>
              </div>
            )}

            {/* Results & Achievements */}
            {activeTab === "results" && (
              <div className="space-y-6">
                {/* Achievement Badges */}
                <div className="border border-gray-200 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 flex items-center justify-center">
                        <Trophy className="h-6 w-6 text-white" />
                      </div>
                      <div>
                    <h3 className="text-xl font-semibold text-gray-900">Your Achievements</h3>
                        <p className="text-sm text-gray-600">Unlock badges by completing challenges</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 rounded-full">
                        <p className="text-xs font-medium">Level</p>
                        <p className="text-lg font-bold">{user.rank}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {user.badges.map((badge, index) => (
                      <div 
                        key={badge.id} 
                        className={`relative border rounded-xl p-4 text-center transition-all duration-300 overflow-hidden ${
                        badge.unlocked 
                            ? 'border-green-300 bg-gradient-to-br from-green-50 to-emerald-50 shadow-lg hover:shadow-xl transform hover:scale-105' 
                            : 'border-gray-200 opacity-60 hover:opacity-80 hover:border-gray-300 bg-white'
                        }`}
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        {/* Unlock Ribbon */}
                        {badge.unlocked && (
                          <div className="absolute -top-1 -right-1">
                            <div className="bg-gradient-to-r from-green-400 to-emerald-600 text-white text-xs font-bold px-2 py-1 rounded-bl-lg shadow-md animate-pulse">
                              ✓
                            </div>
                          </div>
                        )}
                        
                        {/* Badge Glow Effect */}
                        {badge.unlocked && (
                          <div className="absolute inset-0 bg-gradient-to-r from-green-400/10 to-emerald-400/10 rounded-xl"></div>
                        )}
                        
                        <div className="relative z-10">
                          <div className={`text-3xl mb-3 transition-transform duration-300 ${
                            badge.unlocked ? 'animate-bounce' : 'grayscale'
                          }`}>
                            {badge.icon}
                          </div>
                          <h4 className={`font-semibold text-sm mb-2 ${
                            badge.unlocked ? 'text-green-700' : 'text-gray-400'
                          }`}>
                            {badge.name}
                          </h4>
                          <p className={`text-xs mb-3 ${
                            badge.unlocked ? 'text-gray-600' : 'text-gray-400'
                          }`}>
                            {badge.description}
                          </p>
                          {badge.unlocked ? (
                            <div className="inline-flex items-center gap-1 bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-semibold">
                              <Sparkles className="h-3 w-3" />
                              Unlocked
                            </div>
                          ) : (
                            <div className="inline-flex items-center gap-1 bg-gray-100 text-gray-500 px-2 py-1 rounded-full text-xs">
                              <Clock className="h-3 w-3" />
                              Locked
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Next Badge Progress */}
                  <div className="mt-6 p-5 border border-orange-200 rounded-xl bg-gradient-to-r from-orange-50 to-yellow-50">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-orange-400 to-yellow-500 flex items-center justify-center">
                        <Target className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-orange-700">Next Milestone: Academic Warrior 🛡️</h4>
                        <p className="text-sm text-orange-600">Almost there! Keep pushing forward</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-medium text-orange-700">Progress</span>
                      <span className="text-sm font-bold text-orange-700">{user.contestsCompleted}/25 contests</span>
                    </div>
                    
                    <div className="w-full bg-orange-200 rounded-full h-3 mb-3">
                      <div 
                        className="bg-gradient-to-r from-orange-400 to-yellow-500 h-3 rounded-full transition-all duration-1000 shadow-sm relative overflow-hidden"
                        style={{ width: `${(user.contestsCompleted / 25) * 100}%` }}
                      >
                        <div className="absolute inset-0 bg-white/30 animate-pulse"></div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-orange-600 font-medium">
                        🎯 Only <strong>{25 - user.contestsCompleted} contests</strong> to go!
                      </p>
                      <div className="text-xs text-orange-600">
                        {Math.round((user.contestsCompleted / 25) * 100)}% Complete
                      </div>
                    </div>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="relative border border-yellow-200 rounded-xl p-6 text-center hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-yellow-50 to-orange-50 overflow-hidden group">
                    <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-yellow-400/20 to-orange-400/20 rounded-bl-full"></div>
                    <div className="relative z-10">
                      <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <Trophy className="h-6 w-6 text-white" />
                      </div>
                      <h3 className="text-sm font-medium text-yellow-700 mb-1">Contests Won</h3>
                      <p className="text-3xl font-bold text-yellow-800 mb-1">{user.contestsWon}</p>
                      <div className="text-xs text-yellow-600 flex items-center justify-center gap-1">
                        <Sparkles className="h-3 w-3" />
                        Champion Level
                      </div>
                    </div>
                  </div>
                  
                  <div className="relative border border-green-200 rounded-xl p-6 text-center hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-green-50 to-emerald-50 overflow-hidden group">
                    <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-green-400/20 to-emerald-400/20 rounded-bl-full"></div>
                    <div className="relative z-10">
                      <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <Coins className="h-6 w-6 text-white" />
                      </div>
                      <h3 className="text-sm font-medium text-green-700 mb-1">Total Earnings</h3>
                      <p className="text-3xl font-bold text-green-800 mb-1">{user.totalEarnings.toLocaleString()}</p>
                      <div className="text-xs text-green-600 flex items-center justify-center gap-1">
                        <Star className="h-3 w-3" />
                        Coins Earned
                      </div>
                    </div>
                  </div>
                  
                  <div className="relative border border-red-200 rounded-xl p-6 text-center hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-red-50 to-orange-50 overflow-hidden group">
                    <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-red-400/20 to-orange-400/20 rounded-bl-full"></div>
                    <div className="relative z-10">
                      <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-gradient-to-r from-red-400 to-orange-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <Flame className="h-6 w-6 text-white animate-pulse" />
                      </div>
                      <h3 className="text-sm font-medium text-red-700 mb-1">Win Streak</h3>
                      <p className="text-3xl font-bold text-red-800 mb-1">{user.winStreak}</p>
                      <div className="text-xs text-red-600 flex items-center justify-center gap-1">
                        <Zap className="h-3 w-3" />
                        On Fire!
                      </div>
                    </div>
                  </div>
                  
                  <div className="relative border border-blue-200 rounded-xl p-6 text-center hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-blue-50 to-indigo-50 overflow-hidden group">
                    <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-blue-400/20 to-indigo-400/20 rounded-bl-full"></div>
                    <div className="relative z-10">
                      <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-gradient-to-r from-blue-400 to-indigo-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <BarChart3 className="h-6 w-6 text-white" />
                      </div>
                      <h3 className="text-sm font-medium text-blue-700 mb-1">Avg. Rank</h3>
                      <p className="text-3xl font-bold text-blue-800 mb-1">4.2</p>
                      <div className="text-xs text-blue-600 flex items-center justify-center gap-1">
                        <Target className="h-3 w-3" />
                        Top Performer
                      </div>
                    </div>
                  </div>
                </div>

                {/* Recent Results */}
                <div className="border border-gray-200 rounded-lg p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-400 to-pink-500 flex items-center justify-center">
                      <Clock className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900">Recent Contest Results</h4>
                      <p className="text-sm text-gray-600">Your latest performance highlights</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    {pastContests.map((contest, index) => (
                      <div 
                        key={contest.id} 
                        className={`relative border rounded-xl p-5 transition-all duration-300 hover:shadow-lg overflow-hidden ${
                          contest.result === 'Winner' 
                            ? 'border-yellow-300 bg-gradient-to-r from-yellow-50 to-orange-50' 
                            : 'border-gray-200 hover:border-gray-300 bg-white'
                        }`}
                        style={{ animationDelay: `${index * 150}ms` }}
                      >
                        {/* Winner Ribbon */}
                        {contest.result === 'Winner' && (
                          <div className="absolute -top-1 -right-1">
                            <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg shadow-md">
                              🏆 WINNER
                            </div>
                          </div>
                        )}
                        
                        {/* Gradient Background */}
                        {contest.result === 'Winner' && (
                          <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-yellow-400/20 to-orange-400/20 rounded-bl-full"></div>
                        )}
                        
                        <div className="flex items-center justify-between relative z-10">
                          <div className="flex items-center space-x-4">
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center shadow-md ${
                              contest.result === 'Winner' 
                                ? 'bg-gradient-to-r from-yellow-400 to-orange-500' 
                                : 'bg-gradient-to-r from-gray-300 to-gray-400'
                            }`}>
                              {contest.result === 'Winner' ? (
                                <Crown className="h-6 w-6 text-white animate-pulse" />
                              ) : (
                                <Medal className="h-6 w-6 text-white" />
                              )}
                            </div>
                            <div>
                              <h5 className={`font-semibold text-lg ${
                                contest.result === 'Winner' ? 'text-yellow-700' : 'text-gray-900'
                              }`}>
                                {contest.title}
                              </h5>
                              <div className="flex items-center space-x-3 text-sm text-gray-600 mt-1">
                                <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold ${
                                  contest.result === 'Winner' 
                                    ? 'bg-yellow-100 text-yellow-700' 
                                    : 'bg-blue-100 text-blue-700'
                                }`}>
                                  {contest.result === 'Winner' ? (
                                    <Star className="h-3 w-3" />
                                  ) : (
                                    <Trophy className="h-3 w-3" />
                                  )}
                                  {contest.result}
                                </div>
                                <span className="flex items-center gap-1">
                                  <BarChart3 className="h-3 w-3" />
                                  {contest.participants} participants
                                </span>
                                <span className="flex items-center gap-1">
                                  <Clock className="h-3 w-3" />
                                  {contest.date}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg ${
                              contest.result === 'Winner'
                                ? 'bg-yellow-100 text-yellow-700'
                                : 'bg-gray-100 text-gray-700'
                            }`}>
                              <Coins className="h-4 w-4" />
                              <span className="font-bold">+{contest.xpEarned}</span>
                            </div>
                            <div className="mt-2 flex items-center justify-end gap-1">
                              <span className={`text-sm font-medium ${
                                contest.rank <= 3 ? 'text-yellow-600' : 'text-gray-600'
                              }`}>
                                Rank #{contest.rank}
                              </span>
                              {contest.rank <= 3 && (
                                <span className="text-lg">
                                  {contest.rank === 1 ? '🥇' : contest.rank === 2 ? '🥈' : '🥉'}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* View More Button */}
                  <div className="mt-6 text-center">
                    <Button 
                      variant="outline" 
                      className="border-gray-300 hover:border-gray-400 hover:bg-gray-50 transition-colors"
                    >
                      <History className="h-4 w-4 mr-2" />
                      View All Contest History
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}

// Challenge Quiz Component
function ChallengeQuiz({ 
  challenge, 
  currentQuestion, 
  selectedAnswer, 
  onSelectAnswer, 
  onNext, 
  onClose 
}: {
  challenge: any
  currentQuestion: number
  selectedAnswer: number | null
  onSelectAnswer: (index: number) => void
  onNext: () => void
  onClose: () => void
}) {
  const question = challenge.questions[currentQuestion]
  const progress = ((currentQuestion + 1) / challenge.questions.length) * 100

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${challenge.color} flex items-center justify-center`}>
            <span className="text-xl">{challenge.icon}</span>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{challenge.subject} Challenge</h3>
            <p className="text-sm text-gray-500">Question {currentQuestion + 1} of {challenge.questions.length}</p>
          </div>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-5 w-5" />
        </Button>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-600">Progress</span>
          <span className="text-sm font-medium text-gray-600">{Math.round(progress)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className={`bg-gradient-to-r ${challenge.color} h-2 rounded-full transition-all duration-500`}
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      {/* Question */}
      <div className="mb-8">
        <h4 className="text-xl font-semibold text-gray-900 mb-6">{question.question}</h4>
        <div className="space-y-3">
          {question.options.map((option: string, index: number) => (
            <button
              key={index}
              onClick={() => onSelectAnswer(index)}
              className={`w-full p-4 text-left border rounded-xl transition-all duration-200 ${
                selectedAnswer === index
                  ? `border-blue-300 bg-blue-50 shadow-md`
                  : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                  selectedAnswer === index
                    ? 'border-blue-500 bg-blue-500'
                    : 'border-gray-300'
                }`}>
                  {selectedAnswer === index && <Check className="h-4 w-4 text-white" />}
                </div>
                <span className="font-medium text-gray-900">{option}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Next Button */}
      <div className="flex justify-end">
        <Button
          onClick={onNext}
          disabled={selectedAnswer === null}
          className={`px-8 py-3 bg-gradient-to-r ${challenge.color} hover:opacity-90 text-white font-medium rounded-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2`}
        >
          {currentQuestion === challenge.questions.length - 1 ? 'Finish' : 'Next'}
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}

// Challenge Result Component
function ChallengeResult({ 
  challenge, 
  score, 
  totalQuestions, 
  showCelebration, 
  onClose 
}: {
  challenge: any
  score: number
  totalQuestions: number
  showCelebration: boolean
  onClose: () => void
}) {
  const percentage = Math.round((score / totalQuestions) * 100)
  const passed = score >= 3
  
  return (
    <div className="p-6 text-center">
      {/* Celebration Animation */}
      {showCelebration && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="relative w-full h-full">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute text-2xl animate-bounce"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2}s`,
                  animationDuration: `${1 + Math.random()}s`
                }}
              >
                {['🎉', '✨', '🎊', '⭐', '🔥'][Math.floor(Math.random() * 5)]}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Header */}
      <div className="mb-6">
        <div className={`w-20 h-20 mx-auto rounded-full bg-gradient-to-r ${challenge.color} flex items-center justify-center mb-4`}>
          {passed ? (
            <Trophy className="h-10 w-10 text-white" />
          ) : (
            <span className="text-3xl">{challenge.icon}</span>
          )}
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          {passed ? '🎉 Congratulations!' : '💪 Keep Trying!'}
        </h3>
        <p className="text-gray-600">
          {passed 
            ? `You've completed the ${challenge.subject} challenge!`
            : `You got ${score} out of ${totalQuestions} correct. Try again tomorrow!`
          }
        </p>
      </div>

      {/* Score */}
      <div className="mb-6">
        <div className={`inline-flex items-center gap-2 px-6 py-3 rounded-full ${
          passed ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
        }`}>
          <span className="text-lg font-bold">{score}/{totalQuestions}</span>
          <span className="text-sm">({percentage}%)</span>
        </div>
      </div>

      {/* Rewards */}
      {passed && (
        <div className="mb-6 p-4 border border-green-200 rounded-xl bg-green-50">
          <h4 className="font-semibold text-green-800 mb-2">Rewards Earned!</h4>
          <div className="flex items-center justify-center gap-4">
            <div className="flex items-center gap-2">
              <Coins className="h-5 w-5 text-yellow-500" />
              <span className="font-medium text-green-700">+{challenge.reward} coins</span>
            </div>
            <div className="flex items-center gap-2">
              <Flame className="h-5 w-5 text-orange-500" />
              <span className="font-medium text-green-700">Streak +1</span>
            </div>
          </div>
        </div>
      )}

      {/* Action Button */}
      <Button
        onClick={onClose}
        className="px-8 py-3 bg-gray-900 hover:bg-gray-800 text-white font-medium rounded-lg"
      >
        {passed ? 'Awesome!' : 'Got it'}
      </Button>
    </div>
  )
} 