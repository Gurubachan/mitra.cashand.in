export interface Auth {
    response: boolean;
    message:  string;
    data:     Data;
}

export interface Data {
    passkey:      any;
    merchantId: string;
}