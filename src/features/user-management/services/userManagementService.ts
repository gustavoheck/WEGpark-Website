// features/hr-user-management/services/userManagementService.ts
import { api } from "@/shared/lib/api";
import {
    CreateUserRequestDTO,
    CreateUserResponseDTO,
    PaginatedUsersResponseDTO,
    UserRole,
} from "../types/User";
import { UserDetailDTO, UpdateUserRequestDTO } from "../types/User";
import * as mockService from "./userManagementService.mock";
import { GetServiceProps } from "@/shared/types/GetServiceProps";

const USE_MOCKS = process.env.NEXT_PUBLIC_USE_MOCKS === "true";
const RH_ACTIVE_OVERRIDES_KEY = "wegpark:rh-active-overrides";

function getRhActiveOverride(id: string): boolean | undefined {
    if (typeof window === "undefined") return undefined;

    const storedOverrides = window.sessionStorage.getItem(RH_ACTIVE_OVERRIDES_KEY);
    if (!storedOverrides) return undefined;

    try {
        return (JSON.parse(storedOverrides) as Record<string, boolean>)[id];
    } catch {
        return undefined;
    }
}

export function setRhActiveOverride(id: string, active: boolean): void {
    if (typeof window === "undefined") return;

    const storedOverrides = window.sessionStorage.getItem(RH_ACTIVE_OVERRIDES_KEY);
    let overrides: Record<string, boolean> = {};

    if (storedOverrides) {
        try {
            overrides = JSON.parse(storedOverrides) as Record<string, boolean>;
        } catch {
            overrides = {};
        }
    }

    window.sessionStorage.setItem(
        RH_ACTIVE_OVERRIDES_KEY,
        JSON.stringify({ ...overrides, [id]: active }),
    );
}

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
    location?: string;
    boss?: string;
};

const backendRoleByUserRole = {
    EMPLOYEE: "ROLE_PARK",
    VISITOR: "ROLE_PARK",
    GUARD: "ROLE_GUARD",
    HR: "ROLE_RH",
} as const;

function mapBackendUserDetail(user: BackendUser): UserDetailDTO {
    if (!user.defaults) {
        return {
            id: user.uuid ?? "",
            name: user.name ?? "",
            email: user.email ?? "",
            phone: user.telephone ?? "",
            active: getRhActiveOverride(user.uuid ?? "") ?? true,
            role: "HR",
            badgeNumber: user.badgeNumber ?? "",
        };
    }

    const common = {
        id: user.defaults.uuid,
        name: user.defaults.name,
        email: user.defaults.email,
        phone: user.defaults.telephone,
        active: user.defaults.active,
    };

    if (user.defaults.userType === "VISITOR") {
        return { ...common, role: "VISITOR", companyName: user.company ?? "", cpf: user.cpf ?? "" };
    }

    if (user.defaults.userType === "GUARD") {
        return {
            ...common,
            role: "GUARD",
            badgeNumber: user.badgeNumber ?? "",
            department: user.location ?? "",
            chefe: user.boss ?? "",
        };
    }

    return {
        ...common,
        role: "EMPLOYEE",
        badgeNumber: user.badgeNumber ?? "",
        department: user.location ?? "",
    };
}
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
        active: getRhActiveOverride(user.uuid ?? "") ?? true,
        role: "HR",
        badgeNumber: user.badgeNumber,
    } as PaginatedUsersResponseDTO["users"][number];
}

export async function createUser(payload: CreateUserRequestDTO): Promise<CreateUserResponseDTO> {
    if (USE_MOCKS) return mockService.createUser(payload);

    const defaults = {
        email: payload.email,
        password: payload.password,
    };
    const parkUserDefaults = {
        name: payload.name,
        telephone: payload.phone,
    };

    let request;

    switch (payload.role) {
        case "EMPLOYEE":
            request = api.post<CreateUserResponseDTO>("/auth/register/collaborator", {
                defaults,
                parkUserDefaults,
                badgeNumber: payload.badgeNumber,
                location: payload.department,
            });
            break;
        case "VISITOR":
            request = api.post<CreateUserResponseDTO>("/auth/register/visitor", {
                defaults,
                parkUserDefaults,
                company: payload.companyName,
                cpf: payload.cpf,
            });
            break;
        case "GUARD":
            request = api.post<CreateUserResponseDTO>("/rh/guard", {
                collaboratorDefaults: {
                    defaults,
                    parkUserDefaults,
                    badgeNumber: payload.badgeNumber,
                    location: payload.department,
                },
                boss: payload.chefe,
            });
            break;
        case "HR":
            request = api.post<CreateUserResponseDTO>("/rh", {
                defaults,
                telephone: payload.phone,
                name: payload.name,
                badgeNumber: payload.badgeNumber,
            });
            break;
    }

    const { data } = await request;
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
        ...(category && value
            ? { [category]: category === "name" ? `%${value}%` : value }
            : {}),
    };
    const { data } = await api.get<BackendPage<BackendUser>>("/rh", { params });
    return {
        users: data.content.map(mapBackendUser),
        currentPage: data.number + 1,
        totalPages: data.totalPages,
        totalItems: data.totalElements,
    };
}

export async function getUserById(id: string, role: UserRole): Promise<UserDetailDTO> {
    if (USE_MOCKS) return mockService.getUserById(id);
    const { data } = await api.get<BackendUser>(`/rh/user/${id}`, {
        params: { role: backendRoleByUserRole[role] },
    });
    return mapBackendUserDetail(data);
}
export async function updateUser(id: string, payload: UpdateUserRequestDTO): Promise<UserDetailDTO> {
    if (USE_MOCKS) return mockService.getUserById(id);

    if (payload.role !== "HR" && payload.role !== "GUARD") {
        throw new Error(
            "A API ainda não oferece edição administrativa para colaboradores e visitantes.",
        );
    }


    if (payload.role === "HR") {
        await api.put("/rh/" + id, {
            telephone: payload.phone,
            name: payload.name,
            badgeNumber: payload.badgeNumber,
        });
        return { ...payload, id };
    }

    if (payload.role === "GUARD") {
        await api.put("/rh/guard/" + id, {
            name: payload.name,
            telephone: payload.phone,
            badgeNumber: payload.badgeNumber,
            location: payload.department,
            boss: payload.chefe,
        });
        return { ...payload, id };
    }

    throw new Error("Tipo de usuário inválido para edição.");
}

export async function deactivateUser(id: string): Promise<void> {
    if (USE_MOCKS) return mockService.deactivateUser(id);
    await api.post(`/rh/user/${id}/desactivate`);
}

export async function activateUser(id: string): Promise<void> {
    if (USE_MOCKS) return mockService.activateUser(id);
    await api.post(`/rh/user/${id}/desactivate`);
}
