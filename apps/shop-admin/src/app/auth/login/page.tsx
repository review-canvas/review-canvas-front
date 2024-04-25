'use client'

import { useRef } from 'react';

import { Checkbox, SolidButton, TextField } from '@ui/components';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

function AuthLoginPage() {
  const router = useRouter();
  const emailTextFieldRef = useRef<HTMLInputElement>(null);
  const passwordTextFieldRef = useRef<HTMLInputElement>(null);

  const handleLogin = () => {
    const email = emailTextFieldRef.current?.value;
    const password = passwordTextFieldRef.current?.value;

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

    router.replace('/dashboard');
  };

  return (
    <div tw="flex flex-col w-full items-center">
      <div tw="w-full mb-12 text-center">
        <div tw="text-xl text-main-primary font-bold">REVIEW CANVAS LOGO</div>
      </div>

      <div tw="flex flex-col w-full gap-4 mb-6">
        <div tw="w-full">
          <TextField
            ref={emailTextFieldRef}
            placeholder="이메일"
            type="email"
            variant="underline"
          />
        </div>

        <div tw="w-full">
          <TextField
            ref={passwordTextFieldRef}
            placeholder="비밀번호"
            type="password"
            variant="underline"
          />
        </div>

        <div tw="w-full mt-2">
          <Checkbox>아이디 저장</Checkbox>
        </div>
      </div>

      <div tw="flex flex-col w-full gap-4">
        <div tw="w-full">
          <SolidButton
            size="lg"
            tw="w-full h-12"
            onPress={handleLogin}
          >
            로그인
          </SolidButton>
        </div>

        <div tw="w-full flex justify-between [&_a]:text-main-secondary [&_a]:text-sm">
          <div>
            <Link href="/">아이디·비밀번호 찾기</Link>
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
