"use client";

import { useMutation } from "@tanstack/react-query";
import { deleteService } from "../services/deleteService";

export function useDelete() {
    return useMutation({
        mutationFn: deleteService
    });
}