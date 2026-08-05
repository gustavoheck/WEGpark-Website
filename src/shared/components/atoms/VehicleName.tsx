interface VehicleNameProps {
  brand: string;
  model: string;
}

export default function VehicleName({ brand, model }: VehicleNameProps) {
  return (
    <p className="min-w-0 break-words text-base text-muted-foreground sm:text-lg">
      {brand} <span className="font-medium text-foreground">{model}</span>
    </p>
  );
}
