import fs from 'fs';

// Generate 44.1kHz 16-bit PCM WAV (16 bars of 128 BPM electronic beat, ~30 seconds)
const sampleRate = 44100;
const bpm = 128;
const beatDuration = 60 / bpm; // 0.46875s
const totalBeats = 64; // 16 bars of 4/4
const totalSeconds = totalBeats * beatDuration; // 30s
const totalSamples = Math.floor(totalSeconds * sampleRate);

const left = new Float32Array(totalSamples);
const right = new Float32Array(totalSamples);

// Pseudo-random generator for reproducible noise
let seed = 42;
function random() {
  seed = (seed * 1664525 + 1013904223) % 4294967296;
  return (seed / 4294967296) * 2 - 1;
}

for (let b = 0; b < totalBeats; b++) {
  const beatStart = Math.floor(b * beatDuration * sampleRate);
  const barBeat = b % 4; // 0, 1, 2, 3

  // 1. Kick Drum (on beats 0, 1, 2, 3 - four on the floor)
  const kickDuration = Math.floor(0.35 * sampleRate);
  for (let i = 0; i < kickDuration && (beatStart + i) < totalSamples; i++) {
    const t = i / sampleRate;
    // Pitch drops rapidly from 140Hz to 48Hz
    const pitch = 48 + 92 * Math.exp(-t * 28);
    const amp = Math.exp(-t * 9.5);
    const sample = Math.sin(2 * Math.PI * pitch * t) * amp * 0.85;
    left[beatStart + i] += sample;
    right[beatStart + i] += sample;
  }

  // 2. Snare / Clap (on beats 1 and 3 - backbeat)
  if (barBeat === 1 || barBeat === 3) {
    const snareDuration = Math.floor(0.25 * sampleRate);
    for (let i = 0; i < snareDuration && (beatStart + i) < totalSamples; i++) {
      const t = i / sampleRate;
      const noise = random() * Math.exp(-t * 18);
      const tone = Math.sin(2 * Math.PI * 220 * t) * Math.exp(-t * 22) * 0.5;
      const sample = (noise * 0.7 + tone * 0.3) * 0.75;
      left[beatStart + i] += sample * 0.9;
      right[beatStart + i] += sample * 0.9;
    }
  }

  // 3. Hi-hats (16th notes: 4 per beat)
  for (let s = 0; s < 4; s++) {
    const subStart = beatStart + Math.floor((s * beatDuration / 4) * sampleRate);
    const hatDuration = Math.floor(0.06 * sampleRate);
    const isOpen = (s === 2); // open hat on off-beat
    const hatLength = isOpen ? Math.floor(0.18 * sampleRate) : hatDuration;
    const decay = isOpen ? 12 : 38;
    const vol = (s === 0) ? 0.35 : (isOpen ? 0.45 : 0.22);

    for (let i = 0; i < hatLength && (subStart + i) < totalSamples; i++) {
      const t = i / sampleRate;
      // High frequency sizzle
      const hNoise = random() * Math.exp(-t * decay);
      left[subStart + i] += hNoise * vol * 0.7;
      right[subStart + i] += hNoise * vol * 0.7;
    }
  }

  // 4. Acid / Sub-synth bassline
  const bassNotes = [55, 55, 65.4, 73.4, 55, 55, 82.4, 73.4]; // A1, A1, C2, D2, A1, A1, E2, D2
  const noteFreq = bassNotes[b % bassNotes.length];
  const bassLen = Math.floor(beatDuration * sampleRate * 0.85);
  for (let i = 0; i < bassLen && (beatStart + i) < totalSamples; i++) {
    const t = i / sampleRate;
    const filterCutoff = 1 + 2.5 * Math.exp(-t * 8);
    const sample = (Math.sin(2 * Math.PI * noteFreq * t) +
                    0.4 * Math.sin(2 * Math.PI * noteFreq * 2 * t * filterCutoff) +
                    0.2 * Math.sin(2 * Math.PI * noteFreq * 3 * t)) * Math.exp(-t * 3.5) * 0.45;
    left[beatStart + i] += sample;
    right[beatStart + i] += sample;
  }
}

// Encode to 16-bit PCM WAV
const numChannels = 2;
const bytesPerSample = 2;
const blockAlign = numChannels * bytesPerSample;
const byteRate = sampleRate * blockAlign;
const dataSize = totalSamples * blockAlign;

const header = Buffer.alloc(44);
header.write('RIFF', 0);
header.writeUInt32LE(36 + dataSize, 4);
header.write('WAVE', 8);
header.write('fmt ', 12);
header.writeUInt32LE(16, 16); // Subchunk1Size (16 for PCM)
header.writeUInt16LE(1, 20);  // AudioFormat (1 = PCM)
header.writeUInt16LE(numChannels, 22);
header.writeUInt32LE(sampleRate, 24);
header.writeUInt32LE(byteRate, 28);
header.writeUInt16LE(blockAlign, 32);
header.writeUInt16LE(bytesPerSample * 8, 34); // BitsPerSample
header.write('data', 36);
header.writeUInt32LE(dataSize, 40);

const pcmData = Buffer.alloc(dataSize);
let offset = 0;
for (let i = 0; i < totalSamples; i++) {
  // Soft limiter to prevent clipping
  const l = Math.max(-1, Math.min(1, left[i]));
  const r = Math.max(-1, Math.min(1, right[i]));
  const intL = Math.floor(l < 0 ? l * 32768 : l * 32767);
  const intR = Math.floor(r < 0 ? r * 32768 : r * 32767);
  pcmData.writeInt16LE(intL, offset);
  pcmData.writeInt16LE(intR, offset + 2);
  offset += 4;
}

const wavBuffer = Buffer.concat([header, pcmData]);
fs.writeFileSync('public/audio/track.wav', wavBuffer);
fs.writeFileSync('public/audio/track.mp3', wavBuffer); // HTML5 Audio/WebAudio plays WAV headers in modern browsers
console.log(`Generated 128 BPM electronic audio track: public/audio/track.mp3 & track.wav (${wavBuffer.length} bytes)`);
