import { useState, useEffect } from "react";
import { motion, useScroll, useTransform, useMotionTemplate } from "framer-motion";

export default function HeroTitle({ name = "JORDAN", lastName = "SUTARTO", role = "Web Developer & UI Enthusiast" }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Use window scroll for parallax
  const { scrollY } = useScroll();

  // Parallax movement
  const nameY = useTransform(scrollY, [0, 500], [0, -80]);
  
  // Gradual fade on scroll
  const opacity = useTransform(scrollY, [0, 400], [1, 0.2]);
  
  // Animation variants for staggered reveal
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
      style={{ opacity }}
      className="flex flex-col items-center justify-center text-center"
    >
      {/* Main Title - Liquid Chrome Effect */}
      <motion.div 
        variants={lineVariants}
        style={{ y: nameY }}
        className="relative"
      >
        {/* Desktop: Single Line */}
        {!isMobile ? (
          <h1 
            className="
              text-[8vw] lg:text-[7vw] xl:text-[6vw]
              font-display font-black leading-[0.9] tracking-tighter
              animate-shimmer
            "
            style={{
              background: 'linear-gradient(90deg, #e0e0e0 0%, #ffffff 20%, #c0c0ff 35%, #ffffff 50%, #ffc0e0 65%, #ffffff 80%, #e0e0e0 100%)',
              backgroundSize: '300% 100%',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent',
            }}
          >
            {name} {lastName}
          </h1>
        ) : (
          /* Mobile: Stacked Editorial */
          <div className="flex flex-col items-center">
            <h1 
              className="
                text-[18vw]
                font-display font-black leading-[0.85] tracking-tighter
                mix-blend-difference text-white
              "
            >
              {name}
            </h1>
            <h1 
              className="
                text-[18vw]
                font-display font-black leading-[0.85] tracking-tighter
                mix-blend-difference
                text-transparent
              "
              style={{
                WebkitTextStroke: '1.5px rgba(255,255,255,0.5)',
              }}
            >
              {lastName}
            </h1>
          </div>
        )}
      </motion.div>

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

      {/* Shimmer Animation */}
      <style>{`
        @keyframes shimmer {
          0% {
            background-position: 200% 0;
          }
          100% {
            background-position: -200% 0;
          }
        }
        .animate-shimmer {
          animation: shimmer 8s linear infinite;
        }
      `}</style>
    </motion.div>
  );
}
