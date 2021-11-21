import React, {Component} from 'react';

import {observer} from "mobx-react";
import Loading from "../../common/component/Loading";
import {getLocalDateTime} from "../../common/utils/Utils";
import NoContent from "../../common/component/NoContent";
import ReactPaginate from "react-paginate";
import {requestUtils} from "../../common/utils/RequestUtil";
import {categoryStore} from "./CategoryStore";
import DeleteCate from "./component/DeleteCate";
import AddCate from "./component/AddCate";
import EditCate from "./component/EditCate";


@observer
class Category extends Component {

    async componentDidMount() {
        await categoryStore.getCate()
    }

    async searchByName(){
        if(categoryStore.searchName){
            categoryStore.page = 0
        }
        await categoryStore.getCate()
    }

   async changeState(){
        categoryStore.page = 0
        await categoryStore.getCate()
    }

    async enterSearch(e: any){
        if(e.key === "Enter"){
            await this.searchByName();
        }
    }

    handlePageClick = async (data: any) => {
        let selected: number = data.selected;
        categoryStore.page = selected;
        requestUtils.saveQueryParam(this.props, {page: categoryStore.page});
        await categoryStore.getCate()
    };


    render() {
        return (
            <div className="category">
                <div className="content-wrapper">
                    <div className=" d-flex align-items-center justify-content-between mt-2 mb-3">
                        <div className="pl-2 pr-2 w-100 d-flex align-items-center justify-content-between">
                            <h3 className="mb-0">Category</h3>
                            <button type="button" className="btn btn-outline-info" onClick={() => categoryStore.clearForm()} data-toggle="modal" data-target="#addCate">Create</button>
                        </div>
                    </div>
                    <div className="card">
                        <div className="card-body">
                            <div className="d-flex align-items-center">
                                <div className="d-flex search_name from-ground">
                                    <input type="text" className="search form-control"
                                           onChange={(e: any) => categoryStore.searchName = e.currentTarget.value}
                                           onKeyDown={(e: any) => this.enterSearch(e)} placeholder="Search by category name"/>
                                    <button type="button" onClick={() => this.searchByName()}
                                            className="btn btn-info d-flex align-items-center justify-content-center">
                                        <i className="far fa-search"/></button>
                                </div>
                                <div className="d-flex from-ground ml-4">
                                    <select className="form-control" style={{width: 250, height: 46}} onChange={(e: any) => {categoryStore.state = e.currentTarget.value; this.changeState()}}>
                                        <option value="">Chọn</option>
                                        <option value="ACTIVE">ACTIVE</option>
                                        <option value="NOT_ACTIVE">NOT ACTIVE</option>
                                    </select>
                                </div>
                            </div>
                            {categoryStore.isLoading ? <Loading/> :
                                <div className="table-responsive mt-4">
                                    {categoryStore.listCate && categoryStore.listCate.length > 0 ?
                                        <table className="table table-striped">
                                            <thead>
                                            <tr>
                                                <th><strong>Id</strong></th>
                                                <th><strong>Image</strong></th>
                                                <th><strong>Name</strong></th>
                                                <th><strong>Description</strong></th>
                                                <th><strong>CreatedAt</strong></th>
                                                <th><strong>UpdatedAt</strong></th>
                                                <th><strong>State</strong></th>
                                                <th className="text-center"><strong>Actions</strong></th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {categoryStore.listCate.map((item, i) => (
                                                <tr key={i} className="position-relative">
                                                    <td>{item.id}</td>
                                                    <td><img src={item.imageUrl} alt=""/></td>
                                                    <td width="20%">{item.name}</td>
                                                    <td>{item.description}</td>
                                                    <td>{item.createdAt ? getLocalDateTime(item.createdAt, 'dd/mm/yyyy') : ''}</td>
                                                    <td>{item.updatedAt ? getLocalDateTime(item.updatedAt, 'dd/mm/yyyy') : ''}</td>
                                                    <td>{item.state}</td>
                                                    <td width="5%" className="text-center">
                                                        <div className="btn-group">
                                                            <button type="button" onClick={() => categoryStore.cateDetail(item.id)} data-toggle="modal" data-target="#editCate" className="btn btn-inverse-warning btn-icon">
                                                                <i className="fad fa-pen"/>
                                                            </button>
                                                            <button type="button"
                                                                    onClick={() => categoryStore.cateId = item.id}
                                                                    className="btn btn-inverse-danger btn-icon"
                                                                    data-toggle="modal" data-target="#deleteCate">
                                                                <i className="far fa-trash-alt"/>
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
                                {categoryStore.totalPages > 1 && <ReactPaginate
                                    previousLabel={'Previous'} nextLabel={'Next'} breakLabel={'...'}
                                    breakClassName={'break-me'}
                                    pageCount={categoryStore.totalPages}
                                    forcePage={categoryStore.page} marginPagesDisplayed={2}
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
                    <AddCate/>
                    <EditCate/>
                    <DeleteCate/>
                </div>
            </div>
        );
    }
}

export default Category;