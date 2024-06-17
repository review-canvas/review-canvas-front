'use client';

import { ReviewServiceProvider } from '@/services/review';

export default function ReviewLayout({ children }: React.PropsWithChildren) {
  return <ReviewServiceProvider>{children}</ReviewServiceProvider>;
}
