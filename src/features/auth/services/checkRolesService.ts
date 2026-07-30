import { api } from "@/shared/lib/api";
import { CheckEmailResponse } from "../types/checkEmailResponse";

export async function checkRolesService(
    email : string
): Promise<CheckEmailResponse> {
  const { data } = await api.get<CheckEmailResponse>("/auth", {
    params: {email}
  });
  return data;
}