import { api } from "@/shared/lib/api";
import Vehicle from "@/shared/types/Vehicle";

export interface getServiceProps {
  category?: string;
  value?: string;
}

export async function getService(
  params: getServiceProps = {}
): Promise<Vehicle[]> {
  const { category, value } = params;

  const { data } = await api.get<Vehicle[]>("/vehicle", {
    params: category && value ? { [category]: value } : {},
  });
  return data;
}