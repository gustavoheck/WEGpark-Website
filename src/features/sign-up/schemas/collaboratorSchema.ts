import z from "zod";
import { baseSchema } from "./baseSchema";

const collaboratorFields = z.object({
    type: z.literal("COLLABORATOR"),
    badgeNumber: z.string().min(1, "Informe o número do crachá"),
    location: z.string().min(1, "Informe o setor"),
});

export const collaboratorSchema = baseSchema.merge(collaboratorFields)

export type collaboratorFormValues = z.infer<typeof collaboratorSchema>;