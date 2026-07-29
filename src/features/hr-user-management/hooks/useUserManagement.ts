"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createUser, listUsers } from "../services/userManagementService";
import { CreateUserRequestDTO } from "../types/User";
import { deleteUser } from "../services/userManagementService";
import { UpdateUserRequestDTO } from "../types/User";
import { getUserById, updateUser } from "../services/userManagementService";

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

export function useUser(id: string) {
    return useQuery({
        queryKey: ["users", "detail", id],
        queryFn: () => getUserById(id),
        enabled: !!id,
    });
}

interface UpdateUserParams {
    id: string;
    data: UpdateUserRequestDTO;
}

export function useUpdateUser() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, data }: UpdateUserParams) => updateUser(id, data),
        onSuccess: (_, { id }) => {
            queryClient.invalidateQueries({ queryKey: ["users"] });
            queryClient.invalidateQueries({ queryKey: ["users", "detail", id] });
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