import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";

export default function HorizontalScrollGallery({ projects }) {
  const containerRef = useRef(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Smooth spring for horizontal movement - optimized for performance
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 50,
    damping: 20,
    restDelta: 0.01,
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
          style={{ x, willChange: "transform" }}
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
          
          {/* Coming Soon Card */}
          <ComingSoonCard />
        </motion.div>
      </div>
    </section>
  );
}

function ProjectCard({ project, index, isHovered, onHover, onLeave, scrollProgress }) {
  const cardRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // 3D tilt effect - reduced intensity for better performance
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [5, -5]), {
    stiffness: 150,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-5, 5]), {
    stiffness: 150,
    damping: 20,
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
        willChange: "transform",
      }}
      className="relative flex-shrink-0 w-[80vw] md:w-[60vw] lg:w-[50vw] h-[70vh] md:h-[75vh] rounded-2xl overflow-hidden cursor-pointer group"
    >
      {/* Image with zoom on hover */}
      <motion.div
        style={{ y: imageY, willChange: "transform" }}
        animate={{ scale: isHovered ? 1.05 : 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="absolute inset-0 w-full h-[120%] -top-[10%]"
      >
        <img
          src={project.imagePath}
          alt={project.title}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover object-top"
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
              className="px-3 py-1 text-xs font-medium bg-white/15 text-white/80 rounded-full"
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

        {/* Project Action Button - shows on hover */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
          transition={{ duration: 0.3, delay: 0.15 }}
        >
          <motion.a 
            href={project.liveUrl || project.githubUrl || "#"}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-3 px-6 py-3 bg-white text-black font-medium rounded-full hover:bg-white/90 transition-colors cursor-none"
          >
            {project.liveUrl ? (
              <>
                {/* External Link Icon */}
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                <span className="text-sm uppercase tracking-wider">Visit Site</span>
              </>
            ) : (
              <>
                {/* GitHub Icon */}
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                <span className="text-sm uppercase tracking-wider">View on GitHub</span>
              </>
            )}
          </motion.a>
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

function ComingSoonCard() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="relative flex-shrink-0 w-[60vw] md:w-[40vw] lg:w-[30vw] h-[70vh] md:h-[75vh] rounded-2xl overflow-hidden flex items-center justify-center"
    >
      {/* Gradient border */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-500/20 via-transparent to-pink-500/20" />
      <div className="absolute inset-[1px] rounded-2xl bg-[#0a0a0a]" />
      
      {/* Animated dots pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{ 
          backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', 
          backgroundSize: '20px 20px' 
        }} />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-8">
        {/* Animated plus icon */}
        <motion.div
          animate={{ rotate: [0, 90, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="w-16 h-16 mx-auto mb-8 rounded-full border border-white/10 flex items-center justify-center"
        >
          <span className="text-4xl text-white/20 font-light">+</span>
        </motion.div>

        {/* Title */}
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-2xl md:text-4xl font-display font-bold text-white/80 mb-4"
        >
          More Coming
          <br />
          <span className="text-white/30">Soon</span>
        </motion.h3>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-sm text-white/30 max-w-xs mx-auto"
        >
          Exciting projects are in the works. Stay tuned for updates.
        </motion.p>

        {/* Animated line */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="w-16 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent mx-auto mt-8"
        />
      </div>
    </motion.div>
  );
}
