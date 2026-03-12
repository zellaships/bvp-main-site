import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const partnersDir = './public/images/partners';
const files = fs.readdirSync(partnersDir).filter(f => f.endsWith('.png'));

console.log('Processing partner logos to remove grey backgrounds...\n');

for (const file of files) {
  const filePath = path.join(partnersDir, file);
  const backupPath = path.join(partnersDir, `${file}.backup`);

  // Create backup if it doesn't exist
  if (!fs.existsSync(backupPath)) {
    fs.copyFileSync(filePath, backupPath);
  }

  try {
    const image = sharp(filePath);
    const { width, height } = await image.metadata();

    // Get raw pixel data
    const { data, info } = await image
      .ensureAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true });

    // Process pixels - make light grey backgrounds transparent
    const newData = Buffer.from(data);
    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      const a = data[i + 3];

      // Check if pixel is light grey (all channels similar and > 200)
      const isGrey = Math.abs(r - g) < 15 && Math.abs(g - b) < 15 && Math.abs(r - b) < 15;
      const isLight = r > 200 && g > 200 && b > 200;

      if (isGrey && isLight) {
        // Make transparent
        newData[i + 3] = 0;
      }
    }

    // Save processed image
    await sharp(newData, {
      raw: {
        width: info.width,
        height: info.height,
        channels: 4
      }
    })
    .png()
    .toFile(filePath + '.tmp');

    // Replace original with processed
    fs.renameSync(filePath + '.tmp', filePath);

    console.log(`✓ ${file} - grey background removed`);
  } catch (err) {
    console.error(`✗ ${file} - error: ${err.message}`);
  }
}

console.log('\nDone! Grey backgrounds have been made transparent.');
