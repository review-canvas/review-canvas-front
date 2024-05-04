import { apiService } from '@/lib/api/api-services';

async function authenticate(mallId: string, code: string): Promise<void> {
  const response = await apiService.postCafe24AuthentaicationProcess({ mallId, code });
  if (!response.success) {
    throw new Error('Authentication process failed');
  }
}

export const SolutionCafe24Service = {
  authenticate,
};
