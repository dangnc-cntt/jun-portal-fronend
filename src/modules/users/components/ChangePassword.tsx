import React, {Component} from 'react';
import {userStore} from "../UserStore";
import {observer} from "mobx-react";
import css from '@emotion/css';

@observer
class ChangePassword extends Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            showPassword: false,
            showConfirmPassword: false
        };
    }

    showPassword() {
        this.setState({
            showPassword: !this.state.showPassword
        });
    }

    showConfirmPassword() {
        this.setState({
            showConfirmPassword: !this.state.showConfirmPassword
        });
    }

    render() {
        return (
            <div className="modal fade" id="editPassword" tabIndex={-1} role="dialog" aria-hidden="true">
                <div className="modal-dialog w-100 h-100 d-flex align-items-center justify-content-center m-0" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h3 className="mb-0">Change Password</h3>
                            <button type="button" id="close_edit_pass" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="form-group">
                                <label>Password<sup className="text-danger">*</sup></label>
                                <div className="position-relative">
                                    <input type={this.state.showPassword ? "text" : "password"} 
                                        placeholder="Enter password" 
                                        className="form-control pr-5" 
                                        autoComplete="new-password" 
                                        value={userStore.userPassword.password} 
                                        onChange={(e) => userStore.userPassword.password = e.currentTarget.value} 
                                    />
                                    <button className="btn position-absolute" onClick={() => this.showPassword()} css={btn_show}>{
                                        this.state.showPassword ? 
                                        <i className="fas fa-eye d-block" css={css_icon}></i> :
                                        <i className="fas fa-eye-slash d-block" css={css_icon}></i>
                                    }</button>
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Confirm Password<sup className="text-danger">*</sup></label>
                                <div className="position-relative">
                                    <input type={this.state.showConfirmPassword ? "text" : "password"} 
                                        placeholder="Enter password" 
                                        className="form-control pr-5" 
                                        autoComplete="new-password" 
                                        value={userStore.userPassword.confirmPassword} 
                                        onChange={(e) => userStore.userPassword.confirmPassword = e.currentTarget.value} 
                                    />
                                    <button className="btn position-absolute" onClick={() => this.showConfirmPassword()} css={btn_show}>{
                                        this.state.showConfirmPassword ? 
                                        <i className="fas fa-eye d-block" css={css_icon}></i> :
                                        <i className="fas fa-eye-slash d-block" css={css_icon}></i>
                                    }</button>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer border-top-0 pt-0">
                            <button type="button" className="btn" data-dismiss="modal">Cancel</button>
                            <button type="button" onClick={() => userStore.changePassword()} className="btn btn-info">Ok</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ChangePassword;

const css_icon = css`
font-size: 20px;`;

const btn_show = css`
padding: 0;
top: 50%;
right: 15px;
transform: translateY(-50%);`;