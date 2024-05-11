import { apiService } from '@/lib/api/api-services';

async function getReviewLayout() {
  try {
    return await apiService.getReviewLayout();
  } catch (error) {
    throw new Error('레이아웃 조회에 실패했습니다', error as ErrorOptions);
  }
}

async function modifyReviewLayout() {
  
}

export const SettingDesignService = {
  getReviewLayout,
  modifyReviewLayout,
};
