import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

// Floating particles data - larger and more visible
const particles = Array.from({ length: 25 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 4 + 2,
  duration: Math.random() * 10 + 15,
  delay: Math.random() * 5,
}));

export default function ZoomSection() {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Scale from 1 to 60 (enough to fill screen)
  const scale = useTransform(scrollYProgress, [0, 1], [1, 60]);
  
  // Text fades out quickly at the beginning
  const textOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  
  // Background fades to black earlier
  const bgOpacity = useTransform(scrollYProgress, [0.4, 0.55], [0, 1]);
  
  // Quote text appears right after zoom is complete
  const quoteOpacity = useTransform(scrollYProgress, [0.5, 0.6], [0, 1]);
  const quoteY = useTransform(scrollYProgress, [0.5, 0.6], [20, 0]);
  
  // Particles fade in with the black screen
  const particlesOpacity = useTransform(scrollYProgress, [0.45, 0.55], [0, 1]);

  return (
    <div 
      ref={containerRef} 
      className="relative h-[200vh] bg-[#F3F2ED]"
    >
      {/* Sticky container */}
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        
        {/* The expanding tunnel circle */}
        <motion.div
          style={{ scale }}
          className="w-[20vw] h-[20vw] md:w-[15vw] md:h-[15vw] rounded-full bg-[#050505] flex items-center justify-center"
        >
          {/* Text inside */}
          <motion.span 
            style={{ 
              opacity: textOpacity,
              scale: useTransform(scrollYProgress, [0, 0.3], [1, 0.5])
            }}
            className="text-white text-xs md:text-sm uppercase tracking-[0.3em] font-display whitespace-nowrap"
          >
            My Projects
          </motion.span>
        </motion.div>

        {/* Full black overlay with particles and quote */}
        <motion.div 
          style={{ opacity: bgOpacity }}
          className="absolute inset-0 bg-[#050505] pointer-events-none"
        >
          {/* Floating Particles */}
          <motion.div 
            style={{ opacity: particlesOpacity }}
            className="absolute inset-0"
          >
            {particles.map((particle) => (
              <motion.div
                key={particle.id}
                className="absolute rounded-full bg-white/40"
                style={{
                  left: `${particle.x}%`,
                  top: `${particle.y}%`,
                  width: particle.size,
                  height: particle.size,
                }}
                animate={{
                  y: [0, -40, 0],
                  opacity: [0.4, 0.8, 0.4],
                }}
                transition={{
                  duration: particle.duration,
                  repeat: Infinity,
                  delay: particle.delay,
                  ease: "easeInOut",
                }}
              />
            ))}
          </motion.div>

          {/* Inspirational Quote */}
          <motion.div 
            style={{ opacity: quoteOpacity, y: quoteY }}
            className="absolute inset-0 flex flex-col items-center justify-center text-center px-6"
          >
            <p className="text-lg md:text-2xl text-white/30 font-light italic max-w-lg">
              "Every pixel tells a story"
            </p>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="mt-8 flex flex-col items-center gap-2"
            >
              <span className="text-[10px] text-white/20 uppercase tracking-[0.3em]">
                Keep Scrolling
              </span>
              <svg 
                className="w-4 h-4 text-white/20" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
