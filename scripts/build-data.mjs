// Converts KanjiVG hiragana SVGs into public/strokes.json (one polyline per stroke, in stroke order).
import fs from 'fs';
const dir = process.argv[2] || 'kanjivg/kanji';
function parse(d) {
  const t = d.match(/[a-zA-Z]|-?\d*\.?\d+/g); let i = 0, x = 0, y = 0, cmd, lc = null; const pts = [];
  const n = () => +t[i++];
  while (i < t.length) {
    if (/[a-zA-Z]/.test(t[i])) cmd = t[i++];
    const rel = cmd === cmd.toLowerCase(), C = cmd.toUpperCase(), ox = rel ? x : 0, oy = rel ? y : 0;
    if (C === 'M' || C === 'L') { x = ox + n(); y = oy + n(); pts.push([x, y]); if (C === 'M') cmd = rel ? 'l' : 'L'; lc = null; }
    else if (C === 'C' || C === 'S') {
      let x1, y1;
      if (C === 'C') { x1 = ox + n(); y1 = oy + n(); } else { x1 = lc ? 2 * x - lc[0] : x; y1 = lc ? 2 * y - lc[1] : y; }
      const x2 = ox + n(), y2 = oy + n(), x3 = ox + n(), y3 = oy + n();
      for (let k = 1; k <= 6; k++) { const u = k / 6, v = 1 - u;
        pts.push([v ** 3 * x + 3 * v * v * u * x1 + 3 * v * u * u * x2 + u ** 3 * x3, v ** 3 * y + 3 * v * v * u * y1 + 3 * v * u * u * y2 + u ** 3 * y3]); }
      lc = [x2, y2]; x = x3; y = y3;
    } else throw new Error('Unsupported path command ' + cmd);
  }
  return pts;
}
const kc = [...new Set(JSON.parse(fs.readFileSync('public/kanji.json', 'utf8')).flatMap(x => [...x.k]))].filter(c => c >= '\u4e00').map(c => c.codePointAt(0));
const out = {};
const R = (a, n) => Array.from({ length: n }, (_, i) => a + i);
for (const cp of [...R(0x3041, 0x56), ...R(0x30A1, 0x5A), 0x30FC, ...kc]) {
  const f = `${dir}/${cp.toString(16).padStart(5, '0')}.svg`;
  if (!fs.existsSync(f)) continue;
  out[String.fromCodePoint(cp)] = [...fs.readFileSync(f, 'utf8').matchAll(/<path[^>]*?\sd="([^"]+)"/g)].map(m => parse(m[1]).map(p => p.map(v => +v.toFixed(1))));
}
const miss = kc.filter(c => !out[String.fromCodePoint(c)]);
if (miss.length && !process.env.ALLOW_FEW) { console.error('Missing kanji strokes: ' + miss.map(c => String.fromCodePoint(c)).join(' ')); process.exit(1); }
const count = Object.keys(out).length;
console.log(count + ' characters converted');
if (count < 150 && !process.env.ALLOW_FEW) { console.error('Too few characters found; aborting.'); process.exit(1); }
fs.writeFileSync('public/strokes.json', JSON.stringify(out));
