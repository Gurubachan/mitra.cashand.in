 export interface BillFetch {
        billAmount: string;
        billnetamount: string;
        dueDate: string;
        maxBillAmount: number;
        acceptPayment: boolean;
        acceptPartPay: boolean;
        cellNumber: string;
        userName: string;
    }

    export interface Data {
        response_code: number;
        status: boolean;
        amount: string;
        name: string;
        duedate: string;
        bill_fetch: BillFetch;
        ad2?: any;
        ad3?: any;
        message: string;
    }

    export interface LicFetchResponse {
        response: boolean;
        message: string;
        data: Data;
        responseCode: number;
    }