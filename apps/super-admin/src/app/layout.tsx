'use client';

import '@review-canvas/admin-ui/styles.css';
import './globals.css';

import React from 'react';

import { ThemeProvider } from '@emotion/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import theme from '@review-canvas/admin-ui/theme';

import GlobalOverlay from '@/components/common/global-overlay.tsx';
import GlobalStyles from '@/components/global-styles.tsx';
import { notoSansKR, roboto } from '@/theme/font.ts';

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const queryClient = new QueryClient();

  return (
    <html
      className={`${roboto.className} ${notoSansKR.className}`}
      lang="ko"
    >
      <body>
        <ThemeProvider theme={theme}>
          <GlobalStyles />
          <QueryClientProvider client={queryClient}>
            {children}
            <GlobalOverlay />
          </QueryClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
