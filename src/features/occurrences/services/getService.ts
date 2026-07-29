import { api } from "@/shared/lib/api";
import { Occurrence } from "../types/Occurrence";

export interface getServiceProps {
  category?: string;
  value?: string;
}

export async function getService(
  params: getServiceProps = {}
): Promise<Occurrence[]> {
  const { category, value } = params;

  const { data } = await api.get<Occurrence[]>("/occurrence", {
    params: category && value ? { [category]: value } : {},
  });

  return data;
}
