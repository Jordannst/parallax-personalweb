import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";

export default function HorizontalScrollGallery({ projects }) {
  const containerRef = useRef(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Smooth spring for horizontal movement
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Calculate horizontal scroll based on number of projects
  const xRange = -(projects.length - 1) * 100;
  const x = useTransform(smoothProgress, [0, 1], ["0vw", `${xRange}vw`]);

  return (
    <section 
      ref={containerRef} 
      className="relative bg-[#050505]"
      style={{ height: `${projects.length * 100}vh` }}
    >
      {/* Sticky Container */}
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        
        {/* Section Header - Fixed */}
        <div className="absolute top-8 left-6 md:left-12 z-20">
          <span className="text-xs font-medium text-white/40 uppercase tracking-[0.3em] block mb-2">
            Selected Works
          </span>
          <h2 className="text-2xl md:text-4xl font-display font-bold text-white">
            Featured Projects
          </h2>
        </div>

        {/* Progress Indicator */}
        <div className="absolute bottom-8 left-6 md:left-12 z-20 flex items-center gap-4">
          <span className="text-sm font-mono text-white/40">
            {String(hoveredIndex !== null ? hoveredIndex + 1 : 1).padStart(2, '0')}
          </span>
          <div className="w-20 h-[1px] bg-white/20 relative overflow-hidden">
            <motion.div 
              className="absolute inset-y-0 left-0 bg-white"
              style={{ width: useTransform(scrollYProgress, [0, 1], ["0%", "100%"]) }}
            />
          </div>
          <span className="text-sm font-mono text-white/40">
            {String(projects.length).padStart(2, '0')}
          </span>
        </div>

        {/* Horizontal Cards */}
        <motion.div 
          style={{ x }}
          className="flex items-center gap-8 pl-6 pr-[50vw] md:pl-12"
        >
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id || index}
              project={project}
              index={index}
              isHovered={hoveredIndex === index}
              onHover={() => setHoveredIndex(index)}
              onLeave={() => setHoveredIndex(null)}
              scrollProgress={scrollYProgress}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function ProjectCard({ project, index, isHovered, onHover, onLeave, scrollProgress }) {
  const cardRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // 3D tilt effect
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), {
    stiffness: 300,
    damping: 30,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), {
    stiffness: 300,
    damping: 30,
  });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set((e.clientX - centerX) / rect.width);
    mouseY.set((e.clientY - centerY) / rect.height);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    onLeave();
  };

  // Parallax for individual card image
  const imageY = useTransform(scrollProgress, [0, 1], ["-10%", "10%"]);

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={onHover}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: isHovered ? rotateX : 0,
        rotateY: isHovered ? rotateY : 0,
        transformStyle: "preserve-3d",
        perspective: 1000,
      }}
      className="relative flex-shrink-0 w-[80vw] md:w-[60vw] lg:w-[50vw] h-[70vh] md:h-[75vh] rounded-2xl overflow-hidden cursor-pointer group"
    >
      {/* Image with zoom on hover */}
      <motion.div
        style={{ y: imageY }}
        animate={{ scale: isHovered ? 1.1 : 1 }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        className="absolute inset-0 w-full h-[120%] -top-[10%]"
      >
        <img
          src={project.imagePath}
          alt={project.title}
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* Gradient Overlay */}
      <motion.div
        animate={{ opacity: isHovered ? 0.9 : 0.6 }}
        className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"
      />

      {/* Hover Overlay - Reveal Effect */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-blue-900/20"
      />

      {/* Project Number */}
      <div className="absolute top-6 right-6 z-10">
        <span className="text-6xl md:text-8xl font-display font-black text-white/10">
          {String(index + 1).padStart(2, '0')}
        </span>
      </div>

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 z-10">
        {/* Tech Stack */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isHovered ? 1 : 0.7, y: isHovered ? 0 : 10 }}
          className="flex flex-wrap gap-2 mb-4"
        >
          {project.techStack?.map((tech, i) => (
            <span 
              key={i}
              className="px-3 py-1 text-xs font-medium bg-white/10 text-white/80 rounded-full backdrop-blur-sm"
            >
              {tech}
            </span>
          ))}
        </motion.div>

        {/* Title */}
        <motion.h3
          animate={{ y: isHovered ? -5 : 0 }}
          transition={{ duration: 0.3 }}
          className="text-3xl md:text-5xl font-display font-bold text-white mb-3"
        >
          {project.title}
        </motion.h3>

        {/* Description - shows on hover */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="text-base text-white/60 max-w-md mb-6"
        >
          {project.description}
        </motion.p>

        {/* View Project Button - shows on hover */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
          transition={{ duration: 0.3, delay: 0.15 }}
        >
          <a 
            href="#"
            className="inline-flex items-center gap-3 px-6 py-3 bg-white text-black font-medium rounded-full hover:bg-white/90 transition-colors"
          >
            <span className="text-sm uppercase tracking-wider">View Project</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </motion.div>
      </div>

      {/* Border glow on hover */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        className="absolute inset-0 rounded-2xl border border-white/20 pointer-events-none"
      />
    </motion.div>
  );
}
