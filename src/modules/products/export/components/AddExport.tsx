import React, {Component} from 'react';
import {observer} from "mobx-react";
import {goBack} from "../../../../common/utils/Utils";
import {productStore} from "../../ProductStore";
import {observable} from "mobx";
import {css} from "@emotion/core";
import {exportStore} from "../ExportStore";
import {toastUtil} from "../../../../common/utils/ToastUtil";
import {getRequest} from "../../../../common/helpers/RequestHelper";


@observer
class AddExport extends Component {
    @observable amount: any = '';
    @observable idOption: any = '';
    @observable showOptions: boolean = false;
    @observable idProduct: any = 0;
    @observable listOrder: any[] = [];

    async componentDidMount() {
        await productStore.getProduct();
        await this.getOrderAll();
    }

    async getOrderAll(){
        const result = await getRequest(`/v1/portal/orders/all`);
        if(result.status === 200){
            this.listOrder = result.body
        }
    }


    async addProduct(id: any){
        this.idProduct = id;
        productStore.listProduct.map((item) => {
            if(item.id == id){
                if(exportStore.dataRequest.products && exportStore.dataRequest.products.length > 0){
                    var index = exportStore.dataRequest.products.findIndex((val: any) => val.id === id)
                    if(index == -1){
                        item.optionList = [];
                        item.showOptions = true;
                        exportStore.dataRequest.products.push(item);
                        exportStore.getOptionList(id);
                    }
                }else {
                    item.optionList = [];
                    item.showOptions = true;
                    exportStore.dataRequest.products.push(item);
                    exportStore.getOptionList(id);
                }
            }
        })
    }

    addOption() {
        let option: any;
        exportStore.listOption.map((item) => {
            if(item.id == this.idOption){
                if(parseInt(this.amount) <= parseInt(item.amount)){
                    option = item;
                    option["amount"] = this.amount;
                    exportStore.dataRequest.products.map((value: any) => {
                        if(value.id == this.idProduct){
                            value.optionList.push(option);
                            if(value.optionList.length === exportStore.listOption.length){
                                value.showOptions = false;
                            }
                        }
                    })

                    this.idOption = "";
                    this.amount = "";
                }else {
                    toastUtil.warning("Số lượng hàng trong kho không đủ");
                    return false;
                }

            }
        })

    }


    render() {
        return (
            <div className="add_export">
                <div className="content-wrapper">
                    <div className=" d-flex align-items-center justify-content-between mt-2 mb-3">
                        <div className="pl-2 pr-2 w-100 d-flex align-items-center">
                            <button type="button" className="btn btn-outline-info mr-4" onClick={() => goBack()}>Back</button>
                            <h3 className="mb-0">Add Export</h3>
                        </div>
                    </div>
                    <div className="card">
                        <div className="card-body">
                            <div className="form-group mb-4">
                                <label>Description</label>
                                <input type="text"
                                       placeholder="Enter Description"
                                       className="form-control"
                                       value={exportStore.dataRequest.description}
                                       onChange={(e: any) => exportStore.dataRequest.description = e.currentTarget.value}
                                />
                            </div>
                            <div className="d-flex align-items-center mb-4">
                                <div className="w-50">
                                    <label className="w-100 mr-4">Payment</label>
                                    {exportStore.dataRequest.isOnline ? <i className="fad fa-toggle-on text-success" onClick={() => exportStore.dataRequest.isOnline = false} style={{fontSize: 32}}/> :
                                        <i className="fad fa-toggle-off text-secondary" onClick={() => exportStore.dataRequest.isOnline = true} style={{fontSize: 32}}/>}
                                </div>
                                {exportStore.dataRequest.isOnline && <div className="w-50">
                                    <label>Order</label>
                                    <select className="form-control" onChange={(e: any) => exportStore.dataRequest.orderId = e.currentTarget.value}>
                                        <option value="">Choose order</option>
                                        {this.listOrder && this.listOrder.map((item, i) => {
                                            return <option value={item.id} key={i}>{item.id}</option>
                                        })}
                                    </select>
                                </div>}
                            </div>
                            {!exportStore.dataRequest.isOnline && <div className="form-group mb-2">
                                <label>Products</label>
                                <select className="form-control"
                                        onChange={(e: any) => this.addProduct(e.currentTarget.value)}>
                                    <option value="">Add product</option>
                                    {productStore.listProduct.map((item, i) => {
                                        return <option value={item.id} key={i}>{item.name}</option>
                                    })}
                                </select>
                            </div>}
                            <div className="list-product d-flex w-100 flex-wrap">
                                {exportStore.dataRequest.products && exportStore.dataRequest.products.map((item: any, i: number) => {
                                    return <div className={`product p-2 mb-4 border ${i % 2 == 0 ? "mr-2" : "ml-2"}`} style={{width: `48%`}} key={i}>
                                        <span className="">{item.name}</span>
                                        <div className="form-group mt-4">
                                            <label>Options</label>
                                            <div className="w-100 d-flex align-items-center h-auto form-control">
                                                {item.optionList && item.optionList.map((value: any, i: number) => {
                                                    return <div css={option} className="d-flex align-items-center justify-content-center mr-3"
                                                                key={i}>
                                                        <span>{value.color.name} - {value.size.name} - {value.amount}</span>
                                                        <i className="fal fa-times"
                                                           onClick={() => item.optionList.splice(i, 1)}/>
                                                    </div>
                                                })}
                                            </div>
                                        </div>
                                        {item.showOptions && exportStore.listOption && exportStore.listOption.length > 0 && <div>
                                            <div className="d-flex">
                                                <div className="form-group w-25">
                                                    <select className="form-control" value={this.idOption} onChange={(e: any) => this.idOption = e.currentTarget.value}>
                                                        <option value="">Choose option</option>
                                                        {exportStore.listOption && exportStore.listOption.map((value, i) => {
                                                            return <option value={value.id} key={i}>{value.color.name} - {value.size.name}</option>
                                                        })}
                                                    </select>
                                                </div>
                                                <div className="form-group w-25 ml-4">
                                                    <input type="text" disabled={!this.idOption}
                                                           placeholder="Enter Amount"
                                                           className="form-control"
                                                           value={this.amount}
                                                           onChange={(e: any) => this.amount = e.currentTarget.value.trim()}
                                                    />
                                                </div>
                                                <button className="btn btn-sm ml-4 btn-outline-info" style={{height: `40px`}} disabled={!this.idOption}
                                                        onClick={() => this.addOption()}>Add
                                                </button>
                                            </div>
                                        </div>}
                                    </div>
                                })}

                            </div>
                            <div className="modal-footer mt-5 border-top-0 pt-0">
                                <button type="button" onClick={() => exportStore.addExport()}
                                        className="btn btn-info">Create
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default AddExport;

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