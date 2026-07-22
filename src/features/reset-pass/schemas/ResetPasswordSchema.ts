import z from "zod";

export const requestResetSchema = z.object({
    email: z.string().email("Email inválido!"),
});

export type RequestResetFormValues = z.infer<typeof requestResetSchema>;

export const verifyResetCodeSchema = z.object({
    code: z.string().length(6, "O código deve possuir 6 dígitos"),
});

export type VerifyResetCodeSchema = z.infer<typeof verifyResetCodeSchema>

export const newPasswordSchema = z
    .object({
        password: z.string().min(8, "A senha deve conter no mínimo 8 caracteres"),
        confirmPassword: z.string().min(8, "Confirme a senha"),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "As senhas não são iguais",
        path: ["confirmPassword"],
    });

export type NewPasswordFormValues = z.infer<typeof newPasswordSchema>