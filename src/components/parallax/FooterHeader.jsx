import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function FooterHeader() {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Parallax movement as section scrolls into view
  const y = useTransform(scrollYProgress, [0, 1], [100, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.5], [0, 1, 1]);

  return (
    <motion.div
      ref={ref}
      style={{ y, opacity }}
      className="text-center"
    >
      <h2 className="text-4xl md:text-6xl lg:text-8xl xl:text-9xl font-display font-bold text-white leading-[0.9] tracking-tight">
        LET'S WORK
        <br />
        <span className="text-white/40">TOGETHER</span>
      </h2>
    </motion.div>
  );
}
