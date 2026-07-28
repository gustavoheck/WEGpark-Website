"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { saveService } from "../services/saveService";
import { VehicleFormData } from "../schemas/VehicleSchema";

interface SaveVehicleParams {
    data : VehicleFormData
}

export function useSave() {
    const queryClient = useQueryClient();


    return useMutation({
        mutationFn: ({ data }: SaveVehicleParams) => 
          saveService({ vehicleData: data }), 
          
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["vehicles"] });
        },
    });
}