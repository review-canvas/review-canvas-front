'use client';

import { useParams } from 'next/navigation';

import useShopConnected from '@/hooks/use-shop-connected.ts';
import useShop from '@/state/shop.ts';
import { sendMessageToShop } from '@/utils/message.tsx';

type PageParams = {
  reviewID: string;
};

export default function ReviewDetailPage() {
  const params = useParams<PageParams>();
  const shop = useShop();
  useShopConnected('detail');

  if (!shop.connected) return null;

  const close = () => {
    sendMessageToShop(shop.domain, 'close-review-detail');
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
