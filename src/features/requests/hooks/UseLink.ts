"use client";

import { useMutation } from "@tanstack/react-query";
import { linkService } from "../services/LinkService";

export function useLink() {
    return useMutation({
        mutationFn : linkService
    });
}