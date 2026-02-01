import { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(true); // Default hidden to prevent flash

  // Smooth spring physics for cursor movement - optimized for performance
  const cursorX = useSpring(0, { stiffness: 300, damping: 25 });
  const cursorY = useSpring(0, { stiffness: 300, damping: 25 });

  // Detect touch device on mount - prevents hydration mismatch
  useEffect(() => {
    setIsTouchDevice(window.matchMedia("(hover: none)").matches);
  }, []);

  useEffect(() => {
    // Skip if touch device
    if (isTouchDevice) return;

    // Mouse move handler
    const handleMouseMove = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      setIsVisible(true);
    };

    // Mouse leave handler
    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    // Hover detection for interactive elements
    const handleMouseOver = (e) => {
      const target = e.target;
      if (
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.dataset.cursor === "pointer"
      ) {
        setIsHovering(true);
      }
    };

    const handleMouseOut = (e) => {
      const target = e.target;
      if (
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.dataset.cursor === "pointer"
      ) {
        setIsHovering(false);
      }
    };

    // Add event listeners
    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
    };
  }, [cursorX, cursorY, isTouchDevice]);

  // Hide on touch devices
  if (isTouchDevice) {
    return null;
  }

  return (
    <>
      {/* Main Cursor Dot */}
      <motion.div
        className="fixed top-0 left-0 z-[100] pointer-events-none mix-blend-difference"
        style={{
          x: cursorX,
          y: cursorY,
        }}
      >
        <motion.div
          animate={{
            scale: isHovering ? 2.5 : 1,
            opacity: isVisible ? 1 : 0,
          }}
          transition={{
            scale: { type: "spring", stiffness: 300, damping: 20 },
            opacity: { duration: 0.2 },
          }}
          className="relative -translate-x-1/2 -translate-y-1/2"
        >
          {/* Outer Ring */}
          <div 
            className={`
              w-10 h-10 rounded-full border border-white
              transition-all duration-300
              ${isHovering ? "bg-white/10" : "bg-transparent"}
            `}
          />
          {/* Inner Dot */}
          <motion.div
            animate={{ scale: isHovering ? 0 : 1 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-white rounded-full"
          />
        </motion.div>
      </motion.div>
    </>
  );
}
