'use client';

import { notFound } from 'next/navigation';

import CloseButton from '@/components/close-button';
import useReviewCanvasReady from '@/hooks/use-review-canvas-ready.ts';
import useShop from '@/state/shop.ts';
import { sendMessageToShop } from '@/utils/message.ts';

interface ConnectedPageProps {
  userID: string;
}
export default function MyReviewsPage({ userID }: ConnectedPageProps) {
  useReviewCanvasReady('mypage');
  const shop = useShop();
  if (!userID) notFound();

  if (!shop.connected) return <div>connecting...</div>;

  const close = () => {
    sendMessageToShop(shop.domain, 'close-modal');
  };

  return (
    <main className="relative">
      <CloseButton close={close}/>
      <h1>My Reviews</h1>
      <p>Hello, {userID}!</p>
    </main>
  );
}
