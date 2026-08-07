import { z } from "zod";

export const occurrenceTypes = [
  "WARNING",
  "ILLEGAL_PARKING",
  "TRAFFIC_ACCIDENT",
] as const;

export type OccurrenceType = (typeof occurrenceTypes)[number];

const baseFields = {
  location: z.string().min(1, "Informe o local da ocorrência."),
  gate: z.string().min(1, "Informe a portaria."),
};

const createWarningSchema = z.object({
  plate: z.string().min(1, "Informe a placa do veículo."),
  ...baseFields,
  occurrenceType: z.literal("WARNING"),
  warningType: z.string().min(1, "Selecione o tipo do aviso."),
  description: z.string().optional(),
});

const createIllegalParkingSchema = z.object({
  plate: z.string().min(1, "Informe a placa do veículo."),
  ...baseFields,
  occurrenceType: z.literal("ILLEGAL_PARKING"),
  parkingSpaceType: z.string().min(1, "Selecione o tipo de vaga."),
  description: z.string().optional(),
});

const createTrafficAccidentSchema = z.object({
  plate: z.string().min(1, "Informe a placa do veículo."),
  ...baseFields,
  occurrenceType: z.literal("TRAFFIC_ACCIDENT"),
  occurrenceDate: z.string().min(1, "Informe a data/hora do ocorrido."),
  victimName: z.string().min(1, "Informe o nome da vítima."),
  responsibleBossName: z.string().min(1, "Este campo é obrigatório."),
  responsibleFactory: z.string().min(1, "Este campo é obrigatório."),
  responsibleSection: z.string().min(1, "Este campo é obrigatório."),
  trafficOccurrenceType: z.string().min(1, "Este campo é obrigatório."),
  guardTestimony: z.string().min(1, "Este campo é obrigatório."),
  victimTestimony: z.string().min(1, "Este campo é obrigatório."),
});

export const createOccurrenceSchema = z.discriminatedUnion("occurrenceType", [
  createWarningSchema,
  createIllegalParkingSchema,
  createTrafficAccidentSchema,
]);

export type OccurrenceFormValues = z.infer<typeof createOccurrenceSchema>;

const updateDefaults = {
  plate: z.string(),
  location: z.string().min(1, "Informe o local da ocorrência."),
  gate: z.string().min(1, "Informe a portaria."),
};

export const updateWarningSchema = z.object({
  ...updateDefaults,
  occurrenceType: z.literal("WARNING"),
  warningType: z.string().min(1, "Selecione o tipo do aviso."),
  description: z.string().min(1, "Informe a descrição."),
});

export const updateIllegalParkingSchema = z.object({
  ...updateDefaults,
  occurrenceType: z.literal("ILLEGAL_PARKING"),
  parkingSpaceType: z.string().min(1, "Selecione o tipo de vaga."),
  description: z.string().min(1, "Informe a descrição."),
});

export const updateTrafficAccidentSchema = z.object({
  ...updateDefaults,
  occurrenceType: z.literal("TRAFFIC_ACCIDENT"),
  occurrenceDate: z.string().min(1, "Informe a data/hora do ocorrido."),
  victimName: z.string().min(1, "Informe o nome da vítima."),
  responsibleBossName: z.string().min(1, "Este campo é obrigatório."),
  responsibleFactory: z.string().min(1, "Este campo é obrigatório."),
  responsibleSection: z.string().min(1, "Este campo é obrigatório."),
  trafficOccurrenceType: z.string().min(1, "Este campo é obrigatório."),
  guardTestimony: z.string().min(1, "Este campo é obrigatório."),
  victimTestimony: z.string().min(1, "Este campo é obrigatório."),
});

export const updateOccurrenceSchema = z.discriminatedUnion("occurrenceType", [
  updateWarningSchema,
  updateIllegalParkingSchema,
  updateTrafficAccidentSchema,
]);

export type UpdateOccurrenceFormValues = z.infer<
  typeof updateOccurrenceSchema
>;
export type UpdateWarningFormValues = z.infer<typeof updateWarningSchema>;
export type UpdateIllegalParkingFormValues = z.infer<typeof updateIllegalParkingSchema>;
export type UpdateTrafficAccidentFormValues = z.infer<typeof updateTrafficAccidentSchema>;

