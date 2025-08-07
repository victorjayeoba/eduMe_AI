"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { useAuth } from "@/contexts/auth-context"
import { doc, getDoc, updateDoc, collection, query, orderBy, limit, getDocs } from "firebase/firestore"
import { db } from "@/lib/firebase"
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
  Gem,
} from "lucide-react"
import { 
  WelcomeCard, 
  FeatureCard, 
  WeeklyProgress, 
  LeaderboardCard 
} from "@/components/dashboard"

export default function Dashboard() {
  const { user: authUser } = useAuth()
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)
  const [userProfile, setUserProfile] = useState<{
    name: string
    email: string
    educationLevel: string
    totalTimeSpent: number
    gems: number
    lastActive: Date
  } | null>(null)
  const [loading, setLoading] = useState(true)
  const [lastMinuteUpdate, setLastMinuteUpdate] = useState<Date | null>(null)
  const [leaderboardData, setLeaderboardData] = useState<Array<{
    id: string
    name: string
    gems: number
    totalTimeSpent: number
  }>>([])

  // Fetch user profile and leaderboard from Firestore
  useEffect(() => {
    const fetchUserProfile = async () => {
      if (authUser) {
        try {
          const userDoc = await getDoc(doc(db, "users", authUser.uid))
          if (userDoc.exists()) {
            const data = userDoc.data()
            const initialTimeSpent = data.totalTimeSpent || 0
            const initialGems = data.gems || 0
            
            console.log('🎯 Initial User Profile Loaded:')
            console.log(`   User: ${data.name || authUser.displayName || "User"}`)
            console.log(`   Total Time Spent: ${initialTimeSpent} minutes`)
            console.log(`   Current Gems: ${initialGems}`)
            console.log(`   Gem Calculation: Math.floor(${initialTimeSpent} / 5) = ${Math.floor(initialTimeSpent / 5)}`)
            console.log(`   Time until next gem: ${5 - (initialTimeSpent % 5)} minutes`)
            console.log('---')
            
            setUserProfile({
              name: data.name || authUser.displayName || "User",
              email: data.email || authUser.email || "",
              educationLevel: data.educationLevel || "",
              totalTimeSpent: initialTimeSpent,
              gems: initialGems,
              lastActive: data.lastActive ? new Date(data.lastActive.toDate()) : new Date()
            })
          } else {
            // If no profile exists, redirect to onboarding
            window.location.href = "/onboarding"
            return
          }
        } catch (error) {
          console.error("Error fetching user profile:", error)
        } finally {
          setLoading(false)
        }
      } else {
        setLoading(false)
      }
    }

    const fetchLeaderboard = async () => {
      try {
        // Query users collection, order by gems descending, limit to top 10
        const usersQuery = query(
          collection(db, "users"),
          orderBy("gems", "desc"),
          limit(10)
        )
        
        const querySnapshot = await getDocs(usersQuery)
        const leaderboard = querySnapshot.docs.map((doc, index) => ({
          id: doc.id,
          name: doc.data().name || "Anonymous User",
          gems: doc.data().gems || 0,
          totalTimeSpent: doc.data().totalTimeSpent || 0
        }))
        
        console.log('🏆 Leaderboard Data Loaded:')
        leaderboard.forEach((user, index) => {
          console.log(`   ${index + 1}. ${user.name}: ${user.gems} gems (${user.totalTimeSpent} minutes)`)
        })
        console.log('---')
        
        setLeaderboardData(leaderboard)
      } catch (error) {
        console.error("Error fetching leaderboard:", error)
      }
    }

    fetchUserProfile()
    fetchLeaderboard()
  }, [authUser])

  // Update time spent every minute
  useEffect(() => {
    if (userProfile && authUser) {
      let minuteTimer: NodeJS.Timeout

      const updateTimeSpent = async () => {
        if (!document.hidden) {
          const newTotalTime = userProfile.totalTimeSpent + 1
          const newGems = Math.floor(newTotalTime / 5) // 1 gem per 5 minutes
          
          // Console logging for debugging
          console.log('🕐 Time Tracking Update:')
          console.log(`   Previous Time Spent: ${userProfile.totalTimeSpent} minutes`)
          console.log(`   New Time Spent: ${newTotalTime} minutes`)
          console.log(`   Previous Gems: ${userProfile.gems}`)
          console.log(`   New Gems: ${newGems}`)
          console.log(`   Gem Calculation: Math.floor(${newTotalTime} / 5) = ${newGems}`)
          console.log(`   Time since last gem: ${newTotalTime % 5} minutes`)
          console.log('---')
          
          try {
            await updateDoc(doc(db, "users", authUser.uid), {
              totalTimeSpent: newTotalTime,
              gems: newGems,
              lastActive: new Date()
            })
            
            setUserProfile(prev => prev ? {
              ...prev,
              totalTimeSpent: newTotalTime,
              gems: newGems,
              lastActive: new Date()
            } : null)
            
            setLastMinuteUpdate(new Date())
          } catch (error) {
            console.error("Error updating user metrics:", error)
          }
        }
      }

      // Update every minute (60000ms)
      minuteTimer = setInterval(updateTimeSpent, 60000)

      // Initial update if needed
      if (!lastMinuteUpdate) {
        updateTimeSpent()
      }

      return () => {
        if (minuteTimer) {
          clearInterval(minuteTimer)
        }
      }
    }
  }, [userProfile, authUser, lastMinuteUpdate])

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

  // Function to refresh leaderboard data
  const refreshLeaderboard = async () => {
    try {
      const usersQuery = query(
        collection(db, "users"),
        orderBy("gems", "desc"),
        limit(10)
      )
      
      const querySnapshot = await getDocs(usersQuery)
      const leaderboard = querySnapshot.docs.map((doc, index) => ({
        id: doc.id,
        name: doc.data().name || "Anonymous User",
        gems: doc.data().gems || 0,
        totalTimeSpent: doc.data().totalTimeSpent || 0
      }))
      
      console.log('🔄 Leaderboard Refreshed:')
      leaderboard.forEach((user, index) => {
        console.log(`   ${index + 1}. ${user.name}: ${user.gems} gems (${user.totalTimeSpent} minutes)`)
      })
      console.log('---')
      
      setLeaderboardData(leaderboard)
    } catch (error) {
      console.error("Error refreshing leaderboard:", error)
    }
  }

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

  // Feature cards data
  const featureCards = [
    {
      title: "Start Tutoring",
      description: "AI-powered learning sessions",
      href: "/dashboard/ai-tutoring",
      videoSrc: "/talkingPreview1.mp4",
      icon: Video,
      iconBg: "bg-blue-500",
      gradientFrom: "from-blue-500",
      gradientTo: "to-blue-600",
      status: "Ready to learn",
      gradientDirection: "from-white via-gray-300 to-black" as const
    },
    {
      title: "Career Quiz",
      description: "Discover your path",
      href: "/dashboard/career-guide",
      videoSrc: "/talkingPreview2.mp4",
      icon: GraduationCap,
      iconBg: "bg-purple-500",
      gradientFrom: "from-purple-500",
      gradientTo: "to-purple-600",
      status: "Take assessment",
      gradientDirection: "from-black via-gray-300 to-white" as const
    },
    {
      title: "Skill Hub",
      description: "Enhance your abilities",
      href: "/dashboard/skill-hub",
      videoSrc: "/talkingPreview4.mp4",
      icon: MessageSquare,
      iconBg: "bg-amber-500",
      gradientFrom: "from-amber-500",
      gradientTo: "to-amber-600",
      status: "Test skills",
      gradientDirection: "from-black via-gray-300 to-white" as const
    },
    {
      title: "Practice Exam",
      description: "Test your knowledge",
      href: "/dashboard/contests",
      videoSrc: "/talkingPreview3.mp4",
      icon: BookOpen,
      iconBg: "bg-green-500",
      gradientFrom: "from-green-500",
      gradientTo: "to-green-600",
      status: "Start practicing",
      gradientDirection: "from-white via-gray-300 to-black" as const
    }
  ]

  // Show loading state while fetching user profile
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    )
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
            <WelcomeCard
              userName={userProfile?.name || 'Student'}
              totalTimeSpent={userProfile?.totalTimeSpent || 0}
              gems={userProfile?.gems || 0}
              lastUpdated={getCurrentTime()}
              onRefresh={() => {
                          setLastMinuteUpdate(new Date());
                          refreshLeaderboard();
                          console.log("Manual refresh triggered at:", getCurrentTime());
                        }}
            />

            {/* Feature Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {featureCards.map((card, index) => (
                <FeatureCard
                  key={index}
                  title={card.title}
                  description={card.description}
                  href={card.href}
                  videoSrc={card.videoSrc}
                  icon={card.icon}
                  iconBg={card.iconBg}
                  gradientFrom={card.gradientFrom}
                  gradientTo={card.gradientTo}
                  status={card.status}
                  gradientDirection={card.gradientDirection}
                />
              ))}
            </div>

            {/* Weekly Progress and Leaderboard */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <WeeklyProgress data={weeklyProgressData} />
              <LeaderboardCard 
                leaderboardData={leaderboardData}
                currentUserName={userProfile?.name || "You"}
              />
          </div>
          </div>
        </div>
      </main>
    </div>
  )
} 