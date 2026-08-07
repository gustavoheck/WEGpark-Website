import Link from "next/link";
import { ArrowRight, Loader2, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import DateHour from "@/shared/components/atoms/DateHour";

import Notification from "../types/Notification";
import { getNotificationConfig } from "../utils/notifications-helpers";

interface NotificationCardProps {
  notification: Notification;
  onDelete: (notificationUuid: string) => void;
  isDeleting: boolean;
}

export default function NotificationCard({
  notification,
  onDelete,
  isDeleting,
}: NotificationCardProps) {
  const { icon: IconNotification, label, href } =
    getNotificationConfig(notification);

  return (
    <Card className="flex-row items-center justify-between gap-4 px-4">
      <div className="flex min-w-0 items-start gap-3">
        <div className="mt-1 flex size-10 shrink-0 items-center justify-center rounded-full bg-muted text-primary">
          <IconNotification className="size-5" />
        </div>
        <div className="min-w-0 space-y-1">
          <p className="font-semibold text-foreground">{label}</p>
          <p className="text-balance text-muted-foreground">
            {notification.message}
          </p>
          <DateHour dateHour={notification.notificationTime} />
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-1">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          aria-label="Remover notificação"
          title="Remover notificação"
          disabled={isDeleting}
          onClick={() => onDelete(notification.uuid)}
        >
          {isDeleting ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <Trash2 className="size-4" />
          )}
        </Button>
        <Button asChild variant="ghost" size="icon">
          <Link href={href} aria-label={`Abrir ${label.toLowerCase()}`}>
            <ArrowRight className="size-5 text-primary" />
          </Link>
        </Button>
      </div>
    </Card>
  );
}
