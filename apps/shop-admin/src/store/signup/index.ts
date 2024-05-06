import { create } from 'zustand';

import type { SignupStore } from '@/types/signup';

const useSignupStore = create<SignupStore>((set) => ({
  currentStep: 'step1',
  steps: ['step1', 'step2', 'step3'],
  formData: {
    email: '',
    password: '',
    phoneNumber: '',
    mallName: '',
    mallId: '',
    consentedTermsIds: [],
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
}));

export default useSignupStore;
