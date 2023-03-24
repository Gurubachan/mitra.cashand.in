
export interface Data {
    id: number;
    service: string;
    serviceName: string;
    commission: string;
    isPercentage: number;
}

export interface Response {
    response: boolean;
    message: string;
    data: Data[];
}