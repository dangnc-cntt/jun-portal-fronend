import {deleteRequest, getRequest, IApiResponse, postRequest, putRequest} from "../../common/helpers/RequestHelper";
import {accountStore} from "./AccountStore";


class AccountService {
    public getAccount(): Promise<IApiResponse> {
        return getRequest(`/v1/portal/users`);
    }

    public searchAccount(): Promise<IApiResponse> {
        return getRequest(`/v1/portal/users?fullName=${accountStore.searchName.trim()}`);
    }

    public accountDetail(id: number): Promise<IApiResponse> {
        return getRequest(`/v1/portal/users/${id}`);
    }

    public updateAccount(id: any, data: any): Promise<IApiResponse> {
        return putRequest(`/v1/portal/users/${id}`, data);
    }
}

export const accountService = new AccountService();
