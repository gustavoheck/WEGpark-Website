import { NOTIFICATION_UI_CONFIG } from "../config/notification-ui";
import Notification from "../types/Notification";

export function getNotificationConfig(notification: Notification) {
  if (notification.type.warning_type === "REQUEST") return NOTIFICATION_UI_CONFIG.REQUEST
  else return NOTIFICATION_UI_CONFIG.OCCURRENCE
}