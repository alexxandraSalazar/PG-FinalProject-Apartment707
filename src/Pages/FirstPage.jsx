"use client"

import { memo, useState } from "react"
import { X } from "lucide-react"
import { useNavigate } from "react-router-dom"

const FirstPage = memo(() => {
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false)
  const navigate = useNavigate()

  return (
    <section id="home" className="relative px-4 md:px-8 py-16 md:py-24 overflow-hidden bg-black text-white">
      <div className="absolute inset-0 z-0 opacity-40">
        <img src="/bg.jpeg" alt="Apartamento 707 background" className="w-full h-full object-cover" />
      </div>
      <div className="container relative z-10 grid gap-8 md:grid-cols-2 items-center">
        <div className="space-y-5">
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight">
            Visualizing Nana's World: <span className="text-[#EB008A]">Apartment 707</span>
          </h1>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => navigate("/play")} 
              className="px-8 py-2 text-base font-semibold rounded-full bg-[#EB008A] hover:bg-[#EB008A]/90 transition w-40"
            >
              Play
            </button>
            <button
              onClick={() => setIsHelpModalOpen(true)}
              className="px-8 py-2 text-base font-semibold rounded-full border border-[#EB008A] text-[#EB008A] hover:bg-[#EB008A]/10 transition w-40"
            >
              Help
            </button>
          </div>
        </div>
        <div className="relative h-[400px] md:h-[500px]"></div>
      </div>

      {isHelpModalOpen && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 rounded-lg max-w-2xl w-full p-6 relative max-h-[80vh] overflow-y-auto">
            <button
              onClick={() => setIsHelpModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              <X size={24} />
            </button>
            <h2 className="text-2xl font-bold text-[#ffffff] mb-4">How to Play</h2>
            <div className="space-y-4 text-gray-200">
              <p>Use the <strong>W</strong>, <strong>A</strong>, <strong>S</strong>, and <strong>D</strong> keys to move around.</p>
              <p>Use your <strong>mouse</strong> or <strong>touchpad</strong> to look around and explore the apartment.</p>
              <p>Enjoy the immersive experience as you navigate through Nana's world in Apartment 707.</p>
            </div>
          </div>
        </div>
      )}
    </section>
  )
})

export default FirstPage
