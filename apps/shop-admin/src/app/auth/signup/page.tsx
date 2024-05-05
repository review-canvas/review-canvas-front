'use client'

import React, { useEffect } from 'react';

import { useRouter } from 'next/navigation';

import Step1 from '@/components/signup/step1';
import Step2 from '@/components/signup/step2';
import Step3 from '@/components/signup/step3';
import useSignupStore from '@/store/signup';

const StepComponentsMap = new Map<string, () => React.ReactElement>([
  ['step1', () => <Step1 />],
  ['step2', () => <Step2 />],
  ['step3', () => <Step3 />],
]);

function AuthSignUpPage() {
  const { currentStep } = useSignupStore();
  const router = useRouter();

  useEffect(() => {
    router.push(`/auth/signup#${currentStep}`, undefined);
  }, [currentStep, router]);

  const CurrentStepComponent = StepComponentsMap.get(currentStep);

  return (
    <div>
      <h1>회원가입</h1>
      <div>{CurrentStepComponent ? <CurrentStepComponent /> : <p>No Step</p>}</div>
    </div>
  );
}

export default AuthSignUpPage;
