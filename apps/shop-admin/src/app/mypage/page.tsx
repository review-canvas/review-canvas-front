'use client';

import useAuthCheck from '@/hooks/use-auth-check';

function MyPage() {
  useAuthCheck();

  return <></>;
}

export default MyPage;
