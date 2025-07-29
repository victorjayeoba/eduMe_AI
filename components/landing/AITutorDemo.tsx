import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { 
  Video, 
  Mic, 
  MicOff, 
  VideoIcon, 
  VideoOff
} from "lucide-react"
import { motion, AnimatePresence, useInView } from "framer-motion"
import gsap from "gsap"

export default function AITutorDemo() {
  // Always keep video muted, ignore isMuted for video element
  const [isMuted, setIsMuted] = useState(true)
  const [isVideoOn, setIsVideoOn] = useState(true)
  const [chatMessages, setChatMessages] = useState([
    { id: 1, text: "Hi! I'm struggling with this calculus problem.", sender: "student", visible: false },
    { id: 2, text: "I'd be happy to help! Let me see what you're working on.", sender: "ai", visible: false },
    { id: 3, text: "Can you walk me through derivatives step by step?", sender: "student", visible: false },
  ])
  const [audioData, setAudioData] = useState(Array(30).fill(0))
  const [animationStarted, setAnimationStarted] = useState(false)
  
  const animationRef = useRef(null)
  const videoRef = useRef(null)
  const sectionRef = useRef(null)
  const timelineRef = useRef<gsap.core.Timeline | null>(null)
  const messageRefs = useRef<(HTMLDivElement | null)[]>([])
  const typingRefs = useRef<(HTMLDivElement | null)[]>([])
  
  const isInView = useInView(sectionRef, { once: false, amount: 0.3 })
  
  // Initialize message refs array
  useEffect(() => {
    messageRefs.current = messageRefs.current.slice(0, chatMessages.length)
    typingRefs.current = typingRefs.current.slice(0, chatMessages.length)
  }, [chatMessages])
  
  // Start animation when section comes into view
  useEffect(() => {
    if (isInView && !animationStarted) {
      setAnimationStarted(true)
      startChatAnimation()
    }
  }, [isInView, animationStarted])
  
  // Reset animation when out of view
  useEffect(() => {
    if (!isInView && animationStarted) {
      setChatMessages(prev => prev.map(msg => ({ ...msg, visible: false })))
      setAnimationStarted(false)
      
      // Kill any active GSAP animations
      if (timelineRef.current) {
        timelineRef.current.kill()
        timelineRef.current = null
      }
    }
  }, [isInView, animationStarted])
  
  // Simulate audio wave data
  useEffect(() => {
    const generateAudioData = () => {
      // Only generate active audio data when AI is speaking (message 2 is visible)
      const aiSpeaking = chatMessages[1]?.visible && !chatMessages[2]?.visible
      
      if (aiSpeaking && !isMuted) {
        const newData = Array(30).fill(0).map(() => Math.random() * 0.7 + 0.3)
        setAudioData(newData)
      } else {
        const idleData = Array(30).fill(0).map(() => Math.random() * 0.2)
        setAudioData(idleData)
      }
    }

    animationRef.current = setInterval(generateAudioData, 100)
    return () => {
      if (animationRef.current) clearInterval(animationRef.current)
    }
  }, [chatMessages, isMuted])

  // Control video playback based on messages
  useEffect(() => {
    if (videoRef.current) {
      if (chatMessages.some(msg => msg.sender === "ai" && msg.visible)) {
       /*  videoRef.current.play().catch(e => console.log("Autoplay prevented:", e)) */
      }
    }
  }, [chatMessages])

  // GSAP Timeline animation for chat messages
  const startChatAnimation = () => {
    // Create a new GSAP timeline
    const tl = gsap.timeline({
      onComplete: () => console.log("Chat animation complete")
    })
    
    timelineRef.current = tl
    
    // First student message appears
    tl.to(messageRefs.current[0], {
      opacity: 1, 
      y: 0, 
      duration: 0.5,
      onStart: () => {
        setChatMessages(prev => prev.map((msg, i) => 
          i === 0 ? { ...msg, visible: true } : msg
        ))
      }
    })
    
    // AI typing indicator appears
    tl.to(typingRefs.current[1], {
      opacity: 1,
      y: 0,
      duration: 0.3,
      delay: 2
    })
    
    // AI typing disappears and message appears
    tl.to(typingRefs.current[1], {
      opacity: 0,
      duration: 0.2,
      delay: 3,
      onComplete: () => {
        setChatMessages(prev => prev.map((msg, i) => 
          i === 1 ? { ...msg, visible: true } : msg
        ))
      }
    })
    
    // AI message appears
    tl.to(messageRefs.current[1], {
      opacity: 1,
      y: 0,
      duration: 0.5
    }, "-=0.1")
    
    // Second student typing indicator appears
    tl.to(typingRefs.current[2], {
      opacity: 1,
      y: 0,
      duration: 0.3,
      delay: 3
    })
    
    // Second student typing disappears and message appears
    tl.to(typingRefs.current[2], {
      opacity: 0,
      duration: 0.2,
      delay: 1.5,
      onComplete: () => {
        setChatMessages(prev => prev.map((msg, i) => 
          i === 2 ? { ...msg, visible: true } : msg
        ))
      }
    })
    
    // Second student message appears
    tl.to(messageRefs.current[2], {
      opacity: 1,
      y: 0,
      duration: 0.5
    }, "-=0.1")
  }
  
  return (
    <section id="avatars" className="py-20 bg-gray-50" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            Check how our AI tutors
          </h2>
          <p className="text-2xl font-semibold">
            <span className="text-gray-600">solve students'</span> <span className="text-black">problems</span>
          </p>
        </div>
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="grid md:grid-cols-2 gap-0">
            {/* Video Call Interface */}
            <div className="p-8 bg-gray-900 text-white relative">
              <div className="aspect-video bg-gray-800 rounded-lg mb-4 relative overflow-hidden">
                {/* Main video */}
                <video
                  ref={videoRef}
                  src="/talking_preview.mp4"
                  className="w-full h-full object-cover"
                  autoPlay
                  loop
                  muted
                  playsInline
                />
                
                {/* D-ID style interface overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                
                {/* Audio wave visualization */}
                <div className="absolute bottom-0 left-0 right-0 h-16 flex items-end justify-center px-6 pb-4">
                  <div className="flex items-end h-12 space-x-1">
                    {audioData.map((value, index) => (
                      <motion.div
                        key={index}
                        className="w-1 bg-white rounded-full"
                        initial={{ height: 4 }}
                        animate={{ 
                          height: Math.max(4, value * 40),
                          opacity: value > 0.2 ? 0.8 : 0.4
                        }}
                        transition={{ type: "spring", stiffness: 300, damping: 10 }}
                      />
                    ))}
                  </div>
                </div>
                
                {/* Video controls */}
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

         
            </div>

            {/* Chat Interface */}
            <div className="p-8">
              <h3 className="text-xl font-bold text-black mb-6">Live Chat Transcript</h3>
              <div className="space-y-4 h-64 overflow-y-auto">
                {chatMessages.map((message, index) => (
                  <div key={message.id} className={`flex ${message.sender === "student" ? "justify-end" : "justify-start"}`}>
                    {/* Typing indicator */}
                    <div 
                      ref={el => typingRefs.current[index] = el}
                      className={`max-w-xs px-4 py-2 rounded-lg opacity-0 translate-y-4 ${
                        message.sender === "student" ? "bg-black text-white" : "bg-gray-100 text-black"
                      }`}
                      style={{ display: message.visible ? 'none' : 'block' }}
                    >
                      <div className="flex items-center space-x-1">
                        <div className="typing-dot"></div>
                        <div className="typing-dot animation-delay-200"></div>
                        <div className="typing-dot animation-delay-400"></div>
                      </div>
                    </div>
                    
                    {/* Actual message */}
                    <div 
                      ref={el => messageRefs.current[index] = el}
                      className={`max-w-xs px-4 py-2 rounded-lg opacity-0 translate-y-4 ${
                        message.sender === "student" ? "bg-black text-white" : "bg-gray-100 text-black"
                      }`}
                      style={{ display: message.visible ? 'block' : 'none' }}
                    >
                      {message.visible && <TypeWriter text={message.text} />}
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Chat input field */}
              <div className="mt-4 relative">
                <input 
                  type="text" 
                  placeholder="Type your question here..." 
                  className="w-full p-3 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                />
                <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-black">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="22" y1="2" x2="11" y2="13"></line>
                    <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                  </svg>
                </button>
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
      
      {/* Add CSS for typing animation */}
      <style jsx>{`
        .typing-dot {
          display: inline-block;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background-color: currentColor;
          opacity: 0.7;
          animation: typing 1.4s infinite both;
        }
        
        .animation-delay-200 {
          animation-delay: 0.2s;
        }
        
        .animation-delay-400 {
          animation-delay: 0.4s;
        }
        
        @keyframes typing {
          0%, 100% {
            transform: translateY(0px);
            opacity: 0.7;
          }
          50% {
            transform: translateY(-4px);
            opacity: 1;
          }
        }
      `}</style>
    </section>
  )
}

// TypeWriter component for animated text typing
const TypeWriter = ({ text }) => {
  const [displayedText, setDisplayedText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)
  
  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + text[currentIndex])
        setCurrentIndex(prev => prev + 1)
      }, 30) // Speed of typing
      
      return () => clearTimeout(timeout)
    }
  }, [currentIndex, text])
  
  return <>{displayedText}</>
} 