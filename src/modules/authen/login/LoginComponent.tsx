import React, {Component} from 'react';
import {observer} from "mobx-react";
import "./LoginStyle.scss";
import Input from "../../../common/form/components/Input";
import FormGroup from "../../../common/form/components/FormGroup";
import {loginStore} from "./LoginStore";
import {Redirect} from "react-router-dom";
import {css} from "@emotion/core";
import {profileStore} from "../../profile/ProfileStore";
import {UploadImage} from "../../../common/firebase/uploadImages";

const css_bg = css`
  background-color: white;
`;


@observer
class LoginComponent extends Component {


    render() {
        if (profileStore.getProfile) {
            return <Redirect to={'/'}/>
        } else return (
            <div className="login">
                <div className="container-scroller">
                    <div className="container-fluid page-body-wrapper full-page-wrapper">
                        <div className="content-wrapper d-flex align-items-stretch auth auth-img-bg">
                            <div className="row flex-grow">
                                <div css={css_bg}
                                     className="col-lg-12 d-flex align-items-center justify-content-center">
                                    <div className="col-6">
                                        <div className="auth-form-transparent p-3">
                                            <h2 className="text-center mt-2">Login</h2>
                                            <form className="pt-3">
                                                <span className="error">{loginStore.FormError && loginStore.FormError.message}</span>
                                                <FormGroup className="form-group">
                                                    <label htmlFor="exampleInputEmail">Username</label>
                                                    <div className="input-group">
                                                        <div className="input-group-prepend bg-transparent">
                                                <span className="input-group-text bg-transparent border-right-0"><i className="fa fa-envelope text-info"/></span></div>
                                                        <Input type="text" onChange={(e) => {
                                                            loginStore.setUserNameValue(e)
                                                        }}
                                                               className="form-control form-control-lg border-left-0"
                                                               id="exampleInputEmail" placeholder="Username"/>
                                                    </div>
                                                    <p className="error">{loginStore.FormError && loginStore.FormError.name}</p>
                                                </FormGroup>
                                                <FormGroup className="form-group">
                                                    <label htmlFor="exampleInputPassword">Password</label>
                                                    <div className="input-group">
                                                        <div className="input-group-prepend bg-transparent">
                                                    <span className="input-group-text bg-transparent border-right-0">
                                                      <i className="fas fa-lock text-info"/>
                                                    </span>
                                                        </div>
                                                        <input type="password" onChange={(e) => {
                                                            loginStore.setPassValue(e)
                                                        }} onKeyDown={(e) => loginStore.enterLogin(e)}
                                                               className="form-control form-control-lg border-left-0"
                                                               id="exampleInputPassword" placeholder="Password"/>
                                                    </div>
                                                    <p className="error">{loginStore.FormError && loginStore.FormError.pass}</p>
                                                </FormGroup>
                                                <div className="my-2 d-flex justify-content-between align-items-center">
                                                    <div className="form-check">
                                                        <label className="form-check-label text-muted">
                                                            <input type="checkbox" className="form-check-input"/>
                                                            Keep me signed in
                                                            <i className="input-helper text-info"/></label>
                                                    </div>
                                                </div>
                                                <div className="my-3">
                                                    {!loginStore.isLoading ?
                                                        <a className="btn text-white btn-block btn-info btn-lg font-weight-medium auth-form-btn d-flex align-items-center justify-content-center"
                                                           onClick={() => loginStore.Login()}>LOGIN</a> :
                                                        <a className="btn text-white btn-block btn-info btn-lg font-weight-medium auth-form-btn d-flex align-items-center justify-content-center">
                                                            <i className="fa fa-spinner fa-spin"/>
                                                        </a>}
                                                </div>

                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default LoginComponent;