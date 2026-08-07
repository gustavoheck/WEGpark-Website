"use client";

import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import ProfilePicture from "@/shared/components/atoms/ProfilePicture";
import SectionTitle from "@/shared/components/atoms/SectionTitle";
import { cn } from "@/shared/lib/utils";

import { useProfile } from "../../hooks/useProfile";
import { ProfileDetailField } from "../molecules/ProfileDetailField";

export function ProfileView() {
  const { data: profile, isPending, isError } = useProfile();

  return (
    <section>
      <SectionTitle text="Dados do Perfil" />

      {!isPending && !isError && profile ? (
        <div className="flex flex-col items-center">
          <ProfilePicture
            name={profile.name}
            variant="secondary"
            className="mb-8 h-40 w-40 text-6xl"
          />
        </div>
      ) : null}

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
              <ProfileDetailField label="Telefone" value={profile.telephone} />

              {profile.parkUserType === "GUARD" ? (
                <>
                  <ProfileDetailField
                    label="Número do crachá"
                    value={profile.badgeNumber}
                  />
                  <ProfileDetailField label="Local" value={profile.location} />
                  <ProfileDetailField label="Chefia" value={profile.boss} />
                </>
              ) : profile.parkUserType === "RH" ? (
                <ProfileDetailField
                  label="Crachá"
                  value={profile.badgeNumber}
                />
              ) : profile.parkUserType === "VISITOR" ? (
                <>
                  <ProfileDetailField
                    label="Empresa"
                    value={profile.companyName}
                  />
                  <ProfileDetailField label="CPF" value={profile.cpf} />
                </>
              ) : (
                <>
                  <ProfileDetailField
                    label="Setor"
                    value={profile.department}
                  />
                  <ProfileDetailField
                    label="Crachá"
                    value={profile.badgeNumber}
                  />
                </>
              )}
            </>
          ) : null}

          {!isPending && !isError && profile && profile.parkUserType !== "GUARD" ? (
            <Link
              href="/perfil/editar"
              className={cn(
                buttonVariants({ variant: "default" }),
                "w-full py-5 text-lg font-bold capitalize",
              )}
            >
              Editar informações
            </Link>
          ) : null}
        </CardContent>
      </Card>
    </section>
  );
}
