import React from 'react';
import {Route} from 'react-router-dom';
import LoginComponent from "../authen/login/LoginComponent";
import Role from '../role/index'
import UserList from "../users/UserList";
import Profile from "../profile/component/Profile";
import Account from "../account/Account";
import Category from "../category/Category";
import Color from "../products/color/Color";
import Size from "../products/size/Size";
import Product from "../products/Product";
import ExportProduct from "../products/export/ExportProduct";
import Receipt from "../products/receipts/Receipt";

export default function Redirect() {
    return (
        <div>
            <Route exact path="/" component={Role}/>
            <Route path={`/login`} component={LoginComponent}/>
            <Route path={`/user`} component={UserList}/>
            <Route path={`/account`} component={Account}/>
            <Route path={`/profile`} component={Profile}/>
            <Route path={`/products`} component={Product}/>
            <Route path={`/product/color`} component={Color}/>
            <Route path={`/product/size`} component={Size}/>
            <Route path={`/product/category`} component={Category}/>
            <Route path={`/product/receipt`} component={Receipt}/>
            <Route path={`/product/export`} component={ExportProduct}/>
        </div>
    )
}
