import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { adminUsers } from "@/features/admin/mocks/adminUsers";
import { Ban } from "lucide-react";
import Link from "next/link";

export function DeactivateUserCard() {
  const user = adminUsers[0];
  return (<Card><CardHeader><CardTitle>Confirmar desativação</CardTitle></CardHeader><CardContent className="space-y-4"><dl className="grid gap-3 sm:grid-cols-2"><Info label="Nome" value={user.name} /><Info label="E-mail" value={user.email} /><Info label="Tipo" value={user.role} /></dl><p className="rounded-lg bg-destructive/10 p-4 text-sm text-destructive">Após confirmar, o usuário ficará inativo e não poderá acessar o sistema até ser reativado.</p></CardContent><CardFooter className="justify-end gap-3"><Button variant="outline" asChild><Link href="/admin/usuarios">Cancelar</Link></Button><Button variant="destructive"><Ban />Confirmar desativação</Button></CardFooter></Card>);
}

function Info({ label, value }: { label: string; value: string }) { return <div><dt className="text-sm text-muted-foreground">{label}</dt><dd className="font-medium">{value}</dd></div>; }
