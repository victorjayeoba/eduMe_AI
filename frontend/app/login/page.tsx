"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { EyeIcon, EyeOffIcon, Menu, X, AlertCircle } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { toast } from "sonner"
import { getAuth, sendEmailVerification } from "firebase/auth"
import { doc, getDoc } from "firebase/firestore"
import { db } from "@/lib/firebase"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [showVerificationWarning, setShowVerificationWarning] = useState(false)
  
  const { logIn, signInWithGoogle, user, isEmailVerified } = useAuth()
  const router = useRouter()
  const auth = getAuth()

  useEffect(() => {
    // If user is logged in but email is not verified, show warning
    if (user && !isEmailVerified) {
      setShowVerificationWarning(true)
    } else {
      setShowVerificationWarning(false)
    }
  }, [user, isEmailVerified])

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

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email || !password) {
      toast.error("Please enter both email and password")
      return
    }
    
    setIsLoading(true)
    
    try {
      await logIn(email, password)
      
      // Check if email is verified
      if (auth.currentUser && !auth.currentUser.emailVerified) {
        setShowVerificationWarning(true)
      } else {
        // Check if user has completed onboarding
        if (auth.currentUser) {
          try {
            const userDoc = await getDoc(doc(db, "users", auth.currentUser.uid))
            if (userDoc.exists() && userDoc.data().name) {
              toast.success("Login successful!")
              router.push("/dashboard")
            } else {
              // User needs to complete onboarding
              toast.success("Login successful! Please complete your profile.")
              router.push("/onboarding")
            }
          } catch (error) {
            console.error("Error checking user profile:", error)
            toast.success("Login successful!")
            router.push("/dashboard")
          }
        } else {
          toast.success("Login successful!")
          router.push("/dashboard")
        }
      }
    } catch (error: any) {
      console.error("Login error:", error)
      toast.error(error.message || "Failed to log in. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleSignIn = async () => {
    setIsLoading(true)
    
    try {
      await signInWithGoogle()
      
      // Check if user has completed onboarding
      if (auth.currentUser) {
        try {
          const userDoc = await getDoc(doc(db, "users", auth.currentUser.uid))
          if (userDoc.exists() && userDoc.data().name) {
            toast.success("Login successful!")
            router.push("/dashboard")
          } else {
            // User needs to complete onboarding
            toast.success("Login successful! Please complete your profile.")
            router.push("/onboarding")
          }
        } catch (error) {
          console.error("Error checking user profile:", error)
          toast.success("Login successful!")
          router.push("/dashboard")
        }
      } else {
        toast.success("Login successful!")
        router.push("/dashboard")
      }
    } catch (error: any) {
      console.error("Google sign-in error:", error)
      toast.error(error.message || "Failed to sign in with Google. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleResendVerification = async () => {
    if (!auth.currentUser) return;
    
    try {
      const actionCodeSettings = {
        url: `${window.location.origin}/verify?email=${encodeURIComponent(auth.currentUser.email || '')}`,
        handleCodeInApp: false,
      };
      
      await sendEmailVerification(auth.currentUser, actionCodeSettings);
      toast.success("Verification email sent! Please check your inbox.");
    } catch (error) {
      console.error("Error sending verification email:", error);
      toast.error("Failed to send verification email. Please try again later.");
    }
  }

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
                <span className="text-xl font-bold text-black bg-black/10 px-1 py-0.5 rounded-md border border-black/20 ml-1">
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
              <Button size="sm" className="bg-black hover:bg-black/80 text-white px-4 w-full rounded-[24px] transition-all duration-300 mt-2" asChild>
                <Link href="/signup">Sign Up</Link>
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Header spacer */}
      {isScrolled && <div className="h-24"></div>}

      <div className="flex flex-col items-center justify-center px-4 py-6">
        <div className="w-full max-w-md">
          {/* Welcome text */}
          <h2 className="text-2xl text-center text-gray-500 mb-1">Welcome back!</h2>
          {/* Heading */}
          <h1 className="text-3xl font-bold text-center mb-4">Login to your account</h1>

          {/* Email verification warning */}
          {showVerificationWarning && (
            <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg mb-6 flex items-start">
              <AlertCircle className="text-amber-500 w-5 h-5 mt-0.5 mr-2 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-amber-800 text-sm">Email verification required</h3>
                <p className="text-amber-700 text-xs mt-1 mb-2">
                  Your email address hasn't been verified. Please check your inbox for the verification link.
                </p>
                <div className="flex space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={handleResendVerification}
                    className="text-xs h-8 bg-white border-amber-300 text-amber-700 hover:bg-amber-100"
                  >
                    Resend email
                  </Button>
                  <Button 
                    size="sm" 
                    onClick={() => router.push("/verify")}
                    className="text-xs h-8 bg-amber-600 text-white hover:bg-amber-700"
                  >
                    Verification page
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Form container */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            {/* Google login button */}
            <button 
              className="w-full flex items-center justify-center gap-2 border border-gray-300 rounded-full py-2 px-4 mb-4 transition-colors hover:bg-gray-50"
              onClick={handleGoogleSignIn}
              disabled={isLoading}
            >
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
            <form onSubmit={handleLogin}>
              <div className="mb-3">
                <label htmlFor="email" className="block text-sm font-medium text-gray-900 mb-1">Email</label>
                <Input 
                  type="email" 
                  id="email" 
                  placeholder="you@youremail.com" 
                  className="w-full" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                  required
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
                    disabled={isLoading}
                    required
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
                  <Link href="/forgot-password" className="text-sm text-gray-500 hover:text-gray-700">Forgot Password?</Link>
                </div>
              </div>
              {/* Login button */}
              <Button 
                type="submit"
                className="w-full bg-[#0f172a] hover:bg-[#1e293b] text-white py-2 rounded-full flex items-center justify-center gap-2"
                disabled={isLoading}
              >
                {isLoading ? "Logging in..." : "Login"}
                {!isLoading && (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </Button>
            </form>
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