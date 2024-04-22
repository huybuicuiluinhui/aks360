export interface IOrder {
  id: number;
  uuid: string;
  code: string;
  purchaseDate: string;
  branchId: number;
  branchName: string;
  soldById: number;
  soldByName: string;
  customerId: number;
  customerCode: string;
  customerName: string;
  orderCode: string;
  total: number;
  totalPayment: number;
  status: number;
  statusValue: string;
  usingCod: boolean;
  createdDate: string;
  invoiceDetails: {
    productId: number;
    productCode: string;
    productName: string;
    categoryId: number;
    categoryName: string;
    tradeMarkId: number;
    tradeMarkName: string;
    quantity: number;
    price: number;
    discount: number;
    usePoint: boolean;
    subTotal: number;
    serialNumbers: string;
    returnQuantity: number;
  }[];
}
export interface IBranch {
  address: string;
  branch_kiotviet_id: number;
  contact_number: string;
  created_at: string;
  id: number;
  local_kiotviet_name: string;
  name: string;
  note_kiotviet: string;
  retailer_kiotviet_id: number;
  status: number;
  type: number;
  updated_at: string;
  ward_kiotviet_name: string;
}
export interface IOrderOnline {
  address_user: string;
  branch_id: number;
  code: string;
  created_at: string;
  fee_ship: number;
  id: number;
  money: number;
  money_use_code: number;
  name_user: string;
  note: string;
  phone_user: string;
  status: number;
  total_money: number;
  type: number;
  updated_at: string;
  user_id: number;
  voucher_id: number;
}
export interface IResponseOrderOnline {
  current_page: number;
  last_page: number;
  data: IOrderOnline[];
  total: number;
}
export interface IResponseOrderTab {
  current_page: number;
  last_page: number;
  data: IOrderFollow[];
  total: number;
}
export interface IOrderFollow {
  address_user: string;
  branch_id: number;
  code: string;
  created_at: string;
  fee_ship: number;
  id: number;
  money: number;
  money_use_code: number;
  name_user: string;
  note: string;
  phone_user: string;
  status: number;
  total_money: number;
  type: number;
  updated_at: string;
  user_id: number;
  voucher_id: number;
}
