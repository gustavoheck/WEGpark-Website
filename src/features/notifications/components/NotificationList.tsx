"use client";

import NotificationCard from "./NotificationCard";
import Notification from "../types/Notification";
import { useNotifications } from "../hooks/useNotifications";

interface NotificationListProps {
  notifications: Notification[]
}

export default function NotificationList({
  notifications
}: NotificationListProps
) {

  const {
    deleteNotification,
    deletingNotificationUuid,
  } = useNotifications();
return (
  <div className="flex flex-col gap-4">
    {notifications.map((notification) => (
      <NotificationCard
        key={notification.uuid}
        notification={notification}
        onDelete={deleteNotification}
        isDeleting={deletingNotificationUuid === notification.uuid}
      />
    ))}
  </div>
);
}
