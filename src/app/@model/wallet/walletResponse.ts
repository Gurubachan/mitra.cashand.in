export interface Datum {
  id: number;
  user_id: number;
  previous_balance: string;
  transacting_amount: string;
  closing_balance: string;
  transaction_type: string;
  transaction_reference: number;
  description: string;
  remark: string;
  status: string;
  transaction_date: string;
  created_at: Date;
  updated_at: Date;
  service_id: number;
  wallet_operation: string;
  fname: string;
  mname: string;
  lname: string;
  contact: any;
  role: number;
}

export interface Link {
  url: string;
  label: string;
  active: boolean;
}

export interface Data {
  current_page: number;
  data: Datum[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: Link[];
  next_page_url: string;
  path: string;
  per_page: number;
  prev_page_url?: string;
  to: number;
  total: number;
}

export interface WalletResponse {
  response: boolean;
  message: string;
  data: Data;
}
