'use client';

import { Suspense, useEffect } from 'react';

import { useRouter, useSearchParams } from 'next/navigation';

import localStorage from '@/lib/storage/local-storage';
import { SolutionCafe24Service } from '@/service/solution/cafe24';

function SolutionCafe24AuthCodePage() {
  return (
    <Suspense>
      <SolutionCafe24AuthCodePageContent />
    </Suspense>
  );
}

function SolutionCafe24AuthCodePageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const authCode = searchParams?.get('code');
  const mallId = localStorage.getItem('cafe24MallId');

  useEffect(() => {
    const tryAuthenticate = async () => {
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
        const installStatus = await SolutionCafe24Service.authenticate(mallId, authCode);
        localStorage.removeItem('cafe24MallId');

        switch (installStatus) {
          case 'INSTALLED':
            router.replace(`/solution/install_success?mallId=${mallId}`);
            break;

          case 'PREVIOUS_INSTALLED':
            router.replace(`/auth/signup?mallId=${mallId}`);
            break;

          case 'REGISTERED':
            localStorage.setItem('cafe24InstallStatus', installStatus);
            router.replace('/auth/login');
        }
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
