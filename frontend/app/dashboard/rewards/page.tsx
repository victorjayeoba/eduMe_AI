"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
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
  Trophy,
  Flame,
  Zap,
  Star,
  Gift,
  Calendar,
  ArrowUp,
  ArrowDown,
  Crown,
  Menu,
  X,
  BarChart3,
  Clock,
  CheckCircle2,
  BadgeCheck,
  Sparkles,
} from "lucide-react"
import { Input } from "@/components/ui/input"

export default function Rewards() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("overview")
  
  const tabs = [
    { id: "overview", name: "Overview", icon: <BarChart3 className="h-5 w-5" /> },
    { id: "achievements", name: "Achievements", icon: <Trophy className="h-5 w-5" /> },
    { id: "leaderboard", name: "Leaderboard", icon: <Crown className="h-5 w-5" /> },
  ]
  
  const achievements = [
    {
      id: 1,
      title: "First Step",
      description: "Complete your first lesson",
      icon: <Zap className="h-6 w-6" />,
      completed: true,
      xp: 50,
      color: "blue",
    },
    {
      id: 2,
      title: "Perfect Week",
      description: "Complete lessons 7 days in a row",
      icon: <Calendar className="h-6 w-6" />,
      completed: true,
      xp: 100,
      color: "green",
    },
    {
      id: 3,
      title: "Quiz Master",
      description: "Score 100% on 5 different quizzes",
      icon: <Star className="h-6 w-6" />,
      completed: false,
      progress: 3,
      total: 5,
      xp: 150,
      color: "amber",
    },
    {
      id: 4,
      title: "Subject Expert",
      description: "Complete all modules in one subject",
      icon: <BookOpen className="h-6 w-6" />,
      completed: false,
      progress: 8,
      total: 12,
      xp: 200,
      color: "purple",
    },
  ]
  
  const leaderboard = [
    { id: 1, name: "Sarah J.", avatar: "/placeholder-user.jpg", xp: 2450, change: "up" },
    { id: 2, name: "Michael T.", avatar: "/placeholder-user.jpg", xp: 2380, change: "up" },
    { id: 3, name: "You", avatar: "/placeholder-user.jpg", xp: 1250, change: "down" },
    { id: 4, name: "David K.", avatar: "/placeholder-user.jpg", xp: 1120, change: "up" },
    { id: 5, name: "Lisa M.", avatar: "/placeholder-user.jpg", xp: 980, change: "down" },
  ]
  
  const streakData = [
    { day: "Mon", completed: true },
    { day: "Tue", completed: true },
    { day: "Wed", completed: true },
    { day: "Thu", completed: true },
    { day: "Fri", completed: true },
    { day: "Sat", completed: true },
    { day: "Sun", completed: true },
  ]
  
  const recentRewards = [
    {
      title: "Quiz Completion",
      xp: 25,
      time: "Today",
      icon: <CheckCircle2 className="h-5 w-5 text-green-600" />,
    },
    {
      title: "Streak Bonus",
      xp: 50,
      time: "Today",
      icon: <Flame className="h-5 w-5 text-amber-600" />,
    },
    {
      title: "Achievement Unlocked",
      xp: 100,
      time: "Yesterday",
      icon: <Trophy className="h-5 w-5 text-blue-600" />,
    },
  ]
  
  const milestones = [
    { level: 1, xp: 0, title: "Novice", completed: true },
    { level: 5, xp: 500, title: "Apprentice", completed: true },
    { level: 10, xp: 1000, title: "Enthusiast", completed: true },
    { level: 15, xp: 2000, title: "Expert", completed: false },
    { level: 20, xp: 3000, title: "Master", completed: false },
  ]
  
  // Calculate current level and progress
  const currentXP = 1250
  const currentLevel = 12
  const nextLevelXP = 1500
  const prevLevelXP = 1000
  const levelProgress = Math.floor(((currentXP - prevLevelXP) / (nextLevelXP - prevLevelXP)) * 100)

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
                className="flex items-center px-4 py-2.5 text-white bg-black rounded-lg transition-colors"
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
      <div className={`flex-1 transition-all duration-300 ${isSidebarCollapsed ? "md:ml-20" : "md:ml-64"}`}>

        {/* Main Content */}
        <main className="px-4 py-6 md:px-6">
          {/* Tabs */}
          <div className="mb-6">
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
          </div>

          {activeTab === "overview" && (
            <>
              {/* XP and Level */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <div className="h-12 w-12 bg-amber-100 rounded-full flex items-center justify-center mr-3">
                          <Zap className="h-6 w-6 text-amber-600" />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold">XP Points</h3>
                          <p className="text-sm text-gray-500">Your learning progress</p>
                        </div>
                      </div>
                      <div className="text-3xl font-bold">{currentXP}</div>
                    </div>
                    
                    <div className="mb-2">
                      <div className="flex justify-between text-sm mb-1">
                        <span>Level {currentLevel}</span>
                        <span>Level {currentLevel + 1}</span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-amber-500 rounded-full" style={{ width: `${levelProgress}%` }}></div>
                      </div>
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>{prevLevelXP} XP</span>
                        <span>{nextLevelXP - currentXP} XP needed</span>
                        <span>{nextLevelXP} XP</span>
                      </div>
                    </div>
                    
                    <div className="mt-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
                      <div className="flex items-center">
                        <BadgeCheck className="h-5 w-5 text-blue-600 mr-2" />
                        <span className="text-sm font-medium">You're in the top 15% of learners this week!</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                          <Flame className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold">Current Streak</h3>
                          <p className="text-sm text-gray-500">Days in a row</p>
                        </div>
                      </div>
                      <div className="text-3xl font-bold">7</div>
                    </div>
                    
                    <div className="grid grid-cols-7 gap-2 mb-4">
                      {streakData.map((day, i) => (
                        <div key={i} className="flex flex-col items-center">
                          <div className={`h-10 w-10 rounded-full flex items-center justify-center mb-1 ${day.completed ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-400'}`}>
                            <CheckCircle2 className="h-5 w-5" />
                          </div>
                          <span className="text-xs font-medium">{day.day}</span>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
                      <div className="flex items-center">
                        <Gift className="h-5 w-5 text-green-600 mr-2" />
                        <span className="text-sm font-medium">Keep it up! 3 more days for a 10-day streak bonus.</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              {/* Recent Rewards and Milestones */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <Card className="md:col-span-1">
                  <CardHeader>
                    <CardTitle>Recent Rewards</CardTitle>
                    <CardDescription>XP earned recently</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentRewards.map((reward, i) => (
                        <div key={i} className="flex items-center p-3 bg-gray-50 rounded-lg">
                          <div className="h-10 w-10 rounded-lg flex items-center justify-center mr-3 bg-white border border-gray-200">
                            {reward.icon}
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium">{reward.title}</h4>
                            <p className="text-xs text-gray-500">{reward.time}</p>
                          </div>
                          <div className="flex items-center text-amber-600 font-bold">
                            <Zap className="h-4 w-4 mr-1" />
                            {reward.xp} XP
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="md:col-span-2">
                  <CardHeader>
                    <CardTitle>Level Milestones</CardTitle>
                    <CardDescription>Your journey to mastery</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="relative">
                      <div className="absolute top-4 left-4 w-[2px] h-[calc(100%-32px)] bg-gray-200"></div>
                      <div className="space-y-6 relative">
                        {milestones.map((milestone, i) => (
                          <div key={i} className="flex items-start pl-8">
                            <div className={`absolute left-[calc(16px-10px)] top-0 h-5 w-5 rounded-full ${milestone.completed ? 'bg-black' : 'bg-gray-200'} flex items-center justify-center`}>
                              {milestone.completed && <CheckCircle2 className="h-3 w-3 text-white" />}
                            </div>
                            <div className={`flex-1 p-3 rounded-lg ${milestone.completed ? 'bg-gray-50' : 'bg-white border border-dashed border-gray-200'}`}>
                              <div className="flex items-center justify-between">
                                <h4 className="font-medium">Level {milestone.level}: {milestone.title}</h4>
                                <span className="text-sm text-gray-500">{milestone.xp} XP</span>
                              </div>
                              {milestone.completed ? (
                                <div className="flex items-center mt-1 text-xs text-green-600">
                                  <CheckCircle2 className="h-3 w-3 mr-1" />
                                  <span>Completed</span>
                                </div>
                              ) : (
                                <div className="mt-1 text-xs text-gray-500">
                                  {milestone.xp - currentXP} XP needed
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </>
          )}

          {activeTab === "achievements" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {achievements.map((achievement) => (
                <Card key={achievement.id} className={`${achievement.completed ? 'border-green-200' : 'border-gray-200'}`}>
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <div className={`h-12 w-12 rounded-lg flex items-center justify-center mr-3 bg-${achievement.color}-100`}>
                        {achievement.icon}
                      </div>
                      <div>
                        <h3 className="font-bold">{achievement.title}</h3>
                        <p className="text-sm text-gray-500">{achievement.description}</p>
                      </div>
                    </div>
                    
                    {achievement.completed ? (
                      <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                        <div className="flex items-center">
                          <CheckCircle2 className="h-5 w-5 text-green-600 mr-2" />
                          <span className="text-sm font-medium">Completed</span>
                        </div>
                        <div className="flex items-center text-amber-600 font-medium">
                          <Zap className="h-4 w-4 mr-1" />
                          {achievement.xp} XP
                        </div>
                      </div>
                    ) : (
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <div className="flex justify-between text-sm mb-1">
                          <span>Progress</span>
                          <span>{achievement.progress} / {achievement.total}</span>
                        </div>
                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-blue-500 rounded-full" 
                            style={{ width: `${(achievement.progress / achievement.total) * 100}%` }}
                          ></div>
                        </div>
                        <div className="flex justify-between mt-2">
                          <span className="text-xs text-gray-500">Keep going!</span>
                          <span className="text-xs text-amber-600 font-medium">{achievement.xp} XP reward</span>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
              
              {/* Locked Achievement */}
              <Card className="border-gray-200 opacity-80">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="h-12 w-12 bg-gray-100 rounded-lg flex items-center justify-center mr-3">
                      <Sparkles className="h-6 w-6 text-gray-400" />
                    </div>
                    <div>
                      <h3 className="font-bold">Mystery Achievement</h3>
                      <p className="text-sm text-gray-500">Keep learning to unlock</p>
                    </div>
                  </div>
                  
                  <div className="p-3 bg-gray-50 rounded-lg flex items-center justify-center">
                    <div className="flex items-center text-gray-500">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                        <rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect>
                        <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                      </svg>
                      <span className="text-sm font-medium">Locked</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "leaderboard" && (
            <Card>
              <CardHeader>
                <CardTitle>Weekly Leaderboard</CardTitle>
                <CardDescription>Top learners this week</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-1">
                  {leaderboard.map((user, index) => (
                    <div 
                      key={user.id} 
                      className={`flex items-center p-3 rounded-lg ${
                        user.name === "You" ? "bg-blue-50 border border-blue-100" : "hover:bg-gray-50"
                      }`}
                    >
                      <div className="w-8 text-center font-bold">
                        {index + 1}
                      </div>
                      <div className="h-10 w-10 rounded-full overflow-hidden mx-3">
                        <Image src={user.avatar} alt={user.name} width={40} height={40} />
                      </div>
                      <div className="flex-1">
                        <h4 className={`font-medium ${user.name === "You" ? "text-blue-600" : ""}`}>{user.name}</h4>
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
              </CardContent>
              <CardFooter className="border-t pt-4">
                <Button variant="outline" className="w-full">
                  View Full Leaderboard
                </Button>
              </CardFooter>
            </Card>
          )}
        </main>
      </div>
    </div>
  )
} 