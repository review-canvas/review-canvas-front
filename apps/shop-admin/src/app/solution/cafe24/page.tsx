'use client';

import { Suspense } from 'react';

import { useSearchParams } from 'next/navigation';

import useSolutionCafe24Store from '@/store/solution/cafe24';

function SolutionCafe24Page() {
  return (
    <Suspense>
      <SolutionCafe24PageContent />
    </Suspense>
  );
}

function SolutionCafe24PageContent() {
  const { setMallId } = useSolutionCafe24Store();
  const searchParams = useSearchParams();
  const mallId = searchParams?.get('mall_id');
  const CAFE24_CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID;
  const CAFE24_REDIRECT_URI = process.env.NEXT_PUBLIC_CAFE24_REDIRECT_URI;

  if (!mallId) {
    // eslint-disable-next-line no-alert -- exception alert
    alert('쇼핑몰이 감지되지 않습니다. 고객 센터에 문의해 주세요.');
    return;
  }

  setMallId(mallId);

  window.location.href = `https://${mallId}.cafe24api.com/api/v2/oauth/authorize?response_type=code&client_id=${CAFE24_CLIENT_ID}&state=app_install&redirect_uri=${CAFE24_REDIRECT_URI}&scope=mall.read_product,mall.read_design,mall.write_design,mall.read_privacy`;

  return <div>Cafe24 App 설치</div>;
}

export default SolutionCafe24Page;
