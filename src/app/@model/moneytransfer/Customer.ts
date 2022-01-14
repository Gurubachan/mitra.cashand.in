export interface Customer {
  id: number;
  mobileNo: string;
  name: string;
  pinCode: number;
  isMobileVerified: number;
  permittedAmount: string;
  debitedAmount: string;
  remainAmount: string;
  isActive: number;
  isBlocked: number;
  remark: string;
  created_at: Date;
  updated_at: Date;
  userId: number;
}
