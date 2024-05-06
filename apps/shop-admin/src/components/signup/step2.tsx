'use client';

import { useState } from 'react';

import SolidButton from '@ui/components/button/solid-button';
import Select from '@ui/components/select';
import TextField from '@ui/components/text-field';
import { useSearchParams } from 'next/navigation';

import ReviewCanvasLogo from '@/components/common/review-canvas-logo';
import { phoneIdentifiers } from '@/constants';
import { validateEmail, validateIsOnlyNumber, validatePassword } from '@/lib/regex';
import { AuthService } from '@/service/auth';
import useSignupStore from '@/store/signup';
import type { EmailCheckStatus, SignupFormData } from '@/types/signup';

import EmailCheckButton from './email-check-button';

type PhoneIdentifier = (typeof phoneIdentifiers)[number];

function Step2() {
  const [email, setEmail] = useState<string>('');
  const [emailCheckStatus, setEmailCheckStatus] = useState<EmailCheckStatus>('unchecked');
  const [password, setPassword] = useState<string>('');
  const [passwordForCheck, setPasswordForCheck] = useState<string>('');

  const [phoneIdentifier, setPhoneIdentifier] = useState<PhoneIdentifier>('010');
  const [phoneSecondNumber, setPhoneSecondNumber] = useState<string>('');
  const [phoneThirdNumber, setPhoneThirdNumber] = useState<string>('');
  const [mallName, setMallName] = useState<string>('');

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { goToNextStep, formData, updateFormData } = useSignupStore();
  const searchParams = useSearchParams();
  const mallId = searchParams?.get('mallId') ?? formData.mallId;

  const isValidEmailFormat = validateEmail(email);
  const isValidPassword = validatePassword(password);
  const isValidPasswordForCheck = Boolean(password === passwordForCheck);

  const validatePhoneNumber = () => {
    return (
      phoneSecondNumber.length >= 3 &&
      phoneSecondNumber.length <= 4 &&
      phoneThirdNumber.length >= 3 &&
      phoneThirdNumber.length <= 4
    );
  };

  const isNextStepEnabled = Boolean(
    email &&
      emailCheckStatus === 'checked' &&
      password &&
      isValidPasswordForCheck &&
      isValidEmailFormat &&
      isValidPassword &&
      validatePhoneNumber() &&
      mallId &&
      mallName,
  );

  const handlePressButton = async () => {
    if (isNextStepEnabled) {
      setIsLoading(true);

      try {
        const phoneNumber = `${phoneIdentifier}${phoneSecondNumber}${phoneThirdNumber}`;
        const requestForm: SignupFormData = {
          email,
          password,
          phoneNumber,
          mallName,
          mallId: String(mallId), // 진행 가능 여부 판단 메소드에서 null 여부 체크 이루어짐
          consentedTermsIds: formData.consentedTermsIds,
        };

        await AuthService.signup(requestForm);

        updateFormData(requestForm);
        goToNextStep();
      } catch (error) {
        // eslint-disable-next-line no-console -- Error Stack Trace
        console.error('회원가입 실패: ', error);

        // eslint-disable-next-line no-alert -- require alert
        alert('회원가입 과정에서 일시적으로 문제가 발생했습니다. 잠시 후 다시 시도해주세요');

        setIsLoading(false);
      }
    }
  };

  return (
    <div tw="w-full flex flex-col gap-10 justify-between">
      <div tw="w-full flex justify-center items-center">
        <ReviewCanvasLogo />
      </div>

      <div tw="w-full flex flex-col [& .react-aria-FieldError]:text-sm">
        <div tw="w-full border-b-[3px] border-b-black pb-1 mb-10">
          <span tw="text-xl text-main-secondary font-bold">정보입력</span>
        </div>

        <div tw="w-full flex flex-col gap-6 mb-20">
          <div tw="w-full flex gap-6 items-center">
            <TextField
              variant="underline"
              tw="w-full"
              type="email"
              placeholder="이메일"
              value={email}
              onChange={setEmail}
              isReadOnly={emailCheckStatus === 'checked'}
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

          <div tw="w-full flex items-center">
            <TextField
              variant="underline"
              tw="w-full"
              type="password"
              placeholder="비밀번호"
              value={password}
              isInvalid={!isValidPassword && Boolean(password)}
              errorMessage="비밀번호는 영문과 숫자, 특수문자를 모두 활용해 9자 이상으로 구성해 주세요."
              onChange={setPassword}
            />
          </div>

          <div tw="w-full flex items-center">
            <TextField
              variant="underline"
              tw="w-full"
              type="password"
              placeholder="비밀번호 확인"
              value={passwordForCheck}
              isInvalid={!isValidPasswordForCheck && Boolean(passwordForCheck)}
              errorMessage="비밀번호와 동일하게 입력해 주세요."
              onChange={setPasswordForCheck}
            />
          </div>

          <div tw="w-full flex justify-between items-center gap-4">
            <span tw="text-base text-main-secondary w-[6rem]">전화번호</span>
            <Select
              tw="w-1/3"
              selectedKey={phoneIdentifier}
              defaultSelectedKey={phoneIdentifier}
              onSelectionChange={(key) => {
                setPhoneIdentifier(key as PhoneIdentifier);
              }}
            >
              {phoneIdentifiers.map((identifier) => {
                return (
                  <Select.Item
                    id={identifier}
                    key={identifier}
                    tw="bg-white"
                  >
                    {identifier}
                  </Select.Item>
                );
              })}
            </Select>

            <TextField
              variant="underline"
              tw="w-1/3"
              value={phoneSecondNumber}
              maxLength={4}
              onChange={(value) => {
                if (validateIsOnlyNumber(value)) {
                  setPhoneSecondNumber(value);
                }
              }}
            />

            <TextField
              variant="underline"
              tw="w-1/3"
              value={phoneThirdNumber}
              maxLength={4}
              onChange={(value) => {
                if (validateIsOnlyNumber(value)) {
                  setPhoneThirdNumber(value);
                }
              }}
            />
          </div>

          <div tw="w-full flex items-center">
            <TextField
              variant="underline"
              tw="w-full"
              placeholder="쇼핑몰 상호"
              value={mallName}
              onChange={setMallName}
            />
          </div>
        </div>

        <div tw="w-full">
          <SolidButton
            variant={isNextStepEnabled ? 'primary' : 'gray'}
            tw="w-full"
            onPress={() => {
              void handlePressButton();
            }}
            isDisabled={!isNextStepEnabled || isLoading}
          >
            회원 가입하기
          </SolidButton>
        </div>
      </div>
    </div>
  );
}

export default Step2;
