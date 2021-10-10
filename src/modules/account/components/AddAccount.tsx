import React, {Component} from 'react';
import {observer} from "mobx-react";
import css from '@emotion/css';
import {accountStore} from "../AccountStore";

@observer
class AddAccount extends Component<any, any> {
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
                            <h3 className="mb-0">Add Account</h3>
                            <button type="button" id="close_add_account" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="form-group">
                                <label>Username<sup className="text-danger">*</sup></label>
                                <input type="text"
                                       placeholder="Enter username"
                                       className="form-control"
                                       value={accountStore.dataRequest.userName}
                                       onChange={(e: any) => accountStore.dataRequest.userName = e.currentTarget.value}
                                />
                            </div>
                            <div className="form-group">
                                <label>Full Name<sup className="text-danger">*</sup></label>
                                <input type="text"
                                       placeholder="Enter display name"
                                       className="form-control"
                                       value={accountStore.dataRequest.fullName}
                                       onChange={(e: any) => accountStore.dataRequest.fullName = e.currentTarget.value}
                                />
                            </div>
                            <div className="form-group">
                                <label>Password<sup className="text-danger">*</sup></label>
                                <div className="position-relative">
                                    <input type={this.state.showPassword ? "text" : "password"}
                                           placeholder="Enter password"
                                           className="form-control pr-5"
                                           autoComplete="new-password"
                                           value={accountStore.dataRequest.password}
                                           onChange={(e: any) => accountStore.dataRequest.password = e.currentTarget.value}
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
                                       value={accountStore.dataRequest.phone}
                                       onChange={(e: any) => accountStore.dataRequest.phone = e.currentTarget.value}
                                />
                            </div>
                            <div className="form-group">
                                <label>Email<sup className="text-danger">*</sup></label>
                                <input type="text"
                                       placeholder="Enter email"
                                       className="form-control"
                                       value={accountStore.dataRequest.email}
                                       onChange={(e: any) => accountStore.dataRequest.email = e.currentTarget.value}
                                />
                            </div>
                            <div className="form-group">
                                <label>Gender<sup className="text-danger">*</sup></label>
                                <select className="form-control"
                                        value={accountStore.dataRequest.gender}
                                        onChange={(e: any) => accountStore.dataRequest.gender = e.currentTarget.value}>
                                    <option value="">Choose Role</option>
                                    <option value="MALE">Nữ</option>
                                    <option value="MALE">Nữ</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Address<sup className="text-danger">*</sup></label>
                                <input type="text"
                                       placeholder="Enter name"
                                       className="form-control"
                                       value={accountStore.dataRequest.address}
                                       onChange={(e: any) => accountStore.dataRequest.address = e.currentTarget.value}
                                />
                            </div>
                        </div>
                        <div className="modal-footer border-top-0 pt-0">
                            <button type="button" className="btn" data-dismiss="modal">Cancel</button>
                            <button type="button" onClick={() => accountStore.created()} className="btn btn-info">Create</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default AddAccount;

const css_icon = css`
font-size: 20px;`;

const btn_show = css`
padding: 0;
top: 50%;
right: 15px;
transform: translateY(-50%);`;