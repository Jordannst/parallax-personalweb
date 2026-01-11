import { useRef, useEffect, useState } from "react";
import { motion, useInView, useMotionValue, useSpring, animate } from "framer-motion";

export default function CounterStat({ value, label, suffix = "" }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [hasAnimated, setHasAnimated] = useState(false);
  
  const count = useMotionValue(0);
  const springCount = useSpring(count, { stiffness: 100, damping: 30 });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (isInView && !hasAnimated) {
      setHasAnimated(true);
      
      // Parse the numeric value
      const numericValue = parseInt(value.replace(/\D/g, '')) || 0;
      
      const controls = animate(count, numericValue, {
        duration: 2,
        ease: "easeOut",
        onUpdate: (latest) => {
          setDisplayValue(Math.round(latest));
        },
      });

      return () => controls.stop();
    }
  }, [isInView, hasAnimated, value, count]);

  // Handle special values like "∞"
  const isSpecial = value === "∞";
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="text-center"
    >
      <span className="block text-4xl md:text-5xl font-display font-bold text-[#1a1a1a] mb-2">
        {isSpecial ? value : (
          <>
            {displayValue}
            {suffix}
          </>
        )}
      </span>
      <span className="text-sm text-[#1a1a1a]/40 uppercase tracking-wider">
        {label}
      </span>
    </motion.div>
  );
}
