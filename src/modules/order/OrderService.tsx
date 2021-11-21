import { getRequest, IApiResponse, putRequest} from "../../common/helpers/RequestHelper";
import {orderStore} from "./OrderStore";


class OrderService {

    public getOrder(gte?: any, lte?: any): Promise<IApiResponse> {
        return getRequest(`/v1/portal/orders?page=${orderStore.page}&size=10${orderStore.accountId ? `&accountId=${orderStore.accountId}` : ''}${gte ? `&gte=${gte}` : ''}${lte ? `&lte=${lte}` : ''}`);
    }

    public detailOrder(id: any): Promise<IApiResponse> {
        return getRequest(`/v1/portal/orders/${id}`);
    }

    public editOrderState(id: any, data: any): Promise<IApiResponse> {
        return putRequest(`/v1/portal/orders/${id}`, data);
    }

}

export const orderService = new OrderService();