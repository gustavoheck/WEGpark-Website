// features/hr-user-management/services/userManagementService.ts
import { api } from "@/shared/lib/api";
import {
    CreateUserRequestDTO,
    CreateUserResponseDTO,
    PaginatedUsersResponseDTO,
} from "../types/User";
import { UserDetailDTO, UpdateUserRequestDTO } from "../types/User";
import * as mockService from "./userManagementService.mock";
import { GetServiceProps } from "@/shared/types/GetServiceProps";

const USE_MOCKS = process.env.NEXT_PUBLIC_USE_MOCKS === "true";

interface BackendPage<T> {
    content: T[];
    number: number;
    totalPages: number;
    totalElements: number;
}

type BackendUser = {
    uuid?: string;
    email?: string;
    telephone?: string;
    name?: string;
    badgeNumber?: string;
    defaults?: {
        uuid: string;
        email: string;
        telephone: string;
        name: string;
        active: boolean;
        userType: "COLLABORATOR" | "VISITOR" | "GUARD";
    };
    company?: string;
    cpf?: string;
};

function mapBackendUser(user: BackendUser) {
    if (user.defaults) {
        return {
            id: user.defaults.uuid,
            name: user.defaults.name,
            email: user.defaults.email,
            active: user.defaults.active,
            role: user.defaults.userType === "COLLABORATOR" ? "EMPLOYEE" : user.defaults.userType,
            badgeNumber: user.badgeNumber,
        } as PaginatedUsersResponseDTO["users"][number];
    }

    return {
        id: user.uuid ?? "",
        name: user.name ?? "",
        email: user.email ?? "",
        active: true,
        role: "HR",
        badgeNumber: user.badgeNumber,
    } as PaginatedUsersResponseDTO["users"][number];
}

export async function createUser(payload: CreateUserRequestDTO): Promise<CreateUserResponseDTO> {
    if (USE_MOCKS) return mockService.createUser(payload);

    const { data } = await api.post<CreateUserResponseDTO>("/rh/usuarios", payload);
    return data;
}

export async function listUsers(
    page: number,
    filters: GetServiceProps = {},
): Promise<PaginatedUsersResponseDTO> {
    if (USE_MOCKS) return mockService.listUsers(page, filters);

    const { category, value } = filters;
    const params = {
        page: Math.max(0, page - 1),
        size: 10,
        ...(category && value ? { [category]: value } : {}),
    };
    const { data } = await api.get<BackendPage<BackendUser>>("/rh", { params });
    return {
        users: data.content.map(mapBackendUser),
        currentPage: data.number + 1,
        totalPages: data.totalPages,
        totalItems: data.totalElements,
    };
}

export async function getUserById(id: string): Promise<UserDetailDTO> {
    if (USE_MOCKS) return mockService.getUserById(id);
    const { data } = await api.get<UserDetailDTO>(`/rh/usuarios/${id}`);
    return data;
}

export async function updateUser(id: string, payload: UpdateUserRequestDTO): Promise<UserDetailDTO> {
    if (USE_MOCKS) return mockService.getUserById(id);
    const { data } = await api.put<UserDetailDTO>(`/rh/usuarios/${id}`, payload);
    return data;
}

export async function deactivateUser(id: string): Promise<void> {
    if (USE_MOCKS) return mockService.deactivateUser(id);
    await api.post(`/rh/user/${id}/desactivate`);
}

export async function activateUser(id: string): Promise<void> {
    if (USE_MOCKS) return mockService.activateUser(id);
    await api.post(`/rh/user/${id}/desactivate`);
}
