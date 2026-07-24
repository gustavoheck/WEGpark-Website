import { api } from "@/shared/lib/api";
import Vehicle from "../../../shared/types/Vehicle";

interface DeleteServiceParams {
    uuid: string;
}

export async function deleteService({uuid} : DeleteServiceParams
): Promise<Vehicle> {
    const { data } = await api.delete<Vehicle>(`/vehicles/${uuid}`);
    return data;
}