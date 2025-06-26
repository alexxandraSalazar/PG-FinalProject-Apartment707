import { Home, Sofa, Music } from "lucide-react";

export default function About() {
  return (
    <section id="about" className="py-8 md:py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">About the Virtual Tour</h2>
          <p className="text-muted-foreground">
            An immersive experience that lets you explore every corner of the iconic Apartment 707.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8 justify-center items-center text-center">
          <FeatureCard
            icon={<Home className="h-6 w-6 text-pink-600" />}
            title="360° Walkthrough"
            description="Explore each room of the apartment with stunning 360-degree views."
          />
          <FeatureCard
            icon={<Sofa className="h-6 w-6 text-pink-600" />}
            title="Interactive Details"
            description="Discover interactive objects that reveal key stories and moments from the anime."
          />
          <FeatureCard
            icon={<Music className="h-6 w-6 text-pink-600" />}
            title="Original Soundtrack"
            description="Enjoy music from BLAST and Trapnest as you navigate the apartment."
          />
        </div>
      </div>
    </section>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="flex flex-col items-center text-center p-6 rounded-lg border border-[#c3c3c3] bg-card shadow-sm">
      <div className="p-3 rounded-full bg-pink-100 mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}