import React, {Component} from 'react';
import {observer} from "mobx-react";
import {productStore} from "../products/ProductStore";
import {categoryStore} from "../category/CategoryStore";
import {requestUtils} from "../../common/utils/RequestUtil";
import {orderStore} from "./OrderStore";
import Loading from "../../common/component/Loading";
import NoContent from "../../common/component/NoContent";
import ReactPaginate from "react-paginate";
import {getLocalDateTime, number_format} from "../../common/utils/Utils";
import {css} from "@emotion/core";
import {voucherStore} from "../voucher/VoucherStore";
import DateRange from "../../common/component/datePicker/DateRange";


@observer
class Order extends Component {

    async componentDidMount() {
        await orderStore.getOrder()
    }

    async searchByName(){
        if(orderStore.accountId){
            orderStore.page = 0
        }
        await orderStore.getOrder()
    }

    async changeState(){
        categoryStore.page = 0
        await orderStore.getOrder()
    }

    async enterSearch(e: any){
        if(e.key === "Enter"){
            await orderStore.getOrder()
        }
    }

    handlePageClick = async (data: any) => {
        let selected: number = data.selected;
        orderStore.page = selected;
        requestUtils.saveQueryParam(this.props, {page: orderStore.page});
        await orderStore.getOrder()
    };

    statusOrder(state: any){
        if (state === "NEW") {
            return (
                <span css={State1}>
                    Chờ xác nhận
                </span>
            )
        }
        if (state === "DELIVERY") {
            return (
                <span css={State2}>
                    Đang giao
                </span>
            )
        }
        if (state === "VPN_UNPAID") {
            return (
                <span css={State3}>
                    Chờ thanh toán
                </span>
            )
        }
        if (state === "COMPLETED") {
            return (
                <span css={State3}>
                    Đã giao
                </span>
            )
        }
        if (state === "CONFIRMED") {
            return (
                <span css={State4}>
                    Đang xử lý
                </span>
            )
        } else return true
    }


    handleChangeTime = async (startDate: Date, endDate: Date) => {
        orderStore.gte = startDate;
        orderStore.lte = endDate;
        await orderStore.getOrder()
    };


    render() {
        return (
            <div className="orders">
                <div className="content-wrapper">
                    <div className=" d-flex align-items-center justify-content-between mt-2 mb-3">
                        <div className="pl-2 pr-2 w-100 d-flex align-items-center justify-content-between">
                            <h3 className="mb-0">Đơn hàng</h3>
                        </div>
                    </div>
                    <div className="card">
                        <div className="card-body">
                            <div className="d-flex align-items-center">
                                <div className="time_range mr-4 d-flex align-items-center">
                                    <div className="time_range d-flex align-items-center">
                                        <DateRange
                                            startDate={orderStore.gte}
                                            endDate={orderStore.lte}
                                            opens={"right"}
                                            handleChangeTime={this.handleChangeTime}
                                        />
                                    </div>
                                </div>
                                <div className="d-flex search_name from-ground">
                                    <input type="text" className="search form-control"
                                           onChange={(e: any) => orderStore.accountId = e.currentTarget.value}
                                           onKeyDown={(e: any) => this.enterSearch(e)} placeholder="Search by accountId"/>
                                    <button type="button" onClick={() => this.searchByName()}
                                            className="btn btn-info d-flex align-items-center justify-content-center">
                                        <i className="far fa-search"/></button>
                                </div>
                            </div>
                            {orderStore.isLoading ? <Loading/> :
                                <div className="table-responsive mt-4">
                                    {orderStore.listOrder && orderStore.listOrder.length > 0 ?
                                        <table className="table table-striped">
                                            <thead>
                                            <tr>
                                                <th><strong>Id</strong></th>
                                                <th><strong>AccountId</strong></th>
                                                <th><strong>Payment</strong></th>
                                                <th><strong>Note</strong></th>
                                                <th><strong>Price</strong></th>
                                                <th><strong>CreatedAt</strong></th>
                                                <th className="text-center"><strong>State</strong></th>
                                                <th className="text-center"><strong>Actions</strong></th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {orderStore.listOrder.map((item, i) => (
                                                <tr key={i} className="position-relative">
                                                    <td>{item.id}</td>
                                                    <td>{item.orderedBy}</td>
                                                    <td>{item.paymentMethod}</td>
                                                    <td>{item.note}</td>
                                                    <td>{number_format(item.price)} đ</td>
                                                    <td>{getLocalDateTime(item.createdAt, "dd/mm/yyyy, hh:m_m")}</td>
                                                    <td className="text-center">{this.statusOrder(item.state)}</td>
                                                    <td className="text-center">
                                                        <button type="button"
                                                                onClick={() => voucherStore.detail(item.id)}
                                                                className="btn btn-inverse-warning btn-icon"
                                                                data-toggle="modal" data-target="#editVoucher">
                                                            <i className="far fa-pen"/>
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                            </tbody>
                                        </table>
                                        : <div className="p-5"> <NoContent/> </div> }
                                </div>
                            }
                            <div className="pagination mt-3">
                                {orderStore.totalPages > 1 && <ReactPaginate
                                    previousLabel={'Previous'} nextLabel={'Next'} breakLabel={'...'}
                                    breakClassName={'break-me'}
                                    pageCount={orderStore.totalPages}
                                    forcePage={orderStore.page} marginPagesDisplayed={2}
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
                </div>
            </div>
        );
    }
}

export default Order;

const State1 = css`background: #FFF3CD;
  border-radius: 4px;
  font-size: 13px;
  color: #856404;
  height: 24px;
  width: 120px;
  display: inline-flex;
  justify-content: center;
  align-items: center;`
const State2 = css`background: #CCE5FF;
  border-radius: 4px;
  font-size: 13px;
  color: #004085;
  height: 24px;
  width: 120px;
  display: inline-flex;
  justify-content: center;
  align-items: center;`
const State3 = css`background: #D4EDDA;
  border-radius: 4px;
  font-size: 13px;
  color: #155724;
  height: 24px;
  width: 120px;
  display: inline-flex;
  justify-content: center;
  align-items: center;`
const State4 = css`background: #E2E3E5;
  border-radius: 4px;
  font-size: 13px;
  color: #818182;
  height: 24px;
  width: 120px;
  display: inline-flex;
  justify-content: center;
  align-items: center;`