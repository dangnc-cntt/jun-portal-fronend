import React, {Component} from 'react';
import {observer} from "mobx-react";
import {productStore} from "../ProductStore";
import {categoryStore} from "../../category/CategoryStore";
import {css} from "@emotion/core";


@observer
class DetailProduct extends Component {


    render() {
        return (
            <div className="modal fade" id="detailProduct" tabIndex={-1} role="dialog" aria-hidden="true">
                <div className="modal-dialog w-100 h-100 d-flex align-items-center justify-content-center m-0"
                     role="document">
                    <div className="modal-content" style={{maxWidth: 1200}}>
                        <div className="modal-header">
                            <h3 className="mb-0">Detail Product</h3>
                            <button type="button" id="close_detail" className="close" data-dismiss="modal"
                                    aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="row">
                                <div className="col-6">
                                    <div className="form-group h-auto mb-2">
                                        <label>Avatar</label>
                                        <div className="d-flex">
                                            {productStore.dataRequest.imageUrls && productStore.dataRequest.imageUrls.map((value: any, i: number) => {
                                                return <div className="position-relative mr-2">
                                                    <img style={{width: 35, height: 35}} className="mr-2 ml-2"
                                                         src={value} key={i} alt=""/>
                                                </div>
                                            })}
                                        </div>
                                    </div>
                                    <div className="form-group mt-2">
                                        <label>Name</label>
                                        <input type="text"
                                               placeholder="Enter name"
                                               className="form-control"
                                               value={productStore.dataRequest.name}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Code</label>
                                        <input type="text"
                                               placeholder="Enter name"
                                               className="form-control"
                                               value={productStore.dataRequest.code}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>CategoryId</label>
                                        <select className="form-control" value={productStore.dataRequest.categoryId}>
                                            {categoryStore.listCate && categoryStore.listCate.map((value, i) => {
                                                return <option value={value.id} key={i}>{value.name}</option>
                                            })}
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label>Options</label>
                                        <div className="w-100 d-flex align-items-center h-auto form-control">
                                            {productStore.dataRequest.optionList && productStore.dataRequest.optionList.map((value: any, i: number) => {
                                                return <div css={css_option} className="d-flex align-items-center justify-content-center mr-3"
                                                            key={i}>
                                                    <span>{value.color.name} - {value.size.name} - {value.amount}</span>
                                                </div>
                                            })}
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label>Description</label>
                                        <input type="text"
                                               placeholder="Enter Description"
                                               className="form-control"
                                               value={productStore.dataRequest.description}
                                        />
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="form-group">
                                        <label>Price</label>
                                        <input type="text"
                                               placeholder="Enter Price"
                                               className="form-control"
                                               value={productStore.dataRequest.price}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>CostPrice</label>
                                        <input type="text"
                                               placeholder="Enter Cost Price"
                                               className="form-control"
                                               value={productStore.dataRequest.costPrice}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Discount</label>
                                        <input type="text"
                                               placeholder="Enter Discount"
                                               className="form-control"
                                               value={productStore.dataRequest.discount}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>IsHot</label>
                                        <select className="form-control" value={productStore.dataRequest.isHot}>
                                            <option value="True" selected={productStore.dataRequest.isHot && true}>True</option>
                                            <option value="False" selected={!productStore.dataRequest.isHot && true}>False</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label>Brand</label>
                                        <select className="form-control" value={productStore.dataRequest.brandId}>
                                            {productStore.listBrand.map((val, i) => {
                                                return ( <option value={val.id} key={i}>{val.name}</option> )
                                            })}
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label>State</label>
                                        <select className="form-control" value={productStore.dataRequest.state}>
                                            <option value="">Choose</option>
                                            <option value="ACTIVE">Active</option>
                                            <option value="NOT_ACTIVE">Not Active</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer border-top-0 pt-0">
                            <button type="button" className="btn" data-dismiss="modal">Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default DetailProduct;


const css_option = css`
  width: auto;
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