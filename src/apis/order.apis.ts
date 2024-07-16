import { IPointResponse, SuccessResponse } from "../types/auth.type";
import {
  IBranch,
  IOrder,
  IResponseOrderOnline,
  IResponseOrderTab,
} from "../types/order.type";
import { httpWithToken } from "../utils/http";

const URL_ORDER_OFFLINE = "order/get-order-offline";
const URL_ORDER_ONLINE = "order/get-order-online?page=";
const URL_ORDER_CHECK_POINT = "order/check-plus-points?total_money=";
const URL_ORDER_CHECK_VOUCHER = "order/check-dicount-voucher-order?voucher_id=";
const URL_ORDER_CREATE = "order/create-order";
const URL_LIST_BRANCH_SHOP = "branch-shop/get-list-branch-shop";
const URL_FOLLOW_ORDER = "order/follow-order/";
const orderApis = {
  getOrderOff() {
    return httpWithToken.get<SuccessResponse<IOrder[]>>(URL_ORDER_OFFLINE);
  },
  getOrderOnline(page: number) {
    return httpWithToken.get<SuccessResponse<IResponseOrderOnline>>(
      `${URL_ORDER_ONLINE}?page=${page}`
    );
  },
  checkOrderPoint(total: number) {
    return httpWithToken.get<IPointResponse>(
      `${URL_ORDER_CHECK_POINT}${total}`
    );
  },
  checkOrderVoucher(id: number) {
    return httpWithToken.get<IPointResponse>(`${URL_ORDER_CHECK_VOUCHER}${id}`);
  },

  paymentOrder(body: {
    name_user: string;
    address_user: string;
    phone_user: string;
    branch_shop_id: number;
    voucher_id: number;
    note: string;
  }) {
    const params = {
      name_user: body.name_user,
      address_user: body.address_user,
      phone_user: body.phone_user,
      branch_shop_id: body.branch_shop_id,
      voucher_id: body.voucher_id,
      note: body.note,
    };
    return httpWithToken.post<SuccessResponse<IOrder[]>>(
      `${URL_ORDER_CREATE}`,
      params
    );
  },
  getListBranch() {
    return httpWithToken.get<SuccessResponse<IBranch[]>>(
      `${URL_LIST_BRANCH_SHOP}`
    );
  },
  getFollowOrder(id: number, page: number) {
    return httpWithToken.get<SuccessResponse<IResponseOrderTab>>(
      `${URL_FOLLOW_ORDER}${id}?page=${page}`
    );
  },
};
export default orderApis;
