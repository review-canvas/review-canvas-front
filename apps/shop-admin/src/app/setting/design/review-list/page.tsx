'use client';

import { SolidButton } from '@ui/components';

import SettingItem from '@/components/setting/setting-item';
import SettingLayout from '@/components/setting/setting-layout';
import useAuthCheck from '@/hooks/use-auth-check';

function SettingDetailReadPage() {
  useAuthCheck();

  return (
    <SettingLayout>
      <SettingLayout.Content>
        <SettingItem>
          <SettingItem.Container>
            <SettingItem.Title>리뷰 자세히 보기 방식</SettingItem.Title>
            <SettingItem.Caption>더보기 버튼 또는 리뷰 클릭 시 리뷰 자세히 보기 방식을 설정해요.</SettingItem.Caption>
          </SettingItem.Container>
          <SettingItem.Content></SettingItem.Content>
        </SettingItem>

        <SettingItem>
          <SettingItem.Container>
            <SettingItem.Title>페이지 방식</SettingItem.Title>
            <SettingItem.Caption>리뷰 보기 리스트 페이지를 띄우는 방식을 설정해요.</SettingItem.Caption>
          </SettingItem.Container>
          <SettingItem.Content></SettingItem.Content>
        </SettingItem>

        <SettingItem>
          <SettingItem.Container>
            <SettingItem.Title>리뷰 필터</SettingItem.Title>
            <SettingItem.Caption>최신순, 평점 높은순 등 리뷰 필터의 디자인 방식을 설정해요.</SettingItem.Caption>
          </SettingItem.Container>
          <SettingItem.Content></SettingItem.Content>
        </SettingItem>

        <SettingItem>
          <SettingItem.Container>
            <SettingItem.Title>필터 활성화 텍스트 색상</SettingItem.Title>
            <SettingItem.Caption>
              최신순, 평점 높은순 등 리뷰 필터의 Active,Hover 된 텍스트의 색상을 설정해요. 기본 값은 #000000 에요.
            </SettingItem.Caption>
          </SettingItem.Container>
          <SettingItem.Content></SettingItem.Content>
        </SettingItem>

        <SettingItem>
          <SettingItem.Container>
            <SettingItem.Title>각 리뷰 영역 배경 색상</SettingItem.Title>
            <SettingItem.Caption>각 리뷰의 배경 색상을 설정할 수 있어요. 기본 값은 #ffffff 에요.</SettingItem.Caption>
          </SettingItem.Container>
          <SettingItem.Content></SettingItem.Content>
        </SettingItem>

        <SettingItem>
          <SettingItem.Container>
            <SettingItem.Title>바깥쪽 여백</SettingItem.Title>
            <SettingItem.Caption>각 리뷰의 바깥 여백을 설정합니다. 기본 값은 0px입니다.</SettingItem.Caption>
          </SettingItem.Container>
          <SettingItem.Content></SettingItem.Content>
        </SettingItem>

        <SettingItem>
          <SettingItem.Container>
            <SettingItem.Title>안쪽 여백</SettingItem.Title>
            <SettingItem.Caption>
              각 리뷰의 안쪽 여백을 설정합니다. 기본 값은 20px, 20px, 15px, 15px 이에요.
            </SettingItem.Caption>
          </SettingItem.Container>
          <SettingItem.Content></SettingItem.Content>
        </SettingItem>

        <SettingItem>
          <SettingItem.Container>
            <SettingItem.Title>상세 정보 텍스트 색상</SettingItem.Title>
            <SettingItem.Caption>
              구매한 제품의 옵션, 상세평가, 아이디, 구매일 등 정보의 텍스트 색상을 설정해요. 기본 값은 #8d8d8d에요. 상세
              평가의 주제는 #252525 고정이에요.
            </SettingItem.Caption>
          </SettingItem.Container>
          <SettingItem.Content></SettingItem.Content>
        </SettingItem>

        <SettingItem>
          <SettingItem.Container>
            <SettingItem.Title>리뷰 텍스트</SettingItem.Title>
            <SettingItem.Caption>
              리뷰 본문의 폰트, 사이즈, 두께, 색상를 설정합니다. 작성하지 않을 경우 기본값은 카페24 설정을 따릅니다.
            </SettingItem.Caption>
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

export default SettingDetailReadPage;
