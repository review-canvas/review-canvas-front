// eslint-disable-next-line camelcase -- next 에서 기본 제공하는 함수
import { Noto_Sans_KR, Roboto } from 'next/font/google';

export const roboto = Roboto({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  variable: '--roboto',
});
export const notoSansKR = Noto_Sans_KR({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  variable: '--noto-sans-kr',
});
