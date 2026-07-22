"use client";

import { useMutation } from "@tanstack/react-query";
import { saveService } from "../services/saveService";

export function useSave() {
    return useMutation({
        mutationFn: saveService
    });
}