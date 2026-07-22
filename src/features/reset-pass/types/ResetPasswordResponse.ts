export interface RequestResetCodeRequestDTO {
    email: string;
}

export interface VerifyResetCodeRequestDTO {
    email: string;
    code: string;
}

export interface VerifyResetCodeResponseDTO {
    resetToken: string;
}

export interface ResetPasswordRequestDTO {
    resetToken: string;
    newPassword: string;
}