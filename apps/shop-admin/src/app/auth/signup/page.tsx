'use client'

import React, { Suspense, useEffect } from 'react';

import { useRouter, useSearchParams } from 'next/navigation';

import StepIndicator from '@/components/signup/step-indicator';
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
  return (
    <Suspense>
      <AuthSignUpPageContent />
    </Suspense>
  );
}

function AuthSignUpPageContent() {
  const { currentStep, updateFormData } = useSignupStore();
  const router = useRouter();
  const searchParams = useSearchParams();
  const mallId = searchParams?.get('mallId');

  useEffect(() => {
    if (mallId) {
      updateFormData({
        mallId,
      });
    }

    const endpoint = mallId ? `/auth/signup#${currentStep}?mallId=${mallId}` : `/auth/signup#${currentStep}`;

    const isInit = !window.location.hash;
    isInit ? router.replace(endpoint) : router.push(endpoint);
  }, [currentStep]);

  const CurrentStepComponent = StepComponentsMap.get(currentStep);

  return (
    <div tw="flex w-full h-screen bg-sub-secondary">
      <main tw="flex flex-col w-full h-screen justify-center items-center gap-10">
        <StepIndicator currentStep={currentStep} />

        <div tw="w-6/12 min-w-80 p-14 bg-white shadow-sm rounded-lg">
          <div>{CurrentStepComponent ? <CurrentStepComponent /> : <p>No Step</p>}</div>
        </div>
      </main>
    </div>
  );
}

export default AuthSignUpPage;
