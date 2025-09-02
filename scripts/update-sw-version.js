const fs = require('fs');
const path = require('path');

// Generate a new version based on timestamp
const generateVersion = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hour = String(now.getHours()).padStart(2, '0');
  const minute = String(now.getMinutes()).padStart(2, '0');
  
  return `v${year}.${month}.${day}.${hour}${minute}`;
};

// Update service worker version
const updateServiceWorkerVersion = () => {
  const swPath = path.join(__dirname, '../public/sw.js');
  
  if (!fs.existsSync(swPath)) {
    return;
  }

  const newVersion = generateVersion();

  let content = fs.readFileSync(swPath, 'utf8');
  
  // Update the version
  content = content.replace(
    /const CACHE_VERSION = ['"`][^'"`]*['"`];/,
    `const CACHE_VERSION = '${newVersion}';`
  );

  fs.writeFileSync(swPath, content, 'utf8');
};

// Update package.json version if needed
const updatePackageVersion = () => {
  const packagePath = path.join(__dirname, '../package.json');
  const package = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
  
  const currentVersion = package.version;
  const [major, minor, patch] = currentVersion.split('.');
  const newPatch = parseInt(patch) + 1;
  const newVersion = `${major}.${minor}.${newPatch}`;
  
  package.version = newVersion;
  fs.writeFileSync(packagePath, JSON.stringify(package, null, 2) + '\n');
  
};

try {
  updateServiceWorkerVersion();
  updatePackageVersion();
} catch (error) {
  console.error('❌ Error updating versions:', error);
  process.exit(1);
}
