import { AuthResponseSuccess, SuccessResponse } from "../types/auth.type";
import { IUser } from "../types/user.type";
import { httpWithToken, httpWithoutToken } from "../utils/http";

const URL_USER_KIOT_VIET = "user-kiotviet/get-user-kiotviet-by-phone";
const userApis = {
  getInfoUser() {
    return httpWithToken.get<SuccessResponse<IUser[]>>(`${URL_USER_KIOT_VIET}`);
  },
};
export default userApis;
