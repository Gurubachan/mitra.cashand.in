export interface UnifiedReport {
    status:  boolean;
    message: string;
    data:    Pagination;
}

export interface Pagination {
    current_page:   number;
    data:           Data[];
    first_page_url: string;
    from:           number;
    next_page_url:  string;
    path:           string;
    per_page:       number;
    prev_page_url:  null;
    to:             number;
}

export interface Data {
    id:             number;
    merchantId:     string;
    mobileNo:       string;
    iin:            number;
    aadhaarNo:      string;
    amount:         string;
    status:         string;
    statusCode:     number;
    apiComment:     string;
    apiCreatedDate: Date | null;
    apiUpdatedDate: Date | null;
    errors:         null;
    created_at:     Date;
    updated_at:     Date;
    latLong:        string;
    partnerRef:     string;
    paramA:         string;
    paramB:         string;
    balance:        string;
    rrn:            null | string;
    apiTxnId:       number | null;
    walletTxnRef:   number | null;
    walletCommRef:  number | null;
    bankName:       string;
    fname: string;
    mname: string;
    lname: string;
    bcagentid: string;
}


