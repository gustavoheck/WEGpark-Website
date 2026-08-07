"use client";

import { BellOff } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import SectionTitle from "@/shared/components/atoms/SectionTitle";

import { useNotifications } from "../hooks/useNotifications";
import NotificationCard from "./NotificationCard";

export default function NotificationList() {
  const {
    notifications,
    isLoading,
    isError,
    deleteNotification,
    deletingNotificationUuid,
  } = useNotifications();

  return (
    <section className="mx-auto w-full max-w-5xl pb-8">
      <SectionTitle text="Notificações" />

      {isLoading ? (
        <div className="flex flex-col gap-4">
          <Skeleton className="h-28 w-full" />
          <Skeleton className="h-28 w-full" />
          <Skeleton className="h-28 w-full" />
        </div>
      ) : null}

      {!isLoading && isError ? (
        <p className="text-center font-semibold text-destructive">
          Não foi possível carregar as notificações. Tente novamente.
        </p>
      ) : null}

      {!isLoading && !isError && notifications.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center gap-3 py-12 text-center">
            <div className="flex size-14 items-center justify-center rounded-full bg-muted text-primary">
              <BellOff className="size-7" />
            </div>
            <div>
              <p className="font-semibold text-foreground">
                Nenhuma notificação no momento
              </p>
              <p className="text-sm text-muted-foreground">
                Novos avisos aparecerão aqui quando estiverem disponíveis.
              </p>
            </div>
          </CardContent>
        </Card>
      ) : null}

      {!isLoading && !isError && notifications.length > 0 ? (
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
      ) : null}
    </section>
  );
}
