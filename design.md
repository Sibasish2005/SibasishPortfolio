# DESIGN SYSTEM SPECIFICATION: RUN ROB RUN

## 1. Color Palette
- `color-primary`: `#FF5500` (International / Signal Orange)
- `color-bg`: `#FFFFFF` (Canvas Base)
- `color-surface`: `#F4F4F2` (Muted Off-White / Section backing)
- `color-text-main`: `#0D0D0D` (Rich Editorial Black)
- `color-text-muted`: `#737373` (Technical annotations & coordinates)
- `color-border`: `rgba(0, 0, 0, 0.08)` (Subtle section dividing lines & crosshairs)

## 2. Typography
- **Display Headings:** Ultra-bold, wide grotesque sans-serif (e.g., `Syne`, `Monument Extended`, or `Archivo Black`). High contrast, tight letter-spacing (`-0.03em`), uppercase.
- **Body & Editorial:** Refined modern sans-serif (`Inter` or `Plus Jakarta Sans`), weights 400 and 500.
- **Labels & System Meta:** Monospace (`Space Mono` or `JetBrains Mono`), uppercase, tracking `+0.05em`, font size `11px–12px`. Used for coordinates, times, and index indicators (e.g., `[01]`, `10:00 ENGLAND`, `SCROLL #`).

## 3. Visual Accents & Motif
- **Reticle / Plus Crosshairs (`+`):** Positioned at grid corners, intersections, and viewport boundaries (`text-xs text-neutral-400 font-mono`).
- **Stepped Pixel Grid:** 16-column grid system used for wipes, footers, and staircases. Aspect ratio strictly 1:1 for each block.
- **Chunky Borders:** 1px to 2px solid dividing lines separating header status bars and footer sections.

## 4. 3D Shader & Physics Parameters
- **Inner Core Material:**
  - Base Color: `#FF5500`
  - Roughness: `0.45`
  - Metalness: `0.1`
  - Displacement Amplitude: `0.35` (baseline) → `0.85` (peak audio hit)
- **Outer Shell Material:**
  - Transmission: `0.96`
  - Opacity: `1.0`
  - IOR: `1.34` (water/gelatin refraction)
  - Roughness: `0.06`
  - Thickness: `1.2`
- **Blob-to-Cube Lerp Equation:**
  - $ organicMix = 1.0 - \text{smoothstep}(0.55, 0.98, \text{scrollProgress}) $
  - $ cubeMix = \text{smoothstep}(0.68, 0.995, \text{scrollProgress}) $
  - $ P_{\text{cube}} = \frac{(x, y, z)}{\max(|x|, |y|, |z|)} \times R_{\text{cube}} $
  - $ P_{\text{final}} = \text{lerp}(P_{\text{blob}}, P_{\text{cube}}, cubeMix) $
