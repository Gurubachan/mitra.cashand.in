export interface Datum {
  id: number;
  user_id: number;
  txnType: string;
  txnTime: string;
  amount: string;
  bankName: string;
  ifsc: string;
  txnMedium: number;
  txnId: string;
  status: string;
  response_at: string;
  remark: string;
  description: string;
  created_at: Date;
  updated_at: Date;
  isWalletUpdate: number;
  walletReferenceNo: number;
  bene_account: string;
  update_response_at: string;
  bank_error_message?: string;
  bank_transaction_ref_id: string;
  service_id: number;
  isRefunded: number;
  refundWalletReferenceNo?: number;
  gateWay?: string;
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

export interface SettlementResponse {
  response: boolean;
  message: string;
  data: Data;
}
