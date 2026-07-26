import { NOTIFICATION_TYPE_CONFIG } from "../config/notification-type"


export type NotificationType = keyof typeof NOTIFICATION_TYPE_CONFIG

export interface NotificationTypeDetails {
    warning_type : NotificationType
}