'use client';

import { useEffect, useState } from 'react';

import { ColorPicker, RadioGroup, SolidButton } from '@ui/components';
import TextField from '@ui/components/text-field';
import { useRouter } from 'next/navigation';

import type { ReviewDesignViewProperty, Shadow } from '@review-canvas/theme';

import ArrowIcon from '@/assets/icon/icon-arrow.svg';
import ThumbUpIcon from '@/assets/icon/icon-thumb-up.svg';
import DesignUnitTextField from '@/components/common/design-unit-text-field';
import FontController from '@/components/common/font-controller';
import DesignUnitTextFieldGroupContainer from '@/components/setting/design-unit-text-field-group';
import SettingItem from '@/components/setting/setting-item';
import SettingLayout from '@/components/setting/setting-layout';
import { numberRegex } from '@/constants/regex';
import useAuthCheck from '@/hooks/use-auth-check';
import { SettingDesignService } from '@/service/setting/design';

function SettingDetailReadPage() {
  const router = useRouter();
  const [designViewProperties, setDesignViewProperties] = useState<ReviewDesignViewProperty>({
    detailViewType: 'SPREAD',
    pagingType: 'PAGE_NUMBER',
    filterType: 'LIST',
    filterActiveTextColor: '#000000',
    reviewBackgroundColor: '#ffffff',
    margin: {
      left: '0px',
      right: '0px',
      top: '0px',
      bottom: '0px',
    },
    padding: {
      left: '0px',
      right: '0px',
      top: '0px',
      bottom: '0px',
    },
    detailInfoTextColor: '#8d8d8d',
    font: {
      name: 'noto-sans-kr',
      size: '12px',
      bold: '400',
      color: '#000000',
    },
    border: {
      left: '0px',
      right: '0px',
      top: '0px',
      bottom: '0px',
    },
    round: {
      topLeft: '0px',
      topRight: '0px',
      bottomLeft: '0px',
      bottomRight: '0px',
    },
    borderColor: '#000000',
    shadow: 'NONE',
    replyBackgroundColor: '#222222',
    reviewPreviewTextMaxSize: 150,
    seeMoreButtonType: 'SEE_MORE_TOGGLE',
    reviewLike: {
      buttonType: 'NONE',
      iconColor: '#000000',
      textColor: '#000000',
      buttonBorderColor: '#E6E6E7',
      buttonRound: {
        topLeft: '0px',
        topRight: '0px',
        bottomLeft: '0px',
        bottomRight: '0px',
      },
    },
  });

  const getReviewDesignViewSetting = async () => {
    try {
      const settings = await SettingDesignService.getReviewDesignView();
      setDesignViewProperties(settings as ReviewDesignViewProperty);
    } catch (error) {
      // eslint-disable-next-line no-console -- track error
      console.error('리뷰 Design View 기존 세팅값 조회에 실패했습니다 : ', error);
      // eslint-disable-next-line no-alert -- required alert
      alert('일시적으로 데이터를 조회하지 못하고 있습니다. 잠시 후 다시 시도해 주세요.');
      router.push('/dashboard');
    }
  };

  const updateDesignViewProperty = <K extends keyof ReviewDesignViewProperty>(
    property: K,
    value: ReviewDesignViewProperty[K],
  ) => {
    setDesignViewProperties((prev) => ({
      ...prev,
      [property]: value,
    }));
  };

  const handlePressSaveButton = async () => {
    try {
      await SettingDesignService.modifyReviewDesignView(designViewProperties);
      // eslint-disable-next-line no-alert -- required alert
      alert('성공적으로 저장되었어요');
      router.refresh();
    } catch (error) {
      // eslint-disable-next-line no-alert -- required alert
      alert('Design View 설정값 변경에 일시적으로 실패했습니다. 잠시 후 다시 시도해 주세요.');
    }
  };

  const handlePressResetButton = async () => {
    try {
      await SettingDesignService.resetReviewDesignView();
      // eslint-disable-next-line no-alert -- required alert
      alert('성공적으로 초기화되었어요');
      window.location.reload();
    } catch (error) {
      // eslint-disable-next-line no-alert -- required alert
      alert('Design View 설정값 초기화에 일시적으로 실패했습니다. 잠시 후 다시 시도해 주세요.');
    }
  };

  useEffect(() => {
    void getReviewDesignViewSetting();
  }, []);

  useAuthCheck();

  return (
    <SettingLayout>
      <SettingLayout.Content>
        <SettingItem>
          <SettingItem.Container>
            <SettingItem.Title>리뷰 자세히 보기 방식</SettingItem.Title>
            <SettingItem.Caption>더보기 버튼 또는 리뷰 클릭 시 리뷰 자세히 보기 방식을 설정해요.</SettingItem.Caption>
          </SettingItem.Container>
          <SettingItem.Content>
            <RadioGroup
              orientation="horizontal"
              tw="[& > label]:mr-8"
              value={designViewProperties.detailViewType}
              onChange={(value) => {
                updateDesignViewProperty('detailViewType', value as ReviewDesignViewProperty['detailViewType']);
              }}
            >
              <RadioGroup.Item value="SPREAD">펼쳐보기</RadioGroup.Item>
              <RadioGroup.Item value="MODAL">모달(팝업)</RadioGroup.Item>
            </RadioGroup>
          </SettingItem.Content>
        </SettingItem>

        <SettingItem>
          <SettingItem.Container>
            <SettingItem.Title>페이지 방식</SettingItem.Title>
            <SettingItem.Caption>리뷰 보기 리스트 페이지를 띄우는 방식을 설정해요.</SettingItem.Caption>
          </SettingItem.Container>
          <SettingItem.Content>
            <RadioGroup
              orientation="horizontal"
              tw="[& > label]:mr-8"
              value={designViewProperties.pagingType}
              onChange={(value) => {
                updateDesignViewProperty('pagingType', value as ReviewDesignViewProperty['pagingType']);
              }}
            >
              <RadioGroup.Item value="PAGE_NUMBER">페이지 넘버</RadioGroup.Item>
              <RadioGroup.Item value="SEE_MORE_SCROLL">더보기 스크롤</RadioGroup.Item>
            </RadioGroup>
          </SettingItem.Content>
        </SettingItem>

        <SettingItem>
          <SettingItem.Container>
            <SettingItem.Title>리뷰 필터</SettingItem.Title>
            <SettingItem.Caption>최신순, 평점 높은순 등 리뷰 필터의 디자인 방식을 설정해요.</SettingItem.Caption>
          </SettingItem.Container>
          <SettingItem.Content>
            <RadioGroup
              orientation="horizontal"
              tw="[& > label]:mr-8"
              value={designViewProperties.filterType}
              onChange={(value) => {
                updateDesignViewProperty('filterType', value as ReviewDesignViewProperty['filterType']);
              }}
            >
              <RadioGroup.Item value="LIST">나열형</RadioGroup.Item>
              <RadioGroup.Item value="DROPDOWN">드롭다운</RadioGroup.Item>
            </RadioGroup>
          </SettingItem.Content>
        </SettingItem>

        <SettingItem>
          <SettingItem.Container>
            <SettingItem.Title>필터 활성화 텍스트 색상</SettingItem.Title>
            <SettingItem.Caption>
              최신순, 평점 높은순 등 리뷰 필터의 Active,Hover 된 텍스트의 색상을 설정해요. 기본 값은 #000000 에요.
            </SettingItem.Caption>
          </SettingItem.Container>
          <SettingItem.Content>
            <ColorPicker
              color={designViewProperties.filterActiveTextColor}
              onChange={(_value) => {
                updateDesignViewProperty('filterActiveTextColor', _value);
              }}
            />
          </SettingItem.Content>
        </SettingItem>

        <SettingItem>
          <SettingItem.Container>
            <SettingItem.Title>각 리뷰 영역 배경 색상</SettingItem.Title>
            <SettingItem.Caption>각 리뷰의 배경 색상을 설정할 수 있어요. 기본 값은 #ffffff 에요.</SettingItem.Caption>
          </SettingItem.Container>
          <SettingItem.Content>
            <ColorPicker
              color={designViewProperties.reviewBackgroundColor}
              onChange={(_value) => {
                updateDesignViewProperty('reviewBackgroundColor', _value);
              }}
            />
          </SettingItem.Content>
        </SettingItem>

        <SettingItem>
          <SettingItem.Container>
            <SettingItem.Title>바깥쪽 여백</SettingItem.Title>
            <SettingItem.Caption>각 리뷰의 바깥 여백을 설정합니다. 기본 값은 0px입니다.</SettingItem.Caption>
          </SettingItem.Container>
          <SettingItem.Content>
            <DesignUnitTextFieldGroupContainer>
              <DesignUnitTextField
                type="MARGIN"
                label="왼쪽"
                value={designViewProperties.margin.left}
                onChange={(_value) => {
                  updateDesignViewProperty('margin', {
                    ...designViewProperties.margin,
                    left: _value,
                  });
                }}
              />

              <DesignUnitTextField
                type="MARGIN"
                label="오른쪽"
                value={designViewProperties.margin.right}
                onChange={(_value) => {
                  updateDesignViewProperty('margin', {
                    ...designViewProperties.margin,
                    right: _value,
                  });
                }}
              />

              <DesignUnitTextField
                type="MARGIN"
                label="위"
                value={designViewProperties.margin.top}
                onChange={(_value) => {
                  updateDesignViewProperty('margin', {
                    ...designViewProperties.margin,
                    top: _value,
                  });
                }}
              />

              <DesignUnitTextField
                type="MARGIN"
                label="오른쪽"
                value={designViewProperties.margin.bottom}
                onChange={(_value) => {
                  updateDesignViewProperty('margin', {
                    ...designViewProperties.margin,
                    bottom: _value,
                  });
                }}
              />
            </DesignUnitTextFieldGroupContainer>
          </SettingItem.Content>
        </SettingItem>

        <SettingItem>
          <SettingItem.Container>
            <SettingItem.Title>안쪽 여백</SettingItem.Title>
            <SettingItem.Caption>
              각 리뷰의 안쪽 여백을 설정합니다. 기본 값은 20px, 20px, 15px, 15px 이에요.
            </SettingItem.Caption>
          </SettingItem.Container>
          <SettingItem.Content>
            <DesignUnitTextFieldGroupContainer>
              <DesignUnitTextField
                type="PADDING"
                label="왼쪽"
                value={designViewProperties.padding.left}
                onChange={(_value) => {
                  updateDesignViewProperty('padding', {
                    ...designViewProperties.padding,
                    left: _value,
                  });
                }}
              />

              <DesignUnitTextField
                type="PADDING"
                label="오른쪽"
                value={designViewProperties.padding.right}
                onChange={(_value) => {
                  updateDesignViewProperty('padding', {
                    ...designViewProperties.padding,
                    right: _value,
                  });
                }}
              />

              <DesignUnitTextField
                type="PADDING"
                label="위"
                value={designViewProperties.padding.top}
                onChange={(_value) => {
                  updateDesignViewProperty('padding', {
                    ...designViewProperties.padding,
                    top: _value,
                  });
                }}
              />

              <DesignUnitTextField
                type="PADDING"
                label="오른쪽"
                value={designViewProperties.padding.bottom}
                onChange={(_value) => {
                  updateDesignViewProperty('padding', {
                    ...designViewProperties.padding,
                    bottom: _value,
                  });
                }}
              />
            </DesignUnitTextFieldGroupContainer>
          </SettingItem.Content>
        </SettingItem>

        <SettingItem>
          <SettingItem.Container>
            <SettingItem.Title>상세 정보 텍스트 색상</SettingItem.Title>
            <SettingItem.Caption>
              구매한 제품의 옵션, 상세평가, 아이디, 구매일 등 정보의 텍스트 색상을 설정해요. 기본 값은 #8d8d8d에요. 상세
              평가의 주제는 #252525 고정이에요.
            </SettingItem.Caption>
          </SettingItem.Container>
          <SettingItem.Content>
            <ColorPicker
              color={designViewProperties.detailInfoTextColor}
              onChange={(_value) => {
                updateDesignViewProperty('detailInfoTextColor', _value);
              }}
            />
          </SettingItem.Content>
        </SettingItem>

        <SettingItem>
          <SettingItem.Container>
            <SettingItem.Title>리뷰 텍스트</SettingItem.Title>
            <SettingItem.Caption>
              리뷰 본문의 폰트, 사이즈, 두께, 색상를 설정합니다. 작성하지 않을 경우 기본값은 카페24 설정을 따릅니다.
            </SettingItem.Caption>
          </SettingItem.Container>
          <SettingItem.Content>
            <FontController
              name={designViewProperties.font.name}
              size={designViewProperties.font.size}
              bold={designViewProperties.font.bold}
              color={designViewProperties.font.color}
              onNameChange={(_name) => {
                updateDesignViewProperty('font', {
                  ...designViewProperties.font,
                  name: _name,
                });
              }}
              onSizeChange={(_size) => {
                updateDesignViewProperty('font', {
                  ...designViewProperties.font,
                  size: _size,
                });
              }}
              onBoldChange={(_bold) => {
                updateDesignViewProperty('font', {
                  ...designViewProperties.font,
                  bold: _bold,
                });
              }}
              onColorChange={(_color) => {
                updateDesignViewProperty('font', {
                  ...designViewProperties.font,
                  color: _color,
                });
              }}
            />
          </SettingItem.Content>
        </SettingItem>

        <SettingItem>
          <SettingItem.Container>
            <SettingItem.Title>리뷰 테두리</SettingItem.Title>
            <SettingItem.Caption>
              각 리뷰의 테두리 두께를 정할 수 있어요. 작성하지 않을 경우 0으로 설정돼요.
            </SettingItem.Caption>
          </SettingItem.Container>
          <SettingItem.Content>
            <DesignUnitTextFieldGroupContainer>
              <DesignUnitTextField
                type="BORDER"
                label="왼쪽"
                value={designViewProperties.border.left}
                onChange={(_value) => {
                  updateDesignViewProperty('border', {
                    ...designViewProperties.border,
                    left: _value,
                  });
                }}
              />

              <DesignUnitTextField
                type="BORDER"
                label="오른쪽"
                value={designViewProperties.border.right}
                onChange={(_value) => {
                  updateDesignViewProperty('border', {
                    ...designViewProperties.border,
                    right: _value,
                  });
                }}
              />

              <DesignUnitTextField
                type="BORDER"
                label="위"
                value={designViewProperties.border.top}
                onChange={(_value) => {
                  updateDesignViewProperty('border', {
                    ...designViewProperties.border,
                    top: _value,
                  });
                }}
              />

              <DesignUnitTextField
                type="BORDER"
                label="오른쪽"
                value={designViewProperties.border.bottom}
                onChange={(_value) => {
                  updateDesignViewProperty('border', {
                    ...designViewProperties.border,
                    bottom: _value,
                  });
                }}
              />
            </DesignUnitTextFieldGroupContainer>
          </SettingItem.Content>
        </SettingItem>

        <SettingItem>
          <SettingItem.Container>
            <SettingItem.Title>리뷰 라운드</SettingItem.Title>
            <SettingItem.Caption>각 리뷰 모서리의 라운드를 적용할 수 있어요. 기본 값은 0이에요.</SettingItem.Caption>
          </SettingItem.Container>
          <SettingItem.Content>
            <DesignUnitTextFieldGroupContainer>
              <DesignUnitTextField
                type="BORDER_RADIUS"
                label="왼쪽 상단"
                value={designViewProperties.round.topLeft}
                onChange={(_value) => {
                  updateDesignViewProperty('round', {
                    ...designViewProperties.round,
                    topLeft: _value,
                  });
                }}
              />

              <DesignUnitTextField
                type="BORDER_RADIUS"
                label="오른쪽 상단"
                value={designViewProperties.round.topRight}
                onChange={(_value) => {
                  updateDesignViewProperty('round', {
                    ...designViewProperties.round,
                    topRight: _value,
                  });
                }}
              />

              <DesignUnitTextField
                type="BORDER_RADIUS"
                label="왼쪽 하단"
                value={designViewProperties.round.bottomLeft}
                onChange={(_value) => {
                  updateDesignViewProperty('round', {
                    ...designViewProperties.round,
                    bottomLeft: _value,
                  });
                }}
              />

              <DesignUnitTextField
                type="BORDER_RADIUS"
                label="오른쪽 하단"
                value={designViewProperties.round.bottomRight}
                onChange={(_value) => {
                  updateDesignViewProperty('round', {
                    ...designViewProperties.round,
                    bottomRight: _value,
                  });
                }}
              />
            </DesignUnitTextFieldGroupContainer>
          </SettingItem.Content>
        </SettingItem>

        <SettingItem>
          <SettingItem.Container>
            <SettingItem.Title>테두리 색상</SettingItem.Title>
            <SettingItem.Caption>각 리뷰의 테두리 색상을 설정할 수 있어요.</SettingItem.Caption>
          </SettingItem.Container>
          <SettingItem.Content>
            <ColorPicker
              color={designViewProperties.borderColor}
              onChange={(_value) => {
                updateDesignViewProperty('borderColor', _value);
              }}
            />
          </SettingItem.Content>
        </SettingItem>

        <SettingItem>
          <SettingItem.Container>
            <SettingItem.Title>Shadow(그림자)</SettingItem.Title>
            <SettingItem.Caption>
              각 리뷰 영역의 그림자를 설정해요. 기본 값은 &apos;그림자 없음&apos;이에요.
            </SettingItem.Caption>
          </SettingItem.Container>
          <SettingItem.Content>
            <RadioGroup
              orientation="horizontal"
              tw="[& > label]:mr-8"
              value={designViewProperties.shadow}
              onChange={(value) => {
                updateDesignViewProperty('shadow', value as Shadow);
              }}
            >
              <RadioGroup.Item value="NONE">그림자 없음</RadioGroup.Item>
              <RadioGroup.Item value="SMALL">Small</RadioGroup.Item>
              <RadioGroup.Item value="MEDIUM">Medium</RadioGroup.Item>
              <RadioGroup.Item value="LARGE">Large</RadioGroup.Item>
            </RadioGroup>
          </SettingItem.Content>
        </SettingItem>

        <SettingItem>
          <SettingItem.Container>
            <SettingItem.Title>답글 배경 색상</SettingItem.Title>
            <SettingItem.Caption>
              운영자의 리뷰 답글 색상을 설정해요. 기본 값은 &apos;없음&apos; 이에요.
            </SettingItem.Caption>
          </SettingItem.Container>
          <SettingItem.Content>
            <ColorPicker
              color={designViewProperties.replyBackgroundColor}
              onChange={(_value) => {
                updateDesignViewProperty('replyBackgroundColor', _value);
              }}
            />
          </SettingItem.Content>
        </SettingItem>

        <SettingItem>
          <SettingItem.Container>
            <SettingItem.Title>리뷰 미리보기 최대 글자 수</SettingItem.Title>
            <SettingItem.Caption>
              리뷰 더보기 버튼 및 클릭 전 미리보기 최대 글자 수를 설정해요. 기본 값은 150자 에요.
            </SettingItem.Caption>
          </SettingItem.Container>
          <SettingItem.Content>
            <TextField
              type="text"
              placeholder="150"
              value={String(designViewProperties.reviewPreviewTextMaxSize)}
              onChange={(_value) => {
                const numberValue = Number(_value);
                if (!isNaN(numberValue) && numberRegex.test(_value)) {
                  updateDesignViewProperty('reviewPreviewTextMaxSize', numberValue);
                } else {
                  updateDesignViewProperty('reviewPreviewTextMaxSize', 0);
                }
              }}
            />
            <span>자</span>
          </SettingItem.Content>
        </SettingItem>

        <SettingItem>
          <SettingItem.Container>
            <SettingItem.Title>더보기 버튼 스타일</SettingItem.Title>
            <SettingItem.Caption>
              리뷰 더보기 버튼의 디자인을 설정할 수 있어요. 리뷰 미리보기 최대 글자 수 이하 또는 사진을 등록하지 않은
              리뷰에는 나타나지 않아요.
            </SettingItem.Caption>
          </SettingItem.Container>
          <SettingItem.Content>
            <RadioGroup
              orientation="horizontal"
              tw="[& > label]:mr-8"
              value={designViewProperties.seeMoreButtonType}
              onChange={(value) => {
                updateDesignViewProperty('seeMoreButtonType', value as ReviewDesignViewProperty['seeMoreButtonType']);
              }}
            >
              <RadioGroup.Item value="SEE_MORE_TOGGLE">
                <div tw="flex gap-2 items-center">
                  <span>더보기</span>
                  <ArrowIcon />
                </div>
              </RadioGroup.Item>
              <RadioGroup.Item value="SEE_MORE_UNDERLINE">
                <span tw="underline">더보기</span>
              </RadioGroup.Item>
              <RadioGroup.Item value="READ_MORE">Read More</RadioGroup.Item>
              <RadioGroup.Item value="NO_BUTTON">버튼 없음</RadioGroup.Item>
            </RadioGroup>
          </SettingItem.Content>
        </SettingItem>

        <SettingItem>
          <SettingItem.Container>
            <SettingItem.Title>리뷰 좋아요 버튼</SettingItem.Title>
            <SettingItem.Caption>
              리뷰에 좋아요 버튼을 생성 또는 디자인 설정할 수 있어요. 기본 값은 &apos;버튼 없음&apos; 이에요.
            </SettingItem.Caption>
          </SettingItem.Container>
          <SettingItem.Content>
            <RadioGroup
              orientation="horizontal"
              tw="[& > label]:mr-8"
              value={designViewProperties.reviewLike.buttonType}
              onChange={(value) => {
                updateDesignViewProperty('reviewLike', {
                  ...designViewProperties.reviewLike,
                  buttonType: value as ReviewDesignViewProperty['reviewLike']['buttonType'],
                });
              }}
            >
              <RadioGroup.Item value="NONE">버튼 없음</RadioGroup.Item>
              <RadioGroup.Item value="THUMB_UP_WITH_TEXT">
                <div tw="flex gap-2 items-center border-[1px] border-[#e6e6e7] px-2 py-1 text-black text-sm rounded-md">
                  <ThumbUpIcon />
                  <span>도움돼요 1</span>
                </div>
              </RadioGroup.Item>
              <RadioGroup.Item value="THUMB_UP">
                <div tw="flex gap-2 items-center border-[1px] border-[#e6e6e7] px-2 py-1 text-black text-sm rounded-md">
                  <ThumbUpIcon />
                  <span>1</span>
                </div>
              </RadioGroup.Item>
            </RadioGroup>
          </SettingItem.Content>
        </SettingItem>

        <SettingItem>
          <SettingItem.Container>
            <SettingItem.Title>리뷰 좋아요 아이콘 색상</SettingItem.Title>
            <SettingItem.Caption>리뷰의 좋아요 버튼의 색상을 설정해요. 기본 값은 #000000 이에요.</SettingItem.Caption>
          </SettingItem.Container>
          <SettingItem.Content>
            <ColorPicker
              color={designViewProperties.reviewLike.iconColor}
              onChange={(_value) => {
                updateDesignViewProperty('reviewLike', {
                  ...designViewProperties.reviewLike,
                  iconColor: _value,
                });
              }}
            />
          </SettingItem.Content>
        </SettingItem>

        <SettingItem>
          <SettingItem.Container>
            <SettingItem.Title>리뷰 좋아요 텍스트 색상</SettingItem.Title>
            <SettingItem.Caption>
              리뷰의 좋아요 버튼의 &apos;도움돼요&apos; 텍스트 색상을 설정해요. 기본 값은 #000000 이에요.
            </SettingItem.Caption>
          </SettingItem.Container>
          <SettingItem.Content>
            <ColorPicker
              color={designViewProperties.reviewLike.textColor}
              onChange={(_value) => {
                updateDesignViewProperty('reviewLike', {
                  ...designViewProperties.reviewLike,
                  textColor: _value,
                });
              }}
            />
          </SettingItem.Content>
        </SettingItem>

        <SettingItem>
          <SettingItem.Container>
            <SettingItem.Title>리뷰 좋아요 버튼 테두리 색상</SettingItem.Title>
            <SettingItem.Caption>
              리뷰의 좋아요 버튼의 테두리 색상을 설정해요. 기본 값은 #E6E6E7 이에요.
            </SettingItem.Caption>
          </SettingItem.Container>
          <SettingItem.Content>
            <ColorPicker
              color={designViewProperties.reviewLike.buttonBorderColor}
              onChange={(_value) => {
                updateDesignViewProperty('reviewLike', {
                  ...designViewProperties.reviewLike,
                  buttonBorderColor: _value,
                });
              }}
            />
          </SettingItem.Content>
        </SettingItem>

        <SettingItem>
          <SettingItem.Container>
            <SettingItem.Title>리뷰 좋아요 버튼 라운드</SettingItem.Title>
            <SettingItem.Caption>
              리뷰의 좋아요 버튼 모서리의 라운드를 적용할 수 있어요. 기본 값은 0px 이에요.
            </SettingItem.Caption>
          </SettingItem.Container>
          <SettingItem.Content>
            <DesignUnitTextFieldGroupContainer>
              <DesignUnitTextField
                type="BORDER_RADIUS"
                label="왼쪽 상단"
                value={designViewProperties.reviewLike.buttonRound.topLeft}
                onChange={(_value) => {
                  updateDesignViewProperty('reviewLike', {
                    ...designViewProperties.reviewLike,
                    buttonRound: {
                      ...designViewProperties.reviewLike.buttonRound,
                      topLeft: _value,
                    },
                  });
                }}
              />

              <DesignUnitTextField
                type="BORDER_RADIUS"
                label="오른쪽 상단"
                value={designViewProperties.reviewLike.buttonRound.topRight}
                onChange={(_value) => {
                  updateDesignViewProperty('reviewLike', {
                    ...designViewProperties.reviewLike,
                    buttonRound: {
                      ...designViewProperties.reviewLike.buttonRound,
                      topRight: _value,
                    },
                  });
                }}
              />

              <DesignUnitTextField
                type="BORDER_RADIUS"
                label="왼쪽 하단"
                value={designViewProperties.reviewLike.buttonRound.bottomLeft}
                onChange={(_value) => {
                  updateDesignViewProperty('reviewLike', {
                    ...designViewProperties.reviewLike,
                    buttonRound: {
                      ...designViewProperties.reviewLike.buttonRound,
                      bottomLeft: _value,
                    },
                  });
                }}
              />

              <DesignUnitTextField
                type="BORDER_RADIUS"
                label="오른쪽 하단"
                value={designViewProperties.reviewLike.buttonRound.bottomRight}
                onChange={(_value) => {
                  updateDesignViewProperty('reviewLike', {
                    ...designViewProperties.reviewLike,
                    buttonRound: {
                      ...designViewProperties.reviewLike.buttonRound,
                      bottomRight: _value,
                    },
                  });
                }}
              />
            </DesignUnitTextFieldGroupContainer>
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

export default SettingDetailReadPage;
