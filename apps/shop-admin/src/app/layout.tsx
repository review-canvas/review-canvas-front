'use client';

import '@review-canvas/admin-ui/styles.css';
import './globals.css';

import React from 'react';

import { ThemeProvider } from '@emotion/react';

import theme from '@review-canvas/admin-ui/theme';

import GlobalStyles from '@/components/global-styles.tsx';
import { notoSansKR, roboto } from '@/theme/font.ts';

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      className={`${roboto.className} ${notoSansKR.className}`}
      lang="ko"
    >
      <body>
        <ThemeProvider theme={theme}>
          <GlobalStyles />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
