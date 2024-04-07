'use client';

import '@review-canvas/admin-ui/styles.css';
import './globals.css';

import React from 'react';

import { ThemeProvider } from '@emotion/react';

import theme from '@review-canvas/admin-ui/theme';

import GlobalStyles from '@/components/global-styles.tsx';

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      <body>
        <ThemeProvider theme={theme}>
          <GlobalStyles />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
