export interface Data {
  id: number;
  operator_name: string;
  operator_code: string;
  recharge_type: string;
}

export interface Operator {
  response: boolean;
  message: string;
  data: Data[];
}

export interface Mobile {
  id: number;
  operator_name: string;
  operator_code: string;
  recharge_type: string;
}

export interface DTH {
  id: number;
  operator_name: string;
  operator_code: string;
  recharge_type: string;
}
