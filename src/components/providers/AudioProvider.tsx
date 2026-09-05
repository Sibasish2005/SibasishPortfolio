'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { globalAudio, FrequencyBands } from '@/src/lib/audio/AudioController';
import { registerToTicker } from '@/src/lib/animation/ticker';

interface AudioContextValue {
  isPlaying: boolean;
  bands: FrequencyBands;
  toggleAudio: () => void;
  playAudio: () => void;
  pauseAudio: () => void;
}

const AudioContext = createContext<AudioContextValue>({
  isPlaying: false,
  bands: { low: 0, mid: 0, high: 0, rawLow: 0, rawMid: 0, rawHigh: 0 },
  toggleAudio: () => {},
  playAudio: () => {},
  pauseAudio: () => {},
});

export const useAudioContext = () => useContext(AudioContext);

export default function AudioProvider({ children }: { children: React.ReactNode }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [bands, setBands] = useState<FrequencyBands>({
    low: 0,
    mid: 0,
    high: 0,
    rawLow: 0,
    rawMid: 0,
    rawHigh: 0,
  });

  useEffect(() => {
    // Update audio bands on each frame through the centralized master ticker
    const unregister = registerToTicker(() => {
      const updatedBands = globalAudio.update();
      // Only trigger React state updates periodically or when active to prevent React re-render thrashing
      setBands({ ...updatedBands });
      setIsPlaying(globalAudio.isPlaying());
    });

    return () => {
      unregister();
    };
  }, []);

  const toggleAudio = async () => {
    const playing = await globalAudio.toggle();
    setIsPlaying(playing);
  };

  const playAudio = async () => {
    const success = await globalAudio.play();
    setIsPlaying(success);
  };

  const pauseAudio = () => {
    globalAudio.pause();
    setIsPlaying(false);
  };

  return (
    <AudioContext.Provider value={{ isPlaying, bands, toggleAudio, playAudio, pauseAudio }}>
      {children}
    </AudioContext.Provider>
  );
}
