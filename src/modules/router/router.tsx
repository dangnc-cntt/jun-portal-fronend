import React from 'react';
import {Route} from 'react-router-dom';
import LoginComponent from "../authen/login/LoginComponent";
import Role from '../role/index'
import UserList from "../users/UserList";
import Profile from "../profile/component/Profile";
import Account from "../account/Account";

export default function Redirect() {
    return (
        <div>
            <Route exact path="/" component={Role}/>
            <Route path={`/login`} component={LoginComponent}/>
            <Route path={`/user`} component={UserList}/>
            <Route path={`/account`} component={Account}/>
            <Route path={`/profile`} component={Profile}/>
        </div>
    )
}
