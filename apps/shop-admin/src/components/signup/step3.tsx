'use client';

import type { RadioGroupItem } from '@/types/components/radiogroup';

import { useState } from 'react';

import useSignupStore from '@/store/signup';

import RadioGroup from '../common/radiogroup';

function Step3() {
  const themeArr: RadioGroupItem[] = [
    {
      id: '1',
      name: '상세 테마 111',
    },
    {
      id: '2',
      name: '상세 테마 22222',
    },
  ];

  const [themeId, setThemeId] = useState(themeArr[0].id);
  const { goToNextStep } = useSignupStore();

  const onClickNextStepButton = () => {
    goToNextStep();
  };

  return (
    <div>
      <div>리뷰 상세 모달 디자인 테마 선택</div>
      <div>RadioGroup</div>
      <div>
        <RadioGroup
          items={themeArr}
          selectedId={themeId}
          onSelectedIdChange={setThemeId}
        />
      </div>
      <div>
        <button
          onClick={onClickNextStepButton}
          type="button"
        >
          다음 단계로 이동
        </button>
      </div>
    </div>
  );
}

export default Step3;
