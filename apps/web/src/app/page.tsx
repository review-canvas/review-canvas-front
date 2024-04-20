'use client';

import { Suspense } from 'react';

import useShopConnected from '@/hooks/use-shop-connected.ts';
import { ReviewServiceProvider } from '@/services/review.tsx';
import useShop from '@/state/shop.ts';

import ConnectedPage from './connected-page.tsx';
import DisconnectedPage from './disconnected-page';

export default function Page() {
  const shop = useShop();
  useShopConnected('list');
  if (!shop.connected) return <DisconnectedPage />;

  return (
    <ReviewServiceProvider>
      <Suspense fallback={<p>loading...</p>}>
        <ConnectedPage
          shop={shop}
          productId="1"
        />
      </Suspense>
    </ReviewServiceProvider>
  );
}
