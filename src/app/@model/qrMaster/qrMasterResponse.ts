export interface QRMaster {
        fname?: string;
        mname?: string;
        lname?: string;
        contact?: string;
        email?: string;
        id: number;
        qrUrl: string;
        identity: string;
        isAssigned: number;
        userId?: number;
        created_at: string;
        updated_at: string;
        businessName?: string;
        generateBy: number;
        assignedBY?: number;
    }

     

    export interface Link {
        url: string;
        label: string;
        active: boolean;
    }

    export interface Data {
        current_page: number;
        data: QRMaster[];
        first_page_url: string;
        from: number;
        last_page: number;
        last_page_url: string;
        links: Link[];
        next_page_url: string;
        path: string;
        per_page: number;
        prev_page_url?: string;
        to: number;
        total: number;
    }

    export interface QRMasterResponse {
        response: boolean;
        message: string;
        data: Data;
    }
