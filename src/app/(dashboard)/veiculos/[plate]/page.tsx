"use client";

import { useParams } from "next/navigation";
import { CarFront, Check } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  useGetMyVehicles,
  useGetVehicles,
} from "@/features/vehicles/hooks/useGetVehicles";
import { useVehiclePermissions } from "@/features/vehicles/hooks/useVehiclePermissions";
import BackButton from "@/shared/components/atoms/BackButton";
import SectionTitle from "@/shared/components/atoms/SectionTitle";
import { useAuth } from "@/shared/context/AuthContext";

function VehicleField({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-border/60 bg-muted/20 p-3.5">
      <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        {label}
      </span>
      <p className="mt-1 text-base font-semibold text-foreground">{value}</p>
    </div>
  );
}

export default function VehicleDetailsPage() {
  const params = useParams<{ plate: string }>();
  const { user } = useAuth();
  const { canViewAllVehicles } = useVehiclePermissions();
  const plate = decodeURIComponent(params.plate ?? "")
    .trim()
    .toUpperCase();
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
  const isOwner = vehicle?.vehicleUsers.some(
    (vehicleUser) =>
      vehicleUser.userUuid === user?.uuid &&
      vehicleUser.isOwner &&
      vehicleUser.associationActive,
  );

  return (
    <section>
      <div className="relative flex w-full items-center justify-center gap-3 pt-8 pb-10">
        <BackButton />
        <SectionTitle text="informações do veículo" className="py-0" />
      </div>

      {isSearching ? (
        <p className="text-center text-muted-foreground">
          Carregando veículo...
        </p>
      ) : null}
      {isError ? (
        <p className="text-center text-destructive">
          Não foi possível carregar o veículo.
        </p>
      ) : null}
      {!isSearching && !isError && !vehicle ? (
        <p className="text-center text-muted-foreground">
          Veículo não encontrado.
        </p>
      ) : null}

      {vehicle ? (
        <Card
          size="sm"
          className="mx-auto mb-6 w-full max-w-5xl border-border/70 shadow-sm"
        >
          <CardHeader className="flex flex-row items-center gap-3 border-b bg-muted/20 pb-4">
            <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <CarFront className="size-5" />
            </div>
            <div className="min-w-0 flex-1">
              <h2 className="truncate text-lg font-semibold text-foreground">
                {vehicle.brand} {vehicle.model}
              </h2>
              <p className="text-sm text-muted-foreground">
                Informações e identificação do veículo
              </p>
            </div>
            {isOwner ? (
              <Badge className="shrink-0 gap-1">
                <Check className="size-3.5" />
                Proprietário
              </Badge>
            ) : null}
          </CardHeader>
          <CardContent className="grid gap-3 px-3 sm:grid-cols-2 lg:grid-cols-4">
            <VehicleField label="Placa" value={vehicle.plate} />
            <VehicleField label="Marca" value={vehicle.brand} />
            <VehicleField label="Modelo" value={vehicle.model} />
            <VehicleField label="Cor" value={vehicle.color} />
          </CardContent>
        </Card>
      ) : null}
    </section>
  );
}
