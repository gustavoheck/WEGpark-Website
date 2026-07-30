"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  deleteVehicle,
  getVehicle,
  getVehicleByPlate,
  saveVehicle,
  updateVehicle,
} from "../services/vehicleService";
import { GetServiceProps } from "@/shared/types/GetServiceProps";
import { VehicleRequest } from "../types/vehicle";

export function useVehicle() {
  const queryClient = useQueryClient();

  const useGet = (params: GetServiceProps) => {
    return useQuery({
      queryKey: ["vehicle", params],
      queryFn: () => getVehicle(params),
    });
  };

  const useGetByPlate = (plate?: string) => {
    return useQuery({
      queryKey: ["vehicle", plate],
      queryFn: () => getVehicleByPlate(plate!),
      enabled: !!plate,
    });
  };

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
    useGet,
    useGetByPlate,
    createVehicle: createMutation.mutateAsync,
    isCreating: createMutation.isPending,
    updateVehicle: updateMutation.mutateAsync,
    isUpdating: updateMutation.isPending,
    deleteVehicle: deleteMutation.mutateAsync,
    isDeleting: deleteMutation.isPending,
  };
}
