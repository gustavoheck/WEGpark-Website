import { useMutation } from "@tanstack/react-query";
import {
    requestResetCode,
    verifyResetCode,
    resetPassword
} from "../services/resetPasswordService";
import { VerifyResetCodeResponseDTO } from "../types/ResetPasswordResponse";

