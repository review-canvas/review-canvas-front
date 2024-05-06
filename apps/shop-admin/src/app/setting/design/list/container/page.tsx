'use client';

import { SolidButton } from '@ui/components';

import withAuthCheck from '@/components/common/with-auth-check';
import SettingItem from '@/components/setting/setting-item';
import SettingLayout from '@/components/setting/setting-layout';

function SettingDesignContainerPage() {
  return (
    <SettingLayout>
      <SettingLayout.Content>
        <SettingItem>
          <SettingItem.Container>
            <SettingItem.Title>Width(가로)</SettingItem.Title>
            <SettingItem.Caption>
              <p>리뷰 전체 영역의 가로 사이즈를 설정합니다.</p>
              <p>Xpx 이하에서 베스트리뷰, 통계, 이미지/동영상은 활성화되지 않습니다.</p>
            </SettingItem.Caption>
          </SettingItem.Container>
          <SettingItem.Content></SettingItem.Content>
        </SettingItem>

        <SettingItem>
          <SettingItem.Container>
            <SettingItem.Title>Padding(내부여백)</SettingItem.Title>
            <SettingItem.Caption>
              <p>리뷰 전체 영역의 내부 여백을 설정합니다.</p>
              <p>작성하지 않을 경우 기본값은 0입니다.</p>
            </SettingItem.Caption>
          </SettingItem.Container>
          <SettingItem.Content></SettingItem.Content>
        </SettingItem>

        <SettingItem>
          <SettingItem.Container>
            <SettingItem.Title>Background(배경)</SettingItem.Title>
            <SettingItem.Caption>리뷰 전체 영역의 배경색을 설정합니다.</SettingItem.Caption>
          </SettingItem.Container>
          <SettingItem.Content></SettingItem.Content>
        </SettingItem>

        <SettingItem>
          <SettingItem.Container>
            <SettingItem.Title>Border(테두리)</SettingItem.Title>
            <SettingItem.Caption>리뷰 전체 영역의 테두리의 두께를 설정합니다.</SettingItem.Caption>
          </SettingItem.Container>
          <SettingItem.Content></SettingItem.Content>
        </SettingItem>

        <SettingItem>
          <SettingItem.Container>
            <SettingItem.Title>Border Color(테두리 색상)</SettingItem.Title>
            <SettingItem.Caption>리뷰 전체 영역의 테두리를 설정합니다.</SettingItem.Caption>
          </SettingItem.Container>
          <SettingItem.Content></SettingItem.Content>
        </SettingItem>

        <SettingItem>
          <SettingItem.Container>
            <SettingItem.Title>Shadow(그림자)</SettingItem.Title>
            <SettingItem.Caption>리뷰 전체 영역의 그림자를 설정합니다.</SettingItem.Caption>
          </SettingItem.Container>
          <SettingItem.Content></SettingItem.Content>
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

export default withAuthCheck(SettingDesignContainerPage);
