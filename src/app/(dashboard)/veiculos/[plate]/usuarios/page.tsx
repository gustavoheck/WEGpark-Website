"use client";

import { useParams } from "next/navigation";

import UserList from "@/features/vehicles/components/organisms/UserList";
import {
  useGetMyVehicles,
  useGetVehicles,
} from "@/features/vehicles/hooks/useGetVehicles";
import { useVehiclePermissions } from "@/features/vehicles/hooks/useVehiclePermissions";
import BackButton from "@/shared/components/atoms/BackButton";
import SectionTitle from "@/shared/components/atoms/SectionTitle";

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

  return (
    <section>
      <div className="relative flex w-full items-center justify-center gap-3 pt-8 pb-10">
        <BackButton />
        <SectionTitle text="usuarios do veiculo" className="py-0" />
      </div>

      {isSearching ? (
        <p className="text-center text-muted-foreground">Carregando veiculo...</p>
      ) : null}
      {isError ? (
        <p className="text-center text-destructive">
          Nao foi possivel carregar o veiculo.
        </p>
      ) : null}
      {!isSearching && !isError && !vehicle ? (
        <p className="text-center text-muted-foreground">
          Veiculo nao encontrado.
        </p>
      ) : null}
      {vehicle ? (
        <UserList users={vehicle.vehicleUsers} />
      ) : null}
    </section>
  );
}
