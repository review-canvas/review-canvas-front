'use client';

import { useEffect, useState } from 'react';

import { RadioGroup, SolidButton, Switch } from '@ui/components';
import { useRouter } from 'next/navigation';

import type { ReviewLayoutProperty } from '@review-canvas/theme';

import SettingItem from '@/components/setting/setting-item';
import SettingLayout from '@/components/setting/setting-layout';
import useAuthCheck from '@/hooks/use-auth-check';
import { SettingDesignService } from '@/service/setting/design';

function SettingDesignLayoutPage() {
  const router = useRouter();
  const [layoutProperties, setLayoutProperties] = useState<ReviewLayoutProperty>({
    bestReviewAreaActivation: false,
    reviewStatisticsAreaActivation: false,
    imageReviewAreaActivation: false,
    focusAreaLayout: 'BEST_REVIEW_TOP',
    imageReviewAreaLayout: 'REVIEW_TOP',
    reviewLayoutDesign: 'BOARD',
  });

  useAuthCheck();

  const getReviewLayoutSetting = async () => {
    try {
      const settings = await SettingDesignService.getReviewLayout();
      setLayoutProperties(settings as ReviewLayoutProperty);
    } catch (error) {
      // eslint-disable-next-line no-console -- track error
      console.error('리뷰 레이아웃 기존 세팅값 조회에 실패했습니다 : ', error);
      // eslint-disable-next-line no-alert -- required alert
      alert('일시적으로 데이터를 조회하지 못하고 있습니다. 잠시 후 다시 시도해 주세요.');
      router.push('/dashboard');
    }
  };

  const updateLayoutProperty = <K extends keyof ReviewLayoutProperty>(property: K, value: ReviewLayoutProperty[K]) => {
    setLayoutProperties((prev) => ({
      ...prev,
      [property]: value,
    }));
  };

  const handlePressSaveButton = async () => {
    try {
      await SettingDesignService.modifyReviewLayout(layoutProperties);
      // eslint-disable-next-line no-alert -- required alert
      alert('성공적으로 저장되었어요');
      router.refresh();
    } catch (error) {
      // eslint-disable-next-line no-alert -- required alert
      alert('레이아웃 설정값 변경에 일시적으로 실패했습니다. 잠시 후 다시 시도해 주세요.');
    }
  };

  const handlePressResetButton = async () => {
    try {
      await SettingDesignService.resetReviewLayout();
      // eslint-disable-next-line no-alert -- required alert
      alert('성공적으로 초기화되었어요');
      window.location.reload();
    } catch (error) {
      // eslint-disable-next-line no-alert -- required alert
      alert('레이아웃 설정값 초기화에 일시적으로 실패했습니다. 잠시 후 다시 시도해 주세요.');
    }
  };

  useEffect(() => {
    void getReviewLayoutSetting();
  }, []);

  return (
    <SettingLayout>
      <SettingLayout.Content>
        <SettingItem>
          <SettingItem.Container>
            <SettingItem.Title>베스트 리뷰 영역</SettingItem.Title>
            <SettingItem.Caption>베스트 리뷰 영역을 활성화 또는 비활성화 할 수 있습니다.</SettingItem.Caption>
          </SettingItem.Container>
          <SettingItem.Content>
            <Switch
              isSelected={layoutProperties.bestReviewAreaActivation}
              onChange={(isSelected) => {
                updateLayoutProperty('bestReviewAreaActivation', isSelected);
              }}
            />
          </SettingItem.Content>
        </SettingItem>

        <SettingItem>
          <SettingItem.Container>
            <SettingItem.Title>리뷰통계 영역</SettingItem.Title>
            <SettingItem.Caption>리뷰 영역의 통계 데이터를 활성화 또는 비활성화 할 수 있습니다.</SettingItem.Caption>
          </SettingItem.Container>
          <SettingItem.Content>
            <Switch
              isSelected={layoutProperties.reviewStatisticsAreaActivation}
              onChange={(isSelected) => {
                updateLayoutProperty('reviewStatisticsAreaActivation', isSelected);
              }}
            />
          </SettingItem.Content>
        </SettingItem>

        <SettingItem>
          <SettingItem.Container>
            <SettingItem.Title>이미지/동영상 영역</SettingItem.Title>
            <SettingItem.Caption>이미지, 동영상 영역을 활성화 또는 비활성화 할 수 있습니다.</SettingItem.Caption>
          </SettingItem.Container>
          <SettingItem.Content>
            <Switch
              isSelected={layoutProperties.imageReviewAreaActivation}
              onChange={(isSelected) => {
                updateLayoutProperty('imageReviewAreaActivation', isSelected);
              }}
            />
          </SettingItem.Content>
        </SettingItem>

        <SettingItem>
          <SettingItem.Container>
            <SettingItem.Title>리뷰 레이아웃 디자인</SettingItem.Title>
            <SettingItem.Caption>리뷰 영역의 레이아웃 디자인을 설정합니다.</SettingItem.Caption>
          </SettingItem.Container>
          <SettingItem.Content>
            <RadioGroup
              orientation="horizontal"
              tw="[& > label]:mr-8"
              value={layoutProperties.reviewLayoutDesign}
              onChange={(value) => {
                updateLayoutProperty('reviewLayoutDesign', value as ReviewLayoutProperty['reviewLayoutDesign']);
              }}
            >
              <RadioGroup.Item value="BOARD">게시판형</RadioGroup.Item>
              <RadioGroup.Item value="CARD">카드형</RadioGroup.Item>
              <RadioGroup.Item value="CHAT">대화형</RadioGroup.Item>
            </RadioGroup>
          </SettingItem.Content>
        </SettingItem>
      </SettingLayout.Content>

      <SettingLayout.Footer>
        <SolidButton
          size="sm"
          variant="primary"
          onPress={() => {
            void handlePressSaveButton();
          }}
        >
          저장하기
        </SolidButton>
        <SolidButton
          size="sm"
          variant="gray"
          onPress={() => {
            void handlePressResetButton();
          }}
        >
          초기화
        </SolidButton>
      </SettingLayout.Footer>
    </SettingLayout>
  );
}

export default SettingDesignLayoutPage;
