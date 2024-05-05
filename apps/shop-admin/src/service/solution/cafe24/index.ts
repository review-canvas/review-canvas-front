import { apiService } from '@/lib/api/api-services';
import type { SolutionCafe24InstallStatus } from '@/types/solution/cafe24';

async function authenticate(mallId: string, code: string): Promise<SolutionCafe24InstallStatus> {
  const response = await apiService.postCafe24AuthentaicationProcess({
    mallId,
    code,
  });

  if (!response.success) {
    throw new Error('Authentication process failed');
  }

  return response.data.shopAdminStatus;
}

export const SolutionCafe24Service = {
  authenticate,
};
