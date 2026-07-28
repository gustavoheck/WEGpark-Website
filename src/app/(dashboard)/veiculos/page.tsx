"use client"

import { Button } from "@/components/ui/button";
import VehicleList from "@/features/vehicles/components/organisms/VehicleList";
import { useVehicles } from "@/features/vehicles/hooks/useVehicle";
import { useVehiclePermissions } from "@/features/vehicles/hooks/useVehiclePermissions";
import SectionTitle from "@/shared/components/atoms/SectionTitle";
import Filter, { FilterParams } from "@/shared/components/molecules/Filter";
import VehicleListMock from "@/shared/mocks/VehicleListMock";
import FilterCategory from "@/shared/types/FilterCategory";
import Vehicle from "@/shared/types/Vehicle";
import { Plus } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const filterCategories: FilterCategory[] = [
  { text: "Placa", value: "plate" },
  { text: "Modelo", value: "model" },
  { text: "Marca", value: "brand" },
  { text: "Cor", value: "color" },
];

const vehicles: Vehicle[] = VehicleListMock

export default function VehiclePage() {
    const { canAdd, isGuard } = useVehiclePermissions()

    const [filterParams, setFilterParams] = useState<FilterParams>()
    const { data: vehicles = [], isLoading } = useVehicles(filterParams);

    function handleFilterSubmit(params: FilterParams) {
        setFilterParams(params);
    }

    return (
        <>
            <SectionTitle text="veículos" />

            {isGuard && (
                <Filter filters={filterCategories} onSubmit={handleFilterSubmit} />
            )}

            <VehicleList vehicles={vehicles} isLoading={isLoading} />

            {canAdd && (
                <Link href="/veiculos/adicionar">
                    <Button className="fixed bottom-4 left-4 right-4 text-xl rounded-sm py-6 font-bold z-50">
                        <Plus className="size-7" />
                        Cadastrar Veículo
                    </Button>
                </Link>
            )}
        </>
    )
}
