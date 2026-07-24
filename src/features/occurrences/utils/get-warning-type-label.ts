import { WARNING_TYPE_CONFIG } from "../config/warning-type";
import { WarningType } from "../types/WarningType";

export function getWarningTypeLabel (warningType : WarningType){
    return WARNING_TYPE_CONFIG[warningType]
}