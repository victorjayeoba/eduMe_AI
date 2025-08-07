"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
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
  Menu,
  X,
  User,
  Globe,
  Shield,
  Bell,
  Moon,
  Sun,
  Smartphone,
  Mail,
  Save,
  Trophy,
} from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"

export default function SettingsPage() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)
  
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
                className="flex items-center px-4 py-2.5 text-white bg-black rounded-lg transition-colors"
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
          {/* Settings Tabs */}
          <Tabs defaultValue="account" className="max-w-4xl mx-auto">
            <TabsList className="mb-6 grid grid-cols-4 w-full">
              <TabsTrigger value="account" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span className="hidden sm:inline">Account</span>
              </TabsTrigger>
              <TabsTrigger value="notifications" className="flex items-center gap-2">
                <Bell className="h-4 w-4" />
                <span className="hidden sm:inline">Notifications</span>
              </TabsTrigger>
              <TabsTrigger value="appearance" className="flex items-center gap-2">
                <Moon className="h-4 w-4" />
                <span className="hidden sm:inline">Appearance</span>
              </TabsTrigger>
              <TabsTrigger value="privacy" className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                <span className="hidden sm:inline">Privacy</span>
              </TabsTrigger>
            </TabsList>
            
            {/* Account Settings */}
            <TabsContent value="account">
              <Card>
                <CardHeader>
                  <CardTitle>Account Settings</CardTitle>
                  <CardDescription>Manage your account information and preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Profile Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Profile Information</h3>
                    
                    <div className="flex flex-col sm:flex-row gap-4 mb-6">
                      {/* Profile Picture */}
                      <div className="flex-shrink-0">
                        <div className="relative h-24 w-24 mx-auto sm:mx-0">
                          <div className="h-24 w-24 rounded-full bg-gray-200 flex items-center justify-center border border-gray-300">
                            <User className="h-12 w-12 text-gray-500" />
                          </div>
                          <Button 
                            size="sm" 
                            variant="secondary"
                            className="absolute bottom-0 right-0 rounded-full h-8 w-8 p-0"
                          >
                            <span className="sr-only">Change Image</span>
                            <PenIcon className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                      </div>
                      
                      {/* Name and Email */}
                      <div className="flex-grow space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="firstName">First Name</Label>
                            <Input id="firstName" defaultValue="John" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="lastName">Last Name</Label>
                            <Input id="lastName" defaultValue="Doe" />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email Address</Label>
                          <Input id="email" type="email" defaultValue="john.doe@example.com" />
                        </div>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    {/* Education */}
                    <h3 className="text-lg font-medium pt-2">Educational Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="institution">Institution</Label>
                        <Input id="institution" defaultValue="University of Lagos" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="course">Course/Program</Label>
                        <Input id="course" defaultValue="Computer Science" />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                      <div className="space-y-2">
                        <Label htmlFor="educationLevel">Education Level</Label>
                        <Input id="educationLevel" defaultValue="Undergraduate" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="gradYear">Graduation Year</Label>
                        <Input id="gradYear" defaultValue="2026" />
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button className="bg-black hover:bg-black/80">
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            {/* Notifications Settings */}
            <TabsContent value="notifications">
              <Card>
                <CardHeader>
                  <CardTitle>Notification Preferences</CardTitle>
                  <CardDescription>Manage how and when you receive notifications</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Notification Channels */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Notification Channels</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label className="text-base">Email Notifications</Label>
                          <p className="text-sm text-gray-500">Receive updates via email</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label className="text-base">Browser Notifications</Label>
                          <p className="text-sm text-gray-500">Get notifications in your browser</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label className="text-base">Mobile Push Notifications</Label>
                          <p className="text-sm text-gray-500">Receive push notifications on your mobile device</p>
                        </div>
                        <Switch />
                      </div>
                    </div>
                  </div>
                  
                  {/* Notification Types */}
                  <div className="space-y-4 pt-4">
                    <h3 className="text-lg font-medium">Notification Types</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label className="text-base">Upcoming Events</Label>
                          <p className="text-sm text-gray-500">Get reminders for your scheduled study sessions</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label className="text-base">New Messages</Label>
                          <p className="text-sm text-gray-500">Be notified when you receive new messages</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label className="text-base">Study Reminders</Label>
                          <p className="text-sm text-gray-500">Get reminders for daily study goals</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label className="text-base">Product Updates</Label>
                          <p className="text-sm text-gray-500">Learn about new features and improvements</p>
                        </div>
                        <Switch />
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button className="bg-black hover:bg-black/80">
                    <Save className="h-4 w-4 mr-2" />
                    Save Preferences
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            {/* Appearance Settings */}
            <TabsContent value="appearance">
              <Card>
                <CardHeader>
                  <CardTitle>Appearance</CardTitle>
                  <CardDescription>Customize how EduMeAI looks for you</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Theme Settings */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Theme</h3>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="flex flex-col items-center border border-gray-200 rounded-lg p-4 cursor-pointer bg-white hover:border-gray-400 ring-2 ring-black">
                        <Sun className="h-8 w-8 mb-2 text-amber-500" />
                        <span className="font-medium">Light</span>
                      </div>
                      <div className="flex flex-col items-center border border-gray-200 rounded-lg p-4 cursor-pointer hover:border-gray-400">
                        <Moon className="h-8 w-8 mb-2 text-blue-500" />
                        <span className="font-medium">Dark</span>
                      </div>
                      <div className="flex flex-col items-center border border-gray-200 rounded-lg p-4 cursor-pointer hover:border-gray-400">
                        <Smartphone className="h-8 w-8 mb-2 text-gray-500" />
                        <span className="font-medium">System</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Accessibility Settings */}
                  <div className="space-y-4 pt-4">
                    <h3 className="text-lg font-medium">Accessibility</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label className="text-base">Reduced Motion</Label>
                          <p className="text-sm text-gray-500">Minimize animations across the interface</p>
                        </div>
                        <Switch />
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label className="text-base">Larger Text</Label>
                          <p className="text-sm text-gray-500">Increase text size for better readability</p>
                        </div>
                        <Switch />
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button className="bg-black hover:bg-black/80">
                    <Save className="h-4 w-4 mr-2" />
                    Save Preferences
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            {/* Privacy Settings */}
            <TabsContent value="privacy">
              <Card>
                <CardHeader>
                  <CardTitle>Privacy & Security</CardTitle>
                  <CardDescription>Manage your privacy and security preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Account Security */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Account Security</h3>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base">Change Password</Label>
                        <p className="text-sm text-gray-500">Update your password regularly for better security</p>
                      </div>
                      <Button variant="outline">Change Password</Button>
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base">Two-Factor Authentication</Label>
                        <p className="text-sm text-gray-500">Add an extra layer of security to your account</p>
                      </div>
                      <Switch />
                    </div>
                  </div>
                  
                  {/* Privacy Controls */}
                  <div className="space-y-4 pt-4">
                    <h3 className="text-lg font-medium">Privacy Controls</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label className="text-base">Profile Visibility</Label>
                          <p className="text-sm text-gray-500">Control who can see your profile information</p>
                        </div>
                        <select className="rounded-md border-gray-300 focus:border-black focus:ring-black px-2 py-1">
                          <option>Everyone</option>
                          <option selected>Only My Classmates</option>
                          <option>Only Me</option>
                        </select>
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label className="text-base">Learning Activity</Label>
                          <p className="text-sm text-gray-500">Share your learning progress with others</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label className="text-base">Data Usage</Label>
                          <p className="text-sm text-gray-500">Allow us to use your data to improve our services</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                    </div>
                  </div>
                  
                  {/* Data Management */}
                  <div className="space-y-4 pt-4">
                    <h3 className="text-lg font-medium">Data Management</h3>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base">Download Your Data</Label>
                        <p className="text-sm text-gray-500">Get a copy of all data associated with your account</p>
                      </div>
                      <Button variant="outline">Download</Button>
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base">Delete Account</Label>
                        <p className="text-sm text-red-500">This action cannot be undone</p>
                      </div>
                      <Button variant="destructive">Delete Account</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}

function PenIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
    </svg>
  )
} 