export interface JWTPayload {
  uuid: string;
  sub: string;
  name : string
  roles: string[];
  exp: number;
}