import { useMutation } from "@tanstack/react-query";
import { registerUser, registerUserProps } from "../services/registerService";
import { RegisterResponse } from "../types/register";

export function useRegister() {
  return useMutation<RegisterResponse, Error, registerUserProps>({
    mutationFn: registerUser
  });
}