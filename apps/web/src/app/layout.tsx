'use client';

import { useEffect } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import GlobalStyles from '@/components/global-styles.tsx';
import useShop from '@/state/shop.ts';
import { notoSansKR } from '@/theme/font.ts';

import './globals.css';
import { DesignPropertyServiceProvider } from '@/services/design-property.tsx';

const queryClient = new QueryClient();

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const shop = useShop();

  useEffect(() => {
    const handleMessage = (evt: MessageEvent<{ type: string; payload: string }>) => {
      const { type, payload } = evt.data;
      if (type !== 'connect') return;
      shop.connect(payload, evt.origin);
    };
    window.addEventListener('message', handleMessage);
    return () => {
      window.removeEventListener('message', handleMessage);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- This effect should only run once
  }, []);

  return (
    <html
      className={notoSansKR.className}
      lang="ko"
    >
      <body>
        <GlobalStyles />
        <QueryClientProvider client={queryClient}>
          <DesignPropertyServiceProvider>{children}</DesignPropertyServiceProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
