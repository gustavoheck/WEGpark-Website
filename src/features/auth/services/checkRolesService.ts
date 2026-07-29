// features/auth/services/checkRolesService.ts
import { api } from "@/shared/lib/api";
import { CheckEmailRequest } from "../types/checkEmailRequest";
import { CheckEmailResponse } from "../types/checkEmailResponse";

export async function checkRolesService(
  payload: CheckEmailRequest
): Promise<CheckEmailResponse> {
  const { data } = await api.get<CheckEmailResponse>("/auth", {
    params: payload,
  });
  return data;
}