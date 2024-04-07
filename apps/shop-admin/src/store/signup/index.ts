import { create } from 'zustand';

interface SignupStore {
  currentStep: string;
  steps: string[];

  setCurrentStep: (step: string) => void;
  goToNextStep: () => void;
  goToPrevStep: () => void;
}

const useSignupStore = create<SignupStore>((set) => ({
  currentStep: 'step1',
  steps: ['step1', 'step2', 'step3', 'step4', 'step5', 'step6', 'step7'],
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
}));

export default useSignupStore;
