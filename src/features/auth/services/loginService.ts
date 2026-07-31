  import { api } from "@/shared/lib/api";
import { LoginRequest, LoginResponse } from "../types/login";

  export async function loginUser(
      payload: LoginRequest
  ): Promise<LoginResponse> {
    const { data } = await api.post<LoginResponse>('/auth/login', payload);
    return data;
  }