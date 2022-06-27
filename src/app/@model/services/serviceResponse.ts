export interface Data {
        id: number;
        service: string;
        created_at?: Date;
        updated_at?: any;
        isActive: number;
        isDeleted: number;
        onBoardRequired?: number;
        isLive: number;
        remark?: any;
    }

    export interface ServiceResponse {
        response: boolean;
        message: string;
        data: Data[];
    }