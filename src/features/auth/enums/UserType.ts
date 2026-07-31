export const USER_TYPE_MAP = {
    COLLABORATOR : "COLLABORATOR",
    VISITOR : "VISITOR"
} as const

export type UserType = keyof typeof USER_TYPE_MAP;