import BaseRequest from "./baseRequest";
import UserBase from "./userBase";

export default interface CollaboratorRequest {
    defaults : BaseRequest
    parkUserDefaults : UserBase
    badgeNumber: string;
    location: string;
}