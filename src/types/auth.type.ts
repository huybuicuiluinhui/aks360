export type AuthResponseSuccess = {
  status: boolean;
  msg: string;
  data: {
    access_token: string;
    expires_in: string;
    token_type: string;
  };
};
export type AuthResponseFalse = {
  status: boolean;
  msg: string;
};
export interface SuccessResponse<Data> {
  status: boolean;
  mesage: string;
  message?: string;
  data?: Data;
  code?: number;
  msg?: string;
}
