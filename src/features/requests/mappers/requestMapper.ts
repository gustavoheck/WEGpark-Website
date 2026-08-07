import { NotificationResponse, Request } from "../types/Request";

const USER_PREFIX = "Do you want to permit the user ";
const VEHICLE_SEPARATOR = " associate with your vehicle ";

export function mapNotificationToRequest(
  notification: NotificationResponse,
): Request {
  const content = notification.message.startsWith(USER_PREFIX)
    ? notification.message.slice(USER_PREFIX.length)
    : notification.message;
  const separatorIndex = content.indexOf(VEHICLE_SEPARATOR);

  if (separatorIndex < 0) {
    return {
      uuid: notification.uuid,
      requestedAt: notification.notificationTime,
      requesterName: "Usuário solicitante",
      vehicleDescription: "Veículo cadastrado",
      message: notification.message,
    };
  }

  return {
    uuid: notification.uuid,
    requestedAt: notification.notificationTime,
    requesterName: content.slice(0, separatorIndex).trim(),
    vehicleDescription: content
      .slice(separatorIndex + VEHICLE_SEPARATOR.length)
      .trim(),
    message: notification.message,
  };
}
