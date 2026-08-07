"use client";

import { AlertTriangle, CarFront, Users } from "lucide-react";
import { useParams } from "next/navigation";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import UserList from "@/features/vehicles/components/users/UserList";
import {
  useGetMyVehicles,
  useGetVehicles,
} from "@/features/vehicles/hooks/useGetVehicles";
import { useVehiclePermissions } from "@/features/vehicles/hooks/useVehiclePermissions";
import BackButton from "@/shared/components/atoms/BackButton";
import SectionTitle from "@/shared/components/atoms/SectionTitle";
import { DisplayCard } from "@/shared/components/molecules/DisplayCard";

export default function VehicleUsersPage() {
  const params = useParams<{ plate: string }>();
  const { canViewAllVehicles } = useVehiclePermissions();
  const plate = decodeURIComponent(params.plate ?? "").trim().toUpperCase();
  const allVehiclesQuery = useGetVehicles(
    { category: "plate", value: plate },
    Boolean(plate) && canViewAllVehicles,
    { page: 0, size: 1 },
  );
  const myVehiclesQuery = useGetMyVehicles(
    Boolean(plate) && !canViewAllVehicles,
  );
  const { vehicles, isSearching, isError } = canViewAllVehicles
    ? allVehiclesQuery
    : myVehiclesQuery;
  const vehicle = vehicles.find(
    (item) => item.plate.trim().toUpperCase() === plate,
  );
  const activeUsers =
    vehicle?.vehicleUsers.filter((user) => user.associationActive) ?? [];
  const activeUserCount = activeUsers.length;

  return (
    <section className="mx-auto w-full max-w-5xl pb-8">
      <div className="relative flex w-full items-center justify-center gap-3 pb-8 pt-6 sm:pb-10 sm:pt-8">
        <BackButton />
        <SectionTitle text="usuários do veículo" className="py-0" />
      </div>

      {isSearching ? (
        <Skeleton className="h-40 w-full" />
      ) : null}
      {!isSearching && isError ? (
        <DisplayCard
          Icon={AlertTriangle}
          title="Não foi possível carregar o veículo"
          description="Tente novamente mais tarde."
          destructive
        />
      ) : null}
      {!isSearching && !isError && !vehicle ? (
        <DisplayCard
          Icon={CarFront}
          title="Veículo não encontrado"
          description="Verifique a placa informada e tente novamente."
        />
      ) : null}
      {!isSearching && !isError && vehicle ? (
        <div className="space-y-5">
          <Card className="gap-0 overflow-hidden border-border/70 py-0 shadow-sm">
            <CardContent className="flex flex-col gap-4 bg-muted/20 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
              <div className="flex min-w-0 items-center gap-3">
                <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                  <CarFront className="size-6" />
                </div>
                <div className="min-w-0">
                  <p className="truncate text-lg font-bold tracking-wide text-foreground">
                    {vehicle.plate}
                  </p>
                  <p className="truncate text-sm text-muted-foreground">
                    {vehicle.brand} {vehicle.model}
                  </p>
                </div>
              </div>

              <Badge
                variant="outline"
                className="flex w-fit items-center gap-1.5 bg-background px-3 py-1.5"
              >
                <Users className="size-3.5" />
                {activeUserCount} {activeUserCount === 1 ? "usuário" : "usuários"}
              </Badge>
            </CardContent>
          </Card>

          {activeUsers.length > 0 ? (
            <UserList users={activeUsers} />
          ) : (
            <DisplayCard
              Icon={Users}
              title="Nenhum usuário vinculado"
              description="Os usuários ativos deste veículo aparecerão aqui."
            />
          )}
        </div>
      ) : null}
    </section>
  );
}
