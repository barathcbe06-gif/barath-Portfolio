import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface VolumetricCloudsProps {
  lowQuality?: boolean;
}

export const VolumetricClouds: React.FC<VolumetricCloudsProps> = ({ lowQuality = false }) => {
  const cloudsGroup = useRef<THREE.Group>(null);
  const particlesRef = useRef<THREE.Points>(null);

  // Storm cloud clusters positions & scales
  const cloudClusters = useMemo(() => {
    return [
      { pos: [-3.5, 3.2, -4.0] as const, scale: [3.8, 2.2, 2.8] as const, rot: 0.2 },
      { pos: [3.8, 3.8, -4.5] as const, scale: [4.2, 2.5, 3.0] as const, rot: -0.3 },
      { pos: [0.0, 4.8, -5.0] as const, scale: [5.5, 2.8, 3.5] as const, rot: 0.1 },
      { pos: [-4.2, -1.0, -3.5] as const, scale: [3.2, 2.0, 2.4] as const, rot: 0.4 },
      { pos: [4.0, -1.2, -3.8] as const, scale: [3.4, 2.2, 2.5] as const, rot: -0.2 },
    ];
  }, []);

  // Ambient floating electric particles count
  const particleCount = lowQuality ? 120 : 280;
  const { positions, colors } = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    const col = new Float32Array(particleCount * 3);
    const cyan = new THREE.Color('#38bdf8');
    const deepCyan = new THREE.Color('#0284c7');
    const white = new THREE.Color('#ffffff');

    for (let i = 0; i < particleCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 16;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 12;

      const rand = Math.random();
      const c = rand > 0.7 ? white : rand > 0.3 ? cyan : deepCyan;
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }
    return { positions: pos, colors: col };
  }, [particleCount]);

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();

    if (cloudsGroup.current) {
      cloudsGroup.current.rotation.y = Math.sin(time * 0.04) * 0.05;
      cloudsGroup.current.position.y = Math.sin(time * 0.1) * 0.1;
    }

    if (particlesRef.current) {
      particlesRef.current.rotation.y += delta * 0.03;
      const posAttr = particlesRef.current.geometry.attributes.position as THREE.BufferAttribute;
      for (let i = 0; i < particleCount; i++) {
        let y = posAttr.getY(i) + delta * 0.15;
        if (y > 5.0) y = -5.0;
        posAttr.setY(i, y);
      }
      posAttr.needsUpdate = true;
    }
  });

  return (
    <group>
      {/* ================= VOLUMETRIC STORM CLOUDS ================= */}
      <group ref={cloudsGroup}>
        {cloudClusters.map((cloud, idx) => (
          <group key={idx} position={cloud.pos as [number, number, number]} rotation={[0, cloud.rot, 0]}>
            <mesh scale={cloud.scale as [number, number, number]}>
              <sphereGeometry args={[1, lowQuality ? 10 : 16, lowQuality ? 10 : 16]} />
              <meshStandardMaterial
                color="#0a1224"
                roughness={0.95}
                metalness={0.05}
                transparent
                opacity={0.75}
                depthWrite={false}
              />
            </mesh>
            {/* Subtle inner cloud cyan rim */}
            <mesh scale={[cloud.scale[0] * 0.92, cloud.scale[1] * 0.92, cloud.scale[2] * 0.92]}>
              <sphereGeometry args={[1, 10, 10]} />
              <meshBasicMaterial
                color="#0e2a54"
                transparent
                opacity={0.35}
                depthWrite={false}
              />
            </mesh>
          </group>
        ))}
      </group>

      {/* ================= FLOATING ELECTRIC SPARKS ================= */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[colors, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.06}
          vertexColors
          transparent
          opacity={0.8}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
};
