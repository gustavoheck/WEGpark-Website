"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  confirmVehicleAssociation,
  requestVehicleAssociation,
  saveVehicle,
  unlinkVehicle,
  updateVehicle,
} from "../services/vehicleService";
import { VehicleRequest } from "../types/vehicle";

export function useVehicle() {
  const queryClient = useQueryClient();
  const invalidateVehicles = () => queryClient.invalidateQueries({ queryKey: ["vehicle"] });

  const createMutation = useMutation({ mutationFn: saveVehicle, onSuccess: invalidateVehicles });
  const updateMutation = useMutation({
    mutationFn: ({ uuid, request }: { uuid: string; request: VehicleRequest }) => updateVehicle(uuid, request),
    onSuccess: invalidateVehicles,
  });
  const unlinkMutation = useMutation({ mutationFn: unlinkVehicle, onSuccess: invalidateVehicles });
  const requestAssociationMutation = useMutation({ mutationFn: requestVehicleAssociation });
  const confirmAssociationMutation = useMutation({
    mutationFn: confirmVehicleAssociation,
    onSuccess: invalidateVehicles,
  });

  return {
    createVehicle: createMutation.mutate,
    isCreating: createMutation.isPending,
    updateVehicle: updateMutation.mutate,
    isUpdating: updateMutation.isPending,
    unlinkVehicle: unlinkMutation.mutate,
    isUnlinking: unlinkMutation.isPending,
    requestVehicleAssociation: requestAssociationMutation.mutate,
    isRequestingVehicleAssociation: requestAssociationMutation.isPending,
    confirmVehicleAssociation: confirmAssociationMutation.mutate,
    isConfirmingVehicleAssociation: confirmAssociationMutation.isPending,
  };
}
