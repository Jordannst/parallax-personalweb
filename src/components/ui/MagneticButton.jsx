import { useRef, useState } from "react";
import { motion } from "framer-motion";

export default function MagneticButton({ 
  children, 
  href = "#",
  variant = "outline", // "outline" | "solid" | "ghost"
  className = "",
  strength = 0.3 
}) {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

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

  return (
    <motion.a
      ref={ref}
      href={href}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`
        inline-flex items-center justify-center gap-2
        px-8 py-4 rounded-full
        font-medium text-sm uppercase tracking-[0.15em]
        transition-colors duration-300
        cursor-none
        ${getVariantStyles()}
        ${className}
      `}
    >
      <motion.span
        animate={{ x: position.x * 0.3, y: position.y * 0.3 }}
        transition={{ type: "spring", stiffness: 150, damping: 15 }}
      >
        {children}
      </motion.span>
    </motion.a>
  );
}
