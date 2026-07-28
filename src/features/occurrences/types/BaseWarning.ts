import { WarningType } from "../enums/warning-type"
import { DefaultOccurence } from "./DefaultOccurence"

export interface BaseWarning {
    uuid : string
    defaults : DefaultOccurence
    warningType: WarningType
    description : string
}