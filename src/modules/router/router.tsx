import React from 'react';
import {Route} from 'react-router-dom';
import LoginComponent from "../authen/login/LoginComponent";
import Role from '../role/index'
import UserList from "../users/UserList";
import GameCategory from "../games/components/category/GameCategory";
import GameList from "../games/components/gameList/GameList";
import AddGame from "../games/components/gameList/components/AddGame";
import PaymentComponent from "../payments/PaymentComponent";
import EditPayment from "../payments/components/EditPayment";
import AddPayment from "../payments/components/AddPayment";
import TransactionList from "../transaction/TransactionList";
import PromotionTypeList from "../promotionType/PromotionTypeList";
import AddPromotion from "../promotionType/components/AddPromotion";
import EditPromotion from "../promotionType/components/EditPromotion";
import GameDetail from "../games/components/gameList/components/gameDetail/GameDetail";
import Language from "../language/Language";
import Profile from "../profile/component/Profile";
import Dashboard from "../dashboard/components/Dashboard";

export default function Redirect() {
    return (
        <div>
            <Route exact path="/" component={Role}/>
            <Route path={`/login`} component={LoginComponent}/>
            <Route path={`/user`} component={UserList}/>
            <Route path={`/game-category`} component={GameCategory}/>
            <Route path={`/game-list`} component={GameList}/>
            <Route path={`/add-new-game`} component={AddGame}/>
            <Route path={`/game-detail/:slug/:id.html`} component={GameDetail}/>
            <Route path={`/payment`} component={PaymentComponent}/>
            <Route path={`/add-payment`} component={AddPayment}/>
            <Route path={`/edit-payment/:slug/:id.html`} component={EditPayment}/>
            <Route path={`/promotionType`} component={PromotionTypeList}/>
            <Route path={`/add-new-promotion`} component={AddPromotion}/>
            <Route path={`/edit-promotion/:slug/:id.html`} component={EditPromotion}/>
            <Route path={`/transaction`} component={TransactionList}/>
            <Route path={`/language`} component={Language}/>
            <Route path={`/profile`} component={Profile}/>
            <Route path={`/dashboard`} component={Dashboard}/>
        </div>
    )
}
