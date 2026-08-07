import z from "zod";

const CORPORATE_EMAIL_DOMAIN = "@weg.net";

const phoneRegex = /^\(?\d{2}\)?\s?9?\d{4}-?\d{4}$/;
const cpfRegex = /^\d{3}\.?\d{3}\.?\d{3}-?\d{2}$/;

const baseFields = z.object({
    name: z.string().min(1, "Informe o nome"),
    email: z.string().email("Insira um e-mail válido"),
    phone: z.string().regex(phoneRegex, "Telefone inválido"),
    password: z.string().min(8, "A senha deve conter no mínimo 8 caracteres"),
    confirmPassword: z.string().min(8, "Confirme a senha"),
});

const employeeFields = z.object({
    role: z.literal("EMPLOYEE"),
    badgeNumber: z.string()
        .min(1, "Informe o número de crachá")
        .max(6, "O número do crachá não pode ultrapassar 6 dígitos"),
    department: z.string().min(1, "Informe o departamento"),
});

const guaritaFields = z.object({
    role: z.literal("GUARD"),
    badgeNumber: z.string().min(1, "Informe o número de crachá"),
    department: z.string().min(1, "Informe o departamento"),
    chefe: z.string().min(1, "Informe o chefe responsável"),
});

const rhFields = z.object({
    role: z.literal("HR"),
    badgeNumber: z.string().min(1, "Informe o número de crachá"),
});

const visitorFields = z.object({
    role: z.literal("VISITOR"),
    companyName: z.string().min(1, "Informe o nome da empresa"),
    cpf: z.string().regex(cpfRegex, "CPF inválido"),
});

const employeeSchema = baseFields.merge(employeeFields);
const guardSchema = baseFields.merge(guaritaFields);
const hrSchema = baseFields.merge(rhFields);
const visitorSchema = baseFields.merge(visitorFields);

export type CreateEmployeeFormValues = z.infer<typeof employeeSchema>;
export type CreateGuardFormValues = z.infer<typeof guardSchema>;
export type CreateHRFormValues = z.infer<typeof hrSchema>;
export type CreateVisitorFormValues = z.infer<typeof visitorSchema>;

export const createUserSchema = z
    .discriminatedUnion("role", [
        employeeSchema,
        guardSchema,
        hrSchema,
        visitorSchema,
    ])
    .refine((data) => data.password === data.confirmPassword, {
        message: "As senhas não são iguais",
        path: ["confirmPassword"],
    })
    .refine(
        (data) =>
            data.role === "EMPLOYEE" || data.role === "GUARD"
                ? data.email.toLowerCase().endsWith(CORPORATE_EMAIL_DOMAIN)
                : true,
        {
            message: "E-mail corporativo deve pertencer ao domínio WEG",
            path: ["email"],
        },
    );

export type CreateUserFormValues = z.infer<typeof createUserSchema>;
