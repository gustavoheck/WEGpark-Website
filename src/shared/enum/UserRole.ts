export const UserRole = {
    PARKUSER : "PARKUSER",
    GUARD : "GUARD",
    ADMIN : "ADMIN",
    HR: "HR",
} as const

export type UserRoleType = (typeof UserRole)[keyof typeof UserRole]