import Vehicle from "@/shared/types/Vehicle";
import { VehicleRequest, VehicleResponse } from "../types/vehicle";
import { VehicleFormData } from "../schemas/VehicleSchema";

export function mapVehicleResponseToDomain(response: VehicleResponse): Vehicle {
    const users = (response.vehicleUsers ?? []).map((vehicleUser) => ({
      uuid: vehicleUser.userUuid,
      isOwner: vehicleUser.isOwner,
    }));
    const owner = users.find((vehicleUser) => vehicleUser.isOwner);

  return {
    uuid: response.uuid,
    plate: response.plate.toUpperCase(),
    model: response.model,
    brand: response.brand,
    color: response.color,
    // PUT responses do not include vehicleUsers. Keeping an empty owner avoids
    // failing an otherwise successful update while preserving data from GETs.
    ownerId: owner?.uuid ?? "",
    users,
  };
}

export function mapFormDataToVehicleRequest(data: VehicleFormData): VehicleRequest {
  return {
    plate: data.plate.trim().toUpperCase(),
    brand: data.brand.trim(),
    model: data.model.trim(),
    color: data.color.trim(),
  };
}
