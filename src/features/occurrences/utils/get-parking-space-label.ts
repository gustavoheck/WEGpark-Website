import { PARKING_SPACE_CONFIG } from "../config/parking-space";
import { ParkingSpaceType } from "../types/ParkingSpaceType";

export function getParkingSpaceLabel (parkingSpace : ParkingSpaceType){
    return PARKING_SPACE_CONFIG[parkingSpace]
}