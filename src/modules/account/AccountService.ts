import {getRequest, IApiResponse, putRequest} from "../../common/helpers/RequestHelper";
import {accountStore} from "./AccountStore";


class AccountService {
    public getAccount(): Promise<IApiResponse> {
        return getRequest(`/v1/portal/account`);
    }

    public searchAccount(): Promise<IApiResponse> {
        return getRequest(`/v1/portal/account?fullName=${accountStore.searchName.trim()}`);
    }

    public accountDetail(id: number): Promise<IApiResponse> {
        return getRequest(`/v1/portal/account/${id}`);
    }

    public bannedAccount(id: any, state: any): Promise<IApiResponse> {
        return putRequest(`/v1/portal/account/${id}?state=${state}`, {});
    }
}

export const accountService = new AccountService();
