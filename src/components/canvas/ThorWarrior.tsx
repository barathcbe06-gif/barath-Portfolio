import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ThorWarriorProps {
  isStriking?: boolean;
}

export const ThorWarrior: React.FC<ThorWarriorProps> = ({ isStriking }) => {
  const warriorGroup = useRef<THREE.Group>(null);
  const capeRef = useRef<THREE.Mesh>(null);
  const eyesMaterialRef = useRef<THREE.MeshStandardMaterial>(null);
  const chestNodesRef = useRef<THREE.MeshStandardMaterial>(null);

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();

    if (warriorGroup.current) {
      // Breathing & subtle warrior idle motion
      warriorGroup.current.position.y = -1.1 + Math.sin(time * 1.5) * 0.05;

      // Subtle mouse tracking
      const targetRotY = (state.pointer.x * 0.2) + 0.1;
      warriorGroup.current.rotation.y = THREE.MathUtils.lerp(
        warriorGroup.current.rotation.y,
        targetRotY,
        0.05
      );
    }

    // Cape flapping dynamic simulation
    if (capeRef.current) {
      capeRef.current.rotation.x = 0.25 + Math.sin(time * 3.5) * 0.08;
      capeRef.current.rotation.z = Math.cos(time * 2.8) * 0.05;
    }

    // Glowing eyes of thunder
    if (eyesMaterialRef.current) {
      const eyeIntensity = (isStriking ? 6.0 : 2.5) + Math.sin(time * 8.0) * 0.5;
      eyesMaterialRef.current.emissiveIntensity = eyeIntensity;
    }

    // Glowing chest power nodes
    if (chestNodesRef.current) {
      const nodeGlow = (isStriking ? 5.0 : 1.8) + Math.sin(time * 4.0) * 0.6;
      chestNodesRef.current.emissiveIntensity = nodeGlow;
    }
  });

  return (
    <group ref={warriorGroup} position={[-1.2, -1.1, -0.6]} scale={1.2}>
      {/* ================= ASGARDIAN HELMET & HEAD ================= */}
      <group position={[0, 2.2, 0]}>
        {/* Main Helm Dome */}
        <mesh castShadow receiveShadow>
          <sphereGeometry args={[0.55, 24, 24, 0, Math.PI * 2, 0, Math.PI * 0.7]} />
          <meshStandardMaterial
            color="#334155"
            metalness={0.92}
            roughness={0.25}
          />
        </mesh>

        {/* Helm Brow Guard & Nose Bridge */}
        <mesh position={[0, -0.15, 0.45]} castShadow>
          <boxGeometry args={[0.6, 0.15, 0.2]} />
          <meshStandardMaterial
            color="#475569"
            metalness={0.95}
            roughness={0.2}
          />
        </mesh>
        <mesh position={[0, -0.3, 0.5]}>
          <boxGeometry args={[0.12, 0.35, 0.15]} />
          <meshStandardMaterial
            color="#475569"
            metalness={0.95}
            roughness={0.2}
          />
        </mesh>

        {/* Glowing Lightning Eyes (Visor) */}
        <mesh position={[-0.18, -0.18, 0.51]}>
          <planeGeometry args={[0.16, 0.07]} />
          <meshStandardMaterial
            ref={eyesMaterialRef}
            color="#00f0ff"
            emissive="#00f0ff"
            emissiveIntensity={3.0}
          />
        </mesh>
        <mesh position={[0.18, -0.18, 0.51]}>
          <planeGeometry args={[0.16, 0.07]} />
          <meshStandardMaterial
            color="#00f0ff"
            emissive="#00f0ff"
            emissiveIntensity={3.0}
          />
        </mesh>

        {/* Silver Winged Helm Feathers (Left Wing) */}
        <group position={[-0.55, 0.2, -0.05]} rotation={[0, 0, 0.35]}>
          <mesh castShadow>
            <boxGeometry args={[0.12, 0.9, 0.4]} />
            <meshStandardMaterial
              color="#e2e8f0"
              metalness={0.96}
              roughness={0.15}
            />
          </mesh>
          <mesh position={[-0.1, 0.25, -0.05]} rotation={[0, 0, 0.2]}>
            <boxGeometry args={[0.08, 0.7, 0.3]} />
            <meshStandardMaterial color="#cbd5e1" metalness={0.95} />
          </mesh>
        </group>

        {/* Silver Winged Helm Feathers (Right Wing) */}
        <group position={[0.55, 0.2, -0.05]} rotation={[0, 0, -0.35]}>
          <mesh castShadow>
            <boxGeometry args={[0.12, 0.9, 0.4]} />
            <meshStandardMaterial
              color="#e2e8f0"
              metalness={0.96}
              roughness={0.15}
            />
          </mesh>
          <mesh position={[0.1, 0.25, -0.05]} rotation={[0, 0, -0.2]}>
            <boxGeometry args={[0.08, 0.7, 0.3]} />
            <meshStandardMaterial color="#cbd5e1" metalness={0.95} />
          </mesh>
        </group>
      </group>

      {/* ================= ARMORED CUIRASS (CHEST) ================= */}
      <group position={[0, 1.1, 0]}>
        {/* Chestplate Armor Base */}
        <mesh castShadow receiveShadow>
          <cylinderGeometry args={[0.85, 0.7, 1.4, 16]} />
          <meshStandardMaterial
            color="#1e293b"
            metalness={0.9}
            roughness={0.28}
          />
        </mesh>

        {/* 6 Circular Asgardian Power Discs on Torso */}
        {[
          { pos: [-0.35, 0.35, 0.72] as const },
          { pos: [0.35, 0.35, 0.72] as const },
          { pos: [-0.4, -0.05, 0.72] as const },
          { pos: [0.4, -0.05, 0.72] as const },
          { pos: [-0.35, -0.45, 0.68] as const },
          { pos: [0.35, -0.45, 0.68] as const },
        ].map((item, idx) => (
          <group key={idx} position={item.pos as [number, number, number]}>
            {/* Outer Metallic Rim */}
            <mesh>
              <torusGeometry args={[0.15, 0.03, 8, 16]} />
              <meshStandardMaterial
                color="#cbd5e1"
                metalness={0.95}
                roughness={0.15}
              />
            </mesh>
            {/* Inner Glowing Lightning Conduit */}
            <mesh>
              <circleGeometry args={[0.13, 16]} />
              <meshStandardMaterial
                ref={idx === 0 ? chestNodesRef : undefined}
                color="#38bdf8"
                emissive="#00f0ff"
                emissiveIntensity={2.0}
              />
            </mesh>
          </group>
        ))}

        {/* Pauldrons (Layered Silver Shoulders) */}
        <group position={[-1.0, 0.55, 0]} rotation={[0, 0, 0.4]}>
          <mesh castShadow>
            <sphereGeometry args={[0.45, 16, 16, 0, Math.PI * 2, 0, Math.PI * 0.5]} />
            <meshStandardMaterial
              color="#334155"
              metalness={0.94}
              roughness={0.2}
            />
          </mesh>
          <mesh position={[0, -0.15, 0]}>
            <cylinderGeometry args={[0.42, 0.44, 0.2, 16]} />
            <meshStandardMaterial color="#475569" metalness={0.92} />
          </mesh>
        </group>
        <group position={[1.0, 0.55, 0]} rotation={[0, 0, -0.4]}>
          <mesh castShadow>
            <sphereGeometry args={[0.45, 16, 16, 0, Math.PI * 2, 0, Math.PI * 0.5]} />
            <meshStandardMaterial
              color="#334155"
              metalness={0.94}
              roughness={0.2}
            />
          </mesh>
          <mesh position={[0, -0.15, 0]}>
            <cylinderGeometry args={[0.42, 0.44, 0.2, 16]} />
            <meshStandardMaterial color="#475569" metalness={0.92} />
          </mesh>
        </group>
      </group>

      {/* ================= FLOWING STORM CAPE ================= */}
      <mesh
        ref={capeRef}
        position={[0, 0.7, -0.55]}
        rotation={[0.25, 0, 0]}
        castShadow
      >
        <planeGeometry args={[1.8, 2.8, 12, 12]} />
        <meshStandardMaterial
          color="#7f1d1d" // Asgardian crimson cape
          roughness={0.8}
          metalness={0.1}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Rim light casting from behind warrior */}
      <pointLight
        position={[0, 2.0, -1.8]}
        color="#38bdf8"
        intensity={3.5}
        distance={6}
      />
    </group>
  );
};
