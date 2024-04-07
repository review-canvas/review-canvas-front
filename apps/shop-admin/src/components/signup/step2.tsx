'use client';

import useSignupStore from '@/store/signup';
import { RadioGroupItem } from '@/types/components/radiogroup';
import RadioGroup from '../common/radiogroup';
import { useState } from 'react';

function Step2() {
  const themeArr: RadioGroupItem[] = [
    {
      id: '1',
      name: '테마 1',
    },
    {
      id: '2',
      name: '테마 222',
    },
  ];

  const [themeId, setThemeId] = useState(themeArr[0].id);
  const { goToNextStep, updateSettingThemeId } = useSignupStore();

  const onClickNextStepButton = () => {
    updateSettingThemeId(Number(themeId))
    goToNextStep()
  }

  return (
    <div>
      <div>상품 상세 페이지의 리뷰 리스트 디자인 테마 선택</div>
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

export default Step2;
