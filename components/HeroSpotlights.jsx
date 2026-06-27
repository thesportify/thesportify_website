"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function HeroSpotlights() {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

    const scene = new THREE.Scene();
    
    // Soft volumetric fog
    scene.fog = new THREE.FogExp2(0x050505, 0.02);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 15);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    // Create soft stadium lighting haze (no cones, just glowing ambient sources)
    // We use large soft sprites/planes to simulate the atmospheric scattering of stadium lights
    
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;
    const context = canvas.getContext('2d');
    const gradient = context.createRadialGradient(128, 128, 0, 128, 128, 128);
    gradient.addColorStop(0, 'rgba(255,255,255,1)');
    gradient.addColorStop(0.2, 'rgba(255,122,0,0.8)');
    gradient.addColorStop(1, 'rgba(0,0,0,0)');
    context.fillStyle = gradient;
    context.fillRect(0, 0, 256, 256);
    
    const texture = new THREE.CanvasTexture(canvas);
    const material = new THREE.SpriteMaterial({ 
      map: texture, 
      color: 0xffffff, 
      transparent: true,
      blending: THREE.AdditiveBlending,
      opacity: 0.15
    });

    const lights = [];
    const positions = [
      { x: -10, y: 8, z: -5 },
      { x: 10, y: 8, z: -5 },
      { x: 0, y: 12, z: -8 }
    ];

    positions.forEach(pos => {
      const sprite = new THREE.Sprite(material);
      sprite.position.set(pos.x, pos.y, pos.z);
      sprite.scale.set(30, 20, 1); // Very wide, soft spread
      scene.add(sprite);
      lights.push({ sprite, baseOpacity: 0.15 });
    });

    const handleResize = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    let clock = new THREE.Clock();
    let animationFrameId;

    const animate = () => {
      const elapsedTime = clock.getElapsedTime();

      // Very slow breathing animation
      lights.forEach((l, idx) => {
        l.sprite.material.opacity = l.baseOpacity + Math.sin(elapsedTime * 0.3 + idx) * 0.03;
      });

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };
    
    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
      if (renderer && renderer.domElement) {
        renderer.dispose();
        if (containerRef.current && containerRef.current.contains(renderer.domElement)) {
          containerRef.current.removeChild(renderer.domElement);
        }
      }
      material.dispose();
      texture.dispose();
    };
  }, []);

  return <div ref={containerRef} className="absolute inset-0 z-10 pointer-events-none" />;
}
