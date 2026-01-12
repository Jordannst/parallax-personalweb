import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { 
  Float, 
  MeshTransmissionMaterial, 
  Environment,
  useTexture
} from "@react-three/drei";
import * as THREE from "three";

// The actual 3D crystal mesh
function DarkCrystal() {
  const meshRef = useRef();
  const { viewport } = useThree();
  
  // Responsive scale based on viewport
  const scale = useMemo(() => {
    const baseScale = Math.min(viewport.width, viewport.height) * 0.35;
    return Math.max(1.2, Math.min(baseScale, 2.5));
  }, [viewport]);

  // Slow idle rotation
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.1;
      meshRef.current.rotation.x += delta * 0.05;
    }
  });

  return (
    <Float
      speed={2}
      rotationIntensity={0.3}
      floatIntensity={0.5}
      floatingRange={[-0.1, 0.1]}
    >
      <mesh ref={meshRef} scale={scale}>
        {/* TorusKnot geometry - optimized segments for performance */}
        <torusKnotGeometry args={[1, 0.3, 100, 16]} />
        
        {/* Dark Liquid Glass / Obsidian Material - Optimized */}
        <MeshTransmissionMaterial
          backside={false}
          samples={4}
          resolution={256}
          transmission={0.95}
          roughness={0.2}
          thickness={1.5}
          ior={1.5}
          chromaticAberration={0.25}
          distortion={0.15}
          distortionScale={0.2}
          temporalDistortion={0.05}
          color="#ffffff"
          attenuationColor="#1a1a1a"
          attenuationDistance={0.5}
        />
      </mesh>
    </Float>
  );
}

// Main scene component
export default function Hero3DScene() {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none">
      <Canvas
        gl={{ 
          alpha: true, 
          antialias: true,
          powerPreference: "high-performance",
        }}
        dpr={[1, 1.5]}
        performance={{ min: 0.5 }}
        camera={{ position: [0, 0, 5], fov: 45 }}
        style={{ background: "transparent", pointerEvents: "none" }}
      >
        {/* Ambient lighting */}
        <ambientLight intensity={0.3} />
        
        {/* Directional lights for highlights */}
        <directionalLight position={[5, 5, 5]} intensity={0.5} />
        <directionalLight position={[-5, -5, -5]} intensity={0.2} color="#4080ff" />
        
        {/* Environment for reflections */}
        <Environment preset="city" />
        
        {/* The crystal */}
        <DarkCrystal />
      </Canvas>
    </div>
  );
}
