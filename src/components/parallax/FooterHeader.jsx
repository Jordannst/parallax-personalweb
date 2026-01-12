import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

// Split text into characters for animation
const SplitText = ({ children, className, delay = 0 }) => {
  const characters = children.split("");
  
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.03,
        delayChildren: delay,
      },
    },
  };

  const characterVariants = {
    hidden: {
      opacity: 0,
      y: 40,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 80,
      },
    },
  };

  return (
    <motion.span
      className={className}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
      style={{ display: "inline-block" }}
    >
      {characters.map((char, index) => (
        <motion.span
          key={index}
          variants={characterVariants}
          style={{ 
            display: "inline-block",
            whiteSpace: char === " " ? "pre" : "normal",
            willChange: "transform, opacity",
          }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.span>
  );
};

export default function FooterHeader() {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Parallax movement as section scrolls into view
  const y = useTransform(scrollYProgress, [0, 1], [80, -30]);

  return (
    <motion.div
      ref={ref}
      style={{ y }}
      className="text-center"
    >
      <h2 className="text-4xl md:text-6xl lg:text-8xl xl:text-9xl font-display font-bold leading-[0.9] tracking-tight">
        <SplitText className="text-white" delay={0}>
          LET'S WORK
        </SplitText>
        <br />
        <SplitText className="text-white/40" delay={0.3}>
          TOGETHER
        </SplitText>
      </h2>
    </motion.div>
  );
}
