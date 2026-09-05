# AGENT SKILLS & RUNTIME CONSTRAINTS

## 1. WebGL & Three.js Performance Protocol
- Single Animation Loop: Never instantiate multiple `requestAnimationFrame` calls. All canvas components must register their draw calls to a centralized ticker or the main GSAP ticker.
- Memory & GPU Cleanup: Every Three.js scene must properly dispose of geometries, materials, and textures on React unmount:
  `geometry.dispose()`, `material.dispose()`, `renderer.dispose()`.
- No Garbage Collection Spikes: Never allocate `new THREE.Vector3()` or `new THREE.Matrix4()` inside the render tick. Use reusable scratchpad objects outside the animation loop.
- Device Pixel Ratio: Always cap `renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))` to prevent mobile GPU throttling.

## 2. GSAP & Lenis Synchronization Rules
- Never use native CSS `scroll-behavior: smooth` alongside Lenis.
- Always tie `lenis.on('scroll', ScrollTrigger.update)` immediately upon instantiation.
- When creating horizontal pinned sections, calculate `end` dynamically using a functional return:
  `end: () => "+=" + container.scrollWidth`.
- Kill all `ScrollTrigger.getAll().forEach(t => t.kill())` when components unmount or route changes occur.

## 3. Fallback Strategies
- WebGPU / WebGL Fallback: If WebGPU initialization fails or is unsupported on the target device, gracefully fallback to `THREE.WebGLRenderer`.
- Reduced Motion: Respect `prefers-reduced-motion: reduce`. If active, disable continuous audio distortion, clamp blob morphs directly to static forms, and remove camera shake.
