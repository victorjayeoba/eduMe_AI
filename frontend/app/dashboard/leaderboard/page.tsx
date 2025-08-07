"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { useAuth } from "@/contexts/auth-context"
import { doc, getDoc, collection, query, orderBy, limit, getDocs } from "firebase/firestore"
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
  Medal,
  ArrowUp,
  ArrowDown,
  Gem,
} from "lucide-react"

export default function Leaderboard() {
  const { user: authUser } = useAuth()
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("overall")
  const [searchQuery, setSearchQuery] = useState("")
  const [loading, setLoading] = useState(true)
  const [userProfile, setUserProfile] = useState<{
    name: string
    email: string
    educationLevel: string
    totalTimeSpent: number
    gems: number
    lastActive: Date
  } | null>(null)
  const [leaderboardData, setLeaderboardData] = useState<Array<{
    id: string
    name: string
    gems: number
    totalTimeSpent: number
    rank: number
  }>>([])

  // Fetch user profile and leaderboard data
  useEffect(() => {
    const fetchData = async () => {
      if (authUser) {
        try {
          // Fetch user profile
          const userDoc = await getDoc(doc(db, "users", authUser.uid))
          if (userDoc.exists()) {
            const data = userDoc.data()
            setUserProfile({
              name: data.name || authUser.displayName || "User",
              email: data.email || authUser.email || "",
              educationLevel: data.educationLevel || "",
              totalTimeSpent: data.totalTimeSpent || 0,
              gems: data.gems || 0,
              lastActive: data.lastActive ? new Date(data.lastActive.toDate()) : new Date()
            })
          }

          // Fetch leaderboard data
          const usersQuery = query(
            collection(db, "users"),
            orderBy("gems", "desc"),
            limit(50)
          )
          
          const querySnapshot = await getDocs(usersQuery)
          const leaderboard = querySnapshot.docs.map((doc, index) => ({
            id: doc.id,
            name: doc.data().name || "Anonymous User",
            gems: doc.data().gems || 0,
            totalTimeSpent: doc.data().totalTimeSpent || 0,
            rank: index + 1
          }))
          
          console.log('🏆 Full Leaderboard Data Loaded:')
          leaderboard.forEach((user, index) => {
            console.log(`   ${index + 1}. ${user.name}: ${user.gems} gems (${user.totalTimeSpent} minutes)`)
          })
          console.log('---')
          
          setLeaderboardData(leaderboard)
        } catch (error) {
          console.error("Error fetching data:", error)
        } finally {
          setLoading(false)
        }
      } else {
        setLoading(false)
      }
    }

    fetchData()
  }, [authUser])

  // Format time display
  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60)
    const remainingMinutes = minutes % 60
    
    if (hours > 0) {
      return `${hours}h ${remainingMinutes}m`
    } else {
      return `${remainingMinutes}m`
    }
  }

  // Get current user's rank
  const getCurrentUserRank = () => {
    if (!userProfile) return 0
    const userEntry = leaderboardData.find(user => user.name === userProfile.name)
    return userEntry ? userEntry.rank : 0
  }

  // Filter leaderboard based on search
  const filteredLeaderboard = leaderboardData.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const tabs = [
    { id: "overall", name: "Overall", icon: <Trophy className="h-4 w-4" /> },
    { id: "weekly", name: "Weekly", icon: <Flame className="h-4 w-4" /> },
    { id: "monthly", name: "Monthly", icon: <Calendar className="h-4 w-4" /> },
    { id: "subjects", name: "By Subject", icon: <BookOpen className="h-4 w-4" /> },
  ]

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="h-5 w-5 text-yellow-500" />
      case 2:
        return <Medal className="h-5 w-5 text-gray-400" />
      case 3:
        return <Medal className="h-5 w-5 text-amber-600" />
      default:
        return null
    }
  }

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading leaderboard...</p>
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
                href="/dashboard/contests"
                className="flex items-center px-4 py-2.5 text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Trophy className="h-5 w-5" />
                {!isSidebarCollapsed && <span className="ml-3 font-medium">Contests</span>}
              </Link>
              <Link
                href="/dashboard/skill-hub"
                className="flex items-center px-4 py-2.5 text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Target className="h-5 w-5" />
                {!isSidebarCollapsed && <span className="ml-3 font-medium">Skill Hub</span>}
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
                className="flex items-center px-4 py-2.5 text-white bg-black rounded-lg transition-colors"
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
                <h1 className="text-3xl font-bold text-gray-900">Leaderboard</h1>
                <p className="text-gray-600 mt-2">Compete with students and track your progress</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center bg-white px-4 py-2 rounded-lg border shadow-sm">
                  <Trophy className="h-5 w-5 text-amber-500 mr-2" />
                  <span className="font-semibold text-gray-900">Rank #{getCurrentUserRank()}</span>
                </div>
                <div className="flex items-center bg-white px-4 py-2 rounded-lg border shadow-sm">
                  <Gem className="h-5 w-5 text-amber-500 mr-2" />
                  <span className="font-semibold text-gray-900">{userProfile?.gems || 0} Gems</span>
                </div>
              </div>
            </div>

            {/* Search */}
            <div className="max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  placeholder="Search students..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
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

            {/* Leaderboard Content */}
            <Card className="border-0 shadow-sm">
              <CardContent className="p-6">
                <div className="space-y-2">
                  {filteredLeaderboard.map((user, index) => (
                    <div
                      key={user.id}
                      className={`flex items-center p-4 rounded-lg ${
                        user.name === userProfile?.name ? "bg-blue-50 border border-blue-100" : "hover:bg-gray-50"
                      }`}
                    >
                      <div className="w-12 text-center">
                        <div className="flex items-center justify-center">
                          {getRankIcon(user.rank)}
                          <span className={`font-bold text-lg ${user.rank <= 3 ? "ml-2" : ""}`}>
                            {user.rank}
                          </span>
                        </div>
                      </div>
                      <div className="h-12 w-12 rounded-full overflow-hidden mx-4 bg-gray-200 flex items-center justify-center">
                        <span className="text-lg font-medium text-gray-600">
                          {user.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h4 className={`font-bold text-lg ${user.name === userProfile?.name ? "text-blue-600" : ""}`}>
                            {user.name}
                          </h4>
                          {user.name === userProfile?.name && (
                            <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">You</span>
                          )}
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-500 mt-1">
                          <span className="flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            {formatTime(user.totalTimeSpent)}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <div className="flex items-center">
                            <Gem className="h-5 w-5 text-amber-500 mr-2" />
                            <span className="font-bold text-xl">{user.gems}</span>
                          </div>
                          <p className="text-sm text-gray-500">Gems</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
} 