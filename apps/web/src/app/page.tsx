'use client';

import { Suspense } from 'react';

import { ReviewServiceProvider } from '@/services/review.tsx';
import useShopConnection from '@/state/connection';

import ConnectedPage from './connected-page.tsx';
import DisconnectedPage from './disconnected-page';

export default function Page() {
  const shopConnection = useShopConnection();
  if (!shopConnection.connected) return <DisconnectedPage />;

  return (
    <ReviewServiceProvider>
      <Suspense fallback={<p>loading...</p>}>
        <ConnectedPage
          domain={shopConnection.domain}
          productId="1"
          shopId={shopConnection.id}
        />
      </Suspense>
    </ReviewServiceProvider>
  );
}
