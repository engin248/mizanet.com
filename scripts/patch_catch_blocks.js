/**
 * MİZANET — CATCH BLOK YAMASI (2. FAZ)
 * import eklendi ama catch bloklarında ERR- kodu kullanılmıyor.
 * Bu script catch bloklarını doğrudan yamalıyor.
 */
const fs = require('fs');
const path = require('path');

const API_BASE = path.join(__dirname, '..', 'src', 'app', 'api');

const ROUTE_ERROR_MAP = {
  '2fa-dogrula': 'ERR-AUTH-RT-001',
  '2fa-kurulum': 'ERR-AUTH-RT-002',
  'pin-dogrula': 'ERR-AUTH-RT-003',
  'cikis': 'ERR-AUTH-RT-005',
  'ai-kahin-ajan': 'ERR-AJN-RT-002',
  'ajan-calistir': 'ERR-AJN-RT-003',
  'ajan-orkestrator': 'ERR-AJN-RT-004',
  'ajan-tetikle': 'ERR-AJN-RT-005',
  'ajan-yargic': 'ERR-AJN-RT-006',
  'cron-ajanlar': 'ERR-AJN-RT-007',
  'worker-ajan': 'ERR-AJN-RT-009',
  'kopru-ajan': 'ERR-AJN-RT-011',
  'batch-ai': 'ERR-AJN-RT-012',
  'health': 'ERR-SYS-RT-003',
  'b2b-webhook-tetikle': 'ERR-SYS-RT-006',
  'kuyruk-motoru': 'ERR-SYS-RT-007',
  'stress-test': 'ERR-SYS-RT-009',
  'beyaz-saha': 'ERR-SYS-RT-010',
  'deepseek-analiz': 'ERR-ARG-RT-001',
  'm1-motor-test': 'ERR-ARG-RT-002',
  'm1-scraper-webhook': 'ERR-ARG-RT-003',
  'serp-trend': 'ERR-ARG-RT-005',
  'trend-ara': 'ERR-ARG-RT-006',
  'perplexity-arama': 'ERR-ARG-RT-007',
  'veri-getir': 'ERR-ARG-RT-008',
  'model-hafizasi': 'ERR-ARG-RT-009',
  'kamera-sayac': 'ERR-KMR-RT-001',
  'stream-durum': 'ERR-KMR-RT-003',
  'm4-vision': 'ERR-KMR-RT-004',
  'telegram-bildirim': 'ERR-HBR-RT-005',
  'telegram-foto': 'ERR-HBR-RT-006',
  'telegram-webhook': 'ERR-HBR-RT-007',
  'atil-sermaye': 'ERR-RPR-RT-001',
  'darbogaz': 'ERR-RPR-RT-002',
  'kor-nokta': 'ERR-RPR-RT-003',
  'kumbaraci': 'ERR-RPR-RT-004',
  'mevsimsel-muneccim': 'ERR-RPR-RT-005',
  'sabika-kaydi': 'ERR-RPR-RT-006',
  'sistem-hafizasi': 'ERR-RPR-RT-007',
  'yirtici-firsat': 'ERR-RPR-RT-008',
  'kasif': 'ERR-RPR-RT-009',
  'ajan2-analist': 'ERR-DNT-RT-001',
};

function findRouteFiles(dir) {
  const files = [];
  try {
    const items = fs.readdirSync(dir, { withFileTypes: true });
    for (const item of items) {
      const fullPath = path.join(dir, item.name);
      if (item.isDirectory()) files.push(...findRouteFiles(fullPath));
      else if (item.name === 'route.js') files.push(fullPath);
    }
  } catch(e) {}
  return files;
}

function getRouteName(filePath) {
  const parts = filePath.replace(/\\/g, '/').split('/');
  const idx = parts.indexOf('route.js');
  return parts[idx - 1];
}

let patched = 0;
let skipped = 0;

const allRoutes = findRouteFiles(API_BASE);

for (const filePath of allRoutes) {
  const routeName = getRouteName(filePath);
  const errCode = ROUTE_ERROR_MAP[routeName];
  if (!errCode) { skipped++; continue; }

  let content = fs.readFileSync(filePath, 'utf-8');

  // Zaten bu ERR kodunu içeriyorsa atla
  if (content.includes(errCode)) { skipped++; continue; }

  const relPath = 'api/' + filePath.replace(/\\/g, '/').split('/api/')[1].replace('/route.js', '');

  // Strategy: find ALL catch blocks and inject handleError AFTER the opening {
  // Pattern: catch (varName) { ile başlayan bloklar
  const lines = content.split('\n');
  const newLines = [];
  let modified = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    newLines.push(line);

    // catch (...) { pattern'ini bul — aynı satırda veya sonraki satırda
    const catchMatch = line.match(/\}\s*catch\s*\((\w+)\)\s*\{/);
    if (catchMatch) {
      const varName = catchMatch[1];
      const nextLine = lines[i + 1] ? lines[i + 1].trim() : '';
      
      // Sonraki satır zaten handleError veya logCatch çağrısıysa atla
      if (nextLine.startsWith('handleError(') || nextLine.startsWith('logCatch(')) continue;
      
      // Sonraki satır console.error ise, console.error'ı handleError ile değiştir
      if (nextLine.startsWith('console.error(')) {
        // console.error satırını handleError ile değiştir
        const indent = lines[i + 1].match(/^(\s*)/)[1];
        lines[i + 1] = `${indent}handleError('${errCode}', '${relPath}', ${varName}, 'yuksek');`;
        modified = true;
        // Yeniden newLines'a ekle (eski satırı sil, yenisini ekle)
        newLines.pop(); // catch satırını çıkar
        newLines.push(line); // tekrar ekle, bir sonraki satır loop'ta eklenecek
      } else if (nextLine.startsWith('return NextResponse.json') || nextLine === '') {
        // handleError satırı ekle
        const indent = line.match(/\}\s*catch/) ? '        ' : '    ';
        newLines.push(`${indent}handleError('${errCode}', '${relPath}', ${varName}, 'yuksek');`);
        modified = true;
      }
    }
  }

  if (modified) {
    // Tekrar oluştur
    content = fs.readFileSync(filePath, 'utf-8');
  }

  // Daha basit yaklaşım: tüm console.error satırlarını catch bloğu içindekileri handleError ile değiştir
  // Ve dosyanın sonundaki ana catch bloğuna handleError ekle

  // Ana catch bloğunu bul — genellikle dosyanın son catch bloğu
  // Pattern: } catch (e/error/err) {\n   console.error...\n   return NextResponse...
  
  const replacements = [
    // Pattern 1: console.error('[TAG]', error/e); + return NextResponse... status 500
    [
      /(\}\s*catch\s*\((\w+)\)\s*\{)\s*\n(\s*)console\.error\([^;]*\);\s*\n(\s*return\s+NextResponse\.json\(\s*\{[^}]*\}\s*,\s*\{\s*status:\s*500\s*\}\s*\);)/g,
      (match, catchLine, varName, indent, returnLine) => {
        return `${catchLine}\n${indent}handleError('${errCode}', '${relPath}', ${varName}, 'yuksek');\n${returnLine.replace(/\}\s*,/, `, hataKodu: '${errCode}' },`)}`
      }
    ],
    // Pattern 2: console.error('[KÖR NOKTA ZIRHI ...]'); — sessiz catch
    [
      /console\.error\(\s*'\[KÖR NOKTA ZIRHI[^']*'\s*\)/g,
      `logCatch('${errCode}', '${relPath}', new Error('Kor Nokta'))`
    ],
    // Pattern 3: console.error('[TAG]', error); alone (not followed by return)
    [
      /(\}\s*catch\s*\((\w+)\)\s*\{)\s*\n(\s*)console\.error\([^;]*\);\s*\n(\s*\})/g,
      (match, catchLine, varName, indent, closeBrace) => {
        return `${catchLine}\n${indent}logCatch('${errCode}', '${relPath}', ${varName});\n${closeBrace}`
      }
    ],
  ];

  content = fs.readFileSync(filePath, 'utf-8');
  let wasModified = false;

  for (const [pattern, replacement] of replacements) {
    const before = content;
    content = content.replace(pattern, replacement);
    if (content !== before) wasModified = true;
  }

  // Son çare: eğer hala ERR kodu yoksa, her catch bloğuna handleError satırı inject et
  if (!content.includes(errCode)) {
    const catchRegex = /(\}\s*catch\s*\((\w+)\)\s*\{)\s*\n/g;
    let match;
    const insertions = [];
    while ((match = catchRegex.exec(content)) !== null) {
      const afterCatch = content.substring(match.index + match[0].length);
      // Zaten handleError veya logCatch varsa atla
      if (afterCatch.trimStart().startsWith('handleError(') || afterCatch.trimStart().startsWith('logCatch(')) continue;
      insertions.push({
        pos: match.index + match[0].length,
        varName: match[2],
      });
    }
    
    // Ters sırada inject et (pozisyonlar kaymasın)
    for (const ins of insertions.reverse()) {
      const injection = `        handleError('${errCode}', '${relPath}', ${ins.varName}, 'yuksek');\n`;
      content = content.substring(0, ins.pos) + injection + content.substring(ins.pos);
      wasModified = true;
    }
  }

  if (wasModified || !content.includes(errCode)) {
    // Son kontrol: hala yoksa dosyanın son catch'ine zorla ekle
    if (!content.includes(errCode)) {
      const lastCatchIdx = content.lastIndexOf('} catch (');
      if (lastCatchIdx !== -1) {
        const afterBrace = content.indexOf('{', lastCatchIdx + 8);
        if (afterBrace !== -1) {
          const insertPos = afterBrace + 1;
          const varMatch = content.substring(lastCatchIdx).match(/catch\s*\((\w+)\)/);
          const varName = varMatch ? varMatch[1] : 'e';
          content = content.substring(0, insertPos) + 
            `\n        handleError('${errCode}', '${relPath}', ${varName}, 'yuksek');` + 
            content.substring(insertPos);
          wasModified = true;
        }
      }
    }
  }

  if (wasModified) {
    fs.writeFileSync(filePath, content, 'utf-8');
    patched++;
    console.log(`✅ ${routeName}: ${errCode}`);
  } else {
    skipped++;
    console.log(`⚪ ${routeName}: değişiklik yok`);
  }
}

console.log(`\nSONUÇ: ${patched} yamalandı, ${skipped} atlandı`);
