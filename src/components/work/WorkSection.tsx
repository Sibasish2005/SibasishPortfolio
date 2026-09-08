'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink } from 'lucide-react';

interface Project {
  id: string;
  title: string;
  category: string;
  year: string;
  client: string;
  liveUrl: string;
  deviceType: 'monitor' | 'laptop';
  image: string;
  summary: string;
  tags: string[];
  metrics: string[];
  gradient: string;
}

const PROJECTS: Project[] = [
  {
    id: '01',
    title: 'Chartes.tech',
    category: 'Multi-Tenant Social Media Automation & Scheduling Platform',
    year: '2025/2026',
    client: 'Chartes Enterprise Automation',
    liveUrl: 'https://chartes.tech',
    deviceType: 'monitor',
    image: '/chartes.webp',
    summary:
      'High-throughput social media automation and multi-platform campaign scheduling engine. Engineered with robust multi-tenant architecture, distributed job queues, OAuth token refresh cycles, and automated cross-network broadcasting.',
    tags: ['Next.js 16', 'TypeScript', 'Multi-Tenant', 'Redis Queues', 'Social APIs', 'FastAPI'],
    metrics: ['Multi-Platform Dispatch', 'Automated Campaign Queue', 'Multi-Tenant Auth'],
    gradient: 'from-amber-600/20 via-neutral-900 to-black',
  },
  {
    id: '02',
    title: 'DigiPanch',
    category: 'AI-Powered Smart Panchayat System',
    year: '2025/2026',
    client: 'Rural Governance & Civic Tech',
    liveUrl: 'https://www.digipanch.live',
    deviceType: 'laptop',
    image: '/digipanch.webp',
    summary:
      'AI-powered e-governance platform revolutionizing rural administration. Features dedicated portals for Citizens and Officers, pgvector semantic search powered by Google Gemini, ImageKit document verification, and Razorpay fee collections.',
    tags: ['Next.js 16', 'FastAPI', 'PostgreSQL', 'pgvector', 'Google Gemini', 'Clerk Auth'],
    metrics: ['AI Citizen RAG', '100% Digital Audit', 'FastAPI + pgvector'],
    gradient: 'from-[#FF5500]/20 via-neutral-900 to-black',
  },
  {
    id: '03',
    title: 'Poyodhara',
    category: 'Premium Product Showcase Storefront',
    year: '2025',
    client: 'Poyodhara Bottled Beverages',
    liveUrl: 'https://poyodhara.vercel.app/',
    deviceType: 'monitor',
    image: '/poyodhara.webp',
    summary:
      'Experiential, visual-first digital storefront highlighting brand purity, multi-stage water filtration processes, and eco-friendly packaging with high-performance GSAP scroll pinning and distributor inquiry flows.',
    tags: ['Next.js', 'React', 'Tailwind CSS', 'GSAP', 'ScrollTrigger'],
    metrics: ['Scroll Driven', 'GSAP Pinned Reel', 'Wholesale Funnel'],
    gradient: 'from-cyan-600/20 via-neutral-900 to-black',
  },
 
];

export default function WorkSection() {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);

    const container = containerRef.current;
    if (!container) return;

    const cards = container.querySelectorAll('.work-card');

    cards.forEach((card) => {
      const screen = card.querySelector('.screen-parallax');
      if (screen) {
        gsap.fromTo(
          screen,
          { yPercent: -6 },
          {
            yPercent: 6,
            ease: 'none',
            scrollTrigger: {
              trigger: card,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.2,
            },
          }
        );
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => {
        if (st.vars.trigger && container.contains(st.vars.trigger as Node)) {
          st.kill();
        }
      });
    };
  }, []);

  return (
    <section
      id="work"
      ref={containerRef}
      className="relative w-full bg-[#FFFFFF] text-[#0D0D0D] py-16 sm:py-24 px-4 sm:px-8 md:px-14 border-t border-black/10 select-none"
    >
      {/* Crawlable Semantic SEO & AEO Layer */}
      <div className="sr-only">
        <h2>Web Development &amp; Custom Software Projects by Sibasish Chakraborti — Best Web Developer &amp; UI Engineer in Agartala, Tripura</h2>
        <p>
          Explore featured production systems engineered by Sibasish Chakraborti (+91 9863379440), the best budget software developer, UI engineer, and web publisher in Agartala, Tripura.
          Delivering custom build softwares, scalable web applications, e-commerce storefronts, and AI integrations using Next.js 16, React 19, TypeScript, FastAPI, Python, PostgreSQL, and AWS.
        </p>
        <div>
          <h3>Chartes.tech — Multi-Tenant Social Media Automation &amp; Campaign Orchestration</h3>
          <p>Multi-platform scheduling engine with distributed Redis queues, OAuth token refresh cycles, and automated cross-network broadcasting. Built with Next.js 16, TypeScript, Redis, and FastAPI.</p>
          
          <h3>DIGIPANCH — AI-Powered Smart Rural Administration &amp; E-Governance</h3>
          <p>Civic administration platform with dedicated citizen/officer portals, Google Gemini pgvector semantic search RAG, ImageKit document verification, and Razorpay fee processing. Built for rural governance in Tripura.</p>
          
          <h3>POYODHARA — Premium Product Showcase Storefront</h3>
          <p>Experiential digital storefront for bottled beverage brands featuring GSAP pinned reel scroll animations and wholesale B2B distributor inquiry funnels.</p>
          
          <h3>HEEYAKU — EdTech Operating System &amp; Academy Management Platform</h3>
          <p>All-in-one customized OS for educational coaching institutes with unified lead conversion CRM, DRM-protected video streaming LMS, and automated WhatsApp communication.</p>
        </div>
      </div>

      {/* Reticles */}
      <span className="absolute top-4 sm:top-6 left-4 sm:left-6 text-xs font-mono text-neutral-400">+</span>
      <span className="absolute top-4 sm:top-6 right-4 sm:right-6 text-xs font-mono text-neutral-400">+</span>

      {/* Section Header */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between pb-8 sm:pb-12 border-b-2 border-black gap-4 sm:gap-6">
        <div>
          <span className="text-[11px] sm:text-xs font-mono font-bold text-[#FF5500] tracking-widest uppercase">
            [ 03 // SELECTED COMMISSIONS &amp; ARCHITECTURE ]
          </span>
          <h2 className="text-3xl sm:text-5xl md:text-7xl font-black uppercase tracking-tight text-[#0D0D0D] mt-1 sm:mt-2 font-['Syne',sans-serif]">
            FEATURED WORK
          </h2>
        </div>
        <div className="text-left md:text-right flex flex-col items-start md:items-end gap-1 text-[11px] sm:text-xs font-mono uppercase text-neutral-500">
          <span>FULL STACK &bull; AI INTEGRATIONS &bull; UI/UX</span>
          <span>SHIPPED PRODUCTION WORK // 2024 &rarr; 2026</span>
        </div>
      </div>

      {/* Work Cards Grid */}
      <div className="max-w-7xl mx-auto mt-12 sm:mt-16 space-y-20 sm:space-y-28 md:space-y-36">
        {PROJECTS.map((proj, idx) => {
          const isEven = idx % 2 === 0;

          return (
            <div
              key={proj.id}
              className="work-card grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 md:gap-16 items-center"
            >
              {/* Device Frame Display with Real Project Screenshot */}
              <div
                className={`lg:col-span-7 relative order-1 ${
                  isEven ? 'lg:order-1' : 'lg:order-2'
                }`}
              >
                <div className="relative w-full aspect-[16/10] max-w-2xl mx-auto flex items-center justify-center group overflow-hidden">
                  {/* Outer Hardware SVG Mockup Frame */}
                  <Image
                    src={proj.deviceType === 'monitor' ? '/mockups/monitor.svg' : '/mockups/laptop.svg'}
                    alt={`${proj.title} Device Mockup`}
                    width={672}
                    height={420}
                    loading="lazy"
                    className="relative z-20 w-full h-full object-contain pointer-events-none drop-shadow-xl"
                  />

                  {/* Inner Screen Viewport with Real Project Screenshot */}
                  <div
                    className={`absolute z-10 overflow-hidden bg-[#0A0A0A] rounded-xs flex items-center justify-center ${
                      proj.deviceType === 'monitor'
                        ? 'top-[5.6%] left-[5.6%] w-[88.8%] h-[74.4%]'
                        : 'top-[6.45%] left-[10.6%] w-[78.8%] h-[77.1%]'
                    }`}
                  >
                    {/* Micro Browser Window Topbar */}
                    <div className="absolute top-0 left-0 right-0 z-20 h-4 sm:h-5 bg-neutral-900/90 backdrop-blur-xs border-b border-white/10 px-2 sm:px-3 flex items-center justify-between text-[7px] sm:text-[9px] font-mono text-neutral-400 select-none">
                      <div className="flex items-center gap-1 sm:gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#FF5F56]" />
                        <span className="w-1.5 h-1.5 rounded-full bg-[#FFBD2E]" />
                        <span className="w-1.5 h-1.5 rounded-full bg-[#27C93F]" />
                        <span className="ml-1 text-white/90 font-semibold hidden xs:inline">{proj.title}</span>
                      </div>
                      <div className="bg-black/60 px-2 py-0.5 rounded text-[7px] sm:text-[8px] text-neutral-300 font-mono truncate max-w-[150px] sm:max-w-[200px]">
                        {proj.liveUrl.replace(/^https?:\/\//, '')}
                      </div>
                      <span className="text-[7px] sm:text-[8px] text-[#27C93F] font-semibold">LIVE 200 OK</span>
                    </div>

                    {/* Real Screenshot with Parallax & Hover Effect */}
                    <div className="screen-parallax relative w-full h-[115%] -top-[6%] overflow-hidden">
                      <Image
                        src={proj.image}
                        alt={`${proj.title} Platform Screenshot`}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 650px"
                        quality={85}
                        loading="lazy"
                        className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Editorial Project Info */}
              <div
                className={`lg:col-span-5 flex flex-col justify-center order-2 ${
                  isEven ? 'lg:order-2' : 'lg:order-1'
                }`}
              >
                <div className="flex items-center gap-3 text-xs font-mono font-bold text-[#FF5500] uppercase mb-1 sm:mb-2">
                  <span>[{proj.id}]</span>
                  <span>{'//'}</span>
                  <span>{proj.year}</span>
                </div>

                <h3 className="text-2xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-[#0D0D0D] font-['Syne',sans-serif]">
                  {proj.title}
                </h3>

                <span className="text-[11px] sm:text-xs font-mono uppercase text-neutral-500 mt-1 tracking-wider">
                  DOMAIN / CLIENT: {proj.client}
                </span>

                <p className="text-xs sm:text-sm md:text-base font-sans text-neutral-700 mt-3 sm:mt-4 leading-relaxed">
                  {proj.summary}
                </p>

                {/* Tech Badges */}
                <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-4 sm:mt-6">
                  {proj.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] sm:text-[11px] font-mono uppercase px-2 sm:px-2.5 py-0.5 sm:py-1 bg-[#F4F4F2] border border-black/10 rounded-xs text-[#0D0D0D]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Action CTA Link */}
                <div className="mt-6 sm:mt-8 pt-3 sm:pt-4 border-t border-black/10">
                  <a
                    href={proj.liveUrl}
                    target={proj.liveUrl.startsWith('http') ? '_blank' : undefined}
                    rel={proj.liveUrl.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="inline-flex items-center gap-2 text-xs font-mono uppercase font-bold text-[#0D0D0D] hover:text-[#FF5500] transition-colors group/link cursor-pointer"
                  >
                    <span>
                      {proj.liveUrl.startsWith('http') ? 'LAUNCH LIVE PLATFORM' : 'VIEW PROJECT ARCHITECTURE'}
                    </span>
                    <ExternalLink className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
