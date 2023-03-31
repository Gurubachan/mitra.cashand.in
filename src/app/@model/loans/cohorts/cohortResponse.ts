
    export interface Data {
        id: string;
        status: string;
        responseCode: string;
        requestRef: string;
        error?: string;
        cohortUid: string;
        created_at: Date;
        updated_at: Date;
        merchantId: string;
        tenure: string;
        kycStatus: string;
        offer_link:string;
        amountOffered: string;
        failureReason?: string;
        customerKyc: boolean;
        offerDetails: string;
        status_check_at: Date;
        status_check_count: number;
    }

    export interface CohortResponse {
        status: boolean;
        message: string;
        data: Data;
    }


