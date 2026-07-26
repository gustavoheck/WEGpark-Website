import { z } from "zod";

const baseSchema = z.object({
  name: z.string().min(1, "Informe o nome"),
});

const employeeFields = z.object({
  role: z.literal("COLABORADOR"), 
  department: z.string().min(1, "Informe o setor"),
  badgeNumber: z.string()
    .min(1, "Informe o número do crachá")
    .max(6, "O crachá não pode possuir mais de 6 dígitos")
});

const visitorFields = z.object({
  role: z.literal("VISITANTE"),
  companyName: z.string().min(1, "Informe o nome da empresa"),
});

const employeeProfileSchema = baseSchema.merge(employeeFields);
const visitorProfileSchema = baseSchema.merge(visitorFields);

export type EmployeeProfileFormValues = z.infer<typeof employeeProfileSchema>;
export type VisitorProfileFormValues = z.infer<typeof visitorProfileSchema>;

export const profileSchema = z.discriminatedUnion("role", [
  employeeProfileSchema,
  visitorProfileSchema,
]);

export type ProfileFormValues = z.infer<typeof profileSchema>;