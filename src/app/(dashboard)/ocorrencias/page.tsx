"use client";

import { useState } from "react";
import { AlertTriangle, Plus, StickyNote } from "lucide-react";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Skeleton } from "@/components/ui/skeleton";
import OccurrenceList from "@/features/occurrences/components/view/OccurrenceList";
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
import { DisplayCard } from "@/shared/components/molecules/DisplayCard";
import { occurrenceFilters } from "@/features/occurrences/constants/occurrence-filters";

const MAX_VISIBLE_PAGES = 5;

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

      {canViewAllOccurrences &&
      !isError &&
      (occurrences.length > 0 || Boolean(filterParams)) ? (
        <Filter filters={occurrenceFilters} onSubmit={handleFilterSubmit} />
      ) : null}

      {isLoading && occurrences.length === 0 && (
        <div className="flex flex-col gap-3">
          <Skeleton className="h-24 w-full md:h-16" />
          <Skeleton className="h-24 w-full md:h-16" />
          <Skeleton className="h-24 w-full md:h-16" />
        </div>
      )}

      {!isError && occurrences.length > 0 && (
        <OccurrenceList occurrences={occurrences} />
      )}

      {isError && (
        <DisplayCard
          Icon={AlertTriangle}
          title="Não foi possível carregar as ocorrências."
          description="Tente carregá-las novamente."
          destructive
        />
      )}

      {!isLoading && !isError && occurrences.length === 0 && (
        <DisplayCard
          Icon={StickyNote}
          title={
            filterParams
              ? "Nenhuma ocorrência encontrada"
              : "Nenhuma ocorrência cadastrada"
          }
          description={
            filterParams
              ? "Tente alterar os filtros da pesquisa."
              : "Novas ocorrências aparecerão aqui quando forem cadastradas."
          }
        />
      )}

      {canCreate && (
        <FloatingActionLink
          href="/ocorrencias/cadastrar"
          label="Cadastrar ocorrência"
          Icon={Plus}
        />
      )}

      {!isError && totalPages > 1 ? (
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
