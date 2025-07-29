import { Button } from "@/components/ui/button"
import { useEffect, useRef, useState } from "react"
import Head from 'next/head'
import { motion, useMotionValue, useTransform, useAnimation } from "framer-motion"
import TrueFocus from "../react-bits/TrueFocus"
import TextType from "../react-bits/TextType"

export default function Hero() {
  // Videos for the carousel
  const videos = [
    { id: 1, src: "/talkingPreview2.mp4", title: "AI Tutoring Session" },
    { id: 2, src: "/talkingPreview3.mp4", title: "Career Guidance" }, // Replace with actual videos
    { id: 3, src: "/talkingPreview4.mp4", title: "Exam Preparation" }, // Replace with actual videos
    { id: 4, src: "/talkingPreview2.mp4", title: "Skill Development" }, // Replace with actual videos
    { id: 5, src: "/talkingPreview1.mp4", title: "Interactive Learning" }, // Replace with actual videos
  ]
  
  // Duplicate videos for seamless loop
  const duplicatedVideos = [...videos, ...videos]
  
  // Refs for video elements
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([])
  const carouselRef = useRef<HTMLDivElement>(null)
  
  // Animation controls
  const [isHovering, setIsHovering] = useState(false)
  const x = useMotionValue(0)
  const controls = useAnimation()
  
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

  // Carousel animation with Framer Motion
  useEffect(() => {
    const totalWidth = duplicatedVideos.length * 326; // 320px + 6px gap
    const halfWidth = totalWidth / 2;
    
    const animateCarousel = async () => {
      while (true) {
        await controls.start({
          x: -halfWidth,
          transition: { 
            duration: isHovering ? 0 : 30, 
            ease: "linear" 
          }
        });
        // Reset position without animation
        controls.set({ x: 0 });
      }
    };
    
    animateCarousel();
    
    return () => {
      controls.stop();
    };
  }, [controls, duplicatedVideos.length, isHovering]);

  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet" />
      </Head>
      
      <section className="relative bg-white py-20 overflow-hidden font-['Montserrat']">
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
                "More than smart. It's made for how you think."
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
              ref={carouselRef}
              className="flex gap-6 absolute will-change-transform"
              style={{ width: `${duplicatedVideos.length * 326}px` }} // 320px + 6px gap
              animate={controls}
            >
              {duplicatedVideos.map((video, index) => (
                <div
                  key={`${video.id}-${index}`}
                  className="relative flex-shrink-0 w-[320px] h-[240px] rounded-2xl overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105 hover:z-10"
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
                </div>
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