"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editService } from "../services/editService";
import { VehicleFormData } from "../schemas/VehicleSchema";

interface UpdateVehicleParams {
    uuid : string,
    data : VehicleFormData
}

export function useEdit() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ uuid, data }: UpdateVehicleParams) => 
      editService({ uuid, vehicleData: data }), 
      
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["vehicles"] });
    },
  });
}