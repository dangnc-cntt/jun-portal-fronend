import React, {Component} from 'react';
import {css} from "@emotion/core";
import {observable} from "mobx";
import {storage} from "../../../common/firebase/firebase";
import {productStore} from "../ProductStore";
import {colorStore} from "../color/ColorStore";
import {sizeStore} from "../size/SizeStore";
import {categoryStore} from "../../category/CategoryStore";
import {observer} from "mobx-react";


@observer
class EditProduct extends Component {
    @observable images: any;
    @observable listColor: any[] = []
    handleChange = (e: any) => {
        if (e.target.files[0]) {
            this.images = e.target.files[0];
            this.handleUpload()
        }
    }

    handleUpload = () => {
        const uploadTask = storage.ref(`images/${this.images.name}`).put(this.images);
        uploadTask.on(
            "state_changed",
            snapshot => {
                const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
            },
            error => {
                console.log(error);
            },
            () => {
                storage
                    .ref("images")
                    .child(this.images.name)
                    .getDownloadURL()
                    .then(url => {
                        productStore.dataRequest.images.push(url);
                    });
            }
        )
    }

    async componentDidMount() {
        await colorStore.getColor();
        await sizeStore.getSize();
        await categoryStore.getCate()
    }

    addOption() {
        let color: any
        let size: any

        colorStore.listColor.map(item => {
            if (item.id == productStore.dataRequest.color) {
                color = {
                    id: item.id,
                    name: item.name
                }
            }
        })

        sizeStore.listSize.map(item => {
            if (item.id == productStore.dataRequest.size) {
                size = {
                    id: item.id,
                    name: item.name
                }
            }
        })

        productStore.dataRequest.options.push({color: color, size: size})

        productStore.dataRequest.color = "";
        productStore.dataRequest.size = "";
    }

    render() {
        return (
            <div className="modal fade" id="editProduct" tabIndex={-1} role="dialog" aria-hidden="true">
                <div className="modal-dialog w-100 h-100 d-flex align-items-center justify-content-center m-0"
                     role="document">
                    <div className="modal-content" style={{maxWidth: 1200}}>
                        <div className="modal-header">
                            <h3 className="mb-0">Edit Product</h3>
                            <button type="button" id="close_add" className="close" data-dismiss="modal"
                                    aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="row">
                                <div className="col-6">
                                    <div className="form-group h-auto mb-2">
                                        <label>Avatar</label>
                                        <div>
                                            {productStore.dataRequest.imageUrls && productStore.dataRequest.imageUrls.map((value: any, i: number) => {
                                                return <img style={{width: 35, height: 35}} className="mr-2 ml-2"
                                                            src={value} key={i} alt=""/>
                                            })}
                                        </div>
                                        <input type="file" style={{width: 80, overflow: `hidden`}} className="mt-2"
                                               onChange={(e: any) => this.handleChange(e)}/>
                                    </div>
                                    <div className="form-group mt-2">
                                        <label>Name</label>
                                        <input type="text"
                                               placeholder="Enter name"
                                               className="form-control"
                                               value={productStore.dataRequest.name}
                                               onChange={(e: any) => productStore.dataRequest.name = e.currentTarget.value}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Code</label>
                                        <input type="text"
                                               placeholder="Enter name"
                                               className="form-control"
                                               value={productStore.dataRequest.code}
                                               onChange={(e: any) => productStore.dataRequest.code = e.currentTarget.value.trim()}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>CategoryId</label>
                                        <select className="form-control" value={productStore.dataRequest.categoryId}
                                                onChange={(e: any) => productStore.dataRequest.categoryId = e.currentTarget.value}>
                                            <option value="">Choose</option>
                                            {categoryStore.listCate && categoryStore.listCate.map((value, i) => {
                                                return <option value={value.id} key={i}>{value.name}</option>
                                            })}
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label>Options</label>
                                        <div className="w-100 d-flex align-items-center h-auto form-control">
                                            {productStore.dataRequest.optionList && productStore.dataRequest.optionList.map((value: any, i: number) => {
                                                return <div css={option} className="d-flex align-items-center justify-content-center mr-3"
                                                            key={i}>
                                                    <span>{value.color.name} - {value.size.name}</span>
                                                    <i className="fal fa-times"
                                                       onClick={() => productStore.dataRequest.optionList.splice(i, 1)}/>
                                                </div>
                                            })}
                                        </div>
                                    </div>
                                    <div className="d-flex">
                                        <div className="form-group w-50 mr-2">
                                            <label>Color</label>
                                            <select className="form-control" value={productStore.dataRequest.color}
                                                    onChange={(e: any) => productStore.dataRequest.color = e.currentTarget.value}>
                                                <option value="">Choose</option>
                                                {colorStore.listColor.map((value, i) => {
                                                    return <option value={value.id} key={i}>{value.name}</option>
                                                })}
                                            </select>
                                        </div>
                                        <div className="form-group w-50 ml-2">
                                            <label>Size</label>
                                            <select className="form-control" value={productStore.dataRequest.size}
                                                    onChange={(e: any) => productStore.dataRequest.size = e.currentTarget.value}>
                                                <option value="">Choose</option>
                                                {sizeStore.listSize.map((value, i) => {
                                                    return <option value={value.id} key={i}>{value.name}</option>
                                                })}
                                            </select>
                                        </div>
                                    </div>
                                    <button className="btn btn-sm btn-outline-info"
                                            onClick={() => this.addOption()}>Add
                                    </button>
                                </div>
                                <div className="col-6">
                                    <div className="form-group">
                                        <label>Description</label>
                                        <input type="text"
                                               placeholder="Enter Description"
                                               className="form-control"
                                               value={productStore.dataRequest.description}
                                               onChange={(e: any) => productStore.dataRequest.description = e.currentTarget.value}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>CostPrice</label>
                                        <input type="text"
                                               placeholder="Enter Cost Price"
                                               className="form-control"
                                               value={productStore.dataRequest.costPrice}
                                               onChange={(e: any) => productStore.dataRequest.costPrice = e.currentTarget.value}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Discount</label>
                                        <input type="text"
                                               placeholder="Enter Discount"
                                               className="form-control"
                                               value={productStore.dataRequest.discount}
                                               onChange={(e: any) => productStore.dataRequest.discount = e.currentTarget.value}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>IsHot</label>
                                        <select className="form-control" value={productStore.dataRequest.isHot}
                                                onChange={(e: any) => productStore.dataRequest.isHot = e.currentTarget.value}>
                                            <option value="">Choose</option>
                                            <option value="True" selected={productStore.dataRequest.isHot && true}>True</option>
                                            <option value="False" selected={!productStore.dataRequest.isHot && true}>False</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label>State</label>
                                        <select className="form-control" value={productStore.dataRequest.state}
                                                onChange={(e: any) => productStore.dataRequest.state = e.currentTarget.value}>
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
                            <button type="button" onClick={() => productStore.addProduct()}
                                    className="btn btn-info">Create
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default EditProduct;

const option = css`
  width: auto;
  max-width: 90px;
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