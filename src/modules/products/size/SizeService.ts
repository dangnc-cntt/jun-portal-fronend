import {deleteRequest, getRequest, IApiResponse, postRequest} from "../../../common/helpers/RequestHelper";

class SizeService {

    public getSize(): Promise<IApiResponse> {
        return getRequest(`/v1/portal/products/size`);
    }

    public sizeDetail(id: number): Promise<IApiResponse> {
        return getRequest(`/v1/portal/products/size/${id}`);
    }

    public addSize(name: any): Promise<IApiResponse> {
        return postRequest(`/v1/portal/products/size`, {name: name});
    }

    public deleteSize(id: any): Promise<IApiResponse> {
        return deleteRequest(`/v1/portal/product/size/${id}`, {});
    }
}

export const sizeService = new SizeService();