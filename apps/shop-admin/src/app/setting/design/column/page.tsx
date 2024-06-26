'use client';

import { useEffect, useState } from 'react';

import { ColorPicker, RadioGroup, SolidButton } from '@ui/components';
import { useRouter } from 'next/navigation';

import { ThemeUtil } from '@review-canvas/theme';
import type { Shadow, WidthType, ReviewColumnProperty } from '@review-canvas/theme';

import DesignUnitTextField from '@/components/common/design-unit-text-field';
import DesignUnitTextFieldGroupContainer from '@/components/setting/design-unit-text-field-group';
import SettingItem from '@/components/setting/setting-item';
import SettingLayout from '@/components/setting/setting-layout';
import useAuthCheck from '@/hooks/use-auth-check';
import { SettingDesignService } from '@/service/setting/design';

function SettingDesignColumnPage() {
  const router = useRouter();
  const [columnProperties, setColumnProperties] = useState<ReviewColumnProperty>({
    width: '100%',
    padding: {
      left: '0px',
      right: '0px',
      top: '0px',
      bottom: '0px',
    },
    margin: {
      left: '0px',
      right: '0px',
      top: '0px',
      bottom: '0px',
    },
    background: '#ffffff',
    border: {
      left: '0px',
      right: '0px',
      top: '0px',
      bottom: '0px',
    },
    borderColor: '#ffffff',
    shadow: 'NONE',
  });

  const widthType: WidthType = ThemeUtil.getWidthType(columnProperties.width);

  useAuthCheck();

  const getReviewColumnSetting = async () => {
    try {
      const settings = await SettingDesignService.getReviewColumn();
      setColumnProperties(settings as ReviewColumnProperty);
    } catch (error) {
      // eslint-disable-next-line no-console -- track error
      console.error('리뷰 Column 기존 세팅값 조회에 실패했습니다 : ', error);
      // eslint-disable-next-line no-alert -- required alert
      alert('일시적으로 데이터를 조회하지 못하고 있습니다. 잠시 후 다시 시도해 주세요.');
      router.push('/dashboard');
    }
  };

  const updateColumnProperty = <K extends keyof ReviewColumnProperty>(property: K, value: ReviewColumnProperty[K]) => {
    setColumnProperties((prev) => ({
      ...prev,
      [property]: value,
    }));
  };

  const handlePressSaveButton = async () => {
    try {
      await SettingDesignService.modifyReviewColumn(columnProperties);
      // eslint-disable-next-line no-alert -- required alert
      alert('성공적으로 저장되었어요');
      router.refresh();
    } catch (error) {
      // eslint-disable-next-line no-alert -- required alert
      alert('Column 설정값 변경에 일시적으로 실패했습니다. 잠시 후 다시 시도해 주세요.');
    }
  };

  const handlePressResetButton = async () => {
    try {
      await SettingDesignService.resetReviewColumn();
      // eslint-disable-next-line no-alert -- required alert
      alert('성공적으로 초기화되었어요');
      window.location.reload();
    } catch (error) {
      // eslint-disable-next-line no-alert -- required alert
      alert('Column 설정값 초기화에 일시적으로 실패했습니다. 잠시 후 다시 시도해 주세요.');
    }
  };

  useEffect(() => {
    void getReviewColumnSetting();
  }, []);

  useAuthCheck();

  return (
    <SettingLayout>
      <SettingLayout.Content>
        <SettingItem>
          <SettingItem.Container>
            <SettingItem.Title>Width(가로)</SettingItem.Title>
            <SettingItem.Caption>가로 사이즈를 설정합니다.</SettingItem.Caption>
          </SettingItem.Container>
          <SettingItem.Content>
            <RadioGroup
              orientation="horizontal"
              tw="[& > label]:mr-8"
              value={widthType}
              onChange={(type) => {
                const defaultWidth = '500px';
                const width = ThemeUtil.returnWidthValueWidthType(type as WidthType, defaultWidth);

                updateColumnProperty('width', width);
              }}
            >
              <RadioGroup.Item value="SITE_WIDTH">사이트 Width</RadioGroup.Item>
              <RadioGroup.Item value="FULL">Full</RadioGroup.Item>
              <RadioGroup.Item value="CUSTOM">직접입력</RadioGroup.Item>
            </RadioGroup>
            <DesignUnitTextField
              type="WIDTH_CUSTOM"
              value={columnProperties.width}
              onChange={(_value) => {
                updateColumnProperty('width', _value);
              }}
              isReadOnly={widthType !== 'CUSTOM'}
            />
          </SettingItem.Content>
        </SettingItem>

        <SettingItem>
          <SettingItem.Container>
            <SettingItem.Title>Padding(내부여백)</SettingItem.Title>
            <SettingItem.Caption>
              <p>내부 여백을 설정합니다.</p>
              <p>작성하지 않을 경우 기본값은 0입니다.</p>
            </SettingItem.Caption>
          </SettingItem.Container>
          <SettingItem.Content>
            <div tw="inline-flex flex-wrap gap-4 items-start [& > *]:w-24">
              <DesignUnitTextField
                type="PADDING"
                label="왼쪽"
                value={columnProperties.padding.left}
                onChange={(_value) => {
                  updateColumnProperty('padding', {
                    ...columnProperties.padding,
                    left: _value,
                  });
                }}
              />

              <DesignUnitTextField
                type="PADDING"
                label="오른쪽"
                value={columnProperties.padding.right}
                onChange={(_value) => {
                  updateColumnProperty('padding', {
                    ...columnProperties.padding,
                    right: _value,
                  });
                }}
              />

              <DesignUnitTextField
                type="PADDING"
                label="위"
                value={columnProperties.padding.top}
                onChange={(_value) => {
                  updateColumnProperty('padding', {
                    ...columnProperties.padding,
                    top: _value,
                  });
                }}
              />

              <DesignUnitTextField
                type="PADDING"
                label="오른쪽"
                value={columnProperties.padding.bottom}
                onChange={(_value) => {
                  updateColumnProperty('padding', {
                    ...columnProperties.padding,
                    bottom: _value,
                  });
                }}
              />
            </div>
          </SettingItem.Content>
        </SettingItem>

        <SettingItem>
          <SettingItem.Container>
            <SettingItem.Title>Margin(외부여백)</SettingItem.Title>
            <SettingItem.Caption>
              <p>외부 여백을 설정합니다.</p>
              <p>작성하지 않을 경우 기본값은 0입니다.</p>
            </SettingItem.Caption>
          </SettingItem.Container>
          <SettingItem.Content>
            <DesignUnitTextFieldGroupContainer>
              <DesignUnitTextField
                type="MARGIN"
                label="왼쪽"
                value={columnProperties.margin.left}
                onChange={(_value) => {
                  updateColumnProperty('margin', {
                    ...columnProperties.margin,
                    left: _value,
                  });
                }}
              />

              <DesignUnitTextField
                type="MARGIN"
                label="오른쪽"
                value={columnProperties.margin.right}
                onChange={(_value) => {
                  updateColumnProperty('margin', {
                    ...columnProperties.margin,
                    right: _value,
                  });
                }}
              />

              <DesignUnitTextField
                type="MARGIN"
                label="위"
                value={columnProperties.margin.top}
                onChange={(_value) => {
                  updateColumnProperty('margin', {
                    ...columnProperties.margin,
                    top: _value,
                  });
                }}
              />

              <DesignUnitTextField
                type="MARGIN"
                label="오른쪽"
                value={columnProperties.margin.bottom}
                onChange={(_value) => {
                  updateColumnProperty('margin', {
                    ...columnProperties.margin,
                    bottom: _value,
                  });
                }}
              />
            </DesignUnitTextFieldGroupContainer>
          </SettingItem.Content>
        </SettingItem>

        <SettingItem>
          <SettingItem.Container>
            <SettingItem.Title>Background(배경)</SettingItem.Title>
            <SettingItem.Caption>배경색을 설정합니다.</SettingItem.Caption>
          </SettingItem.Container>
          <SettingItem.Content>
            <ColorPicker
              color={columnProperties.background}
              onChange={(_color) => {
                updateColumnProperty('background', _color);
              }}
            />
          </SettingItem.Content>
        </SettingItem>

        <SettingItem>
          <SettingItem.Container>
            <SettingItem.Title>Border(테두리)</SettingItem.Title>
            <SettingItem.Caption>테두리의 두께를 설정합니다.</SettingItem.Caption>
          </SettingItem.Container>
          <SettingItem.Content>
            <DesignUnitTextFieldGroupContainer>
              <DesignUnitTextField
                type="BORDER"
                label="왼쪽"
                value={columnProperties.border.left}
                onChange={(_value) => {
                  updateColumnProperty('border', {
                    ...columnProperties.border,
                    left: _value,
                  });
                }}
              />

              <DesignUnitTextField
                type="BORDER"
                label="오른쪽"
                value={columnProperties.border.right}
                onChange={(_value) => {
                  updateColumnProperty('border', {
                    ...columnProperties.border,
                    right: _value,
                  });
                }}
              />

              <DesignUnitTextField
                type="BORDER"
                label="위"
                value={columnProperties.border.top}
                onChange={(_value) => {
                  updateColumnProperty('border', {
                    ...columnProperties.border,
                    top: _value,
                  });
                }}
              />

              <DesignUnitTextField
                type="BORDER"
                label="오른쪽"
                value={columnProperties.border.bottom}
                onChange={(_value) => {
                  updateColumnProperty('border', {
                    ...columnProperties.border,
                    bottom: _value,
                  });
                }}
              />
            </DesignUnitTextFieldGroupContainer>
          </SettingItem.Content>
        </SettingItem>

        <SettingItem>
          <SettingItem.Container>
            <SettingItem.Title>Border Color(테두리 색상)</SettingItem.Title>
            <SettingItem.Caption>테두리의 색상을 설정합니다.</SettingItem.Caption>
          </SettingItem.Container>
          <SettingItem.Content>
            <ColorPicker
              color={columnProperties.borderColor}
              onChange={(_color) => {
                updateColumnProperty('borderColor', _color);
              }}
            />
          </SettingItem.Content>
        </SettingItem>

        <SettingItem>
          <SettingItem.Container>
            <SettingItem.Title>Shadow(그림자)</SettingItem.Title>
            <SettingItem.Caption>그림자를 설정합니다.</SettingItem.Caption>
          </SettingItem.Container>
          <SettingItem.Content>
            <RadioGroup
              orientation="horizontal"
              tw="[& > label]:mr-8"
              value={columnProperties.shadow}
              onChange={(value) => {
                updateColumnProperty('shadow', value as Shadow);
              }}
            >
              <RadioGroup.Item value="NONE">그림자 없음</RadioGroup.Item>
              <RadioGroup.Item value="SMALL">Small</RadioGroup.Item>
              <RadioGroup.Item value="MEDIUM">Medium</RadioGroup.Item>
              <RadioGroup.Item value="LARGE">Large</RadioGroup.Item>
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

export default SettingDesignColumnPage;
