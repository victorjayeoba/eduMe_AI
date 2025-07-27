"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { EyeIcon, EyeOffIcon, Menu, X } from "lucide-react"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 lg:px-8 pt-4">
        <header className="max-w-7xl mx-auto bg-white rounded-xl shadow-md border border-gray-100">
          <div className="flex justify-between items-center h-16 px-6">
            {/* Logo */}
            <div className="flex items-center">
              <Link href="/">
                <img src="/edumeai-logo.png" alt="EduMeAI Logo" className="h-12 mr-1" />
              </Link>
              <div className="flex items-center space-x-0.5">
                <span className="text-xl font-bold text-black">EduMe</span>
                <span className="text-xl font-bold text-black bg-black/10 px-1 py-0.5 rounded-md border border-black/20">
                  AI
                </span>
              </div>
            </div>

            {/* Desktop Navigation - Centered */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link href="/#tutoring" className="text-gray-800 hover:text-black font-medium transition-colors">
                AI Tutoring
              </Link>
              <Link href="/#pathfinder" className="text-gray-800 hover:text-black font-medium transition-colors">
                Career Guide
              </Link>
              <Link href="/#exams" className="text-gray-800 hover:text-black font-medium transition-colors">
                Exam Prep
              </Link>
              <Link href="/#skills" className="text-gray-800 hover:text-black font-medium transition-colors">
                Skill Hub
              </Link>
            </nav>

            {/* CTA Button */}
            <div className="hidden md:block">
              <Button
                size="sm"
                variant="outline"
                className="border-black text-black hover:bg-black hover:text-white px-4 py-1 rounded-[24px] transition-all duration-300 relative overflow-hidden group"
                asChild
              >
                <Link href="/signup">
                  <span className="relative z-10">Sign Up</span>
                  <span className="absolute inset-0 bg-black scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                </Link>
              </Button>
            </div>

            {/* Mobile menu button */}
            <button className="md:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-6 w-6 text-black" /> : <Menu className="h-6 w-6 text-black" />}
            </button>
          </div>
        </header>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden fixed top-24 left-4 right-4 z-50 bg-white rounded-xl shadow-md border border-gray-100">
          <div className="px-4 py-2 space-y-2">
            <Link href="/#tutoring" className="block py-2 text-black hover:text-gray-600">
              AI Tutoring
            </Link>
            
            <Link href="/#pathfinder" className="block py-2 text-black hover:text-gray-600">
              Career Guide
            </Link>
            <Link href="/#exams" className="block py-2 text-black hover:text-gray-600">
              Exam Prep
            </Link>
            <Link href="/#skills" className="block py-2 text-black hover:text-gray-600">
              Skill Hub
            </Link>
            <Button
              size="sm"
              className="bg-black hover:bg-black/80 text-white px-4 w-full rounded-[24px] transition-all duration-300 mt-2"
              asChild
            >
              <Link href="/signup">Sign Up</Link>
            </Button>
          </div>
        </div>
      )}
      
      {/* Header spacer */}
      <div className="h-24"></div>
      
      <div className="flex flex-col items-center justify-center px-4 py-6">
        <div className="w-full max-w-md">
          {/* Welcome text */}
          <h2 className="text-2xl text-center text-gray-500 mb-1">Welcome back!</h2>
          
          {/* Heading */}
          <h1 className="text-3xl font-bold text-center mb-4">Login to your account</h1>
          
          {/* Form container */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            {/* Google login button */}
            <button className="w-full flex items-center justify-center gap-2 border border-gray-300 rounded-full py-2 px-4 mb-4 transition-colors hover:bg-gray-50">
              <Image src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" width={20} height={20} />
              <span className="text-gray-700">Continue with Google</span>
            </button>
            
            {/* Divider */}
            <div className="flex items-center mb-4">
              <div className="flex-grow h-px bg-gray-200"></div>
              <span className="px-4 text-sm text-gray-500">or continue with email</span>
              <div className="flex-grow h-px bg-gray-200"></div>
            </div>
            
            {/* Email input */}
            <div className="mb-3">
              <label htmlFor="email" className="block text-sm font-medium text-gray-900 mb-1">Email</label>
              <Input 
                type="email" 
                id="email" 
                placeholder="you@youremail.com" 
                className="w-full"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            
            {/* Password input */}
            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium text-gray-900 mb-1">Password</label>
              <div className="relative">
                <Input 
                  type={showPassword ? "text" : "password"} 
                  id="password" 
                  placeholder="Your password" 
                  className="w-full pr-10"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button 
                  type="button" 
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOffIcon size={18} /> : <EyeIcon size={18} />}
                </button>
              </div>
              <div className="flex justify-end mt-1">
                <Link href="/forgot-password" className="text-sm text-gray-500 hover:text-gray-700">
                  Forgot Password?
                </Link>
              </div>
            </div>
            
            {/* Login button */}
            <Button 
              className="w-full bg-[#0f172a] hover:bg-[#1e293b] text-white py-2 rounded-full flex items-center justify-center gap-2"
            >
              Login
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Button>
            
            {/* Special student offer */}
            <div className="mt-4 p-2 bg-amber-50 rounded-lg border border-amber-100">
              <p className="text-amber-700 text-xs">
                <span className="font-semibold">🎓 Student?</span> Log in with your student email to unlock exclusive learning resources and special discounts!
              </p>
            </div>
          </div>
          
          {/* Signup link */}
          <p className="text-center mt-4 text-gray-600 text-sm">
            Don't have a EduMeAI profile? <Link href="/signup" className="text-blue-600 hover:underline">Create One!</Link>
          </p>
        </div>
      </div>
    </div>
  )
} 