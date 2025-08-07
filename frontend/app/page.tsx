"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X, UserCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/contexts/auth-context"
import AnimatedGradient from "@/components/ui/animated-gradient"
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
import Aurora from "@/components/react-bits/Aurora"
import { useWallet } from "@/contexts/wallet-context";

export default function EduMeAiLanding() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { user, logOut } = useAuth()
  const { address, isConnecting, connectWallet, disconnectWallet } = useWallet();

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
    <div className="relative min-h-screen ">
                  <AnimatedGradient 
          width="100%" 
          height="400px"
          blur="blur-md"
          animationDuration={15}
          zIndex={5}
          borderRadius="rounded-b-[100%]"
        />
      {/* Header */}
  


      <div className={`w-full z-[9999] transition-all duration-300 ease-in-out fixed top-0 left-0 right-0 px-4 sm:px-6 lg:px-8 pt-4`}>
        <header className={`max-w-7xl mx-auto ${isScrolled ? 'bg-black/40 backdrop-blur-md rounded-full shadow-md border border-gray-800/30 text-white transition-transform duration-300 ease-in-out' : 'bg-transparent'}`}>
          <div className="flex justify-between items-center h-12 md:h-20 px-6">
            {/* Logo */}
            <Link href="/" className="flex items-center group">
             
              <div className="flex items-center space-x-0.5">
                <span className={`text-xl font-bold ${isScrolled ? 'text-white' : 'text-black'}`}>EduMe</span>
                <span className={`text-xl font-bold ${isScrolled ? 'text-white bg-white/20' : 'text-black bg-black/10'} px-1 py-0.5 rounded-md ${isScrolled ? 'border-white/30' : 'border-black/20'} border`}>
                  AI
                </span>
              </div>
            </Link>

            {/* Desktop Navigation - Centered */}
            <nav className="hidden md:flex items-center space-x-12">
              <a 
                href="#tutoring" 
                onClick={(e) => scrollToSection(e, 'tutoring')}
                className={`${isScrolled ? 'text-gray-200 hover:text-white' : 'text-gray-800 hover:text-black'} font-medium transition-colors relative group`}
              >
                AI Tutoring
                <span className={`absolute bottom-0 left-0 w-full h-0.5 ${isScrolled ? 'bg-white' : 'bg-black'} scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left`}></span>
              </a>
              <a 
                href="#pathfinder" 
                onClick={(e) => scrollToSection(e, 'pathfinder')}
                className={`${isScrolled ? 'text-gray-200 hover:text-white' : 'text-gray-800 hover:text-black'} font-medium transition-colors relative group`}
              >
                Career Guide
                <span className={`absolute bottom-0 left-0 w-full h-0.5 ${isScrolled ? 'bg-white' : 'bg-black'} scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left`}></span>
              </a>
              <a 
                href="#exams" 
                onClick={(e) => scrollToSection(e, 'exams')}
                className={`${isScrolled ? 'text-gray-200 hover:text-white' : 'text-gray-800 hover:text-black'} font-medium transition-colors relative group`}
              >
                Exam Prep
                <span className={`absolute bottom-0 left-0 w-full h-0.5 ${isScrolled ? 'bg-white' : 'bg-black'} scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left`}></span>
              </a>
              <a 
                href="#skills" 
                onClick={(e) => scrollToSection(e, 'skills')}
                className={`${isScrolled ? 'text-gray-200 hover:text-white' : 'text-gray-800 hover:text-black'} font-medium transition-colors relative group`}
              >
                Skill Hub
                <span className={`absolute bottom-0 left-0 w-full h-0.5 ${isScrolled ? 'bg-white' : 'bg-black'} scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left`}></span>
              </a>
            </nav>

            {/* CTA Button */}
            <div className="hidden md:flex items-center space-x-4">
              {user ? (
                <>
                  <Link href="/dashboard" className={`${isScrolled ? 'text-gray-200 hover:text-white' : 'text-gray-800 hover:text-black'} font-medium transition-colors relative group`}>
                    Dashboard
                    <span className={`absolute bottom-0 left-0 w-full h-0.5 ${isScrolled ? 'bg-white' : 'bg-black'} scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left`}></span>
                  </Link>
                  <div className="flex items-center space-x-2">
                    <UserCircle className={`w-5 h-5 ${isScrolled ? 'text-gray-300' : 'text-gray-700'}`} />
                    <span className={`text-sm font-medium truncate max-w-[120px] ${isScrolled ? 'text-white' : ''}`}>
                      {user.email?.split('@')[0] || 'User'}
                    </span>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    className={`${isScrolled ? 'border-white text-black hover:bg-transparent hover:text-white' : 'border-black text-black hover:bg-black hover:text-white'} px-6 py-2 rounded-[24px] transition-all duration-300 relative overflow-hidden group`}
                    onClick={handleLogout}
                  >
                    <span className="relative z-10">Log Out</span>
                    <span className={`absolute inset-0 ${isScrolled ? 'bg-transparent' : 'bg-black'} scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left`}></span>
                  </Button>
                </>
              ) : (
                <>
                  <Link href="/login" className={`${isScrolled ? 'text-gray-200 hover:text-white' : 'text-gray-800 hover:text-black'} font-medium transition-colors relative group`}>
                    Log in
                    <span className={`absolute bottom-0 left-0 w-full h-0.5 ${isScrolled ? 'bg-white' : 'bg-black'} scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left`}></span>
                  </Link>
                  <Button
                    size="sm"
                    variant="outline"
                    className={`${isScrolled ? 'border-white text-white hover:bg-white hover:text-black' : 'border-black text-black hover:bg-black hover:text-white'} px-6 py-2  bg-transparent rounded-[24px] transition-all duration-300 relative overflow-hidden group`}
                    asChild
                  >
                    <Link className={`${isScrolled ? 'text-black' : ''}`} href="/signup">
                      <span className={`relative z-10`}>Sign Up</span>
                      <span className={`absolute inset-0 ${isScrolled ? 'bg-white' : 'bg-black'} scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left`}></span>
                    </Link>
                  </Button>
                </>
              )}
              {/* Wallet Button */}
              {address ? (
                <Button
                  size="sm"
                  variant="outline"
                  className="border-emerald-500 text-emerald-600 bg-emerald-50 hover:bg-emerald-100 px-4 py-2 rounded-[24px] font-mono"
                  onClick={disconnectWallet}
                  title={address}
                >
                  {address.slice(0, 6)}...{address.slice(-4)}
                </Button>
              ) : (
                <Button
                  size="sm"
                  variant="outline"
                  className="border-emerald-500 text-emerald-600 bg-white hover:bg-emerald-50 px-4 py-2 rounded-[24px]"
                  onClick={connectWallet}
                  disabled={isConnecting}
                >
                  {isConnecting ? 'Connecting...' : 'Connect Wallet'}
                </Button>
              )}
            </div>

            {/* Mobile menu button */}
            <button className="md:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className={`h-6 w-6 ${isScrolled ? 'text-white' : 'text-black'}`} /> : <Menu className={`h-6 w-6 ${isScrolled ? 'text-white' : 'text-black'}`} />}
            </button>
          </div>
        </header>
 
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
        <div className={`md:hidden ${isScrolled ? 'fixed top-24 left-4 right-4' : 'fixed mt-[70px] w-[95%] mx-4 ml-[10px'} z-50 ${isScrolled ? 'bg-black/80 text-white' : 'bg-white/80'} backdrop-blur-md rounded-xl z-[9999] shadow-md ${isScrolled ? 'border-gray-700/50' : 'border-gray-100/50'} border`}>
            <div className="px-6 py-2 space-y-2">
            {user && (
              <Link href="/dashboard" className={`block py-2 ${isScrolled ? 'text-white hover:text-gray-300' : 'text-black hover:text-gray-600'}`}>
                Dashboard
              </Link>
            )}
            <a 
              href="#tutoring" 
              onClick={(e) => scrollToSection(e, 'tutoring')}
              className={`block py-2 ${isScrolled ? 'text-white hover:text-gray-300' : 'text-black hover:text-gray-600'}`}
            >
              AI Tutoring
            </a>
            
            <a 
              href="#pathfinder" 
              onClick={(e) => scrollToSection(e, 'pathfinder')}
              className={`block py-2 ${isScrolled ? 'text-white hover:text-gray-300' : 'text-black hover:text-gray-600'}`}
            >
              Career Guide
            </a>
            <a 
              href="#exams" 
              onClick={(e) => scrollToSection(e, 'exams')}
              className={`block py-2 ${isScrolled ? 'text-white hover:text-gray-300' : 'text-black hover:text-gray-600'}`}
            >
              Exam Prep
            </a>
            <a 
              href="#skills" 
              onClick={(e) => scrollToSection(e, 'skills')}
              className={`block py-2 ${isScrolled ? 'text-white hover:text-gray-300' : 'text-black hover:text-gray-600'}`}
            >
              Skill Hub
            </a>
            <div className={`flex flex-col space-y-2 pt-2 ${isScrolled ? 'border-gray-700' : 'border-gray-100'} border-t mt-2`}>
              {user ? (
                <>
                  <div className="flex items-center py-2">
                    <UserCircle className={`w-5 h-5 ${isScrolled ? 'text-gray-300' : 'text-gray-700'} mr-2`} />
                    <span className="text-sm font-medium truncate">{user.email?.split('@')[0] || 'User'}</span>
                  </div>
                  <Button
                    size="sm"
                    className={`${isScrolled ? 'bg-white hover:bg-white/80 text-black' : 'bg-black hover:bg-black/80 text-white'} px-4 w-full rounded-[24px] transition-all duration-300 mt-2`}
                    onClick={handleLogout}
                  >
                    Log Out
                  </Button>
                </>
              ) : (
                <>
                  <Link href="/login" className={`block py-2 ${isScrolled ? 'text-white hover:text-gray-300' : 'text-black hover:text-gray-600'}`}>
                    Log in
                  </Link>
                  <Button
                    size="sm"
                    className={`${isScrolled ? 'bg-white hover:bg-white/80 text-black' : 'bg-black hover:bg-black/80 text-white'} px-4 w-full rounded-[24px] transition-all duration-300 mt-2`}
                    asChild
                  >
                    <Link href="/signup">Sign Up</Link>
                  </Button>
                </>
              )}
              {/* Wallet Button (Mobile) */}
              {address ? (
                <Button
                  size="sm"
                  variant="outline"
                  className="border-emerald-500 text-emerald-600 bg-emerald-50 hover:bg-emerald-100 px-4 w-full rounded-[24px] font-mono"
                  onClick={disconnectWallet}
                  title={address}
                >
                  {address.slice(0, 6)}...{address.slice(-4)}
                </Button>
              ) : (
                <Button
                  size="sm"
                  variant="outline"
                  className="border-emerald-500 text-emerald-600 bg-white hover:bg-emerald-50 px-4 w-full rounded-[24px]"
                  onClick={connectWallet}
                  disabled={isConnecting}
                >
                  {isConnecting ? 'Connecting...' : 'Connect Wallet'}
                </Button>
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
  
      <SkillHub />
      <Rewards />
      <Partners />
      <Footer />
    </div>
  )
}
