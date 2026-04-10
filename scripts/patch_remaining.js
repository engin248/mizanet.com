/**
 * MİZANET — KALAN 24 DOSYA İÇİN ZORLA ERR KOD YAMASI
 * Önceki script'in yakalayamadığı catch pattern'lerini zorla yamalıyor.
 */
const fs = require('fs');
const path = require('path');

const PROJECT = 'C:\\Users\\Esisya\\Desktop\\Mizanet';

const FILES = [
  { file: 'src/features/ayarlar/services/ayarlarApi.js', kod: 'ERR-AYR-SV-101' },
  { file: 'src/features/denetmen/hooks/useDenetmen.js', kod: 'ERR-DNT-HK-101' },
  { file: 'src/features/gorevler/components/GorevlerMainContainer.js', kod: 'ERR-GRV-CM-101' },
  { file: 'src/features/gorevler/hooks/useGorevler.js', kod: 'ERR-GRV-HK-101' },
  { file: 'src/features/guvenlik/hooks/useGuvenlik.js', kod: 'ERR-GVN-HK-101' },
  { file: 'src/features/imalat/hooks/useImalat.js', kod: 'ERR-URT-HK-101' },
  { file: 'src/features/kalip/hooks/useKalip.js', kod: 'ERR-MDL-HK-101' },
  { file: 'src/features/karargah/components/KarargahMainContainer.js', kod: 'ERR-KRG-CM-101' },
  { file: 'src/features/kasa/hooks/useKasa.js', kod: 'ERR-KSA-HK-101' },
  { file: 'src/features/kesim/hooks/useKesim.js', kod: 'ERR-KSM-HK-101' },
  { file: 'src/features/kumas/services/kumasApi.js', kod: 'ERR-KMS-SV-101' },
  { file: 'src/features/muhasebe/hooks/useMuhasebe.js', kod: 'ERR-MHS-HK-101' },
  { file: 'src/features/musteriler/hooks/useMusteriler.js', kod: 'ERR-MST-HK-101' },
  { file: 'src/features/raporlar/components/RaporlarMainContainer.js', kod: 'ERR-RPR-CM-101' },
  { file: 'src/features/siparisler/hooks/useSiparisler.js', kod: 'ERR-SPR-HK-101' },
  { file: 'src/features/stok/hooks/useStok.js', kod: 'ERR-STK-HK-101' },
  { file: 'src/features/stok/services/stokApi.js', kod: 'ERR-STK-SV-101' },
  { file: 'src/features/uretim/components/UretimSayfasi.js', kod: 'ERR-URT-CM-103' },
  { file: 'src/components/MesajBildirimButonu.js', kod: 'ERR-HBR-CM-101' },
  { file: 'src/components/barkod/BarkodOkuyucu.js', kod: 'ERR-URT-CM-104' },
  { file: 'src/lib/pinUtils.js', kod: 'ERR-AUTH-LB-101' },
  { file: 'src/lib/utils.js', kod: 'ERR-SYS-LB-106' },
  { file: 'src/lib/components/barkod/BarkodOkuyucu.js', kod: 'ERR-URT-CM-105' },
  { file: 'src/app/sistem-raporu/page.js', kod: 'ERR-SYS-PG-101' },
];

let patched = 0;

for (const entry of FILES) {
  const filePath = path.join(PROJECT, entry.file.replace(/\//g, path.sep));
  let content = fs.readFileSync(filePath, 'utf-8');
  
  // Zaten bu ERR kodu varsa atla
  if (content.includes(entry.kod)) {
    console.log(`🔵 ${entry.file}: ZATEN VAR`);
    continue;
  }

  // Satır bazlı işle
  const lines = content.split('\n');
  const newLines = [];
  let modified = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();
    
    // catch bloğu tespit et
    // Pattern 1: } catch (varName) {
    // Pattern 2: catch (varName) {  
    // Pattern 3: } catch { (no variable)
    const catchMatch = trimmed.match(/catch\s*\((\w+)\)\s*\{/);
    const catchNoVar = trimmed.match(/catch\s*\{/);
    
    if (catchMatch || catchNoVar) {
      const varName = catchMatch ? catchMatch[1] : 'e';
      newLines.push(line);
      
      // Sonraki satır zaten handleError/logCatch ise atla
      const nextLine = (i + 1 < lines.length) ? lines[i + 1].trim() : '';
      if (nextLine.includes('handleError(') && nextLine.includes('ERR-')) continue;
      if (nextLine.includes('logCatch(') && nextLine.includes('ERR-')) continue;
      
      // Indent hesapla
      const indent = line.match(/^(\s*)/)[1] + '    ';
      
      // console.error satırı varsa onun ÜSTÜNE ekle, yoksa direkt ekle
      if (nextLine.startsWith('console.error(') || nextLine.startsWith('console.warn(')) {
        newLines.push(`${indent}handleError('${entry.kod}', '${entry.file}', ${varName}, 'orta');`);
        modified = true;
      } else if (nextLine === '' || nextLine.startsWith('return') || nextLine.startsWith('set') || nextLine.startsWith('//')) {
        newLines.push(`${indent}handleError('${entry.kod}', '${entry.file}', ${varName}, 'orta');`);
        modified = true;
      } else {
        // Bilinmeyen pattern — yine de ekle
        newLines.push(`${indent}handleError('${entry.kod}', '${entry.file}', ${varName}, 'orta');`);
        modified = true;
      }
    } else {
      newLines.push(line);
    }
  }

  if (modified) {
    fs.writeFileSync(filePath, newLines.join('\n'), 'utf-8');
    patched++;
    console.log(`✅ ${entry.file}: ${entry.kod}`);
  } else {
    console.log(`⚪ ${entry.file}: değişiklik yapılamadı`);
  }
}

console.log(`\nSONUÇ: ${patched}/24 yamalandı`);
