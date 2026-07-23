import Vehicle from "@/shared/types/Vehicle";

export interface Occurence {
    id : number
    dateTime : string,
    locale : string,
    vehicle : Vehicle,
    type : string
}
