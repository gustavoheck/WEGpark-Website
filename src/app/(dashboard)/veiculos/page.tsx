"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import VehicleList from "@/features/vehicles/components/organisms/VehicleList";
import { VEHICLE_CATEGORIES } from "@/features/vehicles/constants/vehicleFilters";
import {
  useGetMyVehicles,
  useGetVehicles,
} from "@/features/vehicles/hooks/useGetVehicles";
import { useVehiclePermissions } from "@/features/vehicles/hooks/useVehiclePermissions";
import SectionTitle from "@/shared/components/atoms/SectionTitle";
import FloatingActionLink from "@/shared/components/atoms/FloatingActionLink";
import Filter, { FilterParams } from "@/shared/components/molecules/Filter";

const MAX_VISIBLE_PAGES = 5;

export default function VehiclePage() {
  const { canAdd, canViewAllVehicles } = useVehiclePermissions();
  const [filterParams, setFilterParams] = useState<FilterParams>();
  const [page, setPage] = useState(0);
  const allVehiclesQuery = useGetVehicles(filterParams, canViewAllVehicles, {
    page,
  });
  const myVehiclesQuery = useGetMyVehicles(!canViewAllVehicles);
  const { vehicles, isSearching, isError, pagination } = canViewAllVehicles
    ? allVehiclesQuery
    : myVehiclesQuery;
  const totalPages = pagination?.totalPages ?? 0;
  const windowStart = Math.max(
    0,
    Math.min(page - 2, totalPages - MAX_VISIBLE_PAGES),
  );
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

      {canViewAllVehicles ? (
        <Filter filters={VEHICLE_CATEGORIES} onSubmit={handleFilterSubmit} />
      ) : null}

      <VehicleList vehicles={vehicles} isLoading={isSearching} />

      {isError ? (
        <p className="py-8 text-center text-muted-foreground">
          Não foi possível carregar os veículos.
        </p>
      ) : null}

      {canViewAllVehicles && totalPages > 1 ? (
        <Pagination className="mt-6 pb-4">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => setPage((current) => Math.max(0, current - 1))}
                className={
                  pagination?.first
                    ? "pointer-events-none opacity-50"
                    : "cursor-pointer"
                }
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
                onClick={() =>
                  setPage((current) => Math.min(totalPages - 1, current + 1))
                }
                className={
                  pagination?.last
                    ? "pointer-events-none opacity-50"
                    : "cursor-pointer"
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      ) : null}

      {canAdd ? (
        <FloatingActionLink
          href="/veiculos/adicionar"
          label="Cadastrar Veículo"
          Icon={Plus}
        />
      ) : null}
    </>
  );
}
