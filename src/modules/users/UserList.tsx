import React, {Component} from 'react';
import {observer} from "mobx-react";
import Loading from "../../common/component/Loading";
import {getLocalDateTime} from "../../common/utils/Utils";
import NoContent from "../../common/component/NoContent";
import ReactPaginate from "react-paginate";
import {userStore} from "./UserStore";
import {requestUtils} from "../../common/utils/RequestUtil";
import {State} from './UserModel';
import DeleteUser from "./components/DeleteUser";
import EditUser from "./components/EditUser";
import AddUser from "./components/AddUser";
import {css} from "@emotion/core";

@observer
class UserList extends Component {
    async componentDidMount() {
        await userStore.getUsers()
    }

    async searchByName(){
        if(userStore.searchName){
            await userStore.searchUser();
        } else {
            await userStore.getUsers();
        }
    }

    async enterSearch(e: any){
        if(e.key === "Enter"){
            this.searchByName();
        }
    }

    handlePageClick = async (data: any) => {
        let selected: number = data.selected;
        userStore.page = selected;
        requestUtils.saveQueryParam(this.props, {page: userStore.page});
        await userStore.getUsers()
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
            <div className="user_list">
                <div className="content-wrapper">
                    <div className="row d-flex align-items-center justify-content-between mt-2 mb-3">
                        <div className="pl-2 pr-2 w-100 d-flex align-items-center justify-content-between">
                            <h3 className="mb-0">Users</h3>
                        </div>
                    </div>
                    <div className="card">
                        <div className="card-body">
                            <div className="d-flex align-items-center justify-content-between">
                                <div className="d-flex search_name from-ground">
                                    <input type="text" className="search form-control"
                                           onChange={(e: any) => userStore.searchName = e.currentTarget.value}
                                           onKeyDown={(e: any) => this.enterSearch(e)} placeholder="Search by full name"/>
                                    <button type="button" onClick={() => this.searchByName()}
                                            className="btn btn-info d-flex align-items-center justify-content-center">
                                        <i className="far fa-search"/></button>
                                </div>
                                <button type="button" className="btn btn-outline-info" onClick={() => userStore.clearForm()} data-toggle="modal" data-target="#addUser">Create</button>
                            </div>
                            {userStore.isLoading ? <Loading/> :
                                <div className="table-responsive mt-4">
                                    {userStore.userList &&userStore.userList.length > 0 ?
                                        <table className="table table-striped">
                                            <thead>
                                                <tr>
                                                    <th><strong>Id</strong></th>
                                                    <th><strong>User Name</strong></th>
                                                    <th><strong>Full Name</strong></th>
                                                    <th><strong>Role</strong></th>
                                                    <th><strong>Created At</strong></th>
                                                    <th><strong>Updated At</strong></th>
                                                    <th><strong>Status</strong></th>
                                                    <th className="text-center"><strong>Actions</strong></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                            {userStore.userList.map((item, i) => (
                                                <tr key={i} className="position-relative">
                                                    <td>{item.id}</td>
                                                    <td width="25%">{item.username}</td>
                                                    <td>{item.fullName}</td>
                                                    <td>{item.role}</td>
                                                    <td>{item.createdAt ? getLocalDateTime(item.createdAt, 'dd/mm/yyyy') : ''}</td>
                                                    <td>{item.updatedAt ? getLocalDateTime(item.updatedAt, 'dd/mm/yyyy') : ''}</td>
                                                    <td>{this.status(item.state)}</td>
                                                    <td width="5%" className="text-center">
                                                        <div className="btn-group">
                                                            <button type="button" className="btn btn-inverse-info btn-icon">
                                                                <i className="fas fa-key-skeleton"/>
                                                            </button>
                                                            <button type="button"
                                                                    onClick={() => userStore.userDetail(item.id)}
                                                                    className="btn btn-inverse-warning btn-icon"
                                                                    data-toggle="modal" data-target="#editUser">
                                                                <i className="fas fa-pen"/>
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
                                {userStore.totalPages > 1 && <ReactPaginate
                                    previousLabel={'Previous'} nextLabel={'Next'} breakLabel={'...'}
                                    breakClassName={'break-me'}
                                    pageCount={userStore.totalPages}
                                    forcePage={userStore.page} marginPagesDisplayed={2}
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
                    <DeleteUser/>
                    <EditUser/>
                    <AddUser/>
                </div>
            </div>
        );
    }
}

export default UserList;

const css_ = css`
    width: auto;
    height: 35px;
    line-height: 35px;
    display: inline-block;
    border-radius: 4px;
    font-size: 14px;
    padding: 0px 10px;
`;