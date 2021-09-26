import React, {Component} from 'react';
import {number_format} from "../utils/Utils";
import {observer} from "mobx-react";


@observer
class Statistics extends Component<{ data: any }, any> {

    render() {
        const item = this.props.data;
        if (item) {
            return <div className="statistics mt-4 mb-4">
                <div className="d-flex align-items-center justify-content-between">
                    <div className="info_statistic p-2">
                        <h2 className="font-weight-light w-100 text-center text-black">{item.totalTransaction && number_format(item.totalTransaction)}</h2>
                        <div className="title d-flex justify-content-center align-items-center">
                            <span>Total Transaction</span>
                        </div>
                    </div>
                    <div className="info_statistic p-2">
                        <h2 className="font-weight-light w-100 text-center text-black">{item.totalPayer && number_format(item.totalPayer)}</h2>
                        <div className="title d-flex justify-content-center align-items-center">
                            <span>Total Payer</span>
                        </div>
                    </div>
                    <div className="info_statistic p-2">
                        <h2 className="font-weight-light w-100 text-center text-black">{item.totalRevenue && number_format(item.totalRevenue)}</h2>
                        <div className="title d-flex justify-content-center align-items-center">
                            <span>Total Revenue (MMK)</span>
                        </div>
                    </div>
                </div>
            </div>
        } else return true
    }
}

export default Statistics;
