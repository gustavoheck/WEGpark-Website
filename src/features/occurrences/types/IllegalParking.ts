import { ParkingSpaceType } from "../enums/parking-space-map";
import { DefaultOccurence } from "./DefaultOccurence";

export interface ParkingSpaceDetails {
  parkingSpaceType: ParkingSpaceType;
}

export interface IllegalParking {
  uuid: string;
  defaults: DefaultOccurence;
  parkingSpaceType: ParkingSpaceDetails;
  description: string;
}