"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useEffect, useState } from "react"

// Mobile version inspired by earlier versions
function MobileFloatingPaths() {
  const paths = Array.from({ length: 36 }, (_, i) => ({
    id: i,
    d: `M-${380 - i * 5} -${189 + i * 6}C-${380 - i * 5} -${189 + i * 6} -${312 - i * 5} ${216 - i * 6} ${
      152 - i * 5
    } ${343 - i * 6}C${616 - i * 5} ${470 - i * 6} ${684 - i * 5} ${875 - i * 6} ${684 - i * 5} ${875 - i * 6}`,
    color: `rgba(15,23,42,${0.1 + i * 0.03})`,
    width: 0.5 + i * 0.03,
  }))

  return (
    <div className="absolute inset-0 pointer-events-none">
      <svg className="w-full h-full text-slate-950 dark:text-white" viewBox="0 0 696 316" fill="none">
        <title>Background Paths</title>
        {paths.map((path) => (
          <motion.path
            key={path.id}
            d={path.d}
            stroke="currentColor"
            strokeWidth={path.width}
            strokeOpacity={0.1 + path.id * 0.03}
            initial={{ pathLength: 0.3, opacity: 0.6 }}
            animate={{
              pathLength: 1,
              opacity: [0.3, 0.6, 0.3],
              pathOffset: [0, 1, 0],
            }}
            transition={{
              duration: 20 + Math.random() * 10,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />
        ))}
      </svg>
    </div>
  )
}

// Desktop version with ON letters
function DesktopFloatingPaths() {
  // Create paths for letter "O" - reduced size compared to N
  const oLetterPaths = Array.from({ length: 10 }, (_, i) => {
    const radius = 80 + i * 5 // Reduced radius to make O smaller
    const centerX = 200
    const centerY = 150
    // Create a circular path for "O"
    const angle = (i * 20) % 360
    const startAngle = (angle * Math.PI) / 180
    const endAngle = ((angle + 340) * Math.PI) / 180

    const startX = centerX + radius * Math.cos(startAngle)
    const startY = centerY + radius * Math.sin(startAngle)
    const endX = centerX + radius * Math.cos(endAngle)
    const endY = centerY + radius * Math.sin(endAngle)

    // SVG arc command
    const arcPath = `M ${startX} ${startY} A ${radius} ${radius} 0 1 1 ${endX} ${endY}`

    return {
      id: i,
      d: arcPath,
      color: i % 2 === 0 ? "#FF5500" : "#000000", // Brighter orange for better visibility
      width: 2 + i * 0.3, // Increased stroke width
    }
  })

  // Create paths for letter "N" - keeping the same size
  const nLetterPaths = Array.from({ length: 10 }, (_, i) => {
    const offset = i * 6 // Increased spacing
    const startX = 400 + offset
    const startY = 250 + offset / 2
    const midX1 = startX
    const midY1 = 50 - offset / 2
    const midX2 = 550 + offset // Widened the N
    const midY2 = 250 + offset / 2
    const endX = 550 + offset // Widened the N
    const endY = 50 - offset / 2

    // Path for "N" - using a single path instead of three separate lines for clarity
    const nPath = `M ${startX} ${startY} L ${midX1} ${midY1} L ${midX2} ${midY2} L ${endX} ${endY}`

    return {
      id: i + 10, // Continue ID sequence
      d: nPath,
      color: i % 2 === 0 ? "#000000" : "#FF5500", // Brighter orange for better visibility
      width: 2 + i * 0.3, // Increased stroke width
    }
  })

  // Combine both sets of paths
  const paths = [...oLetterPaths, ...nLetterPaths]

  return (
    <div className="absolute inset-0 pointer-events-none">
      <svg className="w-full h-full" viewBox="0 0 700 300" fill="none">
        <title>ON Background</title>
        {paths.map((path) => (
          <motion.path
            key={path.id}
            d={path.d}
            stroke={path.color}
            strokeWidth={path.width}
            strokeOpacity={0.5 + (path.id % 10) * 0.05} // Increased base opacity
            fill="none"
            initial={{ pathLength: 0, opacity: 0.5 }}
            animate={{
              pathLength: 1,
              opacity: [0.6, 0.9, 0.6], // Increased animation opacity range
              pathOffset: [0, 1, 0],
            }}
            transition={{
              duration: 15 + Math.random() * 5, // Slightly faster animation
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
              delay: path.id * 0.2, // Increased delay between paths
            }}
          />
        ))}
      </svg>
    </div>
  )
}

export default function BackgroundPaths() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Check if we're on the client side
    if (typeof window !== "undefined") {
      // Initial check
      setIsMobile(window.innerWidth < 768)

      // Add resize listener
      const handleResize = () => {
        setIsMobile(window.innerWidth < 768)
      }

      window.addEventListener("resize", handleResize)

      // Clean up
      return () => {
        window.removeEventListener("resize", handleResize)
      }
    }
  }, [])

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-white dark:bg-neutral-950">
      <div className="absolute inset-0">{isMobile ? <MobileFloatingPaths /> : <DesktopFloatingPaths />}</div>

      <div className="relative z-10 container mx-auto px-4 md:px-6 text-center flex flex-col justify-between min-h-screen py-12">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
          className="max-w-4xl mx-auto flex-1 flex flex-col justify-center"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="mb-8"
          >
            <img
              src="/images/databonnd-logo.png"
              alt="DATABONND CONGLOMERATE"
              className="max-w-full h-auto mx-auto"
              style={{ maxHeight: "240px" }}
            />
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
          className="mt-auto pt-24 pb-8"
        >
          <div
            className="inline-block group relative bg-gradient-to-b from-black/10 to-white/10 
                    dark:from-white/10 dark:to-black/10 p-px rounded-2xl backdrop-blur-lg 
                    overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <Link href="/our-companies">
              <Button
                variant="ghost"
                className="rounded-[1.15rem] px-8 py-6 text-lg font-semibold backdrop-blur-md 
                          bg-white/95 hover:bg-white/100 dark:bg-black/95 dark:hover:bg-black/100 
                          text-black dark:text-white transition-all duration-300 
                          group-hover:-translate-y-0.5 border border-black/10 dark:border-white/10
                          hover:shadow-md dark:hover:shadow-neutral-800/50"
              >
                <span className="opacity-90 group-hover:opacity-100 transition-opacity">Our Companies</span>
                <span
                  className="ml-3 opacity-70 group-hover:opacity-100 group-hover:translate-x-1.5 
                                  transition-all duration-300"
                >
                  →
                </span>
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
