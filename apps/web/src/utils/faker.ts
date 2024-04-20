import type { Review } from '@/models/review.ts';

export const delayedData = <T>(data: T) => {
  return new Promise<T>((resolve) => {
    const latency = Math.floor(Math.random() * 1000) + 500;
    setTimeout(() => {
      resolve(data);
    }, latency);
  });
};

export const loremIpsum = () => {
  const words = [
    'lorem',
    'ipsum',
    'dolor',
    'sit',
    'amet',
    'consectetur',
    'adipiscing',
    'elit',
    'sed',
    'do',
    'eiusmod',
    'tempor',
    'incididunt',
    'ut',
    'labore',
    'et',
    'dolore',
    'magna',
    'aliqua',
    'enim',
    'ad',
    'minim',
    'veniam',
    'quis',
    'nostrud',
    'exercitation',
    'ullamco',
    'laboris',
    'nisi',
    'aliquip',
    'ex',
    'ea',
    'commodo',
    'consequat',
    'duis',
    'aute',
    'irure',
    'reprehenderit',
    'voluptate',
    'velit',
    'esse',
    'cillum',
    'eu',
    'fugiat',
    'nulla',
    'pariatur',
    'excepteur',
    'sint',
    'occaecat',
    'cupidatat',
    'non',
    'proident',
    'sunt',
    'culpa',
    'qui',
    'officia',
    'deserunt',
    'mollit',
    'anim',
    'id',
    'est',
  ];

  const randomLength = Math.floor(Math.random() * 10) + 5;
  const randomWords = Array.from({ length: randomLength }, () => {
    const randomIndex = Math.floor(Math.random() * words.length);
    return words[randomIndex];
  });

  return randomWords.join(' ');
};

export const name = () => {
  const names = [
    'John Doe',
    'Jane Doe',
    'Alice',
    'Bob',
    'Charlie',
    'David',
    'Eve',
    'Frank',
    'Grace',
    'Heidi',
    'Isaac',
    'Jack',
    'Karl',
    'Lily',
    'Mallory',
    'Nancy',
    'Oscar',
    'Peggy',
    'Quentin',
    'Rachel',
    'Steve',
    'Trudy',
    'Ursula',
    'Victor',
    'Walter',
    'Xander',
    'Yvonne',
    'Zelda',
  ];

  const randomIndex = Math.floor(Math.random() * names.length);
  return names[randomIndex];
};

export const createDummyReview = (id: string): Review => ({
  id,
  productId: '1',
  rating: 5,
  comment: loremIpsum(),
  reviewer: name(),
});
