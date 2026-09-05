'use client';

import React, { useState, useEffect } from 'react';
import { useLenis } from '@/src/components/providers/SmoothScrollProvider';

export default function HeaderNav() {
  const { scrollTo } = useLenis();
  const [timeStr, setTimeStr] = useState('');

  useEffect(() => {
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
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white/85 backdrop-blur-md border-b border-black/10 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-14 h-14 flex items-center justify-between text-xs font-mono">
        {/* Left: Branding & Edition */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={() => scrollTo(0)}
            className="font-black text-xs sm:text-sm text-[#0D0D0D] tracking-tight hover:text-[#FF5500] transition-colors cursor-pointer"
          >
            SIBASISH CHAKRABORTI
          </button>
          <span className="hidden sm:inline text-neutral-400 font-normal">
            [2026/EDITION]
          </span>
        </div>

        {/* Center: Real-time Agartala Clock & Status */}
        <div className="hidden md:flex items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#FF5500] animate-pulse" />
            <span className="text-neutral-700 font-medium">
              STATUS: OPEN FOR PROJECTS &amp; FREELANCE
            </span>
          </div>
          <span className="text-neutral-400">|</span>
          <span className="text-[#0D0D0D] font-bold tracking-wider">
            {timeStr || '15:30:00'} AGARTALA, INDIA
          </span>
        </div>

        {/* Right: Quick Navigation */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Quick Section Anchors */}
          <button
            onClick={() => scrollTo('#about')}
            className="text-neutral-600 hover:text-[#FF5500] transition-colors cursor-pointer px-2 py-1 font-medium"
          >
            ABOUT
          </button>
          <button
            onClick={() => scrollTo('#work')}
            className="text-neutral-600 hover:text-[#FF5500] transition-colors cursor-pointer px-2 py-1 font-medium"
          >
            WORK
          </button>

          {/* Contact Anchor */}
          <button
            onClick={() => scrollTo('#contact')}
            className="px-3.5 py-1 border border-black/15 hover:border-black bg-black text-white hover:bg-neutral-800 rounded-full font-bold uppercase transition-colors cursor-pointer"
          >
            CONTACT
          </button>
        </div>
      </div>
    </header>
  );
}
