'use client';

export interface FrequencyBands {
  low: number;   // Sub/kick: 20Hz - 150Hz (normalized 0..1)
  mid: number;   // Snares/claps/vox: 250Hz - 2kHz (normalized 0..1)
  high: number;  // Hats/air/transients: 2kHz - 16kHz (normalized 0..1)
  rawLow: number;
  rawMid: number;
  rawHigh: number;
}

export class AudioController {
  private audioCtx: AudioContext | null = null;
  private analyser: AnalyserNode | null = null;
  private source: MediaElementAudioSourceNode | null = null;
  private audioElement: HTMLAudioElement | null = null;
  private dataArray: Uint8Array<ArrayBuffer> | null = null;

  // Asymmetric smoothing values
  // Quick impact attack: ease = 0.34
  // Weighted exponential release decay: ease = 0.075
  private readonly attackEase = 0.34;
  private readonly decayEase = 0.075;

  public bands: FrequencyBands = {
    low: 0,
    mid: 0,
    high: 0,
    rawLow: 0,
    rawMid: 0,
    rawHigh: 0,
  };

  private isInitialized = false;

  constructor(audioSrc: string = '/audio/track.mp3') {
    if (typeof window === 'undefined') return;
    this.audioElement = new Audio(audioSrc);
    this.audioElement.loop = true;
    this.audioElement.crossOrigin = 'anonymous';
  }

  public init() {
    if (this.isInitialized || typeof window === 'undefined') return;

    try {
      const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.audioCtx = new AudioCtxClass();
      this.analyser = this.audioCtx.createAnalyser();
      this.analyser.fftSize = 1024;
      this.analyser.smoothingTimeConstant = 0.4;

      if (this.audioElement) {
        this.source = this.audioCtx.createMediaElementSource(this.audioElement);
        this.source.connect(this.analyser);
        this.analyser.connect(this.audioCtx.destination);
      }

      this.dataArray = new Uint8Array(new ArrayBuffer(this.analyser.frequencyBinCount));
      this.isInitialized = true;
    } catch (err) {
      console.warn('AudioContext initialization deferred until user interaction:', err);
    }
  }

  public async play(): Promise<boolean> {
    if (!this.isInitialized) {
      this.init();
    }

    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      await this.audioCtx.resume();
    }

    if (this.audioElement) {
      try {
        await this.audioElement.play();
        return true;
      } catch (err) {
        console.warn('Audio play prevented by browser policy:', err);
        return false;
      }
    }
    return false;
  }

  public pause() {
    if (this.audioElement) {
      this.audioElement.pause();
    }
  }

  public toggle(): Promise<boolean> {
    if (this.isPlaying()) {
      this.pause();
      return Promise.resolve(false);
    } else {
      return this.play();
    }
  }

  public isPlaying(): boolean {
    return !!(this.audioElement && !this.audioElement.paused);
  }

  /**
   * Called per frame on the centralized ticker.
   * Samples frequencies and calculates asymmetrically damped output bands.
   */
  public update(): FrequencyBands {
    if (!this.analyser || !this.dataArray || !this.isPlaying()) {
      // Graceful decay towards zero when stopped
      this.bands.low += (0 - this.bands.low) * this.decayEase;
      this.bands.mid += (0 - this.bands.mid) * this.decayEase;
      this.bands.high += (0 - this.bands.high) * this.decayEase;
      this.bands.rawLow = 0;
      this.bands.rawMid = 0;
      this.bands.rawHigh = 0;
      return this.bands;
    }

    this.analyser.getByteFrequencyData(this.dataArray);

    const sampleRate = this.audioCtx ? this.audioCtx.sampleRate : 44100;
    const binCount = this.analyser.frequencyBinCount;
    const binWidth = (sampleRate / 2) / binCount;

    // Calculate bin index ranges:
    // low: 20Hz - 150Hz
    const lowStart = Math.max(0, Math.floor(20 / binWidth));
    const lowEnd = Math.min(binCount, Math.ceil(150 / binWidth));

    // mid: 250Hz - 2kHz
    const midStart = Math.max(0, Math.floor(250 / binWidth));
    const midEnd = Math.min(binCount, Math.ceil(2000 / binWidth));

    // high: 2kHz - 16kHz
    const highStart = Math.max(0, Math.floor(2000 / binWidth));
    const highEnd = Math.min(binCount, Math.ceil(16000 / binWidth));

    let sumLow = 0;
    for (let i = lowStart; i < lowEnd; i++) sumLow += this.dataArray[i];
    const rawLow = (lowEnd > lowStart) ? (sumLow / (lowEnd - lowStart)) / 255 : 0;

    let sumMid = 0;
    for (let i = midStart; i < midEnd; i++) sumMid += this.dataArray[i];
    const rawMid = (midEnd > midStart) ? (sumMid / (midEnd - midStart)) / 255 : 0;

    let sumHigh = 0;
    for (let i = highStart; i < highEnd; i++) sumHigh += this.dataArray[i];
    const rawHigh = (highEnd > highStart) ? (sumHigh / (highEnd - highStart)) / 255 : 0;

    this.bands.rawLow = rawLow;
    this.bands.rawMid = rawMid;
    this.bands.rawHigh = rawHigh;

    // Asymmetric damping: quick attack, slow release decay
    const smoothBand = (target: number, current: number): number => {
      const ease = target > current ? this.attackEase : this.decayEase;
      return current + (target - current) * ease;
    };

    this.bands.low = smoothBand(rawLow, this.bands.low);
    this.bands.mid = smoothBand(rawMid, this.bands.mid);
    this.bands.high = smoothBand(rawHigh, this.bands.high);

    return this.bands;
  }

  public dispose() {
    if (this.audioElement) {
      this.audioElement.pause();
      this.audioElement.src = '';
      this.audioElement = null;
    }
    if (this.source) {
      this.source.disconnect();
      this.source = null;
    }
    if (this.analyser) {
      this.analyser.disconnect();
      this.analyser = null;
    }
    if (this.audioCtx && this.audioCtx.state !== 'closed') {
      this.audioCtx.close();
      this.audioCtx = null;
    }
    this.isInitialized = false;
  }
}

// Global singleton instance for app-wide reactivity
export const globalAudio = new AudioController('/audio/track.mp3');
