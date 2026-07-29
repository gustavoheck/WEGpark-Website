  import { api } from "@/shared/lib/api";
  import { LoginRequest } from "../types/loginRequest";
  import { LoginResponse } from "../types/loginResponse";

  export async function loginUser(
      payload: LoginRequest
  ): Promise<LoginResponse> {
    const { data } = await api.post<LoginResponse>('/auth/login', payload);
    return data;
  }