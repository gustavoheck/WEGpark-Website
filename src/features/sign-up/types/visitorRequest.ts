import BaseRequest from "./baseRequest";
import UserBase from "./userBase";

export default interface VisitorRequest {
  defaults: BaseRequest;
  parkUserDefault: UserBase;
  company: string;
  cpf: string;
}
