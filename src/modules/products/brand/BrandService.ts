import {getRequest, IApiResponse, postRequest, putRequest} from "../../../common/helpers/RequestHelper";


class BrandService {

    public getBrand(): Promise<IApiResponse> {
        return getRequest(`/v1/portal/brands`);
    }

    public brandDetail(id: number): Promise<IApiResponse> {
        return getRequest(`/v1/portal/brands/${id}`);
    }

    public editBrand(id: number, name: string, description: string,  logoUrl: string): Promise<IApiResponse> {
        return putRequest(`/v1/portal/brands/${id}`, {name, logoUrl, description});
    }

    public addBrand(name: string, description: string, logoUrl: string): Promise<IApiResponse> {
        return postRequest(`/v1/portal/brands`, {name, logoUrl, description});
    }
}

export const brandService = new BrandService();