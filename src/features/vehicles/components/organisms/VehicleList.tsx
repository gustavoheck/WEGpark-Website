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
    <div className="flex flex-col gap-3 mb-24 md:gap-0 md:overflow-hidden md:rounded-xl md:bg-card md:ring-1 md:ring-foreground/10">
      <div className="hidden grid-cols-[minmax(0,1.3fr)_minmax(7rem,0.7fr)_auto] items-center gap-3 border-b bg-muted/50 px-4 py-2 text-xs font-semibold text-muted-foreground md:grid">
        <span>Veículo</span>
        <span>Cor e vínculo</span>
        <span className="text-right">Ações</span>
      </div>

      {vehicles.map((vehicle) => (
        <VehicleCard key={vehicle.uuid} vehicle={vehicle} />
      ))}
    </div>
  );
}
