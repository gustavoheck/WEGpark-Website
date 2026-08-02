import { z } from "zod";


export const updateWarningSchema = z.object({
    location: z.string().min(1, "Informe o local da ocorrência."),
    gate: z.string().min(1, "Informe a portaria."),
    warningType: z.string().min(1, "Selecione o tipo do aviso."),
    description: z.string().min(1, "Informe a descrição."),
});

export const updateIllegalParkingSchema = z.object({
    location: z.string().min(1, "Informe o local da ocorrência."),
    gate: z.string().min(1, "Informe a portaria."),
    parkingSpaceType: z.string().min(1, "Selecione o tipo de vaga."),
    description: z.string().min(1, "Informe a descrição."),
});

export const updateTrafficAccidentSchema = z.object({
    location: z.string().min(1, "Informe o local da ocorrência."),
    gate: z.string().min(1, "Informe a portaria."),
    occurrenceDate: z.string().min(1, "Informe a data/hora do ocorrido."),
    victimName: z.string().min(1, "Informe o nome da vítima."),
    responsibleBossName: z.string().min(1, "Este campo é obrigatório."),
    responsibleFactory: z.string().min(1, "Este campo é obrigatório."),
    responsibleSection: z.string().min(1, "Este campo é obrigatório."),
    trafficOccurrenceType: z.string().min(1, "Este campo é obrigatório."),
    guardTestimony: z.string().min(1, "Este campo é obrigatório."),
    victimTestimony: z.string().min(1, "Este campo é obrigatório."),
});

export type UpdateWarningFormValues = z.infer<typeof updateWarningSchema>;
export type UpdateIllegalParkingFormValues = z.infer<typeof updateIllegalParkingSchema>;
export type UpdateTrafficAccidentFormValues = z.infer<typeof updateTrafficAccidentSchema>;