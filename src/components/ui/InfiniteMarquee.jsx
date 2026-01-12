// Pure CSS Infinite Marquee - No Framer Motion for the animation
// Uses CSS animation for better performance (GPU-accelerated)

export default function InfiniteMarquee({ 
  items = [], 
  direction = "left", 
  speed = 25,
  outlined = false,
  theme = "dark"
}) {
  // Quadruple items to ensure no gaps on ultra-wide screens
  const duplicatedItems = [...items, ...items, ...items, ...items];

  // Theme-based styles
  const getTextStyles = () => {
    if (theme === "light") {
      return outlined 
        ? "text-transparent [-webkit-text-stroke:1.5px_rgba(0,0,0,0.2)] group-hover:[-webkit-text-stroke:1.5px_rgba(0,0,0,0.6)]"
        : "text-black/10 group-hover:text-black/30";
    }
    return outlined 
      ? "text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.3)] group-hover:[-webkit-text-stroke:1px_rgba(255,255,255,0.8)]"
      : "text-white/10 group-hover:text-white/30";
  };

  // Animation style based on direction
  // Speed is multiplied because content is 4x duplicated
  const adjustedSpeed = speed * 2;
  const animationStyle = {
    animation: `marquee-${direction} ${adjustedSpeed}s linear infinite`,
    willChange: "transform",
  };

  return (
    <>
      {/* CSS Keyframes - both directions defined once */}
      <style>{`
        @keyframes marquee-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-right {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .marquee-container:hover .marquee-track {
          animation-play-state: paused;
        }
      `}</style>

      <div className="marquee-container group flex overflow-hidden whitespace-nowrap">
        <div className="marquee-track flex" style={animationStyle}>
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
        </div>
      </div>
    </>
  );
}
