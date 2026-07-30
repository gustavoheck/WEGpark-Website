export type UserRole = "EMPLOYEE" | "VISITOR" | "HR" | "GUARD";

export interface UserListItem {
    id: string;
    name: string;
    email: string;
    role: UserRole;
    active: boolean;
}

export interface PaginatedUsersResponseDTO {
    users: UserListItem[];
    currentPage: number;
    totalPages: number;
    totalItems: number;
}

interface BaseCreateUserRequest {
    name: string;
    email: string;
    phone: string;
    password: string;
    active: boolean;
}


export interface CreateEmployeeUserRequest extends BaseCreateUserRequest {
    role: "EMPLOYEE";
    badgeNumber: string; 
    department: string; 
}


export interface CreateGuardUserRequest extends BaseCreateUserRequest {
    role: "GUARD";
    badgeNumber: string; 
    department: string; 
    chefe: string;
}

export interface CreateHRUserRequest extends BaseCreateUserRequest {
    role: "HR";
    badgeNumber: string; 
}

export interface CreateVisitorUserRequest extends BaseCreateUserRequest {
    role: "VISITOR";
    companyName: string;
    cpf: string;
}

export type CreateUserRequestDTO =
    | CreateEmployeeUserRequest
    | CreateGuardUserRequest
    | CreateHRUserRequest
    | CreateVisitorUserRequest;

export interface CreateUserResponseDTO {
    id: string;
    email: string;
    role: UserRole;
    createdAt: string;
}

export type UserDetailDTO =
    | (Omit<CreateEmployeeUserRequest, "password"> & { id: string })
    | (Omit<CreateGuardUserRequest, "password"> & { id: string })
    | (Omit<CreateHRUserRequest, "password"> & { id: string })
    | (Omit<CreateVisitorUserRequest, "password"> & { id: string });

export type UpdateUserRequestDTO =
    | Omit<CreateEmployeeUserRequest, "password">
    | Omit<CreateGuardUserRequest, "password">
    | Omit<CreateHRUserRequest, "password">
    | Omit<CreateVisitorUserRequest, "password">;