import { useMutation } from '@tanstack/react-query';
import { CheckEmailResponse } from '../types/checkEmailResponse';
import { checkRolesService } from '../services/checkRolesService';

export function useCheckEmail() {
  return useMutation<CheckEmailResponse, Error, string>({
    mutationFn: (email :string) => checkRolesService(email),
  });
}