import { motion } from "framer-motion";

export default function HeroTitle({ name = "JORDAN", lastName = "SUTARTO", role = "Creative Developer & UI Specialist" }) {
  
  // Animation variants for staggered reveal
  // Delay of 2.8s to wait for preloader (2s counter + 0.8s exit animation)
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 2.8, // Wait for preloader to finish
      },
    },
  };

  const lineVariants = {
    hidden: { 
      y: 120,
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 1,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  const fadeUpVariants = {
    hidden: { 
      y: 30,
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="flex flex-col items-center justify-center text-center"
    >
      {/* Main Title - First Name */}
      <div className="overflow-hidden">
        <motion.h1 
          variants={lineVariants}
          className="text-[12vw] md:text-[10vw] lg:text-[8vw] font-display font-black leading-[0.85] tracking-tighter text-white"
        >
          {name}
        </motion.h1>
      </div>

      {/* Main Title - Last Name */}
      <div className="overflow-hidden">
        <motion.h1 
          variants={lineVariants}
          className="text-[12vw] md:text-[10vw] lg:text-[8vw] font-display font-black leading-[0.85] tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white via-white/80 to-white/60"
        >
          {lastName}
        </motion.h1>
      </div>

      {/* Role Description */}
      <motion.p 
        variants={fadeUpVariants}
        className="mt-8 text-lg md:text-xl text-white/40 tracking-wide max-w-md"
      >
        {role}
      </motion.p>

      {/* Scroll Indicator */}
      <motion.div 
        variants={fadeUpVariants}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
      >
        <span className="text-[10px] text-white/30 uppercase tracking-[0.3em]">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-[1px] h-12 bg-gradient-to-b from-white/40 to-transparent"
        />
      </motion.div>
    </motion.div>
  );
}
