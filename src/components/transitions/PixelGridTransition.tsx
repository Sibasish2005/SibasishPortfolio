'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface PixelGridTransitionProps {
  mode?: 'reveal' | 'collapse';
  className?: string;
}

export default function PixelGridTransition({
  mode = 'reveal',
  className = '',
}: PixelGridTransitionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);

    const container = containerRef.current;
    const grid = gridRef.current;
    if (!container || !grid) return;

    const tiles = grid.querySelectorAll('.pixel-block');

    const ctx = gsap.context(() => {
      if (mode === 'reveal') {
        // Start full size and solid orange, then scale to 0 and fade out to reveal underneath
        gsap.set(tiles, { scale: 1, opacity: 1, transformOrigin: 'center center' });

        gsap.to(tiles, {
          scale: 0,
          opacity: 0,
          duration: 1,
          ease: 'steps(4)',
          stagger: {
            grid: [8, 16],
            from: 'center',
            amount: 0.65,
          },
          scrollTrigger: {
            trigger: container,
            start: 'top 85%',
            end: 'bottom 20%',
            scrub: 0.75,
          },
        });
      } else {
        // Collapse mode: start at scale 0, grow to scale 1 to build orange footer
        gsap.set(tiles, { scale: 0, opacity: 0, transformOrigin: 'center center' });

        gsap.to(tiles, {
          scale: 1,
          opacity: 1,
          duration: 1,
          ease: 'steps(4)',
          stagger: {
            grid: [8, 16],
            from: 'edges',
            amount: 0.65,
          },
          scrollTrigger: {
            trigger: container,
            start: 'top 90%',
            end: 'bottom 35%',
            scrub: 0.75,
          },
        });
      }
    }, container);

    return () => {
      ctx.revert();
    };
  }, [mode]);

  // Generate 16 cols x 8 rows = 128 blocks
  const rows = 8;
  const cols = 16;
  const totalBlocks = rows * cols;

  return (
    <div
      ref={containerRef}
      className={`relative w-full overflow-hidden pointer-events-none ${className}`}
      style={{
        contain: 'paint layout',
        contentVisibility: 'auto',
      }}
      aria-hidden="true"
    >
      <div
        ref={gridRef}
        className="w-full h-full grid grid-cols-16 grid-rows-8"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(16, minmax(0, 1fr))',
          gridTemplateRows: 'repeat(8, minmax(0, 1fr))',
        }}
      >
        {Array.from({ length: totalBlocks }).map((_, idx) => (
          <div
            key={idx}
            className="pixel-block w-full h-full bg-[#FF5500] aspect-square"
          />
        ))}
      </div>
    </div>
  );
}
