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
