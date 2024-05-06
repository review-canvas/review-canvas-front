'use client';

import ReviewList from '@/components/review/list.tsx';
import { ReviewItemStyleProvider } from '@/contexts/style/review-item.ts';
import { ReviewListStyleProvider } from '@/contexts/style/review-list.ts';
import { useConnectedShop } from '@/state/shop.ts';

interface ConnectedPageProps {
  productID: string;
}

export default function ConnectedPage({ productID }: ConnectedPageProps) {
  const { id, domain } = useConnectedShop();

  return (
    <main>
      <h1>
        Reviews for product {productID} from shop {id} at {domain}
      </h1>
      <ReviewListStyleProvider
        value={{
          orderSelectorStyle: 'radio',
          paginationStyle: 'scroll',
          selectedOrderColor: '#000000',
          padding: {
            top: '10px',
            right: '10px',
            bottom: '10px',
            left: '10px',
          },
          width: '100%',
          border: {
            top: '0',
            right: '0',
            bottom: '0',
            left: '0',
          },
          borderColor: '#ffffff',
          shadow: 'none',
          shadowColor: 'transparent',
          backgroundColor: '#ffffff',
        }}
      >
        <ReviewItemStyleProvider
          value={{
            margin: {
              top: '12px',
              right: '0',
              bottom: '0',
              left: '4px',
            },
            padding: {
              top: '4px',
              right: '0',
              bottom: '4px',
              left: '12px',
            },
            font: {
              color: '#000000',
              size: '14px',
              weight: 'normal',
              name: 'noto-sans-kr',
            },
            border: {
              top: '0',
              right: '0',
              bottom: '0',
              left: '3px',
            },
            borderColor: '#777777',
            borderRadius: {
              topLeft: '2px',
              topRight: '0',
              bottomRight: '0',
              bottomLeft: '2px',
            },
            shadow: 'none',
            shadowColor: 'rgba(0, 0, 0, 0.1)',
            backgroundColor: '#ffffff',
          }}
        >
          <ReviewList productID={productID} />
        </ReviewItemStyleProvider>
      </ReviewListStyleProvider>
    </main>
  );
}
