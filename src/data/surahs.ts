export interface Surah {
  id: number;
  number: number;
  nameSimple: string;
  nameArabic: string;
  translatedName: string;
  versesCount: number;
  revelationPlace: "makkah" | "madinah";
  audioUrl: string;
}

export const SURAHS: Surah[] = [
  {
    "id": 1,
    "number": 1,
    "nameSimple": "Al-Fatihah",
    "nameArabic": "الفاتحة",
    "translatedName": "Pembukaan",
    "versesCount": 7,
    "revelationPlace": "makkah",
    "audioUrl": "https://server11.mp3quran.net/yasser/001.mp3"
  },
  {
    "id": 2,
    "number": 2,
    "nameSimple": "Al-Baqarah",
    "nameArabic": "البقرة",
    "translatedName": "Sapi Betina",
    "versesCount": 286,
    "revelationPlace": "madinah",
    "audioUrl": "https://server11.mp3quran.net/yasser/002.mp3"
  },
  {
    "id": 3,
    "number": 3,
    "nameSimple": "Ali 'Imran",
    "nameArabic": "آل عمران",
    "translatedName": "Keluarga Imran",
    "versesCount": 200,
    "revelationPlace": "madinah",
    "audioUrl": "https://server11.mp3quran.net/yasser/003.mp3"
  },
  {
    "id": 4,
    "number": 4,
    "nameSimple": "An-Nisa",
    "nameArabic": "النساء",
    "translatedName": "Wanita",
    "versesCount": 176,
    "revelationPlace": "madinah",
    "audioUrl": "https://server11.mp3quran.net/yasser/004.mp3"
  },
  {
    "id": 5,
    "number": 5,
    "nameSimple": "Al-Ma'idah",
    "nameArabic": "المائدة",
    "translatedName": "Jamuan (Hidangan Makanan)",
    "versesCount": 120,
    "revelationPlace": "madinah",
    "audioUrl": "https://server11.mp3quran.net/yasser/005.mp3"
  },
  {
    "id": 6,
    "number": 6,
    "nameSimple": "Al-An'am",
    "nameArabic": "الأنعام",
    "translatedName": "Binatang Ternak",
    "versesCount": 165,
    "revelationPlace": "makkah",
    "audioUrl": "https://server11.mp3quran.net/yasser/006.mp3"
  },
  {
    "id": 7,
    "number": 7,
    "nameSimple": "Al-A'raf",
    "nameArabic": "الأعراف",
    "translatedName": "Tempat-tempat Tinggi",
    "versesCount": 206,
    "revelationPlace": "makkah",
    "audioUrl": "https://server11.mp3quran.net/yasser/007.mp3"
  },
  {
    "id": 8,
    "number": 8,
    "nameSimple": "Al-Anfal",
    "nameArabic": "الأنفال",
    "translatedName": "Rampasan Perang",
    "versesCount": 75,
    "revelationPlace": "madinah",
    "audioUrl": "https://server11.mp3quran.net/yasser/008.mp3"
  },
  {
    "id": 9,
    "number": 9,
    "nameSimple": "At-Tawbah",
    "nameArabic": "التوبة",
    "translatedName": "Pengampunan",
    "versesCount": 129,
    "revelationPlace": "madinah",
    "audioUrl": "https://server11.mp3quran.net/yasser/009.mp3"
  },
  {
    "id": 10,
    "number": 10,
    "nameSimple": "Yunus",
    "nameArabic": "يونس",
    "translatedName": "Yunus",
    "versesCount": 109,
    "revelationPlace": "makkah",
    "audioUrl": "https://server11.mp3quran.net/yasser/010.mp3"
  },
  {
    "id": 11,
    "number": 11,
    "nameSimple": "Hud",
    "nameArabic": "هود",
    "translatedName": "Hud",
    "versesCount": 123,
    "revelationPlace": "makkah",
    "audioUrl": "https://server11.mp3quran.net/yasser/011.mp3"
  },
  {
    "id": 12,
    "number": 12,
    "nameSimple": "Yusuf",
    "nameArabic": "يوسف",
    "translatedName": "Yusuf",
    "versesCount": 111,
    "revelationPlace": "makkah",
    "audioUrl": "https://server11.mp3quran.net/yasser/012.mp3"
  },
  {
    "id": 13,
    "number": 13,
    "nameSimple": "Ar-Ra'd",
    "nameArabic": "الرعد",
    "translatedName": "Guruh (Petir)",
    "versesCount": 43,
    "revelationPlace": "madinah",
    "audioUrl": "https://server11.mp3quran.net/yasser/013.mp3"
  },
  {
    "id": 14,
    "number": 14,
    "nameSimple": "Ibrahim",
    "nameArabic": "ابراهيم",
    "translatedName": "Ibrahim",
    "versesCount": 52,
    "revelationPlace": "makkah",
    "audioUrl": "https://server11.mp3quran.net/yasser/014.mp3"
  },
  {
    "id": 15,
    "number": 15,
    "nameSimple": "Al-Hijr",
    "nameArabic": "الحجر",
    "translatedName": "Bukit",
    "versesCount": 99,
    "revelationPlace": "makkah",
    "audioUrl": "https://server11.mp3quran.net/yasser/015.mp3"
  },
  {
    "id": 16,
    "number": 16,
    "nameSimple": "An-Nahl",
    "nameArabic": "النحل",
    "translatedName": "Lebah Madu",
    "versesCount": 128,
    "revelationPlace": "makkah",
    "audioUrl": "https://server11.mp3quran.net/yasser/016.mp3"
  },
  {
    "id": 17,
    "number": 17,
    "nameSimple": "Al-Isra",
    "nameArabic": "الإسراء",
    "translatedName": "Perjalanan Malam",
    "versesCount": 111,
    "revelationPlace": "makkah",
    "audioUrl": "https://server11.mp3quran.net/yasser/017.mp3"
  },
  {
    "id": 18,
    "number": 18,
    "nameSimple": "Al-Kahf",
    "nameArabic": "الكهف",
    "translatedName": "Para Penghuni Gua",
    "versesCount": 110,
    "revelationPlace": "makkah",
    "audioUrl": "https://server11.mp3quran.net/yasser/018.mp3"
  },
  {
    "id": 19,
    "number": 19,
    "nameSimple": "Maryam",
    "nameArabic": "مريم",
    "translatedName": "Maryam",
    "versesCount": 98,
    "revelationPlace": "makkah",
    "audioUrl": "https://server11.mp3quran.net/yasser/019.mp3"
  },
  {
    "id": 20,
    "number": 20,
    "nameSimple": "Taha",
    "nameArabic": "طه",
    "translatedName": "Tha-Ha",
    "versesCount": 135,
    "revelationPlace": "makkah",
    "audioUrl": "https://server11.mp3quran.net/yasser/020.mp3"
  },
  {
    "id": 21,
    "number": 21,
    "nameSimple": "Al-Anbya",
    "nameArabic": "الأنبياء",
    "translatedName": "Para Nabi",
    "versesCount": 112,
    "revelationPlace": "makkah",
    "audioUrl": "https://server11.mp3quran.net/yasser/021.mp3"
  },
  {
    "id": 22,
    "number": 22,
    "nameSimple": "Al-Hajj",
    "nameArabic": "الحج",
    "translatedName": "Haji",
    "versesCount": 78,
    "revelationPlace": "madinah",
    "audioUrl": "https://server11.mp3quran.net/yasser/022.mp3"
  },
  {
    "id": 23,
    "number": 23,
    "nameSimple": "Al-Mu'minun",
    "nameArabic": "المؤمنون",
    "translatedName": "Orang-orang Mukmin",
    "versesCount": 118,
    "revelationPlace": "makkah",
    "audioUrl": "https://server11.mp3quran.net/yasser/023.mp3"
  },
  {
    "id": 24,
    "number": 24,
    "nameSimple": "An-Nur",
    "nameArabic": "النور",
    "translatedName": "Cahaya",
    "versesCount": 64,
    "revelationPlace": "madinah",
    "audioUrl": "https://server11.mp3quran.net/yasser/024.mp3"
  },
  {
    "id": 25,
    "number": 25,
    "nameSimple": "Al-Furqan",
    "nameArabic": "الفرقان",
    "translatedName": "Pembeda",
    "versesCount": 77,
    "revelationPlace": "makkah",
    "audioUrl": "https://server11.mp3quran.net/yasser/025.mp3"
  },
  {
    "id": 26,
    "number": 26,
    "nameSimple": "Ash-Shu'ara",
    "nameArabic": "الشعراء",
    "translatedName": "Penyair",
    "versesCount": 227,
    "revelationPlace": "makkah",
    "audioUrl": "https://server11.mp3quran.net/yasser/026.mp3"
  },
  {
    "id": 27,
    "number": 27,
    "nameSimple": "An-Naml",
    "nameArabic": "النمل",
    "translatedName": "Semut",
    "versesCount": 93,
    "revelationPlace": "makkah",
    "audioUrl": "https://server11.mp3quran.net/yasser/027.mp3"
  },
  {
    "id": 28,
    "number": 28,
    "nameSimple": "Al-Qasas",
    "nameArabic": "القصص",
    "translatedName": "Kisah-kisah",
    "versesCount": 88,
    "revelationPlace": "makkah",
    "audioUrl": "https://server11.mp3quran.net/yasser/028.mp3"
  },
  {
    "id": 29,
    "number": 29,
    "nameSimple": "Al-'Ankabut",
    "nameArabic": "العنكبوت",
    "translatedName": "Laba-laba",
    "versesCount": 69,
    "revelationPlace": "makkah",
    "audioUrl": "https://server11.mp3quran.net/yasser/029.mp3"
  },
  {
    "id": 30,
    "number": 30,
    "nameSimple": "Ar-Rum",
    "nameArabic": "الروم",
    "translatedName": "Bangsa Romawi",
    "versesCount": 60,
    "revelationPlace": "makkah",
    "audioUrl": "https://server11.mp3quran.net/yasser/030.mp3"
  },
  {
    "id": 31,
    "number": 31,
    "nameSimple": "Luqman",
    "nameArabic": "لقمان",
    "translatedName": "Luqman",
    "versesCount": 34,
    "revelationPlace": "makkah",
    "audioUrl": "https://server11.mp3quran.net/yasser/031.mp3"
  },
  {
    "id": 32,
    "number": 32,
    "nameSimple": "As-Sajdah",
    "nameArabic": "السجدة",
    "translatedName": "Sujud",
    "versesCount": 30,
    "revelationPlace": "makkah",
    "audioUrl": "https://server11.mp3quran.net/yasser/032.mp3"
  },
  {
    "id": 33,
    "number": 33,
    "nameSimple": "Al-Ahzab",
    "nameArabic": "الأحزاب",
    "translatedName": "Golongan yang Bersekutu",
    "versesCount": 73,
    "revelationPlace": "madinah",
    "audioUrl": "https://server11.mp3quran.net/yasser/033.mp3"
  },
  {
    "id": 34,
    "number": 34,
    "nameSimple": "Saba",
    "nameArabic": "سبإ",
    "translatedName": "Saba\\'",
    "versesCount": 54,
    "revelationPlace": "makkah",
    "audioUrl": "https://server11.mp3quran.net/yasser/034.mp3"
  },
  {
    "id": 35,
    "number": 35,
    "nameSimple": "Fatir",
    "nameArabic": "فاطر",
    "translatedName": "Pencipta",
    "versesCount": 45,
    "revelationPlace": "makkah",
    "audioUrl": "https://server11.mp3quran.net/yasser/035.mp3"
  },
  {
    "id": 36,
    "number": 36,
    "nameSimple": "Ya-Sin",
    "nameArabic": "يس",
    "translatedName": "Yas Sin",
    "versesCount": 83,
    "revelationPlace": "makkah",
    "audioUrl": "https://server11.mp3quran.net/yasser/036.mp3"
  },
  {
    "id": 37,
    "number": 37,
    "nameSimple": "As-Saffat",
    "nameArabic": "الصافات",
    "translatedName": "Barisan-barisan",
    "versesCount": 182,
    "revelationPlace": "makkah",
    "audioUrl": "https://server11.mp3quran.net/yasser/037.mp3"
  },
  {
    "id": 38,
    "number": 38,
    "nameSimple": "Sad",
    "nameArabic": "ص",
    "translatedName": "Shad",
    "versesCount": 88,
    "revelationPlace": "makkah",
    "audioUrl": "https://server11.mp3quran.net/yasser/038.mp3"
  },
  {
    "id": 39,
    "number": 39,
    "nameSimple": "Az-Zumar",
    "nameArabic": "الزمر",
    "translatedName": "Para Rombongan",
    "versesCount": 75,
    "revelationPlace": "makkah",
    "audioUrl": "https://server11.mp3quran.net/yasser/039.mp3"
  },
  {
    "id": 40,
    "number": 40,
    "nameSimple": "Ghafir",
    "nameArabic": "غافر",
    "translatedName": "Sang Maha Pengampun",
    "versesCount": 85,
    "revelationPlace": "makkah",
    "audioUrl": "https://server11.mp3quran.net/yasser/040.mp3"
  },
  {
    "id": 41,
    "number": 41,
    "nameSimple": "Fussilat",
    "nameArabic": "فصلت",
    "translatedName": "Yang Dijelaskan",
    "versesCount": 54,
    "revelationPlace": "makkah",
    "audioUrl": "https://server11.mp3quran.net/yasser/041.mp3"
  },
  {
    "id": 42,
    "number": 42,
    "nameSimple": "Ash-Shuraa",
    "nameArabic": "الشورى",
    "translatedName": "Musyawarah",
    "versesCount": 53,
    "revelationPlace": "makkah",
    "audioUrl": "https://server11.mp3quran.net/yasser/042.mp3"
  },
  {
    "id": 43,
    "number": 43,
    "nameSimple": "Az-Zukhruf",
    "nameArabic": "الزخرف",
    "translatedName": "Perhiasan",
    "versesCount": 89,
    "revelationPlace": "makkah",
    "audioUrl": "https://server11.mp3quran.net/yasser/043.mp3"
  },
  {
    "id": 44,
    "number": 44,
    "nameSimple": "Ad-Dukhan",
    "nameArabic": "الدخان",
    "translatedName": "Kabut",
    "versesCount": 59,
    "revelationPlace": "makkah",
    "audioUrl": "https://server11.mp3quran.net/yasser/044.mp3"
  },
  {
    "id": 45,
    "number": 45,
    "nameSimple": "Al-Jathiyah",
    "nameArabic": "الجاثية",
    "translatedName": "Yang Bertekuk Lutut",
    "versesCount": 37,
    "revelationPlace": "makkah",
    "audioUrl": "https://server11.mp3quran.net/yasser/045.mp3"
  },
  {
    "id": 46,
    "number": 46,
    "nameSimple": "Al-Ahqaf",
    "nameArabic": "الأحقاف",
    "translatedName": "Bukit-bukir Pasir",
    "versesCount": 35,
    "revelationPlace": "makkah",
    "audioUrl": "https://server11.mp3quran.net/yasser/046.mp3"
  },
  {
    "id": 47,
    "number": 47,
    "nameSimple": "Muhammad",
    "nameArabic": "محمد",
    "translatedName": "Muhammad",
    "versesCount": 38,
    "revelationPlace": "madinah",
    "audioUrl": "https://server11.mp3quran.net/yasser/047.mp3"
  },
  {
    "id": 48,
    "number": 48,
    "nameSimple": "Al-Fath",
    "nameArabic": "الفتح",
    "translatedName": "Kemenangan",
    "versesCount": 29,
    "revelationPlace": "madinah",
    "audioUrl": "https://server11.mp3quran.net/yasser/048.mp3"
  },
  {
    "id": 49,
    "number": 49,
    "nameSimple": "Al-Hujurat",
    "nameArabic": "الحجرات",
    "translatedName": "Kamar-kamar",
    "versesCount": 18,
    "revelationPlace": "madinah",
    "audioUrl": "https://server11.mp3quran.net/yasser/049.mp3"
  },
  {
    "id": 50,
    "number": 50,
    "nameSimple": "Qaf",
    "nameArabic": "ق",
    "translatedName": "Qaf",
    "versesCount": 45,
    "revelationPlace": "makkah",
    "audioUrl": "https://server11.mp3quran.net/yasser/050.mp3"
  },
  {
    "id": 51,
    "number": 51,
    "nameSimple": "Adh-Dhariyat",
    "nameArabic": "الذاريات",
    "translatedName": "Angin yang Menerbangkan",
    "versesCount": 60,
    "revelationPlace": "makkah",
    "audioUrl": "https://server11.mp3quran.net/yasser/051.mp3"
  },
  {
    "id": 52,
    "number": 52,
    "nameSimple": "At-Tur",
    "nameArabic": "الطور",
    "translatedName": "Bukit",
    "versesCount": 49,
    "revelationPlace": "makkah",
    "audioUrl": "https://server11.mp3quran.net/yasser/052.mp3"
  },
  {
    "id": 53,
    "number": 53,
    "nameSimple": "An-Najm",
    "nameArabic": "النجم",
    "translatedName": "Bintang",
    "versesCount": 62,
    "revelationPlace": "makkah",
    "audioUrl": "https://server11.mp3quran.net/yasser/053.mp3"
  },
  {
    "id": 54,
    "number": 54,
    "nameSimple": "Al-Qamar",
    "nameArabic": "القمر",
    "translatedName": "Bulan",
    "versesCount": 55,
    "revelationPlace": "makkah",
    "audioUrl": "https://server11.mp3quran.net/yasser/054.mp3"
  },
  {
    "id": 55,
    "number": 55,
    "nameSimple": "Ar-Rahman",
    "nameArabic": "الرحمن",
    "translatedName": "Yang Maha Pemurah",
    "versesCount": 78,
    "revelationPlace": "madinah",
    "audioUrl": "https://server11.mp3quran.net/yasser/055.mp3"
  },
  {
    "id": 56,
    "number": 56,
    "nameSimple": "Al-Waqi'ah",
    "nameArabic": "الواقعة",
    "translatedName": "Hari Kiamat",
    "versesCount": 96,
    "revelationPlace": "makkah",
    "audioUrl": "https://server11.mp3quran.net/yasser/056.mp3"
  },
  {
    "id": 57,
    "number": 57,
    "nameSimple": "Al-Hadid",
    "nameArabic": "الحديد",
    "translatedName": "Besi",
    "versesCount": 29,
    "revelationPlace": "madinah",
    "audioUrl": "https://server11.mp3quran.net/yasser/057.mp3"
  },
  {
    "id": 58,
    "number": 58,
    "nameSimple": "Al-Mujadila",
    "nameArabic": "المجادلة",
    "translatedName": "Wanita yang Menggugat",
    "versesCount": 22,
    "revelationPlace": "madinah",
    "audioUrl": "https://server11.mp3quran.net/yasser/058.mp3"
  },
  {
    "id": 59,
    "number": 59,
    "nameSimple": "Al-Hashr",
    "nameArabic": "الحشر",
    "translatedName": "Pengusiran",
    "versesCount": 24,
    "revelationPlace": "madinah",
    "audioUrl": "https://server11.mp3quran.net/yasser/059.mp3"
  },
  {
    "id": 60,
    "number": 60,
    "nameSimple": "Al-Mumtahanah",
    "nameArabic": "الممتحنة",
    "translatedName": "Wanita yang Diuji",
    "versesCount": 13,
    "revelationPlace": "madinah",
    "audioUrl": "https://server11.mp3quran.net/yasser/060.mp3"
  },
  {
    "id": 61,
    "number": 61,
    "nameSimple": "As-Saf",
    "nameArabic": "الصف",
    "translatedName": "Barisan",
    "versesCount": 14,
    "revelationPlace": "madinah",
    "audioUrl": "https://server11.mp3quran.net/yasser/061.mp3"
  },
  {
    "id": 62,
    "number": 62,
    "nameSimple": "Al-Jumu'ah",
    "nameArabic": "الجمعة",
    "translatedName": "Hari Jum\\'at",
    "versesCount": 11,
    "revelationPlace": "madinah",
    "audioUrl": "https://server11.mp3quran.net/yasser/062.mp3"
  },
  {
    "id": 63,
    "number": 63,
    "nameSimple": "Al-Munafiqun",
    "nameArabic": "المنافقون",
    "translatedName": "Kaum Munafik",
    "versesCount": 11,
    "revelationPlace": "madinah",
    "audioUrl": "https://server11.mp3quran.net/yasser/063.mp3"
  },
  {
    "id": 64,
    "number": 64,
    "nameSimple": "At-Taghabun",
    "nameArabic": "التغابن",
    "translatedName": "Hari Dinampakkan Kesalahan",
    "versesCount": 18,
    "revelationPlace": "madinah",
    "audioUrl": "https://server11.mp3quran.net/yasser/064.mp3"
  },
  {
    "id": 65,
    "number": 65,
    "nameSimple": "At-Talaq",
    "nameArabic": "الطلاق",
    "translatedName": "Perceraian",
    "versesCount": 12,
    "revelationPlace": "madinah",
    "audioUrl": "https://server11.mp3quran.net/yasser/065.mp3"
  },
  {
    "id": 66,
    "number": 66,
    "nameSimple": "At-Tahrim",
    "nameArabic": "التحريم",
    "translatedName": "Mengharamkan",
    "versesCount": 12,
    "revelationPlace": "madinah",
    "audioUrl": "https://server11.mp3quran.net/yasser/066.mp3"
  },
  {
    "id": 67,
    "number": 67,
    "nameSimple": "Al-Mulk",
    "nameArabic": "الملك",
    "translatedName": "Kerajaan",
    "versesCount": 30,
    "revelationPlace": "makkah",
    "audioUrl": "https://server11.mp3quran.net/yasser/067.mp3"
  },
  {
    "id": 68,
    "number": 68,
    "nameSimple": "Al-Qalam",
    "nameArabic": "القلم",
    "translatedName": "Pena",
    "versesCount": 52,
    "revelationPlace": "makkah",
    "audioUrl": "https://server11.mp3quran.net/yasser/068.mp3"
  },
  {
    "id": 69,
    "number": 69,
    "nameSimple": "Al-Haqqah",
    "nameArabic": "الحاقة",
    "translatedName": "Kenyataan (Hari Kiamat)",
    "versesCount": 52,
    "revelationPlace": "makkah",
    "audioUrl": "https://server11.mp3quran.net/yasser/069.mp3"
  },
  {
    "id": 70,
    "number": 70,
    "nameSimple": "Al-Ma'arij",
    "nameArabic": "المعارج",
    "translatedName": "Tempat yang Naik",
    "versesCount": 44,
    "revelationPlace": "makkah",
    "audioUrl": "https://server11.mp3quran.net/yasser/070.mp3"
  },
  {
    "id": 71,
    "number": 71,
    "nameSimple": "Nuh",
    "nameArabic": "نوح",
    "translatedName": "Nuh",
    "versesCount": 28,
    "revelationPlace": "makkah",
    "audioUrl": "https://server11.mp3quran.net/yasser/071.mp3"
  },
  {
    "id": 72,
    "number": 72,
    "nameSimple": "Al-Jinn",
    "nameArabic": "الجن",
    "translatedName": "Jin",
    "versesCount": 28,
    "revelationPlace": "makkah",
    "audioUrl": "https://server11.mp3quran.net/yasser/072.mp3"
  },
  {
    "id": 73,
    "number": 73,
    "nameSimple": "Al-Muzzammil",
    "nameArabic": "المزمل",
    "translatedName": "Orang yang Berselimut",
    "versesCount": 20,
    "revelationPlace": "makkah",
    "audioUrl": "https://server11.mp3quran.net/yasser/073.mp3"
  },
  {
    "id": 74,
    "number": 74,
    "nameSimple": "Al-Muddaththir",
    "nameArabic": "المدثر",
    "translatedName": "Orang yang Berkemul",
    "versesCount": 56,
    "revelationPlace": "makkah",
    "audioUrl": "https://server11.mp3quran.net/yasser/074.mp3"
  },
  {
    "id": 75,
    "number": 75,
    "nameSimple": "Al-Qiyamah",
    "nameArabic": "القيامة",
    "translatedName": "Hari Berbangkit",
    "versesCount": 40,
    "revelationPlace": "makkah",
    "audioUrl": "https://server11.mp3quran.net/yasser/075.mp3"
  },
  {
    "id": 76,
    "number": 76,
    "nameSimple": "Al-Insan",
    "nameArabic": "الانسان",
    "translatedName": "Manusia",
    "versesCount": 31,
    "revelationPlace": "madinah",
    "audioUrl": "https://server11.mp3quran.net/yasser/076.mp3"
  },
  {
    "id": 77,
    "number": 77,
    "nameSimple": "Al-Mursalat",
    "nameArabic": "المرسلات",
    "translatedName": "Malaikat-malaikan yang Diutus",
    "versesCount": 50,
    "revelationPlace": "makkah",
    "audioUrl": "https://server11.mp3quran.net/yasser/077.mp3"
  },
  {
    "id": 78,
    "number": 78,
    "nameSimple": "An-Naba",
    "nameArabic": "النبإ",
    "translatedName": "Berita Besar",
    "versesCount": 40,
    "revelationPlace": "makkah",
    "audioUrl": "https://server11.mp3quran.net/yasser/078.mp3"
  },
  {
    "id": 79,
    "number": 79,
    "nameSimple": "An-Nazi'at",
    "nameArabic": "النازعات",
    "translatedName": "Malaikat yang Mencabut",
    "versesCount": 46,
    "revelationPlace": "makkah",
    "audioUrl": "https://server11.mp3quran.net/yasser/079.mp3"
  },
  {
    "id": 80,
    "number": 80,
    "nameSimple": "'Abasa",
    "nameArabic": "عبس",
    "translatedName": "Ia Bermuka Masam",
    "versesCount": 42,
    "revelationPlace": "makkah",
    "audioUrl": "https://server11.mp3quran.net/yasser/080.mp3"
  },
  {
    "id": 81,
    "number": 81,
    "nameSimple": "At-Takwir",
    "nameArabic": "التكوير",
    "translatedName": "Menggulung",
    "versesCount": 29,
    "revelationPlace": "makkah",
    "audioUrl": "https://server11.mp3quran.net/yasser/081.mp3"
  },
  {
    "id": 82,
    "number": 82,
    "nameSimple": "Al-Infitar",
    "nameArabic": "الإنفطار",
    "translatedName": "Terbelah",
    "versesCount": 19,
    "revelationPlace": "makkah",
    "audioUrl": "https://server11.mp3quran.net/yasser/082.mp3"
  },
  {
    "id": 83,
    "number": 83,
    "nameSimple": "Al-Mutaffifin",
    "nameArabic": "المطففين",
    "translatedName": "Orang-orang Curang",
    "versesCount": 36,
    "revelationPlace": "makkah",
    "audioUrl": "https://server11.mp3quran.net/yasser/083.mp3"
  },
  {
    "id": 84,
    "number": 84,
    "nameSimple": "Al-Inshiqaq",
    "nameArabic": "الإنشقاق",
    "translatedName": "Terbelah",
    "versesCount": 25,
    "revelationPlace": "makkah",
    "audioUrl": "https://server11.mp3quran.net/yasser/084.mp3"
  },
  {
    "id": 85,
    "number": 85,
    "nameSimple": "Al-Buruj",
    "nameArabic": "البروج",
    "translatedName": "Gugusan Bintang",
    "versesCount": 22,
    "revelationPlace": "makkah",
    "audioUrl": "https://server11.mp3quran.net/yasser/085.mp3"
  },
  {
    "id": 86,
    "number": 86,
    "nameSimple": "At-Tariq",
    "nameArabic": "الطارق",
    "translatedName": "Yang Datang di Malam Hari",
    "versesCount": 17,
    "revelationPlace": "makkah",
    "audioUrl": "https://server11.mp3quran.net/yasser/086.mp3"
  },
  {
    "id": 87,
    "number": 87,
    "nameSimple": "Al-A'la",
    "nameArabic": "الأعلى",
    "translatedName": "Yang Paling Tinggi",
    "versesCount": 19,
    "revelationPlace": "makkah",
    "audioUrl": "https://server11.mp3quran.net/yasser/087.mp3"
  },
  {
    "id": 88,
    "number": 88,
    "nameSimple": "Al-Ghashiyah",
    "nameArabic": "الغاشية",
    "translatedName": "Hari Pembalasan",
    "versesCount": 26,
    "revelationPlace": "makkah",
    "audioUrl": "https://server11.mp3quran.net/yasser/088.mp3"
  },
  {
    "id": 89,
    "number": 89,
    "nameSimple": "Al-Fajr",
    "nameArabic": "الفجر",
    "translatedName": "Fajar",
    "versesCount": 30,
    "revelationPlace": "makkah",
    "audioUrl": "https://server11.mp3quran.net/yasser/089.mp3"
  },
  {
    "id": 90,
    "number": 90,
    "nameSimple": "Al-Balad",
    "nameArabic": "البلد",
    "translatedName": "Negeri",
    "versesCount": 20,
    "revelationPlace": "makkah",
    "audioUrl": "https://server11.mp3quran.net/yasser/090.mp3"
  },
  {
    "id": 91,
    "number": 91,
    "nameSimple": "Ash-Shams",
    "nameArabic": "الشمس",
    "translatedName": "Matahari",
    "versesCount": 15,
    "revelationPlace": "makkah",
    "audioUrl": "https://server11.mp3quran.net/yasser/091.mp3"
  },
  {
    "id": 92,
    "number": 92,
    "nameSimple": "Al-Layl",
    "nameArabic": "الليل",
    "translatedName": "Malam",
    "versesCount": 21,
    "revelationPlace": "makkah",
    "audioUrl": "https://server11.mp3quran.net/yasser/092.mp3"
  },
  {
    "id": 93,
    "number": 93,
    "nameSimple": "Ad-Duhaa",
    "nameArabic": "الضحى",
    "translatedName": "Waktu Dhuha",
    "versesCount": 11,
    "revelationPlace": "makkah",
    "audioUrl": "https://server11.mp3quran.net/yasser/093.mp3"
  },
  {
    "id": 94,
    "number": 94,
    "nameSimple": "Ash-Sharh",
    "nameArabic": "الشرح",
    "translatedName": "Melapangkan",
    "versesCount": 8,
    "revelationPlace": "makkah",
    "audioUrl": "https://server11.mp3quran.net/yasser/094.mp3"
  },
  {
    "id": 95,
    "number": 95,
    "nameSimple": "At-Tin",
    "nameArabic": "التين",
    "translatedName": "Buah Tin",
    "versesCount": 8,
    "revelationPlace": "makkah",
    "audioUrl": "https://server11.mp3quran.net/yasser/095.mp3"
  },
  {
    "id": 96,
    "number": 96,
    "nameSimple": "Al-'Alaq",
    "nameArabic": "العلق",
    "translatedName": "Segumpal Darah",
    "versesCount": 19,
    "revelationPlace": "makkah",
    "audioUrl": "https://server11.mp3quran.net/yasser/096.mp3"
  },
  {
    "id": 97,
    "number": 97,
    "nameSimple": "Al-Qadr",
    "nameArabic": "القدر",
    "translatedName": "Kemuliaan",
    "versesCount": 5,
    "revelationPlace": "makkah",
    "audioUrl": "https://server11.mp3quran.net/yasser/097.mp3"
  },
  {
    "id": 98,
    "number": 98,
    "nameSimple": "Al-Bayyinah",
    "nameArabic": "البينة",
    "translatedName": "Pembuktian",
    "versesCount": 8,
    "revelationPlace": "madinah",
    "audioUrl": "https://server11.mp3quran.net/yasser/098.mp3"
  },
  {
    "id": 99,
    "number": 99,
    "nameSimple": "Az-Zalzalah",
    "nameArabic": "الزلزلة",
    "translatedName": "Kegoncangan",
    "versesCount": 8,
    "revelationPlace": "madinah",
    "audioUrl": "https://server11.mp3quran.net/yasser/099.mp3"
  },
  {
    "id": 100,
    "number": 100,
    "nameSimple": "Al-'Adiyat",
    "nameArabic": "العاديات",
    "translatedName": "Berlari Kencang",
    "versesCount": 11,
    "revelationPlace": "makkah",
    "audioUrl": "https://server11.mp3quran.net/yasser/100.mp3"
  },
  {
    "id": 101,
    "number": 101,
    "nameSimple": "Al-Qari'ah",
    "nameArabic": "القارعة",
    "translatedName": "Hari Kiamat",
    "versesCount": 11,
    "revelationPlace": "makkah",
    "audioUrl": "https://server11.mp3quran.net/yasser/101.mp3"
  },
  {
    "id": 102,
    "number": 102,
    "nameSimple": "At-Takathur",
    "nameArabic": "التكاثر",
    "translatedName": "Bermegah-megahan",
    "versesCount": 8,
    "revelationPlace": "makkah",
    "audioUrl": "https://server11.mp3quran.net/yasser/102.mp3"
  },
  {
    "id": 103,
    "number": 103,
    "nameSimple": "Al-'Asr",
    "nameArabic": "العصر",
    "translatedName": "Waktu Sore",
    "versesCount": 3,
    "revelationPlace": "makkah",
    "audioUrl": "https://server11.mp3quran.net/yasser/103.mp3"
  },
  {
    "id": 104,
    "number": 104,
    "nameSimple": "Al-Humazah",
    "nameArabic": "الهمزة",
    "translatedName": "Pengumpat",
    "versesCount": 9,
    "revelationPlace": "makkah",
    "audioUrl": "https://server11.mp3quran.net/yasser/104.mp3"
  },
  {
    "id": 105,
    "number": 105,
    "nameSimple": "Al-Fil",
    "nameArabic": "الفيل",
    "translatedName": "Gajah",
    "versesCount": 5,
    "revelationPlace": "makkah",
    "audioUrl": "https://server11.mp3quran.net/yasser/105.mp3"
  },
  {
    "id": 106,
    "number": 106,
    "nameSimple": "Quraysh",
    "nameArabic": "قريش",
    "translatedName": "Suku Quraisy",
    "versesCount": 4,
    "revelationPlace": "makkah",
    "audioUrl": "https://server11.mp3quran.net/yasser/106.mp3"
  },
  {
    "id": 107,
    "number": 107,
    "nameSimple": "Al-Ma'un",
    "nameArabic": "الماعون",
    "translatedName": "Barang yang Berguna",
    "versesCount": 7,
    "revelationPlace": "makkah",
    "audioUrl": "https://server11.mp3quran.net/yasser/107.mp3"
  },
  {
    "id": 108,
    "number": 108,
    "nameSimple": "Al-Kawthar",
    "nameArabic": "الكوثر",
    "translatedName": "Nikmat Berlimpah",
    "versesCount": 3,
    "revelationPlace": "makkah",
    "audioUrl": "https://server11.mp3quran.net/yasser/108.mp3"
  },
  {
    "id": 109,
    "number": 109,
    "nameSimple": "Al-Kafirun",
    "nameArabic": "الكافرون",
    "translatedName": "Orang-orang Kafir",
    "versesCount": 6,
    "revelationPlace": "makkah",
    "audioUrl": "https://server11.mp3quran.net/yasser/109.mp3"
  },
  {
    "id": 110,
    "number": 110,
    "nameSimple": "An-Nasr",
    "nameArabic": "النصر",
    "translatedName": "Pertolongan",
    "versesCount": 3,
    "revelationPlace": "madinah",
    "audioUrl": "https://server11.mp3quran.net/yasser/110.mp3"
  },
  {
    "id": 111,
    "number": 111,
    "nameSimple": "Al-Masad",
    "nameArabic": "المسد",
    "translatedName": "Gejolak Api (Sabut)",
    "versesCount": 5,
    "revelationPlace": "makkah",
    "audioUrl": "https://server11.mp3quran.net/yasser/111.mp3"
  },
  {
    "id": 112,
    "number": 112,
    "nameSimple": "Al-Ikhlas",
    "nameArabic": "الإخلاص",
    "translatedName": "Ikhlash",
    "versesCount": 4,
    "revelationPlace": "makkah",
    "audioUrl": "https://server11.mp3quran.net/yasser/112.mp3"
  },
  {
    "id": 113,
    "number": 113,
    "nameSimple": "Al-Falaq",
    "nameArabic": "الفلق",
    "translatedName": "Waktu Shubuh",
    "versesCount": 5,
    "revelationPlace": "makkah",
    "audioUrl": "https://server11.mp3quran.net/yasser/113.mp3"
  },
  {
    "id": 114,
    "number": 114,
    "nameSimple": "An-Nas",
    "nameArabic": "الناس",
    "translatedName": "Umat Manusia",
    "versesCount": 6,
    "revelationPlace": "makkah",
    "audioUrl": "https://server11.mp3quran.net/yasser/114.mp3"
  }
];
