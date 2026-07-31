import { z } from "zod";

export const occurrenceTypes = [
  "WARNING",
  "ILLEGAL_PARKING",
  "TRAFFIC_ACCIDENT",
] as const;
export type OccurrenceType = (typeof occurrenceTypes)[number];

const optionalText = z.string().optional();

// Os optional texts são campos onde só irão possuir validações a partir das condições definidas no superRefine

export const createOccurrenceSchema = z
  .object({
    plate: z.string().min(1, "Informe a placa do veículo."),
    location: z.string().min(1, "Informe o local da ocorrência."),
    gate: z.string().min(1, "Informe a portaria."),
    occurrenceType: z.enum(occurrenceTypes, {
      message: "Selecione o tipo da ocorrência.",
    }),
    
    warningType: optionalText,
    parkingSpaceType: optionalText,
    description: optionalText,
    occurrenceDate: optionalText,

    victimName: optionalText,

    responsibleBossName: optionalText,
    responsibleFactory: optionalText,
    responsibleSection: optionalText,
    trafficOccurrenceType: optionalText,

    guardTestimony: optionalText,
    victimTestimony: optionalText,
  })

  .superRefine((data, context) => {
    if (data.occurrenceType === "WARNING" && !data.warningType) {
      context.addIssue({
        code: "custom",
        path: ["warningType"],
        message: "Selecione o tipo do aviso.",
      });
    }

    if (data.occurrenceType === "ILLEGAL_PARKING" && !data.parkingSpaceType) {
      context.addIssue({
        code: "custom",
        path: ["parkingSpaceType"],
        message: "Selecione o tipo de vaga.",
      });
    }

    if (data.occurrenceType === "TRAFFIC_ACCIDENT") {
      (["occurrenceDate", "victimName", "trafficOccurrenceType"] as const)
        .forEach((field) => {

        if (!data[field]) {
          context.addIssue({
            code: "custom",
            path: [field],
            message: "Este campo é obrigatório.",
          });
        }

      });
    }
  });

export type CreateOccurrenceFormValues = z.infer<typeof createOccurrenceSchema>;