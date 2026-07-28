import { useMutation } from "@tanstack/react-query";
import { resendVerificationCode } from "../services/resendVerificationService";
import VerifyEmailResponse from "../types/verifyEmailResponse";
import VerifyEmailRequest from "../types/verifyEmailRequest";
import { verifyEmailCode } from "../services/verifyEmailService";

export function useVerifyEmail() {
    return useMutation<VerifyEmailResponse, Error, VerifyEmailRequest>({
        mutationFn: verifyEmailCode,
    });
}

export function useResendVerificationCode() {
    return useMutation<void, Error, string>({
        mutationFn: resendVerificationCode,
    });
}