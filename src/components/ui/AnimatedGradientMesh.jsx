// Animated Gradient Mesh - Performant alternative to 3D object
// Uses CSS animations for smooth, GPU-accelerated gradients

export default function AnimatedGradientMesh() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Primary gradient orb - moves slowly */}
      <div 
        className="absolute w-[600px] h-[600px] rounded-full opacity-30 animate-gradient-float-1"
        style={{
          background: 'radial-gradient(circle, rgba(120,119,198,0.3) 0%, transparent 70%)',
          top: '-10%',
          left: '-10%',
        }}
      />
      
      {/* Secondary gradient orb - different timing */}
      <div 
        className="absolute w-[500px] h-[500px] rounded-full opacity-25 animate-gradient-float-2"
        style={{
          background: 'radial-gradient(circle, rgba(255,182,193,0.2) 0%, transparent 70%)',
          bottom: '-15%',
          right: '-10%',
        }}
      />
      
      {/* Tertiary accent orb */}
      <div 
        className="absolute w-[400px] h-[400px] rounded-full opacity-20 animate-gradient-float-3"
        style={{
          background: 'radial-gradient(circle, rgba(147,197,253,0.25) 0%, transparent 70%)',
          top: '40%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      />

      {/* Subtle noise texture overlay */}
      <div 
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* CSS Animations */}
      <style>{`
        @keyframes gradient-float-1 {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          25% {
            transform: translate(5%, 10%) scale(1.05);
          }
          50% {
            transform: translate(10%, 5%) scale(1);
          }
          75% {
            transform: translate(5%, -5%) scale(1.02);
          }
        }
        
        @keyframes gradient-float-2 {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(-8%, -5%) scale(1.03);
          }
          66% {
            transform: translate(-3%, 8%) scale(0.97);
          }
        }
        
        @keyframes gradient-float-3 {
          0%, 100% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 0.2;
          }
          50% {
            transform: translate(-50%, -50%) scale(1.1);
            opacity: 0.3;
          }
        }
        
        .animate-gradient-float-1 {
          animation: gradient-float-1 20s ease-in-out infinite;
        }
        
        .animate-gradient-float-2 {
          animation: gradient-float-2 25s ease-in-out infinite;
        }
        
        .animate-gradient-float-3 {
          animation: gradient-float-3 15s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
