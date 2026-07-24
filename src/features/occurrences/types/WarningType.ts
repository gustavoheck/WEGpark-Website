import { WARNING_TYPE_CONFIG } from "../config/warning-type"

export type WarningType = keyof typeof WARNING_TYPE_CONFIG

export interface WarningTypeDetails {
    warning_type : WarningType
}