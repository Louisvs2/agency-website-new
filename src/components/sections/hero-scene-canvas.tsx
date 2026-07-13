"use client";

import { useEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  AdaptiveDpr,
  ContactShadows,
  Environment,
  Float,
  Lightformer,
  MeshDistortMaterial,
  MeshTransmissionMaterial,
  RoundedBox,
} from "@react-three/drei";
import * as THREE from "three";

import type { HeroObjectPreset } from "@/types/content";

export interface HeroSceneCanvasProps {
  preset: HeroObjectPreset;
  parallax?: boolean;
  scroll?: boolean;
  cameraMotion?: boolean;
}

// Each preset is a geometry + material tuned for a premium look. Reflections
// come from the procedural studio environment below — no external HDR asset.
export function PresetObject({ preset }: { preset: HeroObjectPreset }) {
  switch (preset) {
    case "glass":
      return (
        <mesh>
          <icosahedronGeometry args={[1.15, 6]} />
          <MeshTransmissionMaterial
            thickness={1.2}
            roughness={0.1}
            ior={1.45}
            chromaticAberration={0.05}
            backside
          />
        </mesh>
      );
    case "chrome":
      return (
        <mesh>
          <torusKnotGeometry args={[0.72, 0.25, 220, 32]} />
          <meshStandardMaterial
            color="#e9e9ee"
            metalness={1}
            roughness={0.06}
            envMapIntensity={1.3}
          />
        </mesh>
      );
    case "marble":
      return (
        <mesh>
          <sphereGeometry args={[1.15, 96, 96]} />
          <meshPhysicalMaterial
            color="#efece6"
            roughness={0.35}
            metalness={0}
            clearcoat={1}
            clearcoatRoughness={0.25}
            sheen={0.6}
            sheenColor="#ffffff"
          />
        </mesh>
      );
    case "abstract":
      return (
        <mesh>
          <icosahedronGeometry args={[1.25, 16]} />
          <MeshDistortMaterial
            color="#bcbfca"
            metalness={0.7}
            roughness={0.18}
            distort={0.35}
            speed={1.4}
            envMapIntensity={1}
          />
        </mesh>
      );
    case "architecture":
      return (
        <group>
          <RoundedBox
            args={[1.7, 0.45, 1.7]}
            radius={0.05}
            smoothness={6}
            position={[0, -0.85, 0]}
          >
            <meshStandardMaterial
              color="#d8d8dd"
              metalness={0.15}
              roughness={0.6}
            />
          </RoundedBox>
          <RoundedBox
            args={[1.05, 1, 1.05]}
            radius={0.05}
            smoothness={6}
            position={[0, -0.1, 0]}
          >
            <meshStandardMaterial
              color="#cfcfd6"
              metalness={0.2}
              roughness={0.5}
            />
          </RoundedBox>
          <RoundedBox
            args={[0.5, 1.4, 0.5]}
            radius={0.05}
            smoothness={6}
            position={[0.15, 0.85, 0.15]}
          >
            <meshStandardMaterial
              color="#c4c4cc"
              metalness={0.25}
              roughness={0.45}
            />
          </RoundedBox>
        </group>
      );
    case "product":
      return (
        <RoundedBox args={[1.7, 1.05, 0.2]} radius={0.1} smoothness={10}>
          <meshPhysicalMaterial
            color="#26262b"
            metalness={0.6}
            roughness={0.35}
            clearcoat={0.7}
            clearcoatRoughness={0.3}
          />
        </RoundedBox>
      );
    case "orb":
    default:
      return (
        <mesh>
          <sphereGeometry args={[1.15, 96, 96]} />
          <meshPhysicalMaterial
            color="#9a9aa6"
            metalness={0.35}
            roughness={0.12}
            clearcoat={1}
            clearcoatRoughness={0.1}
            envMapIntensity={1.1}
          />
        </mesh>
      );
  }
}

// A studio HDRI built from area lights — premium reflections without shipping
// or fetching an HDR file.
export function StudioEnvironment() {
  return (
    <Environment resolution={256}>
      <Lightformer
        form="rect"
        intensity={3}
        position={[0, 4, 3]}
        scale={[8, 3, 1]}
        color="#ffffff"
      />
      <Lightformer
        form="rect"
        intensity={1.2}
        position={[-4, 1, 2]}
        rotation={[0, Math.PI / 4, 0]}
        scale={[4, 4, 1]}
        color="#ffffff"
      />
      <Lightformer
        form="rect"
        intensity={1.2}
        position={[4, 1, 2]}
        rotation={[0, -Math.PI / 4, 0]}
        scale={[4, 4, 1]}
        color="#ffffff"
      />
      <Lightformer
        form="ring"
        intensity={2}
        position={[3, 3, -3]}
        scale={2.5}
        color="#ffffff"
      />
      <Lightformer
        form="rect"
        intensity={0.7}
        position={[0, -3, 2]}
        scale={[6, 2, 1]}
        color="#cbd5e1"
      />
    </Environment>
  );
}

// Idle float (drei) plus high-end damped motion: parallax toward the pointer,
// optional scroll nudge, and a slow camera drift — all frame-rate independent.
function AnimatedGroup({
  preset,
  parallax = true,
  scroll = false,
  cameraMotion = true,
}: HeroSceneCanvasProps) {
  const group = useRef<THREE.Group>(null);
  const scrollY = useRef(0);

  useEffect(() => {
    if (!scroll) return;
    const onScroll = () => {
      scrollY.current = window.scrollY;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [scroll]);

  useFrame((state, delta) => {
    const g = group.current;
    if (!g) return;
    const pointer = state.pointer;

    let targetY = 0;
    let targetX = 0;
    if (parallax) {
      targetY += pointer.x * 0.35;
      targetX += -pointer.y * 0.2;
    }
    if (scroll) {
      targetY += scrollY.current * 0.0016;
    }
    g.rotation.y = THREE.MathUtils.damp(g.rotation.y, targetY, 3.5, delta);
    g.rotation.x = THREE.MathUtils.damp(g.rotation.x, targetX, 3.5, delta);

    if (cameraMotion) {
      const t = state.clock.elapsedTime;
      const cx = Math.sin(t * 0.3) * 0.25 + pointer.x * 0.15;
      const cy = Math.cos(t * 0.24) * 0.18 + pointer.y * 0.1;
      state.camera.position.x = THREE.MathUtils.damp(
        state.camera.position.x,
        cx,
        2.5,
        delta,
      );
      state.camera.position.y = THREE.MathUtils.damp(
        state.camera.position.y,
        cy,
        2.5,
        delta,
      );
      state.camera.lookAt(0, 0, 0);
    }
  });

  return (
    <group ref={group}>
      <Float speed={1.2} rotationIntensity={0.4} floatIntensity={0.8}>
        <PresetObject preset={preset} />
      </Float>
    </group>
  );
}

export function HeroSceneCanvas({
  preset,
  parallax = true,
  scroll = false,
  cameraMotion = true,
}: HeroSceneCanvasProps) {
  return (
    <Canvas
      style={{ position: "absolute", inset: 0 }}
      dpr={[1, 1.75]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      camera={{ position: [0, 0, 5], fov: 35 }}
    >
      <AdaptiveDpr pixelated />
      <ambientLight intensity={0.35} />
      <directionalLight position={[3, 4, 3]} intensity={1.1} />
      <AnimatedGroup
        preset={preset}
        parallax={parallax}
        scroll={scroll}
        cameraMotion={cameraMotion}
      />
      <ContactShadows
        position={[0, -1.5, 0]}
        opacity={0.4}
        scale={9}
        blur={2.6}
        far={4.5}
        resolution={512}
        color="#000000"
      />
      <StudioEnvironment />
    </Canvas>
  );
}
