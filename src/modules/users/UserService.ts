import { AnyMxRecord } from "dns";
import {deleteRequest, getRequest, IApiResponse, postRequest, putRequest} from "../../common/helpers/RequestHelper";
import {userStore} from "./UserStore";

class UserService {
    public getUsers(): Promise<IApiResponse> {
        return getRequest(`/v1/portal/admin/users`);
    }

    public searchUser(): Promise<IApiResponse> {
        return getRequest(`/v1/portal/admin/users?fullName=${userStore.searchName.trim()}`);
    }

    public userDetail(id: number): Promise<IApiResponse> {
        return getRequest(`/v1/portal/admin/users/${id}`);
    }

    public updateUser(id: any, data: any): Promise<IApiResponse> {
        return putRequest(`/v1/portal/admin/users/${id}`, data);
    }

    public addUser(data: any): Promise<IApiResponse> {
        return postRequest(`/v1/portal/admin/users`, data);
    }

    public deleteUser(id: number): Promise<IApiResponse> {
        return deleteRequest(`/v1/portal/admin/users/${id}`, {});
    }

    public changePass(id: any, data: any): Promise<IApiResponse> {
        return putRequest(`/v1/portal/admin/users/${id}`, data);
    }
}

export const userService = new UserService();
