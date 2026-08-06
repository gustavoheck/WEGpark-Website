import { ParkUserType } from "../enum/ParkUserType"

export interface VehicleUser {
    userUuid: string
    isOwner: boolean
    telephone: string,
    associationActive: boolean,
    name: string,
    userType: ParkUserType,
    badgeNumber?: string,
    location?: string,
    boss?: string,
    company?: string
}

export default interface Vehicle {
    uuid : string
    plate : string,
    model : string,
    brand : string,
    color : string,
    vehicleUsers: VehicleUser[]
}
