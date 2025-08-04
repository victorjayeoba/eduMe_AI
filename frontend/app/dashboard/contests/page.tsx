"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
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
} from "lucide-react"

export default function Contests() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("active")

  // Sample user data
  const user = {
    name: "Adedeji",
    xp: 1250,
    avatar: "/placeholder-user.jpg"
  }

  // Sample active contests
  const activeContests = [
    {
      id: 1,
      title: "Mathematics Master Challenge",
      description: "Test your mathematical skills across algebra, calculus, and statistics",
      entryCost: 100,
      prizePool: 500,
      participants: 45,
      timeLeft: "2 days",
      difficulty: "Advanced",
      category: "Mathematics",
      status: "active",
      image: "/placeholder.jpg"
    },
    {
      id: 2,
      title: "Science Quiz Championship",
      description: "Compete in physics, chemistry, and biology knowledge",
      entryCost: 75,
      prizePool: 300,
      participants: 32,
      timeLeft: "5 days",
      difficulty: "Intermediate",
      category: "Science",
      status: "active",
      image: "/placeholder.jpg"
    },
    {
      id: 3,
      title: "Programming Logic Contest",
      description: "Solve coding challenges and algorithmic problems",
      entryCost: 150,
      prizePool: 750,
      participants: 28,
      timeLeft: "1 day",
      difficulty: "Expert",
      category: "Computer Science",
      status: "active",
      image: "/placeholder.jpg"
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

  const tabs = [
    { id: "active", name: "Active Contests", icon: <Flame className="h-4 w-4" /> },
    { id: "upcoming", name: "Upcoming", icon: <Clock className="h-4 w-4" /> },
    { id: "results", name: "My Results", icon: <Trophy className="h-4 w-4" /> },
  ]

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
            {/* Header */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Educational Contests</h1>
                <p className="text-gray-600 mt-2">Compete with peers and win XP rewards</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center bg-white px-4 py-2 rounded-lg border shadow-sm">
                  <Zap className="h-5 w-5 text-amber-500 mr-2" />
                  <span className="font-semibold text-gray-900">{user.xp} XP</span>
                </div>
                <Button className="bg-green-600 hover:bg-green-700 text-white">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Contest
                </Button>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex overflow-x-auto pb-2 space-x-2">
              {tabs.map((tab) => (
                <Button
                  key={tab.id}
                  variant={activeTab === tab.id ? "default" : "outline"}
                  className={`flex items-center ${activeTab === tab.id ? "bg-black text-white" : ""}`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  <span className="mr-2">{tab.icon}</span>
                  {tab.name}
                </Button>
              ))}
            </div>

            {/* Active Contests */}
            {activeTab === "active" && (
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {activeContests.map((contest) => (
                  <Card key={contest.id} className="overflow-hidden border-0 shadow-sm hover:shadow-md transition-all duration-300">
                    <div className="relative h-48 bg-gradient-to-br from-blue-500 to-purple-600">
                      <div className="absolute inset-0 bg-black/20"></div>
                      <div className="absolute top-4 right-4">
                        <div className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                          Active
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
                          <div className="bg-blue-100 p-2 rounded-lg mr-3">
                            <Trophy className="h-5 w-5 text-blue-600" />
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
                          <span className="text-gray-500">Participants</span>
                          <span className="font-medium">{contest.participants}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-500">Time Left</span>
                          <span className="font-medium text-orange-600">{contest.timeLeft}</span>
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
                        className="w-full bg-green-600 hover:bg-green-700 text-white"
                        disabled={user.xp < contest.entryCost}
                      >
                        <Play className="h-4 w-4 mr-2" />
                        {user.xp < contest.entryCost ? 'Not Enough XP' : 'Enter Contest'}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
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

            {/* My Results */}
            {activeTab === "results" && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card className="border-0 shadow-sm">
                    <CardContent className="p-6 text-center">
                      <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Trophy className="h-6 w-6 text-green-600" />
                      </div>
                      <h3 className="text-lg font-bold mb-1">Contests Won</h3>
                      <p className="text-3xl font-bold text-green-600">3</p>
                    </CardContent>
                  </Card>
                  <Card className="border-0 shadow-sm">
                    <CardContent className="p-6 text-center">
                      <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Zap className="h-6 w-6 text-blue-600" />
                      </div>
                      <h3 className="text-lg font-bold mb-1">Total XP Earned</h3>
                      <p className="text-3xl font-bold text-blue-600">850</p>
                    </CardContent>
                  </Card>
                  <Card className="border-0 shadow-sm">
                    <CardContent className="p-6 text-center">
                      <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                        <BarChart3 className="h-6 w-6 text-purple-600" />
                      </div>
                      <h3 className="text-lg font-bold mb-1">Avg. Rank</h3>
                      <p className="text-3xl font-bold text-purple-600">4.2</p>
                    </CardContent>
                  </Card>
                </div>

                <Card className="border-0 shadow-sm">
                  <CardHeader>
                    <CardTitle>Recent Results</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {pastContests.map((contest) => (
                        <div key={contest.id} className="flex items-center p-4 bg-gray-50 rounded-lg">
                          <div className="flex items-center flex-1">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-4 ${
                              contest.result === 'Winner' ? 'bg-yellow-100' : 'bg-blue-100'
                            }`}>
                              {contest.result === 'Winner' ? (
                                <Crown className="h-5 w-5 text-yellow-600" />
                              ) : (
                                <Trophy className="h-5 w-5 text-blue-600" />
                              )}
                            </div>
                            <div className="flex-1">
                              <h4 className="font-medium">{contest.title}</h4>
                              <p className="text-sm text-gray-500">
                                {contest.result} • {contest.participants} participants
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-green-600">+{contest.xpEarned} XP</p>
                            <p className="text-sm text-gray-500">Rank #{contest.rank}</p>
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