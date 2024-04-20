'use client';

import { useParams } from 'next/navigation';

import useShopConnected from '@/hooks/use-shop-connected.ts';
import useShopConnection from '@/state/connection.ts';

type PageParams = {
  reviewID: string;
};

export default function ReviewDetailPage() {
  const params = useParams<PageParams>();
  const shopConnection = useShopConnection();
  useShopConnected('detail');

  if (!shopConnection.connected) return null;

  const close = () => {
    window.parent.postMessage({ type: 'close-review-detail' }, shopConnection.domain);
  };

  return (
    <main>
      <button
        onClick={close}
        type="button"
      >
        close
      </button>
      This is review detail for {params?.reviewID}
    </main>
  );
}
