export interface UserBase {
    name : string;
    telephone : string;
}

export interface BaseRequest {
    email: string;
    password: string;
}

export interface CollaboratorRequest {
    defaults : BaseRequest
    parkUserDefaults : UserBase
    badgeNumber: string;
    location: string;
}

export interface VisitorRequest {
  defaults: BaseRequest;
  parkUserDefaults: UserBase;
  company: string;
  cpf: string;
}

export type RegisterRequest = CollaboratorRequest | VisitorRequest;

export interface RegisterResponse {
    uuid: string;
    email: string;
}