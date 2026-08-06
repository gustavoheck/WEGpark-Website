"use client";

import type { Dispatch, FormEventHandler, ReactNode, SetStateAction } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { FieldGroup } from "@/components/ui/field";
import FormButton from "@/shared/components/atoms/FormButton";
import AlertDialogComponent from "@/shared/components/organisms/AlertDialog";

type Props = { children: ReactNode; onSubmit: FormEventHandler<HTMLFormElement>; onConfirm: () => void; confirmationOpen: boolean; onConfirmationOpenChange: Dispatch<SetStateAction<boolean>>; pending: boolean; saveDisabled: boolean; };

export default function OccurrenceEditFormLayout({ children, onSubmit, onConfirm, confirmationOpen, onConfirmationOpenChange, pending, saveDisabled }: Props) {
  return <Card><CardContent><form onSubmit={onSubmit}><FieldGroup className="mb-6 gap-4">{children}</FieldGroup><FormButton text={pending ? "Salvando..." : "Salvar alterações"} disabled={saveDisabled} /></form><AlertDialogComponent open={confirmationOpen} onOpenChange={onConfirmationOpenChange} title="Salvar alterações" description="Deseja salvar as alterações feitas nesta ocorrência?" onClick={onConfirm} confirmText="Salvar" pending={pending} /></CardContent></Card>;
}

