export interface WalletBalance {
  response: boolean
  message: string
  data: Data
}

export interface Data {
  floatAmount: string
  holdAmount: string
  minimumBalance: string
  effectiveAmount: number
}