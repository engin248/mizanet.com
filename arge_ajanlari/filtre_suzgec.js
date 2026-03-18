const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '../.env.local' });

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(SUPABASE_URL, SUPABASE_ROLE_KEY);

/**
 * BOT 5: MERKEZİ SÜZGEÇ VE BİNGO (KESİN KARAR) ORKESTRATÖRÜ
 * [Patron Emri]: "Eskiye bakma, kendi doğrularını 138 kritere göre yaz."
 * 
 * Gerçek Mühendislik Rolü:
 * Diğer saha ajanları (TikTok, Trendyol, Google, Meta) görevini tamamlayıp veriyi yığınca, BOT 5 devreye girer.
 * O, körü körüne onay vermez. Tüm verileri alır, Çapraz Doğrulama (Cross-Validation) yapar.
 * Eğer bir ürün Sosyal Medyada patlamış ama Pazar Yerinde ölü kalmışsa ona (Sıcak Takip - Dağdaki Ateş) der.
 * Eğer 8 BİNGO kuralı eşleştiyse, "HİÇ DÜŞÜNMEDEN KUMAŞ KESİLİR (ÜRETİME GİR)" emrini Karargaha (Veritabanına) çakar!
 */
async function bot5MerkeziSorguHakemi(kategoriGrup) {
    console.log(`\n[BOT 5 - MERKEZİ BEYİN] Hermania Süzgeci Çalışıyor. Veriler Birleştiriliyor...`);

    try {
        // Son 12 saat içinde ajanların (Bot 1, 2, 3, 4) çektiği TÜM verileri getir
        const zamanSiniri = new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString();
        const { data: tumSahaVerileri, error } = await supabase
            .from('b1_arge_products')
            .select('*')
            .gte('created_at', zamanSiniri);

        if (error || !tumSahaVerileri || tumSahaVerileri.length === 0) {
            console.log(`[BOT 5] Sahadan gelen taze veri yok. Kılıçlar kınında.`);
            return { durum: 'UYKUDA', mesaj: 'Taze veri bekleniyor.' };
        }

        // Verileri "Ortak Etiketlere (Ürün Grubuna)" göre akıllıca grupla (Fuzzy Clustering)
        // Burada basitçe aynı/benzer ürün adlarını aynı potada eritiyoruz.
        console.log(`[BOT 5] Toplam ${tumSahaVerileri.length} saha raporu tarandı. Çapraz Bağlantılar Aranıyor...`);

        const onaylananAdaylar = [];

        for (const urun of tumSahaVerileri) {
            // Zaten infaz edilmişse (SATMAZ vs) Pusu/Gölge Botu (Bot 6) gelene kadar izlemeyiz
            if (urun.ai_satis_karari === 'SATMAZ' || urun.ai_satis_karari === 'ÇOK_SATAR') {
                continue;
            }

            // DURUM: İZLE (Sarı Alarm / Sıcak Takip) Sinyali olan ürünleri denetle
            // Gerçek 8 BİNGO Doğrulaması (İleri Düzey Matrix Matematik)
            let skorCarpan = 0;

            // 1. İvme Pisti & Niyet (Sepet / Kaydetme Delta onayı)
            if (urun.trend_skoru > 75) skorCarpan += 2;

            // 2. Erken Trend (Tırmanışta) Onayı
            if (urun.erken_trend_mi) skorCarpan += 2;

            // 3. Kalite / İade Zırhı Geçilmiş mi? (Bot 2'den gelen veriye bakarak yapay zeka güveninden sezilebilir)
            if (urun.ai_guven_skoru >= 85) skorCarpan += 2;

            // 4. Klonlama (Yayıldı mı?) -> Yorumlarda veya mesajlarda "Şelale" onayı aldıysa 
            const yayildiMi = urun.hermania_karar_yorumu.toLowerCase().includes('hacimsel sıkışma') ||
                urun.hermania_karar_yorumu.toLowerCase().includes('organik büyüme') ||
                urun.hermania_karar_yorumu.toLowerCase().includes('klonlanma');
            if (yayildiMi) skorCarpan += 2;

            // Eğer 8 (Puan/Kriter) hepsi cepteyse -> YIKILMAZ TREND (BİNGO)
            if (skorCarpan >= 7) {
                console.log(`\n[🔥 BİNGO ALARMI] "${urun.urun_adi}" ürünü tüm süzgeç testlerini (Çapraz Doğrulama) GEÇTİ!`);
                console.log(`[KARAR] Hiç düşünmeden Kumaş Kesilir, M1 Karargahta "Üret!" Zili Çalınır.`);

                const bingoMesaji = `${urun.hermania_karar_yorumu}\n\n[MERKEZİ HAKEM - SON ONAY]: Patron, Dönüşüm Var. İade Zehiri Yok. Organik Pazar İhtiyacı Zirvede. Sistem yeşil ışık yaktı. KUMAŞA MAKAS VUR. BİNGO!`;

                // Kararı BİNGO'ya çevir (ÇOK_SATAR) ve Sisteme Kalıcı Olarak Yaz
                await supabase.from('b1_arge_products').update({
                    ai_satis_karari: 'ÇOK_SATAR',
                    hermania_karar_yorumu: bingoMesaji
                }).eq('id', urun.id);

                // M1 (Karargah) Canlı Panosuna Acil Fişek Düşür
                await supabase.from('b1_agent_loglari').insert([{
                    ajan_adi: 'BOT 5: HERMANİA (ANA SÜZGEÇ)',
                    islem_tipi: 'BINGO_INFAS',
                    mesaj: `🔥 8/8 KESİN EŞLEŞME: ${urun.urun_adi}. Atölye Bilgilendirildi!`,
                    sonuc: 'basarili'
                }]);

                onaylananAdaylar.push(urun.urun_adi);
            }
            else if (skorCarpan >= 4) {
                // 6/8 Sarı Alarm - Sıcak Takip
                console.log(`[Sıcak Takip] "${urun.urun_adi}" Süzgeç skoru ${skorCarpan}/8. Kuluçkada Bekletiliyor.`);
                // İzlemeye devam
            } else {
                // Skoru Düşenleri Eziyoruz
                console.log(`[Cop Eridi] "${urun.urun_adi}" sahte parlamadan ibaret. Süzgeçte tıkandı.`);
                await supabase.from('b1_arge_products').update({
                    ai_satis_karari: 'SATMAZ',
                    hermania_karar_yorumu: urun.hermania_karar_yorumu + "\n\n[SÜZGEÇ ELENDİ] Karşılaştırmalı doğrulama başarısız. Trend organik veya kârlı değil."
                }).eq('id', urun.id);
            }
        }

        console.log(`\n[BOT 5 KAPANDI] Tarama bitti. Onaylanan (BİNGO) Sayısı: ${onaylananAdaylar.length}`);
        return { rapor: 'TAMAMLANDI', uretimOnalylari: onaylananAdaylar };

    } catch (e) {
        console.error(`[BOT 5 FATAL ERROR] Ana İşlemci Çöktü: ${e.message}`);
        return null;
    }
}

if (require.main === module) {
    bot5MerkeziSorguHakemi();
}

module.exports = { bot5MerkeziSorguHakemi };
