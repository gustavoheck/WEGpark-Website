"use client";

import { useState } from "react";
import { AlertTriangle, Car, Plus } from "lucide-react";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import VehicleList from "@/features/vehicles/components/view/VehicleList";
import { VEHICLE_CATEGORIES } from "@/features/vehicles/constants/vehicleFilters";
import {
  useGetMyVehicles,
  useGetVehicles,
} from "@/features/vehicles/hooks/useGetVehicles";
import { useVehiclePermissions } from "@/features/vehicles/hooks/useVehiclePermissions";
import SectionTitle from "@/shared/components/atoms/SectionTitle";
import FloatingActionLink from "@/shared/components/atoms/FloatingActionLink";
import Filter, { FilterParams } from "@/shared/components/molecules/Filter";
import { DisplayCard } from "@/shared/components/molecules/DisplayCard";

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

      {canViewAllVehicles && !isError && vehicles.length != 0 && (
        <Filter filters={VEHICLE_CATEGORIES} onSubmit={handleFilterSubmit} />
      )}

      {!isError && vehicles.length != 0 && (
        <VehicleList vehicles={vehicles} />
      )}

      {isError && (
        <DisplayCard 
          Icon={AlertTriangle}
          title="Não foi possível carregar os veículos."
          description="Tente carrega-los novamente"
          destructive
        />
      )}

      {!isError && vehicles.length === 0 && (
        <DisplayCard 
          Icon={Car}
          title="Nenhum veículo cadastrado no momento."
          description="Veículos novos serão disponibilizados assim quando cadastrados."
        />
      )}

      {canAdd && (
        <FloatingActionLink
          href="/veiculos/adicionar"
          label="Cadastrar Veículo"
          Icon={Plus}
        />
      )}

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
    </>
  );
}
