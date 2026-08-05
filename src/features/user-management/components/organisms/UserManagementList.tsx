"use client";

import { useState } from "react";
import Link from "next/link";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import { useSidebar } from "@/components/ui/sidebar";

import SectionTitle from "@/shared/components/atoms/SectionTitle";
import { Plus } from "lucide-react";
import { useUserManagementPermissions } from "../../hooks/useUserManagementPermissions";
import { cn } from "@/shared/lib/utils";
import Filter, { FilterParams } from "@/shared/components/molecules/Filter";
import { USER_CATEGORIES } from "../../constants/userFilters";

import { useUsersList } from "../../hooks/useUserManagement";
import UserManagementCard from "../molecules/UserManagementCard";

const MAX_VISIBLE_PAGES = 5;

export function UserManagementList() {
    const [page, setPage] = useState(1);
    const [filterParams, setFilterParams] = useState<FilterParams>();
    const { data, isPending, isError } = useUsersList(page, filterParams);
    const { canAdd } = useUserManagementPermissions(); 
    const { open } = useSidebar();
    const totalPages = data?.totalPages ?? 1;
    const windowStart = Math.max(1, Math.min(page - 2, totalPages - MAX_VISIBLE_PAGES + 1));
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
            <Filter filters={USER_CATEGORIES} onSubmit={handleFilterSubmit} />
            <Card>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {isPending ? (
                        <div className="flex flex-col gap-3">
                            <Skeleton className="h-24 w-full" />
                            <Skeleton className="h-24 w-full" />
                            <Skeleton className="h-24 w-full" />
                        </div>
                    ) : null}

                    {isError ? (
                        <p className="text-sm text-destructive">Não foi possível carregar os usuários.</p>
                    ) : null}

                    {!isPending && !isError && data?.users.length === 0 ? (
                        <p className="text-sm text-muted-foreground text-center py-8">Nenhum usuário encontrado.</p>
                    ) : null}

                    {!isPending && !isError
                        ? data?.users.map((user) => <UserManagementCard key={user.id} user={user} />)
                        : null}
                </CardContent>
            </Card>

            {!isPending && data && data.totalPages > 1 ? (
                <Pagination className="mt-6 pb-4 color-primary">
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious
                                onClick={() => setPage((current) => Math.max(1, current - 1))}
                                className={page === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
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
                                onClick={() => setPage((current) => Math.min(totalPages, current + 1))}
                                className={page === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                            />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            ) : null}
            {canAdd && (
                <Link href="/gestao-usuarios/cadastrar">
                    <Button className={cn("fixed bottom-4 right-4 text-xl rounded-sm py-6 font-bold z-50", open ? "left-68" : "left-4")} variant="default">
                        <Plus className="size-7" />
                        Cadastrar Usuário
                    </Button>
                </Link>
            )}
        </section>
    );
}