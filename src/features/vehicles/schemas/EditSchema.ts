import { z } from "zod";

export const editSchema = z.object({
  plate: z.string().length(7, "A placa deve conter 7 caracteres"),
  brand: z.string().nonempty("O veículo precisa possuir uma marca"),
  model: z.string().nonempty("O veículo precisa ter um modelo"),
  color: z
    .string()
    .nonempty("O veículo precisa possuir uma cor")
    .regex(/^[^0-9]*$/, "Não pode possuir números"),
});

export type EditFormData = z.infer<typeof editSchema>;
