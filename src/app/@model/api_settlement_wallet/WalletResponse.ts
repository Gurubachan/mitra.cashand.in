export interface WalletResponse {
  response: boolean
  message: string
  data: Data[]
}

export interface Data {
  id: number
  userId: string
  serviceId: number
  opening_balance: string
  transaction_amount: string
  closing_balance: string
  transaction_ref_no: string
  status: string
  remark: string
  operation: string
  transaction_date: string
  created_at: string
  updated_at: string
  transaction_type: string
}