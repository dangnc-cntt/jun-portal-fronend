import React, {Component} from 'react';
import {userStore} from "../UserStore";
import {observer} from "mobx-react";
import css from '@emotion/css';
import { Gender } from '../UserModel';

@observer
class AddUser extends Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            showPassword: false
        };
    }
    
    showPassword() {
        this.setState({
            showPassword: !this.state.showPassword
        });
    }

    changeUserName(e: any) {
        e = e.toLowerCase();
        // xóa dấu
        e = e.replace(/(à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ)/g, 'a');
        e = e.replace(/(è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ)/g, 'e');
        e = e.replace(/(ì|í|ị|ỉ|ĩ)/g, 'i');
        e = e.replace(/(ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ)/g, 'o');
        e = e.replace(/(ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ)/g, 'u');
        e = e.replace(/(ỳ|ý|ỵ|ỷ|ỹ)/g, 'y');
        e = e.replace(/(đ)/g, 'd');
        // Xóa ký tự đặc biệt
        e = e.replace(/([^0-9a-z-\s])/g, '');
        // Xóa khoảng trắng
        e = e.replace(/(\s+)/g, '');
        // xóa phần dự - ở đầu
        e = e.replace(/^-+/g, '');
        // xóa phần dư - ở cuối
        e = e.replace(/-+$/g, '');
        // return
        userStore.dataRequest.username = e;
    }

    render() {
        return (
            <div className="modal fade" id="addUser" tabIndex={-1} role="dialog" aria-hidden="true">
                <div className="modal-dialog w-100 h-100 d-flex align-items-center justify-content-center m-0" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h3 className="mb-0">Add User</h3>
                            <button type="button" id="close_add_user" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="form-group">
                                <label>Username<sup className="text-danger">*</sup></label>
                                <input type="text" 
                                    placeholder="Enter username" 
                                    className="form-control" 
                                    value={userStore.dataRequest.username}
                                    onChange={(e: any) => this.changeUserName(e.currentTarget.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label>FullName<sup className="text-danger">*</sup></label>
                                <input type="text" 
                                    placeholder="Enter display name" 
                                    className="form-control" 
                                    value={userStore.dataRequest.fullName}
                                    onChange={(e: any) => userStore.dataRequest.fullName = e.currentTarget.value}
                                />
                            </div>
                            <div className="form-group">
                                <label>Password<sup className="text-danger">*</sup></label>
                                <div className="position-relative">
                                    <input type={this.state.showPassword ? "text" : "password"} 
                                        placeholder="Enter password" 
                                        className="form-control pr-5" 
                                        autoComplete="new-password" 
                                        value={userStore.dataRequest.password}
                                        onChange={(e: any) => userStore.dataRequest.password = e.currentTarget.value}
                                    />
                                    <button className="btn position-absolute" onClick={() => this.showPassword()} css={btn_show}>{
                                        this.state.showPassword ? 
                                        <i className="fas fa-eye d-block" css={css_icon}/> :
                                        <i className="fas fa-eye-slash d-block" css={css_icon}/>
                                    }</button>
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Phone<sup className="text-danger">*</sup></label>
                                <input type="text"
                                       placeholder="Enter Phone number"
                                       className="form-control"
                                       value={userStore.dataRequest.phone}
                                       onChange={(e: any) => userStore.dataRequest.phone = e.currentTarget.value}
                                />
                            </div>
                            <div className="form-group">
                                <label>Email<sup className="text-danger">*</sup></label>
                                <input type="text"
                                       placeholder="Enter email"
                                       className="form-control"
                                       value={userStore.dataRequest.email}
                                       onChange={(e: any) => userStore.dataRequest.email = e.currentTarget.value}
                                />
                            </div>
                            <div className="form-group">
                                <label>Gender<sup className="text-danger">*</sup></label>
                                <select className="form-control" 
                                    value={userStore.dataRequest.gender}
                                    onChange={(e: any) => userStore.dataRequest.gender = e.currentTarget.value}>
                                    <option value="">Choose Gender</option>
                                    <option value={Gender.OTHER}>{Gender.OTHER}</option>
                                    <option value={Gender.MALE}>{Gender.MALE}</option>
                                    <option value={Gender.FEMALE}>{Gender.FEMALE}</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Address</label>
                                <input type="text"
                                       placeholder="Enter address"
                                       className="form-control"
                                       value={userStore.dataRequest.address}
                                       onChange={(e: any) => userStore.dataRequest.address = e.currentTarget.value}
                                />
                            </div>
                        </div>
                        <div className="modal-footer border-top-0 pt-0">
                            <button type="button" className="btn" data-dismiss="modal">Cancel</button>
                            <button type="button" onClick={() => userStore.created()} className="btn btn-info">Created</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default AddUser;

const css_icon = css`
font-size: 20px;`;

const btn_show = css`
padding: 0;
top: 50%;
right: 15px;
transform: translateY(-50%);`;