export default function CallAction() {
  return (
    <section className="py-6 md:py-8 bg-[#EB008A] text-white text-center rounded-lg px-4">
      <div className="container mx-auto px-2">
        <h2 className="text-lg md:text-xl font-bold mb-3">
          Ready to explore Apartment 707?
        </h2>
        <p className="text-sm text-pink-100 max-w-md mx-auto mb-4">
          Immerse yourself in the home where one of anime's most iconic friendships was forged.
        </p>
        <div className="flex flex-col sm:flex-row gap-2 justify-center">
          <button className="px-3 py-1.5 text-sm font-medium rounded-full bg-white text-[#EB008A] hover:bg-gray-100 transition">
            Start Tour
          </button>
          <button className="px-3 py-1.5 text-sm font-medium rounded-full border border-white text-white hover:bg-[#EB008A] transition">
            Watch Demo
          </button>
        </div>
      </div>
    </section>
  );
}
