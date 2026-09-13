const fs = require('fs');

const env = fs.readFileSync('.env.local', 'utf8');
const lines = env.split('\n').map(l => l.trim()).filter(l => l && !l.startsWith('#'));
console.log('Available env keys:');
lines.forEach(l => {
  const k = l.split('=')[0];
  console.log(' - ' + k);
});
