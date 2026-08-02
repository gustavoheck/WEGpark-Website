import { z } from "zod";

const CORPORATE_EMAIL_DOMAIN = "@weg.net";

const baseSchema = z.object({
  name: z.string().min(1, "Informe o nome"),
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
