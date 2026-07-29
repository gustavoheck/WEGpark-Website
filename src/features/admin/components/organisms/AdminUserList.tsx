"use client";
import { AdminUserCard } from "@/features/admin/components/molecules/AdminUserCard";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { AdminStatusBadge } from "@/features/admin/components/atoms/AdminStatusBadge";
import { adminUsers } from "@/features/admin/mocks/adminUsers";
import { Ban, Eye, History, Pencil, Plus, Search, User } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export function AdminUserList() {
  return (
    <div className="flex flex-col gap-4 pb-24">
      {adminUsers.map((user) => <AdminUserCard key={user.id} user={user} />)}
      <Button asChild className="fixed bottom-4 left-4 right-4 z-50 rounded-sm py-6 text-xl font-bold"><Link href="/admin/usuarios/criar"><Plus className="size-7" />Cadastrar usuário</Link></Button>
    </div>
  );

  const [search, setSearch] = useState("");
  const users = adminUsers.filter((user) => user.name.toLowerCase().includes(search.toLowerCase()) || user.email.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-4 pb-8">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-sm"><Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" /><Input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Pesquisar usuário..." className="pl-9" /></div>
        <Button asChild><Link href="/admin/usuarios/criar"><Plus />Cadastrar usuário</Link></Button>
      </div>
      {users.map((user) => (
        <Card key={user.id}>
          <CardHeader>
            <CardTitle className="flex items-center gap-3"><span className="rounded-lg bg-primary p-2 text-primary-foreground"><User className="size-5" /></span><span>{user.name}<span className="mt-1 block text-sm font-normal text-muted-foreground">{user.email}</span></span></CardTitle>
            <div className="flex items-center gap-2"><span className="text-sm text-muted-foreground">{user.role}</span><AdminStatusBadge status={user.status} /></div>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            <Button variant="outline" size="sm" asChild><Link href={`/admin/usuarios/${user.id}`}><Eye />Visualizar</Link></Button>
            <Button variant="outline" size="sm" asChild><Link href="/admin/usuarios/editar"><Pencil />Editar</Link></Button>
            <Button variant="outline" size="sm" asChild><Link href="/admin/historico"><History />Histórico</Link></Button>
            <Button variant="destructive" size="sm" asChild><Link href="/admin/usuarios/desativar"><Ban />Desativar</Link></Button>
          </CardContent>
          <CardFooter><span className="text-sm text-muted-foreground">{user.vehicles.length} veículo(s) vinculado(s)</span></CardFooter>
        </Card>
      ))}
      {users.length === 0 ? <p className="py-8 text-center text-muted-foreground">Nenhum usuário encontrado.</p> : null}
    </div>
  );
}
