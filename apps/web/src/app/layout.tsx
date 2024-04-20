'use client';

import { useEffect } from 'react';

import GlobalStyles from '@/components/global-styles.tsx';
import useShopConnection from '@/state/connection.ts';

import './globals.css';

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const shopConnection = useShopConnection();

  console.log(shopConnection.connected ? shopConnection.id : 'disconnected');

  useEffect(() => {
    window.parent.postMessage({ type: 'review-canvas-ready' }, '*');
    const handleMessage = (evt: MessageEvent<{ type: string; payload: string }>) => {
      const { type, payload } = evt.data;
      console.log(`Received message from ${evt.origin}:`, type, payload);
      shopConnection.connect(payload, evt.origin);
    };
    window.addEventListener('message', handleMessage);
    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  return (
    <html lang="ko">
      <body>
        <GlobalStyles />
        {children}
      </body>
    </html>
  );
}
