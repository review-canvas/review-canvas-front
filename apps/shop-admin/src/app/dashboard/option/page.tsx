'use client';

import { SolidButton } from '@ui/components';

import SettingItem from '@/components/setting/setting-item';
import SettingLayout from '@/components/setting/setting-layout';

function DashboardOptionPage() {
  return (
    <SettingLayout>
      <SettingLayout.Content>
        <SettingItem>
          <SettingItem.Container>
            <SettingItem.Title>요약</SettingItem.Title>
          </SettingItem.Container>
          <SettingItem.Content></SettingItem.Content>
        </SettingItem>

        <SettingItem>
          <SettingItem.Container>
            <SettingItem.Title>리뷰 현황</SettingItem.Title>
          </SettingItem.Container>
          <SettingItem.Content></SettingItem.Content>
        </SettingItem>

        <SettingItem>
          <SettingItem.Container>
            <SettingItem.Title>리뷰 목록</SettingItem.Title>
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

export default DashboardOptionPage;
