'use client';

import React, { createContext, useContext, useEffect, useRef, useMemo } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface LenisContextType {
  scrollTo: (target: string | number | HTMLElement, options?: Record<string, unknown>) => void;
  getLenis?: () => Lenis | null;
}

const LenisContext = createContext<LenisContextType>({
  scrollTo: () => {},
});

export const useLenis = () => useContext(LenisContext);

export default function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // 1. Initialize Lenis with inertia and smooth wheel handling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
    });
    lenisRef.current = lenis;

    // 2. Strict Rule from skills.md: Tie lenis.on('scroll', ScrollTrigger.update) immediately
    lenis.on('scroll', ScrollTrigger.update);

    // 3. Centralized GSAP Ticker: Drive Lenis RAF from GSAP ticker
    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tickerCallback);

    // 4. Set lag smoothing to 0 to prevent desync during rapid scrubbing
    gsap.ticker.lagSmoothing(0);

    return () => {
      // Memory & ticker cleanup
      gsap.ticker.remove(tickerCallback);
      lenis.destroy();
      lenisRef.current = null;
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  const value = useMemo(
    () => ({
      scrollTo: (target: string | number | HTMLElement, options?: Record<string, unknown>) => {
        lenisRef.current?.scrollTo(target, options);
      },
      getLenis: () => lenisRef.current,
    }),
    []
  );

  return (
    <LenisContext.Provider value={value}>
      {children}
    </LenisContext.Provider>
  );
}
