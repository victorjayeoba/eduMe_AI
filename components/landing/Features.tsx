import { Card, CardContent } from "@/components/ui/card"
import { Video } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { motion, useScroll, useTransform, useInView } from "framer-motion"

const features = [
  {
    id: 1,
    title: "AI Video Tutoring",
    description: "Connect with human-like AI tutors through interactive video sessions. Get personalized help on any subject, anytime.",
    videoSrc: "/talkingPreview1.mp4",
    icon: <Video className="w-8 h-8 text-black" />
  },
  {
    id: 2,
    title: "Career Guide",
    description: "Discover your ideal university courses based on your interests, strengths, and career aspirations through our AI-guided assessment.",
    videoSrc: "/talkingPreview2.mp4",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 text-black">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
      </svg>
    )
  },
  {
    id: 3,
    title: "Exam Preparation",
    description: "Specialized prep courses for JAMB, WAEC, IELTS, TOEFL, and other standardized tests with personalized study plans.",
    videoSrc: "/talkingPreview3.mp4",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 text-black">
        <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
        <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
        <path d="M9 14l2 2 4-4"></path>
      </svg>
    )
  },
  {
    id: 4,
    title: "Skill Hub",
    description: "Develop essential digital and soft skills beyond academics with practical courses designed for real-world success.",
    videoSrc: "/talkingPreview4.mp4",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 text-black">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
      </svg>
    )
  }
]

const FeatureItem = ({ feature, isActive, index }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { margin: "-40% 0px -40% 0px" })
  
  useEffect(() => {
    if (isInView) {
      feature.onVisible(index)
    }
  }, [isInView, index, feature])
  
  return (
    <motion.div
      ref={ref}
      className={`py-16 ${isActive ? 'opacity-100' : 'opacity-50'}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: false, margin: "-100px" }}
    >
      <Card className={`bg-gray-50 border-0 shadow-sm ${isActive ? 'shadow-lg' : 'shadow-sm'} transition-all duration-300`}>
        <CardContent className="p-8">
          <div className="flex items-start">
            <div className="w-16 h-16 bg-black/10 rounded-full flex items-center justify-center mr-6 flex-shrink-0">
              {feature.icon}
            </div>
            <div className="text-left">
              <h3 className="text-xl font-bold text-black mb-4">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default function Features() {
  const [activeFeature, setActiveFeature] = useState(0)
  const containerRef = useRef(null)
  const videoRefs = useRef([])

  useEffect(() => {
    // Initialize video refs array
    videoRefs.current = videoRefs.current.slice(0, features.length)
    
    // Pause all videos first
    videoRefs.current.forEach(video => {
      if (video) video.pause()
    })
    
    // Play the active video
    if (videoRefs.current[activeFeature]) {
      videoRefs.current[activeFeature].currentTime = 0
      videoRefs.current[activeFeature].play().catch(e => console.log("Autoplay prevented:", e))
    }
  }, [activeFeature])

  // Add onVisible handler to each feature
  const featuresWithHandlers = features.map(feature => ({
    ...feature,
    onVisible: (index) => setActiveFeature(index)
  }))

  return (
    <section id="solutions" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-black mb-4">Our Learning Solutions</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Comprehensive tools to support your educational journey, powered by advanced AI
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 relative">
          {/* Left side: Scrolling features */}
          <div className="space-y-6" ref={containerRef}>
            {featuresWithHandlers.map((feature, index) => (
              <FeatureItem 
                key={feature.id}
                feature={feature}
                isActive={index === activeFeature}
                index={index}
              />
            ))}
          </div>
          
          {/* Right side: Video display */}
          <div className="sticky hidden md:block top-32 h-[500px] rounded-2xl overflow-hidden shadow-xl bg-gray-100">
            <div className="relative w-full h-full">
              {features.map((feature, index) => (
                <div 
                  key={feature.id}
                  className={`absolute inset-0 transition-opacity duration-500 ${activeFeature === index ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
                >
                  <video
                    ref={el => videoRefs.current[index] = el}
                    src={feature.videoSrc}
                    className="w-full h-full object-cover"
                    muted
                    loop
                    playsInline
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                    <div className="p-8 text-white">
                      <h3 className="text-2xl font-bold mb-2">{feature.title}</h3>
                      <p className="text-white/80 text-sm">{feature.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 