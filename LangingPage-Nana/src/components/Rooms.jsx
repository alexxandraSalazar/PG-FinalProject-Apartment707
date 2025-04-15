export default function Rooms() {
    const spaces = [
      {
        name: "Living Room",
        file: "/sala.jpg",
        description: "The heart of the apartment where unforgettable memories were made.",
      },
      {
        name: "Kitchen",
        file: "cocina.jpg",
        description: "Where meals were shared and heartfelt conversations unfolded.",
      },
      {
        name: "Dining Room",
        file: "comedor.png",
        description: "A cozy space that brought the roommates together.",
      },
      {
        name: "Nana O.'s Room",
        file: "nana-o.jpg",
        description: "A reflection of Nana O.'s fierce personality and musical soul.",
      },
      {
        name: "Hachi's Room",
        file: "hachi.jpg",
        description: "Warm, dreamy and full of hope — just like Hachi herself.",
      },
      {
        name: "Bathroom",
        file: "baño.png",
        description: "Simple, shared, and filled with little everyday stories.",
      },
    ];
  
    return (
      <section id="Rooms" className="py-16 md:py-24 bg-[#f5f5f5]">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Apartment Gallery</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Exclusive images from every corner of Apartment 707.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 justify-center">
            {spaces.map((space, index) => (
              <GalleryCard key={index} space={space} />
            ))}
          </div>
        </div>
      </section>
    );
  }
  
  function GalleryCard({ space }) {
    return (
      <div className="max-w-sm mx-auto rounded-lg border border-[#c3c3c3] overflow-hidden shadow-sm bg-card transition-all duration-300 opacity-120 hover:opacity-100 hover:shadow-md">
        <div className="aspect-square overflow-hidden">
          <img
            src={`${space.file}`}
            alt={`${space.name} - Apartment 707`}
            className="w-full h-full object-cover transition-transform duration-300 transform hover:scale-110"
          />
        </div>
        <div className="p-4 text-center">
          <h3 className="text-lg font-semibold mb-2">{space.name}</h3>
          <p className="text-muted-foreground text-sm">{space.description}</p>
        </div>
      </div>
    );
  }
  