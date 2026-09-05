'use client';

import gsap from 'gsap';

type TickerCallback = (time: number, deltaTime: number, frame: number) => void;

const listeners = new Set<TickerCallback>();
let isTickerBound = false;

function masterTickerCallback(time: number, deltaTime: number, frame: number) {
  for (const listener of listeners) {
    try {
      listener(time, deltaTime, frame);
    } catch (err) {
      console.error('Ticker listener error:', err);
    }
  }
}

/**
 * Register a draw or update callback to the centralized GSAP master ticker.
 * Eliminates redundant requestAnimationFrame loops across canvases and physics scenes.
 */
export function registerToTicker(callback: TickerCallback): () => void {
  if (typeof window === 'undefined') return () => {};

  listeners.add(callback);

  if (!isTickerBound) {
    gsap.ticker.add(masterTickerCallback);
    isTickerBound = true;
  }

  return () => {
    listeners.delete(callback);
    if (listeners.size === 0 && isTickerBound) {
      gsap.ticker.remove(masterTickerCallback);
      isTickerBound = false;
    }
  };
}
