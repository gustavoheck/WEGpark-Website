"use client";

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { UserRound, ChevronDown, Eye, Pencil, Trash2 } from "lucide-react";
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
    COLABORADOR: "Colaborador",
    VISITANTE: "Visitante",
    RH: "RH",
    GUARITA: "Guarita",
};

export default function UserManagementCard({ user }: UserManagementCardProps) {
    const { id, name, email, role } = user;
    const [isExpanded, setIsExpanded] = useState(false);

    const { activeDialog, openDeleteDialog, closeDialog, handleDelete } = useUserCardActions(id);

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
                    </div>
                </CardHeader>

                <CollapsibleContent className="overflow-hidden data-[state=open]:animate-collapsible-down data-[state=closed]:animate-collapsible-up">
                    <CardContent className="py-4 border-t border-dashed bg-muted/20">
                        <div className="grid grid-cols-2 gap-3 w-full">
                            <UserCardButton title="ver usuário" Icon={Eye} href={`/gestao-usuarios/${id}`} />
                            <UserCardButton title="editar usuário" Icon={Pencil} href={`/gestao-usuarios/${id}/editar`} />
                            <UserCardButton title="excluir usuário" Icon={Trash2} destructive onClick={openDeleteDialog} variant="last" />
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
                    open={activeDialog === "delete"}
                    onOpenChange={(open) => !open && closeDialog()}
                    title="Excluir Usuário"
                    description="Você realmente deseja excluir esse usuário? Esta ação não pode ser desfeita."
                    onClick={handleDelete}
                    confirmText="Excluir"
                />
            </Card>
        </Collapsible>
    );
}