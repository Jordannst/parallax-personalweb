import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function TestParallax() {
  const ref = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // Transform scroll progress to rotation and movement
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.2, 0.8]);

  return (
    <section ref={ref} className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-900 to-slate-800 py-20">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-8">
          Parallax Test Component
        </h2>
        <p className="text-slate-400 mb-12">
          Scroll to see the animation effect
        </p>
        
        <motion.div
          style={{ rotate, y, scale }}
          className="w-32 h-32 mx-auto rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 shadow-lg shadow-purple-500/30"
        />
        
        <p className="text-slate-500 mt-12 text-sm">
          ✨ Framer Motion is working!
        </p>
      </div>
    </section>
  );
}
