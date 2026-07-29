import { api } from "@/shared/lib/api";
import { CheckEmailRequest } from "../types/checkEmailRequest";
import { CheckEmailResponse } from "../types/checkEmailResponse";

export async function checkRolesService(
    payload: CheckEmailRequest
): Promise<CheckEmailResponse> {
  const { data } = await api.post<CheckEmailResponse>("/auth/verifica-email", payload);
  return data;
}