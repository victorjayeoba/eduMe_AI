import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { 
  Video, 
  Mic, 
  MicOff, 
  VideoIcon, 
  VideoOff, 
  PenTool, 
  Highlighter, 
  Eraser 
} from "lucide-react"

export default function AITutorDemo() {
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
                      message.visible ? "opacity-100 translate-y-0" : "opacity-100 translate-y-4"
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

        <div className="text-center mt-20">
          <h3 className="text-3xl font-bold text-center mb-4">EduMeAI</h3>
          <p className="text-lg text-gray-600 uppercase tracking-wider mb-6">COMPLETE LEARNING SOLUTION</p>
          <Button className="bg-black hover:bg-black/80 text-white px-8 py-3 rounded-full text-lg">
            Try EduMeAI now
          </Button>
        </div>
      </div>
    </section>
  )
} 