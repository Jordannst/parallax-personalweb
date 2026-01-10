import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader() {
  const [count, setCount] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Lock scroll while preloader is active
    document.body.style.overflow = "hidden";

    // Counter animation
    const duration = 2000; // 2 seconds total
    const steps = 100;
    const stepDuration = duration / steps;

    let currentCount = 0;
    const interval = setInterval(() => {
      currentCount += 1;
      setCount(currentCount);

      if (currentCount >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setIsComplete(true);
          // Unlock scroll after exit animation starts
          setTimeout(() => {
            document.body.style.overflow = "";
            setIsVisible(false);
          }, 800);
        }, 300);
      }
    }, stepDuration);

    return () => {
      clearInterval(interval);
      document.body.style.overflow = "";
    };
  }, []);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          initial={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[9999] bg-[#050505] flex items-center justify-center"
        >
          {/* Counter */}
          <div className="relative">
            <motion.span
              key={count}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.1 }}
              className="text-[20vw] md:text-[15vw] font-black text-white tabular-nums"
            >
              {count}
            </motion.span>
            
            {/* Percentage symbol */}
            <span className="absolute -right-8 md:-right-12 top-4 text-2xl md:text-4xl font-light text-white/40">
              %
            </span>
          </div>

          {/* Bottom text */}
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 text-center">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-xs text-white/30 uppercase tracking-[0.3em]"
            >
              Loading Experience
            </motion.p>
          </div>

          {/* Corner elements */}
          <div className="absolute top-8 left-8 text-[10px] text-white/20 tracking-[0.3em] uppercase">
            Jordan Sutarto
          </div>
          <div className="absolute top-8 right-8 text-[10px] text-white/20 tracking-[0.3em] uppercase">
            Portfolio 2024
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
