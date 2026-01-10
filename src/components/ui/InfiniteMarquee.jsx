import { motion } from "framer-motion";

export default function InfiniteMarquee({ 
  items = [], 
  direction = "left", 
  speed = 25,
  outlined = false,
  theme = "dark"
}) {
  const duplicatedItems = [...items, ...items];

  // Theme-based styles
  const getTextStyles = () => {
    if (theme === "light") {
      return outlined 
        ? "text-transparent [-webkit-text-stroke:1.5px_rgba(0,0,0,0.2)] hover:[-webkit-text-stroke:1.5px_rgba(0,0,0,0.6)]"
        : "text-black/10 hover:text-black/30";
    }
    return outlined 
      ? "text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.3)] hover:[-webkit-text-stroke:1px_rgba(255,255,255,0.8)]"
      : "text-white/10 hover:text-white/30";
  };

  return (
    <div className="flex overflow-hidden whitespace-nowrap">
      <motion.div
        className="flex"
        animate={{
          x: direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"],
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: speed,
            ease: "linear",
          },
        }}
      >
        {duplicatedItems.map((item, index) => (
          <span
            key={index}
            className={`
              mx-4 md:mx-8 text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter
              ${getTextStyles()}
              transition-all duration-300 cursor-default select-none
            `}
          >
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
