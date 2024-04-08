import type { SignupStore } from '@/types/signup';

import { create } from 'zustand';

const useSignupStore = create<SignupStore>((set) => ({
  currentStep: 'step1',
  steps: ['step1', 'step2', 'step3', 'step4', 'step5', 'step6', 'step7'],
  formData: {
    setting: {
      title: false,
      author: false,
      point: false,
      media: false,
      content: false,
      createdAt: false,
      updatedAt: false,
      themeId: 0,
    },
    info: {
      email: '',
      password: '',
      name: '',
      logoImageUrl: '',
      mallNumber: '',
      phoneNumber: '',
    },
  },
  setCurrentStep: (step) => {
    set({ currentStep: step });
  },
  goToNextStep: () => {
    set((state) => {
      const nextStepIndex = state.steps.indexOf(state.currentStep) + 1;

      if (nextStepIndex < state.steps.length) {
        return { currentStep: state.steps[nextStepIndex] };
      }
      return {};
    });
  },
  goToPrevStep: () => {
    set((state) => {
      const prevStepIndex = state.steps.indexOf(state.currentStep) - 1;

      if (prevStepIndex >= 0) {
        return { currentStep: state.steps[prevStepIndex] };
      }
      return {};
    });
  },
  updateFormData: (newData) => {
    set((state) => ({
      formData: {
        ...state.formData,
        ...newData,
      },
    }));
  },
  updateSettingThemeId: (newThemeId) => {
    set((state) => ({
      formData: {
        ...state.formData,
        setting: {
          ...state.formData.setting,
          themeId: newThemeId,
        },
      },
    }));
  },
  updateReviewActiveSetting: (settings) => {
    set((state) => ({
      formData: {
        ...state.formData,
        setting: {
          ...state.formData.setting,
          ...settings,
        },
      },
    }));
  },
}));

export default useSignupStore;
