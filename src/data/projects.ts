import type { Project } from "../types/app";

export const projects: readonly Project[] = [
  {
    name: "Eleganca",
    category: "E-Commerce Platform",
    description: "A modern commerce experience built for a polished shopping journey.",
    tech: ["HTML", "CSS", "JavaScript", "PHP", "MySQL"],
    url: "https://eleganca.xo.je",
    image: "https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Premium Cars",
    category: "Car Marketplace",
    description: "A focused marketplace interface for discovering premium vehicles.",
    tech: ["HTML", "CSS", "JavaScript", "PHP", "MySQL"],
    url: "https://premiumcars.xo.je",
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "LuxeStay Balkan",
    category: "Hotel Booking Platform",
    description: "Find and book the best hotels and resorts across the Balkans.",
    tech: ["HTML", "CSS", "JavaScript"],
    url: "https://luxestay-balkan.netlify.app",
    image: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Fly Travel",
    category: "Travel Platform",
    description: "A travel platform concept with a clear, discovery-first interface.",
    tech: ["HTML", "CSS", "JavaScript"],
    url: "https://flytravel.netlify.app",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Digital Agency",
    category: "Digital Agency Website",
    description: "A modern agency website focused on digital services and a clear business presentation.",
    tech: ["HTML", "CSS", "JavaScript"],
    url: "https://digitallweb.netlify.app",
    image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Personal Portfolio",
    category: "Portfolio Website",
    description: "A personal developer portfolio presenting skills, experience and selected work.",
    tech: ["HTML", "CSS", "JavaScript"],
    url: "https://blerions.netlify.app",
    image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=900&q=80",
  },
] as const;
