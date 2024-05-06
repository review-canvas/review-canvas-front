'use client'

import { useEffect, useState } from 'react';

import SolidButton from '@ui/components/button/solid-button';
import Checkbox from '@ui/components/checkbox';

import useSignupStore from '@/store/signup';

import ReviewCanvasLogo from '../common/review-canvas-logo';

type CheckedProps = Record<string, boolean>;

function Step1() {
  const { goToNextStep, updateFormData } = useSignupStore();
  const [isChecked, setIsChecked] = useState<CheckedProps>({
    all: false,
    1: false,
    2: false,
    3: false,
    4: false,
  });
  const isNextStepEnabled = isChecked[1] && isChecked[2];

  const handleCheckAll = (checked: boolean) => {
    setIsChecked({
      all: checked,
      1: checked,
      2: checked,
      3: checked,
      4: checked,
    });
  };

  const handleCheck = (name: string) => {
    setIsChecked((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  useEffect(() => {
    if (isChecked[1] && isChecked[2] && isChecked[3] && isChecked[4]) {
      setIsChecked((prev) => ({ ...prev, all: true }));
    } else {
      setIsChecked((prev) => ({ ...prev, all: false }));
    }
  }, [isChecked[1], isChecked[2], isChecked[3], isChecked[4]]);

  const handlePressButton = () => {
    const selectedItems = Object.entries(isChecked).filter((item) => {
      const [key, checked] = item;
      return checked && key !== 'all';
    });

    const selectedItemKeys: number[] = selectedItems.map((item) => {
      const [key] = item;
      return Number(key);
    });

    updateFormData({
      consentedTermsIds: selectedItemKeys,
    });

    goToNextStep();
  };

  return (
    <div tw="w-full flex flex-col gap-10 justify-between">
      <div tw="w-full flex justify-center items-center">
        <ReviewCanvasLogo />
      </div>

      <div tw="w-full flex flex-col">
        <div tw="w-full border-b-[3px] border-b-black pb-1 mb-5">
          <span tw="text-xl text-main-secondary font-bold">약관동의</span>
        </div>

        <div tw="w-full flex flex-col gap-5">
          <div tw="w-full text-main-secondary font-normal text-base">
            <div tw="w-full flex flex-col">
              <Checkbox
                name="all"
                isSelected={isChecked.all}
                onChange={() => {
                  handleCheckAll(!isChecked.all);
                }}
              >
                <div tw="text-base">모두 동의 (선택정보 포함)</div>
              </Checkbox>
            </div>
            <div tw="pl-6">
              <span tw="text-xs">이용약관과 개인정보 수집 및 이용에 모두 동의합니다.</span>
            </div>
          </div>

          <div tw="w-full pl-6 flex flex-col gap-3 justify-center text-sm text-[#B5B8D0] font-normal">
            <div>
              <Checkbox
                name="1"
                isSelected={isChecked[1]}
                onChange={() => {
                  handleCheck('1');
                }}
                isRequired
              >
                [필수] 이용약관 동의
              </Checkbox>
            </div>

            <div>
              <Checkbox
                name="2"
                isSelected={isChecked[2]}
                onChange={() => {
                  handleCheck('2');
                }}
                isRequired
              >
                [필수] 개인정보 수집 및 이용 동의
              </Checkbox>
            </div>

            <div>
              <Checkbox
                name="3"
                isSelected={isChecked[3]}
                onChange={() => {
                  handleCheck('3');
                }}
              >
                [선택] 마케팅 목적의 개인정보 수집 및 이용 동의
              </Checkbox>
            </div>

            <div>
              <Checkbox
                name="4"
                isSelected={isChecked[4]}
                onChange={() => {
                  handleCheck('4');
                }}
              >
                [선택] 광고성 정보 수신 동의
              </Checkbox>
            </div>
          </div>
        </div>
      </div>

      <div tw="w-full">
        <SolidButton
          variant={isNextStepEnabled ? 'primary' : 'gray'}
          tw="w-full"
          onPress={handlePressButton}
          isDisabled={!isNextStepEnabled}
        >
          다음 단계로 이동
        </SolidButton>
      </div>
    </div>
  );
}

export default Step1