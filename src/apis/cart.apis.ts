import { SuccessResponse } from "../types/auth.type";
import { IItemCart } from "../types/product.type";
import { IUser } from "../types/user.type";
import { httpWithToken } from "../utils/http";

const URL_ADD_TO_CART = "cart/add-to-cart";
const URL_GET_LIST_PRODUCT = "cart/get-list-product";
const cartApis = {
  updateCart(body: { product_id: number; quantity: number; type: number }) {
    const params = {
      product_id: body.product_id,
      quantity: body.quantity,
      type: body.type,
    };
    return httpWithToken.post<SuccessResponse<IUser[]>>(
      `${URL_ADD_TO_CART}`,
      params
    );
  },
  getListProductInCart() {
    return httpWithToken.get<SuccessResponse<IItemCart[]>>(
      `${URL_GET_LIST_PRODUCT}`
    );
  },
};
export default cartApis;
