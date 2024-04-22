export type AuthResponseSuccess = {
  status: boolean;
  msg: string;
  data: {
    access_token: string;
    expires_in: string;
    token_type: string;
  };
};
export type AuthResponseFalse = {
  status: boolean;
  msg: string;
};
export interface SuccessResponse<Data> {
  status: boolean;
  mesage: string;
  message?: string;
  data?: Data;
  code?: number;
  msg?: string;
}
export interface IPointResponse {
  points_awarded: number;
  code: number;
  message: string;
  status: boolean;
  money_reduced_amount: number;
}
export interface IDataPageSearch {
  count_search: number;
  list_product: {
    current_page: number;
    last_page: number;
    data: {
      id: number;
      id_product_kiotviet: string;
      code_product_kiotviet: string;
      id_category: string;
      name: string;
      full_name: string;
      price: number;
      price_promotional: number;
      image: string;
      description: string;
      note: string;
      status: number;
      type: number;
      quantity: number;
      created_at: null;
      updated_at: null;
    }[];
  };
}
