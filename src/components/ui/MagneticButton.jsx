import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function MagneticButton({ 
  children, 
  href = "#",
  variant = "outline", // "outline" | "solid" | "ghost"
  className = "",
  strength = 0.3 
}) {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [ripples, setRipples] = useState([]);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const distanceX = (e.clientX - centerX) * strength;
    const distanceY = (e.clientY - centerY) * strength;
    
    setPosition({ x: distanceX, y: distanceY });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const handleClick = (e) => {
    if (!ref.current) return;
    
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const ripple = {
      id: Date.now(),
      x,
      y,
    };
    
    setRipples((prev) => [...prev, ripple]);
    
    // Remove ripple after animation
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== ripple.id));
    }, 600);
  };

  const getVariantStyles = () => {
    switch (variant) {
      case "solid":
        return "bg-white text-[#050505] hover:bg-white/90";
      case "ghost":
        return "bg-transparent text-white hover:bg-white/10";
      case "outline":
      default:
        return "bg-transparent text-white border border-white/30 hover:border-white/60";
    }
  };

  const getRippleColor = () => {
    switch (variant) {
      case "solid":
        return "rgba(0, 0, 0, 0.2)";
      default:
        return "rgba(255, 255, 255, 0.3)";
    }
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`
        relative overflow-hidden
        inline-flex items-center justify-center gap-2
        px-8 py-4 rounded-full
        font-medium text-sm uppercase tracking-[0.15em]
        transition-colors duration-300
        cursor-none
        ${getVariantStyles()}
        ${className}
      `}
    >
      {/* Ripple Effects */}
      <AnimatePresence>
        {ripples.map((ripple) => (
          <motion.span
            key={ripple.id}
            initial={{ scale: 0, opacity: 0.5 }}
            animate={{ scale: 4, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            style={{
              position: "absolute",
              left: ripple.x,
              top: ripple.y,
              width: 50,
              height: 50,
              marginLeft: -25,
              marginTop: -25,
              borderRadius: "50%",
              backgroundColor: getRippleColor(),
              pointerEvents: "none",
            }}
          />
        ))}
      </AnimatePresence>

      <motion.span
        animate={{ x: position.x * 0.3, y: position.y * 0.3 }}
        transition={{ type: "spring", stiffness: 150, damping: 15 }}
        className="relative z-10"
      >
        {children}
      </motion.span>
    </motion.a>
  );
}
