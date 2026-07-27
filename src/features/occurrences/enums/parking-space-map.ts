export const PARKING_SPACE_MAP = {
    COMMON : "Comum",
    PREGNANT_WOMAN : "Gestante",
    DISABLED : "Deficiente",
    VISITOR : "Visitante",
    CARPOOL : "Carona Solidária",
    BANK : "Banco",
    UNMARKED_SPOT: "Vaga Imaginária"
} as const

export type ParkingSpaceType = keyof typeof PARKING_SPACE_MAP;