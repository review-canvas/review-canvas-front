'use client';

import { useEffect } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import GlobalStyles from '@/components/global-styles.tsx';
import useShop from '@/state/shop.ts';

import './globals.css';

const queryClient = new QueryClient();

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const shop = useShop();

  useEffect(() => {
    const handleMessage = (evt: MessageEvent<{ type: string; payload: string }>) => {
      const { type, payload } = evt.data;
      if (type !== 'review-canvas-connect') return;
      shop.connect(payload, evt.origin);
    };
    window.addEventListener('message', handleMessage);

    window.parent.postMessage({ type: 'review-canvas-ready' }, '*');
    return () => {
      window.removeEventListener('message', handleMessage);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- This effect should only run once
  }, []);

  return (
    <html lang="ko">
      <body>
        <GlobalStyles />
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
      </body>
    </html>
  );
}
