/**
 * MİZANET — TAM SİSTEM ERR KOD YAMASI
 * Tüm features, pages, components, hooks, lib, core dosyalarına
 * errorCore import + ERR hata kodu ekler.
 * 
 * node scripts/patch_all_layers.js
 */
const fs = require('fs');
const path = require('path');

const PROJECT = path.join(__dirname, '..');
const IMPORT_LINE = "import { handleError, logCatch } from '@/lib/errorCore';";

// ─── MODÜL → HATA KODU ÖN EKİ ──────────────────────
const MODULE_MAP = {
  // Features
  'ajanlar': 'AJN', 'arge': 'ARG', 'ayarlar': 'AYR', 'denetmen': 'DNT',
  'giris': 'AUTH', 'gorevler': 'GRV', 'guvenlik': 'GVN', 'haberlesme': 'HBR',
  'imalat': 'URT', 'kalip': 'MDL', 'kameralar': 'KMR', 'karargah': 'KRG',
  'kasa': 'KSA', 'katalog': 'KTL', 'kesim': 'KSM', 'kumas': 'KMS',
  'maliyet': 'MLY', 'modelhane': 'MDL', 'muhasebe': 'MHS', 'musteriler': 'MST',
  'personel': 'PRS', 'raporlar': 'RPR', 'siparisler': 'SPR', 'stok': 'STK',
  'tasarim': 'TSR', 'uretim': 'URT',
  // Hooks (root)
  'useHermAi': 'ARG', 'useKumas': 'KMS', 'useMuhasebe': 'MHS',
  'usePersonel': 'PRS', 'useSiparis': 'SPR', 'useStok': 'STK', 'useUretim': 'URT',
  // Lib
  'apiWrapper': 'SYS', 'bildirim': 'SYS', 'dipArsiv': 'SYS', 'kripto': 'GVN',
  'mesajSifrele': 'GVN', 'modelHafizasi': 'ARG', 'offlineKuyruk': 'SYS',
  'pinUtils': 'AUTH', 'redis_kuyruk': 'SYS', 'silmeYetkiDogrula': 'GVN',
  'TasarimContext': 'TSR', 'utils': 'SYS', 'zodSchemas': 'SYS',
  // Lib agents
  'gecikmeAgent': 'AJN', 'maliyetAgent': 'AJN', 'stokAgent': 'AJN',
  'OluIsciTaburu': 'AJN', 'MatematikciYargic': 'AJN', 'OluIsciScraper': 'AJN',
  'aksamci': 'AJN', 'finansKalkani': 'AJN', 'muhasebeYazici': 'AJN',
  'nabiz': 'AJN', 'sabahSubayi': 'AJN', 'trendKasifi': 'AJN',
  'zincirci': 'AJN', '_ortak': 'AJN',
  // Lib AI
  'aiKararMotoru': 'ARG', 'visionAjanCore': 'KMR',
  // Components
  'MesajBildirimButonu': 'HBR', 'BarkodOkuyucu': 'URT', 'ModelMesajGecmisi': 'HBR',
  // Core
  'AuthProvider': 'AUTH', 'PermissionProvider': 'GVN', 'jwtHelper': 'AUTH',
};

// KATMAN KODU MAP
const LAYER_MAP = {
  'components': 'CM', 'hooks': 'HK', 'services': 'SV',
  'pages': 'PG', 'lib': 'LB', 'core': 'CR', 'agents': 'LB',
  'ai': 'LB', 'app': 'PG',
};

// Sayaç
const counters = {};

function getLayerCode(filePath) {
  const rel = filePath.replace(/\\/g, '/');
  if (rel.includes('/hooks/')) return 'HK';
  if (rel.includes('/components/')) return 'CM';
  if (rel.includes('/services/')) return 'SV';
  if (rel.includes('/core/')) return 'CR';
  if (rel.includes('/lib/')) return 'LB';
  if (rel.includes('/page.js')) return 'PG';
  return 'CM'; // default
}

function getModuleCode(filePath) {
  const rel = filePath.replace(/\\/g, '/');
  const baseName = path.basename(filePath, '.js');

  // Direct filename match
  if (MODULE_MAP[baseName]) return MODULE_MAP[baseName];

  // Feature module match
  const featureMatch = rel.match(/features\/(\w+)\//);
  if (featureMatch && MODULE_MAP[featureMatch[1]]) return MODULE_MAP[featureMatch[1]];

  // Page match
  if (rel.includes('arge_test_paneli')) return 'ARG';
  if (rel.includes('sistem-raporu')) return 'SYS';

  return 'SYS'; // fallback
}

function getErrCode(filePath) {
  const modul = getModuleCode(filePath);
  const katman = getLayerCode(filePath);
  const key = `${modul}-${katman}`;
  counters[key] = (counters[key] || 100) + 1;
  return `ERR-${modul}-${katman}-${counters[key]}`;
}

function getAllJsFiles(dir) {
  const files = [];
  try {
    const items = fs.readdirSync(dir, { withFileTypes: true });
    for (const item of items) {
      const full = path.join(dir, item.name);
      if (item.name === 'node_modules' || item.name === '.next' || item.name === '_archive') continue;
      if (item.isDirectory()) files.push(...getAllJsFiles(full));
      else if (item.name.endsWith('.js') && !item.name.endsWith('.config.js')) files.push(full);
    }
  } catch(e) {}
  return files;
}

let totalPatched = 0;
let totalSkipped = 0;
const results = [];

// Hedef dizinler (API zaten yamalandı, hariç tut)
const targetDirs = [
  path.join(PROJECT, 'src', 'features'),
  path.join(PROJECT, 'src', 'components'),
  path.join(PROJECT, 'src', 'hooks'),
  path.join(PROJECT, 'src', 'lib'),
  path.join(PROJECT, 'src', 'core'),
  path.join(PROJECT, 'src', 'services'),
  path.join(PROJECT, 'src', 'app'), // pages
];

for (const dir of targetDirs) {
  if (!fs.existsSync(dir)) continue;
  const files = getAllJsFiles(dir);

  for (const filePath of files) {
    // API route'ları atla (zaten yamalandı)
    if (filePath.replace(/\\/g, '/').includes('/api/') && filePath.endsWith('route.js')) {
      totalSkipped++;
      continue;
    }

    let content = fs.readFileSync(filePath, 'utf-8');

    // catch bloğu yoksa atla
    if (!content.includes('catch')) {
      totalSkipped++;
      continue;
    }

    // Zaten ERR- kodu varsa atla
    if (/ERR-[A-Z]{2,4}-[A-Z]{2}-\d{3}/.test(content)) {
      totalSkipped++;
      continue;
    }

    const errCode = getErrCode(filePath);
    const relPath = filePath.replace(/\\/g, '/').replace(PROJECT.replace(/\\/g, '/') + '/', '');
    let modified = false;

    // 1. errorCore import ekle (yoksa)
    if (!content.includes('errorCore')) {
      // 'use client' varsa onun altına ekle
      if (content.includes("'use client'") || content.includes('"use client"')) {
        content = content.replace(
          /(['"]use client['"];\s*\n)/,
          `$1${IMPORT_LINE}\n`
        );
        modified = true;
      } else {
        // İlk import'tan sonra ekle
        const importMatch = content.match(/^(import .+;\r?\n)/m);
        if (importMatch) {
          content = content.replace(importMatch[0], importMatch[0] + IMPORT_LINE + '\n');
          modified = true;
        } else {
          content = IMPORT_LINE + '\n\n' + content;
          modified = true;
        }
      }
    }

    // 2. catch bloklarına ERR kodu inject et
    // Her catch bloğunun açılışından sonra handleError/logCatch ekle
    const catchRegex = /(\}\s*catch\s*\((\w+)\)\s*\{)\s*\n/g;
    let match;
    const insertions = [];

    while ((match = catchRegex.exec(content)) !== null) {
      const afterPos = match.index + match[0].length;
      const afterContent = content.substring(afterPos).trimStart();

      // Zaten handleError veya logCatch varsa atla
      if (afterContent.startsWith('handleError(') || afterContent.startsWith('logCatch(') || afterContent.startsWith("handleError('ERR")) continue;

      insertions.push({
        pos: afterPos,
        varName: match[2],
      });
    }

    // Ters sırada inject et
    for (const ins of insertions.reverse()) {
      // console.error satırı varsa onu handleError ile değiştir
      const lineAfter = content.substring(ins.pos).split('\n')[0];
      if (lineAfter.trim().startsWith('console.error(') || lineAfter.trim().startsWith('console.warn(')) {
        const indent = lineAfter.match(/^(\s*)/)[1];
        const endOfLine = ins.pos + lineAfter.length;
        content = content.substring(0, ins.pos) +
          `${indent}handleError('${errCode}', '${relPath}', ${ins.varName}, 'orta');\n` +
          content.substring(endOfLine + 1); // +1 for newline
        modified = true;
      } else {
        // Sadece handleError satırı ekle
        const injection = `        handleError('${errCode}', '${relPath}', ${ins.varName}, 'orta');\n`;
        content = content.substring(0, ins.pos) + injection + content.substring(ins.pos);
        modified = true;
      }
    }

    // 3. Eğer insertions boşsa ama inline catch varsa — inline pattern'i yama
    // Pattern: } catch (e) { console.error(...) }
    if (insertions.length === 0) {
      const inlineCatchRegex = /\}\s*catch\s*\((\w+)\)\s*\{\s*console\.error\([^)]*\);\s*\}/g;
      const before = content;
      content = content.replace(inlineCatchRegex, (m, varName) => {
        return `} catch (${varName}) { logCatch('${errCode}', '${relPath}', ${varName}); }`;
      });
      if (content !== before) modified = true;

      // Pattern: } catch (_) { /* comment */ }
      const silentCatchRegex = /\}\s*catch\s*\((_)\)\s*\{\s*\/\*[^*]*\*\/\s*\}/g;
      const before2 = content;
      content = content.replace(silentCatchRegex, (m, varName) => {
        return `} catch (${varName}) { logCatch('${errCode}', '${relPath}', ${varName}); }`;
      });
      if (content !== before2) modified = true;

      // Pattern: } catch { ... } (no variable)
      const noBraceCatch = /\}\s*catch\s*\{\s*\n/g;
      const before3 = content;
      content = content.replace(noBraceCatch, `} catch (e) {\n        logCatch('${errCode}', '${relPath}', e);\n`);
      if (content !== before3) modified = true;
    }

    if (modified) {
      fs.writeFileSync(filePath, content, 'utf-8');
      totalPatched++;
      results.push({ file: relPath, kod: errCode, status: 'YAMALANDI' });
      console.log(`✅ ${relPath}: ${errCode}`);
    } else {
      totalSkipped++;
    }
  }
}

console.log(`\n${'='.repeat(50)}`);
console.log(`TOPLAM YAMALANAN: ${totalPatched}`);
console.log(`TOPLAM ATLANAN: ${totalSkipped}`);
console.log(`${'='.repeat(50)}`);

// Sonuçları JSON olarak kaydet
const auditPath = path.join(PROJECT, '..', '..', '..', 'agent_audit', 'ERR_PATCH_ALL_RESULTS.json');
try {
  fs.writeFileSync(auditPath, JSON.stringify({
    timestamp: new Date().toISOString(),
    totalPatched,
    totalSkipped,
    results,
  }, null, 2));
  console.log(`\nAudit kaydı: ${auditPath}`);
} catch(e) {
  console.log('Audit dosyası yazılamadı:', e.message);
}
