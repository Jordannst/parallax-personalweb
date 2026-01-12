import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useMotionTemplate } from "framer-motion";

export default function HeroParallaxWrapper({ children }) {
  const containerRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Track scroll progress based on the container leaving the viewport
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Transform values as user scrolls (0 = top, 1 = container exited)
  // We want the effect to happen between 0% and 50% of scroll progress
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.5]);
  const blur = useTransform(scrollYProgress, [0, 0.5], [0, 10]);
  const borderRadius = useTransform(scrollYProgress, [0, 0.5], [0, 40]);
  
  // Create blur filter template
  const blurFilter = useMotionTemplate`blur(${blur}px)`;

  // On mobile, use fixed positioning for better curtain effect
  if (isMobile) {
    return (
      <div 
        ref={containerRef}
        className="relative h-screen w-full overflow-hidden"
      >
        <motion.div
          style={{
            scale,
            opacity,
            filter: blurFilter,
            borderRadius,
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            height: '100vh',
          }}
          className="bg-[#050505] will-change-transform"
        >
          {children}
        </motion.div>
      </div>
    );
  }

  return (
    <div 
      ref={containerRef}
      className="sticky top-0 h-screen w-full overflow-hidden"
    >
      <motion.div
        style={{
          scale,
          opacity,
          filter: blurFilter,
          borderRadius,
        }}
        className="relative h-full w-full bg-[#050505] will-change-transform"
      >
        {children}
      </motion.div>
    </div>
  );
}
