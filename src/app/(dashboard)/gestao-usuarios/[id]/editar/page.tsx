// app/(dashboard)/gestao-usuarios/[id]/editar/page.tsx
"use client";

import { useParams, useSearchParams } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import BackButton from "@/shared/components/atoms/BackButton";
import SectionTitle from "@/shared/components/atoms/SectionTitle";

import { useUser } from "@/features/user-management/hooks/useUserManagement";
import EditUserForm from "@/features/user-management/components/organisms/EditUserForm";
import { UserRole } from "@/features/user-management/types/User";

export default function EditarUsuarioPage() {
    const { id } = useParams<{ id: string }>();
    const role = useSearchParams().get("role") as UserRole | null;
    const { data: user, isPending, isError } = useUser(id, role);

    return (
        <section>
            <div className="flex items-center w-full pt-8 pb-10 gap-3 relative justify-center">
                <BackButton />
                <SectionTitle text="editar usuário" className="py-0" />
            </div>

            {isPending && (
                <Skeleton className="h-96 w-full" /> 
            )}
            
            {isError && (
                <p className="text-sm text-destructive">Não foi possível carregar o usuário.</p> 
            )}

            {!isPending && !isError && user && (
                <EditUserForm user={user} /> 
            )}
        </section>
    );
}