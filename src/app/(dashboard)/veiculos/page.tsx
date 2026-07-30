"use client"

import { Button } from "@/components/ui/button";
import VehicleList from "@/features/vehicles/components/organisms/VehicleList";
import { useVehiclePermissions } from "@/features/vehicles/hooks/useVehiclePermissions";
import SectionTitle from "@/shared/components/atoms/SectionTitle";
import Filter, { FilterParams } from "@/shared/components/molecules/Filter";
import { Plus } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useSidebar } from "@/components/ui/sidebar";
import { cn } from "@/shared/lib/utils";
import { useGetVehicles } from "@/features/vehicles/hooks/useGetVehicles";
import { VEHICLE_CATEGORIES } from "@/features/vehicles/constants/vehicleFilters";

export default function VehiclePage() {
    const { canAdd, isGuard } = useVehiclePermissions()
    const { open } = useSidebar();
    const [filterParams, setFilterParams] = useState<FilterParams>()
    const { vehicles, isSearching } = useGetVehicles(filterParams);

    function handleFilterSubmit(params: FilterParams) {
        setFilterParams(params);
    }

    return (
        <>
            <SectionTitle text="veículos" />

            {isGuard && (
                <Filter filters={VEHICLE_CATEGORIES} onSubmit={handleFilterSubmit} />
            )}

            <VehicleList vehicles={vehicles} isLoading={isSearching} />

            {canAdd && (
                <Link href="/veiculos/adicionar">
                    <Button className={cn("fixed bottom-4 right-4 text-xl rounded-sm py-6 font-bold z-50", open ? "left-68" : "left-4")} variant="default">
                        <Plus className="size-7" />
                        Cadastrar Usuário
                    </Button>
                </Link>
            )}
        </>
    )
}
