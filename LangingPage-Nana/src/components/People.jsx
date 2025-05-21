export default function People() {
    const people = [
      { name: "Nana Osaki", file: "/nana-img.svg", role: "Main resident" },
      { name: "Nana Komatsu", file: "/hachi-img.svg", role: "Main resident" },
      { name: "Shinichi", file: "/shinichi.svg", role: "Frequent visitor" },
      { name: "Yasu", file: "/yasu.svg", role: "Frequent visitor" },
      { name: "Nobu", file: "/nobu.svg", role: "Frequent visitor" },
      { name: "Takumi", file: "/takumi.svg", role: "Occasional visitor" },
      { name: "Reira", file: "/reira.svg", role: "Occasional visitor" },
    ];
  
    return (
      <section id="residents" className="pb-16 md:pb-24 bg-[#fefefe]">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Residents & Visitors</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Meet the characters who lived in or frequently visited Apartment 707.
            </p>
          </div>
          
          {/* 4 columnas por fila y centrado */}
          <div className="flex flex-wrap justify-center gap-20"> 
            {people.map((person, index) => (
              <ResidentCard key={index} person={person} />
            ))}
          </div>
        </div>
      </section>
    );
  }
  
  function ResidentCard({ person }) {
    return (
      <div className="flex flex-col items-center text-center space-y-3">
        <div className="w-55 h-55 rounded-full overflow-hidden border-2 border-gray-300 shadow-sm">
          <img
            src={person.file}
            alt={person.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <h3 className="text-base font-semibold">{person.name}</h3>
          <p className="text-sm text-muted-foreground">{person.role}</p>
        </div>
      </div>
    );
  }
  