import { Suspense, lazy, useState, useEffect } from "react";

// Static fallback for mobile/loading - abstract twisted ring
function StaticOrbFallback() {
  return (
    <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 flex items-center justify-center">
      {/* Abstract twisted ring representation */}
      <div className="relative w-full h-full animate-float">
        {/* Outer glow */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/5 via-transparent to-white/5 blur-2xl" />
        
        {/* Main abstract shape - overlapping ellipses to mimic knot */}
        <div className="absolute inset-8 flex items-center justify-center">
          {/* Ring 1 - rotated */}
          <div className="absolute w-full h-3/4 rounded-[50%] border-2 border-white/20 rotate-12 bg-gradient-to-br from-white/5 to-transparent" />
          {/* Ring 2 - counter rotated */}
          <div className="absolute w-3/4 h-full rounded-[50%] border-2 border-white/15 -rotate-12 bg-gradient-to-tr from-transparent to-white/5" />
          {/* Ring 3 - twisted */}
          <div className="absolute w-5/6 h-5/6 rounded-[50%] border border-white/10 rotate-45" />
          
          {/* Inner highlight */}
          <div className="absolute top-1/4 left-1/4 w-1/4 h-1/4 rounded-full bg-white/10 blur-lg" />
          
          {/* Chromatic edges */}
          <div className="absolute inset-4 rounded-full bg-gradient-to-r from-cyan-500/5 via-transparent to-purple-500/5 mix-blend-screen" />
        </div>
      </div>
      
      {/* Float animation */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(3deg); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}

// Lazy load the 3D scene
const Hero3DScene = lazy(() => import("./Hero3DScene.jsx"));

export default function Hero3DObject() {
  const [isMobile, setIsMobile] = useState(true);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    // Check if mobile or low-end device
    const checkDevice = () => {
      const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      const isSmallScreen = window.innerWidth < 768;
      const isLowEnd = navigator.hardwareConcurrency <= 4;
      
      setIsMobile(isTouchDevice || isSmallScreen || isLowEnd);
    };
    
    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  // SSR / Initial render - show fallback
  if (!isClient) {
    return (
      <div className="w-full h-full flex items-center justify-center animate-float">
        <StaticOrbFallback />
      </div>
    );
  }

  // Mobile - show static fallback (better performance)
  if (isMobile) {
    return (
      <div className="w-full h-full flex items-center justify-center animate-float">
        <StaticOrbFallback />
      </div>
    );
  }

  // Desktop - load 3D scene with Suspense
  return (
    <Suspense
      fallback={
        <div className="w-full h-full flex items-center justify-center animate-float">
          <StaticOrbFallback />
        </div>
      }
    >
      <Hero3DScene />
    </Suspense>
  );
}

// Export fallback for external use if needed
export { StaticOrbFallback };
