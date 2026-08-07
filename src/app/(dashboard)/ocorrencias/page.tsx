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
import OccurrenceList from "@/features/occurrences/components/organisms/OccurrenceList";
import {
  useGetMyOccurrences,
  useGetOccurrences,
} from "@/features/occurrences/hooks/useOccurrence";
import FloatingActionLink from "@/shared/components/atoms/FloatingActionLink";
import SectionTitle from "@/shared/components/atoms/SectionTitle";
import Filter, { type FilterParams } from "@/shared/components/molecules/Filter";
import { canAccessRoute } from "@/shared/config/accessControl";
import { useAuth } from "@/shared/context/AuthContext";
import { SystemRole } from "@/shared/enum/SystemRoleType";
import type FilterCategory from "@/shared/types/FilterCategory";

const MAX_VISIBLE_PAGES = 5;

const occurrenceFilters: FilterCategory[] = [
  { text: "Placa", value: "plate" },
  { text: "Data", value: "yearMonth" },
  { text: "Portaria", value: "gate" },
  { text: "Tipo", value: "occurrenceType" },
  { text: "Local", value: "location" },
];

export default function OccurrencesPage() {
  const { user } = useAuth();
  const [filterParams, setFilterParams] = useState<FilterParams>();
  const [page, setPage] = useState(0);

  const canViewAllOccurrences = Boolean(
    user &&
      (user.currentRole === SystemRole.GUARD ||
        user.currentRole === SystemRole.RH ||
        user.currentRole === SystemRole.ADMIN),
  );
  const canCreate = user
    ? canAccessRoute(user.currentRole, "/ocorrencias/cadastrar")
    : false;

  const allOccurrencesQuery = useGetOccurrences(
    filterParams,
    canViewAllOccurrences,
    { page },
  );
  const myOccurrencesQuery = useGetMyOccurrences(
    Boolean(user) && !canViewAllOccurrences,
    { page },
  );
  const { occurrences, isLoading, isError, pagination } = canViewAllOccurrences
    ? allOccurrencesQuery
    : myOccurrencesQuery;

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
      <SectionTitle text="ocorrências" />

      {canCreate ? (
        <FloatingActionLink
          href="/ocorrencias/cadastrar"
          label="Cadastrar ocorrência"
          Icon={Plus}
        />
      ) : null}

      {canViewAllOccurrences ? (
        <Filter filters={occurrenceFilters} onSubmit={handleFilterSubmit} />
      ) : null}

      <OccurrenceList occurrences={occurrences} isLoading={isLoading} />

      {isError ? (
        <p className="py-8 text-center text-muted-foreground">
          Não foi possível carregar as ocorrências.
        </p>
      ) : null}

      {totalPages > 1 ? (
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
