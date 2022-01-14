export interface Datum {
  id: number;
  village: string;
  poName: string;
  pinCode: string;
  subDistrict: string;
  district: string;
  state: string;
}

export interface PinCode {
  response: boolean;
  message: string;
  data: Datum[];
}
