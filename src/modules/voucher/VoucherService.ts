import {deleteRequest, getRequest, IApiResponse, postRequest, putRequest} from "../../common/helpers/RequestHelper";


class VoucherService {

    public getVoucher(): Promise<IApiResponse> {
        return getRequest(`/v1/portal/vouchers`);
    }

    public detailVoucher(id: any): Promise<IApiResponse> {
        return getRequest(`/v1/portal/vouchers/${id}`);
    }

    public addVoucher(data: any): Promise<IApiResponse> {
        return postRequest(`/v1/portal/vouchers`, data);
    }

    public addVoucherUser(id: any, type: any, accountIds: any[]): Promise<IApiResponse> {
        return postRequest(`/v1/portal/vouchers/give/${id}?type=${type}`, accountIds);
    }

    public editVoucher(id: any, data: any): Promise<IApiResponse> {
        return putRequest(`/v1/portal/vouchers/${id}`, data);
    }

    public deleteVoucher(id: any): Promise<IApiResponse> {
        return deleteRequest(`/v1/portal/vouchers/${id}`, {});
    }
}

export const voucherService = new VoucherService();