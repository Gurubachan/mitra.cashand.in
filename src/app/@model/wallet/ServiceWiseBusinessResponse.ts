
    export interface Data {
        amount: string;
        count: number;
        service: string;
        wallet_operation: string;
    }

    export interface ServiceWiseBusinessResponse {
        response: boolean;
        message: string;
        data: Data[];
    }
