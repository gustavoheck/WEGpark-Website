"use client";

import { useState } from "react";
import {
  ChevronDown,
  Eye,
  Pencil,
  UserCheck,
  UserRound,
  UserX,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import AlertDialog from "@/shared/components/organisms/AlertDialog";

import { useUserCardActions } from "../../hooks/useUserCardActions";
import { UserListItem } from "../../types/User";
import UserCardButton from "../atoms/UserCardButton";

interface UserManagementCardProps {
  user: UserListItem;
}

const roleLabels: Record<UserListItem["role"], string> = {
  EMPLOYEE: "Colaborador",
  VISITOR: "Visitante",
  HR: "RH",
  GUARD: "Guarita",
};

export default function UserManagementCard({ user }: UserManagementCardProps) {
  const { id, name, email, role, active } = user;
  const [isExpanded, setIsExpanded] = useState(false);
  const {
    activeDialog,
    openActivateDialog,
    openDeactivateDialog,
    closeDialog,
    actions,
  } = useUserCardActions(id);

  return (
    <Collapsible
      open={isExpanded}
      onOpenChange={setIsExpanded}
      className="h-full w-full"
    >
      <Card className="h-full w-full gap-0 shadow-sm">
        <CardHeader className="flex min-w-0 flex-row items-start gap-3 pb-4 sm:items-center">
          <div className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground sm:size-12">
            <UserRound className="size-7 sm:size-8" />
          </div>

          <div className="flex min-w-0 flex-1 flex-col gap-2">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="min-w-0 break-words text-lg font-bold text-foreground">
                {name}
              </span>
              <Badge
                variant="outline"
                className="shrink-0 font-semibold capitalize mix-blend-multiply"
              >
                {roleLabels[role]}
              </Badge>
            </div>
            <span className="break-all text-sm text-muted-foreground">
              {email}
            </span>
            {!active ? (
              <Badge variant="destructive" className="w-fit">
                Inativo
              </Badge>
            ) : null}
          </div>
        </CardHeader>

        <CollapsibleContent className="overflow-hidden data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
          <CardContent className="border-t border-dashed bg-muted/20 py-4">
            <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2">
              <UserCardButton
                title="ver usuário"
                Icon={Eye}
                href={`/gestao-usuarios/${id}`}
              />
              <UserCardButton
                title="editar usuário"
                Icon={Pencil}
                href={`/gestao-usuarios/${id}/editar`}
              />
              <UserCardButton
                title="desativar"
                Icon={UserX}
                tone="destructive"
                onClick={openDeactivateDialog}
                disabled={!active}
              />
              <UserCardButton
                title="ativar"
                Icon={UserCheck}
                tone="primary"
                onClick={openActivateDialog}
                disabled={active}
              />
            </div>
          </CardContent>
        </CollapsibleContent>

        <CardFooter className="mt-auto flex justify-center border-t bg-muted/50 p-3">
          <CollapsibleTrigger
            className={buttonVariants({
              variant: "ghost",
              className:
                "flex w-full items-center justify-center gap-2 font-bold text-primary hover:bg-transparent hover:text-primary aria-expanded:bg-transparent aria-expanded:text-primary",
            })}
          >
            <span className="text-lg">
              {isExpanded ? "Ver Menos" : "Ver Mais"}
            </span>
            <ChevronDown
              className={`size-5 transition-transform duration-300 ${
                isExpanded ? "rotate-180" : "rotate-0"
              }`}
            />
          </CollapsibleTrigger>
        </CardFooter>

        <AlertDialog
          open={activeDialog === "deactivate"}
          onOpenChange={(open) => !open && closeDialog()}
          title="Desativar Usuário"
          description="Você realmente deseja desativar esse usuário? Esta ação não pode ser desfeita."
          onClick={actions.handleDeactivate}
          confirmText="Desativar"
        />

        <AlertDialog
          open={activeDialog === "activate"}
          onOpenChange={(open) => !open && closeDialog()}
          title="Ativar Usuário"
          description="Você realmente deseja ativar esse usuário? Esta ação não pode ser desfeita."
          onClick={actions.handleActivate}
          confirmText="Ativar"
        />
      </Card>
    </Collapsible>
  );
}
