'use client';

import { useEffect, useState } from 'react';

import { ColorPicker, RadioGroup, SolidButton } from '@ui/components';
import { useRouter } from 'next/navigation';

import type { ReviewDesignWriteProperty } from '@review-canvas/theme';

import DesignUnitTextField from '@/components/common/design-unit-text-field';
import SettingItem from '@/components/setting/setting-item';
import SettingLayout from '@/components/setting/setting-layout';
import useAuthCheck from '@/hooks/use-auth-check';
import { SettingDesignService } from '@/service/setting/design';

function SettingDetailWritePage() {
  const router = useRouter();
  const [designWriteProperties, setDesignWriteProperties] = useState<ReviewDesignWriteProperty>({
    pageType: 'NEW_PAGE',
    widthSizePc: '500px',
    widthSizeMobile: '100%',
    backgroundColor: '#FFFFFF',
    padding: {
      left: '0px',
      right: '0px',
      top: '0px',
      bottom: '0px',
    },
    border: {
      left: '0px',
      right: '0px',
      top: '0px',
      bottom: '0px',
    },
    borderColor: '#E7E7E7',
    starRateBackgroundColor: '#E1E1E1',
    starRateColor: '#FBB230',
    detailEvaluationCheckBoxBackgroundColor: '#E1E1E1',
    detailEvaluationCheckBoxColor: '#7757FE',
    detailEvaluationCategory: '',
    cancelButtonBackgroundColor: '#FFFFFF',
    cancelButtonBorderColor: '#E1E1E1',
    cancelButtonTextColor: '#E1E1E1',
    completedButtonBackgroundColor: '#000000',
    completedButtonTextColor: '#FFFFFF',
  });

  const getReviewDesignWriteSetting = async () => {
    try {
      const settings = await SettingDesignService.getReviewDesignWrite();
      setDesignWriteProperties(settings as ReviewDesignWriteProperty);
    } catch (error) {
      // eslint-disable-next-line no-console -- track error
      console.error('리뷰 Design Write 기존 세팅값 조회에 실패했습니다 : ', error);
      // eslint-disable-next-line no-alert -- required alert
      alert('일시적으로 데이터를 조회하지 못하고 있습니다. 잠시 후 다시 시도해 주세요.');
      router.push('/dashboard');
    }
  };

  const updateDesignWriteProperty = <K extends keyof ReviewDesignWriteProperty>(
    property: K,
    value: ReviewDesignWriteProperty[K],
  ) => {
    setDesignWriteProperties((prev) => ({
      ...prev,
      [property]: value,
    }));
  };

  const handlePressSaveButton = async () => {
    try {
      await SettingDesignService.modifyReviewDesignWrite(designWriteProperties);
      // eslint-disable-next-line no-alert -- required alert
      alert('성공적으로 저장되었어요');
      router.refresh();
    } catch (error) {
      // eslint-disable-next-line no-alert -- required alert
      alert('Design Write 설정값 변경에 일시적으로 실패했습니다. 잠시 후 다시 시도해 주세요.');
    }
  };

  const handlePressResetButton = async () => {
    try {
      await SettingDesignService.resetReviewDesignWrite();
      // eslint-disable-next-line no-alert -- required alert
      alert('성공적으로 초기화되었어요');
      window.location.reload();
    } catch (error) {
      // eslint-disable-next-line no-alert -- required alert
      alert('Design Write 설정값 초기화에 일시적으로 실패했습니다. 잠시 후 다시 시도해 주세요.');
    }
  };

  useEffect(() => {
    void getReviewDesignWriteSetting();
  }, []);

  useAuthCheck();

  return (
    <SettingLayout>
      <SettingLayout.Content>
        <SettingItem>
          <SettingItem.Container>
            <SettingItem.Title>페이징 방식</SettingItem.Title>
            <SettingItem.Caption>리뷰 작성하기 페이지를 띄우는 방식을 설정합니다.</SettingItem.Caption>
          </SettingItem.Container>
          <SettingItem.Content>
            <RadioGroup
              orientation="horizontal"
              tw="[& > label]:mr-8"
              value={designWriteProperties.pageType}
              onChange={(value) => {
                updateDesignWriteProperty('pageType', value as ReviewDesignWriteProperty['pageType']);
              }}
            >
              <RadioGroup.Item value="NEW_PAGE">새페이지</RadioGroup.Item>
              <RadioGroup.Item value="MODAL">모달(팝업)</RadioGroup.Item>
            </RadioGroup>
          </SettingItem.Content>
        </SettingItem>

        <SettingItem>
          <SettingItem.Container>
            <SettingItem.Title>가로 사이즈</SettingItem.Title>
            <SettingItem.Caption>
              리뷰쓰기 영역의 가로 사이즈를 설정합니다. pc와 모바일 2가지를 각각 설정할 수 있습니다. 설정하지 않을 경우
              기본 값은 PC는 500px, 모바일은 100%입니다.
            </SettingItem.Caption>
          </SettingItem.Container>
          <SettingItem.Content>
            <div tw="inline-flex flex-wrap gap-4 items-center [& > *]:w-24">
              <DesignUnitTextField
                type="WIDTH_RAW"
                label="PC"
                value={designWriteProperties.widthSizePc}
                onChange={(_value) => {
                  updateDesignWriteProperty('widthSizePc', _value);
                }}
              />

              <DesignUnitTextField
                type="WIDTH_RAW"
                label="모바일"
                value={designWriteProperties.widthSizeMobile}
                onChange={(_value) => {
                  updateDesignWriteProperty('widthSizeMobile', _value);
                }}
              />
            </div>
          </SettingItem.Content>
        </SettingItem>

        <SettingItem>
          <SettingItem.Container>
            <SettingItem.Title>배경 색상</SettingItem.Title>
            <SettingItem.Caption>
              리뷰쓰기 전체 영역의 배경 색상을 설정합니다. 기본 값은 #ffffff 에요.
            </SettingItem.Caption>
          </SettingItem.Container>
          <SettingItem.Content>
            <ColorPicker
              color={designWriteProperties.backgroundColor}
              onChange={(_value) => {
                updateDesignWriteProperty('backgroundColor', _value);
              }}
            />
          </SettingItem.Content>
        </SettingItem>

        <SettingItem>
          <SettingItem.Container>
            <SettingItem.Title>항목 안쪽 여백</SettingItem.Title>
            <SettingItem.Caption>
              별점, 리뷰작성 등 각 항목의 바깥쪽 여백을 정할 수 있어요. 따로 설정하지 않으면 18px로 자동 설정돼요.
            </SettingItem.Caption>
          </SettingItem.Container>
          <SettingItem.Content>
            <div tw="inline-flex flex-wrap gap-4 items-center [& > *]:w-24">
              <DesignUnitTextField
                type="PADDING"
                label="왼쪽"
                value={designWriteProperties.padding.left}
                onChange={(_value) => {
                  updateDesignWriteProperty('padding', {
                    ...designWriteProperties.padding,
                    left: _value,
                  });
                }}
              />

              <DesignUnitTextField
                type="PADDING"
                label="오른쪽"
                value={designWriteProperties.padding.right}
                onChange={(_value) => {
                  updateDesignWriteProperty('padding', {
                    ...designWriteProperties.padding,
                    right: _value,
                  });
                }}
              />

              <DesignUnitTextField
                type="PADDING"
                label="위"
                value={designWriteProperties.padding.top}
                onChange={(_value) => {
                  updateDesignWriteProperty('padding', {
                    ...designWriteProperties.padding,
                    top: _value,
                  });
                }}
              />

              <DesignUnitTextField
                type="PADDING"
                label="오른쪽"
                value={designWriteProperties.padding.bottom}
                onChange={(_value) => {
                  updateDesignWriteProperty('padding', {
                    ...designWriteProperties.padding,
                    bottom: _value,
                  });
                }}
              />
            </div>
          </SettingItem.Content>
        </SettingItem>

        <SettingItem>
          <SettingItem.Container>
            <SettingItem.Title>항목 테두리</SettingItem.Title>
            <SettingItem.Caption>
              별점, 리뷰작성 등 각 항목의 테두리 두께를 정할 수 있어요. 작성하지 않을 경우 0으로 설정돼요.
            </SettingItem.Caption>
          </SettingItem.Container>
          <SettingItem.Content>
            <div tw="inline-flex flex-wrap gap-4 items-center [& > *]:w-24">
              <DesignUnitTextField
                type="BORDER"
                label="왼쪽"
                value={designWriteProperties.border.left}
                onChange={(_value) => {
                  updateDesignWriteProperty('border', {
                    ...designWriteProperties.border,
                    left: _value,
                  });
                }}
              />

              <DesignUnitTextField
                type="BORDER"
                label="오른쪽"
                value={designWriteProperties.border.right}
                onChange={(_value) => {
                  updateDesignWriteProperty('border', {
                    ...designWriteProperties.border,
                    right: _value,
                  });
                }}
              />

              <DesignUnitTextField
                type="BORDER"
                label="위"
                value={designWriteProperties.border.top}
                onChange={(_value) => {
                  updateDesignWriteProperty('border', {
                    ...designWriteProperties.border,
                    top: _value,
                  });
                }}
              />

              <DesignUnitTextField
                type="BORDER"
                label="오른쪽"
                value={designWriteProperties.border.bottom}
                onChange={(_value) => {
                  updateDesignWriteProperty('border', {
                    ...designWriteProperties.border,
                    bottom: _value,
                  });
                }}
              />
            </div>
          </SettingItem.Content>
        </SettingItem>

        <SettingItem>
          <SettingItem.Container>
            <SettingItem.Title>항목 테두리 색상</SettingItem.Title>
            <SettingItem.Caption>테두리의 색상을 설정합니다. 기본 값은 #E7E7E7에요.</SettingItem.Caption>
          </SettingItem.Container>
          <SettingItem.Content>
            <ColorPicker
              color={designWriteProperties.borderColor}
              onChange={(_value) => {
                updateDesignWriteProperty('borderColor', _value);
              }}
            />
          </SettingItem.Content>
        </SettingItem>

        <SettingItem>
          <SettingItem.Container>
            <SettingItem.Title>별점 배경 색상</SettingItem.Title>
            <SettingItem.Caption>별점 배경 색상을 설정할 수 있어요. 기본 값은 #E1E1E1에요.</SettingItem.Caption>
          </SettingItem.Container>
          <SettingItem.Content>
            <ColorPicker
              color={designWriteProperties.starRateBackgroundColor}
              onChange={(_value) => {
                updateDesignWriteProperty('starRateBackgroundColor', _value);
              }}
            />
          </SettingItem.Content>
        </SettingItem>

        <SettingItem>
          <SettingItem.Container>
            <SettingItem.Title>별점 색상</SettingItem.Title>
            <SettingItem.Caption>별점의 색상을 설할 수 있어요. 기본 값은 #FBB230에요.</SettingItem.Caption>
          </SettingItem.Container>
          <SettingItem.Content>
            <ColorPicker
              color={designWriteProperties.starRateColor}
              onChange={(_value) => {
                updateDesignWriteProperty('starRateColor', _value);
              }}
            />
          </SettingItem.Content>
        </SettingItem>

        <SettingItem>
          <SettingItem.Container>
            <SettingItem.Title>상세 평가 항목 체크박스 배경 색상</SettingItem.Title>
            <SettingItem.Caption>
              사이즈, 팟 등 항목의 체크박스 배경 색상을 설정할 수 있어요. 기본 값은 #E1E1E1에요.
            </SettingItem.Caption>
          </SettingItem.Container>
          <SettingItem.Content>
            <ColorPicker
              color={designWriteProperties.detailEvaluationCheckBoxBackgroundColor}
              onChange={(_value) => {
                updateDesignWriteProperty('detailEvaluationCheckBoxBackgroundColor', _value);
              }}
            />
          </SettingItem.Content>
        </SettingItem>

        <SettingItem>
          <SettingItem.Container>
            <SettingItem.Title>상세 평가 항목 체크 색상</SettingItem.Title>
            <SettingItem.Caption>체크박스의 색상을 설정할 수 있어요. 기본 값은 #7757FE에요.</SettingItem.Caption>
          </SettingItem.Container>
          <SettingItem.Content>
            <ColorPicker
              color={designWriteProperties.detailEvaluationCheckBoxColor}
              onChange={(_value) => {
                updateDesignWriteProperty('detailEvaluationCheckBoxColor', _value);
              }}
            />
          </SettingItem.Content>
        </SettingItem>

        <SettingItem>
          <SettingItem.Container>
            <SettingItem.Title>취소 버튼 배경 색상</SettingItem.Title>
            <SettingItem.Caption>
              리뷰 쓰기 취소 버튼의 배경 색상을 설정해요. 기본 값은 #FFFFFF 이에요.
            </SettingItem.Caption>
          </SettingItem.Container>
          <SettingItem.Content>
            <ColorPicker
              color={designWriteProperties.cancelButtonBackgroundColor}
              onChange={(_value) => {
                updateDesignWriteProperty('cancelButtonBackgroundColor', _value);
              }}
            />
          </SettingItem.Content>
        </SettingItem>

        <SettingItem>
          <SettingItem.Container>
            <SettingItem.Title>취소 버튼 테두리 색상</SettingItem.Title>
            <SettingItem.Caption>
              리뷰 쓰기 취소 버튼의 테두리 색상을 설정해요. 기본 값은 #E1E1E1 이에요.
            </SettingItem.Caption>
          </SettingItem.Container>
          <SettingItem.Content>
            <ColorPicker
              color={designWriteProperties.cancelButtonBorderColor}
              onChange={(_value) => {
                updateDesignWriteProperty('cancelButtonBorderColor', _value);
              }}
            />
          </SettingItem.Content>
        </SettingItem>

        <SettingItem>
          <SettingItem.Container>
            <SettingItem.Title>취소 버튼 텍스트 색상</SettingItem.Title>
            <SettingItem.Caption>
              리뷰 쓰기 취소 버튼의 텍스트 색상을 설정해요. 기본 값은 #E1E1E1 이에요.
            </SettingItem.Caption>
          </SettingItem.Container>
          <SettingItem.Content>
            <ColorPicker
              color={designWriteProperties.cancelButtonTextColor}
              onChange={(_value) => {
                updateDesignWriteProperty('cancelButtonTextColor', _value);
              }}
            />
          </SettingItem.Content>
        </SettingItem>

        <SettingItem>
          <SettingItem.Container>
            <SettingItem.Title>작성완료 버튼 배경 색상</SettingItem.Title>
            <SettingItem.Caption>
              리뷰 쓰기 작성완료 버튼의 배경 색상을 설정해요. 기본 값은 #000000 이에요.
            </SettingItem.Caption>
          </SettingItem.Container>
          <SettingItem.Content>
            <ColorPicker
              color={designWriteProperties.completedButtonBackgroundColor}
              onChange={(_value) => {
                updateDesignWriteProperty('completedButtonBackgroundColor', _value);
              }}
            />
          </SettingItem.Content>
        </SettingItem>

        <SettingItem>
          <SettingItem.Container>
            <SettingItem.Title>작성완료 버튼 텍스트 색상</SettingItem.Title>
            <SettingItem.Caption>
              리뷰 쓰기 작성완료 버튼의 텍스트 색상을 설정해요. 기본 값은 #ffffff 이에요.
            </SettingItem.Caption>
          </SettingItem.Container>
          <SettingItem.Content>
            <ColorPicker
              color={designWriteProperties.completedButtonTextColor}
              onChange={(_value) => {
                updateDesignWriteProperty('completedButtonTextColor', _value);
              }}
            />
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

export default SettingDetailWritePage;
