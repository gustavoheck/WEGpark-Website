export interface CreateVehicleRequest {
    plate : string
    model : string
    brand : string
    color : string 
}

export interface VehicleUserResponse {
    userUuid : string
    isOwner : boolean
}

export type VehicleRequest = CreateVehicleRequest;
export type UpdateVehicleRequest = Partial<CreateVehicleRequest>;

export interface VehicleResponse {
    uuid : string
    plate : string
    model : string
    brand : string
    color : string 
    vehicleUsers?: VehicleUserResponse[]
}

export interface UpdateVehicleResponse {
    uuid: string
    plate: string
    model: string
    brand: string
    color: string
}

export interface AssociationNotificationRequest {
    plate: string
}

export interface AssociatedVehicleUserResponse {
    uuid: string
    email: string
    name: string
}

export interface VehiclePageResponse {
    content: VehicleResponse[]
    totalPages: number
    totalElements: number
    size: number
    number: number
    first: boolean
    last: boolean
    numberOfElements: number
    empty: boolean
}
