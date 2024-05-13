'use client';

import type { PropsWithChildren } from 'react';

import { ReviewServiceProvider } from '@/services/review.tsx';

export default function ReviewEditLayout({ children }: PropsWithChildren) {
  return <ReviewServiceProvider>{children}</ReviewServiceProvider>;
}
