    export interface Data {
        id: number;
        serviceId: number;
        userId: number;
        policyNumber: number;
        contact: string;
        emailId: string;
        paymentAmount: string;
        apiStatusCode?: number;
        apiRemark?: string;
        isWalletDeducted: number;
        walletRefNo: number;
        isCommissionReleased: number;
        commissionRefNo?: number;
        isAmountRefund: number;
        refundWalletRefNo?: number;
        isCommissionRefund: Number;
        commissionRefundRefNo?: Number;
        created_at: Date;
        updated_at: Date;
        partnerRefId?: string;
        status: string;
        description: string;
        ackno?: string;
        fname: string;
        mname?: string;
        lname: string;
        email: string;
    }

    export interface Pagination {
        current_page: number;
        data: Data[];
        first_page_url: string;
        from: number;
        next_page_url?: any;
        path: string;
        per_page: number;
        prev_page_url?: string;
        to: number;
    }

    export interface Transaction {
        response: boolean;
        message: string;
        data: Pagination;
    }