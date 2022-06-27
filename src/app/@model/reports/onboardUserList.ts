export interface OnboardUserList {
        id: number;
        fname: string;
        mname: string;
        lname: string;
        contact: any;
        whatsapp: string;
        email: string;
        created_at: Date;
        updated_at: Date;
        address: string;
        parentId: number;
        role: number;
        businessName: string;
        pinCode: string;
        village: string;
        poName: string;
        subDistrict: string;
        district: string;
        state: string;
    }

    export interface Data {
        current_page: number;
        data: OnboardUserList[];
        first_page_url: string;
        from: number;
        next_page_url: string;
        path: string;
        per_page: number;
        prev_page_url?: any;
        to: number;
    }

    export interface OnboardUserListResponse {
        response: boolean;
        message: string;
        data: Data;
    }