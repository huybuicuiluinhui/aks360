export interface ICate {
  created_at: string;
  id: number;
  imgage: string;
  name: string;
  status: number;
  updated_at: string;
}
export interface IProduct {
  code_product_kiotviet: string;
  created_at: null;
  description: string;
  full_name: string;
  id: number;
  id_category: string;
  id_product_kiotviet: string;
  image: string;
  name: string;
  note: string;
  price: number;
  price_promotional: number;
  quantity: number;
  status: number;
  type: number;
  updated_at: null;
}
export interface IResponsePage {
  current_page: number;
  last_page: number;
  data: IProduct[];
  total: number;
}

export interface IDataNoti {
  description: string;
  id: number;
  imgage_home: string;
  time: string;
  title: string;
  created_at?: string;
}
export interface IDataDetailNoti {
  banner: string;
  created_at: string;
  description: string;
  id: number;
  imgage_home: string;
  link_event: null;
  note: string;
  price_promotional: string;
  status: number;
  time: string;
  title: string;
  type: number;
  updated_at: string;
}
export interface IItemCart {
  created_at: string;
  id: number;
  product_detail: IProduct;
  product_id: number;
  quantity: number;
  status: string;
  total_money: number;
  updated_at: string;
  user_id: number;
}
export interface IItemProduct {
  id: number;
  image: string;
  name: string;
  price: number;
  price_promotional: number;
}
export interface IResponsePageProduct {
  current_page: number;
  last_page: number;
  data: IItemProduct[];
  total: number;
}
export interface IBanner {
  created_at: string;
  id: number;
  id_event: null;
  imgage: string;
  link_banner: string;
  status: number;
  type: number;
  updated_at: string;
}
