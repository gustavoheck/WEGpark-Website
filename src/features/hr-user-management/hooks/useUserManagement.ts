"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createUser, listUsers } from "../services/userManagementService";
import { CreateUserRequestDTO } from "../types/User";
import { deleteUser } from "../services/userManagementService";

export function useUsersList(page: number) {
    return useQuery({
        queryKey: ["users", page],
        queryFn: () => listUsers(page),
    });
}

export function useCreateUser() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (payload: CreateUserRequestDTO) => createUser(payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["users"] });
        },
    });
}

export function useDeleteUser() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => deleteUser(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["users"] });
        },
    });
}