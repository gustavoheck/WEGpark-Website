import Vehicle from "@/shared/types/Vehicle";

import VehicleCard from "../molecules/VehicleCard";

interface VehicleListProps {
  vehicles: Vehicle[];
  isLoading: boolean;
}

export default function VehicleList({ vehicles, isLoading }: VehicleListProps) {
  if (isLoading) {
    return (
      <p className="py-8 text-center text-muted-foreground">
        Carregando veículos...
      </p>
    );
  }

  if (!vehicles || vehicles.length === 0) {
    return (
      <p className="py-8 text-center text-muted-foreground">
        Nenhum veículo encontrado.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 pb-24 lg:grid-cols-2 2xl:grid-cols-3">
      {vehicles.map((vehicle) => (
        <VehicleCard key={vehicle.uuid} vehicle={vehicle} />
      ))}
    </div>
  );
}
