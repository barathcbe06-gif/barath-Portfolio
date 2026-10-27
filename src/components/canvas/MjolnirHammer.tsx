import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { sound } from '../../utils/audio';

interface MjolnirHammerProps {
  onStrike?: () => void;
  isStriking?: boolean;
}

export const MjolnirHammer: React.FC<MjolnirHammerProps> = ({ onStrike, isStriking }) => {
  const hammerGroup = useRef<THREE.Group>(null);
  const runesRef = useRef<THREE.MeshStandardMaterial>(null);
  const sparkParticles = useRef<THREE.Points>(null);
  const lightningRingsRef = useRef<THREE.Group>(null);

  // Generate particle positions for crackling electric aura around hammer head
  const sparkCount = 80;
  const { sparkPositions, sparkColors } = useMemo(() => {
    const positions = new Float32Array(sparkCount * 3);
    const colors = new Float32Array(sparkCount * 3);
    const cyan = new THREE.Color('#00f0ff');
    const white = new THREE.Color('#ffffff');

    for (let i = 0; i < sparkCount; i++) {
      const u = Math.random() * 2 - 1;
      const v = Math.random() * 2 - 1;
      const w = Math.random() * 2 - 1;
      positions[i * 3] = u * 1.6;
      positions[i * 3 + 1] = v * 1.2;
      positions[i * 3 + 2] = w * 1.4;

      const c = Math.random() > 0.4 ? cyan : white;
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }
    return { sparkPositions: positions, sparkColors: colors };
  }, []);

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();

    if (hammerGroup.current) {
      // Gentle floating levitation
      const baseY = Math.sin(time * 1.8) * 0.12;
      const strikeOffset = isStriking ? 0.35 : 0;
      hammerGroup.current.position.y = baseY + strikeOffset;

      // Mouse responsive tilt
      const targetRotX = (state.pointer.y * 0.25) + 0.1;
      const targetRotY = (state.pointer.x * 0.45) - 0.2;
      hammerGroup.current.rotation.x = THREE.MathUtils.lerp(hammerGroup.current.rotation.x, targetRotX, 0.08);
      hammerGroup.current.rotation.y = THREE.MathUtils.lerp(hammerGroup.current.rotation.y, targetRotY, 0.08);
      hammerGroup.current.rotation.z = Math.sin(time * 1.2) * 0.04;
    }

    // Rune pulsing glow
    if (runesRef.current) {
      const pulse = 1.8 + Math.sin(time * 6.0) * 0.9 + (isStriking ? 4.0 : 0);
      runesRef.current.emissiveIntensity = pulse;
    }

    // Crackling sparks animation
    if (sparkParticles.current) {
      sparkParticles.current.rotation.y += delta * 1.2;
      sparkParticles.current.rotation.z += delta * 0.8;
      const posAttr = sparkParticles.current.geometry.attributes.position as THREE.BufferAttribute;
      for (let i = 0; i < sparkCount; i++) {
        let y = posAttr.getY(i) + (Math.random() - 0.48) * 0.06;
        if (y > 1.8) y = -1.2;
        if (y < -1.2) y = 1.8;
        posAttr.setY(i, y);
      }
      posAttr.needsUpdate = true;
    }

    // Lightning rings orbit around hammer head
    if (lightningRingsRef.current) {
      lightningRingsRef.current.rotation.x += delta * 2.5;
      lightningRingsRef.current.rotation.y += delta * 3.0;
    }
  });

  const handleClick = (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
    sound.playPowerSurge();
    if (onStrike) onStrike();
  };

  return (
    <group 
      ref={hammerGroup} 
      position={[1.6, 0.2, 0]} 
      scale={1.05}
      onClick={handleClick}
      onPointerOver={() => {
        document.body.style.cursor = 'pointer';
        sound.playHoverBlip();
      }}
      onPointerOut={() => {
        document.body.style.cursor = 'default';
      }}
    >
      {/* ================= HAMMER HEAD (URU METAL) ================= */}
      <group position={[0, 0, 0]}>
        {/* Main Central Block */}
        <mesh castShadow receiveShadow>
          <boxGeometry args={[2.2, 1.4, 1.4]} />
          <meshStandardMaterial
            color="#2a3242"
            metalness={0.92}
            roughness={0.22}
            envMapIntensity={1.5}
          />
        </mesh>

        {/* Side Beveled Edge Caps */}
        <mesh position={[-1.15, 0, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
          <cylinderGeometry args={[0.7, 0.75, 0.2, 8]} />
          <meshStandardMaterial
            color="#1c2333"
            metalness={0.95}
            roughness={0.3}
          />
        </mesh>
        <mesh position={[1.15, 0, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
          <cylinderGeometry args={[0.7, 0.75, 0.2, 8]} />
          <meshStandardMaterial
            color="#1c2333"
            metalness={0.95}
            roughness={0.3}
          />
        </mesh>

        {/* Norse Inscription Bands / Runic Trim */}
        <mesh position={[0, 0.71, 0]}>
          <planeGeometry args={[1.8, 0.25]} />
          <meshStandardMaterial
            ref={runesRef}
            color="#38bdf8"
            emissive="#00f0ff"
            emissiveIntensity={2.2}
            transparent
            opacity={0.95}
          />
        </mesh>
        <mesh position={[0, -0.71, 0]} rotation={[Math.PI, 0, 0]}>
          <planeGeometry args={[1.8, 0.25]} />
          <meshStandardMaterial
            color="#38bdf8"
            emissive="#00f0ff"
            emissiveIntensity={2.2}
            transparent
            opacity={0.95}
          />
        </mesh>
        <mesh position={[0, 0, 0.71]}>
          <planeGeometry args={[1.8, 0.35]} />
          <meshStandardMaterial
            color="#00f0ff"
            emissive="#00f0ff"
            emissiveIntensity={2.5}
            transparent
            opacity={0.92}
          />
        </mesh>
        <mesh position={[0, 0, -0.71]} rotation={[0, Math.PI, 0]}>
          <planeGeometry args={[1.8, 0.35]} />
          <meshStandardMaterial
            color="#00f0ff"
            emissive="#00f0ff"
            emissiveIntensity={2.5}
            transparent
            opacity={0.92}
          />
        </mesh>

        {/* Asgardian Triquetra / Thor Emblem on Face */}
        <mesh position={[1.26, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
          <ringGeometry args={[0.18, 0.42, 6]} />
          <meshStandardMaterial
            color="#38bdf8"
            emissive="#00f0ff"
            emissiveIntensity={3.0}
            metalness={0.9}
          />
        </mesh>
        <mesh position={[-1.26, 0, 0]} rotation={[0, -Math.PI / 2, 0]}>
          <ringGeometry args={[0.18, 0.42, 6]} />
          <meshStandardMaterial
            color="#38bdf8"
            emissive="#00f0ff"
            emissiveIntensity={3.0}
            metalness={0.9}
          />
        </mesh>

        {/* Orbiting Lightning Energy Rings */}
        <group ref={lightningRingsRef}>
          <mesh>
            <torusGeometry args={[1.5, 0.015, 8, 32]} />
            <meshBasicMaterial color="#00f0ff" transparent opacity={0.65} />
          </mesh>
          <mesh rotation={[Math.PI / 3, 0, 0]}>
            <torusGeometry args={[1.65, 0.012, 8, 32]} />
            <meshBasicMaterial color="#38bdf8" transparent opacity={0.5} />
          </mesh>
        </group>

        {/* Crackling Electric Sparks */}
        <points ref={sparkParticles}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              args={[sparkPositions, 3]}
            />
            <bufferAttribute
              attach="attributes-color"
              args={[sparkColors, 3]}
            />
          </bufferGeometry>
          <pointsMaterial
            size={0.07}
            vertexColors
            transparent
            opacity={0.9}
            blending={THREE.AdditiveBlending}
          />
        </points>

        {/* Mjölnir Internal Core Light */}
        <pointLight
          color="#00f0ff"
          intensity={isStriking ? 14 : 4.5}
          distance={8}
          decay={2}
        />
      </group>

      {/* ================= HAMMER HANDLE ================= */}
      <group position={[0, -1.8, 0]}>
        {/* Metallic Collar Ring */}
        <mesh position={[0, 1.05, 0]} castShadow>
          <cylinderGeometry args={[0.22, 0.22, 0.2, 16]} />
          <meshStandardMaterial
            color="#e2e8f0"
            metalness={0.95}
            roughness={0.15}
          />
        </mesh>

        {/* Handle Shaft (Wood / Steel Core) */}
        <mesh position={[0, 0, 0]} castShadow>
          <cylinderGeometry args={[0.15, 0.15, 2.0, 16]} />
          <meshStandardMaterial
            color="#1e1815"
            roughness={0.7}
            metalness={0.2}
          />
        </mesh>

        {/* Leather Spiral Grips (Detailed rings) */}
        {[-0.8, -0.5, -0.2, 0.1, 0.4, 0.7].map((y, idx) => (
          <mesh key={idx} position={[0, y, 0]}>
            <torusGeometry args={[0.165, 0.035, 8, 16]} />
            <meshStandardMaterial
              color="#451a03"
              roughness={0.8}
              metalness={0.1}
            />
          </mesh>
        ))}

        {/* Silver Pommel Cap */}
        <mesh position={[0, -1.05, 0]} castShadow>
          <cylinderGeometry args={[0.24, 0.18, 0.25, 16]} />
          <meshStandardMaterial
            color="#e2e8f0"
            metalness={0.95}
            roughness={0.15}
          />
        </mesh>

        {/* Leather Wrist Strap Lanyard */}
        <mesh position={[0, -1.35, 0]} rotation={[0, 0, 0.2]}>
          <torusGeometry args={[0.22, 0.035, 8, 24, Math.PI * 1.4]} />
          <meshStandardMaterial
            color="#451a03"
            roughness={0.8}
            metalness={0.1}
          />
        </mesh>
      </group>
    </group>
  );
};
