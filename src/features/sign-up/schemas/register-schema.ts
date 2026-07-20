import z from "zod";

const CORPORATE_EMAIL_DOMAIN = "@weg.net";

const cpfRegex = /^\d{3}\.?\d{3}\.?\d{3}-?\d{2}$/;

const baseSchema = z.object({
    email: z.string().email("Insira um e-mail válido"),
    password: z.string().min(8, "A senha deve conter no mínimo 8 caracteres"),
    confirmPassword: z.string().min(8, "Confirme a senha"),
});

const employeeFields = z.object({
    type: z.literal("COLABORADOR"),
    department: z.string().min(1, "Informe o setor"),
    nameTagNumber: z.string().min(1, "Informe o número de crachá"),
});

const visitorFields = z.object({
    type: z.literal("VISITANTE"),
    company: z.string().min(1, "Informe o nome da empresa"),
    cpf: z.string().regex(cpfRegex, "CPF Inválido"),
});

export const registerSchema = z
    .discriminatedUnion("type", [
        baseSchema.merge(employeeFields),
        baseSchema.merge(visitorFields),
    ])

    .refine((data) => data.password === data.confirmPassword, {
        message: "As senhas não são iguais",
        path: ["confirmPassword"],
    })

    .refine(
        (data) =>
            data.type === "COLABORADOR"
        ? data.email.toLowerCase().endsWith(CORPORATE_EMAIL_DOMAIN)
        : true,
        {
            message: "E-mail corporativo deve pertencer ao domínio WEG",
            path: ["email"],
        },
    );

export type RegisterFormValues = z.infer<typeof registerSchema>;

export const verifyEmailSchema = z.object({
    code: z.string().length(6, "O código deve possuir 6 dígitos"),
});

export type VerifyEmailFormValues = z.infer<typeof verifyEmailSchema>;