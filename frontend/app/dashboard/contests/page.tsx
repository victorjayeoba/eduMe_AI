"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Check } from "lucide-react"
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
  BellIcon,
  Search,
  MessageSquare,
  TrendingUp,
  Clock,
  Calendar,
  MoreVertical,
  Filter,
  Menu,
  X,
  RefreshCw,
  Plus,
  Trophy,
  Zap,
  Star,
  Users,
  Timer,
  Crown,
  Flame,
  CheckCircle2,
  AlertCircle,
  Play,
  Gift,
  BarChart3,
  Coins,
  TrendingDown,
  Eye,
  Heart,
  Share2,
  ArrowUp,
  Sparkles,
  DollarSign,
  Medal,
  ChevronUp,
  Brain,
  Code,
  Book,
  FlaskConical,
  Lightbulb,
  Globe
} from "lucide-react"

export default function Contests() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("active")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)

  // Enhanced user data with academic progress
  const user = {
    name: "Adedeji",
    xp: 1250,
    coins: 450,
    avatar: "/placeholder-user.jpg",
    contestsWon: 8,
    contestsCompleted: 23, // Total contests attempted
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

  // Contest categories - Icon focused
  const categories = [
    { id: "all", name: "All", icon: <Trophy className="h-4 w-4" /> },
    { id: "math", name: "Math", icon: <Brain className="h-4 w-4" /> },
    { id: "science", name: "Science", icon: <FlaskConical className="h-4 w-4" /> },
    { id: "programming", name: "Code", icon: <Code className="h-4 w-4" /> },
    { id: "language", name: "Language", icon: <Globe className="h-4 w-4" /> },
    { id: "general", name: "General", icon: <Lightbulb className="h-4 w-4" /> }
  ]

  // Enhanced academic contests with educational focus
  const activeContests = [
    {
      id: 1,
      title: "🧮 Advanced Calculus Championship",
      description: "Master derivatives, integrals, and limits in this comprehensive calculus challenge",
      academicSubject: "Calculus & Analysis",
      topics: ["Derivatives", "Integrals", "Limits", "Series"],
      questionCount: 25,
      duration: "45 minutes",
      entryCost: 50,
      basePrizePool: 500,
      currentPrizePool: 680,
      participants: 45,
      maxParticipants: 100,
      timeLeft: "2 days",
      difficulty: "Advanced",
      category: "math",
      status: "active",
      trending: true,
      multiplier: "4.2x",
      topPrize: 250,
      academicPoints: 150,
      prerequisite: "Pre-Calculus",
      skillLevel: "University Level",
      live: true,
      viewerCount: 128,
      route: "/contest/calculus-championship-1"
    },
    {
      id: 2,
      title: "🧪 Organic Chemistry Mastery",
      description: "Dive deep into molecular structures, reactions, and mechanisms",
      academicSubject: "Organic Chemistry",
      topics: ["Molecular Structure", "Reaction Mechanisms", "Stereochemistry", "Synthesis"],
      questionCount: 30,
      duration: "60 minutes",
      entryCost: 25,
      basePrizePool: 200,
      currentPrizePool: 340,
      participants: 32,
      maxParticipants: 80,
      timeLeft: "5 days",
      difficulty: "Intermediate",
      category: "science",
      status: "active",
      trending: false,
      multiplier: "3.8x",
      topPrize: 120,
      academicPoints: 100,
      prerequisite: "General Chemistry",
      skillLevel: "High School/College",
      live: false,
      viewerCount: 89,
      route: "/contest/organic-chemistry-mastery-2"
    },
    {
      id: 3,
      title: "💻 Data Structures & Algorithms",
      description: "Master arrays, trees, graphs, sorting, and searching algorithms",
      academicSubject: "Computer Science",
      topics: ["Arrays & Linked Lists", "Trees & Graphs", "Sorting Algorithms", "Dynamic Programming"],
      questionCount: 20,
      duration: "90 minutes",
      entryCost: 75,
      basePrizePool: 750,
      currentPrizePool: 1050,
      participants: 28,
      maxParticipants: 50,
      timeLeft: "1 day",
      difficulty: "Expert",
      category: "programming",
      status: "active",
      trending: true,
      multiplier: "5.6x",
      topPrize: 450,
      academicPoints: 200,
      prerequisite: "Programming Fundamentals",
      skillLevel: "University Level",
      live: true,
      viewerCount: 234,
      route: "/contest/data-structures-algorithms-3"
    },
    {
      id: 4,
      title: "📚 English Literature Analysis",
      description: "Analyze classic works from Shakespeare to modern poetry",
      academicSubject: "English Literature",
      topics: ["Poetry Analysis", "Character Development", "Themes & Symbols", "Historical Context"],
      questionCount: 35,
      duration: "75 minutes",
      entryCost: 30,
      basePrizePool: 300,
      currentPrizePool: 420,
      participants: 67,
      maxParticipants: 120,
      timeLeft: "3 days",
      difficulty: "Intermediate",
      category: "language",
      status: "active",
      trending: false,
      multiplier: "3.2x",
      topPrize: 180,
      academicPoints: 120,
      prerequisite: "Basic Literature",
      skillLevel: "High School Level",
      live: false,
      viewerCount: 156,
      route: "/contest/literature-analysis-4"
    },
    {
      id: 5,
      title: "🧬 Advanced Biology: Genetics",
      description: "Explore DNA, RNA, inheritance patterns, and genetic engineering",
      academicSubject: "Molecular Biology",
      topics: ["DNA Replication", "Gene Expression", "Inheritance", "Biotechnology"],
      questionCount: 40,
      duration: "50 minutes",
      entryCost: 40,
      basePrizePool: 400,
      currentPrizePool: 520,
      participants: 38,
      maxParticipants: 75,
      timeLeft: "6 hours",
      difficulty: "Advanced",
      category: "science",
      status: "active",
      trending: true,
      multiplier: "4.1x",
      topPrize: 200,
      academicPoints: 140,
      prerequisite: "General Biology",
      skillLevel: "University Level",
      live: true,
      viewerCount: 89,
      route: "/contest/advanced-genetics-5"
    }
  ]

  // Sample upcoming contests
  const upcomingContests = [
    {
      id: 4,
      title: "Literature Analysis Battle",
      description: "Analyze classic literature and compete with fellow readers",
      entryCost: 50,
      prizePool: 200,
      startDate: "Tomorrow",
      difficulty: "Beginner",
      category: "Literature",
      status: "upcoming"
    },
    {
      id: 5,
      title: "History Timeline Challenge",
      description: "Test your knowledge of world history and historical events",
      entryCost: 80,
      prizePool: 400,
      startDate: "Next Week",
      difficulty: "Intermediate",
      category: "History",
      status: "upcoming"
    }
  ]

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

  // Daily challenges to make it addictive
  const dailyChallenges = [
    { id: 'daily_math', subject: 'Quick Math', reward: 25, completed: true, streak: 15 },
    { id: 'daily_vocab', subject: 'Vocabulary', reward: 20, completed: false, streak: 0 },
    { id: 'daily_science', subject: 'Science Fact', reward: 30, completed: true, streak: 8 }
  ]

  const tabs = [
    { id: "active", name: "Live", icon: <Flame className="h-4 w-4" /> },
    { id: "daily", name: "Daily", icon: <Star className="h-4 w-4" /> },
    { id: "upcoming", name: "Soon", icon: <Clock className="h-4 w-4" /> },
    { id: "results", name: "Results", icon: <Trophy className="h-4 w-4" /> },
  ]

  // Navigation function for contest routing
  const handleContestClick = (contest: any) => {
    // In a real app, this would use Next.js router
    console.log(`Navigating to ${contest.route}`)
    // router.push(contest.route)
    
    // For demo, show alert with contest details
    alert(`Entering: ${contest.title}\n\nSubject: ${contest.academicSubject}\nDuration: ${contest.duration}\nQuestions: ${contest.questionCount}\nEntry Fee: ${contest.entryCost} coins\n\nClick OK to start the contest!`)
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
              <Link
                href="/dashboard/exam-prep"
                className="flex items-center px-4 py-2.5 text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <BookOpen className="h-5 w-5" />
                {!isSidebarCollapsed && <span className="ml-3 font-medium">Exam Prep</span>}
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
              {/* <Link
                href="/dashboard/resources"
                className="flex items-center px-4 py-2.5 text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <BookOpen className="h-5 w-5" />
                {!isSidebarCollapsed && <span className="ml-3 font-medium">Resources</span>}
              </Link> */}
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

      {/* Main Content */}
      <main className={`flex-1 transition-all duration-300 ${isSidebarCollapsed ? "md:ml-20" : "md:ml-64"} pt-0`}>
        <div className="px-4 py-6 md:px-6">
          <div className="max-w-6xl mx-auto space-y-8">
            {/* Minimal Header - Icons Only */}
            <div className="flex items-center justify-between mb-8">
              {/* Visual Stats Only */}
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2">
                  <Coins className="h-5 w-5 text-gray-400" />
                  <span className="font-semibold text-xl text-gray-900">{user.coins}</span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Trophy className="h-5 w-5 text-gray-400" />
                  <span className="font-semibold text-xl text-gray-900">{user.contestsWon}</span>
                </div>
              </div>
              
              <Button className="bg-black hover:bg-gray-800 text-white">
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            {/* Icon-Based Category Filter */}
            <div className="flex items-center justify-center space-x-2 mb-8">
              {categories.map((category) => (
                <button
                  key={category.id}
                  className={`p-3 rounded-lg transition-all ${
                    selectedCategory === category.id 
                      ? "bg-black text-white" 
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                  onClick={() => setSelectedCategory(category.id)}
                  title={category.name}
                >
                  {category.icon}
                </button>
              ))}
            </div>

            {/* Visual Tabs with Icons */}
            <div className="flex items-center justify-center space-x-1 mb-8">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                    activeTab === tab.id
                      ? "bg-black text-white"
                      : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                  }`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  {tab.icon}
                  <span className="text-sm font-medium">{tab.name}</span>
                </button>
              ))}
            </div>

            {/* Visual Live Indicator */}
            {activeTab === "active" && (
              <div className="flex items-center justify-center space-x-8 mb-6">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-lg font-semibold text-gray-900">
                    {activeContests.reduce((acc, contest) => acc + contest.participants, 0)}
                  </span>
                  <Users className="h-4 w-4 text-gray-400" />
                </div>
                
                <div className="flex items-center space-x-2">
                  <span className="text-lg font-semibold text-gray-900">
                    {activeContests.reduce((acc, contest) => acc + contest.currentPrizePool, 0)}
                  </span>
                  <Coins className="h-4 w-4 text-gray-400" />
                </div>
              </div>
            )}

            {/* Enhanced Active Contests */}
            {activeTab === "active" && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {activeContests
                  .filter(contest => selectedCategory === "all" || contest.category === selectedCategory)
                  .map((contest) => (
                  <Card 
                    key={contest.id} 
                    className="group overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-[1.02] cursor-pointer"
                    onMouseEnter={() => setHoveredCard(contest.id)}
                    onMouseLeave={() => setHoveredCard(null)}
                  >
                    {/* Simplified Contest Header */}
                    <div className="bg-gray-900 p-6">
                      {/* Status and Prize */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex space-x-2">
                          {contest.live && (
                            <span className="bg-white text-gray-900 px-2 py-1 rounded text-xs font-medium">
                              LIVE
                            </span>
                          )}
                          {contest.trending && (
                            <span className="bg-gray-700 text-white px-2 py-1 rounded text-xs font-medium">
                              TRENDING
                            </span>
                          )}
                        </div>
                        <div className="text-right">
                          <p className="text-gray-400 text-xs">Prize Pool</p>
                          <p className="text-white font-bold">{contest.currentPrizePool}</p>
                        </div>
                      </div>

                      {/* Contest Title */}
                      <h3 className="text-white font-bold text-lg mb-2">{contest.title}</h3>
                      <div className="flex items-center space-x-4 text-gray-400 text-sm">
                        <span>{contest.participants}/{contest.maxParticipants} participants</span>
                        <span>{contest.viewerCount} watching</span>
                      </div>
                    </div>

                    <CardContent className="p-6 bg-white">
                      {/* Simplified Subject Info */}
                      <div className="mb-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-semibold text-gray-900">{contest.academicSubject}</span>
                          <span className="text-xs text-gray-500">{contest.skillLevel}</span>
                        </div>
                        <p className="text-gray-600 text-sm mb-2">{contest.description}</p>
                      </div>

                      {/* Simplified Contest Details */}
                      <div className="grid grid-cols-3 gap-4 mb-4">
                        <div className="text-center">
                          <p className="text-xs text-gray-500 mb-1">Questions</p>
                          <p className="font-bold text-gray-900">{contest.questionCount}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-xs text-gray-500 mb-1">Duration</p>
                          <p className="font-bold text-gray-900">{contest.duration}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-xs text-gray-500 mb-1">Entry Fee</p>
                          <p className="font-bold text-gray-900">{contest.entryCost}</p>
                        </div>
                      </div>
                      {/* Progress Bar */}
                      <div className="mb-4">
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-gray-500">Participants</span>
                          <span className="font-medium text-gray-900">{contest.participants}/{contest.maxParticipants}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-1">
                          <div 
                            className="bg-black h-1 rounded-full transition-all duration-1000"
                            style={{ width: `${(contest.participants / contest.maxParticipants) * 100}%` }}
                          ></div>
                        </div>
                      </div>

                      {/* Simple Info Row */}
                      <div className="flex items-center justify-between mb-4 text-sm">
                        <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                          {contest.difficulty}
                        </span>
                        <span className="text-gray-600">{contest.timeLeft} left</span>
                      </div>

                      {/* Simplified Action Button */}
                      <Button 
                        onClick={() => handleContestClick(contest)}
                        className={`w-full font-medium ${
                          user.coins >= contest.entryCost
                            ? 'bg-black hover:bg-gray-800 text-white'
                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        }`}
                        disabled={user.coins < contest.entryCost}
                      >
                        {user.coins >= contest.entryCost ? 'Enter Contest' : 'Insufficient Coins'}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {/* Daily Challenges - Addictive Feature */}
            {activeTab === "daily" && (
              <div className="space-y-6">
                {/* Daily Challenge Header */}
                <div className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 rounded-2xl p-6 text-white">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-bold flex items-center">
                        🔥 Daily Challenges
                      </h3>
                      <p className="opacity-90">Keep your streak alive! Complete daily challenges to earn bonus rewards.</p>
                    </div>
                    <div className="text-right">
                      <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3">
                        <p className="text-xs opacity-80">Current Streak</p>
                        <p className="text-2xl font-bold">{user.dailyStreak} days</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {dailyChallenges.map((challenge) => (
                      <div key={challenge.id} className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-semibold">{challenge.subject}</h4>
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                            challenge.completed ? 'bg-green-400' : 'bg-white/20'
                          }`}>
                            {challenge.completed ? <Check className="h-4 w-4 text-white" /> : <Clock className="h-4 w-4" />}
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm opacity-80">+{challenge.reward} coins</span>
                          <div className="flex items-center text-sm">
                            <Flame className="h-4 w-4 mr-1" />
                            {challenge.streak} streak
                          </div>
                        </div>
                        {!challenge.completed && (
                          <Button 
                            size="sm" 
                            className="w-full mt-3 bg-white/20 hover:bg-white/30 border-0"
                          >
                            Start Challenge
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Streak Rewards */}
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Medal className="h-5 w-5 mr-2" />
                      Streak Milestones & Rewards
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      {[
                        { days: 7, reward: 100, badge: '🔥', name: 'Week Warrior', unlocked: user.dailyStreak >= 7 },
                        { days: 15, reward: 250, badge: '💎', name: 'Diamond Dedication', unlocked: user.dailyStreak >= 15 },
                        { days: 30, reward: 500, badge: '👑', name: 'Monthly Master', unlocked: user.dailyStreak >= 30 },
                        { days: 100, reward: 1000, badge: '🏆', name: 'Century Scholar', unlocked: user.dailyStreak >= 100 }
                      ].map((milestone) => (
                        <div key={milestone.days} className={`p-4 rounded-xl border-2 transition-all ${
                          milestone.unlocked 
                            ? 'border-green-200 bg-green-50' 
                            : user.dailyStreak >= milestone.days - 3 
                              ? 'border-yellow-200 bg-yellow-50' 
                              : 'border-gray-200 bg-gray-50'
                        }`}>
                          <div className="text-center">
                            <div className="text-3xl mb-2">{milestone.badge}</div>
                            <h4 className="font-semibold text-sm">{milestone.name}</h4>
                            <p className="text-xs text-gray-500 mb-2">{milestone.days} day streak</p>
                            <p className="font-bold text-green-600">+{milestone.reward} coins</p>
                            {milestone.unlocked && (
                              <div className="mt-2 text-xs text-green-600 font-medium">✓ UNLOCKED</div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Weekly Leaderboard */}
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <TrendingUp className="h-5 w-5 mr-2" />
                      This Week's Top Performers
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {[
                        { rank: 1, name: 'Sarah K.', points: 2840, badge: '👑' },
                        { rank: 2, name: 'Mohammed A.', points: 2650, badge: '🥈' },
                        { rank: 3, name: 'Adedeji (You)', points: 2340, badge: '🥉' },
                        { rank: 4, name: 'Fatima B.', points: 2180, badge: '⭐' },
                        { rank: 5, name: 'David O.', points: 1950, badge: '⭐' }
                      ].map((player) => (
                        <div key={player.rank} className={`flex items-center justify-between p-3 rounded-lg ${
                          player.name.includes('(You)') ? 'bg-blue-50 border border-blue-200' : 'bg-gray-50'
                        }`}>
                          <div className="flex items-center space-x-3">
                            <div className="text-lg">{player.badge}</div>
                            <div>
                              <p className="font-medium">{player.name}</p>
                              <p className="text-sm text-gray-500">Rank #{player.rank}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-blue-600">{player.points}</p>
                            <p className="text-xs text-gray-500">points</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Upcoming Contests */}
            {activeTab === "upcoming" && (
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {upcomingContests.map((contest) => (
                  <Card key={contest.id} className="overflow-hidden border-0 shadow-sm hover:shadow-md transition-all duration-300">
                    <div className="relative h-48 bg-gradient-to-br from-gray-400 to-gray-600">
                      <div className="absolute inset-0 bg-black/20"></div>
                      <div className="absolute top-4 right-4">
                        <div className="bg-gray-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                          Coming Soon
                        </div>
                      </div>
                      <div className="absolute bottom-4 left-4 right-4">
                        <h3 className="text-white font-bold text-lg mb-1">{contest.title}</h3>
                        <p className="text-white/90 text-sm">{contest.description}</p>
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center">
                          <div className="bg-gray-100 p-2 rounded-lg mr-3">
                            <Gift className="h-5 w-5 text-gray-600" />
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Prize Pool</p>
                            <p className="font-bold text-lg">{contest.prizePool} XP</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-500">Entry Cost</p>
                          <p className="font-bold text-lg text-red-600">{contest.entryCost} XP</p>
                        </div>
                      </div>
                      
                      <div className="space-y-3 mb-4">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-500">Starts</span>
                          <span className="font-medium">{contest.startDate}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-500">Difficulty</span>
                          <span className={`font-medium px-2 py-1 rounded-full text-xs ${
                            contest.difficulty === 'Beginner' ? 'bg-green-100 text-green-700' :
                            contest.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-700' :
                            'bg-red-100 text-red-700'
                          }`}>
                            {contest.difficulty}
                          </span>
                        </div>
                      </div>

                      <Button 
                        variant="outline"
                        className="w-full"
                        disabled
                      >
                        <Clock className="h-4 w-4 mr-2" />
                        Coming Soon
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {/* Enhanced Results & Achievements */}
            {activeTab === "results" && (
              <div className="space-y-8">
                {/* Achievement Badges */}
                <div className="bg-gradient-to-r from-purple-900 via-blue-900 to-indigo-900 rounded-2xl p-8 text-white">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-bold flex items-center">
                      <Sparkles className="h-6 w-6 mr-2" />
                      Your Achievements
                    </h3>
                    <div className="text-sm opacity-80">Level: {user.rank}</div>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {user.badges.map((badge) => (
                      <div key={badge.id} className={`backdrop-blur-sm rounded-xl p-4 text-center transition-all ${
                        badge.unlocked 
                          ? 'bg-white/20 border border-white/30' 
                          : 'bg-white/5 border border-white/10 opacity-50'
                      }`}>
                        <div className="text-2xl mb-2">{badge.icon}</div>
                        <p className="text-xs opacity-80 mb-1">{badge.name}</p>
                        <p className="font-bold text-xs">{badge.description}</p>
                        {badge.unlocked && (
                          <div className="mt-2 text-xs text-green-400 font-medium">✓ UNLOCKED</div>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Next Badge Progress */}
                  <div className="mt-6 p-4 bg-white/10 rounded-xl">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Next Milestone: Academic Warrior 🛡️</span>
                      <span className="text-xs opacity-80">{user.contestsCompleted}/25 contests</span>
                    </div>
                    <div className="w-full bg-white/20 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-green-400 to-blue-400 h-2 rounded-full transition-all duration-1000"
                        style={{ width: `${(user.contestsCompleted / 25) * 100}%` }}
                      ></div>
                    </div>
                    <p className="text-xs opacity-70 mt-2">Only {25 - user.contestsCompleted} contests away from your next badge!</p>
                  </div>
                </div>

                {/* Enhanced Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                    <CardContent className="p-6 text-center">
                      <div className="bg-gradient-to-r from-green-500 to-emerald-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Trophy className="h-8 w-8 text-white" />
                      </div>
                      <h3 className="text-sm font-medium text-gray-500 mb-2">Contests Won</h3>
                      <p className="text-4xl font-bold text-green-600 mb-1">{user.contestsWon}</p>
                      <p className="text-xs text-green-500">↑ +2 this week</p>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                    <CardContent className="p-6 text-center">
                      <div className="bg-gradient-to-r from-blue-500 to-cyan-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Coins className="h-8 w-8 text-white" />
                      </div>
                      <h3 className="text-sm font-medium text-gray-500 mb-2">Total Earnings</h3>
                      <p className="text-4xl font-bold text-blue-600 mb-1">{user.totalEarnings}</p>
                      <p className="text-xs text-blue-500">↑ +450 this week</p>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                    <CardContent className="p-6 text-center">
                      <div className="bg-gradient-to-r from-purple-500 to-pink-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Flame className="h-8 w-8 text-white" />
                      </div>
                      <h3 className="text-sm font-medium text-gray-500 mb-2">Win Streak</h3>
                      <p className="text-4xl font-bold text-purple-600 mb-1">{user.winStreak}</p>
                      <p className="text-xs text-purple-500">🔥 On fire!</p>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                    <CardContent className="p-6 text-center">
                      <div className="bg-gradient-to-r from-orange-500 to-red-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                        <BarChart3 className="h-8 w-8 text-white" />
                      </div>
                      <h3 className="text-sm font-medium text-gray-500 mb-2">Avg. Rank</h3>
                      <p className="text-4xl font-bold text-orange-600 mb-1">4.2</p>
                      <p className="text-xs text-orange-500">↗ Improving</p>
                    </CardContent>
                  </Card>
                </div>

                {/* Performance Chart */}
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <TrendingUp className="h-5 w-5 mr-2" />
                      Performance Trends
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-48 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg flex items-center justify-center">
                      <p className="text-gray-500">📈 Performance chart visualization would go here</p>
                    </div>
                  </CardContent>
                </Card>

                {/* Recent Results with Enhanced Design */}
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle>Recent Contest Results</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {pastContests.map((contest) => (
                        <div key={contest.id} className="group bg-white border border-gray-200 hover:border-gray-300 rounded-xl p-4 transition-all duration-300 hover:shadow-md">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                                contest.result === 'Winner' 
                                  ? 'bg-gradient-to-r from-yellow-400 to-yellow-600' 
                                  : 'bg-gradient-to-r from-blue-400 to-blue-600'
                              }`}>
                                {contest.result === 'Winner' ? (
                                  <Crown className="h-6 w-6 text-white" />
                                ) : (
                                  <Medal className="h-6 w-6 text-white" />
                                )}
                              </div>
                              <div>
                                <h4 className="font-semibold text-gray-900">{contest.title}</h4>
                                <div className="flex items-center space-x-3 text-sm text-gray-500">
                                  <span className={`font-medium ${
                                    contest.result === 'Winner' ? 'text-yellow-600' : 'text-blue-600'
                                  }`}>
                                    {contest.result}
                                  </span>
                                  <span>•</span>
                                  <span>{contest.participants} participants</span>
                                  <span>•</span>
                                  <span>{contest.date}</span>
                                </div>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="font-bold text-green-600 text-lg">+{contest.xpEarned}</p>
                              <p className="text-sm text-gray-500">Rank #{contest.rank}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
} 