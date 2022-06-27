export interface Datum {
        id: number;
        serviceId: number;
        userId: number;
        txnType: string;
        amount: string;
        txnInitTime: string;
        apiStatus: string;
        apiDescription: string;
        createdDate: string;
        updatedDate: string;
        apiTxnDateTime?: any;
        customerIdentification: string;
        rrn: string;
        apiTxnId: any;
        created_at: Date;
        updated_at: Date;
        isWalletUpdate?: number;
        walletReference?: number;
        fname: string;
        mname: string;
        lname: string;
        contact: any;
        email: string;
    }

    export interface Data {
        current_page: number;
        data: Datum[];
        first_page_url: string;
        from: number;
        next_page_url: string;
        path: string;
        per_page: number;
        prev_page_url?: any;
        to: number;
    }

    export interface MatmTransaction {
        response: boolean;
        message: string;
        data: Data;
    }