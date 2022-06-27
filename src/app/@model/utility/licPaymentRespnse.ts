    export interface Data {
        name: string;
        contact: string;
        emailId: string;
        caNumber: string;
        amount: string;
        paidAmount: string;
        category: string;
        operatorId: string;
        operatorName: string;
        ackNo?: any;
        status: string;
        message: string;
        txnDate: string;
        refNo: number;
        merchantName: string;
        merchantContact: number;
        merchantAddress: string;
    }

    export interface LicPaymentResponse {
        response: boolean;
        message: string;
        data: Data;
    }