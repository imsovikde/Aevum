// Aevum Logo PNG Generator
// Renders the Aevum SVG into all required PNG files at their exact pixel dimensions.
// Run with: node generate-icons.js
// Requires: npm install sharp

const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const ROOT = __dirname;

// The SVG source — exact same paths as the nav logo and new favicon
const svgSource = (size) => Buffer.from(`
<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 32 32" fill="none">
  <rect width="32" height="32" fill="black"/>
  <path d="M16 3L29 25H3L16 3Z" stroke="rgba(255,255,255,0.6)" stroke-width="1" fill="none"/>
  <path d="M16 25L3 25L9.5 14L22.5 14L29 25Z" fill="rgba(255,255,255,0.7)" stroke="none"/>
  <path d="M16 3L29 25H3L16 3Z" stroke="rgba(255,255,255,0.6)" stroke-width="1" fill="none"/>
</svg>
`);

// Map of output file path → pixel size
const targets = [
  { file: path.join(ROOT, 'favicon-16.png'),           size: 16 },
  { file: path.join(ROOT, 'favicon-32.png'),           size: 32 },
  { file: path.join(ROOT, 'favicon.png'),              size: 32 },
  { file: path.join(ROOT, 'icon.png'),                 size: 48 },
  { file: path.join(ROOT, 'Aevum.png'),                size: 128 },
  { file: path.join(ROOT, 'Aevum Logo.png'),           size: 128 },
  { file: path.join(ROOT, 'Aevam trans fav.png'),      size: 32 },
  { file: path.join(ROOT, 'icons', 'icon-48.png'),     size: 48 },
  { file: path.join(ROOT, 'icons', 'icon-96.png'),     size: 96 },
  { file: path.join(ROOT, 'icons', 'icon-128.png'),    size: 128 },
];

async function run() {
  for (const { file, size } of targets) {
    await sharp(svgSource(size), { density: 300 })
      .resize(size, size)
      .png()
      .toFile(file);
    console.log(`✓  ${path.relative(ROOT, file)} (${size}×${size})`);
  }
  console.log('\nAll icons generated successfully.');
}

run().catch(err => {
  console.error('Error:', err.message);
  process.exit(1);
});
