import { ParkingSpaceType } from "../enums/parking-space-map";
import { DefaultOccurence } from "./DefaultOccurence";

export interface IllegalParking {
  uuid: string;
  defaults: DefaultOccurence;
  parkingSpaceType: ParkingSpaceType;
  description: string;
}