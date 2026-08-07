"use client"

import { Skeleton } from "@/components/ui/skeleton";
import NotificationList from "@/features/notifications/components/NotificationList";
import { useNotifications } from "@/features/notifications/hooks/useNotifications";
import SectionTitle from "@/shared/components/atoms/SectionTitle";
import { DisplayCard } from "@/shared/components/molecules/DisplayCard";
import { AlertTriangle, BellOff } from "lucide-react";

export default function Notifications() {
  const {
      notifications,
      isLoading,
      isError
    } = useNotifications();

  return (
    <>
      <SectionTitle text="Notificações" />

      {isLoading && (
        <div className="flex flex-col gap-4">
          <Skeleton className="h-28 w-full" />
          <Skeleton className="h-28 w-full" />
          <Skeleton className="h-28 w-full" />
        </div>
      )}

      {!isLoading && isError && (
        <DisplayCard
            Icon={AlertTriangle}
            title="Não foi possível carregar as notificações"
            description="Tente novamente mais tarde."
            destructive
         />
      )}

      {!isLoading && !isError && notifications.length === 0 && (
        <DisplayCard
            Icon={BellOff}
            title="Nenhuma notificação no momento"
            description="Novos avisos aparecerão aqui quando estiverem disponíveis."
         />
      )}

      {!isLoading && !isError && notifications.length > 0 && (
        <NotificationList 
        notifications={notifications}
        />
      )}      
    </>
    
  );
}
