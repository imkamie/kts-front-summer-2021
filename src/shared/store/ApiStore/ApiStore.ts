import qs from 'qs';
import {ApiResponse, HTTPMethod, IApiStore, RequestParams, StatusHTTP} from "./types";

export default class ApiStore implements IApiStore {
    readonly baseUrl: string;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    async request<SuccessT, ErrorT = any, ReqT = {}>(params: RequestParams<ReqT>): Promise<ApiResponse<SuccessT, ErrorT>> {
        try {
            let endpoint = `${this.baseUrl}${params.endpoint}`;
            let body = null;
            const headers = { ...params.headers};
            
            if (params.method === HTTPMethod.GET) {
                endpoint = `${endpoint}?${qs.stringify(params.data)}`;
            }

            if (params.method === HTTPMethod.POST) {
                body = JSON.stringify(params.data);
                headers['Content-Type'] = 'application/json;charset=UTF-8';
            }

            const response = await fetch(endpoint, {
                method:params.method,
                headers,
                body
            });

            if (response.ok) {
                return {
                    success: true,
                    data: await response.json(),
                    status: response.status
                }
            }

            return {
                success: false,
                data: await response.json(),
                status: response.status
            }

        } catch (error) {
            return {
                success: false,
                data: null,
                status: StatusHTTP.UNEXPECTED_ERROR
            }
        }
    }
}
