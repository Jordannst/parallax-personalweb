import { useRef } from "react";
import { motion, useScroll, useTransform, useMotionTemplate } from "framer-motion";

// Tech grid pattern for background
const TechGrid = () => (
  <div className="absolute inset-0 opacity-[0.03]">
    <div 
      className="absolute inset-0"
      style={{
        backgroundImage: `
          linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
        `,
        backgroundSize: '60px 60px',
      }}
    />
    {/* Corner brackets */}
    <div className="absolute top-8 left-8 w-16 h-16 border-l-2 border-t-2 border-white/10" />
    <div className="absolute top-8 right-8 w-16 h-16 border-r-2 border-t-2 border-white/10" />
    <div className="absolute bottom-8 left-8 w-16 h-16 border-l-2 border-b-2 border-white/10" />
    <div className="absolute bottom-8 right-8 w-16 h-16 border-r-2 border-b-2 border-white/10" />
  </div>
);

export default function StackedProjectScroll({ projects = [] }) {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const projectCount = projects.length;
  
  // Dynamic height based on project count - more scroll space for stacking effect
  const sectionHeight = `${(projectCount * 100) + 50}vh`;

  if (projects.length === 0) {
    return null;
  }

  return (
    <section 
      ref={containerRef}
      className="relative bg-[#050505]"
      style={{ height: sectionHeight }}
    >
      {/* Sticky container that locks viewport */}
      <div className="sticky top-0 h-screen overflow-hidden">
        <TechGrid />
        
        {/* Stacked Project Cards - Card Deck Effect */}
        <div className="relative w-full h-full">
          {projects.map((project, index) => (
            <StackingCard 
              key={project.id}
              project={project}
              index={index}
              total={projectCount}
              scrollYProgress={scrollYProgress}
            />
          ))}
        </div>

        {/* Progress Dots */}
        <div className="absolute right-8 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-50">
          {projects.map((_, index) => (
            <ProgressDot 
              key={index}
              index={index}
              total={projectCount}
              scrollYProgress={scrollYProgress}
            />
          ))}
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3 z-50">
          <span className="text-white/30 text-xs uppercase tracking-[0.2em]">Scroll</span>
          <motion.div 
            className="w-12 h-[2px] bg-white/20 rounded-full overflow-hidden"
          >
            <motion.div 
              className="h-full bg-white/60 rounded-full"
              style={{ 
                width: useTransform(scrollYProgress, [0, 1], ["0%", "100%"]) 
              }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// Card Deck Stacking Effect
function StackingCard({ project, index, total, scrollYProgress }) {
  // Calculate scroll ranges for this card
  const rangeStart = index / total;
  const rangeEnd = (index + 1) / total;
  
  // When this card is "active" (current view)
  // It stays at scale 1, then shrinks as the next card comes
  
  // Scale: 1 -> 0.9 (shrinks slightly as next card covers it)
  const scale = useTransform(
    scrollYProgress,
    [rangeStart, rangeEnd],
    [1, 0.9]
  );
  
  // Opacity: 1 -> 0.4 (dims to focus on new card)
  const opacity = useTransform(
    scrollYProgress,
    [rangeStart, rangeEnd],
    [1, 0.4]
  );
  
  // Y Position: 0% -> -10% (moves up slightly for parallax depth)
  const yPercent = useTransform(
    scrollYProgress,
    [rangeStart, rangeEnd],
    [0, -10]
  );
  
  // Blur: 0 -> 10px (depth of field effect)
  const blur = useTransform(
    scrollYProgress,
    [rangeStart, rangeEnd],
    [0, 10]
  );
  const blurFilter = useMotionTemplate`blur(${blur}px)`;
  
  // Incoming card: slides up from bottom (100% to 0%)
  const slideY = useTransform(
    scrollYProgress,
    [rangeStart - (1/total), rangeStart],
    ["100%", "0%"]
  );
  
  // First card doesn't slide in
  const y = index === 0 
    ? useTransform(scrollYProgress, [0, 1], ["0%", "0%"]) 
    : slideY;

  return (
    <motion.div 
      className="absolute top-0 left-0 w-full h-screen shadow-[0_-10px_40px_-10px_rgba(0,0,0,0.8)]"
      style={{ 
        zIndex: index,
        scale,
        opacity,
        y: index === 0 ? yPercent : y,
        filter: blurFilter,
      }}
    >
      {/* Split Layout Container */}
      <div className="relative z-10 w-full h-full flex flex-col lg:flex-row bg-[#050505]">
        
        {/* Left Side - Text Info */}
        <div className="w-full lg:w-1/2 h-1/2 lg:h-full flex flex-col justify-center px-8 md:px-16 lg:px-20 py-12 lg:py-0">
          
          {/* Project Counter */}
          <div className="mb-6 lg:mb-10">
            <span className="text-white/30 text-sm tracking-[0.3em] uppercase">
              {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
            </span>
          </div>

          {/* Category */}
          <span className="text-white/50 text-xs md:text-sm uppercase tracking-[0.2em] mb-3">
            {project.category}
          </span>

          {/* Title */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-display font-bold text-white leading-[1.1] mb-4 lg:mb-6">
            {project.title}
          </h2>

          {/* Description */}
          <p className="text-white/60 text-sm md:text-base lg:text-lg leading-relaxed mb-6 lg:mb-8 max-w-xl">
            {project.description}
          </p>

          {/* Tech Stack */}
          <div className="flex flex-wrap gap-2 mb-6 lg:mb-10">
            {project.techStack.map((tech, i) => (
              <span 
                key={i}
                className="px-3 py-1.5 text-xs uppercase tracking-wider text-white/70 border border-white/20 rounded-full"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex gap-4">
            {project.liveUrl && (
              <a 
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 px-6 py-3 bg-white text-black text-sm font-medium uppercase tracking-wider rounded-full hover:bg-white/90 transition-all"
              >
                Visit Site
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            )}
            {project.githubUrl && (
              <a 
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 px-6 py-3 border border-white/30 text-white text-sm font-medium uppercase tracking-wider rounded-full hover:border-white/60 transition-all"
              >
                GitHub
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
            )}
          </div>
        </div>

        {/* Right Side - Project Image */}
        <div className="w-full lg:w-1/2 h-1/2 lg:h-full flex items-center justify-center p-8 lg:p-16">
          <div className="relative w-full h-full max-w-2xl max-h-[70vh] rounded-2xl overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-2xl" />
            <img 
              src={project.imagePath}
              alt={project.title}
              className="w-full h-full object-cover object-top rounded-2xl transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute bottom-4 right-4 px-3 py-1 bg-black/50 backdrop-blur-sm rounded-full">
              <span className="text-white/70 text-xs tracking-wider">{project.year}</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// Progress dot indicator
function ProgressDot({ index, total, scrollYProgress }) {
  const rangeStart = index / total;
  const rangeEnd = (index + 1) / total;
  
  return (
    <motion.div 
      className="w-2 h-2 rounded-full bg-white/30"
      style={{
        scale: useTransform(scrollYProgress, 
          [rangeStart - 0.05, rangeStart, rangeEnd - 0.05, rangeEnd],
          [1, 1.5, 1.5, 1]
        ),
        opacity: useTransform(scrollYProgress,
          [rangeStart - 0.05, rangeStart, rangeEnd - 0.05, rangeEnd],
          [0.3, 1, 1, 0.3]
        ),
      }}
    />
  );
}
