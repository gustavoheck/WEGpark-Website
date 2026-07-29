import { useMutation } from '@tanstack/react-query';
import { loginUser } from '../services/loginService';
import { LoginResponse } from '../types/loginResponse';
import { LoginRequest } from '../types/loginRequest';

export function useLogin() {
  return useMutation<LoginResponse, Error, LoginRequest>({
    mutationFn: loginUser,
  });
}