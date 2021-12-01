import React, {Component} from 'react';
import {observer} from "mobx-react";
import {reviewStore} from "./ReviewStore";
import {orderStore} from "../order/OrderStore";
import Loading from "../../common/component/Loading";
import {getLocalDateTime} from "../../common/utils/Utils";
import NoContent from "../../common/component/NoContent";
import ReactPaginate from "react-paginate";
import {requestUtils} from "../../common/utils/RequestUtil";
import ConfirmState from "./ConfirmState";

@observer
class Review extends Component {

    async componentDidMount() {
      await reviewStore.getReview()
    }

    async search(){
        orderStore.page = 0;
        await reviewStore.getReview()
    }

    async enterSearch(e: any){
        if(e.key === "Enter"){
            await reviewStore.getReview()
        }
    }

    handlePageClick = async (data: any) => {
        let selected: number = data.selected;
        reviewStore.page = selected;
        requestUtils.saveQueryParam(this.props, {page: reviewStore.page});
        await reviewStore.getReview()
    };


    render() {
        return (
            <div className="review">
                <div className="content-wrapper">
                    <div className=" d-flex align-items-center justify-content-between mt-2 mb-3">
                        <div className="pl-2 pr-2 w-100 d-flex align-items-center justify-content-between">
                            <h3 className="mb-0">Review</h3>
                        </div>
                    </div>
                    <div className="card">
                        <div className="card-body">
                            <div className="d-flex align-items-center">
                                <div className="d-flex search_name mr-4 from-ground">
                                    <input type="text" className="search form-control"
                                           onChange={(e: any) => reviewStore.accountId = e.currentTarget.value}
                                           onKeyDown={(e: any) => this.enterSearch(e)} placeholder="Search by accountId"/>
                                    <button type="button" onClick={() => this.search()}
                                            className="btn btn-info d-flex align-items-center justify-content-center">
                                        <i className="far fa-search"/></button>
                                </div>
                                <div className="d-flex search_name mr-4 from-ground">
                                    <input type="text" className="search form-control"
                                           onChange={(e: any) => reviewStore.productId = e.currentTarget.value}
                                           onKeyDown={(e: any) => this.enterSearch(e)} placeholder="Search by productId"/>
                                    <button type="button" onClick={() => this.search()}
                                            className="btn btn-info d-flex align-items-center justify-content-center">
                                        <i className="far fa-search"/></button>
                                </div>
                                <div className="d-flex from-ground">
                                    <select className="form-control" onChange={async (e: any) => {reviewStore.state = e.currentTarget.value; await this.search()}}>
                                        <option value={""}>Choose state</option>
                                        <option value={"APPROVED"}>APPROVED</option>
                                        <option value={"NOT_APPROVED"}>NOT_APPROVED</option>
                                    </select>
                                </div>
                            </div>
                            {reviewStore.isLoading ? <Loading/> :
                                <div className="table-responsive mt-4">
                                    {reviewStore.listReview && reviewStore.listReview.length > 0 ?
                                        <table className="table table-striped">
                                            <thead>
                                            <tr>
                                                <th><strong>Id</strong></th>
                                                <th><strong>AccountId</strong></th>
                                                <th><strong>ProductId</strong></th>
                                                <th><strong>Content</strong></th>
                                                <th><strong>Star</strong></th>
                                                <th><strong>CreatedAt</strong></th>
                                                <th><strong>State</strong></th>
                                                <th/>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {reviewStore.listReview.map((item, i) => (
                                                <tr key={i} className="position-relative">
                                                    <td>{item.id}</td>
                                                    <td>{item.createdBy}</td>
                                                    <td>{item.productId}</td>
                                                    <td>{item.content}</td>
                                                    <td>{item.star} sao</td>
                                                    <td>{getLocalDateTime(item.createdAt, "dd/mm/yyyy, hh:m_m")}</td>
                                                    <td>{item.state}</td>
                                                    <td className="text-center">
                                                        {item.state !== "APPROVED" && <button type="button" onClick={() => reviewStore.reviewId = item.id}
                                                                className="btn btn-outline-success btn-icon"
                                                                data-toggle="modal" data-target="#confirmState">
                                                            <i className="fad fa-check"/>
                                                        </button>}
                                                    </td>
                                                </tr>
                                            ))}
                                            </tbody>
                                        </table>
                                        : <div className="p-5"> <NoContent/> </div> }
                                </div>
                            }
                            <div className="pagination mt-3">
                                {reviewStore.totalPages > 1 && <ReactPaginate
                                    previousLabel={'Previous'} nextLabel={'Next'} breakLabel={'...'}
                                    breakClassName={'break-me'}
                                    pageCount={reviewStore.totalPages}
                                    forcePage={reviewStore.page} marginPagesDisplayed={2}
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
                        <ConfirmState/>
                    </div>
                </div>
            </div>
        );
    }
}

export default Review;