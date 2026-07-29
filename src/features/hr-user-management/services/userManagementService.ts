// features/hr-user-management/services/userManagementService.ts
import { api } from "@/shared/lib/api";
import {
    CreateUserRequestDTO,
    CreateUserResponseDTO,
    PaginatedUsersResponseDTO,
} from "../types/User";
import * as mockService from "./userManagementService.mock";

const USE_MOCKS = process.env.NEXT_PUBLIC_USE_MOCKS === "true";

export async function createUser(payload: CreateUserRequestDTO): Promise<CreateUserResponseDTO> {
    if (USE_MOCKS) return mockService.createUser(payload);

    const { data } = await api.post<CreateUserResponseDTO>("/rh/usuarios", payload);
    return data;
}

export async function listUsers(page: number): Promise<PaginatedUsersResponseDTO> {
    if (USE_MOCKS) return mockService.listUsers(page);

    const { data } = await api.get<PaginatedUsersResponseDTO>("/rh/usuarios", { params: { page } });
    return data;
}

export async function deleteUser(id: string): Promise<void> {
    if (USE_MOCKS) return mockService.deleteUser(id);

    await api.delete(`/rh/usuarios/${id}`);
}