'use client';

import { useState } from 'react';

import { SolidButton, TextField } from '@ui/components';

import EmailCheckButton from '@/components/signup/email-check-button';
import useAuthCheck from '@/hooks/use-auth-check';
import { validateEmail, validatePassword } from '@/lib/regex';
import useShopAdminInfoStore from '@/store/auth/shop-admin-info';
import type { EmailCheckStatus } from '@/types/signup';

function MyPage() {
  useAuthCheck();

  const { info } = useShopAdminInfoStore();

  const [email, setEmail] = useState<string>(info.email);
  const [emailCheckStatus, setEmailCheckStatus] = useState<EmailCheckStatus>('unchecked');
  const [password, setPassword] = useState<string>('');
  const [passwordForCheck, setPasswordForCheck] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>(info.phoneNumber);
  const [mallName, setMallName] = useState<string>(info.mallName);

  const isValidEmailFormat = validateEmail(email);
  const isValidPassword = validatePassword(password);
  const isValidPasswordForCheck = Boolean(password === passwordForCheck);

  const handlePressResetButton = () => {
    setEmail(info.email);
    setEmailCheckStatus('unchecked');
    setPassword('');
    setPasswordForCheck('');
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
            variant="primary"
            size="sm"
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
    </div>
  );
}

export default MyPage;
