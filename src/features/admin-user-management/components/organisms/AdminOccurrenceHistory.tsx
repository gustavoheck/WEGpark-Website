"use client";

import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, FileDown, TriangleAlert } from "lucide-react";
import { useState } from "react";

interface Occurrence {
  id: number;
  user: string;
  vehicle: string;
  date: string;
  type: string;
  status: "Aberta" | "Resolvida";
  description: string;
}

const occurrences: Occurrence[] = [
  { id: 1, user: "João Silva", vehicle: "ABC-1234", date: "27/07/2026", type: "Estacionamento irregular", status: "Aberta", description: "Veículo estacionado em vaga exclusiva sem credencial visível." },
  { id: 2, user: "Maria Souza", vehicle: "QWE-9876", date: "26/07/2026", type: "Acesso indevido", status: "Resolvida", description: "Entrada na garagem sem autorização registrada na portaria." },
  { id: 3, user: "Carlos Eduardo", vehicle: "XYZ-5544", date: "10/11/2025", type: "Colisão / avaria", status: "Resolvida", description: "Pequena colisão ao manobrar no Setor B." },
];

export function AdminOccurrenceHistory() {
  return (
    <div className="flex flex-col gap-4 pb-8">
      <div className="flex justify-end"><button className={buttonVariants({ className: "h-12 px-5 text-base font-bold" })}><FileDown className="size-5" />Exportar relatório</button></div>
      {occurrences.map((occurrence) => <OccurrenceCard key={occurrence.id} occurrence={occurrence} />)}
    </div>
  );
}

function OccurrenceCard({ occurrence }: { occurrence: Occurrence }) {
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <Collapsible open={isExpanded} onOpenChange={setIsExpanded} className="w-full">
      <Card className="w-full gap-0 shadow-sm">
        <CardHeader className="flex flex-row items-center space-x-4 pb-4"><div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground"><TriangleAlert className="size-8" /></div><div className="flex flex-1 flex-col"><div className="flex items-center justify-between"><span className="text-lg font-bold text-foreground">{occurrence.type}</span><Badge variant={occurrence.status === "Aberta" ? "destructive" : "default"}>{occurrence.status}</Badge></div><div className="flex items-center justify-between"><span className="text-md text-muted-foreground">{occurrence.user} · {occurrence.vehicle}</span><span className="text-md text-muted-foreground">{occurrence.date}</span></div></div></CardHeader>
        <CollapsibleContent className="overflow-hidden data-[state=open]:animate-collapsible-down data-[state=closed]:animate-collapsible-up"><CardContent className="border-t border-dashed bg-muted/20 py-4"><p className="text-base text-foreground">{occurrence.description}</p></CardContent></CollapsibleContent>
        <CardFooter className="flex justify-center border-t bg-muted/50 p-3"><CollapsibleTrigger className={buttonVariants({ variant: "ghost", className: "flex w-full items-center justify-center gap-2 font-bold text-primary hover:bg-transparent hover:text-primary aria-expanded:bg-transparent aria-expanded:text-primary" })}><span className="text-lg">{isExpanded ? "Ver Menos" : "Ver Mais"}</span><ChevronDown className={`size-5 transition-transform duration-300 ${isExpanded ? "rotate-180" : "rotate-0"}`} /></CollapsibleTrigger></CardFooter>
      </Card>
    </Collapsible>
  );
}