'use client';

import { ReviewServiceProvider } from '@/services/review.tsx';

export default function ReviewLayout({ children }: React.PropsWithChildren) {
  return <ReviewServiceProvider>{children}</ReviewServiceProvider>;
}
