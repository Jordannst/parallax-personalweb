import { useRef } from "react";
import { motion, useScroll, useTransform, useMotionTemplate } from "framer-motion";
import InfiniteMarquee from "../ui/InfiniteMarquee.jsx";

const techStack = [
  "REACT",
  "ASTRO", 
  "EXPRESS.JS",
  "PRISMA",
  "TAILWIND",
  "NODE.JS",
  "POSTGRESQL",
  "TYPESCRIPT",
  "NEXT.JS",
  "FRAMER MOTION",
  "MONGODB",
  "PYTHON",
  "C#",
  "JAVASCRIPT",
  "GO",
  "FIGMA",
  "GIT"
];

export default function TechStack() {
  const sectionRef = useRef(null);
  
  // Track when section enters viewport
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "start start"], // Animation happens as section enters view
  });

  // Animate border-radius from flat to dome
  // Desktop: 0px -> 120px, Mobile: 0px -> 80px
  const borderRadiusValue = useTransform(
    scrollYProgress,
    [0, 1],
    [0, 120] // Use 120px for the "height" of the arch
  );
  
  // Create the border-radius template for the dome shape
  // Format: border-top-left-radius and border-top-right-radius use "50% Xpx" format
  const borderRadius = useMotionTemplate`50% 50% 0 0 / ${borderRadiusValue}px ${borderRadiusValue}px 0 0`;

  return (
    <motion.section 
      ref={sectionRef}
      className="relative pt-40 pb-32 md:pt-48 md:pb-48 bg-[#F3F2ED] text-[#1a1a1a] overflow-hidden min-h-screen flex items-center will-change-[border-radius]"
      style={{
        borderRadius,
      }}
    >
      <div className="w-full relative z-10">
        {/* Section Label Top */}
        <div className="container mx-auto px-6 mb-16 text-center">
          <motion.span 
            className="text-xs font-medium text-[#1a1a1a]/40 uppercase tracking-[0.3em]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Technologies I Work With
          </motion.span>
        </div>

        {/* Rotated Container for Brutalist Effect */}
        <div className="transform -rotate-2 py-12">
          
          {/* Marquee Row 1 - Left Direction */}
          <div className="mb-4">
            <InfiniteMarquee 
              items={techStack} 
              direction="left" 
              speed={30}
              outlined={true}
              theme="light"
            />
          </div>

          {/* Marquee Row 2 - Right Direction */}
          <div>
            <InfiniteMarquee 
              items={techStack} 
              direction="right" 
              speed={35}
              outlined={false}
              theme="light"
            />
          </div>

        </div>
      </div>
    </motion.section>
  );
}
