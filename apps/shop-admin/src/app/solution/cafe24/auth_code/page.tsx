'use client';

import { Suspense, useEffect } from 'react';

import { useRouter, useSearchParams } from 'next/navigation';

import { SolutionCafe24Service } from '@/service/solution/cafe24';
import useSolutionCafe24Store from '@/store/solution/cafe24';

function SolutionCafe24AuthCodePage() {
  return (
    <Suspense>
      <SolutionCafe24AuthCodePageContent />
    </Suspense>
  );
}

function SolutionCafe24AuthCodePageContent() {
  const router = useRouter();
  const { mallId } = useSolutionCafe24Store();
  const searchParams = useSearchParams();
  const authCode = searchParams?.get('code');
  const state = searchParams?.get('state');

  useEffect(() => {
    const tryAuthenticate = async () => {
      if (state !== 'app_install') {
        // eslint-disable-next-line no-alert -- exception occured
        alert('비정상적인 설치 방식입니다. 리뷰캔버스 고객 센터에 문의해 주세요.');
        return;
      }

      if (!mallId) {
        // eslint-disable-next-line no-alert -- exception occured
        alert('Mall ID가 존재하지 않습니다. 리뷰캔버스 고객 센터에 문의해 주세요.');
        return;
      }

      if (!authCode) {
        // eslint-disable-next-line no-alert -- exception occured
        alert('인증 코드가 존재하지 않습니다. 리뷰캔버스 고객 센터에 문의해 주세요.');
        return;
      }

      try {
        await SolutionCafe24Service.authenticate(mallId, authCode);
        router.replace('/auth/signup');
      } catch (err) {
        // eslint-disable-next-line no-console -- need for analytics
        console.error(err);
        // eslint-disable-next-line no-alert -- exception occured
        alert('설치가 정상적으로 이루어지지 않았습니다. 리뷰캔버스 고객 센터에 문의해 주세요.');
      }
    };

    void tryAuthenticate();
  }, [authCode]);

  return <div>{authCode}</div>;
}

export default SolutionCafe24AuthCodePage;
