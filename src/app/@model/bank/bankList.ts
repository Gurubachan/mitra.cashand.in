export interface BankList {
    status:  boolean;
    message: string;
    data:    Data[];
}

export interface Data {
    iin:      number;
    bankName: string;
}