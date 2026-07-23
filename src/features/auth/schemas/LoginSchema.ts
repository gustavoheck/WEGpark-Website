import { z } from "zod";

export const checkEmailSchema = z.object({
    email: z.string().email("Email inválido!"),
});

export type CheckEmailFormValues = z.infer<typeof checkEmailSchema>

export const loginPasswordSchema = z.object({
    password: z.string().min(1, "Informe sua senha"),
});

export type LoginPasswordFormValues = z.infer<typeof loginPasswordSchema>;