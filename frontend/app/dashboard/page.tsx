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
  ArrowUp,
  ArrowDown,
  Zap,
  Trophy,
} from "lucide-react"

export default function Dashboard() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)

  // Sample user data - in a real app this would come from authentication context
  const user = {
    title: "Adedeji",
    name: "Adedeji",
    email: "adedeji@example.com"
  }

  // Sample metrics data
  const metrics = [
    { 
      title: "Study Hours", 
      value: "42.5h", 
      change: "+15%", 
      changeType: "increase", 
      icon: Clock,
      iconBg: "bg-gray-100", 
      iconColor: "text-gray-600" 
    },
    { 
      title: "Assignments", 
      value: "28/30", 
      change: "+8", 
      changeType: "increase", 
      icon: Target,
      iconBg: "bg-gray-100", 
      iconColor: "text-gray-600" 
    },
    { 
      title: "Quiz Score", 
      value: "92%", 
      change: "+5%", 
      changeType: "increase", 
      icon: Award,
      iconBg: "bg-gray-100", 
      iconColor: "text-gray-600" 
    }
  ]

  // Sample progress data for weekly chart
  const weeklyProgressData = [
    { day: "Mon", hours: 4.5 },
    { day: "Tue", hours: 6.2 },
    { day: "Wed", hours: 3.8 },
    { day: "Thu", hours: 7.5 },
    { day: "Fri", hours: 5.4 },
    { day: "Sat", hours: 8.2 },
    { day: "Sun", hours: 6.9 },
  ]

  // Sample upcoming events
  // const upcomingEvents = [
  //   { id: 1, title: "Chemistry Group Study", time: "Tomorrow, 4:00 PM", duration: "60 min", participants: 5 },
  //   { id: 2, title: "IELTS Speaking Practice", time: "Friday, 2:30 PM", duration: "45 min", participants: 3 },
  // ]

  // Sample leaderboard preview data
  const leaderboardPreview = [
    { id: 1, name: "Sarah J.", avatar: "/placeholder-user.jpg", xp: 2450, change: "up" },
    { id: 2, name: "Michael T.", avatar: "/placeholder-user.jpg", xp: 2380, change: "up" },
    { id: 3, name: user.name || "You", avatar: "/placeholder-user.jpg", xp: 1250, change: "down" },
  ]

  // Get current time for last updated
  const getCurrentTime = () => {
    const now = new Date()
    return now.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit', 
      second: '2-digit',
      hour12: true 
    })
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
            <div className="relative h-0 w-0 mr-0">
              {/* <Image
                src="/edumeai-logo.png"
                alt="EduMeAI Logo"
                fill
                className="object-contain"
              /> */}
            </div>
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
                className="flex items-center px-4 py-2.5 text-white bg-black rounded-lg transition-colors"
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
                className="flex items-center px-4 py-2.5 text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
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

      {/* Main Content - The header is now in the layout */}
      <main className={`flex-1 transition-all duration-300 ${isSidebarCollapsed ? "md:ml-20" : "md:ml-64"} pt-0`}>
        <div className="px-4 py-6 md:px-6">
          <div className="max-w-6xl mx-auto space-y-8">
            {/* Welcome Card with Metrics */}
            <Card className="overflow-hidden border-0 shadow-sm bg-gradient-to-r from-gray-800 to-gray-700 text-white">
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row gap-6">
                  {/* Left side - Welcome message */}
                  <div className="lg:w-1/3 flex flex-col justify-center">
                    <div className="mb-4">
                      <h1 className="text-2xl font-bold mb-2">Welcome back, {user?.title || 'Student'}! 👋</h1>
                      <p className="text-gray-300 mb-3">Ready to ace your studies today?</p>
                      <p className="text-sm text-gray-400 mb-2">Keep pushing towards your academic goals!</p>
                      <p className="text-xs text-gray-500">Last updated: {getCurrentTime()}</p>
                    </div>
                  </div>
                  
                  {/* Right side - Metrics and Buttons */}
                  <div className="lg:w-2/3">
                    {/* Metrics Grid */}
                    <div className="grid grid-cols-3 gap-3 mb-4">
                      {metrics.map((metric, index) => {
                        const Icon = metric.icon;
                        return (
                          <div key={index} className="bg-gray-600/50 rounded-lg p-3">
                            <div className="flex items-center justify-between mb-2">
                              <div className={`${metric.iconBg} w-6 h-6 rounded-lg flex items-center justify-center`}>
                                <Icon className={`h-3 w-3 ${metric.iconColor}`} />
                      </div>
                              <div className={`flex items-center px-1.5 py-0.5 rounded-full text-xs ${
                                metric.changeType === 'increase' ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'
                              }`}>
                                <TrendingUp className="h-2.5 w-2.5 mr-0.5" />
                            <span>{metric.change}</span>
                          </div>
                        </div>
                            <h3 className="text-lg font-bold mb-1">{metric.value}</h3>
                            <p className="text-xs text-gray-300 mb-1">{metric.title}</p>
                      </div>
                        )
                      })}
                    </div>
                    
                    {/* Action buttons */}
                    <div className="flex gap-3">
                      <Button 
                        className="bg-gray-600 hover:bg-gray-500 text-white border-0 flex items-center flex-1"
                        size="sm"
                      >
                        <RefreshCw className="h-3 w-3 mr-1.5" />
                        Refresh
                      </Button>
                      <Button 
                        className="bg-white hover:bg-gray-100 text-gray-800 border border-gray-300 flex items-center flex-1"
                        size="sm"
                      >
                        <Plus className="h-3 w-3 mr-1.5" />
                        Start Learning
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Feature Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Start Tutoring Card */}
              <Card className="overflow-hidden border-0 shadow-sm bg-white hover:shadow-md transition-all duration-300 group">
                <div className="relative h-32 bg-gradient-to-br from-blue-500 to-blue-600">
                  <video 
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                    autoPlay 
                    muted 
                    loop
                    playsInline
                  >
                    <source src="/talkingPreview1.mp4" type="video/mp4" />
                  </video>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-1">Start Tutoring</h3>
                      <p className="text-sm text-gray-600">AI-powered learning sessions</p>
                    </div>
                    <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                      <Video className="h-5 w-5 text-white" />
                    </div>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <span>Ready to learn</span>
                  </div>
                </CardContent>
                <div className="h-1 bg-gradient-to-r from-white via-gray-300 to-black"></div>
              </Card>

              {/* Career Quiz Card */}
              <Card className="overflow-hidden border-0 shadow-sm bg-white hover:shadow-md transition-all duration-300 group">
                <div className="relative h-32 bg-gradient-to-br from-purple-500 to-purple-600">
                  <video 
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                    autoPlay 
                    muted 
                    loop
                    playsInline
                  >
                    <source src="/talkingPreview2.mp4" type="video/mp4" />
                  </video>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-1">Career Quiz</h3>
                      <p className="text-sm text-gray-600">Discover your path</p>
                    </div>
                    <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center">
                      <GraduationCap className="h-5 w-5 text-white" />
                    </div>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <span>Take assessment</span>
                  </div>
                </CardContent>
                <div className="h-1 bg-gradient-to-r from-black via-gray-300 to-white"></div>
              </Card>

              {/* Practice Exam Card */}
              <Card className="overflow-hidden border-0 shadow-sm bg-white hover:shadow-md transition-all duration-300 group">
                <div className="relative h-32 bg-gradient-to-br from-green-500 to-green-600">
                  <video 
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                    autoPlay 
                    muted 
                    loop
                    playsInline
                  >
                    <source src="/talkingPreview3.mp4" type="video/mp4" />
                  </video>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-1">Practice Exam</h3>
                      <p className="text-sm text-gray-600">Test your knowledge</p>
                    </div>
                    <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                      <BookOpen className="h-5 w-5 text-white" />
                    </div>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <span>Start practicing</span>
                  </div>
                </CardContent>
                <div className="h-1 bg-gradient-to-r from-white via-gray-300 to-black"></div>
              </Card>

              {/* Study Groups Card */}
              <Card className="overflow-hidden border-0 shadow-sm bg-white hover:shadow-md transition-all duration-300 group">
                <div className="relative h-32 bg-gradient-to-br from-amber-500 to-amber-600">
                  <video 
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                    autoPlay 
                    muted 
                    loop
                    playsInline
                  >
                    <source src="/talkingPreview4.mp4" type="video/mp4" />
                  </video>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-1">Study Groups</h3>
                      <p className="text-sm text-gray-600">Collaborate with peers</p>
                    </div>
                    <div className="w-10 h-10 bg-amber-500 rounded-lg flex items-center justify-center">
                      <MessageSquare className="h-5 w-5 text-white" />
                    </div>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <span>Join discussion</span>
                  </div>
                </CardContent>
                <div className="h-1 bg-gradient-to-r from-black via-gray-300 to-white"></div>
              </Card>
                    </div>

            {/* Weekly Progress */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="overflow-hidden border-0 shadow-sm lg:col-span-2">
                <CardHeader className="flex flex-row items-center justify-between p-6 pb-0">
                  <CardTitle className="text-lg font-semibold">Weekly Progress</CardTitle>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm" className="text-xs">
                      <Filter className="h-3 w-3 mr-1" />
                      Filter
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="h-64">
                    <div className="w-full h-full flex items-end space-x-2">
                      {weeklyProgressData.map((day, index) => (
                        <div key={index} className="flex-1 flex flex-col items-center">
                          <div 
                            className="w-full bg-blue-500 rounded-t-md transition-all duration-300 hover:bg-blue-600"
                            style={{ height: `${(day.hours / 10) * 100}%` }}
                          ></div>
                          <span className="text-xs text-gray-500 mt-2">{day.day}</span>
                        </div>
                      ))}
                    </div>
                </div>
              </CardContent>
            </Card>
            
              <Card className="overflow-hidden border-0 shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between p-6 pb-0">
                  <CardTitle className="text-lg font-semibold">Leaderboard</CardTitle>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-3">
                    {leaderboardPreview.map((user, index) => (
                      <div
                        key={user.id}
                        className={`flex items-center p-3 rounded-lg ${user.name === (user.name || "You") ? "bg-blue-50 border border-blue-100" : "hover:bg-gray-50"}`}
                      >
                        <div className="w-8 text-center font-bold text-gray-500">{index + 1}</div>
                        <div className="h-10 w-10 rounded-full overflow-hidden mx-3">
                          <Image src={user.avatar} alt={user.name} width={40} height={40} />
                        </div>
                        <div className="flex-1">
                          <h4 className={`font-medium ${user.name === (user.name || "You") ? "text-blue-600" : ""}`}>{user.name}</h4>
                        </div>
                        <div className="flex items-center">
                          <div className="mr-3 flex items-center">
                            <Zap className="h-4 w-4 text-amber-500 mr-1" />
                            <span className="font-bold">{user.xp}</span>
                          </div>
                          {user.change === "up" ? (
                            <ArrowUp className="h-4 w-4 text-green-500" />
                          ) : (
                            <ArrowDown className="h-4 w-4 text-red-500" />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  <Link href="/dashboard/leaderboard">
                    <Button variant="ghost" className="w-full text-sm mt-4">
                      View Full Leaderboard
                    </Button>
                  </Link>
                </CardContent>
              </Card>
          </div>

            
          </div>
        </div>
      </main>
    </div>
  )
} 