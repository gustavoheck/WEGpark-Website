import { api } from "@/shared/lib/api";
import { CheckEmailResponse } from "../types/checkEmailResponse";

export async function checkRolesService(
  email : string
): Promise<CheckEmailResponse> {
  const { data } = await api.post<CheckEmailResponse>("/auth", { email });
  return data;
}