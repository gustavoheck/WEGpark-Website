import SectionTitle from "@/shared/components/atoms/SectionTitle";
import Vehicle from "../../../../shared/types/Vehicle";
import VehicleCard from "../molecules/VehicleCard";
import Filter, { FilterParams } from "@/shared/components/molecules/Filter";
import FilterCategory from "@/shared/types/FilterCategory";
import { toast } from "@/components/ui/toast";

interface VehicleListProps {
    vehicles: Vehicle[],
    isLoading: boolean
}

const filters: FilterCategory[] = [
    {
        text: "Placa",
        value: "plate"
    },
    {
        text: "Modelo",
        value: "model"
    },
    {
        text: "Marca",
        value: "brand"
    },
    {
        text: "Cor",
        value: "color"
    }
]

export default function VehicleList({ vehicles, isLoading }: VehicleListProps) {

    if (isLoading) {
        return <p className="text-center py-8 text-muted-foreground">Carregando veículos...</p>;
    }

    if (!vehicles || vehicles.length === 0) {
        return <p className="text-center py-8 text-muted-foreground">Nenhum veículo encontrado.</p>;
    }

    return (
        <div className="flex flex-col gap-4 pb-24">
            {vehicles.map((vehicle) => {
                return (
                    <VehicleCard key={vehicle.uuid} vehicle={vehicle} />
                )
            })}
        </div>
    )

}