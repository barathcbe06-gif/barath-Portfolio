import React, { useRef, useState, useEffect, useImperativeHandle, forwardRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { sound } from '../../utils/audio';

export interface LightningHandle {
  strike: () => void;
}

interface LightningStormProps {
  onFlash?: (active: boolean) => void;
}

// Generate jagged 3D fractal lightning bolt points
function generateBoltPoints(
  start: THREE.Vector3,
  end: THREE.Vector3,
  displace: number,
  iterations: number
): THREE.Vector3[] {
  let points: THREE.Vector3[] = [start, end];

  for (let it = 0; it < iterations; it++) {
    const nextPoints: THREE.Vector3[] = [];
    const currentDisplace = displace / Math.pow(1.8, it);

    for (let i = 0; i < points.length - 1; i++) {
      const p1 = points[i];
      const p2 = points[i + 1];
      const mid = new THREE.Vector3().addVectors(p1, p2).multiplyScalar(0.5);

      // Perpendicular jitter
      mid.x += (Math.random() - 0.5) * currentDisplace;
      mid.y += (Math.random() - 0.5) * currentDisplace * 0.4;
      mid.z += (Math.random() - 0.5) * currentDisplace;

      nextPoints.push(p1);
      nextPoints.push(mid);
    }
    nextPoints.push(points[points.length - 1]);
    points = nextPoints;
  }

  return points;
}

export const LightningStorm = forwardRef<LightningHandle, LightningStormProps>(
  ({ onFlash }, ref) => {
    const [activeBolt, setActiveBolt] = useState<THREE.Vector3[] | null>(null);
    const [branchBolts, setBranchBolts] = useState<THREE.Vector3[][]>([]);
    const [flashIntensity, setFlashIntensity] = useState(0);

    const boltMeshRef = useRef<THREE.LineSegments>(null);
    const flashLightRef = useRef<THREE.PointLight>(null);
    const dirLightRef = useRef<THREE.DirectionalLight>(null);

    const triggerStrike = () => {
      // Start in storm sky, strike directly to Mjölnir or central focal point
      const start = new THREE.Vector3(
        (Math.random() - 0.5) * 4,
        6.5 + Math.random() * 2,
        -1.0 + Math.random() * 2
      );
      const target = new THREE.Vector3(1.6, 0.2, 0); // Mjölnir's position

      // Generate main bolt
      const mainBolt = generateBoltPoints(start, target, 1.8, 4);
      setActiveBolt(mainBolt);

      // Generate 2-3 smaller branches
      const branches: THREE.Vector3[][] = [];
      const branchIndices = [4, 8, 12];
      for (const idx of branchIndices) {
        if (idx < mainBolt.length) {
          const branchStart = mainBolt[idx];
          const branchEnd = new THREE.Vector3(
            branchStart.x + (Math.random() - 0.5) * 3,
            branchStart.y - 1.5 - Math.random() * 1.5,
            branchStart.z + (Math.random() - 0.5) * 2
          );
          branches.push(generateBoltPoints(branchStart, branchEnd, 0.9, 3));
        }
      }
      setBranchBolts(branches);

      // Flash illumination
      setFlashIntensity(18);
      sound.playLightningSpark();
      setTimeout(() => sound.playThunder(), 80);

      if (onFlash) onFlash(true);

      // Multi-step flicker decay
      setTimeout(() => setFlashIntensity(6), 60);
      setTimeout(() => setFlashIntensity(16), 110);
      setTimeout(() => setFlashIntensity(4), 160);
      setTimeout(() => {
        setFlashIntensity(0);
        setActiveBolt(null);
        setBranchBolts([]);
        if (onFlash) onFlash(false);
      }, 260);
    };

    useImperativeHandle(ref, () => ({
      strike: triggerStrike,
    }));

    // Ambient random lightning strikes
    useEffect(() => {
      const interval = setInterval(() => {
        if (Math.random() > 0.45) {
          triggerStrike();
        }
      }, 7000);
      return () => clearInterval(interval);
    }, []);

    useFrame((_, delta) => {
      if (flashLightRef.current) {
        flashLightRef.current.intensity = THREE.MathUtils.lerp(
          flashLightRef.current.intensity,
          flashIntensity,
          0.35
        );
      }
      if (dirLightRef.current) {
        dirLightRef.current.intensity = THREE.MathUtils.lerp(
          dirLightRef.current.intensity,
          flashIntensity * 0.4,
          0.35
        );
      }
    });

    // Create line segments for main bolt
    const mainGeometry = React.useMemo(() => {
      if (!activeBolt || activeBolt.length < 2) return null;
      const geom = new THREE.BufferGeometry();
      const positions: number[] = [];
      for (let i = 0; i < activeBolt.length - 1; i++) {
        positions.push(activeBolt[i].x, activeBolt[i].y, activeBolt[i].z);
        positions.push(activeBolt[i + 1].x, activeBolt[i + 1].y, activeBolt[i + 1].z);
      }
      geom.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
      return geom;
    }, [activeBolt]);

    return (
      <group>
        {/* Main Lightning Bolt */}
        {mainGeometry && (
          <lineSegments geometry={mainGeometry}>
            <lineBasicMaterial
              color="#ffffff"
              linewidth={3}
              transparent
              opacity={0.95}
              blending={THREE.AdditiveBlending}
            />
          </lineSegments>
        )}

        {/* Outer Cyan Lightning Glow Aura */}
        {mainGeometry && (
          <lineSegments geometry={mainGeometry} scale={1.02}>
            <lineBasicMaterial
              color="#00f0ff"
              linewidth={6}
              transparent
              opacity={0.7}
              blending={THREE.AdditiveBlending}
            />
          </lineSegments>
        )}

        {/* Branch Bolts */}
        {branchBolts.map((branch, bIdx) => {
          const positions: number[] = [];
          for (let i = 0; i < branch.length - 1; i++) {
            positions.push(branch[i].x, branch[i].y, branch[i].z);
            positions.push(branch[i + 1].x, branch[i + 1].y, branch[i + 1].z);
          }
          const bGeom = new THREE.BufferGeometry();
          bGeom.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));

          return (
            <lineSegments key={bIdx} geometry={bGeom}>
              <lineBasicMaterial
                color="#38bdf8"
                linewidth={2}
                transparent
                opacity={0.8}
                blending={THREE.AdditiveBlending}
              />
            </lineSegments>
          );
        })}

        {/* Dynamic Lightning Flash Lights */}
        <pointLight
          ref={flashLightRef}
          position={[1.6, 2.5, 1.2]}
          color="#e0f2fe"
          intensity={0}
          distance={16}
          decay={1.6}
        />
        <directionalLight
          ref={dirLightRef}
          position={[0, 8, 3]}
          color="#38bdf8"
          intensity={0}
        />
      </group>
    );
  }
);
