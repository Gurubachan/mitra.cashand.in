export interface BeneCustomer {
  id: number;
  beneName: string;
  ifscCode: string;
  bankCode: number;
  accountNo: string;
  isBeneVerified: number;
  verified_at?: any;
  created_at: Date;
  updated_at: Date;
  dcId: number;
  userId: number;
  isActive: number;
  isDelete: number;
  bankName: string;
}
