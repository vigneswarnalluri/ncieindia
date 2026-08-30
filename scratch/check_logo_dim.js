const fs = require('fs');
const path = require('path');

// Let's check logo.png dimensions using PNG header
const logoBuffer = fs.readFileSync(path.join(__dirname, '..', 'public', 'logo.png'));
const width = logoBuffer.readUInt32BE(16);
const height = logoBuffer.readUInt32BE(20);

console.log(`logo.png dimensions: ${width}x${height}`);
