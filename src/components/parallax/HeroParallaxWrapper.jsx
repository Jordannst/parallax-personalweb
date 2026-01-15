import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function HeroParallaxWrapper({ children }) {
  const containerRef = useRef(null);

  // Track scroll progress - using window scroll for more reliable tracking
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Transform values as user scrolls (0 = top, 1 = container exited)
  // Removed blur for better performance - blur is GPU intensive
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.92]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.3]);
  const borderRadius = useTransform(scrollYProgress, [0, 0.5], [0, 32]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, -30]);

  return (
    <>
      {/* Spacer to maintain scroll height - this is what About section scrolls over */}
      <div 
        ref={containerRef}
        className="relative h-screen w-full"
        aria-hidden="true"
      />
      
      {/* Fixed hero content that transforms as you scroll */}
      <motion.div
        style={{
          scale,
          opacity,
          borderRadius,
          y,
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: '100vh',
          zIndex: 0,
        }}
        className="bg-[#050505] will-change-transform overflow-hidden"
      >
        {children}
      </motion.div>
    </>
  );
}
