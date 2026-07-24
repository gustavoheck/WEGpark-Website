import { DefaultOccurence } from "./DefaultOccurence"
import { WarningTypeDetails } from "./WarningType"

export interface BaseWarning {
    uuid : string
    defaults : DefaultOccurence
    warningType: WarningTypeDetails
    description : string
}