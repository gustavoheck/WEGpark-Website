
"use client";

import Link from "next/link";

import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

import SectionTitle from "@/shared/components/atoms/SectionTitle";
import FormButton from "@/shared/components/atoms/FormButton";
import ProfilePicture from "@/shared/components/atoms/ProfilePicture";

import { useProfile } from "../../hooks/useProfile";
import { ProfileDetailField } from "../molecules/ProfileDetailField";

export function ProfileView() {
    const { data: profile, isPending, isError } = useProfile();

    const canRender = !isPending && !isError && profile;

    return (
        <section>
            <SectionTitle text="Dados do Perfil" />

            {canRender && (
                <div className="flex flex-col items-center">
                    <ProfilePicture
                        name={profile.name}
                        variant="secondary"
                        className="w-40 h-40 text-6xl mb-8"
                    />
                </div>
            )}

            <Card>
                <CardContent className="flex flex-col gap-4">
                    {isPending && (
                        <div className="flex flex-col gap-4">
                            <Skeleton className="h-10 w-full" />
                            <Skeleton className="h-10 w-full" />
                            <Skeleton className="h-10 w-full" />
                        </div>
                    )}

                    {isError && (
                        <p className="text-sm text-destructive">
                            Não foi possível carregar seus dados. Tente novamente.
                        </p>
                    )}

                    {canRender && (
                        <>
                            <ProfileDetailField label="Nome" value={profile.name} />
                            <ProfileDetailField label="Email" value={profile.email} />

                            {profile.role === "VISITOR" ? (
                                <>
                                    <ProfileDetailField label="Empresa" value={profile.companyName} />
                                    <ProfileDetailField label="CPF" value={profile.cpf} />
                                </>
                            ) : (
                                <>
                                    <ProfileDetailField label="Setor" value={profile.department} />
                                    <ProfileDetailField label="Crachá" value={profile.badgeNumber} />
                                </>
                            )}

                            <Link href="/perfil/editar">
                                <FormButton
                                    text="editar informações"
                                    disabled={false}
                                />
                            </Link>
                        </>
                    )}
                </CardContent>
            </Card>

        </section>
    );
}