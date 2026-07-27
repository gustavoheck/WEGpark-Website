import { WarningType } from "../enums/warning-type"
import { DefaultOccurence } from "./DefaultOccurence"

export interface WarningTypeDetails {
    warningType : WarningType
}


export interface BaseWarning {
    uuid : string
    defaults : DefaultOccurence
    warningType: WarningTypeDetails
    description : string
}