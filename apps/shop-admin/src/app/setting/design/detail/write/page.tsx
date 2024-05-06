'use client';

import { SolidButton } from '@ui/components';

import withAuthCheck from '@/components/common/with-auth-check';
import SettingItem from '@/components/setting/setting-item';
import SettingLayout from '@/components/setting/setting-layout';

function SettingDetailWritePage() {
  return (
    <SettingLayout>
      <SettingLayout.Content>
        <SettingItem>
          <SettingItem.Container>
            <SettingItem.Title>페이징 방식</SettingItem.Title>
            <SettingItem.Caption>리뷰 작성하기 페이지를 띄우는 방식을 설정합니다.</SettingItem.Caption>
          </SettingItem.Container>
          <SettingItem.Content></SettingItem.Content>
        </SettingItem>

        <SettingItem>
          <SettingItem.Container>
            <SettingItem.Title>가로 사이즈</SettingItem.Title>
            <SettingItem.Caption>
              리뷰쓰기 영역의 가로 사이즈를 설정합니다. pc와 모바일 2가지를 각각 설정할 수 있습니다. 설정하지 않을 경우
              기본 값은 PC는 500px, 모바일은 100%입니다.
            </SettingItem.Caption>
          </SettingItem.Container>
          <SettingItem.Content></SettingItem.Content>
        </SettingItem>

        <SettingItem>
          <SettingItem.Container>
            <SettingItem.Title>배경 색상</SettingItem.Title>
            <SettingItem.Caption>
              리뷰쓰기 전체 영역의 배경 색상을 설정합니다. 기본 값은 #ffffff 에요.
            </SettingItem.Caption>
          </SettingItem.Container>
          <SettingItem.Content></SettingItem.Content>
        </SettingItem>

        <SettingItem>
          <SettingItem.Container>
            <SettingItem.Title>항목 안쪽 여백</SettingItem.Title>
            <SettingItem.Caption>
              별점, 리뷰작성 등 각 항목의 바깥쪽 여백을 정할 수 있어요. 따로 설정하지 않으면 18px로 자동 설정돼요.
            </SettingItem.Caption>
          </SettingItem.Container>
          <SettingItem.Content></SettingItem.Content>
        </SettingItem>

        <SettingItem>
          <SettingItem.Container>
            <SettingItem.Title>항목 테두리</SettingItem.Title>
            <SettingItem.Caption>
              별점, 리뷰작성 등 각 항목의 테두리 두께를 정할 수 있어요. 작성하지 않을 경우 0으로 설정돼요.
            </SettingItem.Caption>
          </SettingItem.Container>
          <SettingItem.Content></SettingItem.Content>
        </SettingItem>

        <SettingItem>
          <SettingItem.Container>
            <SettingItem.Title>항목 테두리 색상</SettingItem.Title>
            <SettingItem.Caption>테두리의 색상을 설정합니다. 기본 값은 #E7E7E7에요.</SettingItem.Caption>
          </SettingItem.Container>
          <SettingItem.Content></SettingItem.Content>
        </SettingItem>

        <SettingItem>
          <SettingItem.Container>
            <SettingItem.Title>별점 배경 색상</SettingItem.Title>
            <SettingItem.Caption>별점 배경 색상을 설정할 수 있어요. 기본 값은 #E1E1E1에요.</SettingItem.Caption>
          </SettingItem.Container>
          <SettingItem.Content></SettingItem.Content>
        </SettingItem>

        <SettingItem>
          <SettingItem.Container>
            <SettingItem.Title>별점 색상</SettingItem.Title>
            <SettingItem.Caption>별점의 색상을 설할 수 있어요. 기본 값은 #FBB230에요.</SettingItem.Caption>
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

export default withAuthCheck(SettingDetailWritePage);
