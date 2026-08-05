"use client";

import { useState } from "react";
import { CarFront, Link as LinkIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { toast } from "@/components/ui/toast";
import AlertDialogComponent from "@/shared/components/organisms/AlertDialog";
import DialogComponent from "@/shared/components/organisms/Dialog";
import { getApiErrorMessage } from "@/shared/lib/getApiErrorMessage";

import { useLink } from "../hooks/UseLink";
import { Request } from "../types/Request";

interface RequestCardProps {
  request: Request;
}

export default function RequestCard({ request }: RequestCardProps) {
  const [isOpenConfirmative, setIsOpenConfirmative] = useState(false);
  const [isOpenInformative, setIsOpenInformative] = useState(false);
  const { mutate: link } = useLink();

  function onSubmit() {
    link(
      { request },
      {
        onSuccess: () => {
          setIsOpenConfirmative(false);
          setIsOpenInformative(true);
        },
        onError: (error) => {
          setIsOpenConfirmative(false);
          toast.add({
            type: "error",
            description: getApiErrorMessage(
              error,
              "Não foi possível vincular o usuário.",
            ),
          });
        },
      },
    );
  }

  return (
    <Card>
      <CardHeader className="border-b pb-4 text-center text-xl font-semibold text-primary">
        <h3>Solicitação de Vínculo</h3>
      </CardHeader>
      <CardContent className="flex items-center justify-center gap-4">
        <div className="flex flex-col items-center justify-center gap-2 p-3">
          <div className="flex w-fit items-center justify-center rounded-xl bg-primary p-3">
            <CarFront className="size-10 text-white" />
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-center font-bold">Veículo</span>
            <div className="flex flex-col">
              <span className="text-center">{request.vehicle.brand}</span>
              <span className="text-center">{request.vehicle.model}</span>
            </div>
          </div>
        </div>

        <LinkIcon className="size-8 rotate-45 text-foreground" />

        <div className="flex flex-col items-center justify-between gap-2 p-3">
          <div className="flex size-16 items-center justify-center rounded-full bg-primary">
            <p className="text-2xl font-bold text-white">
              {request.user.name.charAt(0)}
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-center font-bold">Usuário</span>
            <span className="text-center">{request.user.name}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-center gap-6">
        <Button
          type="button"
          variant="link"
          className="py-5 text-lg font-semibold"
          onClick={() => setIsOpenConfirmative(true)}
        >
          Aceitar
        </Button>
        <Button
          type="button"
          variant="link"
          className="py-5 text-lg font-semibold"
        >
          Rejeitar
        </Button>
      </CardFooter>

      <AlertDialogComponent
        open={isOpenConfirmative}
        onOpenChange={setIsOpenConfirmative}
        title="Vincular Usuário"
        description="Você deseja vincular seu veículo a esse usuário?"
        onClick={onSubmit}
        confirmText="Vincular"
      />

      <DialogComponent
        open={isOpenInformative}
        onOpenChange={setIsOpenInformative}
        title="Usuário Vinculado"
        description="O usuário foi vinculado com sucesso ao seu veículo."
      />
    </Card>
  );
}
