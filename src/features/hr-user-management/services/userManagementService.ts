import { api } from "@/shared/lib/api";
import {
    CreateUserRequestDTO,
    CreateUserResponseDTO,
    PaginatedUsersResponseDTO,
} from "../types/User";

export async function createUser(
    payload: CreateUserRequestDTO
): Promise<CreateUserResponseDTO> {
    const { data } = await api.post<CreateUserResponseDTO>("/rh/usuarios", payload);
    return data;
}

export async function listUsers(page: number): Promise<PaginatedUsersResponseDTO> {
    const { data } = await api.get<PaginatedUsersResponseDTO>("/rh/usuarios", {
        params: { page },
    });
    return data;
}

export async function deleteUser(id: string): Promise<void> {
    await api.delete(`/rh/usuarios/${id}`);
}