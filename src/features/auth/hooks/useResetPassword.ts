import { useMutation } from "@tanstack/react-query";
import {
    requestResetCode,
    verifyResetCode,
    resetPassword
} from "../services/resetPasswordService";
import { VerifyResetCodeResponseDTO } from "../types/ResetPasswordResponse";

export function useRequestResetCode() {
    return useMutation<void, Error, string>({
        mutationFn: (email: string) => requestResetCode({ email }),
    });
}

export function useVerifyResetCode() {
    return useMutation<
        VerifyResetCodeResponseDTO,
        Error,
        { email: string; code: string }
    >({
        mutationFn: verifyResetCode,
    });
}

export function useResetPassword() {
    return useMutation<void, Error, { resetToken: string; newPassword: string }>({
        mutationFn: resetPassword,
    });
}