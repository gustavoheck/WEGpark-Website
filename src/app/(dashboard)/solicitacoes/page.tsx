"use client";

import { AlertTriangle, Inbox } from "lucide-react";

import { Skeleton } from "@/components/ui/skeleton";
import RequestList from "@/features/requests/components/RequestList";
import { useAssociationRequests } from "@/features/requests/hooks/useAssociationRequests";
import SectionTitle from "@/shared/components/atoms/SectionTitle";
import { DisplayCard } from "@/shared/components/molecules/DisplayCard";

export default function Requests() {
  const {
    requests,
    isLoading,
    isError,
    acceptRequest,
    acceptingRequestUuid,
    rejectRequest,
    rejectingRequestUuid,
  } = useAssociationRequests();

  return (
    <>
      <SectionTitle text="solicitações de vínculo" />

      {isLoading ? (
        <div className="grid gap-4 lg:grid-cols-2">
          <Skeleton className="h-64 w-full" />
          <Skeleton className="h-64 w-full" />
        </div>
      ) : null}

      {!isLoading && isError ? (
        <DisplayCard
          Icon={AlertTriangle}
          title="Não foi possível carregar as solicitações"
          description="Tente novamente mais tarde."
          destructive
        />
      ) : null}

      {!isLoading && !isError && requests.length === 0 ? (
        <DisplayCard
          Icon={Inbox}
          title="Nenhuma solicitação pendente"
          description="Novos pedidos de vínculo aparecerão aqui quando estiverem disponíveis."
        />
      ) : null}

      {!isLoading && !isError && requests.length > 0 ? (
        <RequestList
          requests={requests}
          onAccept={acceptRequest}
          onReject={rejectRequest}
          acceptingRequestUuid={acceptingRequestUuid}
          rejectingRequestUuid={rejectingRequestUuid}
        />
      ) : null}
    </>
  );
}
