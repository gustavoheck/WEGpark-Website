import Vehicle from "@/shared/types/Vehicle"

export interface DefaultOccurence {
    dateHour : string,
    location : string,
    gate : string,
    vehicle : Vehicle
    guard : string
}