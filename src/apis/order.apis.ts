import { SuccessResponse } from "../types/auth.type";
import { IOrder } from "../types/order.type";
import { httpWithToken, httpWithoutToken } from "../utils/http";

const URL_ORDER_OFFLINE = "order/get-order-offline";
const orderApis = {
  getOrderOff() {
    return httpWithToken.get<SuccessResponse<IOrder[]>>(URL_ORDER_OFFLINE);
  },
};
export default orderApis;
