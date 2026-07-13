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
  subtle: { float: 0.5, parallax: 0.1, rotate: 0.05, drift: 0.14 },
  balanced: { float: 0.7, parallax: 0.16, rotate: 0.08, drift: 0.2 },
  bold: { float: 1, parallax: 0.24, rotate: 0.12, drift: 0.28 },
} as const;

// Key / rim / fill balance per lighting mood — soft, studio, or dramatic.
const LIGHTING = {
  soft: { key: 0.7, rim: 0.55, fill: 0.4 },
  studio: { key: 1.05, rim: 1, fill: 0.32 },
  dramatic: { key: 1.35, rim: 1.5, fill: 0.16 },
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

    const idleX = moving ? Math.sin(t * 0.12) * cfg.drift : 0;
    const idleY = moving ? Math.cos(t * 0.09) * cfg.drift * 0.7 : 0;
    const px = parallax ? p.x * cfg.parallax : 0;
    const py = parallax ? p.y * cfg.parallax : 0;

    cam.position.x = THREE.MathUtils.damp(
      cam.position.x,
      idleX + px,
      1.5,
      delta,
    );
    cam.position.y = THREE.MathUtils.damp(
      cam.position.y,
      idleY + py + prog * 0.1,
      1.5,
      delta,
    );
    cam.position.z = THREE.MathUtils.damp(
      cam.position.z,
      5 - prog * 0.6,
      1.8,
      delta,
    );
    cam.lookAt(0, -0.1, 0);
    // Barely-perceptible cinematic roll (set after lookAt, which resets it).
    if (moving) cam.rotation.z = Math.sin(t * 0.07) * cfg.rotate * 0.15;

    // The key light drifts with the pointer — the light moves, not the object.
    if (keyLight.current) {
      keyLight.current.position.x = THREE.MathUtils.damp(
        keyLight.current.position.x,
        3 + (parallax ? p.x * 1.4 : 0),
        1.4,
        delta,
      );
      keyLight.current.position.y = THREE.MathUtils.damp(
        keyLight.current.position.y,
        4 + (parallax ? p.y * 1 : 0) - prog * 0.6,
        1.4,
        delta,
      );
    }

    // The object itself moves only minimally.
    if (objectGroup.current) {
      objectGroup.current.rotation.y = THREE.MathUtils.damp(
        objectGroup.current.rotation.y,
        (parallax ? p.x * cfg.rotate : 0) + prog * 0.22,
        2,
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
      <group ref={objectGroup} position={[0, -0.55, 0]}>
        <Float
          speed={cfg.float}
          rotationIntensity={0.12}
          floatIntensity={cfg.float * 0.5}
        >
          <PresetObject preset={preset} />
        </Float>
      </group>
      <ContactShadows
        position={[0, -1.75, 0]}
        opacity={0.38}
        scale={10}
        blur={2.9}
        far={5}
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
      camera={{ position: [0, 0, 5], fov: 35 }}
    >
      <AdaptiveDpr pixelated />
      <CinematicScene {...props} />
    </Canvas>
  );
}
