import { SystemRoleType } from "../enum/SystemRoleType"
export default interface User {
    uuid : string
    name : string
    role : SystemRoleType
}
