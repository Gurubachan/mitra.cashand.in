export interface Data {
  senderName: string;
  senderContact: string;
  receiverName: string;
  receiverAccount: string;
  rrn: string;
  amount: number;
  time: Date;
  status: string;
  message: string;
  merchantName: string;
  merchantContact: number;
  merchantAddress: string;
  isSuccess: boolean;
  refId: number;
  bankName: string;
  accountNo: string;
}

export interface TransactionResponse {
  response: boolean;
  message: string;
  data: Data;
}
