 "use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Menu, X } from "lucide-react"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubmitted(true)
    }
  }

  // Add scroll event listener to detect when page is scrolled
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className={`w-full z-50 transition-all duration-300 ease-in-out ${isScrolled ? 'fixed top-0 left-0 right-0 px-4 sm:px-6 lg:px-8 pt-4' : 'relative border-b border-gray-100'}`}>
        <header className={`max-w-7xl mx-auto ${isScrolled ? 'bg-white rounded-xl shadow-md border border-gray-100 transition-transform duration-300 ease-in-out' : 'bg-white'}`}>
          <div className="flex justify-between items-center h-16 px-6">
            {/* Logo */}
            <Link href="/" className="flex items-center group">
              {/* <img src="/edumeai-logo.png" alt="EduMeAI Logo" className="h-12 mr-1 transition-transform duration-200 ease-in-out group-hover:scale-105" /> */}
              <div className="flex items-center space-x-0.5">
                <span className="text-xl font-bold text-black">EduMe</span>
                <span className="text-xl font-bold text-black bg-black/10 px-1 py-0.5 rounded-md border border-black/20">
                  AI
                </span>
              </div>
            </Link>

            {/* Desktop Navigation - Centered */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link href="/#tutoring" className="text-gray-800 hover:text-black font-medium transition-colors relative group">
                AI Tutoring
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-black scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
              </Link>
              
              <Link href="/#pathfinder" className="text-gray-800 hover:text-black font-medium transition-colors relative group">
                Career Guide
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-black scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
              </Link>
              <Link href="/#exams" className="text-gray-800 hover:text-black font-medium transition-colors relative group">
                Exam Prep
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-black scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
              </Link>
              <Link href="/#skills" className="text-gray-800 hover:text-black font-medium transition-colors relative group">
                Skill Hub
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-black scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
              </Link>
            </nav>

            {/* CTA Button */}
            <div className="hidden md:flex items-center space-x-4">
              <Link href="/login" className="text-gray-800 hover:text-black font-medium transition-colors relative group">
                Log in
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-black scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
              </Link>
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
        <div className={`md:hidden ${isScrolled ? 'fixed top-24 left-4 right-4' : 'relative mt-0 mx-4'} z-50 bg-white rounded-xl shadow-md border border-gray-100`}>
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
            <div className="flex flex-col space-y-2 pt-2 border-t border-gray-100 mt-2">
              <Link href="/login" className="block py-2 text-black hover:text-gray-600">
                Log in
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
        </div>
      )}
      
      {/* Header spacer - only when scrolled */}
      {isScrolled && <div className="h-24"></div>}
      
      <div className="flex flex-col items-center justify-center px-4 py-8">
        <div className="w-full max-w-md">
          {/* Heading */}
          <h1 className="text-2xl font-bold text-center mb-1">Reset your password</h1>
          <p className="text-center text-gray-500 text-sm mb-6">We'll send you a link to reset your password</p>
          
          {/* Form container */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            {submitted ? (
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
                <h3 className="text-lg font-medium mb-2">Check your email</h3>
                <p className="text-gray-600 mb-4 text-sm">
                  We've sent a password reset link to <span className="font-medium">{email}</span>
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                {/* Email input */}
                <div className="mb-4">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-900 mb-1">Email</label>
                  <Input 
                    type="email" 
                    id="email" 
                    placeholder="you@youremail.com" 
                    className="w-full"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                
                {/* Submit button */}
                <Button 
                  type="submit"
                  className="w-full bg-[#0f172a] hover:bg-[#1e293b] text-white py-2 rounded-full flex items-center justify-center gap-2"
                >
                  Send reset link
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </Button>
              </form>
            )}
          </div>
          
          {/* Back to login link */}
          <p className="text-center mt-4 text-gray-600 text-sm">
            <Link href="/login" className="text-blue-600 hover:underline">Back to login</Link>
          </p>
        </div>
      </div>
    </div>
  )
}