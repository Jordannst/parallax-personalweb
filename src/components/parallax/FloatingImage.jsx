import { useRef, useMemo } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function FloatingImage({ 
  src, 
  alt = "", 
  speed = 1, 
  rotation = 0,
  className = "" 
}) {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Calculate parallax movement based on speed
  // speed 1 = normal, speed 2 = faster (foreground), speed 0.5 = slower (background)
  const yRange = 100 * speed;
  const y = useTransform(scrollYProgress, [0, 1], [`${yRange}px`, `-${yRange}px`]);
  
  // Slight scale variation during scroll
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.95]);

  // Random rotation - memoized to prevent recalculation on every render
  // and avoid hydration mismatch issues
  const randomRotation = useMemo(
    () => rotation || (Math.random() * 6 - 3), // -3 to 3 degrees
    [rotation]
  );

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      style={{ y, scale, rotate: randomRotation }}
      className={`absolute pointer-events-none ${className}`}
    >
      <div className="relative">
        {/* Glow effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-transparent rounded-lg blur-xl scale-110" />
        
        {/* Image */}
        <img
          src={src}
          alt={alt}
          className="relative w-full h-full object-cover rounded-lg shadow-2xl"
        />
        
        {/* Border overlay */}
        <div className="absolute inset-0 border border-white/10 rounded-lg" />
      </div>
    </motion.div>
  );
}
