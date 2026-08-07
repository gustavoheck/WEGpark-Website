import { api } from "@/shared/lib/api";

import { mapNotificationToRequest } from "../mappers/requestMapper";
import { NotificationPageResponse, Request } from "../types/Request";

export async function listAssociationRequests(): Promise<Request[]> {
  const { data } = await api.get<NotificationPageResponse>("/notification", {
    params: { size: 100 },
  });

  return data.content
    .filter(
      (notification) =>
        notification.notificationType === "VEHICLE_ASSOCIATION",
    )
    .map(mapNotificationToRequest);
}

export async function acceptAssociationRequest(
  requestUuid: string,
): Promise<void> {
  await api.post(`/vehicle/associate/${requestUuid}`);
  await api.delete(`/notification/${requestUuid}`);
}

export async function rejectAssociationRequest(
  requestUuid: string,
): Promise<void> {
  await api.delete(`/notification/${requestUuid}`);
}
