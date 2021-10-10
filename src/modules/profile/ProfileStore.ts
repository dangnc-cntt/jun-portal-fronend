import {computed, observable} from "mobx";
import {accountService} from "../authen/AccountService";
import HttpStatusCode from "../../common/constants/HttpErrorCode";
import {toastUtil} from "../../common/utils/ToastUtil";
import {putRequest} from "../../common/helpers/RequestHelper";

export interface IProfile {
    "userId": string,
    "fullName": string,
}

export interface IEditProfile {
    fullName: string,
    role: string,
    phone: string,
    email: string,
    gender: string,
    address: string,
    userName: string,
}

export enum TabActive {
    Account = "account",
    ChangePass = "changePass"
}

export interface IEditPassword {
    password: string,
    confirmPassword: string,
}



class ProfileStore {
    @observable public isLoading: boolean = false;
    @observable public getProfile?: any;
    @observable public isProfile: boolean = false;
    @observable public isOpen: boolean = true;
    @observable public activeTab: string = TabActive.Account;
    @observable public editProfile: IEditProfile = {
        fullName: "",
        role: "",
        address: '',
        email: '',
        gender: '',
        phone: '',
        userName: "",
    };
    @observable public userPassword: IEditPassword = {
        password: '',
        confirmPassword: ''
    };

    @computed get getUserData() {
        return this.getProfile
    }

    async updated() {
        let {userName, fullName, role} = this.editProfile;
        if (!userName) {
            toastUtil.warning('Please enter username.');
        } else if (!fullName) {
            toastUtil.warning('Please enter full name.');
        } else {
            const data: any = {
                userName: userName,
                fullName: fullName,
                role: role,
            }
            const res = await putRequest(`/v1/portal/admin/users/${this.getProfile?.id}`, data);
            if (res.status === HttpStatusCode.OK) {
                this.getProfiles();
                toastUtil.success('Update success');
            } else {
                toastUtil.error(res.body.message ? res.body.message : 'Update false.');
            }
            $('#close_edit_user').trigger('click');
        }
    }

    async changePassword(e: any) {
        e.preventDefault();
        let {userName, fullName, role} = this.editProfile;
        let {password, confirmPassword} = this.userPassword;
        if (!password) {
            toastUtil.warning('Please enter password.');
        } else if (password.length < 6 && password.length > 50) {
            toastUtil.warning('Password must be between 6 and 50 characters.');
        } else if (!confirmPassword) {
            toastUtil.warning('Please enter confirm password.');
        } else if (confirmPassword != password) {
            toastUtil.warning('Password and confirmPassword not match.');
        } else {
            const data: any = {
                userName: userName,
                fullName: fullName,
                role: role,
                confirmedPassword: confirmPassword,
                password: password,
            }
            const res = await putRequest(`/v1/portal/admin/users/${this.getProfile?.id}`, data);
            if (res.status === HttpStatusCode.OK) {
                toastUtil.success('Change password success');
                this.userPassword.password = '';
                this.userPassword.confirmPassword = '';
            } else {
                toastUtil.error(res.body.message ? res.body.message : 'Change password false.');
            }
            $('#close_edit_pass').trigger('click');
        }
    }

    async getProfiles() {
        this.isLoading = true;
        const response = await accountService.getProfile();
        this.isLoading = false;
        if (response.status === HttpStatusCode.OK) {
            this.isProfile = true;
            this.getProfile = response.body;
            this.editProfile = response.body;
        }
    }
}

export const profileStore = new ProfileStore();
