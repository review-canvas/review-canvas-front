'use client';

import './globals.css';

import React from 'react';

import GlobalStyles from '@/components/global-styles.tsx';

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      <body>
        <GlobalStyles />
        {children}
      </body>
    </html>
  );
}
