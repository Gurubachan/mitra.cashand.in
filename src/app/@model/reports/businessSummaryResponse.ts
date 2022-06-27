export interface BusinessSummary {
        user_name: string;
        contact: any;
        service: string;
        count: number;
        amount: string;
        transaction_type: string;
    }

    export interface BusinessSummaryResponse {
        response: boolean;
        message: string;
        data: BusinessSummary[];
    }