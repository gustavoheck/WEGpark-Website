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
  } = useUserCardActions(id, role);

  function renderActions(compact = false) {
    return (
      <>
        <UserCardButton
          title="ver usuário"
          Icon={Eye}
          href={`/gestao-usuarios/${id}?role=${role}`}
          compact={compact}
        />
        <UserCardButton
          title="editar usuário"
          Icon={Pencil}
          href={`/gestao-usuarios/${id}/editar?role=${role}`}
          compact={compact}
        />
        <UserCardButton
          title="desativar"
          Icon={UserX}
          tone="destructive"
          onClick={openDeactivateDialog}
          disabled={!active}
          compact={compact}
        />
        <UserCardButton
          title="ativar"
          Icon={UserCheck}
          tone="primary"
          onClick={openActivateDialog}
          disabled={active}
          compact={compact}
        />
      </>
    );
  }

  return (
    <>
      <Collapsible
        open={isExpanded}
        onOpenChange={setIsExpanded}
        className="w-full md:hidden"
      >
        <Card size="sm" className="w-full gap-0 shadow-sm">
          <CardHeader className="flex min-w-0 flex-row items-start gap-3 pb-3">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <UserRound className="size-6" />
            </div>

            <div className="flex min-w-0 flex-1 flex-col gap-1.5">
              <div className="flex flex-wrap items-center justify-between gap-1.5">
                <span className="min-w-0 truncate text-base font-bold text-foreground">
                  {name}
                </span>
                <Badge
                  variant="outline"
                  className="shrink-0 font-semibold capitalize mix-blend-multiply"
                >
                  {roleLabels[role]}
                </Badge>
              </div>
              <span className="break-all text-xs text-muted-foreground">
                {email}
              </span>
              <Badge
                variant={active ? "default" : "destructive"}
                className="text-xs"
              >
                {active ? "Ativo" : "Inativo"}
              </Badge>
            </div>
          </CardHeader>

          <CollapsibleContent className="overflow-hidden data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
            <CardContent className="border-t border-dashed bg-muted/20 py-3">
              <div className="grid w-full grid-cols-1 gap-2 min-[380px]:grid-cols-2">
                {renderActions()}
              </div>
            </CardContent>
          </CollapsibleContent>

          <CardFooter className="flex justify-center border-t bg-muted/50 p-2">
            <CollapsibleTrigger
              className={buttonVariants({
                variant: "ghost",
                size: "sm",
                className:
                  "flex w-full items-center justify-center gap-2 font-bold text-primary hover:bg-transparent hover:text-primary aria-expanded:bg-transparent aria-expanded:text-primary",
              })}
            >
              <span>{isExpanded ? "Ver Menos" : "Ver Mais"}</span>
              <ChevronDown
                className={`size-4 transition-transform duration-300 ${
                  isExpanded ? "rotate-180" : "rotate-0"
                }`}
              />
            </CollapsibleTrigger>
          </CardFooter>
        </Card>
      </Collapsible>

      <div className="hidden min-h-16 grid-cols-[minmax(0,1.4fr)_minmax(9rem,0.7fr)_auto] items-center gap-3 border-b px-4 py-2 last:border-b-0 md:grid">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <UserRound className="size-5" />
          </div>
          <div className="min-w-0">
            <p className="truncate font-semibold text-foreground">{name}</p>
            <p className="truncate text-xs text-muted-foreground">{email}</p>
          </div>
        </div>

        <div className="flex min-w-0 flex-col items-start gap-1">
          <Badge
            variant="outline"
            className="max-w-full font-semibold capitalize mix-blend-multiply"
          >
            <span className="truncate">{roleLabels[role]}</span>
          </Badge>
          <span
            className={
              active
                ? "text-xs font-medium text-primary"
                : "text-xs font-medium text-destructive"
            }
          >
            {active ? "Ativo" : "Inativo"}
          </span>
        </div>

        <div className="flex flex-wrap items-center justify-end gap-1">
          {renderActions(true)}
        </div>
      </div>

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
    </>
  );
}
