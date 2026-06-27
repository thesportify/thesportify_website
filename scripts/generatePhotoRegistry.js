const fs = require('fs');
const path = require('path');
let convert;
try {
  convert = require('heic-convert');
} catch (e) {
  console.warn("heic-convert is not installed. HEIC conversion will be skipped.");
}

const PUBLIC_DIR = path.join(__dirname, '..', 'public');
const LIB_DIR = path.join(__dirname, '..', 'lib');

const folders = {
  communityWall: 'COMMUNITY WALL',
  medalsDistribution: 'Medals Distribution',
  paradoxMedals: 'paradox medals distrbution',
  pblBadminton: 'PBL (Badminton)',
  pclFootball: 'PCL (Football)',
  run: 'Run',
  volleyVibes: 'VolleyVibes',
  ipl: 'ipl',
  teams: 'teams'
};

async function processHEIC(filePath, folderPath, file) {
  if (!convert) return null;
  const ext = path.extname(file);
  const baseName = path.basename(file, ext);
  const outputFileName = `${baseName}-converted.jpg`;
  const outputPath = path.join(folderPath, outputFileName);

  if (fs.existsSync(outputPath)) {
    return outputFileName;
  }

  console.log(`Converting ${file} to JPEG...`);
  try {
    const inputBuffer = fs.readFileSync(filePath);
    const outputBuffer = await convert({
      buffer: inputBuffer,
      format: 'JPEG',
      quality: 0.8
    });
    fs.writeFileSync(outputPath, outputBuffer);
    console.log(`Successfully converted ${file} -> ${outputFileName}`);
    return outputFileName;
  } catch (error) {
    console.error(`Error converting ${file}:`, error);
    return null;
  }
}

async function run() {
  if (!fs.existsSync(LIB_DIR)) {
    fs.mkdirSync(LIB_DIR, { recursive: true });
  }

  const registry = {};

  for (const [key, folderName] of Object.entries(folders)) {
    const folderPath = path.join(PUBLIC_DIR, folderName);
    registry[key] = [];

    if (!fs.existsSync(folderPath)) {
      console.warn(`Folder ${folderName} does not exist in public/`);
      continue;
    }

    const files = fs.readdirSync(folderPath);
    for (const file of files) {
      const filePath = path.join(folderPath, file);
      const stat = fs.statSync(filePath);
      if (!stat.isFile()) continue;

      const ext = path.extname(file).toLowerCase();
      
      if (['.heic', '.heif'].includes(ext)) {
        const convertedFile = await processHEIC(filePath, folderPath, file);
        if (convertedFile) {
          registry[key].push(`/${folderName}/${convertedFile}`);
        }
      } else if (['.jpg', '.jpeg', '.png', '.webp', '.gif'].includes(ext)) {
        // If it's a converted JPEG, avoid duplicates if the original HEIC still exists
        if (file.endsWith('-converted.jpg')) {
          const originalHeic = file.replace('-converted.jpg', '.HEIC');
          const originalHeicLower = file.replace('-converted.jpg', '.heic');
          const originalHeif = file.replace('-converted.jpg', '.HEIF');
          const originalHeifLower = file.replace('-converted.jpg', '.heif');
          if (
            files.includes(originalHeic) || 
            files.includes(originalHeicLower) ||
            files.includes(originalHeif) ||
            files.includes(originalHeifLower)
          ) {
            continue;
          }
        }
        registry[key].push(`/${folderName}/${file}`);
      }
    }
  }

  fs.writeFileSync(path.join(LIB_DIR, 'photoRegistry.json'), JSON.stringify(registry, null, 2));
  console.log('Photo registry generated successfully.');
}

run().catch(console.error);
