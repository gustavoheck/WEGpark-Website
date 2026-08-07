import { NotificationType } from "./NotificationType";

export default interface Notification {
  uuid: string;
  notificationTime: string;
  notificationType: NotificationType;
  message: string;
}

export interface NotificationPageResponse {
  content: Notification[];
}
