export interface Datum {
  id: number;
  operatorCode: number;
  operator_name: String;
  recharge_number: string;
  refMobileNo: string;
  amount: string;
  isStv: number;
  transactionId?: number;
  status: string;
  remark: string;
  created_at: Date;
  updated_at: Date;
  userId: number;
  isWalletUpdate: number;
  walletReferenceNo?: number;
  isDiscountApplied: number;
  walletDiscountRefNo?: number;
  operatorId: string;
  apiStatus?: number;
  apiRemark: string;
  transactionStatus?: number;
  transactionRemark: string;
  isRefunded: number;
  walletRefundRefNo?: number;
  fname: string;
  lname: string;
}

export interface Data {
  current_page: number;
  data: Datum[];
  first_page_url: string;
  from: number;
  next_page_url: string;
  path: string;
  per_page: number;
  prev_page_url?: string;
  to: number;
}

export interface RechargeResponse {
  response: boolean;
  message: string;
  data: Data;
}
