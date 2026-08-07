"use client";

import type {
  Dispatch,
  FormEventHandler,
  ReactNode,
  SetStateAction,
} from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FieldGroup } from "@/components/ui/field";
import FormButton from "@/shared/components/atoms/FormButton";
import AlertDialogComponent from "@/shared/components/organisms/AlertDialog";

type Props = {
  children: ReactNode;
  onSubmit: FormEventHandler<HTMLFormElement>;
  onConfirm: () => void;
  confirmationOpen: boolean;
  onConfirmationOpenChange: Dispatch<SetStateAction<boolean>>;
  pending: boolean;
  saveDisabled: boolean;
};

export default function OccurrenceEditFormLayout({
  children,
  onSubmit,
  onConfirm,
  confirmationOpen,
  onConfirmationOpenChange,
  pending,
  saveDisabled,
}: Props) {
  return (
    <Card
      size="sm"
      className="mx-auto w-full max-w-5xl border-border/70 shadow-sm"
    >
      <CardHeader className="border-b bg-muted/20 pb-4">
        <CardTitle>Dados da ocorrência</CardTitle>
        <CardDescription>
          Atualize os campos necessários e confirme as alterações.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit}>
          <FieldGroup className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
            {children}
          </FieldGroup>
          <FormButton
            desktopCompact
            text={pending ? "Salvando..." : "Salvar alterações"}
            disabled={saveDisabled}
          />
        </form>
        <AlertDialogComponent
          open={confirmationOpen}
          onOpenChange={onConfirmationOpenChange}
          title="Salvar alterações"
          description="Deseja salvar as alterações feitas nesta ocorrência?"
          onClick={onConfirm}
          confirmText="Salvar"
          pending={pending}
        />
      </CardContent>
    </Card>
  );
}
