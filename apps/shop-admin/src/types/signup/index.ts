export interface SignupFormData {
  email: string;
  password: string;
  phoneNumber: string;
  mallName: string;
  mallId: number;
  consentedTermsIds: number[];
}

export interface SignupStore {
  currentStep: string;
  steps: string[];
  formData: SignupFormData;

  setCurrentStep: (step: string) => void;
  goToNextStep: () => void;
  goToPrevStep: () => void;
  updateFormData: (newData: Partial<SignupFormData>) => void;
}

export type EmailCheckStatus = 'checked' | 'duplicate' | 'unchecked';
