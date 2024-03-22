import { AuthResponseSuccess, SuccessResponse } from "../types/auth.type";
import { ICate, IProduct, IResponsePage } from "../types/product.type";
import { httpWithoutToken } from "../utils/http";

const URL_LIST_CATEGORY = "product/get-list-category";
const URL_LIST_PRODUCT_WITH_CATEGORY = "product/get-product-by-category/";
const URL_DETAIL_PRODUCT = "product/get-product-detail/";
const URL_LIST_PRODUCT_WITH_TYPE = "product/get-list-product-by-type/";

const productApi = {
  getListCate() {
    return httpWithoutToken.get<SuccessResponse<ICate[]>>(URL_LIST_CATEGORY);
  },
  getListProductWithCate(id: number, page: number) {
    return httpWithoutToken.get<SuccessResponse<IResponsePage>>(
      `${URL_LIST_PRODUCT_WITH_CATEGORY}${id}?page=${page}`
    );
  },
  getDetailProduct(id: number) {
    return httpWithoutToken.get<SuccessResponse<IProduct>>(
      `${URL_DETAIL_PRODUCT}${id}`
    );
  },
  getListProductWithType(id: number) {
    return httpWithoutToken.get<SuccessResponse<IProduct[]>>(
      `${URL_LIST_PRODUCT_WITH_TYPE}${id}`
    );
  },
};
export default productApi;
