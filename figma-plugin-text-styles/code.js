// One-time plugin: creates the design-system text styles, binds them to the
// font variables and applies them to every text layer whose typography matches.
// "Check" is read-only. "Create & apply" mutates and then verifies that every
// component set / screen renders pixel-identical to before.

const AKK = 'Akkurat LL Cyr TT';
const PIX = 'Pixform';
const SERIF = 'Instrument Serif';

// lh/ls: { unit, value } or { unit: 'AUTO' }. weight: exact style name or a
// regex (resolved against installed font styles).
const DEFS = [
  { name: 'heading/h1', family: SERIF, weight: 'Regular', size: 84, lh: { unit: 'PERCENT', value: 90 }, ls: { unit: 'PERCENT', value: -1 }, textCase: 'ORIGINAL', familyVar: 'font/family/Antiqa', sizeVar: 'font/size/h1' },
  { name: 'heading/h2', family: SERIF, weight: 'Regular', size: 40, lh: { unit: 'AUTO' }, ls: { unit: 'PERCENT', value: -1 }, textCase: 'ORIGINAL', familyVar: 'font/family/Antiqa', sizeVar: null },
  { name: 'heading/h3', family: AKK, weight: 'Regular', size: 20, lh: { unit: 'AUTO' }, ls: { unit: 'PERCENT', value: -2 }, textCase: 'ORIGINAL', familyVar: 'font/family/Grotesk', sizeVar: 'font/size/h3' },
  { name: 'heading/h4', family: AKK, weight: /^semi\s*bold$/i, size: 15, lh: { unit: 'PERCENT', value: 90 }, ls: { unit: 'PERCENT', value: -2 }, textCase: 'ORIGINAL', familyVar: 'font/family/Grotesk', sizeVar: 'font/size/M', fromTable: true },
  { name: 'text/description', family: PIX, weight: 'Regular', size: 30, lh: { unit: 'AUTO' }, ls: { unit: 'PERCENT', value: -3 }, textCase: 'UPPER', familyVar: 'font/family/Pixel', sizeVar: 'font/size/description' },
  { name: 'text/pixel', family: PIX, weight: 'Regular', size: 10, lh: { unit: 'AUTO' }, ls: { unit: 'PERCENT', value: 20 }, textCase: 'UPPER', familyVar: 'font/family/Pixel', sizeVar: null },
  { name: 'text/grotesk', family: AKK, weight: 'Regular', size: 11, lh: { unit: 'AUTO' }, ls: { unit: 'PERCENT', value: 0 }, textCase: 'ORIGINAL', familyVar: 'font/family/Grotesk', sizeVar: 'font/size/text - gr' },
  { name: 'text/grotesk-bold', family: AKK, weight: /^bold$/i, size: 11, lh: { unit: 'PERCENT', value: 90 }, ls: { unit: 'PERCENT', value: 0 }, textCase: 'ORIGINAL', familyVar: 'font/family/Grotesk', sizeVar: 'font/size/text - gr', fromTable: true },
  { name: 'text/caps', family: AKK, weight: 'Regular', size: 8, lh: { unit: 'AUTO' }, ls: { unit: 'PERCENT', value: 20 }, textCase: 'UPPER', familyVar: 'font/family/Grotesk', sizeVar: 'font/size/caps' },
];

const TOL = 0.05;
const near = (a, b) => Math.abs(a - b) < TOL;
const sameLH = (a, b) => a.unit === b.unit && (a.unit === 'AUTO' || near(a.value, b.value));
const sameLS = (a, b) => {
  if (a.unit === b.unit) return near(a.value, b.value);
  return near(a.value, 0) && near(b.value, 0);
};
const fmtLH = l => (l.unit === 'AUTO' ? 'auto' : +l.value.toFixed(2) + (l.unit === 'PIXELS' ? 'px' : '%'));
const fmtLS = l => +l.value.toFixed(2) + (l.unit === 'PIXELS' ? 'px' : '%');
const SEG_FIELDS = ['fontName', 'fontSize', 'lineHeight', 'letterSpacing', 'textCase', 'textDecoration', 'paragraphSpacing', 'paragraphIndent', 'listSpacing'];

// Paragraph/box settings a text style also carries. Applying a style overwrites
// them, so each style copies the value its layers actually use (e.g. text box
// trim = CAP_HEIGHT) and layers with a different value are left alone.
const extraSig = (node, seg) => [node.leadingTrim, seg.paragraphSpacing, seg.paragraphIndent, seg.listSpacing, node.hangingPunctuation, node.hangingList].join('|');

function matchDef(seg, node) {
  for (const d of DEFS) {
    if (!d.resolvedWeight) continue;
    if (seg.fontName.family === d.family && seg.fontName.style === d.resolvedWeight && near(seg.fontSize, d.size) &&
        sameLH(seg.lineHeight, d.lh) && sameLS(seg.letterSpacing, d.ls) && seg.textCase === d.textCase && seg.textDecoration === 'NONE' &&
        (!node || !d.sig || extraSig(node, seg) === d.sig)) return d;
  }
  return null;
}

function insideInstance(n) {
  let p = n.parent;
  while (p && p.type !== 'PAGE') { if (p.type === 'INSTANCE') return true; p = p.parent; }
  return false;
}

function fnv(bytes) {
  let h = 0x811c9dc5;
  for (let i = 0; i < bytes.length; i++) { h ^= bytes[i]; h = Math.imul(h, 0x01000193) >>> 0; }
  return h.toString(16);
}

function hashTargets() {
  const t = [];
  for (const page of figma.root.children) {
    for (const c of page.children) {
      if (c.type === 'SECTION') t.push(...c.children); else t.push(c);
    }
  }
  return t;
}

async function snapshot(targets) {
  const map = {};
  for (const n of targets) {
    try { map[n.id] = fnv(await n.exportAsync({ format: 'PNG', constraint: { type: 'SCALE', value: 0.5 } })); }
    catch (e) { map[n.id] = 'ERR'; }
  }
  return map;
}

function progress(text) { figma.ui.postMessage({ type: 'progress', text }); }

async function run(apply) {
  const log = [];
  await figma.loadAllPagesAsync();

  // Resolve font weights against installed fonts.
  const installed = await figma.listAvailableFontsAsync();
  const stylesOf = fam => installed.filter(f => f.fontName.family === fam).map(f => f.fontName.style);
  for (const d of DEFS) {
    const avail = stylesOf(d.family);
    d.resolvedWeight = typeof d.weight === 'string' ? (avail.indexOf(d.weight) >= 0 ? d.weight : null) : (avail.find(s => d.weight.test(s)) || null);
    if (!d.resolvedWeight) log.push('⚠ ' + d.name + ': font "' + d.family + '" ' + d.weight + ' is not installed (installed: ' + (avail.join(', ') || 'none') + ') → style skipped');
  }

  // Variables by name.
  const vars = {};
  for (const v of await figma.variables.getLocalVariablesAsync()) vars[v.name] = v;

  // Refuse to run on a file where these styles were already applied: the
  // layers' original settings are gone there. Restore the backup version first.
  const clash = (await figma.getLocalTextStylesAsync()).filter(s => DEFS.some(d => d.name === s.name)).map(s => s.name);
  if (clash.length) {
    figma.ui.postMessage({ type: 'done', text: 'STOPPED — nothing changed.\n\nThis file already has these text styles: ' + clash.join(', ') + '.\nRestore the version "Before text styles" (File → Show version history → right-click → Restore this version), then run the plugin again.' });
    return;
  }

  // Census.
  progress('Scanning text layers…');
  const texts = figma.root.findAllWithCriteria({ types: ['TEXT'] });
  const own = [], inInst = [];
  for (const t of texts) (insideInstance(t) ? inInst : own).push(t);

  // Each style takes the box/paragraph settings most of its layers use.
  const sigCount = {};
  for (const t of own) {
    if (t.hasMissingFont) continue;
    for (const s of t.getStyledTextSegments(SEG_FIELDS)) {
      const d = matchDef(s, null); if (!d) continue;
      const c = sigCount[d.name] || (sigCount[d.name] = {}); const k = extraSig(t, s); c[k] = (c[k] || 0) + 1;
    }
  }
  const allSig = {};
  for (const n in sigCount) for (const k in sigCount[n]) allSig[k] = (allSig[k] || 0) + sigCount[n][k];
  const top = c => Object.keys(c).sort((a, b) => c[b] - c[a])[0] || null;
  const fallbackSig = top(allSig) || 'NONE|0|0|0|false|false';
  for (const d of DEFS) d.sig = sigCount[d.name] ? top(sigCount[d.name]) : null;

  const plan = []; // { node, ranges: [{start,end,def}], whole }
  const unmatched = {};
  const perStyle = {};
  const sample = {};
  const scan = (list, isInst) => {
    for (const t of list) {
      if (t.hasMissingFont) { const k = 'missing font: ' + t.getStyledTextSegments(['fontName']).map(s => s.fontName.family + ' ' + s.fontName.style).join(' + '); unmatched[k] = (unmatched[k] || 0) + 1; continue; }
      const segs = t.getStyledTextSegments(SEG_FIELDS);
      const ranges = [];
      for (const s of segs) {
        const d = matchDef(s, t);
        if (d) { ranges.push({ start: s.start, end: s.end, def: d }); if (!sample[d.name]) sample[d.name] = { seg: s, node: t }; }
        else if (!isInst) {
          const loose = matchDef(s, null);
          const k = loose ? loose.name + ' look, but different box/paragraph settings (' + extraSig(t, s) + ' vs ' + loose.sig + ')'
            : s.fontName.family + ' ' + s.fontName.style + ' · ' + s.fontSize + ' · lh ' + fmtLH(s.lineHeight) + ' · ls ' + fmtLS(s.letterSpacing) + ' · ' + s.textCase;
          unmatched[k] = (unmatched[k] || 0) + 1;
        }
      }
      if (ranges.length) plan.push({ node: t, ranges, whole: ranges.length === segs.length && ranges.every(r => r.def === ranges[0].def) && segs.length === 1, isInst });
      if (!isInst) for (const r of ranges) perStyle[r.def.name] = (perStyle[r.def.name] || 0) + 1;
    }
  };
  scan(own, false);

  log.push('Text layers: ' + texts.length + ' total, ' + own.length + ' own (not inside instances).');
  log.push('');
  log.push('Styles (own layers that will use them):');
  for (const d of DEFS) log.push('  ' + d.name + ' — ' + d.family + ' ' + (d.resolvedWeight || '✗') + ' ' + d.size + ', lh ' + fmtLH(d.lh) + ', ls ' + fmtLS(d.ls) + (d.textCase === 'UPPER' ? ', UPPER' : '') + ', trim ' + (d.sig || fallbackSig).split('|')[0] + ' → ' + (perStyle[d.name] || 0) + (d.fromTable ? ' (from table)' : ''));
  log.push('');
  log.push('Left without a style (own layers):');
  Object.keys(unmatched).sort((a, b) => unmatched[b] - unmatched[a]).forEach(k => log.push('  ' + unmatched[k] + '× ' + k));

  if (!apply) { figma.ui.postMessage({ type: 'done', text: 'CHECK ONLY — nothing changed.\n\n' + log.join('\n') }); return; }

  // Before snapshot.
  const targets = hashTargets();
  progress('Rendering ' + targets.length + ' areas (before)…');
  const before = await snapshot(targets);

  // Load fonts.
  const fontKeys = {};
  for (const d of DEFS) if (d.resolvedWeight) fontKeys[d.family + '\u0000' + d.resolvedWeight] = { family: d.family, style: d.resolvedWeight };
  for (const p of plan) for (const s of p.node.getStyledTextSegments(['fontName'])) fontKeys[s.fontName.family + '\u0000' + s.fontName.style] = s.fontName;
  for (const k in fontKeys) await figma.loadFontAsync(fontKeys[k]);

  // Create or update styles.
  progress('Creating styles…');
  const existing = {};
  for (const s of await figma.getLocalTextStylesAsync()) existing[s.name] = s;
  const created = [], updated = [];
  for (const d of DEFS) {
    if (!d.resolvedWeight) continue;
    let st = existing[d.name];
    if (st) updated.push(d.name); else { st = figma.createTextStyle(); st.name = d.name; created.push(d.name); }
    const s = sample[d.name] ? sample[d.name].seg : null; // copy exact values from a real layer when one exists
    const x = (d.sig || fallbackSig).split('|');
    st.fontName = { family: d.family, style: d.resolvedWeight };
    st.fontSize = d.size;
    st.lineHeight = s ? s.lineHeight : d.lh;
    st.letterSpacing = s ? s.letterSpacing : d.ls;
    st.textCase = d.textCase;
    st.textDecoration = 'NONE';
    st.leadingTrim = x[0];
    st.paragraphSpacing = +x[1];
    st.paragraphIndent = +x[2];
    st.listSpacing = +x[3];
    st.hangingPunctuation = x[4] === 'true';
    st.hangingList = x[5] === 'true';
    st.description = (d.fromTable ? 'From Typography table (not used in designs yet). ' : '') + 'CSS: .' + d.name.replace('/', '-');
    if (d.familyVar && vars[d.familyVar]) st.setBoundVariable('fontFamily', vars[d.familyVar]);
    else if (d.familyVar) log.push('⚠ variable ' + d.familyVar + ' not found');
    if (d.sizeVar && vars[d.sizeVar]) st.setBoundVariable('fontSize', vars[d.sizeVar]);
    else if (d.sizeVar) log.push('⚠ variable ' + d.sizeVar + ' not found');
    d.styleId = st.id;
  }

  // Apply to own layers (main components and frames).
  progress('Applying styles…');
  let applied = 0, failed = [];
  const applyPlan = async p => {
    try {
      if (p.whole) await p.node.setTextStyleIdAsync(p.ranges[0].def.styleId);
      else for (const r of p.ranges) await p.node.setRangeTextStyleIdAsync(r.start, r.end, r.def.styleId);
      applied++;
    } catch (e) { failed.push(p.node.id + ' ' + p.node.name + ': ' + String(e)); }
  };
  for (const p of plan) await applyPlan(p);

  // Instance texts that kept local font overrides: apply where they still match.
  const instPlan = [];
  for (const t of inInst) {
    if (t.hasMissingFont) continue;
    const segs = t.getStyledTextSegments(SEG_FIELDS.concat(['textStyleId']));
    const ranges = [];
    for (const s of segs) { const d = matchDef(s, t); if (d && d.styleId && s.textStyleId !== d.styleId) ranges.push({ start: s.start, end: s.end, def: d }); }
    if (ranges.length) instPlan.push({ node: t, ranges, whole: segs.length === 1 && ranges.length === 1 });
  }
  for (const p of instPlan) { for (const s of p.node.getStyledTextSegments(['fontName'])) await figma.loadFontAsync(s.fontName); await applyPlan(p); }

  // After snapshot + compare.
  progress('Rendering ' + targets.length + ' areas (after)…');
  const after = await snapshot(targets);
  const changed = targets.filter(n => before[n.id] !== after[n.id]).map(n => n.parent.name + ' / ' + n.name + ' (' + n.id + ')');

  const head = [
    'APPLIED.',
    'Styles created: ' + created.length + (updated.length ? ', updated: ' + updated.length : ''),
    'Layers styled: ' + (plan.length + instPlan.length - failed.length) + ' (' + plan.length + ' own, ' + instPlan.length + ' instance overrides)',
    'Visual check: ' + (targets.length - changed.length) + '/' + targets.length + ' areas pixel-identical',
  ];
  if (changed.length) head.push('⚠ CHANGED AREAS (press Ctrl+Z to undo if unexpected):', ...changed.map(c => '  ' + c));
  if (failed.length) head.push('⚠ FAILED:', ...failed.slice(0, 30).map(f => '  ' + f));
  figma.ui.postMessage({ type: 'done', text: head.join('\n') + '\n\n' + log.join('\n') });
}

figma.showUI(__html__, { width: 460, height: 520 });
figma.ui.onmessage = async msg => {
  try { await run(msg.type === 'apply'); }
  catch (e) { figma.ui.postMessage({ type: 'error', text: 'Error: ' + (e && e.stack ? e.stack : String(e)) }); }
};
