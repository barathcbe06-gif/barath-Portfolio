import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { soundEngine } from '../ui/AudioController';

export default function VibraniumShieldCanvas() {
  const mountRef = useRef(null);
  const [spinSpeed, setSpinSpeed] = useState(0.4);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const width = container.clientWidth;
    const height = container.clientHeight;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 4.2);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    container.appendChild(renderer.domElement);

    const shieldGroup = new THREE.Group();
    scene.add(shieldGroup);

    // Realistic Metallic Materials (Crimson Red, Brushed Silver, Deep Royal Blue)
    const redMat = new THREE.MeshStandardMaterial({
      color: 0xb5121b,
      metalness: 0.95,
      roughness: 0.25,
    });

    const silverMat = new THREE.MeshStandardMaterial({
      color: 0xd8dde3,
      metalness: 0.98,
      roughness: 0.15,
    });

    const blueMat = new THREE.MeshStandardMaterial({
      color: 0x0f3460,
      metalness: 0.9,
      roughness: 0.3,
    });

    const starMat = new THREE.MeshStandardMaterial({
      color: 0xf0f4f8,
      metalness: 0.95,
      roughness: 0.1,
      emissive: 0x00f0ff,
      emissiveIntensity: 0.25,
    });

    // Curvature Base Geometry (Shallow convex dish)
    const segments = 64;
    const createCurvedRing = (innerR, outerR, material, zOffset = 0) => {
      const geo = new THREE.RingGeometry(innerR, outerR, segments);
      // Slight convex curvature
      const pos = geo.attributes.position;
      for (let i = 0; i < pos.count; i++) {
        const x = pos.getX(i);
        const y = pos.getY(i);
        const r = Math.sqrt(x * x + y * y);
        pos.setZ(i, (1 - (r / 1.6) ** 2) * 0.22 + zOffset);
      }
      geo.computeVertexNormals();
      return new THREE.Mesh(geo, material);
    };

    // 1. Outer Crimson Ring
    const outerRing = createCurvedRing(1.22, 1.6, redMat);
    shieldGroup.add(outerRing);

    // 2. Middle Silver Ring
    const middleRing = createCurvedRing(0.86, 1.22, silverMat);
    shieldGroup.add(middleRing);

    // 3. Inner Crimson Ring
    const innerRing = createCurvedRing(0.52, 0.86, redMat);
    shieldGroup.add(innerRing);

    // 4. Center Blue Disc
    const centerDiscGeo = new THREE.CircleGeometry(0.52, segments);
    const discPos = centerDiscGeo.attributes.position;
    for (let i = 0; i < discPos.count; i++) {
      const x = discPos.getX(i);
      const y = discPos.getY(i);
      const r = Math.sqrt(x * x + y * y);
      discPos.setZ(i, (1 - (r / 1.6) ** 2) * 0.22);
    }
    centerDiscGeo.computeVertexNormals();
    const centerDisc = new THREE.Mesh(centerDiscGeo, blueMat);
    shieldGroup.add(centerDisc);

    // 5. 5-Point Vibranium Star
    const starShape = new THREE.Shape();
    const starPoints = 5;
    const outerRadius = 0.38;
    const innerRadius = 0.16;

    for (let i = 0; i < starPoints * 2; i++) {
      const radius = i % 2 === 0 ? outerRadius : innerRadius;
      const angle = (i / (starPoints * 2)) * Math.PI * 2 - Math.PI / 2;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      if (i === 0) starShape.moveTo(x, y);
      else starShape.lineTo(x, y);
    }
    starShape.closePath();

    const starExtrudeSettings = {
      depth: 0.05,
      bevelEnabled: true,
      bevelSegments: 3,
      steps: 1,
      bevelSize: 0.02,
      bevelThickness: 0.02,
    };
    const starGeo = new THREE.ExtrudeGeometry(starShape, starExtrudeSettings);
    const starMesh = new THREE.Mesh(starGeo, starMat);
    starMesh.position.z = 0.23;
    shieldGroup.add(starMesh);

    // Vibranium Shockwave Energy Ring (Orbiting glow)
    const haloGeo = new THREE.RingGeometry(1.65, 1.72, 64);
    const haloMat = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
      transparent: true,
      opacity: 0.3,
      side: THREE.DoubleSide,
    });
    const halo = new THREE.Mesh(haloGeo, haloMat);
    shieldGroup.add(halo);

    // Studio Lights
    const dirLight1 = new THREE.DirectionalLight(0xffffff, 2.8);
    dirLight1.position.set(3, 4, 5);
    scene.add(dirLight1);

    const blueRimLight = new THREE.DirectionalLight(0x00f0ff, 2.0);
    blueRimLight.position.set(-4, -2, -2);
    scene.add(blueRimLight);

    const redWarmLight = new THREE.DirectionalLight(0xe62429, 1.5);
    redWarmLight.position.set(0, -4, 2);
    scene.add(redWarmLight);

    const ambientLight = new THREE.AmbientLight(0x101827, 1.2);
    scene.add(ambientLight);

    // Mouse Tracking
    let mouse = { x: 0, y: 0 };
    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
    };
    window.addEventListener('mousemove', handleMouseMove);

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    let animationId;
    const startTime = performance.now();

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const elapsed = (performance.now() - startTime) * 0.001;

      // Shield rotation on Z-axis
      shieldGroup.rotation.z += 0.005 * spinSpeed;

      // Mouse interactive tilt
      shieldGroup.rotation.y = THREE.MathUtils.lerp(shieldGroup.rotation.y, mouse.x * 0.5, 0.06);
      shieldGroup.rotation.x = THREE.MathUtils.lerp(shieldGroup.rotation.x, -mouse.y * 0.5, 0.06);

      // Vibranium halo pulse
      halo.scale.setScalar(1 + Math.sin(elapsed * 3) * 0.04);
      haloMat.opacity = 0.25 + Math.sin(elapsed * 3) * 0.15;

      renderer.render(scene, camera);
    };

    animate();

    const handleClick = () => {
      soundEngine.playRepulsorBlast();
      setSpinSpeed(6);
      setTimeout(() => setSpinSpeed(0.4), 1000);
    };
    container.addEventListener('click', handleClick);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('click', handleClick);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [spinSpeed]);

  return (
    <div className="relative w-full h-[360px] md:h-[440px] flex items-center justify-center select-none">
      <div 
        ref={mountRef} 
        className="w-full h-full cursor-pointer"
        title="Click to spin Vibranium Shield"
      />
      <div className="absolute bottom-2 text-center text-[11px] font-mono text-cyan-400/80 pointer-events-none bg-black/40 px-3 py-1 rounded-full border border-cyan-900/50">
        VIBRANIUM ALLOY // IMPERMEABLE DEFENSE
      </div>
    </div>
  );
}
