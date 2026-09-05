'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowDown, Volume2, VolumeX } from 'lucide-react';
import { useAudioContext } from '@/src/components/providers/AudioProvider';

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);
  const { isPlaying, toggleAudio, bands } = useAudioContext();

  // 2. ScrollTrigger smooth parallax
  useEffect(() => {
    if (typeof window === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    if (!section) return;

    const trigger = ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: 'bottom top',
      scrub: true,
      onUpdate: (self) => {
        if (textRef.current) {
          gsap.set(textRef.current, {
            y: self.progress * 110,
            opacity: Math.max(0, 1 - self.progress * 1.5),
          });
        }
        if (portraitRef.current) {
          gsap.set(portraitRef.current, {
            y: self.progress * 50,
            scale: 1 + self.progress * 0.06,
          });
        }
      },
    });

    return () => {
      trigger.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="hero-summary"
      className="relative w-full min-h-screen bg-[#FFFFFF] overflow-hidden select-none flex flex-col justify-between"
    >
      {/* Crawlable Semantic SEO & AEO Layer */}
      <div className="sr-only">
        <h1 id="hero-summary">
          Sibasish Chakraborti — Best Budget Software Developer, UI Engineering &amp; Web Publisher in Agartala, Tripura
        </h1>
        <p>
          Welcome to the official portfolio of Sibasish Chakraborti (+91 9863379440), the best budget developer, software developer, UI engineer, and web publisher in Agartala, Tripura. Offering the cheapest and best digital services, custom build softwares, modern UI engineering, and scalable web applications using Next.js 16, React 19, TypeScript, FastAPI, Python, and AWS.
        </p>
        <p>
          Looking for affordable software development or the best budget developer in Agartala, Tripura? Sibasish Chakraborti delivers professional UI engineering, web publishing, e-commerce storefronts, and cloud deployment for businesses, startups, and institutions across Agartala, Tripura, Northeast India, and globally. Direct Phone / WhatsApp: +91 9863379440 | Email: sibasishchakraborti@gmail.com.
        </p>
      </div>

      {/* Reticle / Plus Crosshairs (+) at viewport corners per design.md */}
      <span className="absolute top-4 sm:top-6 left-4 sm:left-6 text-xs font-mono text-neutral-400 z-30 pointer-events-none">+</span>
      <span className="absolute top-4 sm:top-6 right-4 sm:right-6 text-xs font-mono text-neutral-400 z-30 pointer-events-none">+</span>
      <span className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 text-xs font-mono text-neutral-400 z-30 pointer-events-none">+</span>
      <span className="absolute bottom-4 sm:bottom-6 right-4 sm:right-6 text-xs font-mono text-neutral-400 z-30 pointer-events-none">+</span>

      {/* Floating Technical Telemetry Overlays */}
      <div className="absolute top-16 sm:top-24 left-4 sm:left-14 z-30 pointer-events-none flex flex-col gap-0.5 sm:gap-1 text-[10px] sm:text-[11px] font-mono tracking-wider text-neutral-600 uppercase bg-white/80 backdrop-blur-md px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xs border border-black/10 shadow-2xs">
        <span className="flex items-center gap-1.5 sm:gap-2 font-semibold text-[#0D0D0D]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#FF5500] animate-pulse" />
          LIVE EXPERIMENTAL RUNTIME
        </span>
        <span className="hidden sm:inline">LAT: 23.8315° N // LON: 91.2868° E</span>
        <span className="hidden sm:inline">ELEV: 15M // AGARTALA, TRIPURA</span>
      </div>

      {/* Desktop Audio Visualizer Badge (HeaderNav already provides mobile audio toggle) */}
      <div className="hidden sm:flex absolute top-20 sm:top-24 right-6 sm:right-14 z-30 flex-col items-end gap-2 text-[11px] font-mono tracking-wider text-neutral-500 uppercase">
        <button
          onClick={toggleAudio}
          className="pointer-events-auto flex items-center gap-2.5 px-3.5 py-1.5 border border-black/10 hover:border-black/30 bg-white/80 backdrop-blur-md rounded-full transition-colors cursor-pointer shadow-xs"
        >
          {isPlaying ? (
            <Volume2 className="w-3.5 h-3.5 text-[#FF5500] animate-pulse" />
          ) : (
            <VolumeX className="w-3.5 h-3.5 text-neutral-400" />
          )}
          <span className="text-[11px] font-medium text-black">
            AUDIO REACTIVE: {isPlaying ? 'ON' : 'OFF'}
          </span>
          {/* Live Audio Equalizer Bars */}
          <div className="flex items-end gap-0.5 h-3 w-4">
            <span
              className="w-0.5 bg-[#FF5500] transition-all duration-75"
              style={{ height: `${Math.max(15, (bands.low || 0) * 100)}%` }}
            />
            <span
              className="w-0.5 bg-[#FF5500] transition-all duration-75"
              style={{ height: `${Math.max(25, (bands.mid || 0) * 100)}%` }}
            />
            <span
              className="w-0.5 bg-[#FF5500] transition-all duration-75"
              style={{ height: `${Math.max(10, (bands.high || 0) * 100)}%` }}
            />
          </div>
        </button>
        <span className="text-[10px] text-neutral-400">CLICK TO TRANSMIT AUDIO</span>
      </div>

      {/* Background ASCII Full Hero Cover Layer */}
      <div
        ref={portraitRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden"
      >
        {/* Audio Reactive Ambient Backlight Glow */}
        <div
          className="absolute left-[15%] top-1/2 -translate-y-1/2 w-[350px] sm:w-[550px] h-[350px] sm:h-[550px] rounded-full bg-gradient-to-tr from-[#FF5500]/25 via-transparent to-[#FF5500]/15 blur-3xl transition-opacity duration-200 pointer-events-none"
          style={{
            opacity: isPlaying ? Math.max(0.35, (bands.low || 0) * 1.5) : 0.15,
          }}
        />

        {/* High-Resolution Orange ASCII Portrait Artwork covering entire background */}
        <div className="relative w-full h-full">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/sibasishAscii.webp"
            alt="Sibasish Chakraborti - Full Stack Developer ASCII Portrait Background"
            className="w-full h-full object-cover object-left md:object-[left_center] mix-blend-multiply"
          />
        </div>
      </div>

      {/* Main Centerpiece Composition */}
      <div
        ref={textRef}
        className="relative z-10 w-full flex-1 flex flex-col justify-center px-4 sm:px-12 lg:px-16 pt-24 sm:pt-20 pb-4 max-w-7xl mx-auto items-end"
      >
        <div className="relative flex flex-col items-start justify-center w-full max-w-2xl lg:max-w-xl xl:max-w-2xl bg-white/80 sm:bg-transparent backdrop-blur-xs sm:backdrop-blur-none p-5 sm:p-0 rounded-xl sm:rounded-none border border-black/10 sm:border-0 shadow-sm sm:shadow-none">
          {/* Eyebrow Dossier Badge */}
          <div className="flex items-center gap-2 mb-2 sm:mb-3">
            <span className="w-2 h-2 rounded-full bg-[#FF5500] animate-pulse" />
            <span className="text-[10px] sm:text-[11px] font-mono tracking-[0.2em] sm:tracking-[0.25em] text-[#FF5500] uppercase font-bold">
              [ SIBASISH CHAKRABORTI // FOLIO 2026 ]
            </span>
          </div>

          {/* Top Line: SIBASISH */}
          <div className="select-none pointer-events-none">
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[4.8rem] xl:text-[5.6rem] font-black tracking-tighter leading-[0.9] text-[#0D0D0D] uppercase font-['Syne',sans-serif]">
              SIBASISH
            </h1>
          </div>

          {/* Bottom Line: CHAKRABORTI */}
          <div className="select-none pointer-events-none -mt-1 sm:-mt-2 md:-mt-3">
            <h2
              className="text-2xl sm:text-4xl md:text-5xl lg:text-[3.4rem] xl:text-[4rem] font-black tracking-tighter leading-[0.9] uppercase font-['Syne',sans-serif] text-transparent"
              style={{ WebkitTextStroke: '1.5px #0D0D0D' }}
            >
              CHAKRABORTI
            </h2>
          </div>

          {/* Core Technical Role & Descriptor */}
          <p className="mt-3 sm:mt-5 max-w-lg text-left text-xs sm:text-sm font-mono tracking-wider text-neutral-700 uppercase font-medium leading-relaxed">
            FULL STACK DEVELOPER &amp; UI ENGINEER CRAFTING SCALABLE WEB APPS, AI-INTEGRATED PLATFORMS &amp; SYSTEMIC MOTION
          </p>

          {/* Technical Telemetry Badges / Specs */}
          <div className="mt-4 sm:mt-6 flex flex-wrap items-center gap-1.5 sm:gap-2 font-mono text-[9px] sm:text-[11px] text-neutral-600 uppercase">
            <span className="px-2 sm:px-2.5 py-0.5 sm:py-1 border border-black/10 bg-white/70 backdrop-blur-xs rounded-sm">
              [ NEXT.JS / REACT ]
            </span>
            <span className="px-2 sm:px-2.5 py-0.5 sm:py-1 border border-black/10 bg-white/70 backdrop-blur-xs rounded-sm">
              [ THREE.JS / WEBGL ]
            </span>
            <span className="px-2 sm:px-2.5 py-0.5 sm:py-1 border border-black/10 bg-white/70 backdrop-blur-xs rounded-sm">
              [ GSAP MOTION ]
            </span>
            <span className="px-2 sm:px-2.5 py-0.5 sm:py-1 border border-[#FF5500]/30 bg-[#FF5500]/5 text-[#FF5500] rounded-sm font-semibold">
              [ SYSTEM ACTIVE ]
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Telemetry & Scroll Indicator */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-14 pb-4 sm:pb-6 flex items-center justify-between text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-neutral-600 border-t border-black/10 pt-3 sm:pt-4 bg-white/70 backdrop-blur-xs">
        <div className="flex items-center gap-4 sm:gap-6">
          <span>INDEX: [01/04]</span>
          <span className="hidden sm:inline">SUBJECT: SIBASISH CHAKRABORTI</span>
        </div>

        <div className="flex items-center gap-1.5 sm:gap-2 text-[#0D0D0D] font-semibold animate-bounce">
          <span>SCROLL TO EXPLORE</span>
          <ArrowDown className="w-3.5 h-3.5 text-[#FF5500]" />
        </div>

        <div className="text-right">
          <span className="hidden sm:inline">STYLE: ASCII MATRIX</span>
        </div>
      </div>
    </section>
  );
}
