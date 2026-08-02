export interface VehicleUser {
    uuid: string
    isOwner: boolean
}

export default interface Vehicle {
    uuid : string
    plate : string,
    brand : string,
    model : string,
    color : string,
    ownerId : string,
    users: VehicleUser[],
    isOwner? : boolean
}
