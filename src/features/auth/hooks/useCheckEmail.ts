import { useMutation } from '@tanstack/react-query';
import { CheckEmailResponse } from '../types/checkEmailResponse';
import { CheckEmailRequest } from '../types/checkEmailRequest';
import { checkRolesService } from '../services/checkRolesService';

export function useCheckEmail() {
  return useMutation<CheckEmailResponse, Error, CheckEmailRequest>({
    mutationFn: checkRolesService,
  });
}