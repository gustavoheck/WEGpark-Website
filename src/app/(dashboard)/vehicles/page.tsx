import VehicleCard from "@/features/vehicles/components/molecules/VehicleCard";
import Vehicle from "@/features/vehicles/types/Vehicle";

const vehicle : Vehicle = {
    plate : "IQK1010",
    model : "Beetle",
    brand : "Volkswagen",
    ownerId : 1,
    color : "Branco"
}

export default function Vehicles () {
    return (
        <section className="m-[5%]">
            <VehicleCard
            vehicle={vehicle}
         />
        </section>
        
    )
}