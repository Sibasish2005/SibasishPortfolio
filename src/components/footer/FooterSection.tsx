'use client';

import React, { useState, useEffect } from 'react';
import PixelGridTransition from '@/src/components/transitions/PixelGridTransition';
import { ArrowUp, Send, CheckCircle2 } from 'lucide-react';
import { useLenis } from '@/src/components/providers/SmoothScrollProvider';

export default function FooterSection() {
  const { scrollTo } = useLenis();
  const [lang, setLang] = useState<'EN' | 'JA' | 'DE'>('EN');
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [timeStr, setTimeStr] = useState('');

  useEffect(() => {
    // Dynamic Agartala (IST) Time
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      };
      setTimeStr(new Intl.DateTimeFormat('en-IN', options).format(now));
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.email) return;
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormState({ name: '', email: '', message: '' });
    }, 4500);
  };

  return (
    <footer id="contact" className="relative w-full bg-[#0D0D0D] text-white overflow-hidden select-none">
      {/* 1. Reverse Stepped Pixel Curtain Collapse Transition */}
      <div className="w-full h-24 md:h-32 relative z-20">
        <PixelGridTransition mode="collapse" className="h-full" />
      </div>

      {/* 2. Kinetic Statement Typography Marquee */}
      <div className="w-full overflow-hidden bg-[#FF5500] py-4 sm:py-6 md:py-8 border-t border-b-2 border-black flex select-none">
        <div className="flex whitespace-nowrap animate-marquee">
          {Array.from({ length: 4 }).map((_, i) => (
            <span
              key={i}
              className="text-3xl sm:text-6xl md:text-8xl font-black uppercase tracking-tight text-[#0D0D0D] mx-4 sm:mx-6 font-['Syne',sans-serif]"
            >
              SIBASISH CHAKRABORTI &bull; FULL STACK DEVELOPER &bull; UI ENGINEER &bull; AGARTALA, TRIPURA &bull;
            </span>
          ))}
        </div>
      </div>

      {/* 3. Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-14 py-12 sm:py-20 relative">
        {/* Reticles */}
        <span className="absolute top-6 sm:top-8 left-4 sm:left-6 text-xs font-mono text-neutral-600">+</span>
        <span className="absolute top-6 sm:top-8 right-4 sm:right-6 text-xs font-mono text-neutral-600">+</span>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-16">
          {/* Left Column: Manifesto & Contact Info */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            <div>
              <span className="text-[10px] sm:text-xs font-mono font-bold text-[#FF5500] uppercase tracking-widest">
                [ 04 // TRANSMIT DIRECTLY ]
              </span>
              <h3 className="text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight mt-2 sm:mt-3 font-['Syne',sans-serif]">
                LET&apos;S BUILD SCALABLE DIGITAL PRODUCTS.
              </h3>
              <p className="mt-4 sm:mt-6 text-xs sm:text-sm md:text-base font-sans text-neutral-400 max-w-md leading-relaxed">
                Available for full-stack web applications, AI-integrated platforms, custom software development, and modern UI/UX design. Delivering the best budget engineering in Agartala and globally.
              </p>
            </div>

            <div className="mt-8 sm:mt-10 space-y-3 font-mono text-xs text-neutral-400">
              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                <span className="text-[#FF5500]">DIRECT EMAIL:</span>
                <a
                  href="mailto:sibasishchakraborti@gmail.com"
                  className="text-white hover:text-[#FF5500] transition-colors underline underline-offset-4 font-semibold break-all"
                >
                  SIBASISHCHAKRABORTI@GMAIL.COM
                </a>
              </div>
              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                <span className="text-[#FF5500]">PHONE &bull; WHATSAPP:</span>
                <a
                  href="https://wa.me/9863379440"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-[#FF5500] transition-colors underline underline-offset-4 font-semibold"
                >
                  +91 9863379440
                </a>
              </div>
              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                <span className="text-[#FF5500]">TIMEZONE:</span>
                <span className="text-white font-bold">{timeStr || '15:30:00'} AGARTALA / INDIA (IST)</span>
              </div>
              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                <span className="text-[#FF5500]">COORDINATES:</span>
                <span className="text-white">23.8315° N, 91.2868° E</span>
              </div>
            </div>

            {/* Social Links Matrix */}
            <div className="mt-6 sm:mt-8 pt-5 sm:pt-6 border-t border-neutral-800 flex flex-wrap items-center gap-3 sm:gap-4 text-[11px] sm:text-xs font-mono">
              <a
                href="https://github.com/Sibasish2005"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-400 hover:text-white transition-colors"
              >
                GITHUB &rarr;
              </a>
              <a
                href="https://www.linkedin.com/in/sibasish-chakraborti-5b55b82b1/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-400 hover:text-white transition-colors"
              >
                LINKEDIN &rarr;
              </a>
              <a
                href="https://instagram.com/sibasish__chakraborti"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-400 hover:text-white transition-colors"
              >
                INSTAGRAM &rarr;
              </a>
              <a
                href="https://sibasishdev.in"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-400 hover:text-[#FF5500] transition-colors"
              >
                SIBASISHDEV.IN &rarr;
              </a>
              <a
                href="https://sibasishdev.in/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#FF5500] hover:text-white transition-colors font-bold"
              >
                RESUME.PDF &rarr;
              </a>
            </div>
          </div>

          {/* Right Column: Minimalist Interactive Contact Form */}
          <div className="lg:col-span-6 bg-neutral-900/90 border border-neutral-800 p-5 sm:p-8 md:p-10 rounded-xs shadow-2xl relative">
            <div className="flex items-center justify-between pb-3 sm:pb-4 border-b border-neutral-800">
              <span className="text-[11px] sm:text-xs font-mono uppercase tracking-widest text-[#FF5500] font-bold">
                COMMISSION INQUIRY TERMINAL
              </span>
              <span className="text-[9px] sm:text-[10px] font-mono text-neutral-500 uppercase">
                SECURE TRANSMISSION
              </span>
            </div>

            {isSubmitted ? (
              <div className="py-12 sm:py-16 flex flex-col items-center justify-center text-center space-y-4">
                <CheckCircle2 className="w-10 sm:w-12 h-10 sm:h-12 text-[#FF5500] animate-bounce" />
                <h4 className="text-xl sm:text-2xl font-black uppercase text-white font-['Syne',sans-serif]">
                  TRANSMISSION CONFIRMED
                </h4>
                <p className="text-xs font-mono text-neutral-400 max-w-xs">
                  Your message has been dispatched to Sibasish Chakraborti. Expect an answer within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-5 sm:mt-6 space-y-4 sm:space-y-6">
                <div>
                  <label className="block text-[10px] sm:text-[11px] font-mono text-neutral-400 uppercase tracking-wider mb-1.5 sm:mb-2">
                    01 // YOUR IDENTIFIER / NAME
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="E.G. SHUBHAM ROY"
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    className="w-full bg-black/60 border border-neutral-800 focus:border-[#FF5500] px-3.5 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm font-mono text-white placeholder-neutral-600 outline-none transition-colors rounded-xs"
                  />
                </div>

                <div>
                  <label className="block text-[10px] sm:text-[11px] font-mono text-neutral-400 uppercase tracking-wider mb-1.5 sm:mb-2">
                    02 // DISPATCH FREQUENCY / EMAIL
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="CLIENT@ORGANIZATION.COM"
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    className="w-full bg-black/60 border border-neutral-800 focus:border-[#FF5500] px-3.5 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm font-mono text-white placeholder-neutral-600 outline-none transition-colors rounded-xs"
                  />
                </div>

                <div>
                  <label className="block text-[10px] sm:text-[11px] font-mono text-neutral-400 uppercase tracking-wider mb-1.5 sm:mb-2">
                    03 // OBJECTIVE &amp; BRIEF SCOPE
                  </label>
                  <textarea
                    rows={3}
                    placeholder="OUTLINE PROJECT TIMELINE, SCOPE &amp; REQUIREMENTS..."
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    className="w-full bg-black/60 border border-neutral-800 focus:border-[#FF5500] px-3.5 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm font-mono text-white placeholder-neutral-600 outline-none transition-colors rounded-xs resize-none"
                  />
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    type="submit"
                    className="flex-1 py-3.5 sm:py-4 bg-[#FF5500] hover:bg-[#ff6a1a] text-[#0D0D0D] font-extrabold text-xs font-mono uppercase tracking-widest flex items-center justify-center gap-2 transition-colors cursor-pointer rounded-xs"
                  >
                    <Send className="w-4 h-4" />
                    <span>TRANSMIT DISPATCH &rarr;</span>
                  </button>

                  <a
                    href="https://wa.me/9863379440?text=Hi%20Sibasish,%20I%20would%20like%20to%20discuss%20a%20project."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 sm:px-5 py-3.5 sm:py-4 bg-neutral-800 hover:bg-neutral-700 text-white font-mono text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer rounded-xs"
                  >
                    <span>WHATSAPP &rarr;</span>
                  </a>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* 4. Bottom Technical Bar & Wordmark */}
        <div className="mt-14 sm:mt-20 pt-6 sm:pt-8 border-t border-neutral-800 flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6 text-xs font-mono text-neutral-500 text-center md:text-left">
          {/* Brand Wordmark */}
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
            <span className="text-white font-black text-xs sm:text-sm tracking-wider">
              /SIBASISHDEV
            </span>
            <span className="text-[10px] sm:text-xs">&copy; 2026 SIBASISH CHAKRABORTI. ALL RIGHTS RESERVED.</span>
          </div>

          {/* Language Switcher */}
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-neutral-600">LANG:</span>
            {(['EN', 'JA', 'DE'] as const).map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={`px-2 py-0.5 rounded-xs transition-colors cursor-pointer text-[10px] sm:text-xs ${
                  lang === l
                    ? 'bg-[#FF5500] text-[#0D0D0D] font-bold'
                    : 'bg-neutral-900 text-neutral-400 hover:text-white'
                }`}
              >
                {l}
              </button>
            ))}
          </div>

          {/* Back to Top */}
          <button
            onClick={() => scrollTo(0)}
            className="flex items-center gap-2 text-white hover:text-[#FF5500] transition-colors cursor-pointer text-xs"
          >
            <span>BACK TO SURFACE</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
