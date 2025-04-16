"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
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

interface CompanyCardProps {
  logo: string
  name: string
  description: string
  index: number
  websiteUrl?: string
  showDetails?: boolean
  showWebsiteSection?: boolean
  zoomLogo?: boolean
}

const CompanyCard = ({
  logo,
  name,
  description,
  index,
  websiteUrl,
  showDetails = true,
  showWebsiteSection = false,
  zoomLogo = false,
}: CompanyCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.2 + index * 0.2 }}
      className="relative group"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-neutral-200/50 to-neutral-100/50 dark:from-neutral-800/50 dark:to-neutral-900/50 rounded-2xl blur-xl group-hover:blur-xl opacity-0 group-hover:opacity-70 transition-all duration-500"></div>
      <div className="relative bg-white dark:bg-neutral-900 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group-hover:translate-y-[-5px]">
        <div className={`p-8 flex flex-col items-center ${!showDetails ? "py-12" : ""}`}>
          <div className="w-full h-40 flex items-center justify-center mb-6 p-4">
            <img
              src={logo || "/placeholder.svg"}
              alt={name}
              className={`max-h-full max-w-full object-contain ${zoomLogo ? "scale-125 transform" : ""}`}
            />
          </div>
          {showDetails && (
            <>
              <h3 className="text-xl font-semibold text-neutral-900 dark:text-white mb-2">{name}</h3>
              <p className="text-neutral-600 dark:text-neutral-300 text-center">{description}</p>
            </>
          )}
        </div>
        {showWebsiteSection && websiteUrl && (
          <div className="bg-gradient-to-r from-neutral-100 to-neutral-50 dark:from-neutral-800 dark:to-neutral-900 p-4 flex justify-center">
            <a
              href={websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white font-medium transition-colors"
            >
              Visit Website →
            </a>
          </div>
        )}
      </div>
    </motion.div>
  )
}

export default function OurCompanies() {
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

  const companies = [
    {
      logo: "/images/kaj-logo.png",
      name: "KAJ Trading Company",
      description: "Specializing in global trade solutions with innovative logistics and supply chain management.",
      showWebsiteSection: false,
      zoomLogo: false,
    },
    {
      logo: "/images/zizgen-logo.png",
      name: "Zizgen.co",
      description: "Digital innovation and technology solutions for modern businesses and enterprises.",
      websiteUrl: "https://www.zizgen.co",
      showWebsiteSection: false,
      zoomLogo: true, // Enable zoom for Zizgen.co logo
    },
    {
      logo: "/images/circles-logo.png",
      name: "Circles",
      description: "Creative design and branding agency focused on minimalist aesthetics and impactful visuals.",
      showDetails: false,
      showWebsiteSection: false,
      zoomLogo: false,
    },
  ]

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-white dark:bg-neutral-950">
      <div className="absolute inset-0">{isMobile ? <MobileFloatingPaths /> : <DesktopFloatingPaths />}</div>

      <div className="relative z-10 container mx-auto px-4 md:px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <Link
            href="/"
            className="inline-flex items-center text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-neutral-900 dark:text-white">Our Companies</h1>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {companies.map((company, index) => (
            <CompanyCard
              key={index}
              logo={company.logo}
              name={company.name}
              description={company.description}
              index={index}
              websiteUrl={company.websiteUrl}
              showDetails={company.showDetails !== false}
              showWebsiteSection={company.showWebsiteSection}
              zoomLogo={company.zoomLogo}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
