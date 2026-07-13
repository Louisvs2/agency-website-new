"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { MeshTransmissionMaterial, RoundedBox } from "@react-three/drei";
import * as THREE from "three";

// The premium object library. Every object is generated procedurally from
// Three.js geometry only — no external models, no GLTF, no downloads — and all
// share the same `<PremiumObject variant="…" />` API so they are swappable.
export type PremiumObjectVariant =
  "sculpture" | "glass" | "metal" | "architecture" | "fold";

export interface PremiumObjectPreset {
  /** Framing for this object — the scene starts the camera here. */
  camera: { position: [number, number, number]; fov: number };
  /** Light mood tuned to this object's material (key / rim / fill). */
  lighting: { key: number; rim: number; fill: number };
}

// Each object carries its own camera and lighting mood — swapping the variant
// re-frames and re-lights the whole scene.
export const premiumObjectPresets: Record<
  PremiumObjectVariant,
  PremiumObjectPreset
> = {
  sculpture: {
    camera: { position: [0, 0, 4.4], fov: 34 },
    lighting: { key: 1.35, rim: 1.75, fill: 0.16 },
  },
  glass: {
    camera: { position: [0, 0, 4.7], fov: 32 },
    lighting: { key: 1, rim: 1.35, fill: 0.42 },
  },
  metal: {
    camera: { position: [0, 0.15, 4.2], fov: 36 },
    lighting: { key: 1.25, rim: 1.6, fill: 0.2 },
  },
  architecture: {
    camera: { position: [0.5, 0.95, 4.9], fov: 34 },
    lighting: { key: 1.1, rim: 1, fill: 0.36 },
  },
  fold: {
    camera: { position: [0, 0, 4.3], fov: 36 },
    lighting: { key: 1.2, rim: 1.2, fill: 0.26 },
  },
};

// 1 — Sculpture: a lathed obsidian form with a soft flame silhouette, turning
// slowly like a piece in a gallery.
function Sculpture() {
  const ref = useRef<THREE.Group>(null);
  const geometry = useMemo(() => {
    const points: THREE.Vector2[] = [];
    const segments = 26;
    for (let i = 0; i <= segments; i++) {
      const s = i / segments;
      const y = -1.25 + 2.5 * s;
      // A smooth almond profile with a subtle waist — organic, not a sphere.
      const r =
        0.64 *
        Math.pow(Math.sin(s * Math.PI), 0.7) *
        (1 + 0.14 * Math.sin(s * Math.PI * 2));
      points.push(new THREE.Vector2(Math.max(r, 0.001), y));
    }
    return new THREE.LatheGeometry(points, 160);
  }, []);

  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.12;
  });

  return (
    <group ref={ref} rotation={[0.14, 0, 0.2]}>
      <mesh geometry={geometry}>
        <meshPhysicalMaterial
          color="#101013"
          roughness={0.26}
          metalness={0.2}
          clearcoat={1}
          clearcoatRoughness={0.16}
          reflectivity={0.6}
          envMapIntensity={1}
        />
      </mesh>
    </group>
  );
}

// 2 — Glass: three stacked, offset glass slabs — layered, transparent,
// refractive, like a luxury award object.
function Glass() {
  const ref = useRef<THREE.Group>(null);
  const slabs = useMemo(
    () => [
      { y: -0.72, scale: 1, rot: 0 },
      { y: 0.02, scale: 0.82, rot: 0.42 },
      { y: 0.66, scale: 0.62, rot: -0.32 },
    ],
    [],
  );

  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.18;
  });

  return (
    <group ref={ref} rotation={[0.1, 0, 0]}>
      {slabs.map((slab, i) => (
        <group
          key={i}
          position={[0, slab.y, 0]}
          rotation={[0, slab.rot, 0]}
          scale={slab.scale}
        >
          <RoundedBox args={[1.4, 0.42, 1.4]} radius={0.16} smoothness={5}>
            <MeshTransmissionMaterial
              thickness={0.6}
              roughness={0.05}
              ior={1.4}
              chromaticAberration={0.04}
              samples={6}
              resolution={256}
              backside
            />
          </RoundedBox>
        </group>
      ))}
    </group>
  );
}

// 3 — Metal: a machined aluminium form (lathed profile with chamfers and a
// concave top), brushed via anisotropy — minimalist Apple industrial design.
function Metal() {
  const ref = useRef<THREE.Group>(null);
  const geometry = useMemo(() => {
    const p: THREE.Vector2[] = [
      new THREE.Vector2(0, -0.62),
      new THREE.Vector2(0.72, -0.62),
      new THREE.Vector2(0.8, -0.52),
      new THREE.Vector2(0.82, 0.4),
      new THREE.Vector2(0.76, 0.56),
      new THREE.Vector2(0.52, 0.62),
      new THREE.Vector2(0.32, 0.52),
      new THREE.Vector2(0, 0.5),
    ];
    return new THREE.LatheGeometry(p, 200);
  }, []);

  useFrame((state, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y += delta * 0.14;
    ref.current.rotation.x =
      0.14 + Math.sin(state.clock.elapsedTime * 0.3) * 0.03;
  });

  return (
    <group ref={ref} rotation={[0.14, 0, 0]} scale={1.08}>
      <mesh geometry={geometry}>
        <meshPhysicalMaterial
          color="#c7cace"
          metalness={1}
          roughness={0.34}
          anisotropy={1}
          anisotropyRotation={Math.PI / 2}
          clearcoat={0.3}
          clearcoatRoughness={0.4}
          envMapIntensity={1.15}
        />
      </mesh>
    </group>
  );
}

// 4 — Architecture: an abstract concrete-and-glass model — plinth, a run of
// steps, cantilevered plates, a column and a glass pane.
function Architecture() {
  const ref = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.1;
  });

  const steps = useMemo(() => [0, 1, 2, 3, 4], []);

  return (
    <group ref={ref} rotation={[0, -0.5, 0]}>
      {/* Plinth */}
      <RoundedBox
        args={[1.9, 0.2, 1.3]}
        radius={0.02}
        smoothness={2}
        position={[0, -0.85, 0]}
      >
        <meshStandardMaterial
          color="#c9c7c2"
          roughness={0.85}
          metalness={0.04}
        />
      </RoundedBox>
      {/* Steps */}
      {steps.map((i) => (
        <RoundedBox
          key={i}
          args={[0.72, 0.14, 0.34]}
          radius={0.015}
          smoothness={2}
          position={[-0.42, -0.62 + i * 0.15, 0.28 - i * 0.19]}
        >
          <meshStandardMaterial
            color="#bdbbb6"
            roughness={0.82}
            metalness={0.04}
          />
        </RoundedBox>
      ))}
      {/* Cantilevered plate */}
      <RoundedBox
        args={[1.35, 0.1, 0.72]}
        radius={0.02}
        smoothness={2}
        position={[0.2, 0.3, 0.05]}
      >
        <meshStandardMaterial
          color="#cfcdc8"
          roughness={0.8}
          metalness={0.05}
        />
      </RoundedBox>
      {/* Upper slab */}
      <RoundedBox
        args={[0.95, 0.1, 0.62]}
        radius={0.02}
        smoothness={2}
        position={[-0.15, 0.78, -0.08]}
      >
        <meshStandardMaterial
          color="#b7b5b0"
          roughness={0.82}
          metalness={0.05}
        />
      </RoundedBox>
      {/* Column */}
      <RoundedBox
        args={[0.16, 1.3, 0.16]}
        radius={0.01}
        smoothness={2}
        position={[-0.6, 0.05, 0.24]}
      >
        <meshStandardMaterial
          color="#c4c2bd"
          roughness={0.8}
          metalness={0.05}
        />
      </RoundedBox>
      {/* Glass pane */}
      <RoundedBox
        args={[0.05, 1.05, 0.92]}
        radius={0.01}
        smoothness={2}
        position={[0.62, 0.15, -0.05]}
      >
        <meshStandardMaterial
          color="#dfe7ea"
          roughness={0.08}
          metalness={0}
          transparent
          opacity={0.32}
          envMapIntensity={1.6}
        />
      </RoundedBox>
    </group>
  );
}

// 5 — Folded surface: a plane displaced into soft creases, like a sheet of
// heavy paper or fabric, drifting slowly.
function Fold() {
  const ref = useRef<THREE.Group>(null);
  const geometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(2.5, 2.5, 90, 90);
    const pos = geo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      const z =
        0.2 * Math.sin(x * 2.1) * Math.cos(y * 1.5) +
        0.12 * Math.sin((x + y) * 1.35) +
        0.05 * Math.sin(x * 4.8);
      pos.setZ(i, z);
    }
    pos.needsUpdate = true;
    geo.computeVertexNormals();
    return geo;
  }, []);

  useFrame((state, delta) => {
    if (!ref.current) return;
    ref.current.rotation.z += delta * 0.05;
    ref.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.15) * 0.12;
  });

  return (
    <group ref={ref} rotation={[-0.55, 0.2, 0]}>
      <mesh geometry={geometry}>
        <meshPhysicalMaterial
          color="#eceae3"
          roughness={0.72}
          metalness={0}
          sheen={0.5}
          sheenColor="#ffffff"
          clearcoat={0.1}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}

// Same API for every object — the scene simply swaps the variant.
export function PremiumObject({ variant }: { variant: PremiumObjectVariant }) {
  switch (variant) {
    case "glass":
      return <Glass />;
    case "metal":
      return <Metal />;
    case "architecture":
      return <Architecture />;
    case "fold":
      return <Fold />;
    case "sculpture":
    default:
      return <Sculpture />;
  }
}
