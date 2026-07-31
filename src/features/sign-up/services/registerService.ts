import { api } from "@/shared/lib/api";
import { USER_TYPE_MAP, UserType } from "../enums/UserType";
import { RegisterRequest, RegisterResponse } from "../types/register";

export interface registerUserProps {
    payload : RegisterRequest
    userType : UserType
}

export async function registerUser(
    {payload, userType} : registerUserProps): Promise<RegisterResponse> {
    const { data } = await api.post<RegisterResponse>(`/auth/register/${USER_TYPE_MAP[userType].toLowerCase()}`, payload);
    return data;
}