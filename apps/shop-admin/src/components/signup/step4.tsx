'use client';

import type { CheckboxItem } from '@/types/components/checkboxgroup';
import type { SignupReviewItemActiveData } from '@/types/signup';

import React, { useState } from 'react';

import CheckboxGroup from '@/components/common/checkboxgroup';
import Checkbox from '@/components/common/checkboxgroup/checkbox';
import useSignupStore from '@/store/signup';

import { REVIEW_ITEM_KEY_LABEL_MAP } from '@/constants';

function Step4() {
  const initialReviewItemActiveData: SignupReviewItemActiveData = {
    title: true,
    author: true,
    point: true,
    media: true,
    content: true,
    createdAt: true,
    updatedAt: true,
  };

  const items = Object.entries(initialReviewItemActiveData).map(([key, value]) => {
    return {
      name: key,
      label: REVIEW_ITEM_KEY_LABEL_MAP[key as keyof SignupReviewItemActiveData],
      checked: value as boolean,
    };
  });

  const [reviewItems, setReviewItems] = useState<CheckboxItem[]>(items);
  const handleCheckedValuesChange = (newCheckedValues: string[]) => {
    setReviewItems(
      reviewItems.map((item) => ({
        ...item,
        checked: newCheckedValues.includes(item.name),
      })),
    );
  };

  const { updateReviewActiveSetting, goToNextStep } = useSignupStore();

  const handleGoToNextStep = () => {
    const settingsToUpdate: SignupReviewItemActiveData = reviewItems.reduce(
      (acc, { name, checked }) => {
        acc[name as keyof SignupReviewItemActiveData] = checked;
        return acc;
      },
      { ...initialReviewItemActiveData },
    );

    updateReviewActiveSetting(settingsToUpdate);
    goToNextStep();
  };

  return (
    <div>
      <div>리뷰 상세 모달 디자인 테마 선택</div>
      <div>RadioGroup</div>
      <div>
        <CheckboxGroup
          isRequired
          label="리뷰 노출 항목 선택"
          onCheckedValuesChange={handleCheckedValuesChange}
          initialCheckedValues={reviewItems.filter((item) => item.checked).map((item) => item.name)}
        >
          {reviewItems.map((reviewItem) => (
            <Checkbox
              key={reviewItem.name}
              name={reviewItem.name}
              value={reviewItem.name}
              checked={reviewItem.checked}
            >
              {reviewItem.label}
            </Checkbox>
          ))}
        </CheckboxGroup>
      </div>
      <div>
        <button
          onClick={handleGoToNextStep}
          type="button"
        >
          다음 단계로 이동
        </button>
      </div>
    </div>
  );
}

export default Step4;
