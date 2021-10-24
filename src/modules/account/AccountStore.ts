import {action, observable} from "mobx";
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

    async bannedAccount(id: any, state: any) {

        const res = await accountService.bannedAccount(id, state);
        if (res.status === HttpStatusCode.OK) {
            this.listAccount.map((value) => {
                if(value.id === id){
                    value.state = state
                }
            })
        } else {
            toastUtil.error(res.body.message ? res.body.message : 'Update false.');
        }
    }

}

export const accountStore = new AccountStore();
