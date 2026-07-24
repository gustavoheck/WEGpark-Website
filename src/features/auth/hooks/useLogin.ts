import { useMutation } from '@tanstack/react-query';
import { loginUser } from '../services/loginService';
import { LoginRequestDTO, LoginResponseDTO } from '../types/Login';

export function useLogin() {
  return useMutation<LoginResponseDTO, Error, LoginRequestDTO>({
    mutationFn: loginUser,
  });
}