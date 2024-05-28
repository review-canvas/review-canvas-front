import type {
  ReviewColumnProperty,
  ReviewContainerProperty,
  ReviewDesignViewProperty,
  ReviewDesignWriteProperty,
  ReviewLayoutProperty,
  ReviewTitleProperty,
} from '@review-canvas/theme';

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

async function resetReviewLayout() {
  try {
    const { success } = await apiService.patchReviewLayoutInitialize();
    if (!success) {
      throw new Error('call success but something wrong');
    }
  } catch (error) {
    throw new Error('레이아웃 초기화에 실패했습니다', error as ErrorOptions);
  }
}

async function getReviewContainer() {
  try {
    return await apiService.getReviewContainer();
  } catch (error) {
    throw new Error('컨테이너 조회에 실패했습니다', error as ErrorOptions);
  }
}

async function modifyReviewContainer(properties: ReviewContainerProperty) {
  try {
    const { success } = await apiService.patchReviewContainer(properties);
    if (!success) {
      throw new Error('call success bu† something wrong');
    }
  } catch (error) {
    throw new Error('컨테이너 수정에 실패했습니다', error as ErrorOptions);
  }
}

async function resetReviewContainer() {
  try {
    const { success } = await apiService.patchReviewContainerInitialize();
    if (!success) {
      throw new Error('call success but something wrong');
    }
  } catch (error) {
    throw new Error('컨테이너 초기화에 실패했습니다', error as ErrorOptions);
  }
}

async function getReviewColumn() {
  try {
    return await apiService.getReviewColumn();
  } catch (error) {
    throw new Error('Column 조회에 실패했습니다', error as ErrorOptions);
  }
}

async function modifyReviewColumn(properties: ReviewColumnProperty) {
  try {
    const { success } = await apiService.patchReviewColumn(properties);
    if (!success) {
      throw new Error('call success bu† something wrong');
    }
  } catch (error) {
    throw new Error('Column 수정에 실패했습니다', error as ErrorOptions);
  }
}

async function resetReviewColumn() {
  try {
    const { success } = await apiService.patchReviewColumnInitialize();
    if (!success) {
      throw new Error('call success but something wrong');
    }
  } catch (error) {
    throw new Error('Column 초기화에 실패했습니다', error as ErrorOptions);
  }
}

async function getReviewTitle() {
  try {
    return await apiService.getReviewTitle();
  } catch (error) {
    throw new Error('Title 조회에 실패했습니다', error as ErrorOptions);
  }
}

async function modifyReviewTitle(properties: ReviewTitleProperty) {
  try {
    const { success } = await apiService.patchReviewTitle(properties);
    if (!success) {
      throw new Error('call success bu† something wrong');
    }
  } catch (error) {
    throw new Error('Title 수정에 실패했습니다', error as ErrorOptions);
  }
}

async function resetReviewTitle() {
  try {
    const { success } = await apiService.patchReviewTitleInitialize();
    if (!success) {
      throw new Error('call success but something wrong');
    }
  } catch (error) {
    throw new Error('Title 초기화에 실패했습니다', error as ErrorOptions);
  }
}

async function getReviewDesignView() {
  try {
    return await apiService.getReviewDesignView();
  } catch (error) {
    throw new Error('Design View 조회에 실패했습니다', error as ErrorOptions);
  }
}

async function modifyReviewDesignView(properties: ReviewDesignViewProperty) {
  try {
    const { success } = await apiService.patchReviewDesignView(properties);
    if (!success) {
      throw new Error('call success bu† something wrong');
    }
  } catch (error) {
    throw new Error('Design View 수정에 실패했습니다', error as ErrorOptions);
  }
}

async function resetReviewDesignView() {
  try {
    const { success } = await apiService.patchReviewDesignViewInitialize();
    if (!success) {
      throw new Error('call success but something wrong');
    }
  } catch (error) {
    throw new Error('Design View 초기화에 실패했습니다', error as ErrorOptions);
  }
}

async function getReviewDesignWrite() {
  try {
    return await apiService.getReviewDesignWrite();
  } catch (error) {
    throw new Error('Design Write 조회에 실패했습니다', error as ErrorOptions);
  }
}

async function modifyReviewDesignWrite(properties: ReviewDesignWriteProperty) {
  try {
    const { success } = await apiService.patchReviewDesignWrite(properties);
    if (!success) {
      throw new Error('call success bu† something wrong');
    }
  } catch (error) {
    throw new Error('Design Write 수정에 실패했습니다', error as ErrorOptions);
  }
}

async function resetReviewDesignWrite() {
  try {
    const { success } = await apiService.patchReviewDesignWriteInitialize();
    if (!success) {
      throw new Error('call success but something wrong');
    }
  } catch (error) {
    throw new Error('Design Write 초기화에 실패했습니다', error as ErrorOptions);
  }
}

async function getFontInfo() {
  try {
    return await apiService.getFontInfo();
  } catch (error) {
    throw new Error('Font Info 조회에 실패했습니다', error as ErrorOptions);
  }
}

export const SettingDesignService = {
  getReviewLayout,
  modifyReviewLayout,
  resetReviewLayout,
  getReviewContainer,
  modifyReviewContainer,
  resetReviewContainer,
  getReviewColumn,
  modifyReviewColumn,
  resetReviewColumn,
  getReviewTitle,
  modifyReviewTitle,
  resetReviewTitle,
  getReviewDesignView,
  modifyReviewDesignView,
  resetReviewDesignView,
  getReviewDesignWrite,
  modifyReviewDesignWrite,
  resetReviewDesignWrite,
  getFontInfo,
};
