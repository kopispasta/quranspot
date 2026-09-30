export interface Reciter {
  id: string;
  name: string;
  arabicName: string;
  country: string;
  role: string;
  avatar: string;
  bio: string;
  audioServer: string;
  style: string;
}

const BASE_URL = import.meta.env.BASE_URL.endsWith('/') ? import.meta.env.BASE_URL : `${import.meta.env.BASE_URL}/`;

export const RECITERS: Reciter[] = [
  {
    id: 'yasser-al-dosari',
    name: 'Yasser Al-Dosari',
    arabicName: 'ياسر الدوسري',
    country: 'Saudi Arabia',
    role: 'Imam & Khatib Masjidil Haram, Makkah',
    avatar: `${BASE_URL}reciters/yasser-al-dosari-hires.png`,
    bio: 'Dr. Sheikh Yasser bin Rashid Al-Dossari adalah Imam dan Khatib Masjidil Haram. Dikenal dengan karakter vokal yang sangat kuat, menggetarkan sanubari, sarat akan tadabbur, dan penuh penghayatan maqam yang khas.',
    audioServer: 'https://server11.mp3quran.net/yasser/',
    style: 'Murattal Khusyuk & Bernada Kuat'
  },
  {
    id: 'abdur-rahman-as-sudais',
    name: 'Abdur-Rahman As-Sudais',
    arabicName: 'عبد الرحمن السديس',
    country: 'Saudi Arabia',
    role: 'Ketua Umum Pengurus Dua Masjid Suci',
    avatar: `${BASE_URL}reciters/abdul-rahman-al-sudais.jpg`,
    bio: 'Dr. Sheikh Abdur-Rahman bin Abdul Aziz As-Sudais adalah Imam Besar Masjidil Haram selama lebih dari empat dekade. Suara dan irama tilawahnya yang tegas, cepat (tempo hadr), dan berwibawa telah menginspirasi ratusan juta umat Muslim di seluruh dunia.',
    audioServer: 'https://server11.mp3quran.net/sds/',
    style: 'Murattal Hadr & Berwibawa'
  },
  {
    id: 'abdullah-al-matrood',
    name: 'Abdullah Al-Matrood',
    arabicName: 'عبد الله المطرود',
    country: 'Saudi Arabia',
    role: 'Qari & Imam Terkemuka Arab Saudi',
    avatar: `${BASE_URL}reciters/abdullah-al-matrood.jpg`,
    bio: 'Sheikh Abdullah bin Muhammad Al-Matrood adalah salah satu qari paling disukai dengan karakter suara yang lembut, tenang, dan irama tartil yang sangat mengalir menyejukkan hati untuk perenungan dan tadabbur.',
    audioServer: 'https://server8.mp3quran.net/mtrod/',
    style: 'Murattal Tartil Tenang'
  }
];

export const CURRENT_RECITER: Reciter = RECITERS[0];
