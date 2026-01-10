import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function TextReveal({ text, theme = "dark" }) {
  const ref = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.9", "start 0.25"],
  });

  // Split text into words
  const words = text.split(" ");

  // Theme-based colors
  const baseColor = theme === "light" ? "rgba(0,0,0,0.2)" : "rgba(255,255,255,0.15)";
  const highlightColor = theme === "light" ? "#1a1a1a" : "#ffffff";

  return (
    <p 
      ref={ref} 
      className="text-2xl md:text-3xl lg:text-4xl font-medium leading-relaxed md:leading-relaxed lg:leading-relaxed text-center max-w-5xl mx-auto"
    >
      {words.map((word, index) => {
        const start = index / words.length;
        const end = start + (1 / words.length);
        
        return (
          <Word 
            key={index} 
            range={[start, end]} 
            progress={scrollYProgress}
            baseColor={baseColor}
            highlightColor={highlightColor}
          >
            {word}
          </Word>
        );
      })}
    </p>
  );
}

function Word({ children, range, progress, baseColor, highlightColor }) {
  const color = useTransform(progress, range, [baseColor, highlightColor]);
  const y = useTransform(progress, range, [5, 0]);

  return (
    <motion.span 
      style={{ color, y }}
      className="inline-block mr-[0.25em] transition-colors duration-300"
    >
      {children}
    </motion.span>
  );
}
