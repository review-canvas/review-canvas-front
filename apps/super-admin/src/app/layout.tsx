'use client';

import '@review-canvas/admin-ui/styles.css';
import './globals.css';

import React from 'react';

import GlobalStyles from '@/components/global-styles.tsx';
import { notoSansKR, roboto } from '@/theme/font.ts';

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html className={`${roboto.className} ${notoSansKR.className}`} lang="ko">
      <body>
        <GlobalStyles />
        {children}
      </body>
    </html>
  );
}
