import { PARKING_SPACE_CONFIG } from "../config/parking-space";

export type ParkingSpaceType = keyof typeof PARKING_SPACE_CONFIG

export interface ParkingSpaceDetails {
    parking_space_type : ParkingSpaceType
}