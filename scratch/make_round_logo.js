const fs = require('fs');
const path = require('path');

const svgContent = fs.readFileSync(path.join(__dirname, '..', 'public', 'logo-new.svg'), 'utf8');

// Let's create an SVG containing the emblem centered in a 512x512 square with a clean white circle background
const emblemSvg = `<?xml version="1.0" encoding="utf-8"?>
<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
  <!-- White circular background -->
  <circle cx="256" cy="256" r="256" fill="#ffffff" />
  
  <!-- Centered NCIE Bulb & Arrow Emblem from logo-new.svg -->
  <g transform="translate(130, 75) scale(1.15)">
${svgContent.replace(/<\?xml[\s\S]*?<svg[^>]*>/, '').replace(/<\/svg>/, '')}
  </g>
</svg>`;

fs.writeFileSync(path.join(__dirname, '..', 'public', 'ncie-round-logo.svg'), emblemSvg);
console.log('Created public/ncie-round-logo.svg');
