export interface Request {
  uuid: string;
  requestedAt: string;
  requesterName: string;
  vehicleDescription: string;
  message: string;
}

export interface NotificationResponse {
  uuid: string;
  notificationTime: string;
  notificationType: "VEHICLE_ASSOCIATION" | "OCCURRENCE" | "FIVE_OCCURRENCE";
  message: string;
}

export interface NotificationPageResponse {
  content: NotificationResponse[];
}
