"use client";

import { useQuery } from "@tanstack/react-query";
import { getMyVehicles, getVehicle, getVehicleByPlate } from "../services/vehicleService";
import { GetServiceProps } from "@/shared/types/GetServiceProps";

export function useGetVehicles(params?: GetServiceProps, enabled = true) {
  const query = useQuery({
    queryKey: ["vehicle", params],
    queryFn: () => getVehicle(params),
    enabled,
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

export function useGetMyVehicles(enabled = true) {
  const query = useQuery({
    queryKey: ["vehicle", "me"],
    queryFn: getMyVehicles,
    enabled,
  });

  return {
    vehicles: query.data ?? [],
    isSearching: query.isLoading || query.isFetching,
    isError: query.isError,
    refetch: query.refetch,
  };
}
