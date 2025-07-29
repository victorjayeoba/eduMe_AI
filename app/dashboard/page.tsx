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
} from "lucide-react"

export default function Dashboard() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)

  // Sample metrics data
  const metrics = [
    { 
      title: "Study Hours", 
      value: "42.5h", 
      change: "+15%", 
      changeType: "increase", 
      period: "This week",
      icon: Clock,
      iconBg: "bg-blue-100", 
      iconColor: "text-blue-600" 
    },
    { 
      title: "Assignments", 
      value: "28/30", 
      change: "+8", 
      changeType: "increase", 
      period: "This week",
      icon: Target,
      iconBg: "bg-purple-100", 
      iconColor: "text-purple-600" 
    },
    { 
      title: "Quiz Score", 
      value: "92%", 
      change: "+5%", 
      changeType: "increase", 
      period: "This week",
      icon: Award,
      iconBg: "bg-amber-100", 
      iconColor: "text-amber-600" 
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

  // Sample recent activities
  const recentActivities = [
    { 
      id: 1,
      title: "AI Tutoring Session",
      subject: "Calculus",
      time: "10:42 AM",
      duration: "45 minutes",
      status: "Completed",
      icon: Video,
      iconBg: "bg-blue-100", 
      iconColor: "text-blue-600" 
    },
    { 
      id: 2,
      title: "Career Quiz",
      subject: "Career Guidance",
      time: "Yesterday",
      duration: "15 minutes",
      status: "Completed",
      icon: GraduationCap,
      iconBg: "bg-purple-100", 
      iconColor: "text-purple-600" 
    },
    { 
      id: 3,
      title: "Practice Exam",
      subject: "Mathematics",
      time: "2 days ago",
      duration: "60 minutes",
      status: "Completed",
      icon: BookOpen,
      iconBg: "bg-green-100", 
      iconColor: "text-green-600" 
    },
  ]

  // Sample upcoming events
  const upcomingEvents = [
    { 
      id: 1,
      title: "Chemistry Group Study",
      time: "Tomorrow, 4:00 PM",
      duration: "60 min",
      participants: 5
    },
    { 
      id: 2,
      title: "IELTS Speaking Practice",
      time: "Friday, 2:30 PM",
      duration: "45 min",
      participants: 3
    },
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
            <div className="relative h-10 w-10 mr-2">
              <Image
                src="/edumeai-logo.png"
                alt="EduMeAI Logo"
                fill
                className="object-contain"
              />
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
        <nav className="mt-6 px-2">
          <div className="space-y-1">
            <Link
              href="/dashboard"
              className="flex items-center px-4 py-3 text-white bg-black rounded-lg transition-colors"
            >
              <Home className="h-5 w-5" />
              {!isSidebarCollapsed && <span className="ml-3 font-medium">Dashboard</span>}
            </Link>
            <Link
              href="/dashboard/ai-tutoring"
              className="flex items-center px-4 py-3 text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Video className="h-5 w-5" />
              {!isSidebarCollapsed && <span className="ml-3 font-medium">AI Tutoring</span>}
            </Link>
            <Link
              href="/dashboard/career-guide"
              className="flex items-center px-4 py-3 text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <GraduationCap className="h-5 w-5" />
              {!isSidebarCollapsed && <span className="ml-3 font-medium">Career Guide</span>}
            </Link>
            <Link
              href="/dashboard/exam-prep"
              className="flex items-center px-4 py-3 text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <BookOpen className="h-5 w-5" />
              {!isSidebarCollapsed && <span className="ml-3 font-medium">Exam Prep</span>}
            </Link>
            <Link
              href="/dashboard/skill-hub"
              className="flex items-center px-4 py-3 text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Target className="h-5 w-5" />
              {!isSidebarCollapsed && <span className="ml-3 font-medium">Skill Hub</span>}
            </Link>
            <Link
              href="/dashboard/rewards"
              className="flex items-center px-4 py-3 text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Award className="h-5 w-5" />
              {!isSidebarCollapsed && <span className="ml-3 font-medium">Rewards</span>}
            </Link>
            <Link
              href="/dashboard/resources"
              className="flex items-center px-4 py-3 text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <BookOpen className="h-5 w-5" />
              {!isSidebarCollapsed && <span className="ml-3 font-medium">Resources</span>}
            </Link>
          </div>

          <div className="mt-10 pt-6 border-t border-gray-200">
            <Link
              href="/dashboard/settings"
              className="flex items-center px-4 py-3 text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Settings className="h-5 w-5" />
              {!isSidebarCollapsed && <span className="ml-3 font-medium">Settings</span>}
            </Link>
            <Link
              href="/logout"
              className="flex items-center px-4 py-3 text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <LogOut className="h-5 w-5" />
              {!isSidebarCollapsed && <span className="ml-3 font-medium">Logout</span>}
            </Link>
          </div>
        </nav>
      </div>

      {/* Main Content - The header is now in the layout */}
      <main className={`flex-1 transition-all duration-300 ${isSidebarCollapsed ? "md:ml-20" : "md:ml-64"} pt-0`}>
        <div className="px-4 py-6 md:px-6">
          <div className="max-w-6xl mx-auto space-y-8">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {metrics.map((metric, index) => {
                const Icon = metric.icon;
                return (
                  <Card key={index} className="overflow-hidden border-0 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                        <div className={`${metric.iconBg} w-12 h-12 rounded-lg flex items-center justify-center`}>
                          <Icon className={`h-6 w-6 ${metric.iconColor}`} />
                  </div>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="mt-4">
                        <h2 className="text-3xl font-bold">{metric.value}</h2>
                        <div className="flex items-center mt-1">
                          <p className="text-sm text-gray-500">{metric.title}</p>
                          <div className={`ml-2 flex items-center px-1.5 py-0.5 rounded-full text-xs ${
                            metric.changeType === 'increase' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}>
                            <TrendingUp className="h-3 w-3 mr-0.5" />
                            <span>{metric.change}</span>
                          </div>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">{metric.period}</p>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
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
                  <CardTitle className="text-lg font-semibold">Upcoming</CardTitle>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
              </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {upcomingEvents.map((event) => (
                      <div key={event.id} className="flex items-center p-3 bg-gray-50 rounded-lg">
                        <div className="bg-blue-100 p-3 rounded-lg mr-4">
                          <Calendar className="h-5 w-5 text-blue-600" />
                      </div>
                      <div className="flex-1">
                          <h4 className="font-medium text-sm">{event.title}</h4>
                          <div className="flex items-center text-xs text-gray-500 mt-1">
                            <Clock className="h-3 w-3 mr-1" />
                            <span>{event.time} • {event.duration}</span>
                </div>
                        </div>
                        <Button variant="outline" size="sm" className="ml-2">
                          Join
                        </Button>
                      </div>
                    ))}
                    <Button variant="ghost" className="w-full text-sm">
                      View Calendar
                      </Button>
                </div>
              </CardContent>
            </Card>
          </div>

            {/* Recent Activity */}
            <Card className="overflow-hidden border-0 shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between p-6 pb-0">
                <CardTitle className="text-lg font-semibold">Recent Activity</CardTitle>
                <Button variant="outline" size="sm" className="text-xs">
                  View All
                </Button>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {recentActivities.map((activity) => {
                    const ActivityIcon = activity.icon;
                    return (
                      <div key={activity.id} className="flex items-start p-3 hover:bg-gray-50 rounded-lg transition-colors">
                        <div className={`${activity.iconBg} p-3 rounded-lg mr-4`}>
                          <ActivityIcon className={`h-5 w-5 ${activity.iconColor}`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                            <h4 className="font-medium text-sm">{activity.title}</h4>
                            <span className="text-xs text-gray-500">{activity.time}</span>
                      </div>
                          <p className="text-xs text-gray-500 mt-1">
                            {activity.subject} • {activity.duration}
                          </p>
                    </div>
                        <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
                          {activity.status}
                        </span>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <Button 
                className="h-auto py-4 bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200"
                variant="outline"
              >
                <Video className="h-5 w-5 mr-2" />
                Start Tutoring
              </Button>
              <Button 
                className="h-auto py-4 bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200"
                variant="outline"
              >
                <GraduationCap className="h-5 w-5 mr-2" />
                Career Quiz
              </Button>
              <Button 
                className="h-auto py-4 bg-green-50 hover:bg-green-100 text-green-700 border border-green-200"
                variant="outline"
              >
                <BookOpen className="h-5 w-5 mr-2" />
                Practice Exam
              </Button>
              <Button 
                className="h-auto py-4 bg-amber-50 hover:bg-amber-100 text-amber-700 border border-amber-200"
                variant="outline"
              >
                <MessageSquare className="h-5 w-5 mr-2" />
                Study Groups
              </Button>
                </div>
          </div>
        </div>
      </main>
    </div>
  )
} 