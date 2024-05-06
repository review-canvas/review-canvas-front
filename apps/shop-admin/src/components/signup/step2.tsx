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
  const mallId = searchParams?.get('mallId');

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
      password === passwordForCheck &&
      validateEmail(email) &&
      validatePassword(password) &&
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

      <div tw="w-full flex flex-col">
        <div tw="w-full border-b-[3px] border-b-black pb-1 mb-10">
          <span tw="text-xl text-main-secondary font-bold">정보입력</span>
        </div>

        <div tw="w-full flex flex-col gap-6 mb-20">
          <div tw="w-full flex gap-6 items-center">
            <TextField
              variant="underline"
              tw="w-full"
              placeholder="이메일"
              value={email}
              onChange={setEmail}
              isReadOnly={emailCheckStatus === 'checked'}
            />

            <EmailCheckButton
              email={email}
              onSetStatus={setEmailCheckStatus}
              status={emailCheckStatus}
            />
          </div>

          <div tw="w-full flex items-center">
            <TextField
              variant="underline"
              tw="w-full"
              placeholder="비밀번호"
              value={password}
              onChange={setPassword}
            />
          </div>

          <div tw="w-full flex items-center">
            <TextField
              variant="underline"
              tw="w-full"
              placeholder="비밀번호 확인"
              value={passwordForCheck}
              onChange={setPasswordForCheck}
              onFocusChange={() => {}}
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
