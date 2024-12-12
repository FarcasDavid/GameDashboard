// List of simple 5-letter words for the game
const WORD_LIST = [
  'HAPPY', 'SMILE', 'DANCE', 'LIGHT', 'DREAM',
  'BEACH', 'SUNNY', 'CLOUD', 'HEART', 'MUSIC',
  'PAINT', 'SWEET', 'FRESH', 'BREAD', 'SLEEP'
];

export function getRandomWord(): string {
  return WORD_LIST[Math.floor(Math.random() * WORD_LIST.length)];
}

export function scrambleWord(word: string): string {
  const letters = word.split('');
  for (let i = letters.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [letters[i], letters[j]] = [letters[j], letters[i]];
  }
  
  // Ensure the scrambled word is different from the original
  const scrambled = letters.join('');
  return scrambled === word ? scrambleWord(word) : scrambled;
}