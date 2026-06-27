const fs = require('fs');
const path = require('path');

let sharp;
try {
  sharp = require('sharp');
} catch (e) {
  console.error("Error loading sharp. Please make sure sharp is installed: npm install -D sharp");
  process.exit(1);
}

const PUBLIC_DIR = path.join(__dirname, '..', 'public');

const foldersToCompress = [
  'COMMUNITY WALL',
  'Medals Distribution',
  'PBL (Badminton)',
  'PCL (Football)',
  'Run',
  'VolleyVibes',
  'ipl',
  'teams',
  'paradox medals distrbution'
];

async function compressImage(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  if (!['.jpg', '.jpeg', '.png'].includes(ext)) {
    return;
  }

  try {
    const fileBuffer = fs.readFileSync(filePath);
    const sizeBeforeKB = Math.round(fileBuffer.length / 1024);

    let pipeline = sharp(fileBuffer).rotate();
    const metadata = await pipeline.metadata();

    let shouldResize = false;
    let resizeOpts = {};

    if (metadata.width > 1200 || metadata.height > 1200) {
      shouldResize = true;
      if (metadata.width > metadata.height) {
        resizeOpts = { width: 1200, fit: 'inside' };
      } else {
        resizeOpts = { height: 1200, fit: 'inside' };
      }
    }

    if (shouldResize) {
      pipeline = pipeline.resize(resizeOpts);
    }

    if (ext === '.jpg' || ext === '.jpeg') {
      pipeline = pipeline.jpeg({ quality: 80, mozjpeg: true });
    } else if (ext === '.png') {
      pipeline = pipeline.png({ quality: 80, compressionLevel: 9 });
    }

    const compressedBuffer = await pipeline.toBuffer();
    const sizeAfterKB = Math.round(compressedBuffer.length / 1024);

    // Replace original only if compressed file is actually smaller or was resized
    if (sizeAfterKB < sizeBeforeKB || shouldResize) {
      fs.writeFileSync(filePath, compressedBuffer);
      console.log(`Optimized ${path.relative(PUBLIC_DIR, filePath)}: ${sizeBeforeKB}KB -> ${sizeAfterKB}KB (Resized: ${shouldResize})`);
    } else {
      console.log(`Skipped (already optimized) ${path.relative(PUBLIC_DIR, filePath)}: ${sizeBeforeKB}KB`);
    }
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error);
  }
}

async function run() {
  console.log("Starting image compression...");
  
  for (const folder of foldersToCompress) {
    const folderPath = path.join(PUBLIC_DIR, folder);
    if (!fs.existsSync(folderPath)) {
      console.log(`Folder not found: ${folderPath}`);
      continue;
    }

    console.log(`Processing folder: ${folder}`);
    const files = fs.readdirSync(folderPath);

    for (const file of files) {
      const filePath = path.join(folderPath, file);
      const stat = fs.statSync(filePath);

      if (stat.isFile()) {
        await compressImage(filePath);
      }
    }
  }

  console.log("Image compression complete!");
}

run().catch(console.error);
