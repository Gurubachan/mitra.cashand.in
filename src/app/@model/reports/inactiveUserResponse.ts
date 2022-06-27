export interface InactiveUser {
        fname: string;
        mname: string;
        lname: string;
        contact: any;
        whatsapp: string;
        address: string;
        myPic: string;
    }
    export interface Link {
        url: string;
        label: string;
        active: boolean;
    }

    export interface Data {
         current_page: number;
        data: InactiveUser[];
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

    export interface InactiveUserResponse {
        response: boolean;
        message: string;
        data: Data;
    }