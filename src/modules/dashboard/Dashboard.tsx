import React, {Component} from 'react';
import {observer} from "mobx-react";
import {categoryStore} from "../category/CategoryStore";
import Loading from "../../common/component/Loading";
import {getLocalDateTime, number_format} from "../../common/utils/Utils";
import NoContent from "../../common/component/NoContent";
import ReactPaginate from "react-paginate";
import AddCate from "../category/component/AddCate";
import EditCate from "../category/component/EditCate";
import DeleteCate from "../category/component/DeleteCate";
import {requestUtils} from "../../common/utils/RequestUtil";
import {orderStore} from "../order/OrderStore";
import {dashboardStore} from "./DashboardStore";
import DatePickerRange from "../../common/component/DatePickerRange";
import {Moment} from "../../common/utils/Moment";
import {css} from "@emotion/core";


@observer
class Dashboard extends Component {

    async componentDidMount() {
        dashboardStore.startDate = Moment.minusDays(Moment.getToDay(), 30);
        dashboardStore.endDate = Moment.getToDay();
        await dashboardStore.getDashboard()
    }

    handlePageClick = async (data: any) => {
        let selected: number = data.selected;
        dashboardStore.page = selected;
        requestUtils.saveQueryParam(this.props, {page: dashboardStore.page});
        await dashboardStore.getDashboard()
    };

    handleChangeTime = async (startDate: Date, endDate: Date) => {
        dashboardStore.startDate = startDate;
        dashboardStore.endDate = endDate;
        await dashboardStore.getDashboard()
    };


    render() {
        if(dashboardStore.dashboard){
            return (
                <div className="dashboard">
                    <div className="content-wrapper">
                        <div className=" d-flex align-items-center justify-content-between mt-2 mb-3">
                            <div className="pl-2 pr-2 w-100 d-flex align-items-center justify-content-between">
                                <h3 className="mb-0">Dashboard</h3>
                            </div>
                        </div>
                        <div className="card">
                            <div className="card-body">
                                <div className="d-flex align-items-center">
                                    <div className="time_range mb-4 d-flex align-items-center">
                                        <div className="time_range d-flex align-items-center mr-4">
                                            <DatePickerRange
                                                startDate={dashboardStore.startDate}
                                                endDate={dashboardStore.endDate}
                                                opens={"right"}
                                                handleChangeTime={this.handleChangeTime}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="d-flex align-items-center justify-content-center">
                                    <div className="statistic text-center" css={statistic}>
                                        <p>{number_format(dashboardStore.dashboard.total)}đ</p>
                                        <span>Total revenue</span>
                                    </div>
                                    <div className="statistic text-center mr-2 ml-2" css={statistic}>
                                        <p>{number_format(dashboardStore.dashboard.spending)}đ</p>
                                        <span>Total expenditure</span>
                                    </div>
                                    <div className="statistic text-center" css={statistic}>
                                        <p>{number_format(dashboardStore.dashboard.actual)}đ</p>
                                        <span>Actual profit</span>
                                    </div>
                                    <div className="statistic text-center" css={statistic}>
                                        <p>{number_format(dashboardStore.dashboard.discount)}đ</p>
                                        <span>Discount</span>
                                    </div>
                                    <div className="statistic text-center" css={statistic}>
                                        <p>{number_format(dashboardStore.dashboard.totalOrder)}</p>
                                        <span>Total Order</span>
                                    </div>
                                    <div className="statistic text-center" css={statistic}>
                                        <p>{number_format(dashboardStore.dashboard.totalProduct)}</p>
                                        <span>Total Product</span>
                                    </div>
                                </div>
                                <div className="table-responsive mt-4">
                                    {dashboardStore.dashboard && dashboardStore.dashboard.orders && dashboardStore.dashboard.orders.data.length > 0 ?
                                        <table className="table table-striped">
                                            <thead>
                                            <tr>
                                                <th><strong>Id</strong></th>
                                                <th><strong>AccountId</strong></th>
                                                <th><strong>Payment</strong></th>
                                                <th><strong>Note</strong></th>
                                                <th><strong>Price</strong></th>
                                                <th><strong>CreatedAt</strong></th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {dashboardStore.dashboard.orders.data.map((item: any, i:number) => (
                                                <tr key={i} className="position-relative">
                                                    <td>{item.id}</td>
                                                    <td>{item.orderedBy}</td>
                                                    <td>{item.paymentMethod}</td>
                                                    <td>{item.note}</td>
                                                    <td>{number_format(item.price)} đ</td>
                                                    <td>{getLocalDateTime(item.createdAt, "dd/mm/yyyy, hh:m_m")}</td>
                                                </tr>
                                            ))}
                                            </tbody>
                                        </table>
                                        : <div className="p-5"><NoContent/></div>}
                                </div>
                                <div className="pagination mt-3">
                                    {dashboardStore.totalPages > 1 && <ReactPaginate
                                        previousLabel={'Previous'} nextLabel={'Next'} breakLabel={'...'}
                                        breakClassName={'break-me'}
                                        pageCount={dashboardStore.totalPages}
                                        forcePage={dashboardStore.page} marginPagesDisplayed={2}
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
        }else return true

    }
}

export default Dashboard;

const statistic = css`
  width: 180px;
  height: 100px;
  display: flex;
  margin: 0 16px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid #e0e0e0;

  p {
    font-size: 14px;
    font-weight: 600;
  }

  span {
    font-size: 14px;
    color: #acacac;
  }
`