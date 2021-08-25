export enum HTTPMethod {
    GET = 'GET',
    POST = 'POST'
}

export type RequestParams<ReqT> = {
    method: HTTPMethod;
    endpoint: string;
    headers: Record<string, string>;
    data: ReqT;
}

export enum StatusHTTP {
    OK = 200,
    ERROR = 404,
    UNEXPECTED_ERROR = 'UNEXPECTED_ERROR'
}

export type ApiResponse<SuccessT, ErrorT> =
    | {
    success: true;
    data: SuccessT;
    status: StatusHTTP;
}
    | {
    success: false;
    data: ErrorT;
    status: StatusHTTP;
}
    | {
        success: false;
        data: null;
        status: StatusHTTP;
    
};

export interface IApiStore {
    readonly baseUrl: string;

    request<SuccessT, ErrorT = any, ReqT = {}>(params: RequestParams<ReqT>): Promise<ApiResponse<SuccessT, ErrorT>>
}
