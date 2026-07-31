import z from "zod";
import { baseSchema } from "./baseSchema";

const cpfRegex = /^\d{3}\.?\d{3}\.?\d{3}-?\d{2}$/;

const visitorFields = z.object({
    type: z.literal("VISITOR"),
    company: z.string().min(1, "Informe o nome da empresa"),
    cpf: z.string().regex(cpfRegex, "CPF Inválido"),
});

export const visitorSchema = baseSchema.merge(visitorFields);

export type visitorFormValues = z.infer<typeof visitorSchema>;