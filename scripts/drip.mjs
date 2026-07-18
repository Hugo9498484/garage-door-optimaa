import fs from 'node:fs';
const cfg = JSON.parse(fs.readFileSync('.seofactory.json', 'utf8'));
const pub = JSON.parse(fs.readFileSync('data/published.json', 'utf8'));
const q = JSON.parse(fs.readFileSync('data/queue.json', 'utf8'));
const n = Math.max(0, Math.min(cfg.dailyDrip || 0, q.cities.length));
if (n === 0) { console.log('drip: queue empty'); process.exit(0); }
const moving = q.cities.splice(0, n);
pub.cities.push(...moving);
pub.generatedAt = new Date().toISOString();
fs.writeFileSync('data/published.json', JSON.stringify(pub, null, 2));
fs.writeFileSync('data/queue.json', JSON.stringify(q, null, 2));
console.log('drip: promoted ' + n + ' cities. queue=' + q.cities.length + ' published=' + pub.cities.length);
