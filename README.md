# 🌙 Quranspot — Al-Qur'an & Ambient Sound Web Player

> Web player Al-Qur'an modern dan imersif yang memadukan lantunan tilawah qari terkemuka dengan suasana suara alam (*ambient soundscapes*), voice equalizer 3-band, serta pelacak target khatam harian.

---

## ✨ Fitur Unggulan

### 🎙️ 1. Pilihan 3 Qari Terkemuka
- **Dr. Sheikh Yasser Al-Dosari** (Imam & Khatib Masjidil Haram, Makkah — Murattal Khusyuk & Bernada Kuat)
- **Dr. Sheikh Abdur-Rahman As-Sudais** (Ketua Umum Pengurus Dua Masjid Suci — Murattal Hadr & Berwibawa)
- **Sheikh Abdullah Al-Matrood** (Imam & Qari Terkemuka Arab Saudi — Murattal Tartil Tenang)

### 🌧️ 2. Studio Ambient Audio Engine (9 Suara Alam)
- 9 track audio studio alami: Hujan Lembut, Hujan di Kaca, Aliran Sungai, Ombak Lautan, Api Unggun, Hutan Pinus & Angin, Malam Pedesaan, Kicau Burung Pagi, Gemuruh Petir.
- Kontrol volume independen per track + Master volume.
- Simpan & kelola preset kustom secara lokal (*LocalStorage*).
- 4 preset kurasi instan: *Tadabbur Malam, Pesisir Hening, Hutan Tropis, Hujan Badai*.

### 🎚️ 3. Voice Equalizer 3-Band (Web Audio API)
- **Normal (Murni)**: Respon studio flat 0 dB.
- **Clear Vocal & Makhraj**: Boost tajam 3.2kHz (+8.5 dB) untuk artikulasi tajwid dan makharijul huruf yang kristal.
- **Warm Tadabbur**: Boost baritone 250Hz (+8.5 dB) untuk resonansi hangat dan meredam treble saat malam hari.
- **Broadcast Studio**: Kehadiran audio full-range seperti siaran live radio Masjidil Haram.

### 🎨 4. Kustomisasi 4 Tema Visual Sistem
- 🌌 **Midnight Navy**: Gelap pekat elegan dengan aksen cyan langit malam.
- 🌿 **Emerald Medina**: Nuansa hijau zamrud menyejukkan terinspirasi dari kubah Masjid Nabawi.
- 🕋 **Golden Ka'bah**: Hitam kiswah Ka'bah dengan kilau kaligrafi emas hangat.
- 🖤 **Onyx Minimalist**: Hitam monokrom OLED minimalis dengan aksen perak studio.

### 🎯 5. Target Tilawah & Tracker Khatam
- Checklist 114 surah dengan progres persentase khatam.
- Pelacak menit tilawah harian otomatis (*Daily Goal Progress*).
- Resume playback otomatis (*Lanjutkan dari detik terakhir*).
- Penanda ayat mushaf (*Bookmark*).

### 📖 6. Mushaf & Terjemahan Reader
- Teks Uthmani jernih dan terjemahan Bahasa Indonesia resmi Kemenag RI.
- Fitur salin ayat instan.

### 🌌 7. Zen Ambient Mode (Fullscreen)
- Tampilan layar penuh imersif bebas distraksi dengan live waveform audio visualizer.
- Pilihan 4 pemandangan latar dinamis: Pegunungan Berkabut, Cosmic Gradient, Hutan Hujan, dan Lautan Senja.

---

## 🛠️ Teknologi
- **Framework**: React 19, TypeScript
- **Bundler**: Vite
- **Styling**: Tailwind CSS v4, CSS Custom Variables
- **Icons**: Lucide React
- **Audio Processing**: HTML5 Audio & Web Audio API (BiquadFilterNode, GainNode)
- **CI/CD**: GitHub Actions & GitHub Pages

---

## 🚀 Jalankan Secara Lokal

```bash
# Clone repository
git clone https://github.com/kopispasta/quranspot.git
cd quranspot

# Install dependensi
npm install

# Jalankan server pengembangan
npm run dev

# Build untuk produksi
npm run build
```
