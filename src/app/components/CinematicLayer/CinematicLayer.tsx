'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import styles from './CinematicLayer.module.css';

interface MouseState {
  x: number;
  y: number;
  targetX: number;
  targetY: number;
}

export default function CinematicLayer() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // ─── Renderer Setup ──────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: false,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);
    renderer.setClearColor(0x000000, 0);

    // ─── Scene & Camera ───────────────────────────────────────
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      canvas.clientWidth / canvas.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 5);

    // ─── Particle Geometry ────────────────────────────────────
    const PARTICLE_COUNT = 200;
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const colors    = new Float32Array(PARTICLE_COUNT * 3);
    const sizes     = new Float32Array(PARTICLE_COUNT);
    const offsets   = new Float32Array(PARTICLE_COUNT); // phase offsets for sine wave
    const speeds    = new Float32Array(PARTICLE_COUNT);

    // Warm orange (#ff8c42) and warm white (#fff5e6) palette
    const palette = [
      new THREE.Color('#ff8c42'),
      new THREE.Color('#ffaa66'),
      new THREE.Color('#ff6820'),
      new THREE.Color('#fff5e6'),
      new THREE.Color('#ffe4c4'),
      new THREE.Color('#ffd08a'),
    ];

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3;

      // Spread particles across the viewport depth
      positions[i3]     = (Math.random() - 0.5) * 14;
      positions[i3 + 1] = (Math.random() - 0.5) * 10;
      positions[i3 + 2] = (Math.random() - 0.5) * 6;

      // Pick from warm palette
      const col = palette[Math.floor(Math.random() * palette.length)];
      colors[i3]     = col.r;
      colors[i3 + 1] = col.g;
      colors[i3 + 2] = col.b;

      // Size varies — some larger bokeh orbs, some tiny sparkles
      sizes[i] = Math.random() < 0.15
        ? Math.random() * 12 + 8    // large bokeh
        : Math.random() * 5 + 1.5; // tiny sparkle

      // Random phase offsets for organic movement
      offsets[i] = Math.random() * Math.PI * 2;
      speeds[i]  = Math.random() * 0.3 + 0.1;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color',    new THREE.BufferAttribute(colors,    3));
    geometry.setAttribute('size',     new THREE.BufferAttribute(sizes,     1));

    // ─── Particle Material ────────────────────────────────────
    const material = new THREE.PointsMaterial({
      size:            0.06,
      sizeAttenuation: true,
      vertexColors:    true,
      blending:        THREE.AdditiveBlending,
      depthWrite:      false,
      transparent:     true,
      opacity:         0.85,
    });

    // Circular soft glow texture
    const textureCanvas = document.createElement('canvas');
    textureCanvas.width  = 64;
    textureCanvas.height = 64;
    const ctx = textureCanvas.getContext('2d')!;
    const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    gradient.addColorStop(0,    'rgba(255,255,255,1)');
    gradient.addColorStop(0.3,  'rgba(255,255,255,0.6)');
    gradient.addColorStop(0.7,  'rgba(255,200,120,0.2)');
    gradient.addColorStop(1,    'rgba(0,0,0,0)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 64, 64);
    material.map = new THREE.CanvasTexture(textureCanvas);

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // ─── Mouse Parallax ───────────────────────────────────────
    const mouse: MouseState = { x: 0, y: 0, targetX: 0, targetY: 0 };

    const onMouseMove = (e: MouseEvent) => {
      mouse.targetX = (e.clientX / window.innerWidth  - 0.5) * 0.8;
      mouse.targetY = (e.clientY / window.innerHeight - 0.5) * -0.5;
    };
    window.addEventListener('mousemove', onMouseMove);

    // ─── Resize Observer ──────────────────────────────────────
    const resizeObserver = new ResizeObserver(() => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    });
    resizeObserver.observe(canvas.parentElement!);

    // ─── Animation Loop ───────────────────────────────────────
    let animId: number;
    let startTime = performance.now();
    const posArray = geometry.attributes.position.array as Float32Array;

    // Store initial positions for sine wave calculations
    const initPositions = new Float32Array(positions);

    const animate = () => {
      animId = requestAnimationFrame(animate);

      const elapsed = (performance.now() - startTime) * 0.001;

      // Smooth mouse lerp
      mouse.x += (mouse.targetX - mouse.x) * 0.04;
      mouse.y += (mouse.targetY - mouse.y) * 0.04;

      // Camera parallax
      camera.position.x += (mouse.x - camera.position.x) * 0.05;
      camera.position.y += (mouse.y - camera.position.y) * 0.05;
      camera.lookAt(scene.position);

      // Animate particle positions (sine wave float)
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const i3 = i * 3;
        const t  = elapsed * speeds[i] + offsets[i];

        posArray[i3]     = initPositions[i3]     + Math.sin(t * 0.7)  * 0.3;
        posArray[i3 + 1] = initPositions[i3 + 1] + Math.sin(t * 0.5)  * 0.4;
        posArray[i3 + 2] = initPositions[i3 + 2] + Math.cos(t * 0.4)  * 0.2;
      }
      geometry.attributes.position.needsUpdate = true;

      // Slow scene rotation for dreamy drift
      particles.rotation.y = elapsed * 0.012;
      particles.rotation.x = Math.sin(elapsed * 0.008) * 0.06;

      renderer.render(scene, camera);
    };

    animate();

    // ─── Cleanup ──────────────────────────────────────────────
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', onMouseMove);
      resizeObserver.disconnect();

      geometry.dispose();
      material.map?.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return <canvas ref={canvasRef} className={styles.canvas} />;
}
