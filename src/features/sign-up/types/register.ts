export type UserType = "COLABORADOR" | "VISITANTE";

interface BaseRegisterRequest {
    email: string;
    password: string;
    type: UserType;
}

export interface CollaboratorRegisterRequest extends BaseRegisterRequest {
    type: "COLABORADOR";
    department: string;
    nameTagNumber: string;
    
}

export interface VisitorRegisterRequest extends BaseRegisterRequest {
    type: "VISITANTE";
    company: string;
    cpf: string;
}

export type RegisterRequestDTO = CollaboratorRegisterRequest | VisitorRegisterRequest;

// This can change later
export interface RegisterResponseDTO {
    id: number;
    email: string;
    password: string;
    active: boolean;
}

export interface VerifyEmailRequestDTO {
    email: string;
    code: string;
}

export interface VerifyEmailResponseDTO {
    verified: boolean;
    activatedAt: string | null;
}