import { useState } from "react";
import { motion, useScroll, useTransform, useMotionTemplate } from "framer-motion";

export default function HeroTitle({ name = "JORDAN", lastName = "SUTARTO", role = "Web Developer & UI Enthusiast" }) {
  const [isHovered, setIsHovered] = useState(false);

  // Use window scroll directly (works better with sticky container)
  const { scrollY } = useScroll();

  // Different parallax speeds - JORDAN moves slower (background), SUTARTO moves faster (foreground)
  const firstNameY = useTransform(scrollY, [0, 500], [0, -50]);
  const lastNameY = useTransform(scrollY, [0, 500], [0, -100]);
  
  // Gradual blur effect on scroll
  const blur = useTransform(scrollY, [100, 400], [0, 12]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0.2]);
  const blurFilter = useMotionTemplate`blur(${blur}px)`;
  
  // Animation variants for staggered reveal
  // Delay of 2.8s to wait for preloader (2s counter + 0.8s exit animation)
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 2.8,
      },
    },
  };

  const lineVariants = {
    hidden: { 
      y: 120,
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 1,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  const fadeUpVariants = {
    hidden: { 
      y: 30,
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      style={{ 
        filter: blurFilter,
        opacity 
      }}
      className="flex flex-col items-center justify-center text-center"
    >
      {/* Names wrapper with hover detection - padding accounts for parallax movement */}
      <div 
        className="relative pt-16 pb-4 -mt-16"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Main Title - First Name */}
        <div className="overflow-visible">
          <motion.h1 
            variants={lineVariants}
            style={{ y: firstNameY }}
            className={`
              text-[12vw] md:text-[10vw] lg:text-[8vw] 
              font-display font-black leading-[0.85] tracking-tighter
              transition-all duration-500 ease-out
              ${isHovered 
                ? "text-transparent [-webkit-text-stroke:1.5px_rgba(243,242,237,0.6)]" 
                : "text-[#F3F2ED]"
              }
            `}
          >
            {name}
          </motion.h1>
        </div>

        {/* Main Title - Last Name (Outline by default) */}
        <div className="overflow-hidden">
          <motion.h1 
            variants={lineVariants}
            style={{ y: lastNameY }}
            className={`
              text-[12vw] md:text-[10vw] lg:text-[8vw] 
              font-display font-black leading-[0.85] tracking-tighter
              transition-all duration-500 ease-out
              ${isHovered 
                ? "text-[#F3F2ED]" 
                : "text-transparent [-webkit-text-stroke:1.5px_rgba(243,242,237,0.5)]"
              }
            `}
          >
            {lastName}
          </motion.h1>
        </div>
      </div>

      {/* Role Description */}
      <motion.p 
        variants={fadeUpVariants}
        className="mt-8 text-lg md:text-xl text-white/40 tracking-wide max-w-md"
      >
        {role}
      </motion.p>

      {/* Location */}
      <motion.p 
        variants={fadeUpVariants}
        className="mt-3 text-xs text-white/20 uppercase tracking-[0.3em]"
      >
        Based in Indonesia
      </motion.p>
    </motion.div>
  );
}
