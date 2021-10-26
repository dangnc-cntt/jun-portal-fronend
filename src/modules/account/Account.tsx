import React, {Component} from 'react';
import Loading from "../../common/component/Loading";
import {getLocalDateTime} from "../../common/utils/Utils";
import NoContent from "../../common/component/NoContent";
import ReactPaginate from "react-paginate";
import {observer} from "mobx-react";
import {requestUtils} from "../../common/utils/RequestUtil";
import {State} from "../users/UserModel";
import {accountStore} from "./AccountStore";
import {css} from "@emotion/core";
import DetailAccount from "./components/DetailAccount";



@observer
class Account extends Component {

    async componentDidMount() {
        await accountStore.getAccount()
    }

    async searchByName(){
        if(accountStore.searchName){
            await accountStore.searchAccount();
        } else {
            await accountStore.getAccount()
        }
    }

    async enterSearch(e: any){
        if(e.key === "Enter"){
         await this.searchByName();
        }
    }

    handlePageClick = async (data: any) => {
        let selected: number = data.selected;
        accountStore.page = selected;
        requestUtils.saveQueryParam(this.props, {page: accountStore.page});
        await accountStore.getAccount()
    };

    status(state: string) {
        switch (state) {
            case State.ACTIVATED:
                return <span css={css_} className="bt-success">ACTIVATED</span>;
                break;
            case State.BANNED:
                return <span css={css_} className="bt-danger">BANNED</span>;
                break;
        }
    }


    render() {
        return (
            <div className="account">
                <div className="content-wrapper">
                    <div className="row d-flex align-items-center justify-content-between mt-2 mb-3">
                        <div className="pl-2 pr-2 w-100 d-flex align-items-center justify-content-between">
                            <h3 className="mb-0">Account</h3>
                        </div>
                    </div>
                    <div className="card">
                        <div className="card-body">
                            <div className="d-flex align-items-center justify-content-between">
                                <div className="d-flex search_name from-ground">
                                    <input type="text" className="search form-control"
                                           onChange={(e: any) => accountStore.searchName = e.currentTarget.value}
                                           onKeyDown={(e: any) => this.enterSearch(e)} placeholder="Search by full name"/>
                                    <button type="button" onClick={() => this.searchByName()}
                                            className="btn btn-info d-flex align-items-center justify-content-center">
                                        <i className="far fa-search"/></button>
                                </div>
                            </div>
                            {accountStore.isLoading ? <Loading/> :
                                <div className="table-responsive mt-4">
                                    {accountStore.listAccount && accountStore.listAccount.length > 0 ?
                                        <table className="table table-striped">
                                            <thead>
                                            <tr>
                                                <th><strong>Id</strong></th>
                                                <th><strong>User Name</strong></th>
                                                <th><strong>Full Name</strong></th>
                                                <th><strong>Email</strong></th>
                                                <th><strong>Confirmed At</strong></th>
                                                <th><strong>Status</strong></th>
                                                <th className="text-center"><strong>Actions</strong></th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {accountStore.listAccount.map((item, i) => (
                                                <tr key={i} className="position-relative">
                                                    <td>{item.id}</td>
                                                    <td width="25%">{item.username}</td>
                                                    <td>{item.fullName}</td>
                                                    <td>{item.email}</td>
                                                    <td>{item.confirmedAt ? getLocalDateTime(item.confirmedAt, 'dd/mm/yyyy') : ''}</td>
                                                    <td>{this.status(item.state)}</td>
                                                    <td width="5%" className="text-center">
                                                        <div className="btn-group">
                                                            {item.state === State.BANNED ? <button type="button" onClick={() => accountStore.bannedAccount(item.id, State.ACTIVATED)} className="btn btn-inverse-info btn-icon">
                                                                    <i className="fad fa-lock-open"/>
                                                            </button> :
                                                            <button type="button" onClick={() => accountStore.bannedAccount(item.id, State.BANNED)} className="btn btn-inverse-danger btn-icon">
                                                                <i className="fad fa-lock"/>
                                                            </button>}
                                                            <button type="button"
                                                                    onClick={() => accountStore.accountDetail(item.id)}
                                                                    className="btn btn-inverse-warning btn-icon"
                                                                    data-toggle="modal" data-target="#detailUser">
                                                                <i className="fad fa-info"/>
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                            </tbody>
                                        </table>
                                        : <div className="p-5"> <NoContent/> </div> }
                                </div>
                            }
                            <div className="pagination mt-3">
                                {accountStore.totalPages > 1 && <ReactPaginate
                                    previousLabel={'Previous'} nextLabel={'Next'} breakLabel={'...'}
                                    breakClassName={'break-me'}
                                    pageCount={accountStore.totalPages}
                                    forcePage={accountStore.page} marginPagesDisplayed={2}
                                    pageRangeDisplayed={5}
                                    onPageChange={this.handlePageClick} containerClassName={'pagination'}
                                    pageClassName={'paginate_button page-item'} pageLinkClassName={'page-link'}
                                    activeClassName={'active'}
                                    previousClassName={'paginate_button page-item previous'}
                                    previousLinkClassName={'page-link'}
                                    nextClassName={'paginate_button page-item next'} nextLinkClassName={'page-link'}
                                />}
                            </div>
                        </div>
                    </div>
                    <DetailAccount/>
                </div>
            </div>
        );
    }
}

export default Account;

const css_ = css`
    width: auto;
    height: 35px;
    line-height: 35px;
    display: inline-block;
    border-radius: 4px;
    font-size: 14px;
    padding: 0px 10px;
`;