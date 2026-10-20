/**
 * High-performance WebGL & Rendering Utilities for Barath Portfolio
 * - WebGL capability detection
 * - Device-responsive pixel ratio
 * - IntersectionObserver-based render loop pausing (saves GPU/battery when off-screen)
 * - Safe recursive Three.js GPU memory cleanup
 */

let _webGLSupported = null;

export function isWebGLAvailable() {
  if (_webGLSupported !== null) return _webGLSupported;
  if (typeof window === 'undefined') {
    _webGLSupported = false;
    return false;
  }
  try {
    const canvas = document.createElement('canvas');
    _webGLSupported = Boolean(
      window.WebGLRenderingContext &&
      (canvas.getContext('webgl2') || canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    );
  } catch {
    _webGLSupported = false;
  }
  return _webGLSupported;
}

export function isMobileDevice() {
  if (typeof window === 'undefined') return false;
  return (
    window.innerWidth < 768 ||
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
  );
}

export function getOptimalPixelRatio() {
  if (typeof window === 'undefined') return 1;
  const dpr = window.devicePixelRatio || 1;
  const isMobile = isMobileDevice();
  // On mobile screens, 1.2x dpr provides crystal clear retina rendering without the 4x fill-rate penalty of 2x/3x dpr
  return isMobile ? Math.min(dpr, 1.2) : Math.min(dpr, 1.75);
}

/**
 * Cleanly disposes Three.js mesh, geometry, materials, and textures
 */
export function disposeThreeScene(scene, renderer) {
  if (!scene) return;
  scene.traverse((child) => {
    if (child.isMesh || child.isLine || child.isPoints) {
      if (child.geometry) {
        child.geometry.dispose();
      }
      if (child.material) {
        if (Array.isArray(child.material)) {
          child.material.forEach((mat) => {
            disposeMaterial(mat);
          });
        } else {
          disposeMaterial(child.material);
        }
      }
    }
  });

  if (renderer) {
    renderer.dispose();
  }
}

function disposeMaterial(mat) {
  if (!mat) return;
  // Dispose maps
  ['map', 'normalMap', 'roughnessMap', 'metalnessMap', 'alphaMap', 'envMap'].forEach((key) => {
    if (mat[key] && typeof mat[key].dispose === 'function') {
      mat[key].dispose();
    }
  });
  mat.dispose();
}

/**
 * Creates an IntersectionObserver to pause requestAnimationFrame loops when offscreen
 */
export function observeVisibility(element, onVisibilityChange, threshold = 0.05) {
  if (!element || typeof IntersectionObserver === 'undefined') {
    onVisibilityChange(true);
    return () => {};
  }

  const observer = new IntersectionObserver(
    ([entry]) => {
      onVisibilityChange(entry.isIntersecting);
    },
    { threshold }
  );

  observer.observe(element);

  // Also listen for document visibility state (user switches tabs)
  const handleDocVisibility = () => {
    if (document.hidden) {
      onVisibilityChange(false);
    } else {
      // Re-check bounding rect if visible
      const rect = element.getBoundingClientRect();
      const inView = rect.top < window.innerHeight && rect.bottom > 0;
      onVisibilityChange(inView);
    }
  };

  document.addEventListener('visibilitychange', handleDocVisibility);

  return () => {
    observer.disconnect();
    document.removeEventListener('visibilitychange', handleDocVisibility);
  };
}
