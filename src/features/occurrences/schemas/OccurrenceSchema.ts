import { z } from "zod";

export const occurrenceTypes = [
  "WARNING",
  "ILLEGAL_PARKING",
  "TRAFFIC_ACCIDENT",
] as const;

export type OccurrenceType = (typeof occurrenceTypes)[number];

const baseFields = {
  location: z.string().min(1, "Informe o local da ocorrÃªncia."),
  gate: z.string().min(1, "Informe a portaria."),
};

const createWarningSchema = z.object({
  plate: z.string().min(1, "Informe a placa do veÃ­culo."),
  ...baseFields,
  occurrenceType: z.literal("WARNING"),
  warningType: z.string().min(1, "Selecione o tipo do aviso."),
  description: z.string().optional(),
});

const createIllegalParkingSchema = z.object({
  plate: z.string().min(1, "Informe a placa do veÃ­culo."),
  ...baseFields,
  occurrenceType: z.literal("ILLEGAL_PARKING"),
  parkingSpaceType: z.string().min(1, "Selecione o tipo de vaga."),
  description: z.string().optional(),
});

const createTrafficAccidentSchema = z.object({
  plate: z.string().min(1, "Informe a placa do veÃ­culo."),
  ...baseFields,
  occurrenceType: z.literal("TRAFFIC_ACCIDENT"),
  occurrenceDate: z.string().min(1, "Informe a data/hora do ocorrido."),
  victimName: z.string().min(1, "Informe o nome da vÃ­tima."),
  responsibleBossName: z.string().min(1, "Este campo Ã© obrigatÃ³rio."),
  responsibleFactory: z.string().min(1, "Este campo Ã© obrigatÃ³rio."),
  responsibleSection: z.string().min(1, "Este campo Ã© obrigatÃ³rio."),
  trafficOccurrenceType: z.string().min(1, "Este campo Ã© obrigatÃ³rio."),
  guardTestimony: z.string().min(1, "Este campo Ã© obrigatÃ³rio."),
  victimTestimony: z.string().min(1, "Este campo Ã© obrigatÃ³rio."),
});

export const createOccurrenceSchema = z.discriminatedUnion("occurrenceType", [
  createWarningSchema,
  createIllegalParkingSchema,
  createTrafficAccidentSchema,
]);

export type OccurrenceFormValues = z.infer<typeof createOccurrenceSchema>;

export const updateWarningSchema = createWarningSchema
  .extend({
    description: z.string().min(1, "Informe a descriÃ§Ã£o."),
  });

export const updateIllegalParkingSchema = createIllegalParkingSchema
  .extend({
    description: z.string().min(1, "Informe a descriÃ§Ã£o."),
  });

export const updateTrafficAccidentSchema = createTrafficAccidentSchema;

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

