import { useMutation } from '@tanstack/react-query';
import { loginUser } from '../services/loginService';
import { LoginRequest, LoginResponse } from '../types/login';

export function useLogin() {
  return useMutation<LoginResponse, Error, LoginRequest>({
    mutationFn: loginUser,
  });
}