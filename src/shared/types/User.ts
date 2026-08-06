import { ParkUserType } from "../enum/ParkUserType"
import { SystemRoleType } from "../enum/SystemRoleType"
export interface SystemUser {
    uuid : string,
    name : string,
    role : SystemRoleType
}

export interface DefaultUser {
    uuid : string,
    email : string,
    telephone : string,
    name : string,
    active : boolean,
    userType : ParkUserType
}

export interface Guard {
    defaults : DefaultUser,
    badgeNumber : string,
    location : string,
    boss : string
}
