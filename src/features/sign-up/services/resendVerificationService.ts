import { api } from "@/shared/lib/api";

export async function resendVerificationCode({ email } : {email: string}): Promise<void> {
    await api.post("/verifica-email/reenviar", { email });
}