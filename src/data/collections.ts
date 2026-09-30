export interface Collection {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  surahIds: number[];
  gradient: string;
  accentColor: string;
  iconName?: string;
  badge?: string;
}

export const COLLECTIONS: Collection[] = [
  {
    id: 'fokus-kerja',
    title: 'Fokus & Kerja',
    subtitle: 'Deep Work & Konsentrasi',
    description: 'Lantunan surah-surah berirama tenang untuk menemani Anda membaca, coding, menulis, atau belajar.',
    surahIds: [18, 55, 67, 36, 56], // Al-Kahf, Ar-Rahman, Al-Mulk, Yasin, Al-Waqi'ah
    gradient: 'from-blue-600 via-sky-800 to-slate-950',
    accentColor: '#38bdf8',
    badge: 'Fokus'
  },
  {
    id: 'bacaan-terindah',
    title: 'Bacaan Terindah',
    subtitle: 'Tilawah Penuh Keindahan',
    description: 'Rangkaian surah dengan lantunan maqam yang paling menyejukkan hati dan penuh keindahan nada.',
    surahIds: [19, 20, 12, 14, 50], // Maryam, Taha, Yusuf, Ibrahim, Qaf
    gradient: 'from-rose-600 via-pink-900 to-slate-950',
    accentColor: '#fb7185',
    badge: 'Favorit'
  },
  {
    id: 'mode-tidur',
    title: 'Mode Tidur',
    subtitle: 'Relaksasi & Malam Hari',
    description: 'Surah sunnah sebelum tidur untuk menenangkan jiwa dan menghadirkan rasa aman sepanjang malam.',
    surahIds: [67, 32, 76, 112, 113, 114], // Al-Mulk, As-Sajdah, Al-Insan, Al-Ikhlas, Al-Falaq, An-Nas
    gradient: 'from-indigo-700 via-blue-950 to-black',
    accentColor: '#818cf8',
    badge: 'Tidur Nyenyak'
  },
  {
    id: 'doa-ruqyah',
    title: 'Doa & Ruqyah',
    subtitle: 'Perlindungan & Syifa',
    description: 'Ayat-ayat perlindungan dari segala mara bahaya, godaan, serta doa memohon kesembuhan jasmani dan rohani.',
    surahIds: [1, 2, 112, 113, 114], // Al-Fatihah, Al-Baqarah, 3 Qul
    gradient: 'from-emerald-700 via-teal-900 to-slate-950',
    accentColor: '#34d399',
    badge: 'Syifa'
  },
  {
    id: 'penuh-penghayatan',
    title: 'Lantunan Penuh Penghayatan',
    subtitle: 'Tadabbur Ayat Hari Akhir',
    description: 'Lantunan tilawah yang menggetarkan hati merenungi keagungan ciptaan Allah dan hari berbangkit.',
    surahIds: [75, 78, 89, 90, 93, 94], // Al-Qiyamah, An-Naba, Al-Fajr, Al-Balad, Ad-Duha, Asy-Syarh
    gradient: 'from-violet-700 via-purple-950 to-slate-950',
    accentColor: '#c084fc',
    badge: 'Tadabbur'
  },
  {
    id: 'koleksi-lengkap',
    title: 'Murottal 30 Juz',
    subtitle: '114 Surah Lengkap',
    description: 'Kompilasi rekaman tilawah lengkap 30 Juz dari Imam Masjidil Haram dengan kualitas audio jernih.',
    surahIds: Array.from({ length: 114 }, (_, i) => i + 1),
    gradient: 'from-cyan-700 via-teal-950 to-black',
    accentColor: '#2dd4bf',
    badge: 'Koleksi Lengkap'
  }
];
