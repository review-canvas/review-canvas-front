'use client'

import React, { useState } from 'react';

import { useRouter } from 'next/navigation';

import Step1 from '@/components/signup/step1';
import Step2 from '@/components/signup/step2';

const steps = ['step1', 'step2'];

function Signup() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(steps[0]);

  const handleNextStep = () => {
    const nextStepIndex = steps.indexOf(currentStep) + 1;
    if (nextStepIndex < steps.length) {
      setCurrentStep(steps[nextStepIndex]);
      router.push(`/auth/signup#${steps[nextStepIndex]}`)
    }
  };

  const handlePrevStep = () => {
    const prevStepIndex = steps.indexOf(currentStep) - 1;
    if (prevStepIndex >= 0) {
      setCurrentStep(steps[prevStepIndex]);
      router.push(`/auth/signup#${steps[prevStepIndex]}`)
    }
  };

  return (
    <div>
      <h1>회원가입</h1>
      <div>
        {currentStep === 'step1' && <Step1 />}
        {currentStep === 'step2' && <Step2 />}
      </div>
      <div>
        {currentStep !== 'step1' && (
          <button onClick={handlePrevStep}>이전 단계</button>
        )}
        {currentStep !== 'step3' && (
          <button onClick={handleNextStep}>다음 단계</button>
        )}
      </div>
    </div>
  );
}

export default Signup
