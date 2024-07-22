type Language = 'en' | 'bh';

interface Translations {
  settings: string;
  language: string;
  difficulty: string;
  easy: string;
  medium: string;
  hard: string;
  music: string;
  sound: string;
  save: string;
  counting: string;
  compare: string;
  adding: string;
  subtracting: string;
  multiply: string;
  divide: string;
  quiz: string;
  howMany: string;
}

const translations: Record<Language, Translations> = {
  en: {
    settings: 'Settings',
    language: 'Language: ',
    difficulty: 'Difficulty: ',
    easy: 'Easy',
    medium: 'Medium',
    hard: 'Hard',
    music: 'Music: ',
    sound: 'Sound FX: ',
    save: 'Save',
    counting: 'Counting',
    compare: 'Compare',
    adding: 'Adding',
    subtracting: 'Subtracting',
    multiply: 'Multiply',
    divide: 'Divide',
    quiz: 'Quiz',
    howMany: 'How Many?'
  },
  bh: {
    settings: 'Postavke',
    language: 'Jezik: ',
    difficulty: 'Težina: ',
    easy: 'Lako',
    medium: 'Srednje Teško',
    hard: 'Teško',
    music: 'Muzika: ',
    sound: 'Zvuk:',
    save: 'Sačuvaj',
    counting: 'Brojanje',
    compare: 'Poređenje',
    adding: 'Sabiranje',
    subtracting: 'Oduzimanje',
    multiply: 'Množenje',
    divide: 'Dijeljenje',
    quiz: 'Kviz',
    howMany: 'Koliko ima?'
  },
};

export { translations, Language };
