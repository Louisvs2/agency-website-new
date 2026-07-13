# Premium 3D Assets

High-end GLB models rendered by the `<PremiumHero asset="…" />` /
`<PremiumAsset>` pipeline. The template ships **no** assets — this is the
folder they live in, organised by industry category:

```
public/assets/3d/
  law/  architecture/  finance/  medical/
  luxury/  realestate/  construction/  abstract/
```

When no matching asset is registered, the hero **falls back to the
procedural object** (`objectVariant`) automatically — nothing breaks.

---

## How to add a new GLB asset

1. **Export** a `.glb` (glTF binary) from Blender / Cinema 4D / your
   AI-assisted workflow (see export settings below).
2. **Drop** the file into the matching category folder, e.g.
   `public/assets/3d/luxury/obsidian-monolith.glb`.
3. **Register** it in `src/config/premium-assets.ts`:

   ```ts
   export const premiumAssets: Record<string, PremiumAssetDefinition> = {
     "obsidian-monolith": {
       id: "obsidian-monolith",
       category: "luxury",
       file: "obsidian-monolith.glb",
       // Framing + light mood, same shape as the procedural presets:
       camera: { position: [0, 0, 4.4], fov: 34 },
       lighting: { key: 1.3, rim: 1.7, fill: 0.18 },
       scale: 1,
       position: [0, -0.15, 0],
       rotation: [0, 0, 0],
       motion: 0.1, // idle rotation, rad/s (0 = static)
     },
   };
   ```

4. **Use** it: `<PremiumHero asset="obsidian-monolith" />`. Because the id is
   now registered, the asset is used instead of the procedural object. The
   asset is lazy-loaded, preloaded, Suspense-wrapped, and shows a placeholder
   while loading (and on error).

That's it — no code changes beyond the registry entry.

---

## Recommended export settings

| Setting    | Recommendation                                           |
| ---------- | -------------------------------------------------------- |
| Format     | **glTF Binary (`.glb`)** — single self-contained file    |
| Up axis    | **+Y up** (glTF standard)                                |
| Transforms | **Apply** all transforms; centre the model on the origin |
| Scale      | Model should read well at ~2–2.5 world units tall        |
| Materials  | **Principled BSDF / PBR metal-roughness** only           |
| Extras     | Strip cameras, lights and animations you don't need      |

## Recommended polygon count

| Use                                     | Triangles      |
| --------------------------------------- | -------------- |
| Hero object (single, close-up)          | **50k – 150k** |
| Ideal target                            | **~80k**       |
| Hard ceiling (mobile falls back anyway) | **250k**       |

Prefer clean topology and **baked normal maps** over raw geometry density.

## Recommended texture sizes

| Map                            | Size                                 |
| ------------------------------ | ------------------------------------ |
| Base colour / albedo           | **2048²** (hero) — never above 4096² |
| Normal / roughness / metalness | **1024²–2048²**                      |
| Everything else (AO, etc.)     | **1024²**                            |

Keep the **total** texture payload per asset under ~8 MB (compressed).

## Recommended compression

The pipeline is pre-wired for all three; enable in your exporter or via
`gltf-transform` / `gltfpack`:

- **Geometry → DRACO** (`gltf-transform draco in.glb out.glb`). Decoder is
  loaded from `/draco/` — copy the decoder from
  `node_modules/three/examples/jsm/libs/draco/` into `public/draco/`.
- **Geometry → Meshopt** (`gltfpack -cc`) — supported out of the box.
- **Textures → KTX2 / Basis** (`gltf-transform etc1s` or `uastc`), wired for
  the **architecture** category. Transcoder is loaded from `/basis/` — copy
  `node_modules/three/examples/jsm/libs/basis/` into `public/basis/`.

A good one-shot pipeline:

```bash
gltf-transform optimize in.glb out.glb \
  --compress draco --texture-compress ktx2 --texture-size 2048
```

---

## Performance notes

- Assets load **only** on capable desktop devices, in-view, with motion
  allowed — mobile / low-end / reduced-motion get the calm static stage.
- `three` and every model stay in a **lazy chunk** — zero impact on page
  bundles until a hero actually mounts.
- Frustum culling is on; the render loop pauses when the tab is hidden.
