import { IAddress, IDistrict, IProvince, IWard } from "../types/address.type";
import { AuthResponseSuccess, SuccessResponse } from "../types/auth.type";
import { IUser } from "../types/user.type";
import { httpWithToken, httpWithoutToken } from "../utils/http";

const URL_LIST_ADDRESS_ME = "address/get-list-address";
const URL_LIST_PROVINCE = "address/get-list-province";
const URL_LIST_DISTRICT = "address/get-list-district?province_id=";
const URL_LIST_WARD = "address/get-list-ward?district_id=";
const URL_ADD_ADR = "address/add-address";
const URL_DELETE_ADR = "address/delete-address";
const URL_SET_DEFAULT = "address/address-default?id=";
const addressApi = {
  getListAdr() {
    return httpWithToken.get<SuccessResponse<IAddress[]>>(
      `${URL_LIST_ADDRESS_ME}`
    );
  },
  getListProvince() {
    return httpWithToken.get<SuccessResponse<IProvince[]>>(
      `${URL_LIST_PROVINCE}`
    );
  },
  getListDistrict(id: number) {
    return httpWithToken.get<SuccessResponse<IDistrict[]>>(
      `${URL_LIST_DISTRICT}${id}`
    );
  },
  getListWard(id: number) {
    return httpWithToken.get<SuccessResponse<IWard[]>>(`${URL_LIST_WARD}${id}`);
  },
  deleteAdr(id: number) {
    const param = {
      id: id,
    };
    return httpWithToken.post<SuccessResponse<IWard[]>>(
      `${URL_DELETE_ADR}`,
      param
    );
  },
  defaultAdr(body: { id: number }) {
    const param = {
      id: body.id,
    };
    return httpWithToken.post<SuccessResponse<any>>(
      `${URL_SET_DEFAULT}`,
      param
    );
  },

  addAdr(body: {
    province_id: string;
    district_id: string;
    ward_id: string;
    address_detail: string;
  }) {
    const params = {
      province_id: body.province_id,
      district_id: body.district_id,
      ward_id: body.ward_id,
      address_detail: body.address_detail,
    };
    return httpWithToken.post<AuthResponseSuccess>(`${URL_ADD_ADR}`, params);
  },

  updateAdr(body: {
    province_id: string;
    district_id: string;
    ward_id: string;
    address_detail: string;
    id: number;
  }) {
    const params = {
      province_id: body.province_id,
      district_id: body.district_id,
      address_detail: body.address_detail,
      ward_id: body.address_detail,
      id: body.id,
    };
    return httpWithToken.post<AuthResponseSuccess>(`${URL_ADD_ADR}`, params);
  },
};
export default addressApi;
