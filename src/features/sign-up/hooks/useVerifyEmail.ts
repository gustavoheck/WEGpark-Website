import { useMutation } from "@tanstack/react-query";
import { verifyEmailCode, resendVerificationCode } from "../services/register-service";
import { VerifyEmailRequestDTO, VerifyEmailResponseDTO } from "../types/register";

export function useVerifyEmail() {
    return useMutation<VerifyEmailResponseDTO, Error, VerifyEmailRequestDTO>({
        mutationFn: verifyEmailCode,
    });
}

export function useResendVerificationCode() {
    return useMutation<void, Error, string>({
        mutationFn: resendVerificationCode,
    });
}