import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { soundEngine } from '../ui/AudioController';

export default function MysticRingsCanvas({ activeDimension = 'TENSORS' }) {
  const mountRef = useRef(null);
  const [rotationSpeed, setRotationSpeed] = useState(1);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const width = container.clientWidth;
    const height = container.clientHeight;

    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100);
    camera.position.set(0, 0, 4.5);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const mysticGroup = new THREE.Group();
    scene.add(mysticGroup);

    // Glowing Orange/Gold Mystic Materials
    const mysticOrangeMat = new THREE.LineBasicMaterial({
      color: 0xff8c00,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
    });

    const mysticGoldMat = new THREE.LineBasicMaterial({
      color: 0xffd700,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending,
    });

    const coreEnergyMat = new THREE.MeshBasicMaterial({
      color: 0xffaa00,
      wireframe: true,
      transparent: true,
      opacity: 0.4,
    });

    // Outer Eldritch Ring with Ticks
    const createEldritchCircle = (radius, segments, material) => {
      const geo = new THREE.BufferGeometry();
      const points = [];
      for (let i = 0; i <= segments; i++) {
        const theta = (i / segments) * Math.PI * 2;
        points.push(new THREE.Vector3(Math.cos(theta) * radius, Math.sin(theta) * radius, 0));
      }
      geo.setFromPoints(points);
      return new THREE.Line(geo, material);
    };

    // Inner Geometric Mandala (Square inside Diamond inside Circle)
    const ringOuter = createEldritchCircle(1.8, 80, mysticOrangeMat);
    const ringInner = createEldritchCircle(1.5, 60, mysticGoldMat);
    const ringCore = createEldritchCircle(0.9, 40, mysticOrangeMat);

    mysticGroup.add(ringOuter);
    mysticGroup.add(ringInner);
    mysticGroup.add(ringCore);

    // Mystic Runes (Radial Spoke Ticks)
    const spokeGroup = new THREE.Group();
    for (let i = 0; i < 24; i++) {
      const theta = (i / 24) * Math.PI * 2;
      const spokeGeo = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(Math.cos(theta) * 1.5, Math.sin(theta) * 1.5, 0),
        new THREE.Vector3(Math.cos(theta) * 1.8, Math.sin(theta) * 1.8, 0)
      ]);
      const spoke = new THREE.Line(spokeGeo, mysticGoldMat);
      spokeGroup.add(spoke);
    }
    mysticGroup.add(spokeGroup);

    // 3D Polyhedral Data Tensor at center (Icosahedron / Octahedron)
    const tensorGeo = new THREE.IcosahedronGeometry(0.7, 1);
    const tensorMesh = new THREE.Mesh(tensorGeo, coreEnergyMat);
    mysticGroup.add(tensorMesh);

    // Outer Orbiting Sparks
    const sparkCount = 90;
    const sparkGeo = new THREE.BufferGeometry();
    const sparkPositions = new Float32Array(sparkCount * 3);
    const sparkAngles = new Float32Array(sparkCount);
    const sparkRadii = new Float32Array(sparkCount);
    const sparkSpeeds = new Float32Array(sparkCount);

    for (let i = 0; i < sparkCount; i++) {
      sparkAngles[i] = Math.random() * Math.PI * 2;
      sparkRadii[i] = 1.3 + Math.random() * 0.7;
      sparkSpeeds[i] = 0.02 + Math.random() * 0.04;

      sparkPositions[i * 3] = Math.cos(sparkAngles[i]) * sparkRadii[i];
      sparkPositions[i * 3 + 1] = Math.sin(sparkAngles[i]) * sparkRadii[i];
      sparkPositions[i * 3 + 2] = (Math.random() - 0.5) * 0.5;
    }
    sparkGeo.setAttribute('position', new THREE.BufferAttribute(sparkPositions, 3));

    const sparkMat = new THREE.PointsMaterial({
      color: 0xffe066,
      size: 0.05,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending,
    });
    const sparks = new THREE.Points(sparkGeo, sparkMat);
    mysticGroup.add(sparks);

    // Ambient & Point Light
    const amberLight = new THREE.PointLight(0xff8c00, 3, 5);
    amberLight.position.set(0, 0, 1.5);
    scene.add(amberLight);

    // Mouse interactive tilt
    let mouse = { x: 0, y: 0 };
    const onMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
    };
    window.addEventListener('mousemove', onMouseMove);

    const onResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', onResize);

    let animationId;

    const animate = () => {
      animationId = requestAnimationFrame(animate);

      // Rotate concentric Eldritch rings in alternating directions
      ringOuter.rotation.z += 0.008 * rotationSpeed;
      ringInner.rotation.z -= 0.012 * rotationSpeed;
      spokeGroup.rotation.z -= 0.012 * rotationSpeed;
      ringCore.rotation.z += 0.015 * rotationSpeed;

      // Tensor rotation
      tensorMesh.rotation.x += 0.01;
      tensorMesh.rotation.y += 0.015;

      // Group tilt towards mouse
      mysticGroup.rotation.y = THREE.MathUtils.lerp(mysticGroup.rotation.y, mouse.x * 0.4, 0.05);
      mysticGroup.rotation.x = THREE.MathUtils.lerp(mysticGroup.rotation.x, -mouse.y * 0.4, 0.05);

      // Animate sparks in vortex
      const positions = sparkGeo.attributes.position.array;
      for (let i = 0; i < sparkCount; i++) {
        sparkAngles[i] += sparkSpeeds[i] * rotationSpeed;
        positions[i * 3] = Math.cos(sparkAngles[i]) * sparkRadii[i] + (Math.random() - 0.5) * 0.04;
        positions[i * 3 + 1] = Math.sin(sparkAngles[i]) * sparkRadii[i] + (Math.random() - 0.5) * 0.04;
        positions[i * 3 + 2] = Math.sin(sparkAngles[i] * 3) * 0.2;
      }
      sparkGeo.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    const handleClick = () => {
      soundEngine.playMysticRing();
      setRotationSpeed(3.5);
      setTimeout(() => setRotationSpeed(1), 700);
    };
    container.addEventListener('click', handleClick);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      container.removeEventListener('click', handleClick);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [rotationSpeed]);

  return (
    <div className="relative w-full h-[400px] md:h-[480px] flex items-center justify-center select-none">
      <div 
        ref={mountRef} 
        className="w-full h-full cursor-pointer"
        title="Click to accelerate Eldritch Data Rings"
      />
      <div className="absolute top-2 right-2 text-[11px] font-mono text-amber-400/90 glass-panel px-2.5 py-1 rounded border border-amber-500/30">
        DIMENSION: {activeDimension}
      </div>
      <div className="absolute bottom-2 text-center text-[11px] font-mono text-amber-300/70 pointer-events-none">
        ✦ Click mandala to accelerate mystic data calculation ✦
      </div>
    </div>
  );
}
