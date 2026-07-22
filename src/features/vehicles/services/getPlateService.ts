import { api } from "@/shared/lib/api";
import Vehicle from "../types/Vehicle";

interface GetPlateServiceParams {
    plate: string
}

export async function getPlateService({plate} : GetPlateServiceParams
): Promise<Vehicle> {
    const { data } = await api.get<Vehicle>(`/vehicles/plate/${plate}`);
    return data;
}