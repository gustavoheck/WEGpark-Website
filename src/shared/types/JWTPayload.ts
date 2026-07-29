export interface JWTPayload {
  uuid: string;
  sub: string;
  roles: string[];
  exp: number;
}