"use client";

import { useState } from "react";
import { CarFront, Clock3, Link2, UserRound } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import AlertDialogComponent from "@/shared/components/organisms/AlertDialog";

import { Request } from "../types/Request";

interface RequestCardProps {
  request: Request;
  onAccept: (requestUuid: string) => void;
  onReject: (requestUuid: string) => void;
  isAccepting: boolean;
  isRejecting: boolean;
}

function formatRequestedAt(requestedAt: string): string {
  const date = new Date(requestedAt);

  if (Number.isNaN(date.getTime())) {
    return "Data não informada";
  }

  return new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(date);
}

export default function RequestCard({
  request,
  onAccept,
  onReject,
  isAccepting,
  isRejecting,
}: RequestCardProps) {
  const [isAcceptDialogOpen, setIsAcceptDialogOpen] = useState(false);
  const [isRejectDialogOpen, setIsRejectDialogOpen] = useState(false);
  const isPending = isAccepting || isRejecting;

  function handleAccept() {
    setIsAcceptDialogOpen(false);
    onAccept(request.uuid);
  }

  function handleReject() {
    setIsRejectDialogOpen(false);
    onReject(request.uuid);
  }

  return (
    <Card className="gap-0 border border-border/70 py-0 shadow-sm transition-shadow hover:shadow-md">
      <CardHeader className="flex flex-row items-center justify-between gap-3 border-b bg-muted/30 py-4">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <Link2 className="size-5" />
          </div>
          <div className="min-w-0">
            <h2 className="truncate text-base font-semibold text-foreground">
              Solicitação de vínculo
            </h2>
            <p className="flex items-center gap-1 text-xs text-muted-foreground">
              <Clock3 className="size-3.5" />
              {formatRequestedAt(request.requestedAt)}
            </p>
          </div>
        </div>
        <Badge variant="outline" className="bg-background text-primary">
          Pendente
        </Badge>
      </CardHeader>

      <CardContent className="grid grid-cols-1 items-stretch gap-3 py-4 md:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] md:items-center">
        <div className="flex min-w-0 items-center gap-3 rounded-xl bg-muted/50 p-3">
          <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-background text-primary ring-1 ring-border">
            <UserRound className="size-5" />
          </div>
          <div className="min-w-0">
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Solicitante
            </p>
            <p className="truncate font-semibold text-foreground">
              {request.requesterName}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-center text-primary">
          <Link2 className="size-5 rotate-45 md:rotate-0" />
        </div>

        <div className="flex min-w-0 items-center gap-3 rounded-xl bg-muted/50 p-3">
          <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-background text-primary ring-1 ring-border">
            <CarFront className="size-5" />
          </div>
          <div className="min-w-0">
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Veículo
            </p>
            <p className="truncate font-semibold text-foreground">
              {request.vehicleDescription}
            </p>
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex flex-col-reverse gap-2 border-t bg-muted/20 p-3 sm:flex-row sm:justify-end">
        <Button
          type="button"
          variant="destructive"
          className="w-full sm:w-auto"
          disabled={isPending}
          onClick={() => setIsRejectDialogOpen(true)}
        >
          Recusar
        </Button>
        <Button
          type="button"
          className="w-full sm:w-auto"
          disabled={isPending}
          onClick={() => setIsAcceptDialogOpen(true)}
        >
          Aceitar vínculo
        </Button>
      </CardFooter>

      <AlertDialogComponent
        open={isAcceptDialogOpen}
        onOpenChange={setIsAcceptDialogOpen}
        title="Aceitar vínculo"
        description={`Deseja permitir que ${request.requesterName} seja vinculado ao veículo ${request.vehicleDescription}?`}
        onClick={handleAccept}
        confirmText="Aceitar"
        pending={isAccepting}
      />

      <AlertDialogComponent
        open={isRejectDialogOpen}
        onOpenChange={setIsRejectDialogOpen}
        title="Recusar vínculo"
        description={`Deseja recusar a solicitação de ${request.requesterName} para o veículo ${request.vehicleDescription}?`}
        onClick={handleReject}
        confirmText="Recusar"
        pending={isRejecting}
      />
    </Card>
  );
}
