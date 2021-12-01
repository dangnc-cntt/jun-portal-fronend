import React, {Component} from 'react';
import {observer} from "mobx-react";
import {requestUtils} from "../../common/utils/RequestUtil";
import DatePickerRange from "../../common/component/DatePickerRange";
import {number_format} from "../../common/utils/Utils";
import ChartStatistics from "../../common/component/ChartStatistics";
import ReactPaginate from "react-paginate";
import {css} from "@emotion/core";
import {inventoryStore} from "./InventoryStore";


@observer
class InventoryStatistics extends Component {

    async componentDidMount() {
        await inventoryStore.getWarehouse()
    }

    handlePage = async (data: any) => {
        let selected: number = data.selected;
        inventoryStore.page = selected;
        requestUtils.saveQueryParam(this.props, {page: inventoryStore.page});
        await inventoryStore.getWarehouse()
    };

    handleChangeTime = async (startDate: Date, endDate: Date) => {
        inventoryStore.startDate = startDate;
        inventoryStore.endDate = endDate;
        await inventoryStore.getWarehouse()
    };


    render() {
        if(inventoryStore.dashboard){
            return (
                <div className="dashboard">
                    <div className="content-wrapper">
                        <div className=" d-flex align-items-center justify-content-between mt-2 mb-3">
                            <div className="pl-2 pr-2 w-100 d-flex align-items-center justify-content-between">
                                <h3 className="mb-0">Inventory Statistics</h3>
                            </div>
                        </div>
                        <div className="card">
                            <div className="card-body">
                                <div className="d-flex align-items-center">
                                    <div className="time_range mb-4 d-flex align-items-center">
                                        <div className="time_range d-flex align-items-center mr-4">
                                            <DatePickerRange
                                                startDate={inventoryStore.startDate}
                                                endDate={inventoryStore.endDate}
                                                opens={"right"}
                                                handleChangeTime={this.handleChangeTime}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="d-flex align-items-center mb-4 justify-content-center">
                                    <div className="statistic text-center" css={statistic}>
                                        <p>{inventoryStore.dashboard.amount && number_format(inventoryStore.dashboard.amount.export)}</p>
                                        <span>Export</span>
                                    </div>
                                    <div className="statistic text-center mr-2 ml-2" css={statistic}>
                                        <p>{inventoryStore.dashboard.amount && number_format(inventoryStore.dashboard.amount.receipt)}</p>
                                        <span>Receipt</span>
                                    </div>
                                </div>
                                <ChartStatistics dataStatistic={inventoryStore.dashboard.days} type="inventory"/>

                                {inventoryStore.dashboard && inventoryStore.dashboard.products && <div>
                                    <h3>Product</h3>
                                    <div className="table-responsive mt-4">
                                        <table className="table table-striped">
                                            <thead>
                                            <tr>
                                                <th><strong>Id</strong></th>
                                                <th><strong>Code</strong></th>
                                                <th><strong>Image</strong></th>
                                                <th><strong>Name</strong></th>
                                                <th><strong>Color</strong></th>
                                                <th><strong>Size</strong></th>
                                                <th><strong>Amount</strong></th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {inventoryStore.dashboard.products.data.map((item: any, i:number) => (
                                                <tr key={i} className="position-relative">
                                                    <td>{item.id}</td>
                                                    <td>{item.code}</td>
                                                    <td>{<img src={item.imageUrls[0]} alt=""/>}</td>
                                                    <td>{item.name}</td>
                                                    <td>{item.color}</td>
                                                    <td>{item.size}</td>
                                                    <td>{number_format(item.amount)}</td>
                                                </tr>
                                            ))}
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="pagination mt-3">
                                        {inventoryStore.totalPages > 1 && <ReactPaginate
                                            previousLabel={'Previous'} nextLabel={'Next'} breakLabel={'...'}
                                            breakClassName={'break-me'}
                                            pageCount={inventoryStore.totalPages}
                                            forcePage={inventoryStore.page} marginPagesDisplayed={2}
                                            pageRangeDisplayed={5}
                                            onPageChange={this.handlePage} containerClassName={'pagination'}
                                            pageClassName={'paginate_button page-item'} pageLinkClassName={'page-link'}
                                            activeClassName={'active'}
                                            previousClassName={'paginate_button page-item previous'}
                                            previousLinkClassName={'page-link'}
                                            nextClassName={'paginate_button page-item next'} nextLinkClassName={'page-link'}
                                        />}
                                    </div>
                                </div>}
                            </div>
                        </div>
                    </div>
                </div>
            );
        }else return true
    }
}

export default InventoryStatistics;


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