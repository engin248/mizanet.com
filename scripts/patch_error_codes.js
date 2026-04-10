/**
 * MİZANET — ERR KOD YAMA SCRIPTİ
 * 43 API route dosyasına errorCore import + ERR hata kodu ekler.
 * 
 * Çalıştırma: node scripts/patch_error_codes.js
 */

const fs = require('fs');
const path = require('path');

const API_BASE = path.join(__dirname, '..', 'src', 'app', 'api');

// ─── HATA KODU HARİTASI ──────────────────────────
// Format: ERR-{MODUL}-RT-{NUMARA}
const ROUTE_ERROR_MAP = {
  // AUTH modülü
  '2fa-dogrula':      { kod: 'ERR-AUTH-RT-001', modul: 'AUTH' },
  '2fa-kurulum':      { kod: 'ERR-AUTH-RT-002', modul: 'AUTH' },
  'pin-dogrula':      { kod: 'ERR-AUTH-RT-003', modul: 'AUTH' },
  'cikis':            { kod: 'ERR-AUTH-RT-005', modul: 'AUTH' },

  // AJN (Ajan) modülü
  'ai-kahin-ajan':    { kod: 'ERR-AJN-RT-002', modul: 'AJN' },
  'ajan-calistir':    { kod: 'ERR-AJN-RT-003', modul: 'AJN' },
  'ajan-orkestrator': { kod: 'ERR-AJN-RT-004', modul: 'AJN' },
  'ajan-tetikle':     { kod: 'ERR-AJN-RT-005', modul: 'AJN' },
  'ajan-yargic':      { kod: 'ERR-AJN-RT-006', modul: 'AJN' },
  'cron-ajanlar':     { kod: 'ERR-AJN-RT-007', modul: 'AJN' },
  'worker-ajan':      { kod: 'ERR-AJN-RT-009', modul: 'AJN' },
  'kopru-ajan':       { kod: 'ERR-AJN-RT-011', modul: 'AJN' },
  'batch-ai':         { kod: 'ERR-AJN-RT-012', modul: 'AJN' },

  // SYS (Sistem) modülü
  'health':           { kod: 'ERR-SYS-RT-003', modul: 'SYS' },
  'b2b-webhook-tetikle': { kod: 'ERR-SYS-RT-006', modul: 'SYS' },
  'kuyruk-motoru':    { kod: 'ERR-SYS-RT-007', modul: 'SYS' },
  'stress-test':      { kod: 'ERR-SYS-RT-009', modul: 'SYS' },
  'beyaz-saha':       { kod: 'ERR-SYS-RT-010', modul: 'SYS' },

  // ARG (Ar-Ge) modülü
  'deepseek-analiz':  { kod: 'ERR-ARG-RT-001', modul: 'ARG' },
  'm1-motor-test':    { kod: 'ERR-ARG-RT-002', modul: 'ARG' },
  'm1-scraper-webhook': { kod: 'ERR-ARG-RT-003', modul: 'ARG' },
  'serp-trend':       { kod: 'ERR-ARG-RT-005', modul: 'ARG' },
  'trend-ara':        { kod: 'ERR-ARG-RT-006', modul: 'ARG' },
  'perplexity-arama': { kod: 'ERR-ARG-RT-007', modul: 'ARG' },
  'veri-getir':       { kod: 'ERR-ARG-RT-008', modul: 'ARG' },
  'model-hafizasi':   { kod: 'ERR-ARG-RT-009', modul: 'ARG' },

  // KMR (Kamera) modülü
  'kamera-sayac':     { kod: 'ERR-KMR-RT-001', modul: 'KMR' },
  'stream-durum':     { kod: 'ERR-KMR-RT-003', modul: 'KMR' },
  'm4-vision':        { kod: 'ERR-KMR-RT-004', modul: 'KMR' },

  // HBR (Haberleşme) modülü
  'telegram-bildirim': { kod: 'ERR-HBR-RT-005', modul: 'HBR' },
  'telegram-foto':    { kod: 'ERR-HBR-RT-006', modul: 'HBR' },
  'telegram-webhook': { kod: 'ERR-HBR-RT-007', modul: 'HBR' },

  // RPR (Rapor) modülü
  'atil-sermaye':     { kod: 'ERR-RPR-RT-001', modul: 'RPR' },
  'darbogaz':         { kod: 'ERR-RPR-RT-002', modul: 'RPR' },
  'kor-nokta':        { kod: 'ERR-RPR-RT-003', modul: 'RPR' },
  'kumbaraci':        { kod: 'ERR-RPR-RT-004', modul: 'RPR' },
  'mevsimsel-muneccim': { kod: 'ERR-RPR-RT-005', modul: 'RPR' },
  'sabika-kaydi':     { kod: 'ERR-RPR-RT-006', modul: 'RPR' },
  'sistem-hafizasi':  { kod: 'ERR-RPR-RT-007', modul: 'RPR' },
  'yirtici-firsat':   { kod: 'ERR-RPR-RT-008', modul: 'RPR' },
  'kasif':            { kod: 'ERR-RPR-RT-009', modul: 'RPR' },

  // DNT (Denetim/Test) modülü
  'ajan2-analist':    { kod: 'ERR-DNT-RT-001', modul: 'DNT' },
};

const IMPORT_LINE = "import { handleError, logCatch } from '@/lib/errorCore';";

let patchedCount = 0;
let skippedCount = 0;
let errorCount = 0;
const results = [];

function findRouteFiles(dir) {
  const files = [];
  const items = fs.readdirSync(dir, { withFileTypes: true });
  for (const item of items) {
    const fullPath = path.join(dir, item.name);
    if (item.isDirectory()) {
      files.push(...findRouteFiles(fullPath));
    } else if (item.name === 'route.js') {
      files.push(fullPath);
    }
  }
  return files;
}

function getRouteName(filePath) {
  // src/app/api/{name}/route.js → name
  // src/app/api/{parent}/{name}/route.js → name
  const parts = filePath.replace(/\\/g, '/').split('/');
  const routeIdx = parts.indexOf('route.js');
  return parts[routeIdx - 1];
}

function patchFile(filePath) {
  const routeName = getRouteName(filePath);
  const mapping = ROUTE_ERROR_MAP[routeName];
  
  if (!mapping) {
    results.push({ file: routeName, status: 'ATLANILDI', reason: 'Haritada yok' });
    skippedCount++;
    return;
  }

  let content = fs.readFileSync(filePath, 'utf-8');

  // Zaten errorCore import ediyorsa atla
  if (content.includes('errorCore')) {
    results.push({ file: routeName, status: 'ZATEN_VAR', reason: 'errorCore import mevcut' });
    skippedCount++;
    return;
  }

  // 1. Import ekle (ilk import satırından sonra)
  const importRegex = /^(import .+;\r?\n)/m;
  if (importRegex.test(content)) {
    content = content.replace(importRegex, `$1${IMPORT_LINE}\n`);
  } else {
    // import yoksa dosyanın başına ekle
    content = `${IMPORT_LINE}\n\n${content}`;
  }

  // 2. catch bloklarını yama — generic console.error → handleError
  // Pattern: } catch (error) { console.error(...); 
  const catchPatterns = [
    // console.error('[...']', error); → handleError(...)
    {
      find: /} catch \((error|e|err)\) \{\s*\n\s*console\.error\([^)]*\);\s*\n\s*return NextResponse\.json\(\{ error: (?:error|e|err)\.message \}, \{ status: 500 \}\);/g,
      replace: `} catch ($1) {\n        handleError('${mapping.kod}', 'api/${routeName}', $1, 'yuksek');\n        return NextResponse.json({ error: $1.message, hataKodu: '${mapping.kod}' }, { status: 500 });`
    },
    // console.error('[TAG]', error); return ...
    {
      find: /console\.error\(\s*['"`]\[([^\]]*)\]['"`]\s*,\s*(error|e|err)\s*\);\s*\n(\s*)return NextResponse\.json\(\s*\{\s*error:\s*(error|e|err)\.message\s*\}\s*,\s*\{\s*status:\s*500\s*\}\s*\)/g,
      replace: `handleError('${mapping.kod}', 'api/${routeName}', $2, 'yuksek');\n$3return NextResponse.json({ error: $2.message, hataKodu: '${mapping.kod}' }, { status: 500 })`
    },
    // Sadece console.error varsa ama return yoksa
    {
      find: /} catch \((_)\) \{\s*console\.error\([^)]*\);\s*\}/g,
      replace: `} catch ($1) { logCatch('${mapping.kod}', 'api/${routeName}', $1); }`
    },
    // [KÖR NOKTA ZIRHI - YUTULAN HATA] pattern
    {
      find: /console\.error\(\s*'\[KÖR NOKTA ZIRHI - YUTULAN HATA\][^']*'\s*\)/g,
      replace: `logCatch('${mapping.kod}', 'api/${routeName}', new Error('Yutulan hata'))`
    }
  ];

  for (const pat of catchPatterns) {
    content = content.replace(pat.find, pat.replace);
  }

  fs.writeFileSync(filePath, content, 'utf-8');
  results.push({ file: routeName, status: 'YAMALANDI', kod: mapping.kod });
  patchedCount++;
}

// ─── ANA İŞLEM ─────────────────────────────────────
console.log('MİZANET ERR KOD YAMA SCRIPTİ BAŞLATILIYOR...\n');

const allRoutes = findRouteFiles(API_BASE);
console.log(`Toplam route dosyası: ${allRoutes.length}\n`);

for (const routeFile of allRoutes) {
  try {
    const content = fs.readFileSync(routeFile, 'utf-8');
    if (!content.includes('errorCore')) {
      patchFile(routeFile);
    } else {
      const routeName = getRouteName(routeFile);
      results.push({ file: routeName, status: 'ZATEN_VAR', reason: 'errorCore import mevcut' });
      skippedCount++;
    }
  } catch (e) {
    const routeName = getRouteName(routeFile);
    results.push({ file: routeName, status: 'HATA', reason: e.message });
    errorCount++;
  }
}

console.log('=== SONUÇLAR ===');
console.log(`Yamalanan: ${patchedCount}`);
console.log(`Atlanan (zaten var veya haritada yok): ${skippedCount}`);
console.log(`Hata: ${errorCount}`);
console.log('\n=== DETAY ===');
results.forEach(r => {
  const icon = r.status === 'YAMALANDI' ? '✅' : r.status === 'ZATEN_VAR' ? '🔵' : r.status === 'ATLANILDI' ? '⚪' : '🔴';
  console.log(`${icon} ${r.file}: ${r.status} ${r.kod || r.reason || ''}`);
});
