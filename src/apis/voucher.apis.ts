import { SuccessResponse } from "../types/auth.type";
import { IUser } from "../types/user.type";
import { IMyVoucher, IVoucher } from "../types/voucher.type";
import { httpWithToken } from "../utils/http";

const URL_GET_LIST_VOUCHER = "voucher/get-list-voucher";
const URL_GET_LIST_MY_VOUCHER = "voucher/get-list-my-voucher";
const voucherApi = {
  getListVoucher() {
    return httpWithToken.get<SuccessResponse<IVoucher[]>>(
      `${URL_GET_LIST_VOUCHER}`
    );
  },
  getListMyVoucher() {
    return httpWithToken.get<SuccessResponse<IMyVoucher[]>>(
      `${URL_GET_LIST_MY_VOUCHER}`
    );
  },
};
export default voucherApi;
