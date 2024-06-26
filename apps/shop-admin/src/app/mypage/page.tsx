'use client';

import { useState } from 'react';

import { Button, SolidButton, TextField } from '@ui/components';
import { useRouter } from 'next/navigation';

import EmailCheckButton from '@/components/signup/email-check-button';
import useAuthCheck from '@/hooks/use-auth-check';
import { validateEmail, validatePassword } from '@/lib/regex';
import { AuthService } from '@/service/auth';
import useShopAdminInfoStore from '@/store/auth/shop-admin-info';
import type { EmailCheckStatus } from '@/types/signup';

function MyPage() {
  useAuthCheck();

  const router = useRouter();
  const { info, setInfo } = useShopAdminInfoStore();

  const [email, setEmail] = useState<string>(info.email);
  const [emailCheckStatus, setEmailCheckStatus] = useState<EmailCheckStatus>('unchecked');
  const [password, setPassword] = useState<string>('');
  const [passwordForCheck, setPasswordForCheck] = useState<string>('');
  const [mallNumber, setMallNumber] = useState<string>(info.mallNumber);
  const [phoneNumber, setPhoneNumber] = useState<string>(info.phoneNumber);
  const [mallName, setMallName] = useState<string>(info.mallName);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const isValidEmailFormat = validateEmail(email);
  const isValidPassword = validatePassword(password);
  const isValidPasswordForCheck = Boolean(password === passwordForCheck);

  const isValidEmail = () => {
    return (
      email &&
      ((email === info.email && emailCheckStatus === 'unchecked') ||
        (email !== info.email && emailCheckStatus === 'checked'))
    );
  };

  const isModifyEnabled = Boolean(
    isValidEmail() &&
      password &&
      isValidPasswordForCheck &&
      isValidEmailFormat &&
      isValidPassword &&
      phoneNumber &&
      phoneNumber.length >= 10 &&
      phoneNumber.length <= 11 &&
      mallNumber &&
      mallNumber.length >= 10 &&
      mallNumber.length <= 11 &&
      mallName,
  );

  const handlePressModifyButton = async () => {
    if (isModifyEnabled) {
      setIsLoading(true);

      try {
        const requestForm = {
          email,
          password,
          phoneNumber,
          mallNumber,
          mallName,
        };

        const isSuccess = await AuthService.modifyShopAdminInfo(requestForm);

        if (!isSuccess) {
          throw new Error('정보 수정 실패');
        }

        setInfo({
          ...requestForm,
          businessNumber: info.businessNumber,
        });

        router.refresh();
      } catch (error) {
        // eslint-disable-next-line no-alert -- error alert
        alert('정보 수정 과정에서 일시적으로 문제가 발생했습니다. 잠시 후 다시 시도해주세요');

        setIsLoading(false);
      }
    }
  };

  const handlePressUnregisterButton = async () => {
    try {
      // eslint-disable-next-line no-alert -- required confirm
      if (confirm('회원 탈퇴 후 복구할 수 없습니다. 정말 탈퇴를 진행하시겠습니까?')) {
        await AuthService.unregister();

        // eslint-disable-next-line no-alert -- required alert
        alert('회원 탈퇴가 완료되었습니다. 그동안 리뷰캔버스를 이용해 주셔서 감사합니다');
        router.replace('/auth/login');
      }
    } catch (error) {
      // eslint-disable-next-line no-alert -- error alert
      alert('탈퇴 과정에서 일시적으로 문제가 발생했습니다. 잠시 후 다시 시도해주세요');
    }
  };

  const handlePressResetButton = () => {
    setEmail(info.email);
    setEmailCheckStatus('unchecked');
    setPassword('');
    setPasswordForCheck('');
    setMallNumber(info.mallNumber);
    setPhoneNumber(info.phoneNumber);
    setMallName(info.mallName);
  };

  return (
    <div tw="w-full flex flex-col mt-8">
      <div tw="max-w-[450px] flex flex-col gap-16 pl-4">
        <div tw="flex flex-col gap-6 [& .react-aria-FieldError]:text-sm">
          <div tw="flex gap-6 items-end">
            <TextField
              variant="underline"
              label="이메일"
              placeholder="이메일 입력"
              value={email}
              onChange={setEmail}
              isInvalid={!isValidEmailFormat && Boolean(email)}
              errorMessage="올바른 이메일 포맷으로 작성해 주세요."
            />

            <EmailCheckButton
              email={email}
              onSetStatus={setEmailCheckStatus}
              disabled={!isValidEmailFormat}
              status={emailCheckStatus}
            />
          </div>

          <div tw="flex flex-col">
            <TextField
              variant="underline"
              tw="w-full"
              type="password"
              placeholder="변경할 비밀번호"
              value={password}
              isInvalid={!isValidPassword && Boolean(password)}
              errorMessage="비밀번호는 영문과 숫자, 특수문자를 모두 활용해 9자 이상으로 구성해 주세요."
              onChange={setPassword}
            />
          </div>

          <div tw="flex flex-col">
            <TextField
              variant="underline"
              tw="w-full"
              type="password"
              placeholder="변경할 비밀번호 확인"
              value={passwordForCheck}
              isInvalid={!isValidPasswordForCheck && Boolean(passwordForCheck)}
              errorMessage="변경할 비밀번호와 동일하게 입력해 주세요."
              onChange={setPasswordForCheck}
            />
          </div>

          <div tw="flex flex-col">
            <TextField
              variant="underline"
              tw="w-full"
              type="text"
              label="전화번호"
              placeholder="연락 받으실 전화번호를 입력해 주세요."
              value={mallNumber}
              onChange={setMallNumber}
            />
          </div>

          <div tw="flex flex-col">
            <TextField
              variant="underline"
              tw="w-full"
              type="text"
              label="관리자 전화번호"
              placeholder="연락 받으실 전화번호를 입력해 주세요."
              value={phoneNumber}
              onChange={setPhoneNumber}
            />
          </div>

          <div tw="flex flex-col">
            <TextField
              variant="underline"
              tw="w-full"
              type="text"
              label="쇼핑몰 상호"
              placeholder="쇼핑몰 상호를 입력해 주세요."
              value={mallName}
              onChange={setMallName}
            />
          </div>
        </div>

        <div tw="w-full flex gap-4">
          <SolidButton
            variant={isModifyEnabled ? 'primary' : 'gray'}
            size="sm"
            onPress={() => {
              void handlePressModifyButton();
            }}
            isDisabled={!isModifyEnabled || isLoading}
          >
            저장하기
          </SolidButton>
          <SolidButton
            variant="gray"
            size="sm"
            onPress={handlePressResetButton}
          >
            초기화
          </SolidButton>
        </div>
      </div>

      <div tw="w-full mt-8">
        <Button
          size="sm"
          tw="text-sub-primary underline"
          onPress={() => {
            void handlePressUnregisterButton();
          }}
        >
          회원 탈퇴
        </Button>
      </div>
    </div>
  );
}

export default MyPage;
