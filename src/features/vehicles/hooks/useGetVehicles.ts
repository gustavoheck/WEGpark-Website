"use client";

import { useQuery } from "@tanstack/react-query";
import { getVehicle, getVehicleByPlate } from "../services/vehicleService";
import { GetServiceProps } from "@/shared/types/GetServiceProps";

export function useGetVehicles(params?: GetServiceProps) {
  const query = useQuery({
    queryKey: ["vehicle", params],
    queryFn: () => getVehicle(params!),
  });

  return {
    vehicles: query.data ?? [],
    isSearching: query.isLoading || query.isFetching,
    isError: query.isError,
    refetch: query.refetch,
  };
}

export function useGetVehicleByPlate(plate?: string) {
  const query = useQuery({
    queryKey: ["vehicle", "by-plate", plate],
    queryFn: () => getVehicleByPlate(plate!),
    enabled: !!plate,
  });

  return {
    vehicle: query.data,
    isSearching: query.isLoading || query.isFetching,
    isError: query.isError,
    refetch: query.refetch,
  };
}