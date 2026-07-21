import { api } from "@/shared/lib/api";
import Vehicle from "../types/Vehicle";
import { EditFormData } from "../schemas/EditSchema";

interface EditServiceParams {
    id: number;
    vehicleData: EditFormData;
}

export async function editService({id, vehicleData} : EditServiceParams
): Promise<Vehicle> {
    const { data } = await api.put<Vehicle>(`/vehicles/${id}`, vehicleData);
    return data;
}