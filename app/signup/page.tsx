"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { EyeIcon, EyeOffIcon, Menu, X } from "lucide-react"

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isStudentEmail, setIsStudentEmail] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  // Check if email is a student email
  const checkStudentEmail = (email: string) => {
    const studentDomains = [".edu", "ac.", ".sch.", ".school.", "university.", "college."]
    return studentDomains.some(domain => email.includes(domain))
  }

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value
    setEmail(newEmail)
    setIsStudentEmail(checkStudentEmail(newEmail))
  }

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
                variant="default"
                className="bg-black text-white hover:bg-black/80 px-4 py-1 rounded-[24px] transition-all duration-300"
                asChild
              >
                <Link href="/login">
                  Log in
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
              <Link href="/login">Log in</Link>
            </Button>
          </div>
        </div>
      )}
      
      {/* Header spacer */}
      <div className="h-24"></div>
      
      <div className="flex flex-col items-center justify-center px-4 py-2">
        <div className="w-full max-w-md">
          {/* Avatar images */}
          <div className="flex justify-center mb-2">
            <div className="flex -space-x-2">
              <Image 
                src="/placeholder-user.jpg" 
                alt="User avatar" 
                width={32} 
                height={32} 
                className="rounded-full border-2 border-white"
              />
              <Image 
                src="/placeholder-user.jpg" 
                alt="User avatar" 
                width={32} 
                height={32} 
                className="rounded-full border-2 border-white"
              />
              <Image 
                src="/placeholder-user.jpg" 
                alt="User avatar" 
                width={32} 
                height={32} 
                className="rounded-full border-2 border-white"
              />
              <Image 
                src="/placeholder-user.jpg" 
                alt="User avatar" 
                width={32} 
                height={32} 
                className="rounded-full border-2 border-white"
              />
              <Image 
                src="/placeholder-user.jpg" 
                alt="User avatar" 
                width={32} 
                height={32} 
                className="rounded-full border-2 border-white"
              />
            </div>
          </div>
          
          {/* Join text */}
          <p className="text-center text-gray-500 text-sm mb-1">Join 135,025+ peers.</p>
          
          {/* Heading */}
          <h1 className="text-3xl font-bold text-center mb-3">Create your profile</h1>
          
          {/* Form container */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            {/* Google sign up button */}
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
                onChange={handleEmailChange}
              />
            </div>
            
            {/* Password input */}
            <div className="mb-3">
              <label htmlFor="password" className="block text-sm font-medium text-gray-900 mb-1">Password</label>
              <div className="relative">
                <Input 
                  type={showPassword ? "text" : "password"} 
                  id="password" 
                  placeholder="At least 8 characters" 
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
            </div>
            
            {/* Student email notice */}
            {isStudentEmail && (
              <div className="mb-3 p-2 bg-blue-50 rounded-lg border border-blue-100">
                <p className="text-blue-700 text-xs">
                  <span className="font-semibold">Student account detected!</span> You'll get access to premium learning resources and special discounts.
                </p>
              </div>
            )}
            
            {/* Student email bait - only show if not already using student email */}
            {!isStudentEmail && (
              <div className="mb-3 p-2 bg-gray-50 rounded-lg border border-amber-100">
                <p className="text-amber-700 text-xs">
                  <span className="font-semibold">Have a student email?</span> Sign up with your .edu email for exclusive access to premium learning resources and special discounts!
                </p>
              </div>
            )}
            
            {/* Create profile button */}
            <Button 
              className="w-full bg-[#0f172a] hover:bg-[#1e293b] text-white py-2 rounded-full flex items-center justify-center gap-2"
            >
              Create Profile
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Button>
            
            {/* Terms text */}
            <p className="text-center text-xs text-gray-500 mt-3">
              By clicking "Create Profile" you agree to our{" "}
              <Link href="/code-of-conduct" className="text-gray-700 hover:underline">Code of Conduct</Link>,{" "}
              <Link href="/terms" className="text-gray-700 hover:underline">Terms of Service</Link> and{" "}
              <Link href="/privacy" className="text-gray-700 hover:underline">Privacy Policy</Link>.
            </p>
          </div>
          
          {/* Login link */}
          <p className="text-center mt-3 text-gray-600 text-sm">
            Already have a profile? <Link href="/login" className="text-blue-600 hover:underline">Log in</Link>
          </p>
        </div>
      </div>
    </div>
  )
} 