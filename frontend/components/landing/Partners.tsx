import Image from "next/image"
import Marquee from "react-fast-marquee"
import { Button } from "../ui/button"
import Link from "next/link"

// Partner data with logos
const partnersData = [
  { name: "Damocles", logo: "/damocles.jpg" },
  { name: "Data Science Nigeria (OAU)", logo: "/dsn.png" },
  { name: "Educhain", logo: "/educhain.png" },
  { name: "Google Developer Group (OAU)", logo: "/gdg.png" },
  { name: "Obafemi Awolowo University", logo: "/oau.png" },
  { name: "HackerX Africa", logo: "/hackerx.jpg" },
  { name: "Open Campus", logo: "/opencampus.jpg" },
  { name: "University of Lagos", logo: "/unilag.png" },
  { name: "Sail Fish", logo: "/sailfish.png" },
  { name: "She Code Africa (OAU)", logo: "/scaoau.jpg" },
  { name: "University of Ibadan", logo: "/ui.jpg" },
]

export default function Partners() {
  return (
    <section className="py-16 bg-white border-t border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center mb-10">
          <div className="h-px bg-gray-200 w-16"></div>
          <h2 className="text-center text-base font-medium text-gray-600 mx-4 uppercase tracking-wider">Trusted by leading institutions</h2>
          <div className="h-px bg-gray-200 w-16"></div>
        </div>
        
        <div className="relative">
          <Marquee
            speed={60}
            direction="right"
            gradient={true}
            gradientColor="white"
            gradientWidth={60}
            pauseOnHover={true}
            className="py-6 overflow-hidden"
          >
            {partnersData.map((partner, index) => (
              <div key={index} className="mx-14 text-center flex flex-col items-center h-28">
                <div className="relative h-16 w-40 mb-3 transition-all duration-300 ease-in-out hover:scale-110">
                  <Image 
                    src={partner.logo}
                    alt={`${partner.name} logo`}
                    fill
                    sizes="160px"
                    className="object-contain filter grayscale hover:grayscale-0 opacity-75 hover:opacity-100 transition-all duration-300"
                    style={{ objectFit: 'contain' }}
                  />
                </div>
                <span className="text-xs font-medium mt-1 px-1 py-0.5 bg-white/80 rounded text-gray-800 max-w-40 text-center whitespace-nowrap">{partner.name}</span>
              </div>
            ))}
          </Marquee>
        </div>

        <div className="text-center mt-20">
          <h3 className="text-3xl font-bold text-center mb-4">EduMeAI</h3>
          <p className="text-lg text-gray-600 uppercase tracking-wider mb-6">COMPLETE LEARNING SOLUTION</p>
         COMPLETE LEARNING SOLUTION  
         <Link
                href="/signup">
          <Button className="bg-black hover:bg-black/80 text-white px-8 py-3 rounded-full text-lg">
            Try EduMeAI now
          </Button>
          </Link>
        </div> 
      </div>
    </section>
  )
} 