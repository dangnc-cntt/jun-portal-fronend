import {action, observable} from "mobx";
import $ from "jquery";
import HttpStatusCode from "../../common/constants/HttpErrorCode";
import {toastUtil} from "../../common/utils/ToastUtil";
import {accountService} from "./AccountService";

class AccountStore {
    @observable public isLoading: boolean = false;
    @observable public isLoadingButton: boolean = false;
    @observable public isGetDetail: boolean = false;
    @observable public searchName: string = '';
    @observable public page: number = 0;
    @observable public userId: number = 0;
    @observable public totalPages: number = 0;
    @observable public listAccount: any[] = [];
    @observable public dataRequest: any = {
        id: 0,
        userName: "",
        fullName: "",
        password: "",
        address: "",
        email: "",
        gender: "",
        phone: ""
    };

    @action async clearForm() {
        this.dataRequest = {
            id: 0,
            userName: "",
            fullName: "",
            password: "",
            address: "",
            email: "",
            gender: "",
            phone: ""
        }
    }

    @action async getAccount() {
        const result = await accountService.getAccount();
        if (result.status === HttpStatusCode.OK) {
            this.listAccount = result.body.data;
            this.totalPages = result.body.metadata.totalPages;
        } else {
            toastUtil.error(result.body.message ? result.body.message : 'Get list user false.');
        }
    }

    @action async searchAccount() {
        const result = await accountService.searchAccount();
        if (result.status === HttpStatusCode.OK) {
            this.listAccount = result.body.data;
            this.totalPages = result.body.metadata.totalPages;
        } else {
            toastUtil.error(result.body.message ? result.body.message : 'Search user false.');
        }
    }

    @action async accountDetail(id: number) {
        this.isGetDetail = true;
        this.clearForm();
        const result = await accountService.accountDetail(id);
        if (result.status === HttpStatusCode.OK) {
            this.dataRequest = result.body;
        } else {
            toastUtil.error(result.body.message ? result.body.message : 'Get detail user false.');
        }
        this.isGetDetail = false;
    }

    async updated() {
        let { id, userName, password, fullName, email, gender, address, phone } = this.dataRequest;
        if(!userName) {
            toastUtil.warning('Please enter username.');
            return false;
        }
        if(userName.length < 6 || userName.length>18) {
            toastUtil.warning('Username must be 6 to 18 character.');
            return false;
        }
        if(!fullName) {
            toastUtil.warning('Please enter Full name.');
            return false;
        }
        if(!email) {
            toastUtil.warning('Please enter Email.');
            return false;
        }
        if(!password) {
            toastUtil.warning('Please enter password.');
            return false;
        }
        if(password.length < 6 || password.length>18) {
            toastUtil.warning('Username must be 6 to 18 character.');
            return false;
        }
        if(!phone) {
            toastUtil.warning('Please enter Phone.');
            return false;
        }
        if(!address) {
            toastUtil.warning('Please enter Address.');
            return false;
        }
        if(!gender) {
            toastUtil.warning('Please enter Gender.');
            return false;
        }

        const data = {
            userName: userName,
            fullName: fullName,
            email: email,
            password: password,
            gender: gender,
            address: address,
            phone: phone,
        }
        const res = await accountService.updateAccount(id, data);
        if (res.status === HttpStatusCode.OK) {
            this.getAccount();
            toastUtil.success('Update user success');
            $('#close_edit_account').trigger('click');
        } else {
            toastUtil.error(res.body.message ? res.body.message : 'Update false.');
        }
    }

}

export const accountStore = new AccountStore();
