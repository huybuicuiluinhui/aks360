export interface IVoucher {
  id: number;
  name: number;
  describe: string;
  note: string;
  image: string;
  voucher_code: string;
  value_voucher: number;
  time_end: string;
  minimum_value: number;
  maximum_price: number;
  point: number;
  count_use_voucher: number;
  is_active: number;
  type: number;
  id_product: number;
  created_at: string;
  updated_at: string;
}
export interface IMyVoucher {
  id: number;
  user_id: number;
  voucher_id: number;
  status: number;
  created_at: string;
  updated_at: string;
  voucher: {
    id: number;
    name: number;
    describe: string;
    note: string;
    image: string;
    voucher_code: string;
    value_voucher: number;
    time_end: string;
    minimum_value: number;
    maximum_price: number;
    point: number;
    count_use_voucher: number;
    is_active: number;
    type: number;
    id_product: number;
    created_at: string;
    updated_at: string;
  };
}
