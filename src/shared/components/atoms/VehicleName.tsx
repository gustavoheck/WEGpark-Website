interface VehicleNameProps {
  brand: string;
  model: string;
}

export default function VehicleName({ brand, model }: VehicleNameProps) {
  return (
    <p className="min-w-0 break-words text-sm text-muted-foreground min-[380px]:text-base">
      {brand} <span className="font-medium text-foreground">{model}</span>
    </p>
  );
}
