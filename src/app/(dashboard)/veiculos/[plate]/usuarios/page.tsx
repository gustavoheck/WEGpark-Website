"use client";

import { useParams } from "next/navigation";
import UserList from "@/features/vehicles/components/organisms/UserList";
import { useGetVehicles } from "@/features/vehicles/hooks/useGetVehicles";
import BackButton from "@/shared/components/atoms/BackButton";
import SectionTitle from "@/shared/components/atoms/SectionTitle";

export default function VehicleUsersPage() {
  const params = useParams<{ plate: string }>();
  const plate = decodeURIComponent(params.plate ?? "").trim().toUpperCase();
  const { vehicles, isSearching, isError } = useGetVehicles(
    { category: "plate", value: plate },
    Boolean(plate),
    { page: 0, size: 1 },
  );
  const vehicle = vehicles.find((item) => item.plate.trim().toUpperCase() === plate);

  return (
    <section>
      <div className="flex items-center w-full pt-8 pb-10 gap-3 relative justify-center">
        <BackButton />
        <SectionTitle text="usuários do veículo" className="py-0" />
      </div>

      {isSearching ? <p className="text-center text-muted-foreground">Carregando veículo...</p> : null}
      {isError ? <p className="text-center text-destructive">Não foi possível carregar o veículo.</p> : null}
      {!isSearching && !isError && !vehicle ? (
        <p className="text-center text-muted-foreground">Veículo não encontrado.</p>
      ) : null}
      {vehicle ? <UserList users={vehicle.users} /> : null}
    </section>
  );
}
