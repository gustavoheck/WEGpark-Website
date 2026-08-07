import { NOTIFICATION_UI_CONFIG } from "../config/notification-ui";
import Notification from "../types/Notification";

export function getNotificationConfig(notification: Notification) {
  return NOTIFICATION_UI_CONFIG[notification.notificationType];
}
