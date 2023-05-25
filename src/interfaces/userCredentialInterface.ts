import { ModelExtend } from "./modelExtendInterface";

export interface InputUserCredentialInterface {
  userId?: number;
  hash: string;
  salt: string;
  isActive: boolean;
}

export interface UserCredentialInterface extends ModelExtend {
  id: number;
  hash: string;
  salt: string;
  isActive: boolean;
}
