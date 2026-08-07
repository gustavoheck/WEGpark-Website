import { Button } from "@/components/ui/button";
import type Vehicle from "@/shared/types/Vehicle";

type ConfirmedVehicleCardProps = {
  vehicle: Vehicle;
  onChangeVehicle: () => void;
};

export default function ConfirmedVehicleCard({
  vehicle,
  onChangeVehicle,
}: ConfirmedVehicleCardProps) {
  return (
    <div className="rounded-xl border border-primary/20 bg-primary/5 p-4 md:col-span-2">
      <p className="font-semibold">Veículo confirmado</p>

      <p className="text-sm text-muted-foreground">
        {vehicle.plate} · {vehicle.brand} {vehicle.model} · {vehicle.color}
      </p>

      <Button
        type="button"
        variant="link"
        className="px-0"
        onClick={onChangeVehicle}
      >
        Alterar veículo
      </Button>
    </div>
  );
}
