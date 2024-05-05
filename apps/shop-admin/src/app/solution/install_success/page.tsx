'use client';

import SolidButton from '@ui/components/button/solid-button';
import { useRouter } from 'next/navigation';

function InstallSuccessPage() {
  const router = useRouter();

  const handlePressSignUpButton = () => {
    router.push('/auth/signup?state=app_install');
  };

  return (
    <div tw="h-full flex flex-col justify-center items-center items-center gap-10">
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
    </div>
  );
}

export default InstallSuccessPage;
