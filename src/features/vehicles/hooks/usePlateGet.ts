"use client";

import { useMutation } from "@tanstack/react-query";
import { getPlateService } from "../services/getPlateService";

export function usePlateGet() {
    return useMutation({
        mutationFn: getPlateService
    });
}