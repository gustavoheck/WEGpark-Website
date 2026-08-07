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
            className="mb-5 h-28 w-28 text-4xl"
          />
        </div>
      ) : null}

      <Card
        size="sm"
        className="mx-auto w-full max-w-5xl border-border/70 shadow-sm"
      >
        <CardContent className="grid grid-cols-1 gap-3 p-4 sm:grid-cols-2 lg:grid-cols-3">
          {isPending ? (
            <div className="grid gap-3 sm:col-span-2 lg:col-span-3">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
          ) : null}

          {isError ? (
            <p className="text-sm text-destructive sm:col-span-2 lg:col-span-3">
              Não foi possível carregar seus dados. Tente novamente.
            </p>
          ) : null}

          {!isPending && !isError && profile ? (
            <>
              <ProfileDetailField label="Nome" value={profile.name} />
              <ProfileDetailField
                label="Email"
                value={profile.email}
                className="lg:col-span-2"
              />
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

          {!isPending &&
          !isError &&
          profile &&
          profile.parkUserType !== "GUARD" ? (
            <Link
              href="/perfil/editar"
              className={cn(
                buttonVariants({ variant: "default", size: "lg" }),
                "w-full font-semibold capitalize sm:col-span-2 lg:col-span-3",
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
