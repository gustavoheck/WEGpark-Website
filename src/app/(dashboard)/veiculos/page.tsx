import VehicleList from "@/features/vehicles/components/organisms/VehicleList";
import VehicleListMock from "@/features/vehicles/mocks/VehicleListMock";
import Vehicle from "@/features/vehicles/types/Vehicle";

const vehicles: Vehicle[] = VehicleListMock

export default function Vehicles() {
    return (
        <VehicleList vehicles={vehicles}/>

    )
}