export type UserRole = 'COLABORADOR' | 'VISITANTE' | 'RH' | 'GUARITA';

export interface CheckEmailRequestDTO {
  email: string;
}

export interface CheckEmailResponseDTO {
  roles: UserRole[];
}

export interface LoginRequestDTO {
  email: string;
  password: string;
  role: UserRole;
}

export interface LoginResponseDTO {
    token: string;
    role: UserRole;
}