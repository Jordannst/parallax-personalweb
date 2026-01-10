import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

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
  
  // Background fades to black at the end
  const bgOpacity = useTransform(scrollYProgress, [0.8, 1], [0, 1]);

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

        {/* Full black overlay at the end for seamless transition */}
        <motion.div 
          style={{ opacity: bgOpacity }}
          className="absolute inset-0 bg-[#050505] pointer-events-none"
        />
      </div>
    </div>
  );
}
