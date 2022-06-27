export interface Commission {
        id: number;
        service_id: number;
        serviceName: string;
        min_amount: string;
        max_amount: string;
        isAnyAmount: number;
        txn_type: string;
        commission: string;
        isPercentage: number;
        isActive: number;
        isDeleted: number;
        created_at: Date;
        updated_at: any;
        wef: string;
        valid_upto: string;
        txnType: string;
        serviceCode: string;
        minCommission: string;
        maxCommission: string;
    }

    

    export interface Data {
        commission: Commission[];
        user: number;
    }

    export interface CommissionResponse {
        response: boolean;
        message: string;
        data: Data;
    }