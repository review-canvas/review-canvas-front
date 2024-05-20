'use client';

import { useEffect, useState } from 'react';

import { ColorPicker, RadioGroup, Select, SolidButton } from '@ui/components';
import TextField from '@ui/components/text-field';
import { useRouter } from 'next/navigation';

import type { ReviewTitleProperty } from '@review-canvas/theme';

import DesignUnitTextField from '@/components/common/design-unit-text-field';
import DesignUnitTextFieldGroupContainer from '@/components/setting/design-unit-text-field-group';
import SettingItem from '@/components/setting/setting-item';
import SettingLayout from '@/components/setting/setting-layout';
import useAuthCheck from '@/hooks/use-auth-check';
import { SettingDesignService } from '@/service/setting/design';

function SettingDesignTitlePage() {
  const router = useRouter();
  const [titleProperties, setTitleProperties] = useState<ReviewTitleProperty>({
    title: '',
    titleAlignmentPosition: 'LEFT',
    titlePadding: {
      left: '0px',
      right: '0px',
      top: '0px',
      bottom: '0px',
    },
    titleFont: {
      name: 'noto-sans-kr',
      size: '16px',
      bold: '400',
      color: '#000000',
    },
    titleBorder: {
      left: '0px',
      right: '0px',
      top: '0px',
      bottom: '0px',
    },
    titleBorderColor: '#ffffff',
    titleBackGround: '#ffffff',
    description: '',
    descriptionAlignmentPosition: 'LEFT',
    descriptionPadding: {
      left: '0px',
      right: '0px',
      top: '0px',
      bottom: '0px',
    },
    descriptionFont: {
      name: 'noto-sans-kr',
      size: '12px',
      bold: '400',
      color: '#000000',
    },
    descriptionBorder: {
      left: '0px',
      right: '0px',
      top: '0px',
      bottom: '0px',
    },
    descriptionBorderColor: '#ffffff',
    descriptionBackGround: '#ffffff',
  });

  const getReviewTitleSetting = async () => {
    try {
      const settings = await SettingDesignService.getReviewTitle();
      setTitleProperties(settings as ReviewTitleProperty);
    } catch (error) {
      // eslint-disable-next-line no-console -- track error
      console.error('리뷰 Title 기존 세팅값 조회에 실패했습니다 : ', error);
      // eslint-disable-next-line no-alert -- required alert
      alert('일시적으로 데이터를 조회하지 못하고 있습니다. 잠시 후 다시 시도해 주세요.');
      router.push('/dashboard');
    }
  };

  const updateTitleProperty = <K extends keyof ReviewTitleProperty>(property: K, value: ReviewTitleProperty[K]) => {
    setTitleProperties((prev) => ({
      ...prev,
      [property]: value,
    }));
  };

  const handlePressSaveButton = async () => {
    try {
      await SettingDesignService.modifyReviewTitle(titleProperties);
      // eslint-disable-next-line no-alert -- required alert
      alert('성공적으로 저장되었어요');
      router.refresh();
    } catch (error) {
      // eslint-disable-next-line no-alert -- required alert
      alert('Title 설정값 변경에 일시적으로 실패했습니다. 잠시 후 다시 시도해 주세요.');
    }
  };

  const handlePressResetButton = async () => {
    try {
      await SettingDesignService.resetReviewTitle();
      // eslint-disable-next-line no-alert -- required alert
      alert('성공적으로 초기화되었어요');
      window.location.reload();
    } catch (error) {
      // eslint-disable-next-line no-alert -- required alert
      alert('Title 설정값 초기화에 일시적으로 실패했습니다. 잠시 후 다시 시도해 주세요.');
    }
  };

  useEffect(() => {
    void getReviewTitleSetting();
  }, []);

  useAuthCheck();

  return (
    <SettingLayout>
      <SettingLayout.Title>타이틀</SettingLayout.Title>
      <SettingLayout.Content>
        <SettingItem>
          <SettingItem.Container>
            <SettingItem.Title>타이틀 작성</SettingItem.Title>
            <SettingItem.Caption>
              <p>타이틀을 작성합니다.</p>
              <p>작성하지 않을 경우 기본 설정은 &#39;REVIEW&#39; 입니다</p>
            </SettingItem.Caption>
          </SettingItem.Container>
          <SettingItem.Content>
            <TextField
              variant="box"
              tw="w-full"
              value={titleProperties.title}
              placeholder="텍스트를 입력하세요"
              onChange={(value) => {
                updateTitleProperty('title', value);
              }}
            />
          </SettingItem.Content>
        </SettingItem>

        <SettingItem>
          <SettingItem.Container>
            <SettingItem.Title>정렬</SettingItem.Title>
            <SettingItem.Caption>타이틀의 정렬 위치를 설정합니다.</SettingItem.Caption>
          </SettingItem.Container>
          <SettingItem.Content>
            <RadioGroup
              orientation="horizontal"
              tw="[& > label]:mr-8"
              value={titleProperties.titleAlignmentPosition}
              onChange={(value) => {
                updateTitleProperty('titleAlignmentPosition', value as ReviewTitleProperty['titleAlignmentPosition']);
              }}
            >
              <RadioGroup.Item value="LEFT">왼쪽</RadioGroup.Item>
              <RadioGroup.Item value="CENTER">가운데</RadioGroup.Item>
              <RadioGroup.Item value="RIGHT">오른쪽</RadioGroup.Item>
            </RadioGroup>
          </SettingItem.Content>
        </SettingItem>

        <SettingItem>
          <SettingItem.Container>
            <SettingItem.Title>Padding(내부 여백)</SettingItem.Title>
            <SettingItem.Caption>
              <p>내부 여백을 설정합니다.</p>
              <p>작성하지 않을 경우 기본값은 0입니다.</p>
            </SettingItem.Caption>
          </SettingItem.Container>
          <SettingItem.Content>
            <DesignUnitTextFieldGroupContainer>
              <DesignUnitTextField
                type="PADDING"
                label="왼쪽"
                value={titleProperties.titlePadding.left}
                onChange={(_value) => {
                  updateTitleProperty('titlePadding', {
                    ...titleProperties.titlePadding,
                    left: _value,
                  });
                }}
              />

              <DesignUnitTextField
                type="PADDING"
                label="오른쪽"
                value={titleProperties.titlePadding.right}
                onChange={(_value) => {
                  updateTitleProperty('titlePadding', {
                    ...titleProperties.titlePadding,
                    right: _value,
                  });
                }}
              />

              <DesignUnitTextField
                type="PADDING"
                label="위"
                value={titleProperties.titlePadding.top}
                onChange={(_value) => {
                  updateTitleProperty('titlePadding', {
                    ...titleProperties.titlePadding,
                    top: _value,
                  });
                }}
              />

              <DesignUnitTextField
                type="PADDING"
                label="오른쪽"
                value={titleProperties.titlePadding.bottom}
                onChange={(_value) => {
                  updateTitleProperty('titlePadding', {
                    ...titleProperties.titlePadding,
                    bottom: _value,
                  });
                }}
              />
            </DesignUnitTextFieldGroupContainer>
          </SettingItem.Content>
        </SettingItem>

        <SettingItem>
          <SettingItem.Container>
            <SettingItem.Title>폰트</SettingItem.Title>
            <SettingItem.Caption>
              <p>폰트, 사이즈, 두께, 색상을 설정합니다.</p>
              <p>작성하지 않을 경우 기본값은 카페24 설정을 따릅니다.</p>
            </SettingItem.Caption>
          </SettingItem.Container>
          <SettingItem.Content>
            <div tw="w-full flex items-center gap-4 flex-wrap [& .react-aria-Label]:text-sm [& .react-aria-Label]:text-[#9692A7]">
              <Select
                label="구글 폰트"
                selectedKey={titleProperties.titleFont.name}
                defaultSelectedKey={titleProperties.titleFont.name}
                onSelectionChange={(key) => {
                  updateTitleProperty('titleFont', {
                    ...titleProperties.titleFont,
                    name: key as ReviewTitleProperty['titleFont']['name'],
                  });
                }}
                isDisabled
              >
                <Select.Item id="noto-sans-kr">Noto Sans KR</Select.Item>
              </Select>

              <DesignUnitTextField
                type="FONT"
                label="폰트 사이즈"
                value={titleProperties.titleFont.size}
                onChange={(_value) => {
                  updateTitleProperty('titleFont', {
                    ...titleProperties.titleFont,
                    size: _value,
                  });
                }}
              />

              <Select
                label="폰트 두께"
                selectedKey={titleProperties.titleFont.bold}
                defaultSelectedKey={titleProperties.titleFont.bold}
                onSelectionChange={(key) => {
                  updateTitleProperty('titleFont', {
                    ...titleProperties.titleFont,
                    bold: key as ReviewTitleProperty['titleFont']['bold'],
                  });
                }}
              >
                <Select.Item
                  style={{ backgroundColor: '#F4F5FB' }}
                  id="100"
                >
                  100
                </Select.Item>
                <Select.Item
                  style={{ backgroundColor: '#F4F5FB' }}
                  id="200"
                >
                  200
                </Select.Item>
                <Select.Item
                  style={{ backgroundColor: '#F4F5FB' }}
                  id="300"
                >
                  300
                </Select.Item>
                <Select.Item
                  style={{ backgroundColor: '#F4F5FB' }}
                  id="400"
                >
                  400
                </Select.Item>
                <Select.Item
                  style={{ backgroundColor: '#F4F5FB' }}
                  id="500"
                >
                  500
                </Select.Item>
                <Select.Item
                  style={{ backgroundColor: '#F4F5FB' }}
                  id="600"
                >
                  600
                </Select.Item>
                <Select.Item
                  style={{ backgroundColor: '#F4F5FB' }}
                  id="700"
                >
                  700
                </Select.Item>
                <Select.Item
                  style={{ backgroundColor: '#F4F5FB' }}
                  id="bold"
                >
                  bold
                </Select.Item>
              </Select>

              <ColorPicker
                color={titleProperties.titleFont.color}
                onChange={(_value) => {
                  updateTitleProperty('titleFont', {
                    ...titleProperties.titleFont,
                    color: _value,
                  });
                }}
              />
            </div>
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
                value={titleProperties.titleBorder.left}
                onChange={(_value) => {
                  updateTitleProperty('titleBorder', {
                    ...titleProperties.titleBorder,
                    left: _value,
                  });
                }}
              />

              <DesignUnitTextField
                type="BORDER"
                label="오른쪽"
                value={titleProperties.titleBorder.right}
                onChange={(_value) => {
                  updateTitleProperty('titleBorder', {
                    ...titleProperties.titleBorder,
                    right: _value,
                  });
                }}
              />

              <DesignUnitTextField
                type="BORDER"
                label="위"
                value={titleProperties.titleBorder.top}
                onChange={(_value) => {
                  updateTitleProperty('titleBorder', {
                    ...titleProperties.titleBorder,
                    top: _value,
                  });
                }}
              />

              <DesignUnitTextField
                type="BORDER"
                label="오른쪽"
                value={titleProperties.titleBorder.bottom}
                onChange={(_value) => {
                  updateTitleProperty('titleBorder', {
                    ...titleProperties.titleBorder,
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
              color={titleProperties.titleBorderColor}
              onChange={(_color) => {
                updateTitleProperty('titleBorderColor', _color);
              }}
            />
          </SettingItem.Content>
        </SettingItem>

        <SettingItem>
          <SettingItem.Container>
            <SettingItem.Title>Background(배경)</SettingItem.Title>
            <SettingItem.Caption>배경색을 설정합니다.</SettingItem.Caption>
          </SettingItem.Container>
          <SettingItem.Content>
            <ColorPicker
              color={titleProperties.titleBackGround}
              onChange={(_color) => {
                updateTitleProperty('titleBackGround', _color);
              }}
            />
          </SettingItem.Content>
        </SettingItem>
      </SettingLayout.Content>

      <SettingLayout.Divider />

      <SettingLayout.Title>설명글</SettingLayout.Title>
      <SettingLayout.Content>
        <SettingItem>
          <SettingItem.Container>
            <SettingItem.Title>설명글 작성</SettingItem.Title>
            <SettingItem.Caption>
              <p>설명글을 작성합니다.</p>
              <p>작성하지 않을 경우 나타나지 않습니다.</p>
            </SettingItem.Caption>
          </SettingItem.Container>
          <SettingItem.Content>
            <TextField
              variant="box"
              tw="w-full"
              value={titleProperties.description}
              placeholder="텍스트를 입력하세요"
              onChange={(value) => {
                updateTitleProperty('description', value);
              }}
            />
          </SettingItem.Content>
        </SettingItem>

        <SettingItem>
          <SettingItem.Container>
            <SettingItem.Title>정렬</SettingItem.Title>
            <SettingItem.Caption>설명글의 정렬 위치를 설정합니다.</SettingItem.Caption>
          </SettingItem.Container>
          <SettingItem.Content>
            <RadioGroup
              orientation="horizontal"
              tw="[& > label]:mr-8"
              value={titleProperties.descriptionAlignmentPosition}
              onChange={(value) => {
                updateTitleProperty(
                  'descriptionAlignmentPosition',
                  value as ReviewTitleProperty['descriptionAlignmentPosition'],
                );
              }}
            >
              <RadioGroup.Item value="LEFT">왼쪽</RadioGroup.Item>
              <RadioGroup.Item value="CENTER">가운데</RadioGroup.Item>
              <RadioGroup.Item value="RIGHT">오른쪽</RadioGroup.Item>
            </RadioGroup>
          </SettingItem.Content>
        </SettingItem>

        <SettingItem>
          <SettingItem.Container>
            <SettingItem.Title>Padding(내부 여백)</SettingItem.Title>
            <SettingItem.Caption>
              <p>내부 여백을 설정합니다.</p>
              <p>작성하지 않을 경우 기본값은 0입니다.</p>
            </SettingItem.Caption>
          </SettingItem.Container>
          <SettingItem.Content>
            <DesignUnitTextFieldGroupContainer>
              <DesignUnitTextField
                type="PADDING"
                label="왼쪽"
                value={titleProperties.descriptionPadding.left}
                onChange={(_value) => {
                  updateTitleProperty('descriptionPadding', {
                    ...titleProperties.descriptionPadding,
                    left: _value,
                  });
                }}
              />

              <DesignUnitTextField
                type="PADDING"
                label="오른쪽"
                value={titleProperties.descriptionPadding.right}
                onChange={(_value) => {
                  updateTitleProperty('descriptionPadding', {
                    ...titleProperties.descriptionPadding,
                    right: _value,
                  });
                }}
              />

              <DesignUnitTextField
                type="PADDING"
                label="위"
                value={titleProperties.descriptionPadding.top}
                onChange={(_value) => {
                  updateTitleProperty('descriptionPadding', {
                    ...titleProperties.descriptionPadding,
                    top: _value,
                  });
                }}
              />

              <DesignUnitTextField
                type="PADDING"
                label="오른쪽"
                value={titleProperties.descriptionPadding.bottom}
                onChange={(_value) => {
                  updateTitleProperty('descriptionPadding', {
                    ...titleProperties.descriptionPadding,
                    bottom: _value,
                  });
                }}
              />
            </DesignUnitTextFieldGroupContainer>
          </SettingItem.Content>
        </SettingItem>

        <SettingItem>
          <SettingItem.Container>
            <SettingItem.Title>폰트</SettingItem.Title>
            <SettingItem.Caption>
              <p>폰트, 사이즈, 두께, 색상을 설정합니다.</p>
              <p>작성하지 않을 경우 기본값은 카페24 설정을 따릅니다.</p>
            </SettingItem.Caption>
          </SettingItem.Container>
          <SettingItem.Content>
            <div tw="w-full flex items-center gap-4 flex-wrap [& .react-aria-Label]:text-sm [& .react-aria-Label]:text-[#9692A7]">
              <Select
                label="구글 폰트"
                selectedKey={titleProperties.descriptionFont.name}
                defaultSelectedKey={titleProperties.descriptionFont.name}
                onSelectionChange={(key) => {
                  updateTitleProperty('descriptionFont', {
                    ...titleProperties.descriptionFont,
                    name: key as ReviewTitleProperty['descriptionFont']['name'],
                  });
                }}
                isDisabled
              >
                <Select.Item id="noto-sans-kr">Noto Sans KR</Select.Item>
              </Select>

              <DesignUnitTextField
                type="FONT"
                label="폰트 사이즈"
                value={titleProperties.descriptionFont.size}
                onChange={(_value) => {
                  updateTitleProperty('descriptionFont', {
                    ...titleProperties.descriptionFont,
                    size: _value,
                  });
                }}
              />

              <Select
                label="폰트 두께"
                selectedKey={titleProperties.descriptionFont.bold}
                defaultSelectedKey={titleProperties.descriptionFont.bold}
                onSelectionChange={(key) => {
                  updateTitleProperty('descriptionFont', {
                    ...titleProperties.descriptionFont,
                    bold: key as ReviewTitleProperty['descriptionFont']['bold'],
                  });
                }}
              >
                <Select.Item
                  style={{ backgroundColor: '#F4F5FB' }}
                  id="100"
                >
                  100
                </Select.Item>
                <Select.Item
                  style={{ backgroundColor: '#F4F5FB' }}
                  id="200"
                >
                  200
                </Select.Item>
                <Select.Item
                  style={{ backgroundColor: '#F4F5FB' }}
                  id="300"
                >
                  300
                </Select.Item>
                <Select.Item
                  style={{ backgroundColor: '#F4F5FB' }}
                  id="400"
                >
                  400
                </Select.Item>
                <Select.Item
                  style={{ backgroundColor: '#F4F5FB' }}
                  id="500"
                >
                  500
                </Select.Item>
                <Select.Item
                  style={{ backgroundColor: '#F4F5FB' }}
                  id="600"
                >
                  600
                </Select.Item>
                <Select.Item
                  style={{ backgroundColor: '#F4F5FB' }}
                  id="700"
                >
                  700
                </Select.Item>
                <Select.Item
                  style={{ backgroundColor: '#F4F5FB' }}
                  id="bold"
                >
                  bold
                </Select.Item>
              </Select>

              <ColorPicker
                color={titleProperties.descriptionFont.color}
                onChange={(_value) => {
                  updateTitleProperty('descriptionFont', {
                    ...titleProperties.descriptionFont,
                    color: _value,
                  });
                }}
              />
            </div>
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
                value={titleProperties.descriptionBorder.left}
                onChange={(_value) => {
                  updateTitleProperty('descriptionBorder', {
                    ...titleProperties.descriptionBorder,
                    left: _value,
                  });
                }}
              />

              <DesignUnitTextField
                type="BORDER"
                label="오른쪽"
                value={titleProperties.descriptionBorder.right}
                onChange={(_value) => {
                  updateTitleProperty('descriptionBorder', {
                    ...titleProperties.descriptionBorder,
                    right: _value,
                  });
                }}
              />

              <DesignUnitTextField
                type="BORDER"
                label="위"
                value={titleProperties.descriptionBorder.top}
                onChange={(_value) => {
                  updateTitleProperty('descriptionBorder', {
                    ...titleProperties.descriptionBorder,
                    top: _value,
                  });
                }}
              />

              <DesignUnitTextField
                type="BORDER"
                label="오른쪽"
                value={titleProperties.descriptionBorder.bottom}
                onChange={(_value) => {
                  updateTitleProperty('descriptionBorder', {
                    ...titleProperties.descriptionBorder,
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
              color={titleProperties.descriptionBorderColor}
              onChange={(_color) => {
                updateTitleProperty('descriptionBorderColor', _color);
              }}
            />
          </SettingItem.Content>
        </SettingItem>

        <SettingItem>
          <SettingItem.Container>
            <SettingItem.Title>Background(배경)</SettingItem.Title>
            <SettingItem.Caption>배경색을 설정합니다.</SettingItem.Caption>
          </SettingItem.Container>
          <SettingItem.Content>
            <ColorPicker
              color={titleProperties.descriptionBackGround}
              onChange={(_color) => {
                updateTitleProperty('descriptionBackGround', _color);
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

export default SettingDesignTitlePage;
