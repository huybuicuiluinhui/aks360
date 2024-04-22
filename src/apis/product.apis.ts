import { IDataPageSearch, SuccessResponse } from "../types/auth.type";
import {
  ICate,
  IProduct,
  IResponsePage,
  IResponsePageProduct,
} from "../types/product.type";
import { httpWithToken, httpWithoutToken } from "../utils/http";

const URL_LIST_CATEGORY = "product/get-list-category";
const URL_LIST_PRODUCT_WITH_CATEGORY = "product/get-product-by-category/";
const URL_DETAIL_PRODUCT = "product/get-product-detail/";
const URL_LIST_PRODUCT_WITH_TYPE = "product/get-list-product-by-type/";
const URL_LIST_PRODUCT_WITH_TYPE_ALL = "product/get-list-product-by-type-all/";
const URL_ADD_VIEW_PRODUCT = "view_product/add-number-view-product";
const URL_VIEW_PRODUCT = "view_product/get-number-view-product/";
const URL_SEARCH_PRODUCT = "product/searh-product?key_searh=";

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
  getListProductWithTypeAll(id: number, page: number) {
    return httpWithoutToken.get<SuccessResponse<IResponsePageProduct>>(
      `${URL_LIST_PRODUCT_WITH_TYPE_ALL}${id}?page=${page}`
    );
  },
  getViewProduct(id: number) {
    return httpWithToken.get<SuccessResponse<any>>(`${URL_VIEW_PRODUCT}${id}`);
  },
  getListProductWithSearch(key: string, page: number) {
    return httpWithoutToken.get<SuccessResponse<IDataPageSearch>>(
      `${URL_SEARCH_PRODUCT}${key}&page=${page}`
    );
  },
  addViewProduct(body: { id_product: number }) {
    const params = {
      id_product: body.id_product,
    };
    return httpWithToken.post<SuccessResponse<IResponsePageProduct>>(
      `${URL_ADD_VIEW_PRODUCT}`,
      params
    );
  },
};
export default productApi;
