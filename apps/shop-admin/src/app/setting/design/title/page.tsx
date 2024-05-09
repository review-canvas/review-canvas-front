'use client';

import { SolidButton } from '@ui/components';

import SettingItem from '@/components/setting/setting-item';
import SettingLayout from '@/components/setting/setting-layout';
import useAuthCheck from '@/hooks/use-auth-check';

function SettingDesignTitlePage() {
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
          <SettingItem.Content></SettingItem.Content>
        </SettingItem>

        <SettingItem>
          <SettingItem.Container>
            <SettingItem.Title>정렬</SettingItem.Title>
            <SettingItem.Caption>타이틀의 정렬 위치를 설정합니다.</SettingItem.Caption>
          </SettingItem.Container>
          <SettingItem.Content></SettingItem.Content>
        </SettingItem>

        <SettingItem>
          <SettingItem.Container>
            <SettingItem.Title>Padding(내부 여백)</SettingItem.Title>
            <SettingItem.Caption>
              <p>내부 여백을 설정합니다.</p>
              <p>작성하지 않을 경우 기본값은 0입니다.</p>
            </SettingItem.Caption>
          </SettingItem.Container>
          <SettingItem.Content></SettingItem.Content>
        </SettingItem>

        <SettingItem>
          <SettingItem.Container>
            <SettingItem.Title>폰트</SettingItem.Title>
            <SettingItem.Caption>
              <p>폰트, 사이즈, 두께, 색상을 설정합니다.</p>
              <p>작성하지 않을 경우 기본값은 카페24 설정을 따릅니다.</p>
            </SettingItem.Caption>
          </SettingItem.Container>
          <SettingItem.Content></SettingItem.Content>
        </SettingItem>

        <SettingItem>
          <SettingItem.Container>
            <SettingItem.Title>Border(테두리)</SettingItem.Title>
            <SettingItem.Caption>테두리의 두께를 설정합니다.</SettingItem.Caption>
          </SettingItem.Container>
          <SettingItem.Content></SettingItem.Content>
        </SettingItem>

        <SettingItem>
          <SettingItem.Container>
            <SettingItem.Title>Border Color(테두리 색상)</SettingItem.Title>
            <SettingItem.Caption>테두리의 색상을 설정합니다.</SettingItem.Caption>
          </SettingItem.Container>
          <SettingItem.Content></SettingItem.Content>
        </SettingItem>

        <SettingItem>
          <SettingItem.Container>
            <SettingItem.Title>Background(배경)</SettingItem.Title>
            <SettingItem.Caption>배경색을 설정합니다.</SettingItem.Caption>
          </SettingItem.Container>
          <SettingItem.Content></SettingItem.Content>
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
          <SettingItem.Content></SettingItem.Content>
        </SettingItem>

        <SettingItem>
          <SettingItem.Container>
            <SettingItem.Title>정렬</SettingItem.Title>
            <SettingItem.Caption>설명글의 정렬 위치를 설정합니다.</SettingItem.Caption>
          </SettingItem.Container>
          <SettingItem.Content></SettingItem.Content>
        </SettingItem>

        <SettingItem>
          <SettingItem.Container>
            <SettingItem.Title>Padding(내부 여백)</SettingItem.Title>
            <SettingItem.Caption>
              <p>내부 여백을 설정합니다.</p>
              <p>작성하지 않을 경우 기본값은 0입니다.</p>
            </SettingItem.Caption>
          </SettingItem.Container>
          <SettingItem.Content></SettingItem.Content>
        </SettingItem>

        <SettingItem>
          <SettingItem.Container>
            <SettingItem.Title>폰트</SettingItem.Title>
            <SettingItem.Caption>
              <p>폰트, 사이즈, 두께, 색상을 설정합니다.</p>
              <p>작성하지 않을 경우 기본값은 카페24 설정을 따릅니다.</p>
            </SettingItem.Caption>
          </SettingItem.Container>
          <SettingItem.Content></SettingItem.Content>
        </SettingItem>

        <SettingItem>
          <SettingItem.Container>
            <SettingItem.Title>Border(테두리)</SettingItem.Title>
            <SettingItem.Caption>테두리의 두께를 설정합니다.</SettingItem.Caption>
          </SettingItem.Container>
          <SettingItem.Content></SettingItem.Content>
        </SettingItem>

        <SettingItem>
          <SettingItem.Container>
            <SettingItem.Title>Border Color(테두리 색상)</SettingItem.Title>
            <SettingItem.Caption>테두리의 색상을 설정합니다.</SettingItem.Caption>
          </SettingItem.Container>
          <SettingItem.Content></SettingItem.Content>
        </SettingItem>

        <SettingItem>
          <SettingItem.Container>
            <SettingItem.Title>Background(배경)</SettingItem.Title>
            <SettingItem.Caption>배경색을 설정합니다.</SettingItem.Caption>
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

export default SettingDesignTitlePage;
