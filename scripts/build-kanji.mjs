// Builds public/kanji.json: every school (kyoiku, grade 1-6) kanji, each taught through one common word.
// Sources (CI downloads them): KANJIDIC2 and JMdict via scriptin/jmdict-simplified. EDRDG data, CC BY-SA 4.0.
import fs from 'fs';
const dir = process.argv[2];
const find = p => { try { return fs.readdirSync(dir).find(f => f.startsWith(p) && f.endsWith('.json')); } catch { } };
const fk = find('kanjidic2'), fj = find('jmdict');
const bail = m => { console.log('::warning::' + m + ' Keeping the built-in kanji list.'); process.exit(0); };
if (!fk || !fj) bail('Dictionary files not found.');
const kd = JSON.parse(fs.readFileSync(`${dir}/${fk}`, 'utf8')), jm = JSON.parse(fs.readFileSync(`${dir}/${fj}`, 'utf8'));
const KANJI = /[\u4e00-\u9fff]/, HIRA = /^[\u3040-\u309f]+$/, FORM = /^[\u4e00-\u9fff\u3040-\u309f]+$/;
const kl = (kd.characters || []).filter(c => c.misc?.grade >= 1 && c.misc.grade <= 6)
  .sort((a, b) => a.misc.grade - b.misc.grade || (a.misc.frequency || 9999) - (b.misc.frequency || 9999));
if (kl.length < (+process.env.MIN_KANJI || 900)) bail('Unexpected KANJIDIC2 format (' + kl.length + ' school kanji).');
const rank = new Map(kl.map((c, i) => [c.literal, i]));
const lt = (a, b) => { for (let i = 0; i < a.length; i++) if (a[i] != b[i]) return a[i] < b[i]; return false; };
const best = new Map();
for (const w of jm.words || []) for (const k of w.kanji || []) {
  if (!k.common || !FORM.test(k.text)) continue;
  const ks = [...new Set([...k.text].filter(c => KANJI.test(c)))];
  if (!ks.length || !ks.every(c => rank.has(c))) continue;
  const kn = (w.kana || []).find(a => a.common && HIRA.test(a.text) && (!a.appliesToKanji || a.appliesToKanji.includes('*') || a.appliesToKanji.includes(k.text)));
  if (!kn) continue;
  const n = ks.reduce((a, c) => rank.get(c) > rank.get(a) ? c : a), sc = [ks.length, k.text.length, kn.text.length], cur = best.get(n);
  if (!cur || lt(sc, cur.sc)) best.set(n, { k: k.text, r: kn.text, m: (w.sense?.[0]?.gloss || []).slice(0, 2).map(g => g.text).join('; '), n, d: ks.filter(c => c != n), sc });
}
const hira = s => s.replace(/[\u30a1-\u30f6]/g, c => String.fromCharCode(c.charCodeAt(0) - 96));
const out = []; let fb = 0;
for (const c of kl) {
  let e = best.get(c.literal);
  if (!e) {
    const g = c.readingMeaning?.groups || [], rd = g.flatMap(x => x.readings || []), kun = rd.find(r => r.type == 'ja_kun'), on = rd.find(r => r.type == 'ja_on');
    const r = kun ? kun.value.split('.')[0].replace(/-/g, '') : hira(on?.value || '');
    if (!HIRA.test(r)) continue;
    e = { k: c.literal, r, m: g.flatMap(x => x.meanings || []).find(m => m.lang == 'en')?.value || '', n: c.literal, d: [] }; fb++;
  }
  out.push({ k: e.k, r: e.r, m: e.m, n: e.n, d: e.d, g: c.misc.grade });
}
fs.writeFileSync('public/kanji.json', JSON.stringify(out));
console.log(`${out.length} kanji written (${fb} taught as a single character without a common word)`);
