import { SuccessResponse } from "../types/auth.type";
import { IUser } from "../types/user.type";
import { IMyVoucher, IVoucher } from "../types/voucher.type";
import { httpWithToken } from "../utils/http";

const URL_GET_LIST_VOUCHER = "voucher/get-list-voucher";
const URL_GET_LIST_MY_VOUCHER = "voucher/get-list-my-voucher";
const URL_EXCHANGE_VOUCHER = "voucher/redeem-voucher";
const URL_CHECK_VOUCHER = "voucher/check-gift-voucher?id_voucher_cus=";
const URl_REDEEM_GIFT = "voucher/redeem-gift";
const URl_CHECK_DONE = "voucher/done-gift-customer?id_voucher_cus=";
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
  checkVoucher(id: number) {
    return httpWithToken.get<SuccessResponse<any>>(
      `${URL_CHECK_VOUCHER}+${id}`
    );
  },
  checkDone(id: number) {
    return httpWithToken.get<SuccessResponse<any>>(
      `${URl_CHECK_DONE}+${id}`
    );
  },
  exChangeVoucher(body:{
    voucher_id: number
  }) { 
    const params = {
      voucher_id : body.voucher_id
    }
    return httpWithToken.post<SuccessResponse<any[]>>(
      `${URL_EXCHANGE_VOUCHER}`,
      params
    );
  },
  rendeem(body: { id_voucher_cus: string;id_branch:string }) {
    const formData = new FormData();
    formData.append("id_voucher_cus", body.id_voucher_cus);
    formData.append("id_branch", body.id_branch);
    return httpWithToken.post<
      SuccessResponse<{ status: boolean; msg: string }>
    >(`${URl_REDEEM_GIFT}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
};
export default voucherApi;
