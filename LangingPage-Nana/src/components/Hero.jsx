export default function Hero() {
    return (
      <section id="home" className="relative px-4 md:px-8 py-16 md:py-24 overflow-hidden bg-black text-white">
        <div className="absolute inset-0 z-0 opacity-40">
          <img
            src="/bg.jpeg"
            alt="Apartamento 707 background"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="container relative z-10 grid gap-8 md:grid-cols-2 items-center">
          <div className="space-y-5">
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight">
              Visualizing Nana’s World: <span className="text-[#EB008A]">Apartment 707</span>
            </h1>
            <p className="text-base md:text-lg text-gray-300 max-w-md">
              Immerse yourself in a virtual walk through Nana Osaki and Nana Komatsu's iconic shared home, where friendship
              and the music are intertwined.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <button className="px-4 py-2 text-base font-semibold rounded-full bg-[#EB008A] hover:bg-[#EB008A] transition">
                Start Tour
              </button>
              <button className="px-4 py-2 text-base font-semibold rounded-full border border-white text-white hover:bg-white/10 transition">
                Watch video
              </button>
            </div>
          </div>
          <div className="relative h-[400px] md:h-[500px]">

          </div>
        </div>
      </section>
    )
  }
  