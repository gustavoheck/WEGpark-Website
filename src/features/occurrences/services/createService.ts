import { api } from "@/shared/lib/api";
import { CreateOccurrenceFormValues } from "../schemas/CreateOccurrenceSchema";

export async function createOccurrence(
  data: CreateOccurrenceFormValues,
  vehicleId: string
) {
  if (process.env.NEXT_PUBLIC_USE_MOCKS === "true") {
    return {
      uuid: crypto.randomUUID(),
      ...data,
      vehicleId,
    };
  }

  const { plate: _ignoredPlate, ...occurrence } = data;
  void _ignoredPlate;
  const { data: response } = await api.post("/occurrence", {
    ...occurrence,
    vehicleId,
  });
  return response;
}
