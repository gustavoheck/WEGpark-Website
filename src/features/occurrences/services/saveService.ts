import { api } from "@/shared/lib/api";
import Vehicle from "../../../shared/types/Vehicle";
import { VehicleFormData } from "@/features/vehicles/schemas/VehicleSchema";

interface SaveServiceParams {
    vehicleData: VehicleFormData;
}

export async function saveService({vehicleData} : SaveServiceParams
): Promise<Vehicle> {
    const { data } = await api.post<Vehicle>("/vehicles", vehicleData);
    return data;
}