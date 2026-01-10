// Project interface and dummy data

export interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  imagePath: string;
}

export const projects: Project[] = [
  {
    id: "project-1",
    title: "E-Commerce Platform",
    description: "A full-featured online store with cart functionality, payment integration, and admin dashboard.",
    techStack: ["React", "Node.js", "MongoDB", "Stripe"],
    imagePath: "/images/project-1.jpg"
  },
  {
    id: "project-2",
    title: "Task Management App",
    description: "A collaborative project management tool with real-time updates and team features.",
    techStack: ["Vue.js", "Firebase", "Tailwind CSS"],
    imagePath: "/images/project-2.jpg"
  },
  {
    id: "project-3",
    title: "Portfolio Website",
    description: "A stunning personal portfolio with parallax scrolling effects and smooth animations.",
    techStack: ["Astro", "React", "Framer Motion", "Tailwind CSS"],
    imagePath: "/images/project-3.jpg"
  }
];
