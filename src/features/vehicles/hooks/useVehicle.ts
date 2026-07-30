"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  deleteVehicle,
  saveVehicle,
  updateVehicle,
} from "../services/vehicleService";
import { VehicleRequest } from "../types/vehicle";

export function useVehicle() {
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: (request: VehicleRequest) => saveVehicle(request),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["vehicle"] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({
      uuid,
      request,
    }: {
      uuid: string;
      request: VehicleRequest;
    }) => updateVehicle(uuid, request),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["vehicle"] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (uuid: string) => deleteVehicle(uuid),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["vehicle"] });
    },
  });

  return {
    createVehicle: createMutation.mutateAsync,
    isCreating: createMutation.isPending,
    updateVehicle: updateMutation.mutateAsync,
    isUpdating: updateMutation.isPending,
    deleteVehicle: deleteMutation.mutateAsync,
    isDeleting: deleteMutation.isPending,
  };
}
