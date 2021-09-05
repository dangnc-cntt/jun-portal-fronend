import React, {Component} from 'react';
import "./App.scss";
import {BrowserRouter as Router} from "react-router-dom"
import {observer} from "mobx-react";
import StorageService from "./common/service/StorageService";
import {v4 as uuidv4} from 'uuid';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {profileStore} from "./modules/profile/ProfileStore";
import Redirect from "./modules/router/router";
import Nav from './modules/layouts/Nav';
import SideBar from './modules/layouts/SideBar';

@observer
export default class App extends Component {

    constructor(props: any) {
        super(props);
        this.checkUUID();
    }

    async componentDidMount() {
        if (StorageService.getToken()) {
            await profileStore.getProfiles();
        } else {
            if (window.location.pathname.trim() != '/login') {
                window.location.href = '/login';
            } else return false;
        }
    }

    async checkUUID() {
        const uuid: string | null = StorageService.getUUID();
        if (!uuid) {
            const userId: string = uuidv4();
            StorageService.setUUID(userId);
        }
    }

    render() {
        if (profileStore.isProfile) {
            return (
                <div>
                    <Router>
                        <div className="container-scroller">
                            <Nav/>
                            <div className="container-fluid page-body-wrapper">
                                <SideBar/>
                                <div className="main-panel">
                                    <Redirect/>
                                </div>
                            </div>
                        </div>
                    </Router>
                    <ToastContainer/>
                </div>
            )
        } else {
            return (
                <div>
                    <Router>
                        <Redirect/>
                    </Router>
                    <ToastContainer/>
                </div>
            )
        }
    }


}


