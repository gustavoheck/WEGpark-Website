"use client";

import { useQuery } from "@tanstack/react-query";
import { getMyVehicles, getVehicle } from "../services/vehicleService";
import { GetServiceProps } from "@/shared/types/GetServiceProps";

interface VehiclePaginationParams {
  page?: number;
  size?: number;
}

export function useGetVehicles(
  params?: GetServiceProps,
  enabled = true,
  pagination?: VehiclePaginationParams,
) {
  const query = useQuery({
    queryKey: ["vehicle", params, pagination],
    queryFn: () => getVehicle(params, pagination),
    enabled,
  });

  return {
    vehicles: query.data?.vehicles ?? [],
    isSearching: query.isLoading || query.isFetching,
    isError: query.isError,
    refetch: query.refetch,
    pagination: query.data
      ? {
          page: query.data.page,
          totalPages: query.data.totalPages,
          totalElements: query.data.totalElements,
          size: query.data.size,
          first: query.data.first,
          last: query.data.last,
        }
      : undefined,
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
    pagination: undefined,
  };
}
