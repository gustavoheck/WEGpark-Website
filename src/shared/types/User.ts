import { UserRoleType } from "../enum/UserRole"
export default interface User {
    uuid : string
    name : string
    role : UserRoleType
}