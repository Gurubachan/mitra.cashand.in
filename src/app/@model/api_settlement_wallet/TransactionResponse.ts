export interface TransactionResponse {
  response: boolean
  message: string
  data: Data[]
}

export interface Data {
  bene_name: string
  account_number: string
  ifsc: string
  fname: string
  mname?: string
  lname: string
  amount: string
  mode: string
  status: string
  purpose: string
  utr?: string
  reference_id: string
  narration: string
  created_at: string
  remark: string
  description: string
}