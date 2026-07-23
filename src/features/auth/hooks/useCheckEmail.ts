import { useMutation } from '@tanstack/react-query';
import { checkEmailAccounts } from '../services/loginService';
import { CheckEmailRequestDTO, CheckEmailResponseDTO } from '../types/Login';

export function useCheckEmail() {
  return useMutation<CheckEmailResponseDTO, Error, CheckEmailRequestDTO>({
    mutationFn: checkEmailAccounts,
  });
}