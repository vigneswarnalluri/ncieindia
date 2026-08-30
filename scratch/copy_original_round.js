const fs = require('fs');
const path = require('path');

const srcPath = 'C:\\Users\\vigne\\.gemini\\antigravity-ide\\brain\\35d47974-8b74-4112-838c-730dcb021901\\ncie_original_round_logo_1788078156124.jpg';
const destPng = path.join(__dirname, '..', 'public', 'ncie-round-logo.png');
const destJpg = path.join(__dirname, '..', 'public', 'ncie-round-logo.jpg');

fs.copyFileSync(srcPath, destPng);
fs.copyFileSync(srcPath, destJpg);
console.log('Saved exact original round logo to public/ncie-round-logo.png and public/ncie-round-logo.jpg');
