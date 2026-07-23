import { api } from "@/shared/lib/api";
import Vehicle from "../../../shared/types/Vehicle";
import { VehicleFormData } from "../schemas/VehicleSchema";

interface EditServiceParams {
    id: number;
    vehicleData: VehicleFormData;
}

export async function editService({id, vehicleData} : EditServiceParams
): Promise<Vehicle> {
    const { data } = await api.put<Vehicle>(`/vehicles/${id}`, vehicleData);
    return data;
}