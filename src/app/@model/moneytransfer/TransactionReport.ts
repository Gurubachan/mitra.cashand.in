export interface Data {
  id: number;
  beneId: number;
  amount: string;
  userId: number;
  status: string;
  description: string;
  txnTime: string;
  txnMedium: string;
  utr: string;
  created_at: Date;
  updated_at: Date;
  serviceId: number;
  isWalletUpdate: number;
  walletReferenceNo: number;
  isRefund: number;
  refundReferenceNo?: number;
  isCommissionApplied: number;
  commissionReferenceNo?: number;
  bank_error_message?: string;
  beneName: string;
  ifscCode: string;
  bankName: string;
  mobileNo: string;
  name: string;
  fname: string;
  mname: string;
  lname: string;
  contact: number;
  email: string;
}

export interface Pagination {
  current_page: number;
  data: Data[];
  first_page_url: string;
  from: number;
  next_page_url?: String;
  path: string;
  per_page: number;
  prev_page_url?: String;
  to: number;
}

export interface TransactionReport {
  response: boolean;
  message: string;
  data: Pagination;
}
