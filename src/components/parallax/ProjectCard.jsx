import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function ProjectCard({ title, description, techStack = [], imageSrc, index = 0 }) {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Parallax effect - image moves slower than scroll
  const imageY = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.15, 1.1, 1.15]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.6, 1, 1, 0.6]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
      className="relative w-full"
    >
      {/* Project Number */}
      <div className="absolute -left-4 md:left-8 top-8 z-20">
        <span className="text-[120px] md:text-[200px] font-black text-white/[0.03] leading-none select-none">
          {String(index + 1).padStart(2, '0')}
        </span>
      </div>

      {/* Image Container */}
      <motion.div 
        style={{ opacity }}
        className="relative w-full h-[60vh] md:h-[70vh] lg:h-[80vh] overflow-hidden rounded-lg md:rounded-2xl"
      >
        {/* Parallax Image */}
        <motion.div
          style={{ y: imageY, scale: imageScale }}
          className="absolute inset-0 w-full h-[130%] -top-[15%]"
        >
          <img
            src={imageSrc}
            alt={title}
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/60 via-transparent to-transparent" />

        {/* Text Overlay - Bottom Left */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 lg:p-16">
          <div className="max-w-3xl">
            {/* Tech Stack */}
            <div className="flex flex-wrap gap-2 mb-4">
              {techStack.map((tech, i) => (
                <span 
                  key={i}
                  className="px-3 py-1 text-xs font-medium bg-white/15 text-white/70 rounded-full"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Title */}
            <h3 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
              {title}
            </h3>

            {/* Description */}
            <p className="text-base md:text-lg text-white/60 max-w-xl leading-relaxed">
              {description}
            </p>

            {/* View Project Link */}
            <motion.a
              href="#"
              whileHover={{ x: 10 }}
              className="inline-flex items-center gap-3 mt-6 text-sm font-medium text-white/80 hover:text-white transition-colors group"
            >
              <span className="uppercase tracking-[0.2em]">View Project</span>
              <svg 
                className="w-5 h-5 transition-transform group-hover:translate-x-1" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </motion.a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
