// Premium 3D asset registry. The template ships NO assets — this map is
// intentionally empty. To add one, drop a .glb into
// public/assets/3d/<category>/ and register it here (see that folder's
// README.md). A hero referencing an unregistered id gracefully falls back to
// its procedural object.

export type PremiumAssetCategory =
  | "law"
  | "architecture"
  | "finance"
  | "medical"
  | "luxury"
  | "realestate"
  | "construction"
  | "abstract";

/** Light mood for the asset's stage (key / rim / fill). */
export interface PremiumAssetLighting {
  key: number;
  rim: number;
  fill: number;
}

/** Camera framing for the asset. */
export interface PremiumAssetCamera {
  position: [number, number, number];
  fov: number;
}

export interface PremiumAssetDefinition {
  /** Unique id used as `asset="…"`. */
  id: string;
  category: PremiumAssetCategory;
  /** File name inside public/assets/3d/<category>/. */
  file: string;
  lighting: PremiumAssetLighting;
  camera: PremiumAssetCamera;
  scale?: number | [number, number, number];
  position?: [number, number, number];
  rotation?: [number, number, number];
  /** Idle rotation speed in rad/s (0 = static). */
  motion?: number;
}

// No assets ship with the template. Populate per project.
export const premiumAssets: Record<string, PremiumAssetDefinition> = {};

/** Returns the definition for a registered asset id, or undefined. */
export function resolvePremiumAsset(
  id?: string,
): PremiumAssetDefinition | undefined {
  return id ? premiumAssets[id] : undefined;
}

/** Public path to an asset's GLB file. */
export function premiumAssetPath(def: PremiumAssetDefinition): string {
  return `/assets/3d/${def.category}/${def.file}`;
}
