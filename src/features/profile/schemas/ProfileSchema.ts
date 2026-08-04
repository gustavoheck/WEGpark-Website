import { z } from "zod";

const CORPORATE_EMAIL_DOMAIN = "@weg.net";

const telephoneRegex = /^(?:\+55\s?)?(?:\(?\d{2}\)?\s?)?(?:9\s?)?\d{4}[-\s]?\d{4}$/;
const cpfRegex = /^\d{3}\.?\d{3}\.?\d{3}-?\d{2}$/;

const baseSchema = z.object({
  name: z.string().min(1, "Informe o nome"),
  telephone: z.string().regex(telephoneRegex, "Informe um telefone válido (ex: (11) 99999-9999)"),
  email: z.string().email("Informe um email válido"),
});

const employeeFields = z.object({
  parkUserType: z.literal("COLLABORATOR"),
  department: z.string().min(1, "Informe o setor"),
  badgeNumber: z.string()
    .min(1, "Informe o número do crachá")
    .max(6, "O crachá não pode possuir mais de 6 dígitos"),

  email: z.string()
    .email("Informe um Email válido!")
    .endsWith(CORPORATE_EMAIL_DOMAIN, "O Email deve ser corporativo.")
});

const visitorFields = z.object({
  parkUserType: z.literal("VISITOR"),
  companyName: z.string().min(1, "Informe o nome da empresa"),
  cpf: z.string().regex(cpfRegex, "CPF inválido"),
});

const employeeProfileSchema = baseSchema.merge(employeeFields);
const visitorProfileSchema = baseSchema.merge(visitorFields);

export type EmployeeProfileFormValues = z.infer<typeof employeeProfileSchema>;
export type VisitorProfileFormValues = z.infer<typeof visitorProfileSchema>;

export const profileSchema = z.discriminatedUnion("parkUserType", [
  employeeProfileSchema,
  visitorProfileSchema,
]);

export type ProfileFormValues = z.infer<typeof profileSchema>;