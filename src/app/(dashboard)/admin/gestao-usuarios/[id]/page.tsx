"use client";

import { useParams } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import BackButton from "@/shared/components/atoms/BackButton";
import SectionTitle from "@/shared/components/atoms/SectionTitle";

import { useUser } from "@/features/admin-user-management/hooks/useUserManagement";
import DetailUser from "@/features/admin-user-management/components/organisms/DetailUser";

export default function VisualizarUsuarioPage() {
    const { id } = useParams<{ id: string }>();
    const { data: user, isPending, isError } = useUser(id);

    return (
        <section>
            <div className="flex items-center w-full pt-8 pb-10 gap-3 relative justify-center">
                <BackButton />
                <SectionTitle text="dados do usuário" className="py-0" />
            </div>

            {isPending && <Skeleton className="h-96 w-full" />}
            {isError && <p className="text-sm text-destructive">Não foi possível carregar o usuário.</p>}
            {!isPending && !isError && user && <DetailUser user={user} />}
        </section>
    );
}