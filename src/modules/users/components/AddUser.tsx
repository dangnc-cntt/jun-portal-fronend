import React, {Component} from 'react';
import {userStore} from "../UserStore";
import {Role} from "../UserModel";
import {observer} from "mobx-react";
import css from '@emotion/css';

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
                                    value={userStore.addUser.userName} 
                                    onChange={(e: any) => userStore.addUser.userName = e.currentTarget.value}
                                />
                            </div>
                            <div className="form-group">
                                <label>Display Name<sup className="text-danger">*</sup></label>
                                <input type="text" 
                                    placeholder="Enter display name" 
                                    className="form-control" 
                                    value={userStore.addUser.displayName} 
                                    onChange={(e: any) => userStore.addUser.displayName = e.currentTarget.value}
                                />
                            </div>
                            <div className="form-group">
                                <label>Password<sup className="text-danger">*</sup></label>
                                <div className="position-relative">
                                    <input type={this.state.showPassword ? "text" : "password"} 
                                        placeholder="Enter password" 
                                        className="form-control pr-5" 
                                        autoComplete="new-password" 
                                        value={userStore.addUser.password} 
                                        onChange={(e: any) => userStore.addUser.password = e.currentTarget.value}
                                    />
                                    <button className="btn position-absolute" onClick={() => this.showPassword()} css={btn_show}>{
                                        this.state.showPassword ? 
                                        <i className="fas fa-eye d-block" css={css_icon}/> :
                                        <i className="fas fa-eye-slash d-block" css={css_icon}/>
                                    }</button>
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Role<sup className="text-danger">*</sup></label>
                                <select className="form-control" 
                                    value={userStore.addUser.role} 
                                    onChange={(e: any) => userStore.addUser.role = e.currentTarget.value}
                                >
                                    <option value="">Choose Role</option>
                                    <option value={Role.PUBLISHER}>{Role.PUBLISHER}</option>
                                    <option value={Role.USER}>{Role.USER}</option>
                                    {/* <option value={Role.ADMIN}>{Role.ADMIN}</option> */}
                                </select>
                            </div>
                        </div>
                        <div className="modal-footer border-top-0 pt-0">
                            <button type="button" className="btn" data-dismiss="modal">Cancel</button>
                            <button type="button" onClick={() => userStore.created()} className="btn btn-info">Ok</button>
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