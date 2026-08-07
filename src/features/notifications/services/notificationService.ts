import { api } from "@/shared/lib/api";

import Notification, {
  NotificationPageResponse,
} from "../types/Notification";

export async function listNotifications(): Promise<Notification[]> {
  const { data } = await api.get<NotificationPageResponse>("/notification", {
    params: { size: 100 },
  });

  return data.content;
}

export async function deleteNotification(
  notificationUuid: string,
): Promise<void> {
  await api.delete(`/notification/${notificationUuid}`);
}
