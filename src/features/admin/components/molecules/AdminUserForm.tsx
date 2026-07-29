"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { AdminUser } from "@/features/admin/types/AdminUser";
import { Save } from "lucide-react";
import Link from "next/link";

interface AdminUserFormProps {
  mode: "create" | "edit";
  user?: AdminUser;
}

const roles = ["Colaborador", "Administrador", "RH", "Guarita", "Visitante"];

export function AdminUserForm({ mode, user }: AdminUserFormProps) {
  const isEditing = mode === "edit";

  return (
    <Card>
      <CardContent>
        <form className="space-y-6">
          <FieldGroup className="grid gap-4 md:grid-cols-2">
            <AdminInput label="Nome" name="name" defaultValue={user?.name} placeholder="Nome completo" />
            <AdminInput label="E-mail" name="email" type="email" defaultValue={user?.email} placeholder="email@empresa.com" />
            <AdminInput label="CPF" name="cpf" defaultValue={user?.cpf} placeholder="000.000.000-00" />
            <AdminInput label="Telefone" name="phone" defaultValue={user?.phone} placeholder="(47) 99999-9999" />
            <Field>
              <FieldLabel>Tipo de usuário</FieldLabel>
              <select name="role" defaultValue={user?.role ?? roles[0]} className="h-9 w-full rounded-lg border border-input bg-background px-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50">
                {roles.map((role) => <option key={role}>{role}</option>)}
              </select>
            </Field>
            <Field>
              <FieldLabel>Status</FieldLabel>
              <select name="status" defaultValue={user?.status ?? "Ativo"} className="h-9 w-full rounded-lg border border-input bg-background px-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50">
                <option>Ativo</option>
                <option>Inativo</option>
              </select>
            </Field>
            {isEditing ? null : <AdminInput label="Senha" name="password" type="password" />}
            {isEditing ? null : <AdminInput label="Confirmar senha" name="confirmPassword" type="password" />}
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter className="justify-end gap-3">
        <Button variant="outline" asChild><Link href="/admin/usuarios">Cancelar</Link></Button>
        <Button type="button"><Save />{isEditing ? "Salvar alterações" : "Cadastrar usuário"}</Button>
      </CardFooter>
    </Card>
  );
}

interface AdminInputProps {
  label: string;
  name: string;
  type?: string;
  defaultValue?: string;
  placeholder?: string;
}

function AdminInput({ label, name, type = "text", defaultValue, placeholder }: AdminInputProps) {
  return (
    <Field>
      <FieldLabel htmlFor={name}>{label}</FieldLabel>
      <Input id={name} name={name} type={type} defaultValue={defaultValue} placeholder={placeholder} />
    </Field>
  );
}
