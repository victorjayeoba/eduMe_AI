"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Marquee from "react-fast-marquee"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Video,
  MessageSquare,
  PenTool,
  Play,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  Mic,
  MicOff,
  VideoIcon,
  VideoOff,
  Highlighter,
  Eraser,
  BookOpen,
  GraduationCap,
  Award,
  Target,
  Brain,
  Clock,
} from "lucide-react"
import Link from "next/link"

// Partner data with logos
const partnersData = [
  { name: "Damocles", logo: "/damocles.jpg" },
  { name: "Data Science Nigeria (OAU)", logo: "/dsn.png" },
  { name: "Educhain", logo: "/educhain.png" },
  { name: "Google Developer Group (OAU)", logo: "/gdg.png" },
  { name: "Obafemi Awolowo University", logo: "/oau.png" },
  { name: "HackerX Africa", logo: "/hackerx.jpg" },
  { name: "Open Campus", logo: "/opencampus.jpg" },
  { name: "University of Lagos", logo: "/unilag.png" },
  { name: "Sail Fish", logo: "/sailfish.png" },
  { name: "She Code Africa (OAU)", logo: "/scaoau.jpg" },
  { name: "University of Ibadan", logo: "/ui.jpg" },
  // Duplicate partners to create a seamless loop
  { name: "Damocles", logo: "/damocles.jpg" },
  { name: "Data Science Nigeria (OAU)", logo: "/dsn.png" },
  { name: "Educhain", logo: "/educhain.png" },
  { name: "Google Developer Group (OAU)", logo: "/gdg.png" },
  { name: "Obafemi Awolowo University", logo: "/oau.png" },
  { name: "HackerX Africa", logo: "/hackerx.jpg" },
  { name: "Open Campus", logo: "/opencampus.jpg" },
  { name: "University of Lagos", logo: "/unilag.png" },
  { name: "Sail Fish", logo: "/sailfish.png" },
  { name: "She Code Africa (OAU)", logo: "/scaoau.jpg" },
  { name: "University of Ibadan", logo: "/ui.jpg" },
]

export default function EduMeAiLanding() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [isVideoOn, setIsVideoOn] = useState(true)
  const [chatMessages, setChatMessages] = useState([
    { id: 1, text: "Hi! I'm struggling with this calculus problem.", sender: "student", visible: false },
    { id: 2, text: "I'd be happy to help! Let me see what you're working on.", sender: "ai", visible: false },
    { id: 3, text: "Can you walk me through derivatives step by step?", sender: "student", visible: false },
  ])

  useEffect(() => {
    const showMessages = async () => {
      for (let i = 0; i < chatMessages.length; i++) {
        await new Promise((resolve) => setTimeout(resolve, 1500))
        setChatMessages((prev) => prev.map((msg, index) => (index === i ? { ...msg, visible: true } : msg)))
      }
    }
    showMessages()
  }, [])

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 lg:px-8 pt-4">
        <header className="max-w-7xl mx-auto bg-white rounded-xl shadow-md border border-gray-100">
          <div className="flex justify-between items-center h-20 px-6">
            {/* Logo */}
            <div className="flex items-center">
              <img src="/edumeai-logo.png" alt="EduMeAI Logo" className="h-16 mr-1" />
              <div className="flex items-center space-x-0.5">
                <span className="text-xl font-bold text-black">EduMe</span>
                <span className="text-xl font-bold text-black bg-black/10 px-1 py-0.5 rounded-md border border-black/20">
                  AI
                </span>
              </div>
            </div>

            {/* Desktop Navigation - Centered */}
            <nav className="hidden md:flex items-center space-x-12">
              <a href="#tutoring" className="text-gray-800 hover:text-black font-medium transition-colors">
                AI Tutoring
              </a>
              
              <a href="#pathfinder" className="text-gray-800 hover:text-black font-medium transition-colors">
                Career Guide
              </a>
              <a href="#exams" className="text-gray-800 hover:text-black font-medium transition-colors">
                Exam Prep
              </a>
              <a href="#skills" className="text-gray-800 hover:text-black font-medium transition-colors">
                Skill Hub
              </a>
            </nav>

            {/* CTA Button */}
            <div className="hidden md:flex items-center space-x-4">
              <Link href="/login" className="text-gray-800 hover:text-black font-medium transition-colors">
                Log in
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
            <a href="#tutoring" className="block py-2 text-black hover:text-gray-600">
              AI Tutoring
            </a>
            
            <a href="#pathfinder" className="block py-2 text-black hover:text-gray-600">
              Career Guide
            </a>
            <a href="#exams" className="block py-2 text-black hover:text-gray-600">
              Exam Prep
            </a>
            <a href="#skills" className="block py-2 text-black hover:text-gray-600">
              Skill Hub
            </a>
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
      
      {/* Header spacer */}
      <div className="h-32"></div>

      {/* Hero Section */}
      <section className="relative min-h-[calc(100vh-8rem)] flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url('/edume-hero.webp')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="absolute inset-0 bg-black/50"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Your AI-Powered Live Tutor,
            <br />
            <span className="text-white">Anytime, Anywhere.</span>
          </h1>

          <p className="text-lg md:text-xl text-gray-200 mb-12 max-w-2xl mx-auto leading-relaxed">
            Experience personalized learning with our advanced AI tutoring platform. Get instant help, interactive
            whiteboard sessions, and adaptive learning paths tailored just for you.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              className="bg-white/90 hover:bg-white text-black px-8 py-4 text-lg rounded-[48px] transition-all duration-300"
            >
              Get Started
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white/10 px-8 py-4 text-lg rounded-[48px] transition-all duration-300 bg-transparent"
            >
              <Play className="w-5 h-5 mr-2" />
              See Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="solutions" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-black mb-4">Our Learning Solutions</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Comprehensive tools to support your educational journey, powered by advanced AI
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="bg-gray-50 border-0 shadow-sm hover:shadow-md transition-shadow duration-300">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-black/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Video className="w-8 h-8 text-black" />
                </div>
                <h3 className="text-xl font-bold text-black mb-4">AI Video Tutoring</h3>
                <p className="text-gray-600 leading-relaxed">
                  Connect with human-like AI tutors through interactive video sessions. Get personalized help on any subject, anytime.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gray-50 border-0 shadow-sm hover:shadow-md transition-shadow duration-300">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-black/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 text-black">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-black mb-4">Career Guide</h3>
                <p className="text-gray-600 leading-relaxed">
                  Discover your ideal university courses based on your interests, strengths, and career aspirations through our AI-guided assessment.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gray-50 border-0 shadow-sm hover:shadow-md transition-shadow duration-300">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-black/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 text-black">
                    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
                    <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
                    <path d="M9 14l2 2 4-4"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-black mb-4">Exam Preparation</h3>
                <p className="text-gray-600 leading-relaxed">
                  Specialized prep courses for JAMB, WAEC, IELTS, TOEFL, and other standardized tests with personalized study plans.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gray-50 border-0 shadow-sm hover:shadow-md transition-shadow duration-300">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-black/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 text-black">
                    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-black mb-4">Skill Hub</h3>
                <p className="text-gray-600 leading-relaxed">
                  Develop essential digital and soft skills beyond academics with practical courses designed for real-world success.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Process Flow Section */}
      <section id="process" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Beginner to Expert Slider */}
          <div className="flex justify-between items-center mb-16">
            <div className="text-gray-600 font-semibold text-xl">Beginner</div>
            <div className="flex-1 mx-8 relative">
              <div className="h-4 bg-gradient-to-r from-white via-gray-500 to-black rounded-full overflow-hidden shadow-inner">
                <div className="h-full w-full bg-gradient-to-r from-white via-gray-500 to-black opacity-30 animate-fade-gradient"></div>
              </div>
            </div>
            <div className="text-gray-600 font-semibold text-xl">Expert</div>
          </div>

          <style jsx>{`
            @keyframes fade-gradient {
              0% { opacity: 0.1; }
              50% { opacity: 0.4; }
              100% { opacity: 0.1; }
            }
            
            .animate-fade-gradient {
              animation: fade-gradient 3s ease-in-out infinite;
            }
          `}</style>

          {/* Process Steps */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 relative">
            {/* Step 1 */}
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center mb-6">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#333333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="2" ry="2"></rect>
                  <circle cx="12" cy="12" r="4"></circle>
                  <line x1="2" y1="12" x2="4" y2="12"></line>
                  <line x1="20" y1="12" x2="22" y2="12"></line>
                  <line x1="12" y1="2" x2="12" y2="4"></line>
                  <line x1="12" y1="20" x2="12" y2="22"></line>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Engage with your AI tutor</h3>
            </div>

            {/* Arrow 1 */}
            <div className="hidden lg:block absolute left-[22%] top-[20%] w-[8%]">
              <svg width="113" height="68" viewBox="0 0 113 68" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
                <g id="Hand-drawn arrow">
                  <path id="Vector" d="M109.384 31.8077C110.301 32.4237 110.545 33.6664 109.928 34.5832C109.312 35.5001 108.07 35.7439 107.153 35.1279L109.384 31.8077ZM3.6957 35.4857C2.84714 36.1928 1.58602 36.0781 0.878893 35.2296C0.17176 34.381 0.286409 33.1199 1.13497 32.4128L3.6957 35.4857ZM102.235 10.9003C101.939 9.83619 102.561 8.7335 103.625 8.43742C104.69 8.14133 105.792 8.76397 106.088 9.82812L102.235 10.9003ZM109.726 30.3626L111.653 29.8265L111.653 29.8282L109.726 30.3626ZM106.583 36.8336L105.812 34.9884L105.814 34.9876L106.583 36.8336ZM87.9492 46.7912C86.9301 47.2172 85.7586 46.7364 85.3326 45.7173C84.9065 44.6982 85.3873 43.5267 86.4064 43.1007L87.9492 46.7912ZM108.268 33.4678C107.153 35.1279 107.153 35.1281 107.154 35.1283C107.154 35.1282 107.154 35.1283 107.153 35.1282C107.153 35.128 107.153 35.1276 107.151 35.1268C107.149 35.1253 107.145 35.1227 107.14 35.1189C107.128 35.1114 107.11 35.0994 107.085 35.083C107.036 35.0503 106.959 35.0003 106.857 34.9343C106.653 34.8022 106.345 34.6059 105.94 34.3553C105.13 33.8543 103.934 33.1368 102.404 32.2827C99.344 30.5735 94.9591 28.3224 89.6774 26.1639C79.0798 21.833 65.0394 17.9442 50.9002 19.3962L50.4916 15.4171C65.5573 13.87 80.3032 18.0118 91.1906 22.4612C96.6515 24.6929 101.184 27.0194 104.355 28.7903C105.941 29.6763 107.189 30.4244 108.045 30.954C108.473 31.2188 108.803 31.4291 109.028 31.5747C109.141 31.6475 109.227 31.7042 109.287 31.7434C109.317 31.7631 109.34 31.7783 109.356 31.7891C109.364 31.7945 109.37 31.7987 109.375 31.8019C109.377 31.8034 109.379 31.8047 109.381 31.8057C109.381 31.8061 109.382 31.8067 109.383 31.8069C109.383 31.8074 109.384 31.8077 108.268 33.4678ZM50.9002 19.3962C22.0976 22.354 7.14406 32.612 3.6957 35.4857L1.13497 32.4128C5.18433 29.0383 20.8842 18.4576 50.4916 15.4171L50.9002 19.3962ZM106.088 9.82812L111.653 29.8265L107.799 30.8987L102.235 10.9003L106.088 9.82812ZM111.653 29.8282C112.653 33.4351 110.82 37.234 107.353 38.6796L105.814 34.9876C107.412 34.3214 108.262 32.568 107.799 30.897L111.653 29.8282ZM107.355 38.6789L87.9492 46.7912L86.4064 43.1007L105.812 34.9884L107.355 38.6789Z" fill="#9CA3AF"/>
                </g>
              </svg>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center mb-6">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#333333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Input your problem</h3>
            </div>

            {/* Arrow 2 */}
            <div className="hidden lg:block absolute left-[47%] top-[20%] w-[8%]">
              <svg width="113" height="68" viewBox="0 0 113 68" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
                <g id="Hand-drawn arrow">
                  <path id="Vector" d="M109.384 31.8077C110.301 32.4237 110.545 33.6664 109.928 34.5832C109.312 35.5001 108.07 35.7439 107.153 35.1279L109.384 31.8077ZM3.6957 35.4857C2.84714 36.1928 1.58602 36.0781 0.878893 35.2296C0.17176 34.381 0.286409 33.1199 1.13497 32.4128L3.6957 35.4857ZM102.235 10.9003C101.939 9.83619 102.561 8.7335 103.625 8.43742C104.69 8.14133 105.792 8.76397 106.088 9.82812L102.235 10.9003ZM109.726 30.3626L111.653 29.8265L111.653 29.8282L109.726 30.3626ZM106.583 36.8336L105.812 34.9884L105.814 34.9876L106.583 36.8336ZM87.9492 46.7912C86.9301 47.2172 85.7586 46.7364 85.3326 45.7173C84.9065 44.6982 85.3873 43.5267 86.4064 43.1007L87.9492 46.7912ZM108.268 33.4678C107.153 35.1279 107.153 35.1281 107.154 35.1283C107.154 35.1282 107.154 35.1283 107.153 35.1282C107.153 35.128 107.153 35.1276 107.151 35.1268C107.149 35.1253 107.145 35.1227 107.14 35.1189C107.128 35.1114 107.11 35.0994 107.085 35.083C107.036 35.0503 106.959 35.0003 106.857 34.9343C106.653 34.8022 106.345 34.6059 105.94 34.3553C105.13 33.8543 103.934 33.1368 102.404 32.2827C99.344 30.5735 94.9591 28.3224 89.6774 26.1639C79.0798 21.833 65.0394 17.9442 50.9002 19.3962L50.4916 15.4171C65.5573 13.87 80.3032 18.0118 91.1906 22.4612C96.6515 24.6929 101.184 27.0194 104.355 28.7903C105.941 29.6763 107.189 30.4244 108.045 30.954C108.473 31.2188 108.803 31.4291 109.028 31.5747C109.141 31.6475 109.227 31.7042 109.287 31.7434C109.317 31.7631 109.34 31.7783 109.356 31.7891C109.364 31.7945 109.37 31.7987 109.375 31.8019C109.377 31.8034 109.379 31.8047 109.381 31.8057C109.381 31.8061 109.382 31.8067 109.383 31.8069C109.383 31.8074 109.384 31.8077 108.268 33.4678ZM50.9002 19.3962C22.0976 22.354 7.14406 32.612 3.6957 35.4857L1.13497 32.4128C5.18433 29.0383 20.8842 18.4576 50.4916 15.4171L50.9002 19.3962ZM106.088 9.82812L111.653 29.8265L107.799 30.8987L102.235 10.9003L106.088 9.82812ZM111.653 29.8282C112.653 33.4351 110.82 37.234 107.353 38.6796L105.814 34.9876C107.412 34.3214 108.262 32.568 107.799 30.897L111.653 29.8282ZM107.355 38.6789L87.9492 46.7912L86.4064 43.1007L105.812 34.9884L107.355 38.6789Z" fill="#9CA3AF"/>
                </g>
              </svg>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-gray-300 rounded-lg flex items-center justify-center mb-6">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#333333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
                  <line x1="9" y1="9" x2="9.01" y2="9"></line>
                  <line x1="15" y1="9" x2="15.01" y2="9"></line>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Work together to solve it</h3>
            </div>

            {/* Arrow 3 */}
            <div className="hidden lg:block absolute left-[72%] top-[20%] w-[8%]">
              <svg width="113" height="68" viewBox="0 0 113 68" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
                <g id="Hand-drawn arrow">
                  <path id="Vector" d="M109.384 31.8077C110.301 32.4237 110.545 33.6664 109.928 34.5832C109.312 35.5001 108.07 35.7439 107.153 35.1279L109.384 31.8077ZM3.6957 35.4857C2.84714 36.1928 1.58602 36.0781 0.878893 35.2296C0.17176 34.381 0.286409 33.1199 1.13497 32.4128L3.6957 35.4857ZM102.235 10.9003C101.939 9.83619 102.561 8.7335 103.625 8.43742C104.69 8.14133 105.792 8.76397 106.088 9.82812L102.235 10.9003ZM109.726 30.3626L111.653 29.8265L111.653 29.8282L109.726 30.3626ZM106.583 36.8336L105.812 34.9884L105.814 34.9876L106.583 36.8336ZM87.9492 46.7912C86.9301 47.2172 85.7586 46.7364 85.3326 45.7173C84.9065 44.6982 85.3873 43.5267 86.4064 43.1007L87.9492 46.7912ZM108.268 33.4678C107.153 35.1279 107.153 35.1281 107.154 35.1283C107.154 35.1282 107.154 35.1283 107.153 35.1282C107.153 35.128 107.153 35.1276 107.151 35.1268C107.149 35.1253 107.145 35.1227 107.14 35.1189C107.128 35.1114 107.11 35.0994 107.085 35.083C107.036 35.0503 106.959 35.0003 106.857 34.9343C106.653 34.8022 106.345 34.6059 105.94 34.3553C105.13 33.8543 103.934 33.1368 102.404 32.2827C99.344 30.5735 94.9591 28.3224 89.6774 26.1639C79.0798 21.833 65.0394 17.9442 50.9002 19.3962L50.4916 15.4171C65.5573 13.87 80.3032 18.0118 91.1906 22.4612C96.6515 24.6929 101.184 27.0194 104.355 28.7903C105.941 29.6763 107.189 30.4244 108.045 30.954C108.473 31.2188 108.803 31.4291 109.028 31.5747C109.141 31.6475 109.227 31.7042 109.287 31.7434C109.317 31.7631 109.34 31.7783 109.356 31.7891C109.364 31.7945 109.37 31.7987 109.375 31.8019C109.377 31.8034 109.379 31.8047 109.381 31.8057C109.381 31.8061 109.382 31.8067 109.383 31.8069C109.383 31.8074 109.384 31.8077 108.268 33.4678ZM50.9002 19.3962C22.0976 22.354 7.14406 32.612 3.6957 35.4857L1.13497 32.4128C5.18433 29.0383 20.8842 18.4576 50.4916 15.4171L50.9002 19.3962ZM106.088 9.82812L111.653 29.8265L107.799 30.8987L102.235 10.9003L106.088 9.82812ZM111.653 29.8282C112.653 33.4351 110.82 37.234 107.353 38.6796L105.814 34.9876C107.412 34.3214 108.262 32.568 107.799 30.897L111.653 29.8282ZM107.355 38.6789L87.9492 46.7912L86.4064 43.1007L105.812 34.9884L107.355 38.6789Z" fill="#9CA3AF"/>
                </g>
              </svg>
            </div>

            {/* Step 4 */}
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-gray-400 rounded-lg flex items-center justify-center mb-6">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#333333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26"></polygon>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Custom feedback and learning tips</h3>
            </div>
          </div>
        </div>
      </section>

      {/* AI Avatars Section */}
      <section id="avatars" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              Check how our AI tutors
            </h2>
            <p className="text-2xl font-semibold">
              <span className="text-gray-600">solve students'</span> <span className="text-black">problems</span>
            </p>
          </div>

          {/* Desktop Pentagonal Layout - Hidden on Mobile */}
          <div className="hidden md:flex justify-center items-center mb-16 relative h-[650px]">
            {/* Center Hexagon - AI Tutoring */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
              <div className="hexagon bg-white shadow-lg hover:shadow-xl transition-all duration-300 border-4 border-gray-100">
                <div className="hexagon-content flex flex-col items-center justify-center p-6">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    <Video className="w-8 h-8 text-black" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">AI Tutoring</h3>
                  <p className="text-sm text-gray-600 text-center">Interactive video sessions with AI tutors</p>
                </div>
              </div>
            </div>

            {/* Pentagonal Arrangement - Outer Hexagons */}
            {/* Career Guide - Top */}
            <div className="absolute top-[30px] left-1/2 transform -translate-x-1/2 z-10">
              <div className="hexagon bg-white shadow-lg hover:shadow-xl transition-all duration-300 border-4 border-gray-100">
                <div className="hexagon-content flex flex-col items-center justify-center p-6">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    <GraduationCap className="w-8 h-8 text-black" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">Career Guide</h3>
                  <p className="text-sm text-gray-600 text-center">Find your perfect academic path</p>
                </div>
              </div>
            </div>

            {/* Arrow Down from Career Guide to Center */}
            <div className="absolute top-[170px] left-1/2 transform -translate-x-1/2 z-0 w-20 h-20 opacity-60">
              <img src="/arrow-down.svg" alt="Arrow Down" className="w-full h-full" />
            </div>

            {/* Exam Prep - Top Right */}
            <div className="absolute top-[170px] right-[20%] z-10">
              <div className="hexagon bg-white shadow-lg hover:shadow-xl transition-all duration-300 border-4 border-gray-100">
                <div className="hexagon-content flex flex-col items-center justify-center p-6">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    <BookOpen className="w-8 h-8 text-black" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">Exam Prep</h3>
                  <p className="text-sm text-gray-600 text-center">Specialized preparation for standardized tests</p>
                </div>
              </div>
            </div>

            {/* Arrow from Center to Exam Prep */}
            <div className="absolute top-[250px] right-[38%] transform rotate-[-45deg] z-0 w-20 h-20 opacity-60">
              <img src="/arrow-up.svg" alt="Arrow Up" className="w-full h-full" />
            </div>

            {/* Skill Hub - Bottom Right */}
            <div className="absolute bottom-[170px] right-[20%] z-10">
              <div className="hexagon bg-white shadow-lg hover:shadow-xl transition-all duration-300 border-4 border-gray-100">
                <div className="hexagon-content flex flex-col items-center justify-center p-6">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    <Target className="w-8 h-8 text-black" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">Skill Hub</h3>
                  <p className="text-sm text-gray-600 text-center">Develop essential digital and soft skills</p>
                </div>
              </div>
            </div>

            {/* Arrow from Skill Hub to Rewards */}
            <div className="absolute bottom-[250px] right-[38%] transform rotate-[45deg] z-0 w-20 h-20 opacity-60">
              <img src="/arrow-down.svg" alt="Arrow Down" className="w-full h-full" />
            </div>

            {/* Rewards - Bottom Left */}
            <div className="absolute bottom-[170px] left-[20%] z-10">
              <div className="hexagon bg-white shadow-lg hover:shadow-xl transition-all duration-300 border-4 border-gray-100">
                <div className="hexagon-content flex flex-col items-center justify-center p-6">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    <Award className="w-8 h-8 text-black" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">Rewards</h3>
                  <p className="text-sm text-gray-600 text-center">Level up with XP, streaks and leaderboards</p>
                </div>
              </div>
            </div>

            {/* Arrow from Rewards to Community */}
            <div className="absolute bottom-[250px] left-[38%] transform rotate-[-45deg] z-0 w-20 h-20 opacity-60">
              <img src="/arrow-up.svg" alt="Arrow Up" className="w-full h-full" />
            </div>

            {/* Community - Top Left */}
            <div className="absolute top-[170px] left-[20%] z-10">
              <div className="hexagon bg-white shadow-lg hover:shadow-xl transition-all duration-300 border-4 border-gray-100">
                <div className="hexagon-content flex flex-col items-center justify-center p-6">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 text-black">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                      <circle cx="9" cy="7" r="4"></circle>
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                      <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold mb-2">Community</h3>
                  <p className="text-sm text-gray-600 text-center">Learn together with peers and mentors</p>
                </div>
              </div>
            </div>

            {/* Arrow from Community to Career Guide */}
            <div className="absolute top-[250px] left-[38%] transform rotate-[45deg] z-0 w-20 h-20 opacity-60">
              <img src="/arrow-down.svg" alt="Arrow Down" className="w-full h-full" />
            </div>
            
            {/* Connection Lines */}
            <div className="absolute inset-0 z-0">
              <svg width="100%" height="100%" viewBox="0 0 800 650" className="opacity-10">
                <polygon points="400,325 400,100 620,170 620,480 400,550 180,480 180,170" 
                  fill="none" stroke="#000" strokeWidth="1" strokeDasharray="5,5" />
              </svg>
            </div>
          </div>

          {/* Mobile Vertical Layout - Hidden on Desktop */}
          <div className="md:hidden flex flex-col items-center gap-24 mb-16">
            {/* AI Tutoring */}
            <div className="relative">
              <div className="hexagon bg-white shadow-lg hover:shadow-xl transition-all duration-300 border-4 border-gray-100">
                <div className="hexagon-content flex flex-col items-center justify-center p-6">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    <Video className="w-8 h-8 text-black" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">AI Tutoring</h3>
                  <p className="text-sm text-gray-600 text-center">Interactive video sessions with AI tutors</p>
                </div>
              </div>
              <div className="absolute bottom-[-50px] left-1/2 transform -translate-x-1/2 w-12 h-12 opacity-60">
                <img src="/arrow-down.svg" alt="Arrow Down" className="w-full h-full" />
              </div>
            </div>

            {/* Career Guide */}
            <div className="relative">
              <div className="hexagon bg-white shadow-lg hover:shadow-xl transition-all duration-300 border-4 border-gray-100">
                <div className="hexagon-content flex flex-col items-center justify-center p-6">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    <GraduationCap className="w-8 h-8 text-black" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">Career Guide</h3>
                  <p className="text-sm text-gray-600 text-center">Find your perfect academic path</p>
                </div>
              </div>
              <div className="absolute bottom-[-50px] left-1/2 transform -translate-x-1/2 w-12 h-12 opacity-60">
                <img src="/arrow-down.svg" alt="Arrow Down" className="w-full h-full" />
              </div>
            </div>

            {/* Exam Prep */}
            <div className="relative">
              <div className="hexagon bg-white shadow-lg hover:shadow-xl transition-all duration-300 border-4 border-gray-100">
                <div className="hexagon-content flex flex-col items-center justify-center p-6">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    <BookOpen className="w-8 h-8 text-black" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">Exam Prep</h3>
                  <p className="text-sm text-gray-600 text-center">Specialized preparation for standardized tests</p>
                </div>
              </div>
              <div className="absolute bottom-[-50px] left-1/2 transform -translate-x-1/2 w-12 h-12 opacity-60">
                <img src="/arrow-down.svg" alt="Arrow Down" className="w-full h-full" />
              </div>
            </div>

            {/* Skill Hub */}
            <div className="relative">
              <div className="hexagon bg-white shadow-lg hover:shadow-xl transition-all duration-300 border-4 border-gray-100">
                <div className="hexagon-content flex flex-col items-center justify-center p-6">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    <Target className="w-8 h-8 text-black" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">Skill Hub</h3>
                  <p className="text-sm text-gray-600 text-center">Develop essential digital and soft skills</p>
                </div>
              </div>
              <div className="absolute bottom-[-50px] left-1/2 transform -translate-x-1/2 w-12 h-12 opacity-60">
                <img src="/arrow-down.svg" alt="Arrow Down" className="w-full h-full" />
              </div>
            </div>

            {/* Rewards */}
            <div className="relative">
              <div className="hexagon bg-white shadow-lg hover:shadow-xl transition-all duration-300 border-4 border-gray-100">
                <div className="hexagon-content flex flex-col items-center justify-center p-6">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    <Award className="w-8 h-8 text-black" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">Rewards</h3>
                  <p className="text-sm text-gray-600 text-center">Level up with XP, streaks and leaderboards</p>
                </div>
              </div>
              <div className="absolute bottom-[-50px] left-1/2 transform -translate-x-1/2 w-12 h-12 opacity-60">
                <img src="/arrow-down.svg" alt="Arrow Down" className="w-full h-full" />
              </div>
            </div>

            {/* Community */}
            <div className="relative">
              <div className="hexagon bg-white shadow-lg hover:shadow-xl transition-all duration-300 border-4 border-gray-100">
                <div className="hexagon-content flex flex-col items-center justify-center p-6">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 text-black">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                      <circle cx="9" cy="7" r="4"></circle>
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                      <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold mb-2">Community</h3>
                  <p className="text-sm text-gray-600 text-center">Learn together with peers and mentors</p>
                </div>
              </div>
              <div className="absolute bottom-[-50px] left-1/2 transform -translate-x-1/2 w-12 h-12 opacity-60">
                <img src="/arrow-up.svg" alt="Arrow Up" className="w-full h-full rotate-180" />
              </div>
            </div>
          </div>

          <div className="text-center mt-20">
            <h3 className="text-3xl font-bold text-center mb-4">EduMeAI</h3>
            <p className="text-lg text-gray-600 uppercase tracking-wider mb-6">COMPLETE LEARNING SOLUTION</p>
            <Button className="bg-black hover:bg-black/80 text-white px-8 py-3 rounded-full text-lg">
              Try EduMeAI now
            </Button>
          </div>
        </div>
      </section>

      {/* AI Tutoring Experience */}
      <section id="tutoring" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">Experience AI Tutoring in Action</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our advanced AI tutors provide personalized learning experiences with real-time video interaction and dynamic whiteboard collaboration.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="grid md:grid-cols-2 gap-0">
              {/* Video Call Interface */}
              <div className="p-8 bg-gray-900 text-white relative">
                <div className="aspect-video bg-gray-800 rounded-lg mb-4 relative overflow-hidden">
                  <video
                    src="/talking_preview.mp4"
                    className="w-full h-full object-cover"
                    autoPlay
                    loop
                    muted
                    playsInline
                    controls
                  />
                  <div className="absolute bottom-4 left-4 flex space-x-2">
                    <button
                      onClick={() => setIsMuted(!isMuted)}
                      className={`p-2 rounded-full ${isMuted ? "bg-red-500" : "bg-gray-700"} hover:bg-opacity-80 transition-colors`}
                    >
                      {isMuted ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                    </button>
                    <button
                      onClick={() => setIsVideoOn(!isVideoOn)}
                      className={`p-2 rounded-full ${!isVideoOn ? "bg-red-500" : "bg-gray-700"} hover:bg-opacity-80 transition-colors`}
                    >
                      {isVideoOn ? <VideoIcon className="w-4 h-4" /> : <VideoOff className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Annotation Toolbar */}
                <div className="flex justify-center space-x-4">
                  <button className="p-3 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors">
                    <PenTool className="w-5 h-5" />
                  </button>
                  <button className="p-3 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors">
                    <Highlighter className="w-5 h-5" />
                  </button>
                  <button className="p-3 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors">
                    <Eraser className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Chat Interface */}
              <div className="p-8">
                <h3 className="text-xl font-bold text-black mb-6">Live Chat Transcript</h3>
                <div className="space-y-4 h-64 overflow-y-auto">
                  {chatMessages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender === "student" ? "justify-end" : "justify-start"} transition-all duration-500 ${
                        message.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                      }`}
                    >
                      <div
                        className={`max-w-xs px-4 py-2 rounded-lg ${
                          message.sender === "student" ? "bg-black text-white" : "bg-gray-100 text-black"
                        }`}
                      >
                        {message.text}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-16 grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex items-center mb-4">
                <div className="bg-black/10 p-2 rounded-full mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                    <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>
                  </svg>
                </div>
                <h3 className="font-bold text-lg">Personalized Learning</h3>
              </div>
              <p className="text-gray-600">Our AI adapts to your learning style and pace, providing explanations tailored to your understanding level.</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex items-center mb-4">
                <div className="bg-black/10 p-2 rounded-full mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                  </svg>
                </div>
                <h3 className="font-bold text-lg">24/7 Availability</h3>
              </div>
              <p className="text-gray-600">Get help whenever you need it, day or night. No scheduling or waiting for office hours.</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex items-center mb-4">
                <div className="bg-black/10 p-2 rounded-full mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                    <path d="M18 8h1a4 4 0 0 1 0 8h-1"></path>
                    <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path>
                    <line x1="6" y1="1" x2="6" y2="4"></line>
                    <line x1="10" y1="1" x2="10" y2="4"></line>
                    <line x1="14" y1="1" x2="14" y2="4"></line>
                  </svg>
                </div>
                <h3 className="font-bold text-lg">Interactive Tools</h3>
              </div>
              <p className="text-gray-600">Solve problems together using our digital whiteboard, formula editor, and other interactive learning tools.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Demo Section */}
      <section id="pathfinder" className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">Find Your Perfect Academic Path</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our Career Guide helps you discover university courses and career paths aligned with your interests, strengths, and goals through a personalized assessment.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="grid md:grid-cols-2 gap-0">
              {/* Career Assessment Interface */}
              <div className="p-8 bg-gray-900 text-white relative">
                <div className="aspect-video bg-gray-800 rounded-lg mb-4 relative overflow-hidden flex items-center justify-center">
                  <div className="text-center p-6">
                    <h3 className="text-xl font-bold mb-4">Career Assessment</h3>
                    <div className="flex items-center justify-center space-x-2 mb-6">
                      <div className="w-3 h-3 bg-white rounded-full"></div>
                      <div className="w-3 h-3 bg-white/50 rounded-full"></div>
                      <div className="w-3 h-3 bg-white/50 rounded-full"></div>
                      <div className="w-3 h-3 bg-white/50 rounded-full"></div>
                      <div className="w-3 h-3 bg-white/50 rounded-full"></div>
                    </div>
                    <p className="text-lg mb-4">What subjects do you enjoy the most?</p>
                    <div className="grid grid-cols-2 gap-3 max-w-xs mx-auto">
                      <button className="bg-gray-700 hover:bg-gray-600 py-2 px-4 rounded-md text-sm transition-colors">
                        Mathematics
                      </button>
                      <button className="bg-gray-700 hover:bg-gray-600 py-2 px-4 rounded-md text-sm transition-colors">
                        Sciences
                      </button>
                      <button className="bg-gray-700 hover:bg-gray-600 py-2 px-4 rounded-md text-sm transition-colors">
                        Languages
                      </button>
                      <button className="bg-gray-700 hover:bg-gray-600 py-2 px-4 rounded-md text-sm transition-colors">
                        Arts
                      </button>
                    </div>
                  </div>
                </div>

                {/* Progress Indicator */}
                <div className="flex justify-between items-center">
                  <button className="p-3 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M15 18l-6-6 6-6"/>
                    </svg>
                  </button>
                  <div className="text-sm">Question 1 of 5</div>
                  <button className="p-3 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 18l6-6-6-6"/>
                    </svg>
                  </button>
                </div>
              </div>

              {/* Results Preview */}
              <div className="p-8">
                <h3 className="text-xl font-bold text-black mb-6">Your Career Path Results</h3>
                <div className="space-y-4">
                  <div className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center mb-2">
                      <div className="w-10 h-10 bg-black/10 rounded-full flex items-center justify-center mr-3">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
                          <path d="M6 12v5c3 3 9 3 12 0v-5"></path>
                        </svg>
                      </div>
                      <h4 className="font-bold">Computer Science</h4>
                    </div>
                    <p className="text-sm text-gray-600 pl-12">Based on your interest in problem-solving and mathematics</p>
                  </div>

                  <div className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center mb-2">
                      <div className="w-10 h-10 bg-black/10 rounded-full flex items-center justify-center mr-3">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                          <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                        </svg>
                      </div>
                      <h4 className="font-bold">Data Science</h4>
                    </div>
                    <p className="text-sm text-gray-600 pl-12">Matches your analytical thinking and interest in technology</p>
                  </div>

                  <div className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center mb-2">
                      <div className="w-10 h-10 bg-black/10 rounded-full flex items-center justify-center mr-3">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                        </svg>
                      </div>
                      <h4 className="font-bold">Digital Marketing</h4>
                    </div>
                    <p className="text-sm text-gray-600 pl-12">Aligns with your creativity and communication skills</p>
                  </div>
                </div>
                <div className="mt-6 text-center">
                  <Button className="bg-black text-white hover:bg-black/80 px-6 py-2 rounded-full text-sm">
                    Complete Assessment
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Exam Prep Section */}
      <section id="exams" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">Specialized Exam Preparation</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Comprehensive preparation with curated syllabus guidelines, topic-by-topic learning paths, and practice tests tailored to each exam's requirements.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-gray-50 border-0 shadow-sm hover:shadow-md transition-all duration-300 hover:translate-y-[-5px]">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold">JAMB & WAEC</h3>
                  <div className="bg-black/10 p-2 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                    </svg>
                  </div>
                </div>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center">
                    <svg className="w-4 h-4 mr-2 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    Comprehensive syllabus breakdown
                  </li>
                  <li className="flex items-center">
                    <svg className="w-4 h-4 mr-2 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    Topic-by-topic guidance
                  </li>
                  <li className="flex items-center">
                    <svg className="w-4 h-4 mr-2 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    Practice tests & performance tracking
                  </li>
                </ul>
                <Button className="w-full bg-black text-white hover:bg-black/80">Start Preparing</Button>
              </CardContent>
            </Card>
            
            <Card className="bg-gray-50 border-0 shadow-sm hover:shadow-md transition-all duration-300 hover:translate-y-[-5px]">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold">IELTS & TOEFL</h3>
                  <div className="bg-black/10 p-2 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                      <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z"></path>
                      <path d="M2 12h20"></path>
                      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                    </svg>
                  </div>
                </div>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center">
                    <svg className="w-4 h-4 mr-2 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    Detailed section guides
                  </li>
                  <li className="flex items-center">
                    <svg className="w-4 h-4 mr-2 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    Speaking & writing feedback
                  </li>
                  <li className="flex items-center">
                    <svg className="w-4 h-4 mr-2 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    Structured practice materials
                  </li>
                </ul>
                <Button className="w-full bg-black text-white hover:bg-black/80">Start Preparing</Button>
              </CardContent>
            </Card>
            
            <Card className="bg-gray-50 border-0 shadow-sm hover:shadow-md transition-all duration-300 hover:translate-y-[-5px]">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold">Other Exams</h3>
                  <div className="bg-black/10 p-2 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                      <line x1="9" y1="9" x2="15" y2="15"></line>
                      <line x1="15" y1="9" x2="9" y2="15"></line>
                    </svg>
                  </div>
                </div>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center">
                    <svg className="w-4 h-4 mr-2 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    Exam-specific study guides
                  </li>
                  <li className="flex items-center">
                    <svg className="w-4 h-4 mr-2 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    Curated learning resources
                  </li>
                  <li className="flex items-center">
                    <svg className="w-4 h-4 mr-2 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    Targeted practice exercises
                  </li>
                </ul>
                <Button className="w-full bg-black text-white hover:bg-black/80">Explore Options</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Skill Hub Section */}
      <section id="skills" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">Beyond School Certificates</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Develop practical skills that prepare you for the real world and enhance your employability.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <h3 className="text-2xl font-bold mb-6">Digital Skills</h3>
              <div className="space-y-4">
                <div className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="bg-black/10 p-2 rounded-full mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                      <path d="M12 19l7-7 3 3-7 7-3-3z"></path>
                      <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"></path>
                      <path d="M2 2l7.586 7.586"></path>
                      <circle cx="11" cy="11" r="2"></circle>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium">Web Development</h4>
                    <p className="text-sm text-gray-600">HTML, CSS, JavaScript, and modern frameworks</p>
                  </div>
                </div>
                
                <div className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="bg-black/10 p-2 rounded-full mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                      <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                      <line x1="8" y1="21" x2="16" y2="21"></line>
                      <line x1="12" y1="17" x2="12" y2="21"></line>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium">Digital Marketing</h4>
                    <p className="text-sm text-gray-600">SEO, social media, content marketing, and analytics</p>
                  </div>
                </div>
                
                <div className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="bg-black/10 p-2 rounded-full mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                      <polyline points="16 18 22 12 16 6"></polyline>
                      <polyline points="8 6 2 12 8 18"></polyline>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium">Data Analysis</h4>
                    <p className="text-sm text-gray-600">Excel, SQL, Python, and data visualization</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <h3 className="text-2xl font-bold mb-6">Soft Skills</h3>
              <div className="space-y-4">
                <div className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="bg-black/10 p-2 rounded-full mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                      <circle cx="9" cy="7" r="4"></circle>
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                      <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium">Communication & Presentation</h4>
                    <p className="text-sm text-gray-600">Public speaking, writing, and visual communication</p>
                  </div>
                </div>
                
                <div className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="bg-black/10 p-2 rounded-full mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26"></polygon>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium">Leadership & Teamwork</h4>
                    <p className="text-sm text-gray-600">Project management, conflict resolution, and collaboration</p>
                  </div>
                </div>
                
                <div className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="bg-black/10 p-2 rounded-full mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                      <circle cx="12" cy="12" r="10"></circle>
                      <path d="M12 8v4l3 3"></path>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium">Time Management & Productivity</h4>
                    <p className="text-sm text-gray-600">Goal setting, prioritization, and focus techniques</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <Button className="bg-black text-white hover:bg-black/80 px-8 py-3 rounded-full">
              Explore All Skills
            </Button>
          </div>
        </div>
      </section>

      {/* Rewards System */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">Level Up Your Learning</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Stay motivated and track your progress with our interactive rewards system.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-sm overflow-hidden">
              <div className="h-3 bg-black/10"></div>
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 text-black">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-black mb-2">XP & Levels</h3>
                <p className="text-gray-600 mb-6">
                  Earn experience points for completing lessons, solving problems, and helping others. Level up to unlock new features and rewards.
                </p>
                <div className="w-full bg-gray-200 rounded-full h-2.5 mb-1">
                  <div className="bg-black/70 h-2.5 rounded-full" style={{ width: '70%' }}></div>
                </div>
                <p className="text-sm text-gray-500">Level 7 • 70% to Level 8</p>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-sm overflow-hidden">
              <div className="h-3 bg-black/10"></div>
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 text-black">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-black mb-2">Streaks & Achievements</h3>
                <p className="text-gray-600 mb-6">
                  Maintain your daily learning streak and earn badges for consistent study habits and milestone achievements.
                </p>
                <div className="flex justify-center space-x-1 mb-1">
                  {[...Array(7)].map((_, i) => (
                    <div key={i} className={`w-8 h-8 rounded-full flex items-center justify-center ${i < 5 ? 'bg-black text-white' : 'bg-gray-200'}`}>
                      {i + 1}
                    </div>
                  ))}
                </div>
                <p className="text-sm text-gray-500">5-day streak • 2 days to next reward</p>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-sm overflow-hidden">
              <div className="h-3 bg-black/10"></div>
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 text-black">
                    <path d="M8 6h13"></path>
                    <path d="M8 12h13"></path>
                    <path d="M8 18h13"></path>
                    <path d="M3 6h.01"></path>
                    <path d="M3 12h.01"></path>
                    <path d="M3 18h.01"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-black mb-2">Leaderboards</h3>
                <p className="text-gray-600 mb-6">
                  Compete with friends and other students on subject-specific leaderboards. Rise to the top and earn special recognition.
                </p>
                <div className="flex items-center justify-between p-2 bg-gray-50 rounded-lg mb-1">
                  <div className="flex items-center">
                    <div className="bg-black text-white w-6 h-6 rounded-full flex items-center justify-center mr-2">3</div>
                    <span>Your Ranking</span>
                  </div>
                  <span className="font-bold">2,450 pts</span>
                </div>
                <p className="text-sm text-gray-500">Top 5% in Mathematics this week</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-white border-t border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center mb-10">
            <div className="h-px bg-gray-200 w-16"></div>
            <h2 className="text-center text-base font-medium text-gray-600 mx-4 uppercase tracking-wider">Trusted by leading institutions</h2>
            <div className="h-px bg-gray-200 w-16"></div>
          </div>
          
          <div className="relative">
            <Marquee
              speed={60}
              direction="right"
              gradient={true}
              gradientColor="white"
              gradientWidth={60}
              pauseOnHover={true}
              className="py-6 overflow-hidden"
            >
              {partnersData.slice(0, 11).map((partner, index) => (
                <div key={index} className="mx-14 text-center flex flex-col items-center h-28">
                  <div className="relative h-16 w-40 mb-3 transition-all duration-300 ease-in-out hover:scale-110">
                    <Image 
                      src={partner.logo}
                      alt={`${partner.name} logo`}
                      fill
                      sizes="160px"
                      className="object-contain filter grayscale hover:grayscale-0 opacity-75 hover:opacity-100 transition-all duration-300"
                      style={{ objectFit: 'contain' }}
                    />
                  </div>
                  <span className="text-xs font-medium mt-1 px-1 py-0.5 bg-white/80 rounded text-gray-800 max-w-40 text-center whitespace-nowrap">{partner.name}</span>
                </div>
              ))}
            </Marquee>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="about" className="py-12 border-t border-gray-300 relative">
        <div className="absolute inset-0 z-0 opacity-10">
          <img src="/world-map.png" alt="World Map" className="w-full h-full object-cover" />
        </div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center mb-4">
                <img src="/edumeai-logo.png" alt="EduMeAI Logo" className="h-8 mr-2" />
              </div>
              <p className="text-gray-600 text-sm mb-4">
                Your AI-powered live tutoring platform for personalized learning, career guidance, and skill development.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-gray-600">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-gray-600">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-gray-600">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="font-bold text-black mb-4">Features</h4>
              <ul className="space-y-2">
                <li><a href="#tutoring" className="text-gray-600 hover:text-black">AI Tutoring</a></li>
                <li><a href="#pathfinder" className="text-gray-600 hover:text-black">Career Guide</a></li>
                <li><a href="#exams" className="text-gray-600 hover:text-black">Exam Preparation</a></li>
                <li><a href="#skills" className="text-gray-600 hover:text-black">Skill Development</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold text-black mb-4">Resources</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-600 hover:text-black">Blog</a></li>
                <li><a href="#" className="text-gray-600 hover:text-black">Help Center</a></li>
                <li><a href="#" className="text-gray-600 hover:text-black">Tutorials</a></li>
                <li><a href="#" className="text-gray-600 hover:text-black">For Parents</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold text-black mb-4">Company</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-600 hover:text-black">About Us</a></li>
                <li><a href="#" className="text-gray-600 hover:text-black">Careers</a></li>
                <li><a href="#privacy" className="text-gray-600 hover:text-black">Privacy Policy</a></li>
                <li><a href="#terms" className="text-gray-600 hover:text-black">Terms of Service</a></li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-gray-200 text-center">
            <p className="text-gray-600">© 2025 EduMeAi. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
