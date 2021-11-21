import {getRequest, putRequest, postRequest, deleteRequest, IApiResponse} from "../../common/helpers/RequestHelper";
import {productStore} from "./ProductStore";
import {categoryStore} from "../category/CategoryStore";


class ProductService{

    public getProduct(): Promise<IApiResponse> {
        return getRequest(`/v1/portal/products?page=${productStore.page}&size=10${productStore.searchName ? `&name=${productStore.searchName}` : ''}${productStore.isHot ? `&isHot=${productStore.isHot}` : ''}`);
    }

    public productDetail(id: number): Promise<IApiResponse> {
        return getRequest(`/v1/portal/products/${id}`);
    }

    public addProduct(data: any): Promise<IApiResponse> {
        return postRequest(`/v1/portal/products`, data);
    }

    public editProduct(id: any, data: any): Promise<IApiResponse> {
        return putRequest(`/v1/portal/products/${id}`, data);
    }

    public deleteProduct(id: any): Promise<IApiResponse> {
        return deleteRequest(`/v1/portal/products/${id}`, {});
    }
}

export const productService = new ProductService();