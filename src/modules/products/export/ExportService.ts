import {getRequest, postRequest, IApiResponse} from "../../../common/helpers/RequestHelper";
import {exportStore} from "./ExportStore";

class ExportService {

    public getExport(gte: any, lte: any): Promise<IApiResponse> {
        return getRequest(`/v1/warehouse/exports?page=${exportStore.page}&size=10${gte ? `&gte=${gte}` : ''}${lte ? `&lte=${lte}` : ''}`);
    }

    public detailExport(id: number): Promise<IApiResponse>{
        return getRequest(`/v1/warehouse/exports/${id}`)
    }

    public addExport(data: any): Promise<IApiResponse>{
        return postRequest(`/v1/warehouse/exports`, data)
    }

}

export const exportService = new ExportService();