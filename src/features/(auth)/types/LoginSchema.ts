import { z } from "zod";

export const loginSchema = z.object({
    email: z.string().email("Email inválido!"),
    password: z.string().min(1, "A senha deve conter no mínimo 8 caracteres"),
});

export type LoginFormData = z.infer<typeof loginSchema>