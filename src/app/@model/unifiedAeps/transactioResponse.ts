export interface TransactionResponse {
    status:  boolean;
    message: string;
    data:    Data;
}

export interface Data {
    name:            string;
    shopName:        string;
    address:         string;
    merchantId:      string;
    contact:         number;
    bank:            string;
    transactionMode: string;
    aadhaar:         string;
    rrn:             string;
    amount:          number;
    balance:         string;
    status:          string;
    statusCode:      string;
    description:     string;
    statement:       Statement[];
    txnDate:         Date;
    txnRef:          string;
}

export interface Statement {
    Date:        string;
    Type:        string;
    DebitCredit: string;
    Amount:      number;
}