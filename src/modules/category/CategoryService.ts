import {deleteRequest, getRequest, IApiResponse, postRequest, putRequest} from "../../common/helpers/RequestHelper";
import {categoryStore} from "./CategoryStore";

class CategoryService{

    public getCategory(): Promise<IApiResponse> {
        return getRequest(`/v1/portal/categories?page=${categoryStore.page}&size=10`);
    }

    public categoryDetail(id: number): Promise<IApiResponse> {
        return getRequest(`/v1/portal/categories/${id}`);
    }

    public addCate(data: any): Promise<IApiResponse> {
        return postRequest(`/v1/portal/categories`, data);
    }

    public editCate(id: number, data: any): Promise<IApiResponse> {
       return putRequest(`/v1/portal/categories/${id}`, data);
    }

    public deleteCate(id: any): Promise<IApiResponse> {
        return deleteRequest(`/v1/portal/categories/${id}`, {});
    }
}

export const categoryService = new CategoryService();