import z, { email } from "zod";

export const requestResetSchema = z.object({
    email: z.string().email("Email inválido!"),
});

export type RequestResetFormValues = z.infer<typeof requestResetSchema>;

export const verifyResetCodeSchema = z.object({
    code: z.string().length(6, "O código deve possuir 6 dígitos"),
});