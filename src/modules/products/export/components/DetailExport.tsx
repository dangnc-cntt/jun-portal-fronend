import React, {Component} from 'react';
import {observer} from "mobx-react";
import {goBack, number_format} from "../../../../common/utils/Utils";
import {css} from "@emotion/core";
import {exportStore} from "../ExportStore";
import {receiptStore} from "../../receipts/ReceiptStore";
import NoContent from "../../../../common/component/NoContent";

interface IProps{
    match: { params: { id: any } }
}

@observer
class DetailExport extends Component<IProps, any> {

    async componentDidMount() {
        await exportStore.detailExport(this.props.match.params.id)
    }


    render() {
        if(exportStore.exportDetail){
            return (
                <div className="detail_export">
                    <div className="content-wrapper">
                        <div className=" d-flex align-items-center justify-content-between mt-2 mb-3">
                            <div className="pl-2 pr-2 w-100 d-flex align-items-center">
                                <button type="button" className="btn btn-outline-info mr-4" onClick={() => goBack()}>Back</button>
                                <h3 className="mb-0">Detail Export</h3>
                            </div>
                        </div>
                        <div className="card">
                            <div className="card-body">
                                <div className="form-group mb-4">
                                    <label>Description</label>
                                    <p>{exportStore.exportDetail.description}</p>
                                </div>
                                <div className="form-group h-auto mb-4">
                                    <label>Products</label>
                                    <div className="table-responsive ">
                                        {exportStore.exportDetail.products && exportStore.exportDetail.products.length > 0 ?
                                            <table className="table table-striped">
                                                <thead>
                                                <tr>
                                                    <th><strong>Id</strong></th>
                                                    <th><strong>Code</strong></th>
                                                    <th><strong>Name</strong></th>
                                                    <th><strong>CostPrice</strong></th>
                                                    <th><strong>Options</strong></th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                {exportStore.exportDetail.products.map((item: any, i: number) => (
                                                    <tr key={i}>
                                                        <td width="20%">{item.id}</td>
                                                        <td width="20%">{item.code}</td>
                                                        <td width="20%">{item.name}</td>
                                                        <td width="20%">{number_format(item.cost_price)}đ</td>
                                                        <td width="20%">
                                                            <button type="button" className="btn btn-outline-info btn-sm" data-toggle="modal" data-target={`#option_${item.id}`}>Chi tiết</button>
                                                            <div className="modal fade" id={`option_${item.id}`} tabIndex={-1} role="dialog" aria-hidden="true">
                                                                <div className="modal-dialog w-100 d-flex justify-content-center" role="document">
                                                                    <div className="modal-content">
                                                                        <div className="modal-header">
                                                                            <h5 className="modal-title">Options</h5>
                                                                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                                                <span  aria-hidden="true">&times;</span>
                                                                            </button>
                                                                        </div>
                                                                        <div className="modal-body">
                                                                            <table className="table">
                                                                                <thead className="thead-dark">
                                                                                <tr>
                                                                                    <th><strong>Color</strong></th>
                                                                                    <th><strong>Size</strong></th>
                                                                                    <th><strong>Amount</strong></th>
                                                                                </tr>
                                                                                </thead>
                                                                                <tbody>
                                                                                {item.options && item.options.map((item: any, i: number) => (
                                                                                    <tr key={i} className="position-relative">
                                                                                        <td width="30%">{item.color.name}</td>
                                                                                        <td width="30%">{item.size.name}</td>
                                                                                        <td width="30%">{item.amount}</td>
                                                                                    </tr>
                                                                                ))}
                                                                                </tbody>
                                                                            </table>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))}
                                                </tbody>
                                            </table>
                                            : <div className="p-5"> <NoContent/> </div> }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }else  return true
    }
}

export default DetailExport;


const option = css`
  width: auto;
  max-width: 120px;
  height: 28px;
  font-size: 14px;
  padding: 0 8px;
  border-radius: 4px;
  position: relative;
  border: 1px solid #b8b8b8;
  i{
    top: -12px;
    right: -12px;
    width: 22px;
    height: 22px;
    color: white;
    display: flex;
    position: absolute;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    background-color: darkred;
  }
`