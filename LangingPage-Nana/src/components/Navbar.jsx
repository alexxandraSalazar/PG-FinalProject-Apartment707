"use client"

import { useState, useEffect } from "react"
import { Menu } from "lucide-react"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [hasScrolled, setHasScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useState(() => {
    if (typeof window !== "undefined") {
      return new Audio("/bg.mp3")
    }
    return null
  })[0]

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      if (scrollPosition > 10) {
        setHasScrolled(true)
      } else {
        setHasScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const links = document.querySelectorAll("a[href^='#']")
    links.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault()
        const targetId = link.getAttribute("href")?.substring(1)
        setActiveSection(targetId || "home")
        const targetElement = document.getElementById(targetId || "")
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 70, // Adjusted for fixed navbar height
            behavior: "smooth",
          })
        }
        setIsMenuOpen(false) // Close mobile menu on click
      })
    })
  }, [])

  // Add section visibility detection
  useEffect(() => {
    const handleSectionVisibility = () => {
      const sections = ["home", "about", "Rooms", "howto"]
      const scrollPosition = window.scrollY + 100 // Offset for better detection

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const top = element.offsetTop - 100
          const bottom = top + element.offsetHeight

          if (scrollPosition >= top && scrollPosition < bottom) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleSectionVisibility)
    return () => window.removeEventListener("scroll", handleSectionVisibility)
  }, [])

  const toggleMusic = () => {
    if (!audioRef) return

    if (isPlaying) {
      audioRef.pause()
    } else {
      audioRef.play().catch((error) => {
        console.error("Error playing audio:", error)
      })
    }
    setIsPlaying(!isPlaying)
  }

  return (
    <nav
      className={`w-full py-2 px-6 flex items-center justify-between fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        hasScrolled ? "bg-white shadow-md" : "bg-white/80 backdrop-blur-sm"
      }`}
    >
      {/* Decorative elements */}
      <div className="absolute left-36 top-4 w-1 h-1 bg-gray-200 rounded-full opacity-70"></div>
      <div className="absolute right-1/4 bottom-2 w-1 h-1 bg-gray-200 rounded-full opacity-70"></div>

      {/* Logo */}
      <div className="flex-shrink-0">
        <div className="w-12 h-12 rounded-full bg-[#EB008A] flex items-center justify-center">
          <img src="/side.svg" alt="logo" />
        </div>
      </div>

      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center justify-center flex-1">
        <div className="bg-gray-100 rounded-full px-6 py-2 flex items-center space-x-8">
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault()
              document.getElementById("home")?.scrollIntoView({
                behavior: "smooth",
                block: "start",
              })
              setActiveSection("home")
            }}
            className={`font-medium px-4 py-1 rounded-full transition-colors duration-300 ${
              activeSection === "home" ? "text-white bg-[#EB008A]" : "text-gray-700 hover:text-black"
            }`}
          >
            Home
          </a>
          <a
            href="#about"
            onClick={(e) => {
              e.preventDefault()
              document.getElementById("about")?.scrollIntoView({
                behavior: "smooth",
                block: "start",
              })
              setActiveSection("about")
            }}
            className={`font-medium px-4 py-1 rounded-full transition-colors duration-300 ${
              activeSection === "about" ? "text-white bg-[#EB008A]" : "text-gray-700 hover:text-black"
            }`}
          >
            About
          </a>
          <a
            href="#Rooms"
            onClick={(e) => {
              e.preventDefault()
              document.getElementById("Rooms")?.scrollIntoView({
                behavior: "smooth",
                block: "start",
              })
              setActiveSection("Rooms")
            }}
            className={`font-medium px-4 py-1 rounded-full transition-colors duration-300 ${
              activeSection === "Rooms" ? "text-white bg-[#EB008A]" : "text-gray-700 hover:text-black"
            }`}
          >
            Rooms
          </a>
          <a
            href="#howto"
            onClick={(e) => {
              e.preventDefault()
              document.getElementById("howto")?.scrollIntoView({
                behavior: "smooth",
                block: "start",
              })
              setActiveSection("howto")
            }}
            className={`font-medium px-4 py-1 rounded-full transition-colors duration-300 ${
              activeSection === "howto" ? "text-white bg-[#EB008A]" : "text-gray-700 hover:text-black"
            }`}
          >
            How to play
          </a>
        </div>
      </div>

      {/* Music Button */}
      <div className="hidden md:block">
        <button
          onClick={toggleMusic}
          className={`${isPlaying ? "bg-[#EB008A]" : "bg-[#EB008A]"} hover:bg-[#EB008A] text-white font-medium rounded-full px-4 py-2 flex items-center`}
        >
          {isPlaying ? "Pause Music" : "Play Music"}
        </button>
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden flex items-center">
        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-700 focus:outline-none">
          <Menu size={24} />
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-white shadow-lg p-4 md:hidden z-10">
          <div className="flex flex-col space-y-3">
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault()
                document.getElementById("home")?.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                })
                setActiveSection("home")
                setIsMenuOpen(false)
              }}
              className={`font-medium px-4 py-2 rounded-full text-center transition-colors duration-300 ${
                activeSection === "home" ? "text-white bg-[#EB008A]" : "text-gray-700 hover:text-black"
              }`}
            >
              Home
            </a>
            <a
              href="#about"
              onClick={(e) => {
                e.preventDefault()
                document.getElementById("about")?.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                })
                setActiveSection("about")
                setIsMenuOpen(false)
              }}
              className={`font-medium px-4 py-2 rounded-full text-center transition-colors duration-300 ${
                activeSection === "about" ? "text-white bg-[#EB008A]" : "text-gray-700 hover:text-black"
              }`}
            >
              About
            </a>
            <a
              href="#Rooms"
              onClick={(e) => {
                e.preventDefault()
                document.getElementById("Rooms")?.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                })
                setActiveSection("Rooms")
                setIsMenuOpen(false)
              }}
              className={`font-medium px-4 py-2 rounded-full text-center transition-colors duration-300 ${
                activeSection === "Rooms" ? "text-white bg-[#EB008A]" : "text-gray-700 hover:text-black"
              }`}
            >
              Rooms
            </a>
            <a
              href="#howto"
              onClick={(e) => {
                e.preventDefault()
                document.getElementById("howto")?.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                })
                setActiveSection("howto")
                setIsMenuOpen(false)
              }}
              className={`font-medium px-4 py-2 rounded-full text-center transition-colors duration-300 ${
                activeSection === "howto" ? "text-white bg-[#EB008A]" : "text-gray-700 hover:text-black"
              }`}
            >
              How to play
            </a>
            <button
              onClick={toggleMusic}
              className={`${isPlaying ? "bg-[#EB008A]" : "bg-[#EB008A]"} hover:bg-[#EB008A] text-white font-medium rounded-full px-6 py-2 mt-2`}
            >
              {isPlaying ? "Pause Music" : "Play Music"}
            </button>
          </div>
        </div>
      )}
    </nav>
  )
}
