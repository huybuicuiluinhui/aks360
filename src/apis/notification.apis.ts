import { httpWithToken, httpWithoutToken } from "./../utils/http";
import { AuthResponseSuccess, SuccessResponse } from "../types/auth.type";
import { IDataDetailNoti, IDataNoti } from "../types/product.type";

const URL_NOTI_CUSTOMER = "noti-customer/get-list-noticustomer";
const URL_NOTI_CUSTOMER_DETAIL = "noti-customer/get-noti-detail/";
const URL_NOTI_CUSTOMER_LIST = "hisotry-noti-customer/get-list/";

const notificationApis = {
  getListNotiHome() {
    return httpWithoutToken.get<SuccessResponse<IDataNoti[]>>(
      URL_NOTI_CUSTOMER
    );
  },
  getNotiDetail(id: number) {
    return httpWithoutToken.get<SuccessResponse<IDataDetailNoti>>(
      `${URL_NOTI_CUSTOMER_DETAIL}${id}`
    );
  },
  getListNoti(id: number) {
    return httpWithToken.get<SuccessResponse<IDataNoti[]>>(
      `${URL_NOTI_CUSTOMER_LIST}${id}`
    );
  },
};
export default notificationApis;
