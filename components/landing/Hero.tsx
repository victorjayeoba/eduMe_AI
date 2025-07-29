import { Button } from "@/components/ui/button"
import { useEffect, useRef, useState } from "react"
import Head from 'next/head'
import { motion } from "framer-motion"
import TrueFocus from "../react-bits/TrueFocus"
import TextType from "../react-bits/TextType"

export default function Hero() {
  // Videos for the carousel
  const videos = [
    { id: 1, src: "/talkingPreview1.mp4", title: "AI Tutoring Session" },
    { id: 2, src: "/talkingPreview3.mp4", title: "Career Guidance" }, // Replace with actual videos
    { id: 3, src: "/talkingPreview2.mp4", title: "Exam Preparation" }, // Replace with actual videos
    { id: 4, src: "/talkingPreview4.mp4", title: "Skill Development" }, // Replace with actual videos
    { id: 5, src: "/talkingPreview2.mp4", title: "Interactive Learning" }, // Replace with actual videos
  ]
  
  // Duplicate videos for seamless loop
  const duplicatedVideos = [...videos, ...videos]
  
  // Refs for video elements
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([])
  
  // Animation controls
  const [isHovering, setIsHovering] = useState(false)
  
  // Initialize video refs
  useEffect(() => {
    videoRefs.current = videoRefs.current.slice(0, duplicatedVideos.length)
  }, [duplicatedVideos.length])
  
  // Play videos when they come into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const video = entry.target as HTMLVideoElement
            video.play().catch((e) => console.log("Autoplay prevented:", e))
          } else {
            const video = entry.target as HTMLVideoElement
            video.pause()
          }
        })
      },
      { threshold: 0.5 }
    )
    
    videoRefs.current.forEach((video) => {
      if (video) {
        observer.observe(video)
      }
    })
    
    return () => {
      videoRefs.current.forEach((video) => {
        if (video) {
          observer.unobserve(video)
        }
      })
    }
  }, [duplicatedVideos.length])

  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet" />
      </Head>
      
      <section className="relative bg-white py-20 overflow-hidden font-['Montserrat']">
        {/* Decorative Elements - Neutral tones */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-gray-100 rounded-full opacity-70 -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-stone-100 rounded-full opacity-70 translate-x-1/3 translate-y-1/3" />
        <div className="absolute top-1/4 right-1/4 w-32 h-32 bg-neutral-100 rounded-full opacity-50" />
        
        {/* Subtle Gradient Elements */}
        <div className="absolute top-1/3 left-1/4 w-64 h-1 bg-gradient-to-r from-gray-200 to-transparent opacity-60 transform -rotate-45" />
        <div className="absolute bottom-1/3 right-1/4 w-64 h-1 bg-gradient-to-l from-stone-200 to-transparent opacity-60 transform rotate-45" />
        <div className="absolute top-2/3 left-1/2 w-96 h-1 bg-gradient-to-r from-neutral-200 to-transparent opacity-60 transform rotate-12" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Centered Content */}

          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-4xl gap-4 flex flex-wrap items-center justify-center md:text-6xl font-bold mb-3 leading-tight text-gray-900">
                
            <span> Learn Smarter with    </span>  <span className="relative">
                <TrueFocus 
                  sentence="AI"
                  manualMode={false}
                  blurAmount={0}
                  borderColor="red"
                  glowColor="rgba(255, 0, 0, 0.6)"
                  animationDuration={0.5}
                  pauseBetweenAnimations={2}
                />
              </span>
            </h1>
            
            <p className="text-lg md:text-2xl text-gray-700 mb-10 mx-auto max-w-2xl font-medium tracking-wide">
              <TextType
                text = {[
                "Curated for your rhythm. Built with care.",
                "Inspired by your journey. Designed to grow with you.",
                "Understands your flow. Adapts to your mind.",
                "More than smart. It’s made for how you think."
              ]}
                as="span"
                className="text-type text-gray-700"
                showCursor={true}
                hideCursorWhileTyping={false}
                cursorCharacter="|"
                textColors={["#000000", "#10B981", "#8B5CF6", "#EC4899", "#F59E0B"]}
                cursorClassName="text-type__cursor text-gray-700"
                cursorBlinkDuration={0.5}
              />
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-gray-800 hover:bg-gray-900 text-white px-8 py-4 text-lg rounded-full transition-all duration-300 font-medium shadow-lg hover:shadow-xl border border-gray-700 relative overflow-hidden group"
              >
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                <span className="relative z-10">Get Started</span>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-4 text-lg rounded-full transition-all duration-300 font-medium"
              >
                Learn More
              </Button>
            </div>
          </div>
          <br/>

       


          {/* Video Carousel with Framer Motion */}
          <div 
            className="relative h-[300px] mt-12 overflow-hidden"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <motion.div 
              className="flex gap-6 absolute"
              animate={{
                x: isHovering ? ["0%", "-50%"] : ["0%", "-50%"]
              }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: isHovering ? 30 : 20,
                  ease: "linear"
                }
              }}
            >
              {duplicatedVideos.map((video, index) => (
                <motion.div
                  key={`${video.id}-${index}`}
                  className="relative flex-shrink-0 w-[320px] h-[240px] rounded-2xl overflow-hidden shadow-lg"
                  whileHover={{ scale: 1.05, zIndex: 10 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <video
                    ref={(el) => {
                      videoRefs.current[index] = el;
                    }}
                    src={video.src}
                    className="w-full h-full object-cover"
                    muted
                    loop
                    playsInline
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <p className="text-white text-sm font-medium">{video.title}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
            
            {/* Fading edges */}
            <div className="absolute top-0 bottom-0 left-0 w-16 bg-gradient-to-r from-white to-transparent z-10" />
            <div className="absolute top-0 bottom-0 right-0 w-16 bg-gradient-to-l from-white to-transparent z-10" />
          </div>
        </div>
      </section>
    </>
  )
}