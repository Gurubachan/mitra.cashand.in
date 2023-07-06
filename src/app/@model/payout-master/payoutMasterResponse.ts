export interface PayoutMasterResponse {
  response: boolean;
  message: string;
  data: Data;
}

export interface Data {
  bankingDetails: BankingDetails;
  lastSettlement: LastSettlement;
}

export interface BankingDetails {
  bankname: string;
  accountNo: string;
  ifsc: string;
  balance: string;
  isBankAccountVerified: number;
}

export interface LastSettlement {
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
  created_at: string;
  updated_at: string;
  isWalletUpdate: number;
  walletReferenceNo: number;
  bene_account: string;
  update_response_at: string;
  bank_error_message: any;
  bank_transaction_ref_id: string;
  service_id: number;
  isRefunded: number;
  refundWalletReferenceNo: any;
  gateWay: number;
  isCommissionApplied: number;
  commissionWalletReferenceNo: number;
  isCommissionRefund: number;
  commissionRefundReferenceNo: any;
}
