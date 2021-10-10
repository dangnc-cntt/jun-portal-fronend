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
    username: string,
}

export enum TabActive {
    Account = "account",
    ChangePass = "changePass"
}

export interface IEditPassword {
    oldPassword: string,
    newPassword: string,
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
        username: "",
    };
    @observable public userPassword: IEditPassword = {
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
    };

    @computed get getUserData() {
        return this.getProfile
    }

    async updated() {
        let {username, fullName, gender, address, email,phone} = this.editProfile;
        if (!username) {
            toastUtil.warning('Please enter username.');
        } else if (!fullName) {
            toastUtil.warning('Please enter full name.');
        } else {
            const data: any = {
                username: username,
                fullName: fullName,
                gender: gender,
                email: email,
                phone: phone,
                address: address
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
        let {oldPassword, newPassword, confirmPassword} = this.userPassword;
        if (!oldPassword) {
            toastUtil.warning('Please enter oldPassword.');
            return false;
        }
        if (!newPassword) {
            toastUtil.warning('Please enter newPassword.');
            return false;
        }
        if (newPassword.length < 6 && newPassword.length > 50) {
            toastUtil.warning('Password must be between 6 and 50 characters.');
            return false
        }
         if (!confirmPassword) {
            toastUtil.warning('Please enter confirm password.');
             return false
        }
         if (confirmPassword != newPassword) {
            toastUtil.warning('Password and confirmPassword not match.');
             return false
        }

         const data: any = {
            oldPassword: oldPassword,
            newPassword: newPassword,
            confirmedPassword: confirmPassword,
        }
        const res = await putRequest(`/v1/portal/users/change_password`, data);
        if (res.status === HttpStatusCode.OK) {
            toastUtil.success('Change password success');
            this.userPassword.oldPassword = '';
            this.userPassword.newPassword = '';
            this.userPassword.confirmPassword = '';
        } else {
            toastUtil.error(res.body.message ? res.body.message : 'Change password false.');
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
