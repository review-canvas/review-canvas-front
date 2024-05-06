'use client';

import { SolidButton } from '@ui/components';
import { useRouter } from 'next/navigation';

import CheckRoundIcon from '@/assets/icon/icon-check-round.svg';
import useSignupStore from '@/store/signup';

import ReviewCanvasLogo from '../common/review-canvas-logo';

function Step3() {
  const { formData, updateFormData } = useSignupStore();
  const router = useRouter();

  const handlePressLoginButton = () => {
    updateFormData({
      email: '',
      password: '',
      mallId: '',
      mallName: '',
      phoneNumber: '',
      consentedTermsIds: [],
    });

    router.replace('/auth/login');
  };

  return (
    <div tw="w-full flex flex-col gap-10 justify-between">
      <div tw="w-full flex justify-center items-center">
        <ReviewCanvasLogo />
      </div>

      <div tw="w-full flex flex-col justify-center mb-6">
        <div tw="w-full flex flex-col justify-center items-center gap-5 mb-16">
          <CheckRoundIcon />
          <div tw="text-2xl text-main-primary">회원가입 완료</div>
        </div>

        <div tw="w-full flex flex-col justify-center items-center gap-8">
          <div tw="text-ml font-normal text-center text-main-secondary">
            <div>{formData.mallName}님의 회원가입이</div>
            <div>완료되었습니다.</div>
          </div>

          <div tw="text-sm font-normal text-center text-[#B5B8D0]">
            회원가입 내역 및 수정은 <span tw="font-semibold">마이페이지</span>에서 가능합니다.
          </div>
        </div>
      </div>

      <div tw="w-full flex justify-center items-center">
        <SolidButton
          variant="primary"
          size="lg"
          tw="py-6"
          onPress={handlePressLoginButton}
        >
          로그인
        </SolidButton>
      </div>
    </div>
  );
}

export default Step3;
