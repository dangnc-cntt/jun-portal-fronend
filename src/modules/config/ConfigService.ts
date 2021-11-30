import {getRequest, putRequest, postRequest, deleteRequest, IApiResponse} from "../../common/helpers/RequestHelper";

class ConfigService{
    public getConfig(): Promise<IApiResponse>{
        return getRequest(`v1/portal/config`)
    }
    public addConfig(data: any): Promise<IApiResponse>{
        return postRequest(`v1/portal/config`, data)
    }
    public editConfig(key: string, data: any): Promise<IApiResponse>{
        return putRequest(`v1/portal/config/${key}`, data)
    }
    public detailConfig(key: string): Promise<IApiResponse>{
        return getRequest(`v1/portal/config/${key}`)
    }
    public deleteConfig(key: string): Promise<IApiResponse>{
        return deleteRequest(`v1/portal/config/${key}`, {})
    }
}

export const configService = new ConfigService()