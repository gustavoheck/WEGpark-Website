import { useMutation } from "@tanstack/react-query";

import { findVehicleByPlate } from "../services/vehicleService";

export function useFindVehicleByPlate() {
  return useMutation({
    mutationFn: findVehicleByPlate,
  });
}
