import { AuthResponseSuccess, SuccessResponse } from "../types/auth.type";
import { httpWithoutToken } from "../utils/http";

const URL_LOGIN = "login";
const authApis = {
  login(body: { phone: string; password: string }) {
    const params = {
      phone: body.phone,
      password: body.password,
    };
    return httpWithoutToken.post<AuthResponseSuccess>(`${URL_LOGIN}`, params);
  },
};
export default authApis;
