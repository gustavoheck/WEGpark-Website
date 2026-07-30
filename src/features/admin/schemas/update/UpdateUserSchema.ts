import { email, z } from "zod";

const CORPORATE_EMAIL_DOMAIN = "@weg.net";
const phoneRegex = /^\(?\d{2}\)?\s?9?\d{4}-?\d{4}$/;
const cpfRegex = /^\d{3}\.?\d{3}\.?\d{3}-?\d{2}$/;

const baseFields = z.object({
    name: z.string().min(1, "Informe o nome"),
    email: z.string().email("Insira um e-mail válido"),
    phone: z.string().regex(phoneRegex, "Telefone inválido"),
});

const employeeSchema = baseFields.merge(
    z.object({
        role: z.literal("EMPLOYEE"),
        badgeNumber: z.string()
            .min(1, "Informe o número de crachá")
            .max(6, "O crachá não pode possuir mais de 6 dígitos"),

        email: z.string()
            .email("Insira um email válido!")
            .endsWith(CORPORATE_EMAIL_DOMAIN, "O Email deve ser corporativo."),
        department: z.string().min(1, "Informe o departamento"),
    }),
);

const guardSchema = baseFields.merge(
    z.object({
        role: z.literal("GUARD"),
        badgeNumber: z.string()
            .min(1, "Informe o número de crachá")
            .max(6, "O crachá não pode possuir mais de 6 dígitos"),
            
        department: z.string().min(1, "Informe o departamento"),
        chefe: z.string(), 
    }),
);

const hrSchema = baseFields.merge(
    z.object({
        role: z.literal("HR"),
        badgeNumber: z.string().min(1, "Informe o número de crachá"),
    }),
);

const visitorSchema = baseFields.merge(
    z.object({
        role: z.literal("VISITOR"),
        companyName: z.string().min(1, "Informe o nome da empresa"),
        cpf: z.string().regex(cpfRegex, "CPF inválido"),
    }),
);

export type UpdateEmployeeFormValues = z.infer<typeof employeeSchema>;
export type UpdateGuardFormValues = z.infer<typeof guardSchema>;
export type UpdateHRFormValues = z.infer<typeof hrSchema>;
export type UpdateVisitorFormValues = z.infer<typeof visitorSchema>;

export const updateUserSchema = z.discriminatedUnion("role", [
    employeeSchema,
    guardSchema,
    hrSchema,
    visitorSchema,
]);

export type UpdateUserFormValues = z.infer<typeof updateUserSchema>;