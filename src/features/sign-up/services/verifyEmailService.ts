import { api } from "@/shared/lib/api";
import VerifyEmailRequest from "../types/verifyEmailRequest";
import VerifyEmailResponse from "../types/verifyEmailResponse";



export async function verifyEmailCode(payload: VerifyEmailRequest): Promise<VerifyEmailResponse> {
    const { data } = await api.post<VerifyEmailResponse>("/verifica-email", payload);
    return data;
}