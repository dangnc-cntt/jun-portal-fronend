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
import AddReceipt from "../products/receipts/components/AddReceipt";
import DetailReceipt from "../products/receipts/components/DetailReceipt";
import DetailExport from "../products/export/components/DetailExport";
import AddExport from "../products/export/components/AddExport";
import Voucher from "../voucher/Voucher";
import Order from "../order/Order";
import Brand from "../products/brand/Brand";
import Dashboard from "../dashboard/Dashboard";
import Config from "../config/Config";
import Review from "../review/Review";



export default function Redirect() {
    return (
        <div>
            <Route exact path="/" component={Role}/>
            <Route path={`/login`} component={LoginComponent}/>
            <Route path={`/user`} component={UserList}/>
            <Route path={`/account`} component={Account}/>
            <Route path={`/dashboard`} component={Dashboard}/>
            <Route path={`/profile`} component={Profile}/>
            <Route path={`/config`} component={Config}/>
            <Route path={`/review`} component={Review}/>
            <Route path={`/products`} component={Product}/>
            <Route path={`/product/color`} component={Color}/>
            <Route path={`/product/size`} component={Size}/>
            <Route path={`/product/category`} component={Category}/>
            <Route path={`/product/brand`} component={Brand}/>
            <Route path={`/product/receipt`} component={Receipt}/>
            <Route path={`/product/detail-receipt/:id.html`} component={DetailReceipt}/>
            <Route path={`/product/add-receipt`} component={AddReceipt}/>
            <Route path={`/product/receipt-detail`} component={DetailReceipt}/>
            <Route path={`/product/export`} component={ExportProduct}/>
            <Route path={`/product/add-export`} component={AddExport}/>
            <Route path={`/product/detail-export/:id.html`} component={DetailExport}/>
            <Route path={`/voucher`} component={Voucher}/>
            <Route path={`/order`} component={Order}/>
        </div>
    )
}
