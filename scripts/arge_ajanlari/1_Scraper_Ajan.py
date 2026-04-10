import os
import time
import requests
from bs4 import BeautifulSoup
from datetime import datetime
from dotenv import load_dotenv
from pathlib import Path

# =========================================================================
# Mizanet - 1. EKİP (VERİ MADENCİSİ / SCOUT AJANI) (DIREKT REST API)
# =========================================================================

try:
    SCRIPT_DIR = Path(__file__).resolve().parent
except NameError:
    SCRIPT_DIR = Path(os.getcwd()).resolve()

load_dotenv(SCRIPT_DIR.parent.parent / ".env.local")
load_dotenv(SCRIPT_DIR.parent.parent / ".env")

SUPABASE_URL = os.environ.get("NEXT_PUBLIC_SUPABASE_URL") or os.environ.get("SUPABASE_URL")
SUPABASE_KEY = os.environ.get("SUPABASE_SERVICE_ROLE_KEY") or os.environ.get("SUPABASE_SERVICE_KEY") or os.environ.get("NEXT_PUBLIC_SUPABASE_ANON_KEY")

if not SUPABASE_URL or not SUPABASE_KEY:
    print("[HATA] .env dosyasında Supabase URL ve Key bulunamadı! İşlem durduruldu.")
    exit(1)

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
    "Accept-Language": "tr-TR,tr;q=0.9,en-US;q=0.8,en;q=0.7",
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
}

def trendyol_veri_madenciligi(arama_kelimesi="erkek kargo pantolon", limit=5):
    print(f"📡 [AJAN-1 SCOUT] '{arama_kelimesi}' için tarama başlatılıyor...")
    url = f"https://www.trendyol.com/sr?q={arama_kelimesi.replace(' ', '%20')}"
    try:
        response = requests.get(url, headers=HEADERS, timeout=15)
        if response.status_code != 200:
            print(f"[BLOKAJ] Hedef site erişimi reddetti (Durum Kodu: {response.status_code}).")
            return []
        soup = BeautifulSoup(response.content, "html.parser")
        urun_kartlari = soup.find_all("div", class_="p-card-wrppr", limit=limit)
        toplanan_veriler = []
        for kart in urun_kartlari:
            try:
                link_etiketi = kart.find("a")
                kaynak_url = "https://www.trendyol.com" + link_etiketi["href"] if link_etiketi else ""
                img_etiketi = kart.find("img")
                gorsel_url = img_etiketi["src"] if img_etiketi else ""
                marka_etiketi = kart.find("span", class_="prdct-desc-cntnr-ttl")
                isim_etiketi = kart.find("span", class_="prdct-desc-cntnr-name")
                marka = marka_etiketi.text.strip() if marka_etiketi else "Bilinmeyen Marka"
                isim = isim_etiketi.text.strip() if isim_etiketi else "Bilinmeyen Ürün"
                fiyat_etiketi = kart.find("div", class_="prc-box-dscntd")
                fiyat = fiyat_etiketi.text.strip() if fiyat_etiketi else "0 TL"
                yorum_etiketi = kart.find("span", class_="ratingCount")
                yorum_sayisi = yorum_etiketi.text.strip().replace("(", "").replace(")", "") if yorum_etiketi else "0"
                ham_veri = {
                    "marka": marka, "urun_adi": isim, "fiyat": fiyat,
                    "yorum_sayisi": yorum_sayisi, "gorsel_url": gorsel_url,
                    "arama_kriteri": arama_kelimesi, "yakalanma_tarihi": datetime.now().isoformat()
                }
                toplanan_veriler.append({
                    "hedef_platform": "Trendyol",
                    "kaynak_url": kaynak_url.split("?")[0],
                    "ham_veri": ham_veri,
                    "toplayan_ajan": "Ajan-1-Scout"
                })
            except Exception as e:
                continue
        return toplanan_veriler
    except Exception as e:
        print(f"[HATA] Kazıma işlemi çöktü: {e}")
        return []

def veritabanina_firlat(veriler):
    if not veriler:
        return
    basarili_kayit = 0
    kopya_kayit = 0
    
    db_headers = {
        "apikey": SUPABASE_KEY,
        "Authorization": f"Bearer {SUPABASE_KEY}",
        "Content-Type": "application/json",
        "Prefer": "return=minimal"
    }

    for veri in veriler:
        ui_formatli_veri = {
            "product_name": f"[{veri['ham_veri']['marka']}] {veri['ham_veri']['urun_adi']}",
            "category": veri['ham_veri']['arama_kriteri'],
            "style": "Trendyol Kazıması",
            "fabric": "Bilinmiyor",
            "color": "Muhtelif",
            "price_range": veri['ham_veri']['fiyat'],
            "image_url": veri['ham_veri']['gorsel_url'],
            "source_url": veri['kaynak_url'],
            "title": f"{veri['ham_veri']['marka']} - {veri['ham_veri']['urun_adi']}",
            "status": "inceleniyor"
        }
        
        # UI Tablosuna POST request
        res = requests.post(f"{SUPABASE_URL}/rest/v1/b1_arge_products", headers=db_headers, json=ui_formatli_veri)
        if res.status_code in [200, 201]:
            basarili_kayit += 1
            print(f"✅ EKRANA BASTIRILDI: {veri['ham_veri']['marka']} - {veri['ham_veri']['fiyat']}")
        elif res.status_code == 409 or "duplicate key" in res.text:
            kopya_kayit += 1

    print(f"\n📊 ÖZET: {basarili_kayit} Yeni Ürün Canlı Ekrana İşlendi | {kopya_kayit} Mükerrer Reddedildi.")

if __name__ == "__main__":
    print("=== NİZAM: 1. EKİP AKTİF (DOĞRUDAN HTTP REST AĞI KULLANILIYOR) ===")
    hedefler = ["erkek kargo pantolon", "erkek oversize tişört"]
    for hedef in hedefler:
        kazilan_veriler = trendyol_veri_madenciligi(arama_kelimesi=hedef, limit=5)
        veritabanina_firlat(kazilan_veriler)
        time.sleep(2)
    print("=== GÖREV TAMAMLANDI. CANLI EKRAN BESLENDİ. ===")
