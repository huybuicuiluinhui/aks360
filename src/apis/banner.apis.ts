import { SuccessResponse } from "../types/auth.type";
import { IBanner, IItemCart } from "../types/product.type";
import { IUser } from "../types/user.type";
import { httpWithToken } from "../utils/http";

const URL_GET_LIST_BANNER = "banner/get-list-banner";
const bannerApis = {
  getListBanner() {
    return httpWithToken.get<SuccessResponse<IBanner[]>>(
      `${URL_GET_LIST_BANNER}`
    );
  },
};
export default bannerApis;
