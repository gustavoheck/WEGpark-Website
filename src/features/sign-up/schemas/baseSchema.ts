import z from "zod";

export const baseSchema = z.object({
    name: z.string().min(2, "Informe seu nome completo"),
    telephone : z.string().min(8, "Informe um telefone válido"),
    email: z.string().email("Insira um e-mail válido"),
    password: z.string().min(8, "A senha deve conter no mínimo 8 caracteres"),
    confirmPassword: z.string().min(8, "Confirme a senha"),
});