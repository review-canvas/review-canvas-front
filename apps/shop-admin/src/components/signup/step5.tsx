'use client';

import type { RadioGroupItem } from '@/types/components/radiogroup';
import type { SignupUserInstallData } from '@/types/signup';

import { useState, useRef } from 'react';

import RadioGroup from '@/components/common/radiogroup';
import useSignupStore from '@/store/signup';

interface InstallRadioGroupItem extends RadioGroupItem {
  id: SignupUserInstallData['type'];
}

function Step5() {
  const installArr: InstallRadioGroupItem[] = [
    {
      id: 'ASK',
      name: '설치 의뢰',
    },
    {
      id: 'MANUAL',
      name: '직접 설치',
    },
  ];
  const [installType, setInstallType] = useState<SignupUserInstallData['type']>(installArr[0].id);
  const askDetailRef = useRef<HTMLTextAreaElement>(null);

  const { goToNextStep, updateReviewInstallData } = useSignupStore();

  const onClickNextStepButton = () => {
    const data: SignupUserInstallData = {
      type: installType,
    };

    if (installType === 'ASK' && askDetailRef.current) {
      data.askDetail = askDetailRef.current.value;
    }

    updateReviewInstallData(data);
    goToNextStep();
  };

  return (
    <div>
      <div>리뷰캔버스 설치 방식을 지정해 주세요</div>
      <div>
        <RadioGroup
          items={installArr}
          selectedId={installType}
          onSelectedIdChange={setInstallType as (newSelectedId: string) => void}
        />
      </div>

      <div>
        {installType === 'ASK' && (
          <textarea
            ref={askDetailRef}
            placeholder="설치 의뢰와 관련해 자세한 정보를 적어 주세요"
          />
        )}
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

export default Step5;
