const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const ROOT = __dirname;
const sourceImagePath = "C:\\Users\\imsov\\Downloads\\Aevam LOGO.png";

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
    await sharp(sourceImagePath)
      .resize(size, size, { fit: 'contain' })
      .png({ palette: true, colors: 64 }) // Optimize for small size
      .toFile(file);
    console.log(`✓  ${path.relative(ROOT, file)} (${size}×${size})`);
  }
  console.log('\nAll icons generated successfully.');
}

run().catch(err => {
  console.error('Error:', err.message);
  process.exit(1);
});
