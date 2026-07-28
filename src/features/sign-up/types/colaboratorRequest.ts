import BaseRequest from "./baseRequest";
import UserBase from "./userBase";

export default interface CollaboratorRequest {
    defaults : BaseRequest
    parkUserDefault : UserBase
    badgeNumber: string;
    location: string;
}