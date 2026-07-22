import { Button } from "@/components/ui/button";
import VehicleList from "@/features/vehicles/components/organisms/VehicleList";
import VehicleListMock from "@/features/vehicles/mocks/VehicleListMock";
import Vehicle from "@/features/vehicles/types/Vehicle";
import { Plus } from "lucide-react";
import Link from "next/link";

const vehicles: Vehicle[] = VehicleListMock

export default function Vehicles() {
    return (
        <>
            <VehicleList vehicles={vehicles} />
            <Link href="/veiculos/adicionar">
                <Button className="fixed bottom-4 left-4 right-4 text-xl rounded-sm py-6 font-bold z-50">
                    <Plus className="size-7" />
                    Adicionar Veículo
                </Button>
            </Link>
        </>


    )
}