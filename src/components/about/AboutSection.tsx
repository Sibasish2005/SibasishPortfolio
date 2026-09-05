'use client';

import React, { useState } from 'react';
import PixelGridTransition from '@/src/components/transitions/PixelGridTransition';
import { Plus, Minus } from 'lucide-react';

interface Discipline {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
}

const DISCIPLINES: Discipline[] = [
  {
    id: '01',
    title: 'Full-Stack Web Apps',
    subtitle: 'Next.js 16, React 19, FastAPI & Scalable Cloud APIs',
    description:
      'Architecting resilient full-stack systems with Next.js App Router, Python FastAPI microservices, Supabase PostgreSQL, and SQLModel. From civic platforms like DigiPanch to scalable enterprise automation (Chartes.tech) and EdTech operating systems (Heeyaku).',
    tags: ['Next.js 16', 'React 19', 'FastAPI', 'PostgreSQL', 'Supabase'],
  },
  {
    id: '02',
    title: 'UI/UX & Motion Engineering',
    subtitle: 'GSAP 3.15, Tailwind v4 & Kinetic Interaction Systems',
    description:
      'Translating brand vision into mathematically rigorous, tactile web interfaces. Utilizing GSAP timelines, ScrollTrigger pinning, Lenis inertial smoothing, and custom WebGL shaders maintaining 60fps.',
    tags: ['GSAP 3.15', 'Tailwind CSS v4', 'Three.js', 'Lenis', 'Design Systems'],
  },
  {
    id: '03',
    title: 'AI Systems & RAG Pipelines',
    subtitle: 'LLM Orchestration, Vector Search & pgvector Embeddings',
    description:
      'Integrating LLMs (Google Gemini API, Groq SDK) with vector databases (pgvector) to build conversational citizen assistants and semantic retrieval workflows for modern web products.',
    tags: ['Google Gemini', 'pgvector', 'RAG', 'Groq SDK', 'Semantic Search'],
  },
  {
    id: '04',
    title: 'Enterprise Cloud & Healthcare',
    subtitle: 'AWS Amplify Gen 2, TanStack Data Grids & Clinical Logic',
    description:
      'Engineering mission-critical healthcare logistics (Neural Infirmary at DAS Solutions) with AWS Amplify Gen 2, TanStack Table virtualization, and modular custom React hook architectures.',
    tags: ['AWS Amplify', 'TanStack Table', 'Custom Hooks', 'TypeScript', 'Healthcare Tech'],
  },
  {
    id: '05',
    title: 'Budget Software & E-Commerce',
    subtitle: 'Accessible High-Performance Platforms for Growing Brands',
    description:
      'Best budget software developer in Agartala, Tripura. Building custom business software, e-commerce storefronts (Poyodhara), and Razorpay payment flows that maximize ROI without sacrificing quality.',
    tags: ['E-Commerce', 'Razorpay', 'ImageKit CDN', 'Budget Software', 'Agartala Tech'],
  },
];

export default function AboutSection() {
  const [activeAccordion, setActiveAccordion] = useState<string | null>(null);

  const toggleAccordion = (id: string) => {
    setActiveAccordion(activeAccordion === id ? null : id);
  };

  return (
    <section id="about" className="relative w-full bg-[#F4F4F2] text-[#0D0D0D] overflow-hidden border-t border-b border-black/10">
      {/* 1. Stepped Pixel Curtain Reveal Transition */}
      <div className="w-full h-24 md:h-32 -mt-12 md:-mt-16 z-20 relative">
        <PixelGridTransition mode="reveal" className="h-full" />
      </div>

      {/* 2. Embedded Video Container (Monochrome loop with film grain) */}
      <div className="relative w-full px-4 sm:px-6 md:px-14 pt-6 sm:pt-8 pb-12 sm:pb-16 max-w-7xl mx-auto">
        <div className="relative w-full h-[300px] sm:h-[380px] md:h-[480px] rounded-xs overflow-hidden border border-black/15 shadow-sm bg-neutral-900 group">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover grayscale contrast-125 brightness-90 transition-transform duration-1000 group-hover:scale-105"
          >
            <source src="/video/about.mp4" type="video/mp4" />
          </video>

          {/* Film Grain Texture Overlay */}
          <div
            className="absolute inset-0 opacity-20 pointer-events-none mix-blend-overlay"
            style={{
              backgroundImage: 'url(/textures/noise.png)',
              backgroundRepeat: 'repeat',
            }}
          />

          {/* Video Metadata Badges */}
          <div className="absolute top-3 sm:top-4 left-3 sm:left-4 z-10 flex items-center gap-1.5 sm:gap-2 bg-black/60 backdrop-blur-md px-2.5 sm:px-3 py-1 rounded-full text-[10px] sm:text-[11px] font-mono text-white/90">
            <span className="w-2 h-2 rounded-full bg-[#FF5500] animate-ping" />
            <span>ENGINEERING LAB // AGARTALA WORKSPACE</span>
          </div>

          <div className="hidden sm:block absolute bottom-4 right-4 z-10 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-mono text-white/80">
            <span>FPS: 60 // NEXT.JS 16 &bull; FASTAPI</span>
          </div>

          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/30 pointer-events-none" />

          {/* Bold Statement Overlay */}
          <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 md:left-10 z-10 max-w-xl">
            <span className="text-[10px] sm:text-[11px] font-mono tracking-widest text-[#FF5500] uppercase font-semibold">
              {'// STUDIO PHILOSOPHY'}
            </span>
            <h2 className="text-xl sm:text-3xl md:text-5xl font-black uppercase tracking-tight text-white mt-0.5 sm:mt-1">
              OBSESSIVE CRAFT.
              <br />
              RELENTLESS MOMENTUM.
            </h2>
          </div>
        </div>

        {/* Reticles */}
        <span className="absolute -top-3 left-4 sm:left-6 text-xs font-mono text-neutral-400">+</span>
        <span className="absolute -top-3 right-4 sm:right-6 text-xs font-mono text-neutral-400">+</span>

        {/* 3. Editorial Overview & Manifesto */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 mt-12 sm:mt-16 pt-8 sm:pt-12 border-t border-black/10">
          <div className="lg:col-span-4 flex flex-col gap-3 sm:gap-4">
            <span className="text-[10px] sm:text-[11px] font-mono tracking-widest text-[#FF5500] uppercase font-bold">
              [ 02 // ABOUT SIBASISH ]
            </span>
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold uppercase tracking-tight text-[#0D0D0D]">
              Sibasish Chakraborti
            </h3>
            <p className="text-xs sm:text-sm font-mono uppercase text-neutral-500 leading-relaxed">
              FULL STACK DEVELOPER, UI ENGINEER &amp; BEST BUDGET SOFTWARE DEVELOPER BASED IN AGARTALA, TRIPURA, INDIA.
            </p>
            <div className="mt-3 sm:mt-4 p-3 sm:p-4 border border-black/10 bg-white/70 rounded-xs text-[11px] sm:text-xs font-mono text-neutral-600 space-y-1.5">
              <div><span className="text-[#0D0D0D] font-bold">LOCATION:</span> AGARTALA, TRIPURA (PIN: 799001)</div>
              <div><span className="text-[#0D0D0D] font-bold">EDUCATION:</span> BCA (2023–2026) // NIELIT AGARTALA</div>
              <div><span className="text-[#0D0D0D] font-bold">INDUSTRY:</span> FRONTEND INTERN @ DAS SOLUTIONS</div>
              <div><span className="text-[#0D0D0D] font-bold">RECOGNITION:</span> TOP FREELANCER IN TRIPURA &amp; AGARTALA</div>
            </div>
          </div>

          <div className="lg:col-span-8 flex flex-col justify-between">
            <p className="text-base sm:text-xl md:text-2xl font-medium tracking-tight text-neutral-900 leading-relaxed sm:leading-snug">
              On a mission to be the best budget software developer, web designer, and UI engineer in Agartala, Tripura. I build scalable digital products that solve meaningful real-world problems—blending modern Next.js and FastAPI architectures with cinematic motion, AI capabilities, and accessible engineering.
            </p>
            <div className="mt-6 sm:mt-8 flex flex-wrap items-center gap-2 sm:gap-3 text-[11px] sm:text-xs font-mono uppercase tracking-wider text-neutral-600">
              <span className="px-2.5 sm:px-3 py-1 bg-white border border-black/10 rounded-full">Next.js 16 + React 19</span>
              <span className="px-2.5 sm:px-3 py-1 bg-white border border-black/10 rounded-full">FastAPI + PostgreSQL</span>
              <span className="px-2.5 sm:px-3 py-1 bg-white border border-black/10 rounded-full">AI &amp; RAG / pgvector</span>
              <span className="px-2.5 sm:px-3 py-1 bg-white border border-black/10 rounded-full">AWS Amplify Gen 2</span>
              <span className="px-2.5 sm:px-3 py-1 bg-white border border-black/10 rounded-full">GSAP + Three.js Motion</span>
            </div>
          </div>
        </div>

        {/* 4. Full-Width Accordion Disciplines List with Mouse Hover Invert */}
        <div className="mt-14 sm:mt-20">
          <div className="flex items-center justify-between pb-3 sm:pb-4 border-b-2 border-black gap-2">
            <span className="text-[11px] sm:text-xs font-mono uppercase tracking-widest text-[#0D0D0D] font-bold">
              DISCIPLINE CAPABILITIES [05]
            </span>
            <span className="text-[10px] sm:text-xs font-mono text-neutral-500 uppercase tracking-widest text-right">
              <span className="hidden sm:inline">HOVER TO INVERT // </span>CLICK TO EXPAND
            </span>
          </div>

          <div className="divide-y divide-black/10 border-b border-black/10">
            {DISCIPLINES.map((item) => {
              const isOpen = activeAccordion === item.id;

              return (
                <div
                  key={item.id}
                  onClick={() => toggleAccordion(item.id)}
                  className="group relative overflow-hidden transition-colors duration-300 cursor-pointer select-none"
                >
                  {/* Sliding Black Highlight Bar on Hover with cubic-bezier transition */}
                  <div
                    className="absolute inset-0 bg-[#0D0D0D] -translate-x-full group-hover:translate-x-0 transition-transform duration-500 pointer-events-none"
                    style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
                  />

                  {/* Accordion Row Header */}
                  <div className="relative z-10 flex items-center justify-between py-6 px-4 md:px-6 transition-colors duration-300">
                    <div className="flex items-baseline gap-6 md:gap-12">
                      <span className="text-xs md:text-sm font-mono text-neutral-400 group-hover:text-[#FF5500] transition-colors">
                        [{item.id}]
                      </span>
                      <h4 className="text-2xl sm:text-3xl md:text-4xl font-extrabold uppercase tracking-tight text-[#0D0D0D] group-hover:text-white transition-colors duration-300">
                        {item.title}
                      </h4>
                    </div>

                    <div className="flex items-center gap-6">
                      <span className="hidden md:inline text-xs font-mono uppercase text-neutral-500 group-hover:text-neutral-300 transition-colors">
                        {item.subtitle}
                      </span>
                      <div className="w-8 h-8 rounded-full border border-black/20 group-hover:border-white/30 flex items-center justify-center text-[#0D0D0D] group-hover:text-white transition-all">
                        {isOpen ? <Minus className="w-4 h-4 text-[#FF5500]" /> : <Plus className="w-4 h-4" />}
                      </div>
                    </div>
                  </div>

                  {/* Accordion Expandable Content */}
                  {isOpen && (
                    <div className="relative z-10 px-6 md:px-16 pb-8 pt-2 transition-all bg-[#0D0D0D] text-white">
                      <p className="text-sm md:text-base font-sans text-neutral-300 max-w-3xl leading-relaxed">
                        {item.description}
                      </p>
                      <div className="flex flex-wrap gap-2 mt-4">
                        {item.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-[11px] font-mono uppercase px-2.5 py-1 bg-neutral-800 text-[#FF5500] rounded-xs border border-neutral-700"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
