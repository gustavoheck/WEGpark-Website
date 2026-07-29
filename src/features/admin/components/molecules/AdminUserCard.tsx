"use client";

import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { AdminUserCardButton } from "@/features/admin/components/atoms/AdminUserCardButton";
import { AdminUser } from "@/features/admin/types/AdminUser";
import { Ban, ChevronDown, Eye, History, Pencil, UserRound } from "lucide-react";
import { useState } from "react";

interface AdminUserCardProps { user: AdminUser; }

export function AdminUserCard({ user }: AdminUserCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <Collapsible open={isExpanded} onOpenChange={setIsExpanded} className="w-full">
      <Card className="w-full gap-0 shadow-sm">
        <CardHeader className="flex flex-row items-center space-x-4 pb-4"><div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground"><UserRound className="size-8" /></div><div className="flex flex-1 flex-col"><div className="flex items-center justify-between"><span className="text-lg font-bold text-foreground">{user.name}</span><Badge variant={user.status === "Ativo" ? "default" : "destructive"}>{user.status}</Badge></div><div className="flex items-center justify-between"><span className="text-md text-muted-foreground">{user.email}</span><Badge variant="outline" className="text-md font-semibold">{user.role}</Badge></div></div></CardHeader>
        <CollapsibleContent className="overflow-hidden data-[state=open]:animate-collapsible-down data-[state=closed]:animate-collapsible-up"><CardContent className="border-t border-dashed bg-muted/20 py-4"><div className="grid w-full grid-cols-2 gap-3"><AdminUserCardButton title="visualizar" Icon={Eye} href={`/admin/usuarios/${user.id}`} /><AdminUserCardButton title="histórico" Icon={History} href="/admin/historico" /><AdminUserCardButton title="editar" Icon={Pencil} href="/admin/usuarios/editar" /><AdminUserCardButton title="desativar" Icon={Ban} href="/admin/usuarios/desativar" destructive variant="last" /></div></CardContent></CollapsibleContent>
        <CardFooter className="flex justify-center border-t bg-muted/50 p-3"><CollapsibleTrigger className={buttonVariants({ variant: "ghost", className: "flex w-full items-center justify-center gap-2 font-bold text-primary hover:bg-transparent hover:text-primary aria-expanded:bg-transparent aria-expanded:text-primary" })}><span className="text-lg">{isExpanded ? "Ver Menos" : "Ver Mais"}</span><ChevronDown className={`size-5 transition-transform duration-300 ${isExpanded ? "rotate-180" : "rotate-0"}`} /></CollapsibleTrigger></CardFooter>
      </Card>
    </Collapsible>
  );
}
