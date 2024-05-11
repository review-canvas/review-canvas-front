import type { ReviewLayoutProperty } from '@review-canvas/theme';

import { apiService } from '@/lib/api/api-services';

async function getReviewLayout() {
  try {
    return await apiService.getReviewLayout();
  } catch (error) {
    throw new Error('레이아웃 조회에 실패했습니다', error as ErrorOptions);
  }
}

async function modifyReviewLayout(properties: ReviewLayoutProperty) {
  try {
    const { success } = await apiService.patchReviewLayout(properties);
    if (!success) {
      throw new Error('call success bu† something wrong');
    }
  } catch (error) {
    throw new Error('레이아웃 수정에 실패했습니다', error as ErrorOptions);
  }
}

export const SettingDesignService = {
  getReviewLayout,
  modifyReviewLayout,
};
