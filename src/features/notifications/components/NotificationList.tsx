"use client";

import NotificationCard from "./NotificationCard";
import type Notification from "../types/Notification";

interface NotificationListProps {
  notifications: Notification[];
  onDelete: (notificationUuid: string) => void;
  deletingNotificationUuid?: string;
}

export default function NotificationList({
  notifications,
  onDelete,
  deletingNotificationUuid,
}: NotificationListProps) {
  return (
    <div className="flex flex-col gap-4">
      {notifications.map((notification) => (
        <NotificationCard
          key={notification.uuid}
          notification={notification}
          onDelete={onDelete}
          isDeleting={deletingNotificationUuid === notification.uuid}
        />
      ))}
    </div>
  );
}
