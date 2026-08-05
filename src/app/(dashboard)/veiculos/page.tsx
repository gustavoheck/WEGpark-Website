"use client"

import { Button } from "@/components/ui/button";
import VehicleList from "@/features/vehicles/components/organisms/VehicleList";
import { useVehiclePermissions } from "@/features/vehicles/hooks/useVehiclePermissions";
import SectionTitle from "@/shared/components/atoms/SectionTitle";
import Filter, { FilterParams } from "@/shared/components/molecules/Filter";
import { Plus } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import { useSidebar } from "@/components/ui/sidebar";
import { useGetMyVehicles, useGetVehicles } from "@/features/vehicles/hooks/useGetVehicles";
import { VEHICLE_CATEGORIES } from "@/features/vehicles/constants/vehicleFilters";

const MAX_VISIBLE_PAGES = 5;

export default function VehiclePage() {
    const { canAdd, isGuard } = useVehiclePermissions()
    const { open } = useSidebar();
    const [filterParams, setFilterParams] = useState<FilterParams>()
    const [page, setPage] = useState(0);
    const allVehiclesQuery = useGetVehicles(filterParams, isGuard, { page });
    const myVehiclesQuery = useGetMyVehicles(!isGuard);
    const { vehicles, isSearching, isError, pagination } = isGuard ? allVehiclesQuery : myVehiclesQuery;
    const totalPages = pagination?.totalPages ?? 0;
    const windowStart = Math.max(0, Math.min(page - 2, totalPages - MAX_VISIBLE_PAGES));
    const windowEnd = Math.min(totalPages, windowStart + MAX_VISIBLE_PAGES);
    const visiblePages = Array.from(
        { length: Math.max(0, windowEnd - windowStart) },
        (_, index) => windowStart + index,
    );

    function handleFilterSubmit(params: FilterParams) {
        setPage(0);
        setFilterParams(params);
    }

    return (
        <>
            <SectionTitle text="veículos" />

            {isGuard && (
                <Filter filters={VEHICLE_CATEGORIES} onSubmit={handleFilterSubmit} />
            )}

            <VehicleList vehicles={vehicles} isLoading={isSearching} />

            {isError ? (
                <p className="py-8 text-center text-muted-foreground">NÃ£o foi possÃ­vel carregar os veÃ­culos.</p>
            ) : null}

            {isGuard && totalPages > 1 ? (
                <Pagination className="mt-6 pb-4">
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious
                                onClick={() => setPage((current) => Math.max(0, current - 1))}
                                className={pagination?.first ? "pointer-events-none opacity-50" : "cursor-pointer"}
                            />
                        </PaginationItem>

                        {visiblePages.map((pageNumber) => (
                            <PaginationItem key={pageNumber}>
                                <PaginationLink
                                    onClick={() => setPage(pageNumber)}
                                    isActive={pageNumber === page}
                                    className="cursor-pointer"
                                >
                                    {pageNumber + 1}
                                </PaginationLink>
                            </PaginationItem>
                        ))}

                        <PaginationItem>
                            <PaginationNext
                                onClick={() => setPage((current) => Math.min(totalPages - 1, current + 1))}
                                className={pagination?.last ? "pointer-events-none opacity-50" : "cursor-pointer"}
                            />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            ) : null}

            {canAdd && (
                <Link href="/veiculos/adicionar">
                    <Button className="fixed bottom-4 right-4 text-xl rounded-sm py-6 font-bold z-50 w-fit" variant="default">
                        <Plus className="size-7" />
                        Cadastrar Veículo
                    </Button>
                </Link>
            )}
        </>
    )
}
