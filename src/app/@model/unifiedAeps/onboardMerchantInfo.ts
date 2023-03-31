export interface Data {
    mobilenumber: number;
    fname: string;
    mname?: any;
    lname: string;
    pancard: string;
    aadhaarId: number;
    companyname: string;
    address: string;
    area: string;
    pincode: string;
    state: string;
    shopname: string;
    shopcity?: any;
    shopaddress: string;
    shopdistrict: string;
    shoparea: string;
    shopstate: string;
    shoppincode: string;
}

export interface MerchantInfo {
    response: boolean;
    message: string;
    data: Data;
}