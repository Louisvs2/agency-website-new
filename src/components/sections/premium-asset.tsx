"use client";

import {
  Component,
  Suspense,
  useEffect,
  useMemo,
  useRef,
  type ReactNode,
} from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { KTX2Loader } from "three/examples/jsm/loaders/KTX2Loader.js";
import * as THREE from "three";

import {
  premiumAssetPath,
  premiumAssets,
  resolvePremiumAsset,
  type PremiumAssetCamera,
  type PremiumAssetCategory,
  type PremiumAssetLighting,
} from "@/config/premium-assets";

// Self-hosted decoder / transcoder paths. Copy the libs from
// node_modules/three/examples/jsm/libs/{draco,basis}/ into public/ before
// shipping DRACO- or KTX2-compressed assets (see the assets README).
const DRACO_PATH = "/draco/";
const KTX2_PATH = "/basis/";

// Automatic preload of every registered asset (none by default).
Object.values(premiumAssets).forEach((def) => {
  useGLTF.preload(premiumAssetPath(def), DRACO_PATH);
});

type Transform = {
  scale?: number | [number, number, number];
  position?: [number, number, number];
  rotation?: [number, number, number];
  motion?: number;
};

// A quiet wireframe stand-in shown while an asset loads and if it fails.
function AssetPlaceholder() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.3;
  });
  return (
    <mesh ref={ref}>
      <icosahedronGeometry args={[0.9, 1]} />
      <meshStandardMaterial
        color="#9a9aa6"
        roughness={0.5}
        wireframe
        transparent
        opacity={0.3}
      />
    </mesh>
  );
}

class AssetErrorBoundary extends Component<
  { fallback: ReactNode; children: ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false };
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  render() {
    return this.state.hasError ? this.props.fallback : this.props.children;
  }
}

function AssetModel({
  src,
  scale = 1,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  motion = 0,
}: Transform & { src: string }) {
  const gl = useThree((state) => state.gl);
  const gltf = useGLTF(src, DRACO_PATH, true, (loader) => {
    // KTX2 / Basis texture support (wired for the architecture category).
    const ktx2 = new KTX2Loader()
      .setTranscoderPath(KTX2_PATH)
      .detectSupport(gl);
    (
      loader as unknown as { setKTX2Loader: (l: KTX2Loader) => void }
    ).setKTX2Loader(ktx2);
  });

  const model = useMemo(() => {
    const cloned = gltf.scene.clone();
    // Frustum culling on every mesh (three's default — set explicitly).
    cloned.traverse((child) => {
      child.frustumCulled = true;
    });
    return cloned;
  }, [gltf.scene]);

  const ref = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (ref.current && motion) ref.current.rotation.y += delta * motion;
  });

  return (
    <primitive
      ref={ref}
      object={model}
      scale={scale}
      position={position}
      rotation={rotation}
    />
  );
}

// Standalone lighting rig for an asset used outside the hero's scene rig.
function AssetLights({ lighting }: { lighting: PremiumAssetLighting }) {
  return (
    <>
      <ambientLight intensity={lighting.fill} />
      <directionalLight position={[3, 4, 4]} intensity={lighting.key} />
      <directionalLight position={[-4, 2, -4]} intensity={lighting.rim} />
    </>
  );
}

// Applies an asset's camera framing when used standalone.
function AssetCamera({ camera }: { camera: PremiumAssetCamera }) {
  const cam = useThree((state) => state.camera);
  useEffect(() => {
    cam.position.set(...camera.position);
    if (cam instanceof THREE.PerspectiveCamera) {
      cam.fov = camera.fov;
      cam.updateProjectionMatrix();
    }
  }, [camera, cam]);
  return null;
}

export interface PremiumAssetProps {
  /** Registered asset id, or a file name when combined with `category`. */
  asset: string;
  category?: PremiumAssetCategory;
  /** Own lighting (rendered only when provided — the hero rig lights it otherwise). */
  lighting?: PremiumAssetLighting;
  /** Own camera framing (applied only when provided). */
  camera?: PremiumAssetCamera;
  motion?: number;
  scale?: number | [number, number, number];
  position?: [number, number, number];
  rotation?: [number, number, number];
}

/**
 * In-canvas premium GLB asset with the full production pipeline: lazy loading,
 * Suspense with a placeholder, an error boundary that degrades to the same
 * placeholder, DRACO + Meshopt geometry and KTX2 textures, automatic preload
 * and frustum culling. Resolves its file from the asset registry (by id) or
 * from `category` + `asset` file name.
 */
export function PremiumAsset({
  asset,
  category,
  lighting,
  camera,
  motion,
  scale,
  position,
  rotation,
}: PremiumAssetProps) {
  const def = resolvePremiumAsset(asset);
  const src = def
    ? premiumAssetPath(def)
    : category
      ? `/assets/3d/${category}/${asset}`
      : undefined;

  if (!src) return null;

  return (
    <>
      {camera && <AssetCamera camera={camera} />}
      {lighting && <AssetLights lighting={lighting} />}
      <AssetErrorBoundary fallback={<AssetPlaceholder />}>
        <Suspense fallback={<AssetPlaceholder />}>
          <AssetModel
            src={src}
            scale={scale ?? def?.scale}
            position={position ?? def?.position}
            rotation={rotation ?? def?.rotation}
            motion={motion ?? def?.motion}
          />
        </Suspense>
      </AssetErrorBoundary>
    </>
  );
}
