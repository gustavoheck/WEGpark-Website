export const UserRole = {
    PARKUSER : "PARKUSER",
    GUARD : "GUARD",
    ADMIN : "ADMIN",
    RH: "RH",
} as const

export type UserRoleType = (typeof UserRole)[keyof typeof UserRole]