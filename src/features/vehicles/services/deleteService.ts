import { api } from "@/shared/lib/api";
import Vehicle from "../types/Vehicle";

interface EditServiceParams {
    id: number;
}

export async function deleteService({id} : EditServiceParams
): Promise<Vehicle> {
    const { data } = await api.delete<Vehicle>(`/vehicles/${id}`);
    return data;
}