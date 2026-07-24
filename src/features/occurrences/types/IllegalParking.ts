import { DefaultOccurence } from "./DefaultOccurence";
import { ParkingSpaceDetails } from "./ParkingSpaceType";

export interface IllegalParking {
  uuid: string;
  defaults: DefaultOccurence;
  parkingSpaceType: ParkingSpaceDetails;
  description: string;
}