import User from "@/shared/types/User";
import Vehicle from "@/shared/types/Vehicle";

export interface Request {
    uuid : string
    vehicle : Vehicle
    user : User
}