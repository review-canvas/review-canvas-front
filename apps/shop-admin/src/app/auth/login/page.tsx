'use client';

import { useState } from 'react';

import { Checkbox, SolidButton, TextField } from '@ui/components';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import ReviewCanvasLogo from '@/components/common/review-canvas-logo';
import { validateEmail } from '@/lib/regex';
import { AuthService } from '@/service/auth';

function AuthLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const isValidEmailFormat = validateEmail(email);
  const isLoginEnabled = isValidEmailFormat && Boolean(password);

  const handleLogin = () => {
    const tryLogin = async () => {
      if (!email) {
        // eslint-disable-next-line no-alert -- email is required
        alert('이메일을 입력해 주세요');
        return;
      }

      if (!password) {
        // eslint-disable-next-line no-alert -- password is required
        alert('비밀번호를 입력해 주세요');
        return;
      }

      try {
        await AuthService.login(email, password);
        router.replace('/dashboard');
      } catch (e) {
        // eslint-disable-next-line no-alert -- alert is required
        alert('로그인에 실패했습니다. 이메일과 비밀번호를 확인해주세요.');
      }
    };

    void tryLogin();
  };

  return (
    <div tw="flex flex-col w-full items-center">
      <div tw="w-full mb-12 text-center">
        <ReviewCanvasLogo />
      </div>

      <div tw="flex flex-col w-full gap-4 mb-6 [& .react-aria-FieldError]:text-sm">
        <div tw="w-full">
          <TextField
            variant="underline"
            type="email"
            placeholder="이메일"
            value={email}
            onChange={setEmail}
            isInvalid={!isValidEmailFormat && Boolean(email)}
            errorMessage="올바른 이메일 포맷으로 입력해 주세요."
          />
        </div>

        <div tw="w-full">
          <TextField
            variant="underline"
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={setPassword}
          />
        </div>

        <div tw="w-full mt-2">
          <Checkbox>이메일 저장</Checkbox>
        </div>
      </div>

      <div tw="flex flex-col w-full gap-4">
        <div tw="w-full">
          <SolidButton
            variant={isLoginEnabled ? 'primary' : 'gray'}
            size="lg"
            tw="w-full h-12"
            isDisabled={!isLoginEnabled}
            onPress={handleLogin}
          >
            로그인
          </SolidButton>
        </div>

        <div tw="w-full flex justify-between [&_a]:text-main-secondary [&_a]:text-sm">
          <div>
            <Link href="/auth/login">아이디·비밀번호 찾기</Link>
          </div>

          <div>
            <Link href="/auth/signup">회원가입</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthLoginPage;
