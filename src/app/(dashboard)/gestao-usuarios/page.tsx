"use client";

import { useState } from "react";
import { AlertTriangle, Plus, Users } from "lucide-react";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Skeleton } from "@/components/ui/skeleton";
import { UserManagementList } from "@/features/user-management/components/organisms/UserManagementList";
import { USER_CATEGORIES } from "@/features/user-management/constants/userFilters";
import { useUserManagementPermissions } from "@/features/user-management/hooks/useUserManagementPermissions";
import { useUsersList } from "@/features/user-management/hooks/useUserManagement";
import FloatingActionLink from "@/shared/components/atoms/FloatingActionLink";
import SectionTitle from "@/shared/components/atoms/SectionTitle";
import Filter, {
  type FilterParams,
} from "@/shared/components/molecules/Filter";
import { DisplayCard } from "@/shared/components/molecules/DisplayCard";

const MAX_VISIBLE_PAGES = 5;

export default function GestaoUsuariosPage() {
  const [page, setPage] = useState(1);
  const [filterParams, setFilterParams] = useState<FilterParams>();
  const { data, isPending, isError } = useUsersList(page, filterParams);
  const { canAdd } = useUserManagementPermissions();
  const users = data?.users ?? [];
  const totalPages = data?.totalPages ?? 1;
  const windowStart = Math.max(
    1,
    Math.min(page - 2, totalPages - MAX_VISIBLE_PAGES + 1),
  );
  const windowEnd = Math.min(totalPages, windowStart + MAX_VISIBLE_PAGES - 1);
  const visiblePages = Array.from(
    { length: Math.max(0, windowEnd - windowStart + 1) },
    (_, index) => windowStart + index,
  );

  function handleFilterSubmit(params: FilterParams) {
    setPage(1);
    setFilterParams(params);
  }

  return (
    <>
      <SectionTitle text="gestão de usuários" />

      {!isError ? (
        <Filter filters={USER_CATEGORIES} onSubmit={handleFilterSubmit} />
      ) : null}

      {isPending ? (
        <div className="flex flex-col gap-3">
          <Skeleton className="h-24 w-full md:h-16" />
          <Skeleton className="h-24 w-full md:h-16" />
          <Skeleton className="h-24 w-full md:h-16" />
        </div>
      ) : null}

      {!isPending && isError ? (
        <DisplayCard
          Icon={AlertTriangle}
          title="Não foi possível carregar os usuários"
          description="Tente novamente mais tarde."
          destructive
        />
      ) : null}

      {!isPending && !isError && users.length === 0 ? (
        <DisplayCard
          Icon={Users}
          title="Nenhum usuário encontrado"
          description={
            filterParams
              ? "Tente alterar os filtros da pesquisa."
              : "Novos usuários aparecerão aqui quando forem cadastrados."
          }
        />
      ) : null}

      {!isPending && !isError && users.length > 0 ? (
        <UserManagementList users={users} />
      ) : null}

      {canAdd ? (
        <FloatingActionLink
          href="/gestao-usuarios/cadastrar"
          label="Cadastrar usuário"
          Icon={Plus}
        />
      ) : null}

      {!isPending && !isError && totalPages > 1 ? (
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
    </>
  );
}
