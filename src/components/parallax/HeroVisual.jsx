import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function HeroVisual({ imageSrc }) {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Parallax transforms - background moves slower, foreground faster
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const foregroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <div ref={ref} className="relative w-full h-full min-h-[500px] overflow-hidden">
      {/* Background Layer - Abstract Gradient Blobs */}
      <motion.div
        style={{ y: backgroundY }}
        className="absolute inset-0 -z-10"
      >
        {/* Gradient Blob 1 */}
        <div className="absolute top-10 right-10 w-72 h-72 bg-purple-500/30 rounded-full blur-3xl" />
        {/* Gradient Blob 2 */}
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl" />
        {/* Gradient Blob 3 */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl" />
        
        {/* Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
          }}
        />
      </motion.div>

      {/* Foreground Layer - Hero Image with floating animation */}
      <motion.div
        style={{ y: foregroundY, opacity }}
        className="relative z-10 w-full h-full flex items-center justify-center"
      >
        <motion.div
          animate={{
            y: [0, -20, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
          className="relative"
        >
          {/* Glow effect behind image */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl blur-2xl opacity-40 scale-105" />
          
          {/* Main Image */}
          <img
            src={imageSrc}
            alt="Hero Visual"
            className="relative z-10 w-80 h-80 md:w-96 md:h-96 object-cover rounded-3xl shadow-2xl border border-white/10"
          />
          
          {/* Decorative elements */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute -top-4 -right-4 w-8 h-8 border-2 border-purple-400 rounded-lg"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="absolute -bottom-4 -left-4 w-6 h-6 bg-pink-500/50 rounded-full"
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
