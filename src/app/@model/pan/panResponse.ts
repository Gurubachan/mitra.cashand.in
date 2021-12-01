export interface Datum {
  id: number;
  userId: number;
  vleId: string;
  serviceId: number;
  UTIApplicationNo: string;
  OperatorTxnId: string;
  ServiceProviderId: string;
  TimeStamp: string;
  CouponType: string;
  Status: string;
  StatusCode: string;
  Message: string;
  created_at: Date;
  updated_at: Date;
  isWalletUpdate: number;
  walletReference?: number;
  isWalletRefund: number;
  walletRefundReference?: number;
  remark?: string;
  fname: string;
  lname: string;
  amount?: number;
}

export interface Data {
  current_page: number;
  data: Datum[];
  first_page_url: string;
  from: number;
  next_page_url?: string;
  path: string;
  per_page: number;
  prev_page_url?: string;
  to: number;
}

export interface PanResponse {
  response: boolean;
  message: string;
  data: Data;
}
