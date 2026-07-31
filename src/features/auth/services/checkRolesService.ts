import { api } from "@/shared/lib/api";
import { CheckEmailResponse } from "../types/checkEmailResponse";

export async function checkRolesService(
  email : string
): Promise<CheckEmailResponse> {
  
    console.log(email)
  const { data } = await api.post<CheckEmailResponse>("/auth", { email });
  console.log(data)
  return data;
}