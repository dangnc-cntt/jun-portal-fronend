import React, {Component} from 'react';
import {observer} from "mobx-react";
import {receiptStore} from "./ReceiptStore";
import Loading from "../../../common/component/Loading";
import NoContent from "../../../common/component/NoContent";


@observer
class Receipt extends Component {

    async componentDidMount() {
        await receiptStore.getReceipt()
    }


    render() {
        return (
            <div className="receipt_product">
                <div className="content-wrapper">
                    <div className=" d-flex align-items-center justify-content-between mt-2 mb-3">
                        <div className="pl-2 pr-2 w-100 d-flex align-items-center justify-content-between">
                            <h3 className="mb-0">Receipt Product</h3>
                            <button type="button" className="btn btn-outline-info" data-toggle="modal" data-target="#addReceipt">Create</button>
                        </div>
                    </div>
                    <div className="card">
                        <div className="card-body">
                            {receiptStore.isLoading ? <Loading/> :
                                <div className="table-responsive mt-4">
                                    {receiptStore.listReceipt && receiptStore.listReceipt.length > 0 ?
                                        <table className="table table-striped">
                                            <thead>
                                            <tr>
                                                <th><strong>Id</strong></th>
                                                <th><strong>Name</strong></th>
                                                <th><strong>Description</strong></th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {receiptStore.listReceipt.map((item, i) => (
                                                <tr key={i} className="position-relative">
                                                    <td width="18%">{item.id}</td>
                                                </tr>
                                            ))}
                                            </tbody>
                                        </table>
                                        : <div className="p-5"> <NoContent/> </div> }
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Receipt;