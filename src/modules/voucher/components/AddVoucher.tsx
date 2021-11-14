import React, {Component} from 'react';
import {observer} from "mobx-react";
import {observable} from "mobx";
import {storage} from "../../../common/firebase/firebase";
import {voucherStore} from "../VoucherStore";
import DatePickerSingle from "../../../common/component/DatePickerSingle";


@observer
class AddVoucher extends Component {
    @observable images: any;

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
                        voucherStore.dataRequest.imageUrl = url;
                    });
            }
        )
    }

    changeDate = (date: Date) => {
        voucherStore.dataRequest.expiryDate = date;
    }

    render() {
        return (
            <div className="modal fade" id="addVoucher" tabIndex={-1} role="dialog" aria-hidden="true">
                <div className="modal-dialog w-100 h-100 d-flex align-items-center justify-content-center m-0"
                     role="document">
                    <div className="modal-content" style={{maxWidth: 1200}}>
                        <div className="modal-header">
                            <h3 className="mb-0">Add Voucher</h3>
                            <button type="button" id="close_add" className="close" data-dismiss="modal"
                                    aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="row">
                                <div className="col-6">
                                    <div className="form-group">
                                        <label>Name</label>
                                        <input type="text"
                                               placeholder="Enter name"
                                               className="form-control"
                                               value={voucherStore.dataRequest.name}
                                               onChange={(e: any) => voucherStore.dataRequest.name = e.currentTarget.value}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Code</label>
                                        <input type="text"
                                               placeholder="Enter name"
                                               className="form-control"
                                               value={voucherStore.dataRequest.code}
                                               onChange={(e: any) => voucherStore.dataRequest.code = e.currentTarget.value}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Discount</label>
                                        <input type="text"
                                               placeholder="Enter name"
                                               className="form-control"
                                               value={voucherStore.dataRequest.discount}
                                               onChange={(e: any) => voucherStore.dataRequest.discount = e.currentTarget.value}
                                        />
                                    </div>
                                    <div className="form-group h-auto">
                                        <label>Image</label>
                                        <div className="d-flex align-items-center">
                                            <img style={{width: 35, height: 35}} className="mr-2 ml-2"
                                                 src={voucherStore.dataRequest.imageUrl} alt=""/>
                                            <input type="file" style={{width: 84, overflow: `hidden`}} className="mr-4"
                                                   onChange={(e: any) => this.handleChange(e)}/>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-6">
                                    <div className="form-group">
                                        <label>Expiry Date</label>
                                        <DatePickerSingle timePicker={true}
                                            format="YYYY/MM/DD hh:mm"
                                            onChange={this.changeDate}/>
                                    </div>
                                    <div className="form-group">
                                        <label>Description</label>
                                        <input type="text"
                                               placeholder="Enter name"
                                               className="form-control"
                                               value={voucherStore.dataRequest.description}
                                               onChange={(e: any) => voucherStore.dataRequest.description = e.currentTarget.value}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Type</label>
                                        <select className="form-control" value={voucherStore.dataRequest.type}
                                                onChange={(e: any) => voucherStore.dataRequest.type = e.currentTarget.value}>
                                            <option value="">Choose</option>
                                            <option value="PERCENT">PERCENT</option>
                                            <option value="MINUS">MINUS</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label>State</label>
                                        <select className="form-control" value={voucherStore.dataRequest.state}
                                                onChange={(e: any) => voucherStore.dataRequest.state = e.currentTarget.value}>
                                            <option value="">Choose</option>
                                            <option value="ACTIVE">ACTIVE</option>
                                            <option value="INACTIVE">INACTIVE</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer border-top-0 pt-0">
                            <button type="button" className="btn" data-dismiss="modal">Cancel</button>
                            <button type="button" onClick={() => voucherStore.add()}
                                    className="btn btn-info">Create
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default AddVoucher;