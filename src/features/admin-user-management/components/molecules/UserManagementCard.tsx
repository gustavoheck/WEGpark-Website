"use client";

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { UserRound, ChevronDown, Eye, Pencil, UserX, UserCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { buttonVariants } from "@/components/ui/button";
import AlertDialog from "@/shared/components/organisms/AlertDialog";

import UserCardButton from "../atoms/UserCardButton";
import { useUserCardActions } from "../../hooks/useUserCardActions";
import { UserListItem } from "../../types/User";


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
    const { activeDialog, openActivateDialog, openDeactivateDialog, closeDialog, actions } = useUserCardActions(id);


    return (
        <Collapsible open={isExpanded} onOpenChange={setIsExpanded} className="w-full">
            <Card className="w-full shadow-sm gap-0">
                <CardHeader className="flex flex-row items-center space-x-4 pb-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                        <UserRound className="size-8" />
                    </div>
                    <div className="flex flex-1 flex-col">
                        <div className="flex items-center justify-between">
                            <span className="text-lg font-bold text-foreground">{name}</span>
                            <Badge variant="outline" className="capitalize text-md mix-blend-multiply font-semibold">
                                {roleLabels[role]}
                            </Badge>
                        </div>
                        <span className="text-sm text-muted-foreground">{email}</span>
                        {!active && (
                            <Badge variant="destructive" className="text-md">
                                Inativo
                            </Badge>
                        )}
                    </div>
                </CardHeader>

                <CollapsibleContent className="overflow-hidden data-[state=open]:animate-collapsible-down data-[state=closed]:animate-collapsible-up">
                    <CardContent className="py-4 border-t border-dashed bg-muted/20">
                        <div className="grid grid-cols-2 gap-3 w-full">
                            <UserCardButton title="ver usuário" Icon={Eye} href={`/admin/gestao-usuarios/${id}`} />
                            <UserCardButton title="editar usuário" Icon={Pencil} href={`/admin/gestao-usuarios/${id}/editar`} />
                            <UserCardButton title="desativar" Icon={UserX} tone="destructive" onClick={openDeactivateDialog} disabled={!active}/>
                            <UserCardButton title="ativar" Icon={UserCheck} tone="primary" onClick={openActivateDialog} disabled={active}/>
                        </div>
                    </CardContent>
                </CollapsibleContent>

                <CardFooter className="bg-muted/50 border-t p-3 flex justify-center">
                    <CollapsibleTrigger
                        className={buttonVariants({
                            variant: "ghost",
                            className: "w-full font-bold text-primary flex items-center justify-center gap-2 aria-expanded:text-primary aria-expanded:bg-transparent hover:text-primary hover:bg-transparent",
                        })}
                    >
                        <span className="text-lg">{isExpanded ? "Ver Menos" : "Ver Mais"}</span>
                        <ChevronDown className={`size-5 transition-transform duration-300 ${isExpanded ? "rotate-180" : "rotate-0"}`} />
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