import React, {Component} from 'react';
import {observer} from "mobx-react";
import {profileStore,TabActive} from "../../profile/ProfileStore";
import {css} from "@emotion/core";
import "../styles/profileStyle.scss"
import { requestUtils } from '../../../common/utils/RequestUtil';
import Loading from '../../../common/component/Loading';

@observer
class Profile extends Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            showPassword: false,
            showConfirmPassword: false
        };
    }

    public activeTab(tab: any) {
        requestUtils.saveQueryParam(this.props, {tab: tab});
        profileStore.activeTab = tab
    }

    showPassword(e: any) {
        e.preventDefault()
        this.setState({
            showPassword: !this.state.showPassword
        });
    }

    showConfirmPassword(e: any) {
        e.preventDefault()
        this.setState({
            showConfirmPassword: !this.state.showConfirmPassword
        });
    }

    render() {
        return (
            <div className="content-wrapper update-account">
                <div className="row d-flex align-items-center justify-content-between mb-3">
                    <div className="ml-2 d-flex align-items-baseline flex-wrap mt-3 mb-2">
                        <h2 className="mr-4 mb-0">Profiles</h2>
                    </div>
                </div>
                <div className="card">
                    <div className="card-body">
                        <ul className="nav nav-tabs" role="tablist">
                            <li className="nav-item" onClick={() => this.activeTab(TabActive.Account)}>
                                <a className={`nav-link ${profileStore.activeTab === TabActive.Account ? "active show" : ""}`}
                                    id="profile-tab" data-toggle="tab"
                                    href="#profile_update" role="tab" aria-controls="profile-1"
                                    aria-selected="false">Profile</a>
                            </li>
                            <li className="nav-item" onClick={() => this.activeTab(TabActive.ChangePass)}>
                                <a className={`nav-link ${profileStore.activeTab === TabActive.ChangePass ? "active show" : ""}`}
                                    id="contact-tab" data-toggle="tab" href="#account_setting"
                                    role="tab" aria-controls="contact-1" aria-selected="false">Change Password</a>
                            </li>
                        </ul>
                        { profileStore.isLoading ? <Loading/> :
                            <div className="tab-content pt-3">
                                <div className={`tab-pane fade ${profileStore.activeTab === TabActive.Account ? "active show" : ""}`} id="profile_update" role="tabpanel" aria-labelledby="profile-tab">
                                    {/* <div className="title mb-3 col-12">
                                        <h4>Your Avatar</h4>
                                    </div>
                                    <div className="upload_avatar border-bottom col-12 pb-4 d-flex align-items-center">
                                        <div className="avatar">
                                            {this.showAvatar()}
                                        </div>
                                        <div className="upload">
                                            <button type="button" className="btn mt-3 btn-outline-info btn-sm position-relative">
                                                <input css={css_input_file} accept=".png, .jpg, .jpeg" 
                                                    type="file" className="btn btn-outline-info" 
                                                    // onChange={(e: any) => this.onChange(e)}
                                                /> 
                                                Upload avatar 
                                            </button>
                                        </div>
                                    </div> */}
                                    <div className="profile_info col-6 pt-3 pb-3">
                                        <div className="title mb-3 w-100">
                                            <h4>Profile info</h4>
                                        </div>
                                        <div className="form-group">
                                            <label>Account Id</label>
                                            <input type="text" 
                                                defaultValue={profileStore.getProfile?.id} 
                                                className='form-control form-control-lg' 
                                                disabled={true}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>User Name</label>
                                            <input type="text" 
                                                defaultValue={profileStore.editProfile.userName}
                                                onChange={(e: any) => profileStore.editProfile.userName = e.currentTarget.value}
                                                className='form-control form-control-lg'
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Full Name</label>
                                            <input type="text" 
                                                defaultValue={profileStore.editProfile.fullName}
                                                onChange={(e: any) => profileStore.editProfile.fullName = e.currentTarget.value}
                                                className='form-control form-control-lg'
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Role</label>
                                            <input type="text" 
                                                defaultValue={profileStore.editProfile.role}
                                                disabled={true}
                                                className='form-control form-control-lg'
                                            />
                                        </div>
                                        <div className="footer_bt">
                                            <button type="button" className="btn btn-info"
                                                onClick={() => profileStore.updated()}
                                            >Save</button>
                                        </div>
                                    </div>
                                </div>
                                <div className={`tab-pane fade ${profileStore.activeTab === TabActive.ChangePass ? "active show" : ""}`} id="account_setting" role="tabpanel" aria-labelledby="contact-tab">
                                    <div className="profile_info col-6 pt-3 pb-3">
                                        <div className="title mb-3">
                                            <h4>Change your password</h4>
                                        </div>
                                        <form className="channel_pass">
                                            <div className="form-group">
                                                <label>New Password</label>
                                                <div className="position-relative">
                                                    <input autoComplete="new-password" 
                                                        type={this.state.showPassword ? "text" : "password"} 
                                                        className='form-control form-control-lg'
                                                        defaultValue={profileStore.userPassword.password} 
                                                        onChange={(e: any) => profileStore.userPassword.password = e.currentTarget.value}
                                                        placeholder="Enter your new password"
                                                    />
                                                    <button className="btn position-absolute" onClick={(e) => this.showPassword(e)} css={btn_show}>{
                                                        this.state.showPassword ? 
                                                        <i className="fas fa-eye d-block" css={css_icon}/> :
                                                        <i className="fas fa-eye-slash d-block" css={css_icon}/>
                                                    }</button>
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <label>Confirm New Password</label>
                                                <div className="position-relative">
                                                    <input autoComplete="new-password" 
                                                        type={this.state.showConfirmPassword ? "text" : "password"} 
                                                        className='form-control form-control-lg'
                                                        defaultValue={profileStore.userPassword.confirmPassword} 
                                                        onChange={(e: any) => profileStore.userPassword.confirmPassword = e.currentTarget.value}
                                                        placeholder="Enter your new password again"
                                                    />
                                                    <button className="btn position-absolute" onClick={(e) => this.showConfirmPassword(e)} css={btn_show}>{
                                                        this.state.showConfirmPassword ? 
                                                        <i className="fas fa-eye d-block" css={css_icon}/> :
                                                        <i className="fas fa-eye-slash d-block" css={css_icon}/>
                                                    }</button>
                                                </div>
                                            </div>
                                            <div className="footer_bt">
                                                <button type="button" className="btn btn-info"
                                                    onClick={(e) => profileStore.changePassword(e)}
                                                >Changes Password</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default Profile;

const css_img = css`
width: 65px !important;
height: 65px  !important;
border-radius: 50%;`;

const css_input_file = css`
position: absolute;
top: 0;
left: 0;
width: 100%;
height: 100%;
opacity: 0;
cursor: pointer;`;

const css_icon = css`
font-size: 20px;`;

const btn_show = css`
padding: 0;
top: 50%;
right: 15px;
transform: translateY(-50%);`;