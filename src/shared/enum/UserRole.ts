export const UserRole = {
    COLLABORATOR : "COLLABORATOR",
    VISITOR : "VISITOR",
    PARKUSER : "PARKUSER",
    GUARD : "GUARD",
    ADMIN : "ADMIN",
    HR: "HR",
} as const

export type UserRoleType = (typeof UserRole)[keyof typeof UserRole]