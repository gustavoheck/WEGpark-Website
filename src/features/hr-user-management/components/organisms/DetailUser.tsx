// features/hr-user-management/components/organisms/DetailUser.tsx
"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { UserDetailDTO } from "../../types/User";
import UserDetailsLabel from "../atoms/UserDetailsLabel";
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
        <Card className="mb-8">
            <CardHeader>
                <h2 className="font-medium text-2xl text-center text-primary">{roleLabels[user.role]}</h2>
            </CardHeader>
            <CardContent className="flex flex-col gap-2 px-4">
                <DetailUserInformation label="Nome" data={user.name} />
                <DetailUserInformation label="Email" data={user.email} />
                <DetailUserInformation label="Telefone" data={user.phone} />

                <div>
                    <UserDetailsLabel text="Dados Específicos" />
                </div>
                <UserSpecificDetail user={user} />
            </CardContent>
        </Card>
    );
}