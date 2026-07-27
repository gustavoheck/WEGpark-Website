export const WARNING_TYPE_MAP = {
    HEADLIGHT_ON : "Luz Acessa",
    OPENED_WINDOWS : "Vidro Aberto",
    ALARM_ON : "Alarme Acionado",
    OTHER : "Outros"
} as const

export type WarningType = keyof typeof WARNING_TYPE_MAP;