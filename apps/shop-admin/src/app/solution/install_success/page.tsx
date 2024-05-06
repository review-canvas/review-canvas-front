'use client';

import { useEffect } from 'react';

import SolidButton from '@ui/components/button/solid-button';
import { useRouter, useSearchParams } from 'next/navigation';

function InstallSuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const mallId = searchParams?.get('mallId');

  useEffect(() => {
    if (!mallId) {
      // eslint-disable-next-line no-alert -- exception
      alert('비정상적인 접근입니다. 로그인 페이지로 이동합니다.');
      router.replace('/auth/login');
    }
  }, []);

  const handlePressSignUpButton = () => {
    router.push(`/auth/signup?mallId=${mallId}`);
  };

  return (
    <div tw="h-full flex flex-col justify-center items-center items-center gap-10">
      {mallId ? (
        <>
          <div tw="text-2xl font-normal text-black">
            <span tw="text-main-primary font-medium">리뷰캔버스</span> 설치가 완료되었습니다.
          </div>
          <div>
            <SolidButton
              variant="primary"
              size="lg"
              tw="font-normal h-12"
              onPress={handlePressSignUpButton}
            >
              회원가입 시작
            </SolidButton>
          </div>
        </>
      ) : null}
    </div>
  );
}

export default InstallSuccessPage;
