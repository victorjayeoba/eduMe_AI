"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X, UserCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/contexts/auth-context"
import {
  Hero,
  Features,
  AITutorDemo,
  CareerGuide,
  ProcessFlow,
  ExamPrep,
  SkillHub,
  Rewards,
  Partners,
  Footer
} from "@/components/landing"

export default function EduMeAiLanding() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { user, logOut } = useAuth()

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

  // Smooth scroll to section
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth'
      })
    }
    setIsMenuOpen(false)
  }

  const handleLogout = async () => {
    try {
      await logOut();
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <div className="min-h-screen ">
      {/* Header */}
      <div className={`w-full z-50 transition-all duration-300 ease-in-out fixed top-0 left-0 right-0 px-4 sm:px-6 lg:px-8 pt-4`}>
        <header className={`max-w-7xl mx-auto ${isScrolled ? 'bg-white/70 backdrop-blur-md rounded-full shadow-md border border-gray-100/50 transition-transform duration-300 ease-in-out' : 'bg-transparent'}`}>
          <div className="flex justify-between items-center h-12 md:h-20 px-6">
            {/* Logo */}
            <Link href="/" className="flex items-center group">
             
              <div className="flex items-center space-x-0.5">
                <span className="text-xl font-bold text-black">EduMe</span>
                <span className="text-xl font-bold text-black bg-black/10 px-1 py-0.5 rounded-md border border-black/20">
                  AI
                </span>
              </div>
            </Link>

            {/* Desktop Navigation - Centered */}
            <nav className="hidden md:flex items-center space-x-12">
              <a 
                href="#tutoring" 
                onClick={(e) => scrollToSection(e, 'tutoring')}
                className="text-gray-800 hover:text-black font-medium transition-colors relative group"
              >
                AI Tutoring
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-black scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
              </a>
              <a 
                href="#pathfinder" 
                onClick={(e) => scrollToSection(e, 'pathfinder')}
                className="text-gray-800 hover:text-black font-medium transition-colors relative group"
              >
                Career Guide
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-black scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
              </a>
              <a 
                href="#exams" 
                onClick={(e) => scrollToSection(e, 'exams')}
                className="text-gray-800 hover:text-black font-medium transition-colors relative group"
              >
                Exam Prep
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-black scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
              </a>
              <a 
                href="#skills" 
                onClick={(e) => scrollToSection(e, 'skills')}
                className="text-gray-800 hover:text-black font-medium transition-colors relative group"
              >
                Skill Hub
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-black scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
              </a>
            </nav>

            {/* CTA Button */}
            <div className="hidden md:flex items-center space-x-4">
              {user ? (
                <>
                  <Link href="/dashboard" className="text-gray-800 hover:text-black font-medium transition-colors relative group">
                    Dashboard
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-black scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                  </Link>
                  <div className="flex items-center space-x-2">
                    <UserCircle className="w-5 h-5 text-gray-700" />
                    <span className="text-sm font-medium truncate max-w-[120px]">
                      {user.email?.split('@')[0] || 'User'}
                    </span>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-black text-black hover:bg-black hover:text-white px-6 py-2 rounded-[24px] transition-all duration-300 relative overflow-hidden group"
                    onClick={handleLogout}
                  >
                    <span className="relative z-10">Log Out</span>
                    <span className="absolute inset-0 bg-black scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                  </Button>
                </>
              ) : (
                <>
                  <Link href="/login" className="text-gray-800 hover:text-black font-medium transition-colors relative group">
                    Log in
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-black scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                  </Link>
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-black text-black hover:bg-black hover:text-white px-6 py-2 rounded-[24px] transition-all duration-300 relative overflow-hidden group"
                    asChild
                  >
                    <Link href="/signup">
                      <span className="relative z-10">Sign Up</span>
                      <span className="absolute inset-0 bg-black scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                    </Link>
                  </Button>
                </>
              )}
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
        <div className={`md:hidden ${isScrolled ? 'fixed top-24 left-4 right-4' : 'relative mt-0 mx-4'} z-50 bg-white/80 backdrop-blur-md rounded-xl shadow-md border border-gray-100/50`}>
            <div className="px-4 py-2 space-y-2">
            {user && (
              <Link href="/dashboard" className="block py-2 text-black hover:text-gray-600">
                Dashboard
              </Link>
            )}
            <a 
              href="#tutoring" 
              onClick={(e) => scrollToSection(e, 'tutoring')}
              className="block py-2 text-black hover:text-gray-600"
            >
              AI Tutoring
            </a>
            
            <a 
              href="#pathfinder" 
              onClick={(e) => scrollToSection(e, 'pathfinder')}
              className="block py-2 text-black hover:text-gray-600"
            >
              Career Guide
            </a>
            <a 
              href="#exams" 
              onClick={(e) => scrollToSection(e, 'exams')}
              className="block py-2 text-black hover:text-gray-600"
            >
              Exam Prep
            </a>
            <a 
              href="#skills" 
              onClick={(e) => scrollToSection(e, 'skills')}
              className="block py-2 text-black hover:text-gray-600"
            >
              Skill Hub
            </a>
            <div className="flex flex-col space-y-2 pt-2 border-t border-gray-100 mt-2">
              {user ? (
                <>
                  <div className="flex items-center py-2">
                    <UserCircle className="w-5 h-5 text-gray-700 mr-2" />
                    <span className="text-sm font-medium truncate">{user.email?.split('@')[0] || 'User'}</span>
                  </div>
                  <Button
                    size="sm"
                    className="bg-black hover:bg-black/80 text-white px-4 w-full rounded-[24px] transition-all duration-300 mt-2"
                    onClick={handleLogout}
                  >
                    Log Out
                  </Button>
                </>
              ) : (
                <>
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
                </>
              )}
            </div>
            </div>
          </div>
        )}
      
      {/* Header spacer - always present */}
      <div className="h-32"></div>

      {/* Main Content */}
      <Hero />
      <Features />
      <AITutorDemo />
      <CareerGuide />
      <ProcessFlow />
      <ExamPrep />
      <SkillHub />
      <Rewards />
      <Partners />
      <Footer />
    </div>
  )
}
