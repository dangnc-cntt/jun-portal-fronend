import {getRequest, postRequest, IApiResponse} from "../../../common/helpers/RequestHelper";
import {receiptStore} from "./ReceiptStore";

class ReceiptService {

    public getReceipt(): Promise<IApiResponse>{
        return getRequest(`/v1/warehouse/receipts?page=${receiptStore.page}&size=10`)
    }

    public detailReceipt(id: number): Promise<IApiResponse>{
        return getRequest(`/v1/warehouse/receipts/${id}`)
    }

    public addReceipt(data: any): Promise<IApiResponse>{
        return postRequest(`/v1/warehouse/receipts`, data)
    }

    public optionList(id: any): Promise<IApiResponse>{
        return getRequest(`/v1/portal/products/option/${id}`)
    }
}

export const receiptService = new ReceiptService();