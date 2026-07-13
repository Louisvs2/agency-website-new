"use client";

import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { AdaptiveDpr, ContactShadows, Float } from "@react-three/drei";
import * as THREE from "three";

import {
  PresetObject,
  StudioEnvironment,
} from "@/components/sections/hero-scene-canvas";
import type {
  PremiumHeroCamera,
  PremiumHeroIntensity,
  PremiumHeroLighting,
} from "@/components/sections/premium-hero";
import type { HeroObjectPreset } from "@/types/content";

export interface PremiumHeroCanvasProps {
  preset: HeroObjectPreset;
  lighting?: PremiumHeroLighting;
  camera?: PremiumHeroCamera;
  intensity?: PremiumHeroIntensity;
  parallax?: boolean;
  scroll?: boolean;
}

// Effect amounts per intensity — the single place motion strength is tuned.
const INTENSITY = {
  subtle: { float: 0.35, parallax: 0.08, rotate: 0.025, drift: 0.1 },
  balanced: { float: 0.5, parallax: 0.12, rotate: 0.04, drift: 0.14 },
  bold: { float: 0.72, parallax: 0.18, rotate: 0.06, drift: 0.2 },
} as const;

// Key / rim / fill balance per lighting mood — soft, studio, or dramatic.
const LIGHTING = {
  soft: { key: 0.8, rim: 0.75, fill: 0.34 },
  studio: { key: 1.15, rim: 1.4, fill: 0.26 },
  dramatic: { key: 1.5, rim: 1.95, fill: 0.12 },
} as const;

// One damped, frame-rate-independent rig: cinematic idle drift + a barely-felt
// roll, mouse parallax on the *camera and key light* (not the object), a
// minimal object rotation, and a slow dolly-in tied to scroll.
function CinematicScene({
  preset,
  lighting = "studio",
  camera = "cinematic",
  intensity = "balanced",
  parallax = true,
  scroll = false,
}: PremiumHeroCanvasProps) {
  const keyLight = useRef<THREE.DirectionalLight>(null);
  const objectGroup = useRef<THREE.Group>(null);
  const scrollProgress = useRef(0);
  const cfg = INTENSITY[intensity];
  const light = LIGHTING[lighting];
  const moving = camera !== "still";

  useEffect(() => {
    if (!scroll) return;
    const onScroll = () => {
      const h = window.innerHeight || 1;
      scrollProgress.current = Math.min(Math.max(window.scrollY / h, 0), 1);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [scroll]);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    const p = state.pointer;
    const cam = state.camera;
    const prog = scroll ? scrollProgress.current : 0;

    const idleX = moving ? Math.sin(t * 0.08) * cfg.drift : 0;
    const idleY = moving ? Math.cos(t * 0.06) * cfg.drift * 0.7 : 0;
    const px = parallax ? p.x * cfg.parallax : 0;
    const py = parallax ? p.y * cfg.parallax : 0;

    // Heavier damping (lower lambda) — the camera carries weight and settles slowly.
    cam.position.x = THREE.MathUtils.damp(cam.position.x, idleX + px, 1, delta);
    cam.position.y = THREE.MathUtils.damp(
      cam.position.y,
      idleY + py + prog * 0.14,
      1,
      delta,
    );
    // Scroll is a slow dolly-in — a camera move, not an object spin.
    cam.position.z = THREE.MathUtils.damp(
      cam.position.z,
      4.2 - prog * 0.95,
      1.1,
      delta,
    );
    cam.lookAt(0, -0.2, 0);
    // Barely-perceptible cinematic roll (set after lookAt, which resets it).
    if (moving) cam.rotation.z = Math.sin(t * 0.05) * cfg.rotate * 0.15;

    // The key light drifts with the pointer — the light moves, not the object.
    if (keyLight.current) {
      keyLight.current.position.x = THREE.MathUtils.damp(
        keyLight.current.position.x,
        3 + (parallax ? p.x * 1.4 : 0),
        1,
        delta,
      );
      keyLight.current.position.y = THREE.MathUtils.damp(
        keyLight.current.position.y,
        4 + (parallax ? p.y * 1 : 0) - prog * 0.6,
        1,
        delta,
      );
    }

    // The object itself moves only minimally.
    if (objectGroup.current) {
      objectGroup.current.rotation.y = THREE.MathUtils.damp(
        objectGroup.current.rotation.y,
        (parallax ? p.x * cfg.rotate : 0) + prog * 0.05,
        1.2,
        delta,
      );
    }
  });

  return (
    <>
      <ambientLight intensity={light.fill} />
      <directionalLight
        ref={keyLight}
        position={[3, 4, 4]}
        intensity={light.key}
        color="#ffffff"
      />
      {/* Rim lights from behind for soft edge highlights. */}
      <directionalLight
        position={[-4, 2, -4]}
        intensity={light.rim}
        color="#ffffff"
      />
      <directionalLight
        position={[4, -1, -3]}
        intensity={light.rim * 0.7}
        color="#e7e9f0"
      />
      <group ref={objectGroup} position={[0, -0.72, 0]} scale={1.12}>
        <Float
          speed={cfg.float}
          rotationIntensity={0.05}
          floatIntensity={cfg.float * 0.4}
        >
          <PresetObject preset={preset} />
        </Float>
      </group>
      <ContactShadows
        position={[0, -2, 0]}
        opacity={0.45}
        scale={11}
        blur={3}
        far={5.5}
        resolution={512}
        color="#000000"
      />
      <StudioEnvironment />
    </>
  );
}

export function PremiumHeroCanvas(props: PremiumHeroCanvasProps) {
  // Pause rendering entirely when the tab is hidden.
  const [active, setActive] = useState(true);
  useEffect(() => {
    const onVisibility = () => setActive(!document.hidden);
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  return (
    <Canvas
      style={{ position: "absolute", inset: 0 }}
      dpr={[1, 1.75]}
      frameloop={active ? "always" : "never"}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      camera={{ position: [0, 0, 4.2], fov: 38 }}
    >
      <AdaptiveDpr pixelated />
      <CinematicScene {...props} />
    </Canvas>
  );
}
