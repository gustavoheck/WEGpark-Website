import Vehicle from "@/shared/types/Vehicle";
import { VehicleRequest, VehicleResponse } from "../types/vehicle";
import { VehicleFormData } from "../schemas/VehicleSchema";

export function mapVehicleResponseToDomain(response: VehicleResponse): Vehicle {
    const owner = response.vehicleUsers.find((v) => v.isOwner)

    if (!owner) {
        throw new Error(`Vehicle ${response.uuid} returned from API without owner (isOwner).`)
    }

  return {
    uuid: response.uuid,
    plate: response.plate.toUpperCase(),
    model: response.model,
    brand: response.brand,
    color: response.color,
    ownerId: owner.userUuid
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