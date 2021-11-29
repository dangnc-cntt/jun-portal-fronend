import {action, observable} from "mobx";
import {userService} from "./UserService";
import HttpStatusCode from "../../common/constants/HttpErrorCode";
import {toastUtil} from "../../common/utils/ToastUtil";
import $ from "jquery";
import * as model from './UserModel';




class UserStore {
    @observable public isLoading: boolean = false;
    @observable public isLoadingButton: boolean = false;
    @observable public isGetDetail: boolean = false;
    @observable public searchName: string = '';
    @observable public page: number = 0;
    @observable public userId: number = 0;
    @observable public totalPages: number = 0;
    @observable public userLists: model.IListUser[] = [];
    @observable public dataRequest: model.IAddUser = {
        id: 0,
        username: "",
        fullName: "",
        password: "",
        address: "",
        email: "",
        role: '',
        gender: "",
        phone: ""
    };

    @action async clearForm() {
        this.dataRequest = {
            id: 0,
            username: "",
            fullName: "",
            password: "",
            address: "",
            email: "",
            role: '',
            gender: "",
            phone: ""
        }
    }

    @action async getUsers() {
        const result = await userService.getUsers();
        if (result.status === HttpStatusCode.OK) {
            this.userLists = result.body.data;
            this.totalPages = result.body.metadata.totalPages;
        } else {
            toastUtil.error(result.body.message ? result.body.message : 'Get list user false.');
        }
    }

    @action async searchUser() {
        const result = await userService.searchUser();
        if (result.status === HttpStatusCode.OK) {
            this.userLists = result.body.data;
            this.totalPages = result.body.metadata.totalPages;
        } else {
            toastUtil.error(result.body.message ? result.body.message : 'Search user false.');
        }
    }

    @action async userDetail(id: number) {
        this.isGetDetail = true;
        this.clearForm();
        const result = await userService.userDetail(id);
        if (result.status === HttpStatusCode.OK) {
            this.dataRequest = result.body;
        } else {
            toastUtil.error(result.body.message ? result.body.message : 'Get detail user false.');
        }
        this.isGetDetail = false;
    }

    async updateState(id: number, state: string) {
        const result = await userService.changeStatus(id, state);
        if (result.status === HttpStatusCode.OK) {
            toastUtil.success(`${state === "BANNED" ? "Khóa" : "Mở khóa"} tài khoản thành công`);
            this.userLists.map((item) => {
                if(item.id == id){
                    item.state = state
                }
            })
        }else {
            toastUtil.error(result.body.message ? result.body.message : 'Get detail user false.');
        }
    }

    async updated() {
        let { id, username, password, fullName, email, gender, address, phone, role} = this.dataRequest;

        if(!fullName) {
            toastUtil.warning('Please enter Full name.');
            return false;
        }
        if(!email) {
            toastUtil.warning('Please enter Email.');
            return false;
        }
        if(!phone) {
            toastUtil.warning('Please enter Phone.');
            return false;
        }
        if(!role) {
            toastUtil.warning('Please enter Role.');
            return false;
        }
        if(!gender) {
            toastUtil.warning('Please enter Gender.');
            return false;
        }
        if(!address) {
            toastUtil.warning('Please enter Address.');
            return false;
        }

        const data = {
            username: username,
            fullName: fullName,
            email: email,
            password: password,
            gender: gender,
            role: role,
            address: address,
            phone: phone,
        }
        const res = await userService.updateUser(id, data);
        if (res.status === HttpStatusCode.OK) {
            this.getUsers();
            toastUtil.success('Update user success');
            $('#close_edit_user').trigger('click');
        } else {
            toastUtil.error(res.body.message ? res.body.message : 'Update false.');
        }
    }

    async created() {
        let {  username, password, fullName, email, gender, address, phone, role } = this.dataRequest;
        if(!username) {
            toastUtil.warning('Please enter username.');
            return false;
        }
        if(username.length < 6 || username.length>18) {
            toastUtil.warning('Username must be 6 to 18 character.');
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
        if(!fullName) {
            toastUtil.warning('Please enter Full name.');
            return false;
        }
        if(!email) {
            toastUtil.warning('Please enter Email.');
            return false;
        }
        if(!phone) {
            toastUtil.warning('Please enter Phone.');
            return false;
        }
        if(!role) {
            toastUtil.warning('Please enter Role.');
            return false;
        }

        if(!gender) {
            toastUtil.warning('Please enter Gender.');
            return false;
        }
        if(!address) {
            toastUtil.warning('Please enter Address.');
            return false;
        }

        const data = {
            username: username,
            fullName: fullName,
            email: email,
            password: password,
            gender: gender,
            role: role,
            address: address,
            phone: phone,
        }

        const res = await userService.addUser(data);
        if (res.status === HttpStatusCode.OK) {
            this.getUsers();
            toastUtil.success('Create user success');
            $('#close_add_user').trigger('click');
            this.clearForm();
        } else {
            toastUtil.error(res.body.message ? res.body.message : 'Add false.');
        }
    }

    async deleteUser() {
        const res = await userService.deleteUser(this.userId);
        if (res.status === HttpStatusCode.OK) {
            this.getUsers();
            toastUtil.success('Delete user success');
        } else {
            toastUtil.error(res.body.message ? res.body.message : 'Delete false.');
        }
        $('#close_delete_user').trigger('click');
    }

}

export const userStore = new UserStore();
