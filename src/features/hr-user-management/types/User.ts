export type UserRole = "COLABORADOR" | "VISITANTE" | "RH" | "GUARITA";

export interface UserListItem {
    id: string;
    name: string;
    email: string;
    role: UserRole;
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
}


export interface CreateColaboradorUserRequest extends BaseCreateUserRequest {
    role: "COLABORADOR";
    badgeNumber: string; 
    department: string; 
}


export interface CreateGuaritaUserRequest extends BaseCreateUserRequest {
    role: "GUARITA";
    badgeNumber: string; 
    department: string; 
    chefe: string;
}

export interface CreateRHUserRequest extends BaseCreateUserRequest {
    role: "RH";
    badgeNumber: string; 
}

export interface CreateVisitorUserRequest extends BaseCreateUserRequest {
    role: "VISITANTE";
    companyName: string;
    cpf: string;
}

export type CreateUserRequestDTO =
    | CreateColaboradorUserRequest
    | CreateGuaritaUserRequest
    | CreateRHUserRequest
    | CreateVisitorUserRequest;

export interface CreateUserResponseDTO {
    id: string;
    email: string;
    role: UserRole;
    createdAt: string;
}