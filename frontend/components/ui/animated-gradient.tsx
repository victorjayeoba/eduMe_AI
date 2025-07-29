"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

interface AnimatedGradientProps {
  width?: string
  height?: string
  colors?: string[]
  blur?: string
  zIndex?: number
  borderRadius?: string
  animationDuration?: number
  className?: string
}

export default function AnimatedGradient({
  width = "100%",
  height = "150px",
  colors = ["from-indigo-100/70", "via-purple-100/30", "via-pink-100/20", "to-transparent"],
  blur = "blur-md",
  zIndex = 5,
  borderRadius = "rounded-b-[100%]",
  animationDuration = 10,
  className = "",
}: AnimatedGradientProps) {
  const [colorIndex, setColorIndex] = useState(0)
  
  // Rotate through color schemes
  useEffect(() => {
    const interval = setInterval(() => {
      setColorIndex((prevIndex) => (prevIndex + 1) % colorSchemes.length)
    }, animationDuration * 1000)
    
    return () => clearInterval(interval)
  }, [animationDuration])
  
  // Predefined color schemes
  const colorSchemes = [
    ["from-indigo-100/70", "via-purple-100/30", "via-pink-100/20", "to-transparent"],
    ["from-blue-100/70", "via-cyan-100/30", "via-teal-100/20", "to-transparent"],
    ["from-emerald-100/70", "via-green-100/30", "via-lime-100/20", "to-transparent"],
    ["from-amber-100/70", "via-orange-100/30", "via-rose-100/20", "to-transparent"],
  ]
  
  // Use provided colors or cycle through predefined schemes
  const activeColors = colors.length > 0 ? colors : colorSchemes[colorIndex]
  
  return (
    <motion.div
      className={`absolute top-0 left-1/2 transform -translate-x-1/2 ${blur} ${borderRadius} ${className}`}
      style={{
        width,
        height,
        zIndex,
        background: `linear-gradient(to bottom, var(--color-1), var(--color-2), var(--color-3), var(--color-4))`,
        "--color-1": "rgb(224 231 255 / 0.7)", // indigo-100/70
        "--color-2": "rgb(233 213 255 / 0.3)", // purple-100/30
        "--color-3": "rgb(254 205 211 / 0.2)", // pink-100/20
        "--color-4": "transparent",
      } as React.CSSProperties}
      animate={{
        "--color-1": [
          "rgb(224 231 255 / 0.7)", // indigo-100/70
          "rgb(219 234 254 / 0.7)", // blue-100/70
          "rgb(207 250 254 / 0.7)", // cyan-100/70
          "rgb(236 253 245 / 0.7)", // emerald-100/70
          "rgb(254 243 199 / 0.7)", // amber-100/70
          "rgb(224 231 255 / 0.7)", // back to indigo-100/70
        ],
        "--color-2": [
          "rgb(233 213 255 / 0.3)", // purple-100/30
          "rgb(207 250 254 / 0.3)", // cyan-100/30
          "rgb(240 253 244 / 0.3)", // green-100/30
          "rgb(255 237 213 / 0.3)", // orange-100/30
          "rgb(255 228 230 / 0.3)", // rose-100/30
          "rgb(233 213 255 / 0.3)", // back to purple-100/30
        ],
        "--color-3": [
          "rgb(254 205 211 / 0.2)", // pink-100/20
          "rgb(167 243 208 / 0.2)", // teal-100/20
          "rgb(236 252 203 / 0.2)", // lime-100/20
          "rgb(255 228 230 / 0.2)", // rose-100/20
          "rgb(254 205 211 / 0.2)", // back to pink-100/20
        ],
      }}
      transition={{
        duration: animationDuration,
        repeat: Infinity,
        ease: "linear",
      }}
    />
  )
} 