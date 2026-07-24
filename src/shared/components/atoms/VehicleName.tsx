
interface VehicleNameProps {
    brand: string
    model: string
}

export default function VehicleName({ brand, model }: VehicleNameProps) {
    return (
        <p className="text-lg text-muted-foreground">
            {brand} <span className="font-medium text-foreground">{model}</span>
        </p>
    )
}