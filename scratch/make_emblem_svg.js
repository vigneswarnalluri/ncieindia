const fs = require('fs');
const path = require('path');

const svgContent = fs.readFileSync(path.join(__dirname, '..', 'public', 'logo-new.svg'), 'utf8');

// Parse groups and paths
// The emblem bounding box in logo-new.svg is roughly x: 0..210, y: 0..300.
// Let's create an SVG with viewBox "0 0 220 300" that directly clips to the emblem:

const standaloneEmblemSvg = `<?xml version="1.0" encoding="utf-8"?>
<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="-30 -15 280 290">
  <rect x="-30" y="-15" width="280" height="290" fill="#ffffff"/>
  <circle cx="110" cy="130" r="135" fill="#ffffff" stroke="#0d583e" stroke-width="3"/>
  <g id="ncie-emblem">
${svgContent.replace(/<\?xml[\s\S]*?<svg[^>]*>/, '').replace(/<\/svg>/, '')}
  </g>
</svg>`;

fs.writeFileSync(path.join(__dirname, '..', 'public', 'ncie-official-round-logo.svg'), standaloneEmblemSvg);
console.log('Saved public/ncie-official-round-logo.svg');
