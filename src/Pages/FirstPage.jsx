"use client"

import { memo, useState, useRef, useEffect, useCallback } from "react"
import { X, Volume2, VolumeX } from "lucide-react"
import { useNavigate } from "react-router-dom"

const FirstPage = memo(() => {
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false)
  const [isAudioModalOpen, setIsAudioModalOpen] = useState(false)
  const [volume, setVolume] = useState(0.5)
  const [isMuted, setIsMuted] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [needsUserInteraction, setNeedsUserInteraction] = useState(false)
  const audioRef = useRef(null)
  const navigate = useNavigate()

  // Función para intentar reproducir la música
  const tryPlayMusic = useCallback(async () => {
    if (audioRef.current && !isMuted) {
      try {
        await audioRef.current.play()
        setIsPlaying(true)
        setNeedsUserInteraction(false)
      } catch (error) {
        console.log("Autoplay prevented. User interaction required.")
        setNeedsUserInteraction(true)
        setIsPlaying(false)
      }
    }
  }, [isMuted])

  // Función para manejar el primer clic del usuario
  const handleFirstUserInteraction = useCallback(async () => {
    if (needsUserInteraction && audioRef.current && !isMuted) {
      await tryPlayMusic()
      // Remover el listener después del primer clic exitoso
      document.removeEventListener("click", handleFirstUserInteraction)
      document.removeEventListener("keydown", handleFirstUserInteraction)
    }
  }, [needsUserInteraction, isMuted, tryPlayMusic])

  // Inicializar el audio
  useEffect(() => {
    audioRef.current = new Audio("/bg-music.mp3")
    audioRef.current.loop = true
    audioRef.current.volume = volume

    // Intentar reproducir inmediatamente
    tryPlayMusic()

    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
      // Limpiar listeners
      document.removeEventListener("click", handleFirstUserInteraction)
      document.removeEventListener("keydown", handleFirstUserInteraction)
    }
  }, [])

  // Agregar listeners para el primer clic del usuario si es necesario
  useEffect(() => {
    if (needsUserInteraction) {
      document.addEventListener("click", handleFirstUserInteraction)
      document.addEventListener("keydown", handleFirstUserInteraction)
    }

    return () => {
      document.removeEventListener("click", handleFirstUserInteraction)
      document.removeEventListener("keydown", handleFirstUserInteraction)
    }
  }, [needsUserInteraction, handleFirstUserInteraction])

  // Manejar cambios de volumen y mute
  useEffect(() => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.pause()
        setIsPlaying(false)
      } else {
        audioRef.current.volume = volume
        // Si no está muteado, intentar reproducir
        if (!isPlaying) {
          tryPlayMusic()
        }
      }
    }
  }, [volume, isMuted, isPlaying, tryPlayMusic])

  // Manejar cuando el audio se pausa inesperadamente
  useEffect(() => {
    const handleAudioPause = () => {
      if (!isMuted) {
        // Si no está muteado pero se pausó, intentar reproducir de nuevo
        setTimeout(() => {
          tryPlayMusic()
        }, 100)
      }
    }

    const handleAudioEnded = () => {
      if (!isMuted) {
        // Si terminó pero no está muteado, reproducir de nuevo (aunque loop debería manejarlo)
        tryPlayMusic()
      }
    }

    if (audioRef.current) {
      audioRef.current.addEventListener("pause", handleAudioPause)
      audioRef.current.addEventListener("ended", handleAudioEnded)
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener("pause", handleAudioPause)
        audioRef.current.removeEventListener("ended", handleAudioEnded)
      }
    }
  }, [isMuted, tryPlayMusic])

  const handleVolumeChange = (e) => {
    const newVolume = Number.parseFloat(e.target.value)
    setVolume(newVolume)
    if (isMuted && newVolume > 0) {
      setIsMuted(false)
    }
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
  }

  return (
    <section id="home" className="relative px-4 md:px-8 py-16 md:py-24 overflow-hidden bg-black text-white">
      {/* Indicador de que se necesita interacción del usuario */}
      {needsUserInteraction && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 bg-[#EB008A] text-white px-4 py-2 rounded-lg shadow-lg">
          Click anywhere to start music
        </div>
      )}

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

      <button
        onClick={() => setIsAudioModalOpen(true)}
        className="fixed bottom-6 left-6 z-50 px-4 py-2 rounded-full bg-[#EB008A] hover:bg-[#EB008A]/90 transition flex items-center gap-2 shadow-lg"
      >
        {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
        <span>Music</span>
        {isPlaying && !isMuted && <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>}
      </button>

      <a
        href="https://pg-final-project-apartment707.vercel.app/"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 px-4 py-2 rounded-full bg-[#EB008A] hover:bg-[#EB008A]/90 transition flex items-center gap-2 shadow-lg"
      >
        Go back to homepage
      </a>

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
              <p>
                Use the <strong>W</strong>, <strong>A</strong>, <strong>S</strong>, and <strong>D</strong> keys to move
                around.
              </p>
              <p>
                Use your <strong>mouse</strong> or <strong>touchpad</strong> to look around and explore the apartment.
              </p>
              <p>Enjoy the immersive experience as you navigate through Nana's world in Apartment 707.</p>
            </div>
          </div>
        </div>
      )}

      {isAudioModalOpen && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 rounded-lg max-w-md w-full p-6 relative">
            <button
              onClick={() => setIsAudioModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              <X size={24} />
            </button>
            <h2 className="text-2xl font-bold text-[#ffffff] mb-4">Music Controls</h2>
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <button onClick={toggleMute} className="p-3 rounded-full bg-[#EB008A] hover:bg-[#EB008A]/90 transition">
                  {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
                </button>
                <span className="text-white">{isMuted ? "Unmute" : "Mute"}</span>
                {isPlaying && !isMuted && (
                  <div className="flex items-center gap-1">
                    <div className="w-1 h-3 bg-green-400 rounded animate-pulse"></div>
                    <div
                      className="w-1 h-4 bg-green-400 rounded animate-pulse"
                      style={{ animationDelay: "0.1s" }}
                    ></div>
                    <div
                      className="w-1 h-2 bg-green-400 rounded animate-pulse"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                    <span className="text-green-400 text-sm ml-2">Playing</span>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <label htmlFor="volume-control" className="block text-white">
                  Volume: {Math.round(volume * 100)}%
                </label>
                <input
                  id="volume-control"
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={volume}
                  onChange={handleVolumeChange}
                  className="w-full accent-[#EB008A]"
                />
              </div>

              {needsUserInteraction && (
                <div className="bg-yellow-900/50 border border-yellow-600 rounded-lg p-3">
                  <p className="text-yellow-200 text-sm">
                    Click anywhere on the page to start the music. Browsers require user interaction to play audio.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  )
})

export default FirstPage