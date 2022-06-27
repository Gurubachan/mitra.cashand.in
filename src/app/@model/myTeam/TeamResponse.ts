export interface TeamResponse {
        response: boolean;
        message: string;
        data: string;
    }

     export interface TeamResponseData {
        id: number;
        fname: string;
        mname?: any;
        lname: string;
        email: string;
        contact: any;
        gender: string;
        whatsapp: string;
        myPic: string;
    }