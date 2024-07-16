import { AuthResponseSuccess, SuccessResponse } from "../types/auth.type";
import { IUser } from "../types/user.type";
import { httpWithToken, httpWithoutToken } from "../utils/http";

const URL_USER_KIOT_VIET = "user-kiotviet/get-user-kiotviet-by-phone";
const URL_CHANGE_PASS = "changePassword";
const userApis = {
  getInfoUser() {
    return httpWithToken.get<SuccessResponse<IUser>>(`${URL_USER_KIOT_VIET}`);
  },
  changePass(body: FormData) {
    return httpWithToken.post<AuthResponseSuccess>(`${URL_CHANGE_PASS}`, body,{
      headers: {
        'Content-Type': 'multipart/form-data; boundary=<calculated when request is sent>',
      },
      withCredentials: true
    });
  },
};
export default userApis;
