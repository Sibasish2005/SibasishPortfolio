import fs from 'fs';
import path from 'path';
import zlib from 'zlib';
import { createNoise2D } from 'simplex-noise';

// Ensure directories exist
const dirs = [
  'public/textures',
  'public/mockups',
  'public/assets',
  'public/audio',
  'public/video'
];

for (const dir of dirs) {
  fs.mkdirSync(path.resolve(dir), { recursive: true });
}

// 1. Generate 128x128 Grayscale Simplex Noise PNG using Node.js zlib & CRC32
function crc32(buf) {
  let table = crc32.table;
  if (!table) {
    table = crc32.table = new Uint32Array(256);
    for (let i = 0; i < 256; i++) {
      let c = i;
      for (let k = 0; k < 8; k++) {
        c = (c & 1) ? (0xedb88320 ^ (c >>> 1)) : (c >>> 1);
      }
      table[i] = c >>> 0;
    }
  }
  let crc = 0xffffffff;
  for (let i = 0; i < buf.length; i++) {
    crc = (crc >>> 8) ^ table[(crc ^ buf[i]) & 0xff];
  }
  return (crc ^ 0xffffffff) >>> 0;
}

function makeChunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length, 0);
  const typeBuf = Buffer.from(type, 'ascii');
  const crcBuf = Buffer.alloc(4);
  const checksum = crc32(Buffer.concat([typeBuf, data]));
  crcBuf.writeUInt32BE(checksum, 0);
  return Buffer.concat([len, typeBuf, data, crcBuf]);
}

function generateNoisePng(filePath, width = 128, height = 128) {
  const noise2D = createNoise2D();
  const scanlines = [];

  for (let y = 0; y < height; y++) {
    scanlines.push(0); // Filter type 0 (None)
    for (let x = 0; x < width; x++) {
      // Generate multiple octaves for rich film-grain noise
      const n1 = noise2D(x * 0.08, y * 0.08);
      const n2 = noise2D(x * 0.16, y * 0.16) * 0.5;
      const val = Math.floor(((n1 + n2 + 1.5) / 3) * 255);
      scanlines.push(Math.max(0, Math.min(255, val)));
    }
  }

  const rawData = Buffer.from(scanlines);
  const compressed = zlib.deflateSync(rawData);

  // PNG Header
  const signature = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);

  // IHDR
  const ihdrData = Buffer.alloc(13);
  ihdrData.writeUInt32BE(width, 0);
  ihdrData.writeUInt32BE(height, 4);
  ihdrData.writeUInt8(8, 8); // 8-bit depth
  ihdrData.writeUInt8(0, 9); // Color type 0 (Grayscale)
  ihdrData.writeUInt8(0, 10); // Compression
  ihdrData.writeUInt8(0, 11); // Filter
  ihdrData.writeUInt8(0, 12); // Interlace

  const ihdrChunk = makeChunk('IHDR', ihdrData);
  const idatChunk = makeChunk('IDAT', compressed);
  const iendChunk = makeChunk('IEND', Buffer.alloc(0));

  const pngBuffer = Buffer.concat([signature, ihdrChunk, idatChunk, iendChunk]);
  fs.writeFileSync(filePath, pngBuffer);
  console.log(`Generated noise texture: ${filePath} (${pngBuffer.length} bytes)`);
}

generateNoisePng('public/textures/noise.png');

// 2. Generate Device Frame Mockups (Desktop Monitor & Laptop)
const monitorSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 640" fill="none">
  <defs>
    <linearGradient id="monitorBezel" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#1c1c1c"/>
      <stop offset="100%" stop-color="#0a0a0a"/>
    </linearGradient>
    <linearGradient id="standGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#2a2a2a"/>
      <stop offset="100%" stop-color="#141414"/>
    </linearGradient>
  </defs>
  <!-- Stand Neck -->
  <path d="M460 520 L540 520 L555 600 L445 600 Z" fill="url(#standGrad)" stroke="#333" stroke-width="1.5"/>
  <!-- Stand Base -->
  <rect x="360" y="598" width="280" height="12" rx="4" fill="#1e1e1e" stroke="#444" stroke-width="1.5"/>
  <rect x="400" y="610" width="200" height="4" rx="2" fill="#000" opacity="0.3"/>
  <!-- Monitor Outer Body -->
  <rect x="40" y="20" width="920" height="510" rx="14" fill="url(#monitorBezel)" stroke="#383838" stroke-width="2"/>
  <!-- Inner Bezel border -->
  <rect x="56" y="36" width="888" height="476" rx="6" fill="#000" stroke="#222" stroke-width="1"/>
  <!-- Webcam Dot -->
  <circle cx="500" cy="28" r="3" fill="#222" stroke="#444" stroke-width="1"/>
  <circle cx="500" cy="28" r="1" fill="#00FF66" opacity="0.8"/>
  <!-- Screen Aperture Viewport is within x:58 y:38 w:884 h:472 -->
</svg>`;
fs.writeFileSync('public/mockups/monitor.svg', monitorSvg);
console.log('Generated public/mockups/monitor.svg');

const laptopSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 620" fill="none">
  <defs>
    <linearGradient id="laptopLid" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#262626"/>
      <stop offset="100%" stop-color="#121212"/>
    </linearGradient>
    <linearGradient id="laptopBase" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#383838"/>
      <stop offset="60%" stop-color="#1c1c1c"/>
      <stop offset="100%" stop-color="#0f0f0f"/>
    </linearGradient>
  </defs>
  <!-- Laptop Display Lid -->
  <rect x="90" y="24" width="820" height="510" rx="16" fill="url(#laptopLid)" stroke="#444" stroke-width="2"/>
  <!-- Screen Inset -->
  <rect x="106" y="40" width="788" height="478" rx="8" fill="#000" stroke="#262626" stroke-width="1.5"/>
  <!-- Camera notch / Dot -->
  <circle cx="500" cy="32" r="3" fill="#111" stroke="#333" stroke-width="1"/>
  <circle cx="500" cy="32" r="1" fill="#00F0FF" opacity="0.6"/>
  <!-- Laptop Base Chassis -->
  <path d="M20 534 L980 534 C990 534 998 542 995 552 L970 574 C966 578 960 580 954 580 L46 580 C40 580 34 578 30 574 L5 552 C2 542 10 534 20 534 Z" fill="url(#laptopBase)" stroke="#444" stroke-width="1.5"/>
  <!-- Trackpad Opening Indent -->
  <path d="M440 534 L560 534 L554 544 L446 544 Z" fill="#141414" stroke="#282828" stroke-width="1"/>
</svg>`;
fs.writeFileSync('public/mockups/laptop.svg', laptopSvg);
console.log('Generated public/mockups/laptop.svg');

// 3. Generate 8-Bit Runner mascot data
const runnerData = {
  v: "5.7.4",
  fr: 12,
  ip: 0,
  op: 12,
  w: 64,
  h: 64,
  nm: "8-Bit Runner",
  ddd: 0,
  assets: [],
  layers: [
    {
      ddd: 0,
      ind: 1,
      ty: 4,
      nm: "Runner Frame",
      sr: 1,
      ks: {
        o: { a: 0, k: 100 },
        r: { a: 0, k: 0 },
        p: { a: 0, k: [32, 32, 0] },
        a: { a: 0, k: [0, 0, 0] },
        s: { a: 0, k: [100, 100, 100] }
      },
      shapes: []
    }
  ]
};
fs.writeFileSync('public/assets/runner.json', JSON.stringify(runnerData, null, 2));
console.log('Generated public/assets/runner.json');
