import {deleteRequest, getRequest, IApiResponse, postRequest, putRequest} from "../../common/helpers/RequestHelper";
import {configStore} from "./ConfigStore";

class ConfigService{

    public getConfig(): Promise<IApiResponse> {
        return getRequest(`/v1/portal/config?page=${configStore.page}&size=10`);
    }

    public configDetail(configKey: string): Promise<IApiResponse> {
        return getRequest(`/v1/portal/config/${configKey}`);
    }

    public addConfig(data: any): Promise<IApiResponse> {
        return postRequest(`/v1/portal/config`, data);
    }

    public editConfig(data: any): Promise<IApiResponse> {
        return putRequest(`/v1/portal/config`, data);
    }

    public deleteConfig(configKey: string): Promise<IApiResponse> {
        return deleteRequest(`/v1/portal/config/${configKey}`, {});
    }
}

export const configService = new ConfigService();