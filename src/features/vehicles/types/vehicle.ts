export interface VehicleRequest {
    plate : string
    model : string
    brand : string
    color : string 
}

export interface VehicleUserResponse {
    userUuid : string
    isOwner : boolean
}

export interface VehicleResponse {
    uuid : string
    plate : string
    model : string
    brand : string
    color : string 
    vehicleUsers : VehicleUserResponse[]
}