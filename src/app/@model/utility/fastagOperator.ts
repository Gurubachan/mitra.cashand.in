export interface Operator {
        id: string;
        name: string;
        category: string;
        viewbill: string;
        regex?: any;
        displayname: string;
        ad1_regex: string;
    }

    export interface Data {
        response_code: number;
        status: boolean;
        data: Operator[];
        message: string;
    }

    export interface FastageOperatorResponse {
        response: boolean;
        message: string;
        data: Data;
        responseCode: number;
    }