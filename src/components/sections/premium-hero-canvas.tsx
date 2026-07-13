"use client";

import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { AdaptiveDpr, ContactShadows } from "@react-three/drei";
import * as THREE from "three";

import { StudioEnvironment } from "@/components/sections/hero-scene-canvas";
import { PremiumAsset } from "@/components/sections/premium-asset";
import {
  PremiumObject,
  premiumObjectPresets,
  type PremiumObjectVariant,
} from "@/components/sections/premium-objects";
import type {
  PremiumHeroCamera,
  PremiumHeroIntensity,
} from "@/components/sections/premium-hero";
import { resolvePremiumAsset } from "@/config/premium-assets";

export interface PremiumHeroCanvasProps {
  objectVariant: PremiumObjectVariant;
  /** When set and registered, the GLB asset is rendered instead of the object. */
  asset?: string;
  camera?: PremiumHeroCamera;
  intensity?: PremiumHeroIntensity;
  parallax?: boolean;
  scroll?: boolean;
}

// Camera-motion amounts per intensity — the single place strength is tuned.
const INTENSITY = {
  subtle: { parallax: 0.08, drift: 0.1 },
  balanced: { parallax: 0.12, drift: 0.14 },
  bold: { parallax: 0.18, drift: 0.2 },
} as const;

// The cinematic rig is object-agnostic: it frames and lights whatever
// PremiumObject is passed (framing + light mood come from the object's preset),
// then drifts the camera almost imperceptibly, nudges camera + key light with
// the pointer, and dollies in on scroll. Each object supplies its own
// animation, so the rig never rotates it.
function CinematicScene({
  objectVariant,
  asset,
  camera = "cinematic",
  intensity = "balanced",
  parallax = true,
  scroll = false,
}: PremiumHeroCanvasProps) {
  const keyLight = useRef<THREE.DirectionalLight>(null);
  const scrollProgress = useRef(0);
  const cfg = INTENSITY[intensity];
  // An asset, when registered, owns the stage framing + light mood; otherwise
  // the procedural object's preset does. Either way the rig is identical.
  const assetDef = resolvePremiumAsset(asset);
  const stage = assetDef ?? premiumObjectPresets[objectVariant];
  const base = stage.camera.position;
  const light = stage.lighting;
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

    // Heavy damping (low lambda) — the camera carries weight and settles slowly.
    cam.position.x = THREE.MathUtils.damp(
      cam.position.x,
      base[0] + idleX + px,
      1,
      delta,
    );
    cam.position.y = THREE.MathUtils.damp(
      cam.position.y,
      base[1] + idleY + py + prog * 0.14,
      1,
      delta,
    );
    // Scroll is a slow dolly-in, not an object spin.
    cam.position.z = THREE.MathUtils.damp(
      cam.position.z,
      base[2] - prog * 0.95,
      1.1,
      delta,
    );
    cam.lookAt(0, -0.15, 0);
    if (moving) cam.rotation.z = Math.sin(t * 0.05) * 0.006;

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
        4 + (parallax ? p.y : 0) - prog * 0.6,
        1,
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

      <group position={[0, -0.15, 0]}>
        {assetDef ? (
          <PremiumAsset asset={assetDef.id} />
        ) : (
          <PremiumObject variant={objectVariant} />
        )}
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

  const assetDef = resolvePremiumAsset(props.asset);
  const stage = assetDef ?? premiumObjectPresets[props.objectVariant];

  return (
    <Canvas
      style={{ position: "absolute", inset: 0 }}
      dpr={[1, 1.75]}
      frameloop={active ? "always" : "never"}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      camera={{ position: stage.camera.position, fov: stage.camera.fov }}
    >
      <AdaptiveDpr pixelated />
      <CinematicScene {...props} />
    </Canvas>
  );
}
