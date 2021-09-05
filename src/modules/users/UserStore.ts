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
    @observable public userList: model.IListUser[] = [];
    @observable public addUser: model.IAddUser = {
        userName: "",
        displayName: "",
        password: "",
        role: "",
    };
    @observable public editUser: model.IEditUser = {
        id: 0,
        userName: "",
        displayName: "",
        state: "",
        role: "",
    };
    @observable public userPassword: model.IEditPassword = {
        password: '',
        confirmPassword: ''
    };

    @action async clearFormEdit() {
        this.editUser.id = 0;
        this.editUser.userName = "";
        this.editUser.displayName = "";
        this.editUser.state = "";
        this.editUser.role = "";
    }
    
    @action async clearFormAdd() {
        this.addUser.userName = "";
        this.addUser.displayName = "";
        this.addUser.password = "";
        this.addUser.role = "";
    }

    @action async getUsers() {
        const result = await userService.getUsers();
        if (result.status === HttpStatusCode.OK) {
            this.userList = result.body.data;
            this.totalPages = result.body.metadata.totalPages;
        } else {
            toastUtil.error(result.body.message ? result.body.message : 'Get list user false.');
        }
    }

    @action async searchUser() {
        const result = await userService.searchUser();
        if (result.status === HttpStatusCode.OK) {
            this.userList = result.body.data;
            this.totalPages = result.body.metadata.totalPages;
        } else {
            toastUtil.error(result.body.message ? result.body.message : 'Search user false.');
        }
    }

    @action async userDetail(id: number) {
        this.isGetDetail = true;
        this.clearFormEdit();
        const result = await userService.userDetail(id);
        if (result.status === HttpStatusCode.OK) {
            this.editUser = result.body;
        } else {
            toastUtil.error(result.body.message ? result.body.message : 'Get detail user false.');
        }
        this.isGetDetail = false;
    }

    async updated() {
        let { id, userName, displayName, state, role } = this.editUser;
        if(!userName) {
            toastUtil.warning('Please enter username.');
        } else if(userName.length<6 || userName.length>18) {
            toastUtil.warning('Username must be 6 to 18 character.');
		} else if(!displayName) {
            toastUtil.warning('Please enter display name.');
        } else if(!role) {
            toastUtil.warning('Please choose role.');
        } else {
            const data: model.IEditUser = {
                userName: userName,
                displayName: displayName,
                state: state,
                role: role,
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
    }

    async created() {
        let { userName, password, displayName, role } = this.addUser;
        if(!userName) {
            toastUtil.warning('Please enter username.');
        } else if(userName.length<6 || userName.length>18) {
            toastUtil.warning('Username must be 6 to 18 character.');
		} else if(!displayName) {
            toastUtil.warning('Please enter display name.');
        } else if(password.length<6 || password.length>24) {
            toastUtil.warning('Password must be 6 to 24 character.');
		} else if(!password) {
            toastUtil.warning('Please enter password.');
        } else if(!role) {
            toastUtil.warning('Please choose role.');
        } else {
            const data: model.IAddUser = {
                userName: userName,
                password: password,
                displayName: displayName,
                role: role,
            }
            const res = await userService.addUser(data);
            if (res.status === HttpStatusCode.OK) {
                this.getUsers();
                toastUtil.success('Create user success');
				$('#close_add_user').trigger('click');
				this.clearFormAdd();
            } else {
                toastUtil.error(res.body.message ? res.body.message : 'Add false.');
            }
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

    async changePassword() {
        let { id, userName, displayName, state, role } = this.editUser;
        let { password, confirmPassword } = this.userPassword;
        if(!password) {
            toastUtil.warning('Please enter password.');
        } else if(password.length < 6 && password.length > 24) {
            toastUtil.warning('Password must be between 6 and 24 characters.');
        } else if(!confirmPassword) {
            toastUtil.warning('Please enter confirm password.');
        } else if(confirmPassword != password) {
            toastUtil.warning('Password and confirmPassword not match.');
        } else {
            const data: any = {
                userName: userName,
                displayName: displayName,
                state: state,
                role: role,
                confirmedPassword: confirmPassword,
                password: password,
            }
            const res = await userService.changePass(id, data);
            if (res.status === HttpStatusCode.OK) {
                toastUtil.success('Change password success');
				this.userPassword.password = "";
				this.userPassword.confirmPassword = "";
				$('#close_edit_pass').trigger('click');
            } else {
                toastUtil.error(res.body.message ? res.body.message : 'Change password false.');
            }
        }
    }
}

export const userStore = new UserStore();
