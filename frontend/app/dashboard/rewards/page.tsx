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
  Star,
  Gift,
  Menu,
  X,
  CheckCircle2,
  Wallet,
  Coins,
  Gem,
  ExternalLink,
  Lock,
  Unlock,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { useWallet } from "@/contexts/wallet-context"
import { useAuth } from "@/contexts/auth-context"
import { doc, getDoc } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { useEffect } from "react"

export default function Rewards() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("wallet")
  const [userGems, setUserGems] = useState(0)
  const [loading, setLoading] = useState(true)
  
  const { address, connectWallet, isConnecting } = useWallet()
  const { user } = useAuth()
  
  // Fetch user gems from Firebase
  useEffect(() => {
    if (!user) return
    
    const fetchUserGems = async () => {
      try {
        const userRef = doc(db, "users", user.uid)
        const userDoc = await getDoc(userRef)
        
        if (userDoc.exists()) {
          const userData = userDoc.data()
          setUserGems(userData.gems || 0)
        }
      } catch (error) {
        console.error("Error fetching user gems:", error)
      } finally {
        setLoading(false)
      }
    }
    
    fetchUserGems()
  }, [user])
  
  const tabs = [
    { id: "wallet", name: "Wallet & Tokens", icon: <Wallet className="h-5 w-5" /> },
  ]
  
  const tokenRewards = [
    {
      title: "Course Completion",
      tokens: 10,
      description: "Complete any course to earn tokens",
      icon: <CheckCircle2 className="h-5 w-5" />,
      unlocked: true,
    },
    {
      title: "Weekly Streak",
      tokens: 25,
      description: "Maintain a 7-day learning streak",
      icon: <Flame className="h-5 w-5" />,
      unlocked: true,
    },
    {
      title: "Perfect Quiz",
      tokens: 15,
      description: "Score 100% on any quiz",
      icon: <Star className="h-5 w-5" />,
      unlocked: true,
    },
    {
      title: "Achievement Master",
      tokens: 50,
      description: "Unlock 10 achievements",
      icon: <Trophy className="h-5 w-5" />,
      unlocked: false,
    },
  ]
  
  const estimatedTokenValue = userGems * 0.1 // Mock calculation
  
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

          {activeTab === "wallet" && (
            <>
              {/* Wallet Connection Status */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                {!address ? (
                  <Card className="lg:col-span-2">
                    <CardContent className="p-8 text-center">
                      <div className="mb-6">
                        <div className="h-24 w-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                          <Wallet className="h-12 w-12 text-white" />
                        </div>
                        <h2 className="text-2xl font-bold mb-2">Connect Your Wallet</h2>
                        <p className="text-gray-600 mb-6">
                          Connect your wallet to claim tokens and earn rewards for your learning achievements
                        </p>
                        <Button 
                          onClick={connectWallet} 
                          disabled={isConnecting}
                          size="lg"
                          className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                        >
                          {isConnecting ? "Connecting..." : "Connect Wallet"}
                        </Button>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                        <div className="text-center p-4 bg-blue-50 rounded-lg">
                          <Coins className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                          <h3 className="font-semibold">Earn Tokens</h3>
                          <p className="text-sm text-gray-600">Complete courses to earn tokens</p>
                        </div>
                        <div className="text-center p-4 bg-green-50 rounded-lg">
                          <Gift className="h-8 w-8 text-green-600 mx-auto mb-2" />
                          <h3 className="font-semibold">Claim Rewards</h3>
                          <p className="text-sm text-gray-600">Redeem tokens for rewards</p>
                        </div>
                        <div className="text-center p-4 bg-purple-50 rounded-lg">
                          <ExternalLink className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                          <h3 className="font-semibold">Future Benefits</h3>
                          <p className="text-sm text-gray-600">Access exclusive features</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  <>
                    {/* Connected Wallet Info */}
                    <Card>
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center">
                            <div className="h-12 w-12 bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center mr-3">
                              <Wallet className="h-6 w-6 text-white" />
                            </div>
                            <div>
                              <h3 className="text-lg font-bold">Wallet Connected</h3>
                              <p className="text-sm text-gray-500">Ready to claim tokens</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm text-gray-500">Address</div>
                            <div className="font-mono text-sm">{address?.slice(0, 6)}...{address?.slice(-4)}</div>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div className="p-3 bg-amber-50 rounded-lg text-center">
                            <Gem className="h-6 w-6 text-amber-600 mx-auto mb-1" />
                            <div className="text-lg font-bold">{loading ? "..." : userGems}</div>
                            <div className="text-xs text-gray-500">Gems Earned</div>
                          </div>
                          <div className="p-3 bg-green-50 rounded-lg text-center">
                            <Coins className="h-6 w-6 text-green-600 mx-auto mb-1" />
                            <div className="text-lg font-bold">{loading ? "..." : Math.floor(userGems * 0.1)}</div>
                            <div className="text-xs text-gray-500">Tokens Available</div>
                          </div>
                        </div>
                        
                        <Button className="w-full mt-4" disabled={true} variant="outline">
                          Claim Tokens (Coming Soon)
                        </Button>
                      </CardContent>
                    </Card>
                    
                    {/* Token Rewards */}
                    <Card>
                      <CardHeader>
                        <CardTitle>Token Rewards</CardTitle>
                        <CardDescription>Complete tasks to earn tokens</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {tokenRewards.map((reward, i) => (
                            <div key={i} className="flex items-center p-3 bg-gray-50 rounded-lg">
                              <div className="h-10 w-10 rounded-lg flex items-center justify-center mr-3 bg-white border border-gray-200">
                                {reward.icon}
                              </div>
                              <div className="flex-1">
                                <h4 className="font-medium">{reward.title}</h4>
                                <p className="text-xs text-gray-500">{reward.description}</p>
                              </div>
                              <div className="flex items-center">
                                <Coins className="h-4 w-4 text-amber-500 mr-1" />
                                <span className="font-bold">{reward.tokens}</span>
                                {reward.unlocked ? (
                                  <Unlock className="h-4 w-4 text-green-500 ml-2" />
                                ) : (
                                  <Lock className="h-4 w-4 text-gray-400 ml-2" />
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </>
                )}
              </div>
              
              {/* Future Token Benefits */}
              <Card>
                <CardHeader>
                  <CardTitle>Future Token Benefits</CardTitle>
                  <CardDescription>What you can do with your tokens</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg">
                      <Gift className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                      <h3 className="font-semibold">Premium Courses</h3>
                      <p className="text-sm text-gray-600">Access exclusive content</p>
                    </div>
                    <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-lg">
                      <Trophy className="h-8 w-8 text-green-600 mx-auto mb-2" />
                      <h3 className="font-semibold">NFT Certificates</h3>
                      <p className="text-sm text-gray-600">Mint achievement NFTs</p>
                    </div>
                    <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg">
                      <ExternalLink className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                      <h3 className="font-semibold">DAO Governance</h3>
                      <p className="text-sm text-gray-600">Participate in decisions</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </main>
      </div>
    </div>
  )
} 