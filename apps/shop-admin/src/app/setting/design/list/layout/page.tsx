'use client';

import { RadioGroup, SolidButton, Switch } from '@ui/components';

import withAuthCheck from '@/components/common/with-auth-check';
import SettingItem from '@/components/setting/setting-item';
import SettingLayout from '@/components/setting/setting-layout';

function SettingDesignLayoutPage() {
  return (
    <SettingLayout>
      <SettingLayout.Content>
        <SettingItem>
          <SettingItem.Container>
            <SettingItem.Title>베스트 리뷰 영역</SettingItem.Title>
            <SettingItem.Caption>베스트 리뷰 영역을 활성화 또는 비활성화 할 수 있습니다.</SettingItem.Caption>
          </SettingItem.Container>
          <SettingItem.Content>
            <Switch />
          </SettingItem.Content>
        </SettingItem>

        <SettingItem>
          <SettingItem.Container>
            <SettingItem.Title>리뷰통계 영역</SettingItem.Title>
            <SettingItem.Caption>리뷰 영역의 통계 데이터를 활성화 또는 비활성화 할 수 있습니다.</SettingItem.Caption>
          </SettingItem.Container>
          <SettingItem.Content>
            <Switch />
          </SettingItem.Content>
        </SettingItem>

        <SettingItem>
          <SettingItem.Container>
            <SettingItem.Title>이미지/동영상 영역</SettingItem.Title>
            <SettingItem.Caption>이미지, 동영상 영역을 활성화 또는 비활성화 할 수 있습니다.</SettingItem.Caption>
          </SettingItem.Container>
          <SettingItem.Content>
            <Switch />
          </SettingItem.Content>
        </SettingItem>

        <SettingItem>
          <SettingItem.Container>
            <SettingItem.Title>이미지/동영상, 리뷰 영역 레이아웃</SettingItem.Title>
            <SettingItem.Caption>
              이미지/동영상, 리뷰 영역의 레이아웃을 설정할 수 있습니다. 둘 중 하나의 영역을 비활성화 할 경우 활성화 된
              영역은 Full Size로 적용됩니다.
            </SettingItem.Caption>
          </SettingItem.Container>
          <SettingItem.Content></SettingItem.Content>
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
            >
              <RadioGroup.Item value="board">게시판형</RadioGroup.Item>
              <RadioGroup.Item value="card">카드형</RadioGroup.Item>
              <RadioGroup.Item value="chat">대화형</RadioGroup.Item>
            </RadioGroup>
          </SettingItem.Content>
        </SettingItem>
      </SettingLayout.Content>

      <SettingLayout.Footer>
        <SolidButton
          size="sm"
          variant="primary"
        >
          저장하기
        </SolidButton>
        <SolidButton
          size="sm"
          variant="gray"
        >
          초기화
        </SolidButton>
      </SettingLayout.Footer>
    </SettingLayout>
  );
}

export default withAuthCheck(SettingDesignLayoutPage);
