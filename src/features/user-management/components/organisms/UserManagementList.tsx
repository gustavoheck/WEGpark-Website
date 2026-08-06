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
import { Skeleton } from "@/components/ui/skeleton";
import FloatingActionLink from "@/shared/components/atoms/FloatingActionLink";
import SectionTitle from "@/shared/components/atoms/SectionTitle";
import Filter, { FilterParams } from "@/shared/components/molecules/Filter";

import { USER_CATEGORIES } from "../../constants/userFilters";
import { useUserManagementPermissions } from "../../hooks/useUserManagementPermissions";
import { useUsersList } from "../../hooks/useUserManagement";
import UserManagementCard from "../molecules/UserManagementCard";

const MAX_VISIBLE_PAGES = 5;

export function UserManagementList() {
  const [page, setPage] = useState(1);
  const [filterParams, setFilterParams] = useState<FilterParams>();
  const { data, isPending, isError } = useUsersList(page, filterParams);
  const { canAdd } = useUserManagementPermissions();
  const totalPages = data?.totalPages ?? 1;
  const windowStart = Math.max(
    1,
    Math.min(page - 2, totalPages - MAX_VISIBLE_PAGES + 1),
  );
  const windowEnd = Math.min(totalPages, windowStart + MAX_VISIBLE_PAGES - 1);
  const visiblePages = Array.from(
    { length: windowEnd - windowStart + 1 },
    (_, index) => windowStart + index,
  );

  function handleFilterSubmit(params: FilterParams) {
    setPage(1);
    setFilterParams(params);
  }

  return (
    <section>
      <SectionTitle text="gestão usuários" />

      {canAdd ? (
        <FloatingActionLink
          href="/gestao-usuarios/cadastrar"
          label="Cadastrar Usuário"
          Icon={Plus}
        />
      ) : null}

      <Filter filters={USER_CATEGORIES} onSubmit={handleFilterSubmit} />

      <div className="mb-24 flex flex-col gap-3 md:gap-0 md:overflow-hidden md:rounded-xl md:bg-card md:ring-1 md:ring-foreground/10">
        <div className="hidden grid-cols-[minmax(0,1.4fr)_minmax(9rem,0.7fr)_auto] items-center gap-3 border-b bg-muted/50 px-4 py-2 text-xs font-semibold text-muted-foreground md:grid">
          <span>Usuário</span>
          <span>Perfil e status</span>
          <span className="text-right">Ações</span>
        </div>

        {isPending ? (
          <div className="flex flex-col gap-3 md:gap-0">
            <Skeleton className="h-24 w-full md:h-16 md:rounded-none" />
            <Skeleton className="h-24 w-full md:h-16 md:rounded-none" />
            <Skeleton className="h-24 w-full md:h-16 md:rounded-none" />
          </div>
        ) : null}

        {isError ? (
          <p className="px-4 py-8 text-center text-sm text-destructive">
            Não foi possível carregar os usuários.
          </p>
        ) : null}

        {!isPending && !isError && data?.users.length === 0 ? (
          <p className="px-4 py-8 text-center text-sm text-muted-foreground">
            Nenhum usuário encontrado.
          </p>
        ) : null}

        {!isPending && !isError
          ? data?.users.map((user) => (
              <UserManagementCard key={user.id} user={user} />
            ))
          : null}
      </div>

      {!isPending && data && data.totalPages > 1 ? (
        <Pagination className="mt-6 pb-4">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => setPage((current) => Math.max(1, current - 1))}
                className={
                  page === 1
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
                  {pageNumber}
                </PaginationLink>
              </PaginationItem>
            ))}

            <PaginationItem>
              <PaginationNext
                onClick={() =>
                  setPage((current) => Math.min(totalPages, current + 1))
                }
                className={
                  page === totalPages
                    ? "pointer-events-none opacity-50"
                    : "cursor-pointer"
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      ) : null}
    </section>
  );
}
