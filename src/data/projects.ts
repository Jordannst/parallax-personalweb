// Project interface and data

export interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  imagePath: string;      // Screenshot path (local or URL)
  githubUrl?: string;     // GitHub repository URL
  liveUrl?: string;       // Live demo URL (optional)
  year: string;
  category: string;
}

// GANTI DATA INI DENGAN PROJECT ANDA:
// 1. Taruh screenshot di folder: public/images/projects/
// 2. Isi path: /images/projects/nama-file.png
// 3. Isi githubUrl dengan link repository

export const projects: Project[] = [
  {
    id: "project-rag-chatbot",
    title: "Contextual RAG Chat",
    description: "Production-grade Retrieval-Augmented Generation system with hybrid semantic search (vector + full-text), AI-powered document analysis, and Data Analyst Agent that generates Python code from natural language queries for CSV/Excel analytics with chart visualization.",
    techStack: ["Next.js", "Go", "PostgreSQL", "pgvector", "Google Gemini AI", "Python", "Docker"],
    imagePath: "/rag-chatbot.webp" , 
    githubUrl: "https://github.com/Jordannst/contextual-rag-chat",
    year: "2025",
    category: "Full Stack"
},
  {
  id: "kassentix-pos",
  title: "Kassentix POS",
  description: "Cloud-based Point of Sale SaaS for Indonesian SMEs. Features AI analytics, real-time inventory sync, multi-outlet management & subscription tiers. Try FREE at kassentix.cloud!",
  techStack: ["Next.js 15", "TypeScript", "Tailwind CSS", "Express.js", "Prisma", "Socket.io"],
  imagePath: "/kassentix.webp",
  liveUrl: "https://kassentix.cloud",
  year: "2025",
  category: "SaaS Platform"
},
  // {
  //   id: "project-3",
  //   title: "Portfolio Website",
  //   description: "A stunning personal portfolio with parallax scrolling effects and smooth animations.",
  //   techStack: ["Astro", "React", "Framer Motion", "Tailwind CSS"],
  //   imagePath: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
  //   githubUrl: "https://github.com/yourusername/portfolio",
  //   year: "2023",
  //   category: "Frontend"
  // }
];
