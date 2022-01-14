export interface Datum {
  id: number;
  payerName: string;
  payerMobile: string;
  payerVa: string;
  payerAmount: string;
  bankRRN: any;
  userId: number;
  merchantId: string;
  subMerchantId: string;
  terminalId: string;
  txnInitDate: string;
  txnCompleteDate: string;
  apiStatus: string;
  apiResponseCode: string;
  created_at: Date;
  updated_at: Date;
  isWalletUpdate: number;
  walletReferenceNo: number;
  serviceId: number;
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
  prev_page_url?: any;
  to: number;
}

export interface UpiResponse {
  response: boolean;
  message: string;
  data: Data;
}
