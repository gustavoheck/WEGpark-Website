// features/hr-user-management/components/organisms/DetailUser.tsx
"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { UserDetailDTO } from "../../types/User";
import { UserRound } from "lucide-react";
import DetailUserInformation from "../molecules/UserDetailsLabel";
import UserSpecificDetail from "../molecules/UserSpecificDetail";

const roleLabels: Record<UserDetailDTO["role"], string> = {
  EMPLOYEE: "Colaborador",
  VISITOR: "Visitante",
  HR: "HR",
  GUARD: "Guarita",
};

interface DetailUserProps {
  user: UserDetailDTO;
}

export default function DetailUser({ user }: DetailUserProps) {
  return (
    <Card
      size="sm"
      className="mx-auto mb-6 w-full max-w-5xl border-border/70 shadow-sm"
    >
      <CardHeader className="flex flex-row items-center gap-3 border-b bg-muted/20 pb-4">
        <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <UserRound className="size-5" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-foreground">{user.name}</h2>
          <p className="text-sm text-muted-foreground">
            {roleLabels[user.role]}
          </p>
        </div>
      </CardHeader>
      <CardContent className="space-y-6 px-3">
        <section className="space-y-3">
          <h3 className="text-sm font-semibold text-foreground">
            Dados pessoais
          </h3>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <DetailUserInformation label="Nome" data={user.name} />
            <DetailUserInformation label="Email" data={user.email} />
            <DetailUserInformation label="Telefone" data={user.phone} />
          </div>
        </section>

        <section className="space-y-3">
          <h3 className="text-sm font-semibold text-foreground">
            Dados do perfil
          </h3>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <UserSpecificDetail user={user} />
          </div>
        </section>
      </CardContent>
    </Card>
  );
}
