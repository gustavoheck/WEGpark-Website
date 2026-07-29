import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { AdminStatusBadge } from "@/features/admin/components/atoms/AdminStatusBadge";
import { AdminUser } from "@/features/admin/types/AdminUser";
import { Ban, Building2, Car, History, Mail, Pencil, Phone, UserRound } from "lucide-react";
import Link from "next/link";

interface AdminUserDetailsProps { user: AdminUser; }

export function AdminUserDetails({ user }: AdminUserDetailsProps) {
  return (
    <Card>
      <CardHeader className="items-center text-center"><span className="mx-auto rounded-full bg-primary p-4 text-primary-foreground"><UserRound className="size-8" /></span><CardTitle>{user.name}</CardTitle><AdminStatusBadge status={user.status} /></CardHeader>
      <CardContent className="grid gap-4 sm:grid-cols-2"><Detail icon={<Mail />} label="E-mail" value={user.email} /><Detail icon={<Phone />} label="Telefone" value={user.phone} /><Detail icon={<UserRound />} label="CPF" value={user.cpf} /><Detail icon={<Building2 />} label="Tipo" value={user.role} /><Detail icon={<Building2 />} label="Setor" value={user.department} /><Detail icon={<Car />} label="Veículos" value={user.vehicles.length > 0 ? user.vehicles.join(", ") : "Nenhum veículo vinculado"} /></CardContent>
      <CardFooter className="grid gap-2 sm:grid-cols-3"><Button asChild><Link href="/admin/usuarios/editar"><Pencil />Editar usuário</Link></Button><Button variant="destructive" asChild><Link href="/admin/usuarios/desativar"><Ban />Desativar</Link></Button><Button variant="outline" asChild><Link href="/admin/historico"><History />Ver histórico</Link></Button></CardFooter>
    </Card>
  );
}

function Detail({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return <div className="flex items-start gap-3 rounded-lg border p-3"><span className="text-primary">{icon}</span><div><p className="text-sm text-muted-foreground">{label}</p><p className="font-medium">{value}</p></div></div>;
}
