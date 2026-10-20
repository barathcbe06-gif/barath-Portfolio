import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { soundEngine } from '../ui/AudioController';
import {
  isWebGLAvailable,
  getOptimalPixelRatio,
  isMobileDevice,
  disposeThreeScene,
  observeVisibility
} from '../../utils/webglHelper';
import Hero3DFallback from './Hero3DFallback';

export default function IronManHeroCanvas({ onPowerSurge }) {
  const mountRef = useRef(null);
  const [corePower, setCorePower] = useState(100);
  const [isCharging, setIsCharging] = useState(false);
  const [hasWebGL] = useState(() => isWebGLAvailable());

  // Store callback in ref to prevent scene teardown when HeroSection re-renders
  const onPowerSurgeRef = useRef(onPowerSurge);
  useEffect(() => {
    onPowerSurgeRef.current = onPowerSurge;
  }, [onPowerSurge]);

  useEffect(() => {
    if (!hasWebGL) return;
    const container = mountRef.current;
    if (!container) return;

    const isMobile = isMobileDevice();

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x030712, 0.04);

    let width = container.clientWidth || 360;
    let height = container.clientHeight || 540;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0.5, 5.2);

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: !isMobile, // Disable MSAA on mobile for massive fill-rate performance boost
        alpha: true,
        powerPreference: 'high-performance'
      });
    } catch {
      return;
    }

    renderer.setSize(width, height);
    renderer.setPixelRatio(getOptimalPixelRatio());
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    container.appendChild(renderer.domElement);

    // Root Group for the Hero
    const heroGroup = new THREE.Group();
    scene.add(heroGroup);

    // --- MATERIALS (Metallic Crimson, Gold, Dark Titanium, Cyan Emissive) ---
    const armorRedMat = new THREE.MeshStandardMaterial({
      color: 0x9e1218,
      metalness: 0.9,
      roughness: 0.22,
    });

    const armorGoldMat = new THREE.MeshStandardMaterial({
      color: 0xd4a017,
      metalness: 0.95,
      roughness: 0.18,
    });

    const armorTitaniumMat = new THREE.MeshStandardMaterial({
      color: 0x1f242e,
      metalness: 0.85,
      roughness: 0.35,
    });

    const arcCoreMat = new THREE.MeshStandardMaterial({
      color: 0x00f0ff,
      emissive: 0x00f0ff,
      emissiveIntensity: 2.5,
      roughness: 0.1,
    });

    const eyeGlowMat = new THREE.MeshStandardMaterial({
      color: 0x00f0ff,
      emissive: 0x00f0ff,
      emissiveIntensity: 3.5,
    });

    const holoLineMat = new THREE.LineBasicMaterial({
      color: 0x00f0ff,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
    });

    // --- 1. CHEST & TORSO PIECES ---
    const chestGroup = new THREE.Group();
    heroGroup.add(chestGroup);

    // Upper Chest Plate (Crimson)
    const upperChestGeo = new THREE.CylinderGeometry(0.85, 0.7, 0.8, 6);
    const upperChest = new THREE.Mesh(upperChestGeo, armorRedMat);
    upperChest.position.y = -0.3;
    upperChest.rotation.y = Math.PI / 6;
    chestGroup.add(upperChest);

    // Lower Abdomen (Titanium Ribs)
    const lowerAbsGeo = new THREE.CylinderGeometry(0.65, 0.5, 0.7, 6);
    const lowerAbs = new THREE.Mesh(lowerAbsGeo, armorTitaniumMat);
    lowerAbs.position.y = -1.0;
    lowerAbs.rotation.y = Math.PI / 6;
    chestGroup.add(lowerAbs);

    // Collar Armor (Gold)
    const collarGeo = new THREE.BoxGeometry(1.2, 0.18, 0.75);
    const collar = new THREE.Mesh(collarGeo, armorGoldMat);
    collar.position.set(0, 0.18, 0.05);
    chestGroup.add(collar);

    // Shoulders
    const leftShoulderGeo = new THREE.SphereGeometry(0.38, isMobile ? 12 : 16, isMobile ? 12 : 16);
    const leftShoulder = new THREE.Mesh(leftShoulderGeo, armorRedMat);
    leftShoulder.position.set(-1.15, -0.15, 0);
    leftShoulder.scale.set(1.2, 0.8, 1);
    chestGroup.add(leftShoulder);

    const rightShoulder = leftShoulder.clone();
    rightShoulder.position.set(1.15, -0.15, 0);
    chestGroup.add(rightShoulder);

    // --- 2. ARC REACTOR CORE ---
    const arcReactorGroup = new THREE.Group();
    arcReactorGroup.position.set(0, -0.22, 0.46);
    chestGroup.add(arcReactorGroup);

    // Housing Bezel
    const arcBezelGeo = new THREE.TorusGeometry(0.24, 0.04, 12, isMobile ? 20 : 32);
    const arcBezel = new THREE.Mesh(arcBezelGeo, armorGoldMat);
    arcReactorGroup.add(arcBezel);

    // Inner Glowing Ring
    const innerRingGeo = new THREE.TorusGeometry(0.14, 0.02, 12, isMobile ? 16 : 24);
    const innerRing = new THREE.Mesh(innerRingGeo, arcCoreMat);
    arcReactorGroup.add(innerRing);

    // Core Crystal Point
    const crystalGeo = new THREE.OctahedronGeometry(0.1, 1);
    const coreCrystal = new THREE.Mesh(crystalGeo, arcCoreMat);
    arcReactorGroup.add(coreCrystal);

    // Point Light from the Arc Core
    const arcPointLight = new THREE.PointLight(0x00f0ff, 3, 4);
    arcPointLight.position.set(0, -0.2, 0.6);
    chestGroup.add(arcPointLight);

    // --- 3. HELMET & HEAD (Turn & Mouse-Tracking) ---
    const headGroup = new THREE.Group();
    headGroup.position.set(0, 0.58, 0);
    heroGroup.add(headGroup);

    // Neck joint
    const neckGeo = new THREE.CylinderGeometry(0.22, 0.26, 0.3, 10);
    const neck = new THREE.Mesh(neckGeo, armorTitaniumMat);
    neck.position.y = -0.15;
    headGroup.add(neck);

    // Cranium Shell (Crimson)
    const craniumGeo = new THREE.SphereGeometry(0.42, isMobile ? 16 : 24, isMobile ? 16 : 24);
    const cranium = new THREE.Mesh(craniumGeo, armorRedMat);
    cranium.scale.set(0.9, 1.1, 1.05);
    headGroup.add(cranium);

    // Faceplate (Gold)
    const faceplateGeo = new THREE.BoxGeometry(0.5, 0.55, 0.32);
    const faceplate = new THREE.Mesh(faceplateGeo, armorGoldMat);
    faceplate.position.set(0, -0.05, 0.28);
    faceplate.rotation.x = -0.12;
    headGroup.add(faceplate);

    // Jaw piece (Titanium/Gold)
    const jawGeo = new THREE.BoxGeometry(0.38, 0.22, 0.28);
    const jaw = new THREE.Mesh(jawGeo, armorTitaniumMat);
    jaw.position.set(0, -0.28, 0.28);
    headGroup.add(jaw);

    // Glowing Eyes (Slits)
    const eyeGeo = new THREE.BoxGeometry(0.12, 0.024, 0.04);
    const leftEye = new THREE.Mesh(eyeGeo, eyeGlowMat);
    leftEye.position.set(-0.14, 0.02, 0.44);
    leftEye.rotation.set(0.05, -0.1, 0.08);
    headGroup.add(leftEye);

    const rightEye = new THREE.Mesh(eyeGeo, eyeGlowMat);
    rightEye.position.set(0.14, 0.02, 0.44);
    rightEye.rotation.set(0.05, 0.1, -0.08);
    headGroup.add(rightEye);

    // --- 4. HOLOGRAPHIC HUD RINGS & DATA ORBITALS ---
    const holoRingGroup = new THREE.Group();
    heroGroup.add(holoRingGroup);

    const createHoloRing = (radius, segments = isMobile ? 36 : 64) => {
      const geo = new THREE.BufferGeometry();
      const points = [];
      for (let i = 0; i <= segments; i++) {
        const theta = (i / segments) * Math.PI * 2;
        points.push(new THREE.Vector3(Math.cos(theta) * radius, Math.sin(theta) * radius, 0));
      }
      geo.setFromPoints(points);
      return new THREE.Line(geo, holoLineMat);
    };

    const ring1 = createHoloRing(1.6);
    ring1.rotation.x = Math.PI / 2.8;
    holoRingGroup.add(ring1);

    const ring2 = createHoloRing(1.9);
    ring2.rotation.x = -Math.PI / 3;
    ring2.rotation.y = 0.4;
    holoRingGroup.add(ring2);

    const ring3 = createHoloRing(2.2);
    ring3.rotation.x = Math.PI / 4;
    ring3.rotation.z = 0.5;
    holoRingGroup.add(ring3);

    // --- 5. FLOATING PARTICLES (Energy Sparks / Embers) ---
    const particleCount = isMobile ? 45 : 100;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleSpeeds = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 5;
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 5;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 3;
      particleSpeeds[i] = 0.01 + Math.random() * 0.02;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

    const particleMat = new THREE.PointsMaterial({
      color: 0x00f0ff,
      size: isMobile ? 0.05 : 0.045,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
    });
    const particleSystem = new THREE.Points(particleGeo, particleMat);
    scene.add(particleSystem);

    // --- 6. LIGHTING SETUP (Stark Blue & Crimson Rim) ---
    const ambientLight = new THREE.AmbientLight(0x0a1128, 1.2);
    scene.add(ambientLight);

    const keyBlueLight = new THREE.DirectionalLight(0x00f0ff, 2.2);
    keyBlueLight.position.set(3, 3, 4);
    scene.add(keyBlueLight);

    const redRimLight = new THREE.DirectionalLight(0xe62429, 2.8);
    redRimLight.position.set(-4, -2, -3);
    scene.add(redRimLight);

    const topGoldLight = new THREE.PointLight(0xf5b041, 1.5, 6);
    topGoldLight.position.set(0, 4, 1);
    scene.add(topGoldLight);

    // --- MOUSE TRACKING & INTERACTION ---
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      mouse.targetX = x;
      mouse.targetY = y;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      const newW = container.clientWidth;
      const newH = container.clientHeight;
      if (newW > 0 && newH > 0) {
        camera.aspect = newW / newH;
        camera.updateProjectionMatrix();
        renderer.setSize(newW, newH);
      }
    };
    window.addEventListener('resize', handleResize, { passive: true });

    // Visibility-based loop pause
    let isVisible = true;
    let animationFrameId = null;
    const startTime = performance.now();

    const animate = () => {
      if (!isVisible) {
        animationFrameId = null;
        return;
      }

      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = (performance.now() - startTime) * 0.001;

      // Smooth mouse lerp
      mouse.x += (mouse.targetX - mouse.x) * 0.06;
      mouse.y += (mouse.targetY - mouse.y) * 0.06;

      // Head turn tracking
      headGroup.rotation.y = mouse.x * 0.45;
      headGroup.rotation.x = -mouse.y * 0.35;

      // Hero torso slight lean
      heroGroup.rotation.y = mouse.x * 0.18 + Math.sin(elapsedTime * 0.8) * 0.05;
      heroGroup.position.y = Math.sin(elapsedTime * 1.5) * 0.06;

      // Arc reactor rotation & pulse
      coreCrystal.rotation.x += 0.02;
      coreCrystal.rotation.y += 0.03;
      arcBezel.rotation.z += 0.01;
      innerRing.rotation.z -= 0.015;

      // Arc light flicker & breath
      const pulse = 2.8 + Math.sin(elapsedTime * 4) * 0.6;
      arcPointLight.intensity = pulse;
      arcCoreMat.emissiveIntensity = pulse;

      // Holographic ring rotations
      ring1.rotation.z += 0.008;
      ring2.rotation.z -= 0.006;
      ring3.rotation.z += 0.004;

      // Animate Particles upward
      const positions = particleGeo.attributes.position.array;
      for (let i = 0; i < particleCount; i++) {
        positions[i * 3 + 1] += particleSpeeds[i];
        if (positions[i * 3 + 1] > 3) {
          positions[i * 3 + 1] = -3;
          positions[i * 3] = (Math.random() - 0.5) * 5;
        }
      }
      particleGeo.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    };

    // Pause/Resume loop on scroll & visibility
    const disconnectObserver = observeVisibility(container, (visible) => {
      isVisible = visible;
      if (visible && !animationFrameId) {
        animate();
      }
    });

    // Start initial animation
    animate();

    // Trigger Surge on Click
    const handleCanvasClick = () => {
      soundEngine.playRepulsorBlast();
      arcPointLight.intensity = 8;
      arcCoreMat.emissiveIntensity = 8;
      eyeGlowMat.emissiveIntensity = 8;
      setTimeout(() => {
        arcPointLight.intensity = 3;
        arcCoreMat.emissiveIntensity = 2.5;
        eyeGlowMat.emissiveIntensity = 3.5;
      }, 350);
      setCorePower((prev) => Math.min(prev + 5, 125));
      if (onPowerSurgeRef.current) onPowerSurgeRef.current();
    };

    container.addEventListener('click', handleCanvasClick);

    // Handle context loss
    const canvasEl = renderer.domElement;
    const handleContextLost = (e) => {
      e.preventDefault();
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
    canvasEl.addEventListener('webglcontextlost', handleContextLost, false);

    // Cleanup
    return () => {
      disconnectObserver();
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('click', handleCanvasClick);
      canvasEl.removeEventListener('webglcontextlost', handleContextLost);

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      disposeThreeScene(scene, renderer);
    };
  }, [hasWebGL]);

  const handleChargeCore = () => {
    setIsCharging(true);
    soundEngine.playArcReactorSurge();
    setCorePower(125);
    setTimeout(() => setIsCharging(false), 800);
  };

  if (!hasWebGL) {
    return <Hero3DFallback type="iron-man" label="MARK LXXXV // ARC CORE ONLINE (2D COMPATIBILITY MODE)" />;
  }

  return (
    <div className="relative w-full h-[540px] md:h-[640px] lg:h-[700px] flex items-center justify-center select-none">
      {/* 3D Canvas Mounting Node */}
      <div 
        ref={mountRef} 
        className="w-full h-full cursor-grab active:cursor-grabbing"
        title="Click to fire Arc Reactor Repulsor, move mouse to aim"
      />

      {/* Floating Holographic Telemetry HUD overlays */}
      <div className="absolute top-4 right-4 pointer-events-auto">
        <div className="glass-panel px-3 py-2 rounded-lg border border-cyan-500/30 text-xs font-mono text-cyan-400 space-y-1 backdrop-blur-md shadow-lg shadow-cyan-950/40">
          <div className="flex items-center justify-between gap-4">
            <span className="text-slate-400">MARK:</span>
            <span className="font-bold text-cyan-300">LXXXV (85)</span>
          </div>
          <div className="flex items-center justify-between gap-4">
            <span className="text-slate-400">REACTOR:</span>
            <span className="text-emerald-400 font-bold">{corePower}%</span>
          </div>
          <div className="flex items-center justify-between gap-4">
            <span className="text-slate-400">STATUS:</span>
            <span className="text-cyan-300 animate-pulse">ARMED & ONLINE</span>
          </div>
        </div>
      </div>

      <div className="absolute bottom-6 left-6 pointer-events-auto hidden sm:block">
        <button
          onClick={handleChargeCore}
          disabled={isCharging}
          className="group relative flex items-center gap-2 px-4 py-2 rounded-full glass-panel border border-cyan-500/40 hover:border-cyan-400 text-xs font-mono tracking-wider text-cyan-300 transition-all hover:shadow-[0_0_20px_rgba(0,240,255,0.4)] active:scale-95 cursor-pointer"
        >
          <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
          <span>{isCharging ? 'OVERCHARGING CORE...' : 'TEST ARC REPULSOR'}</span>
        </button>
      </div>

      {/* Interactive Guidance Pill */}
      <div className="absolute bottom-2 right-6 pointer-events-none text-[11px] font-mono text-slate-400/80 bg-black/40 backdrop-blur-sm px-3 py-1 rounded-full border border-slate-800">
        Aim with cursor • Click to fire
      </div>
    </div>
  );
}
