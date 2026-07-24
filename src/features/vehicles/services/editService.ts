import { api } from "@/shared/lib/api";
import Vehicle from "../../../shared/types/Vehicle";
import { VehicleFormData } from "../schemas/VehicleSchema";

interface EditServiceParams {
    uuid: string;
    vehicleData: VehicleFormData;
}

export async function editService({uuid, vehicleData} : EditServiceParams
): Promise<Vehicle> {
    const { data } = await api.put<Vehicle>(`/vehicles/${uuid}`, vehicleData);
    return data;
}