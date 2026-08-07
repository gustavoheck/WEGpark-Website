"use client";

import { Inbox } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import SectionTitle from "@/shared/components/atoms/SectionTitle";

import { useAssociationRequests } from "../hooks/useAssociationRequests";
import RequestCard from "./RequestCard";

export default function RequestList() {
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
    <section className="mx-auto w-full max-w-5xl pb-8">
      <SectionTitle text="solicitações de vínculo" />

      {isLoading ? (
        <div className="grid gap-4 lg:grid-cols-2">
          <Skeleton className="h-64 w-full" />
          <Skeleton className="h-64 w-full" />
        </div>
      ) : null}

      {!isLoading && isError ? (
        <p className="text-center font-semibold text-destructive">
          Não foi possível carregar as solicitações. Tente novamente.
        </p>
      ) : null}

      {!isLoading && !isError && requests.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center gap-3 py-12 text-center">
            <div className="flex size-14 items-center justify-center rounded-full bg-muted text-primary">
              <Inbox className="size-7" />
            </div>
            <div>
              <p className="font-semibold text-foreground">
                Nenhuma solicitação pendente
              </p>
              <p className="text-sm text-muted-foreground">
                Novos pedidos de vínculo aparecerão aqui quando estiverem disponíveis.
              </p>
            </div>
          </CardContent>
        </Card>
      ) : null}

      {!isLoading && !isError && requests.length > 0 ? (
        <div className="grid gap-4 lg:grid-cols-2">
          {requests.map((request) => (
            <RequestCard
              key={request.uuid}
              request={request}
              onAccept={acceptRequest}
              onReject={rejectRequest}
              isAccepting={acceptingRequestUuid === request.uuid}
              isRejecting={rejectingRequestUuid === request.uuid}
            />
          ))}
        </div>
      ) : null}
    </section>
  );
}
