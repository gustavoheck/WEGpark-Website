"use client";

import { useMutation } from "@tanstack/react-query";
import { editService } from "../services/editService";

export function useEdit() {
    return useMutation({
        mutationFn: editService
    });
}