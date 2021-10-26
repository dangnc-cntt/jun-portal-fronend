import {deleteRequest, getRequest, IApiResponse, postRequest} from "../../../common/helpers/RequestHelper";

class ColorService {

    public getColor(): Promise<IApiResponse> {
        return getRequest(`/v1/portal/products/color`);
    }

    public colorDetail(id: number): Promise<IApiResponse> {
        return getRequest(`/v1/portal/products/color/${id}`);
    }

    public addColor(name: any): Promise<IApiResponse> {
        return postRequest(`/v1/portal/products/color`, {name: name});
    }

    public deleteColor(id: any): Promise<IApiResponse> {
        return deleteRequest(`/v1/portal/product/color/${id}`, {});
    }
}

export const colorService = new ColorService();