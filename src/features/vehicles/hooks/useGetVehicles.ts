"use client";

import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/shared/context/AuthContext";
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
  const { user } = useAuth();
  const userUuid = user?.uuid;

  const query = useQuery({
    queryKey: ["vehicle", "me", userUuid],
    queryFn: getMyVehicles,
    enabled: enabled && Boolean(userUuid),
    staleTime: 0,
    refetchOnMount: "always",
    refetchOnWindowFocus: "always",
    select: (vehicles) =>
      vehicles.filter((vehicle) =>
        vehicle.vehicleUsers.some(
          (vehicleUser) =>
            vehicleUser.userUuid === userUuid &&
            vehicleUser.associationActive,
        ),
      ),
  });

  return {
    vehicles: query.data ?? [],
    isSearching: query.isLoading || query.isFetching,
    isError: query.isError,
    refetch: query.refetch,
    pagination: undefined,
  };
}
