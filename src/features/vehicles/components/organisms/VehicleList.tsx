import SectionTitle from "@/shared/components/atoms/SectionTitle";
import Vehicle from "../../../../shared/types/Vehicle";
import VehicleCard from "../molecules/VehicleCard";

interface VehicleListProps {
    vehicles: Vehicle[]
}

export default function VehicleList({ vehicles }: VehicleListProps) {
    return (
        <section>
            <SectionTitle text="Meus Veículos" />
            <div className="flex flex-col gap-4 pb-24">
                {vehicles.map((vehicle) => {
                    return (
                        <VehicleCard key={vehicle.uuid} vehicle={vehicle} />
                    )
                })}
            </div>

        </section>

    )

}