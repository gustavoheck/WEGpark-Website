export const UserRole = {
    COLLABORATOR : "COLLABORATOR",
    VISITOR : "VISITOR",
    PARKUSER : "PARKUSER",
    GUARD : "GUARD",
    ADMIN : "ADMIN",
    RH: "RH",
} as const

export type UserRoleType = (typeof UserRole)[keyof typeof UserRole]