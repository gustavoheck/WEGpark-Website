import { useMutation } from "@tanstack/react-query";
import { registerUser } from "../services/register-service";
import { RegisterRequestDTO, RegisterResponseDTO } from "../types/register";

export function useRegister() {
    return useMutation<RegisterResponseDTO, Error, RegisterRequestDTO>({
        mutationFn: registerUser
    });
}