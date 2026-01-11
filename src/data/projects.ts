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
    id: "project-1",
    title: "E-Commerce Platform",
    description: "A full-featured online store with cart functionality, payment integration, and admin dashboard.",
    techStack: ["React", "Node.js", "MongoDB", "Stripe"],
    imagePath: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop",
    githubUrl: "https://github.com/yourusername/ecommerce",
    year: "2024",
    category: "Full Stack"
  },
  {
    id: "project-2",
    title: "Task Management App",
    description: "A collaborative project management tool with real-time updates and team features.",
    techStack: ["Vue.js", "Firebase", "Tailwind CSS"],
    imagePath: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=600&fit=crop",
    githubUrl: "https://github.com/yourusername/taskapp",
    year: "2023",
    category: "Web App"
  },
  {
    id: "project-3",
    title: "Portfolio Website",
    description: "A stunning personal portfolio with parallax scrolling effects and smooth animations.",
    techStack: ["Astro", "React", "Framer Motion", "Tailwind CSS"],
    imagePath: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
    githubUrl: "https://github.com/yourusername/portfolio",
    year: "2023",
    category: "Frontend"
  }
];
