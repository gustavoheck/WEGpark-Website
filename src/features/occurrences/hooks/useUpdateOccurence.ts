"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateWarning, updateIllegalParking, updateTrafficAccident } from "../services/updateService";
import { 
    UpdateWarningFormValues,
    UpdateIllegalParkingFormValues,
    UpdateTrafficAccidentFormValues
} from "../schemas/UpdateOccurrenceSchema";

export function useUpdateWarning() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ uuid, data }: { uuid: string; data: UpdateWarningFormValues }) => updateWarning(uuid, data),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["occurrence"] }),
    });
}

export function useUpdateIllegalParking() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ uuid, data }: { uuid: string; data: UpdateIllegalParkingFormValues }) => updateIllegalParking(uuid, data),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["occurrence"] }),
    });
}

export function useUpdateTrafficAccident() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ uuid, data }: { uuid: string; data: UpdateTrafficAccidentFormValues }) => updateTrafficAccident(uuid, data),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["occurrence"] }),
    });
}