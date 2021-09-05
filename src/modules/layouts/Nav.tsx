import React, { Component } from 'react';
import { observer } from 'mobx-react';
import {loginStore} from "../authen/login/LoginStore";
import { Link } from 'react-router-dom';
import { css } from '@emotion/core';
import {profileStore} from "../profile/ProfileStore";
import StorageService from "../../common/service/StorageService";
import Logo from "../../asset/images/logo-v1.png"

@observer
class Nav extends Component {
    render() {
        if(StorageService.getToken()){
            return (
                <nav css={css_nav} className="navbar col-lg-12 col-12 p-0 fixed-top d-flex flex-row">
                    <div className="navbar-brand-wrapper d-flex align-items-center" css={css_left}>
                        <Link to="/" className="navbar-brand brand-logo">
                            <img css={cssLogo} src={Logo} alt=""/>
                        </Link>
                    </div>
                    <div className="navbar-menu-wrapper d-flex align-items-center justify-content-end">
                        <button className="navbar-toggler navbar-toggler align-self-center" type="button" data-toggle="minimize">
                            <span className="fas fa-align-justify" />
                        </button>
                        <ul className="navbar-nav navbar-nav-right">
                            <li className="nav-item dropdown mr-2">
                                <a className="nav-link count-indicator dropdown-toggle d-flex justify-content-center align-items-center" id="messageDropdown" href="#" data-toggle="dropdown">
                                    <i className="fas fa-envelope mx-0" />
                                    <span className="count" />
                                </a>
                            </li>
                            <li className="nav-item dropdown mr-4">
                                <a className="nav-link count-indicator dropdown-toggle d-flex align-items-center justify-content-center" id="notificationDropdown" href="#" data-toggle="dropdown">
                                    <i className="fas fa-bell mx-0" />
                                    <span className="count" />
                                </a>
                            </li>
                            <li className="nav-item nav-profile dropdown">
                                <a className="nav-link" href="#" data-toggle="dropdown" id="profileDropdown">
                                    {profileStore.getProfile?.avatarUrl ?
                                        <img src={profileStore.getProfile?.avatarUrl} alt="profile"/> :
                                        <button type="button" css={logoProfile} className="btn btn-info btn-rounded btn-icon">
                                            {profileStore.getProfile?.displayName.slice(0, 1).toUpperCase()}
                                        </button>
                                    }
                                </a>
                                <div className="dropdown-menu dropdown-menu-right navbar-dropdown" aria-labelledby="profileDropdown">
                                    <Link to={`/profile`} className="dropdown-item">
                                        <i className="fa fa-cog text-info" /> Profile
                                    </Link>
                                    <a className="dropdown-item" onClick={()=> loginStore.logOut()}>
                                        <i className="fa fa-sign-out text-info"/> Logout
                                    </a>
                                </div>
                            </li>
                        </ul>
                    </div>
                </nav>
            );
        }
        else return true
    }
}

export default Nav;

const logoProfile = css`
    color: #3e3c4f;
    border: none;
    width: 35px;
    height: 35px;
    background-color: rgba(129, 125, 161, 0.18);
`;
const cssLogo = css`
    max-width: 92% !important;
    height: auto !important;
`;

const css_left = css`
    padding-left: 10px !important;
`;

const css_nav = css`
&:after {
    content: "";
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    height: 2px;
    background: linear-gradient(rgba(48,56,70,.2),rgba(48,56,70,0));
    pointer-events: none;
    z-index: 4;
}
`;
