// features/profile/components/organisms/ProfileView.tsx
"use client";

import Link from "next/link";

import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

import SectionTitle from "@/shared/components/atoms/SectionTitle";

import { useProfile } from "../../hooks/useProfile";
import { ProfileDetailField } from "../molecules/ProfileDetailField";
import FormButton from "@/shared/components/atoms/FormButton";
import ProfilePicture from "@/shared/components/atoms/ProfilePicture";

export function ProfileView() {
    const { data: profile, isPending, isError } = useProfile();

    return (
        <section>
            <SectionTitle text="Dados do Perfil" />
            {!isPending && !isError && profile ? (
                <div className="flex flex-col items-center">
                    <ProfilePicture name={profile?.name} variant="secondary" className="w-40 h-40 text-6xl mb-8"/>
                </div>
            ): null}
            <Card>
                <CardContent className="flex flex-col gap-4">
                    {isPending ? (
                        <div className="flex flex-col gap-4">
                            <Skeleton className="h-10 w-full" />
                            <Skeleton className="h-10 w-full" />
                            <Skeleton className="h-10 w-full" />
                        </div>
                    ) : null}

                    {isError ? (
                        <p className="text-sm text-destructive">
                            Não foi possível carregar seus dados. Tente novamente.
                        </p>
                    ) : null}

                    {!isPending && !isError && profile ? (
                        <>
                            <ProfileDetailField label="Nome" value={profile.name} />
                            <ProfileDetailField label="Email" value={profile.email} />

                            {profile.role === "VISITOR" ? (
                                <>
                                    <ProfileDetailField label="Empresa" value={profile.companyName} />
                                    <ProfileDetailField label="Cpf" value={profile.cpf} />
                                </>
                            ) : (
                                <>
                                    <ProfileDetailField label="Setor" value={profile.department} />
                                    <ProfileDetailField label="Crachá" value={profile.badgeNumber} />
                                </>
                            )}
                        </>
                    ) : null}
                    {!isPending && !isError ? (
                        <Link href="/perfil/editar">
                            <FormButton text="editar informações" disabled={false} />
                        </Link>
                    ) : null}
                </CardContent>
            </Card>


        </section>
    );
}
