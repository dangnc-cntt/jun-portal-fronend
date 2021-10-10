import React, {Component} from 'react';
import {observer} from "mobx-react";
import {accountStore} from "../AccountStore";


@observer
class EditAccount extends Component {
    render() {
        return (
            <div className="modal fade" id="editUser" tabIndex={-1} role="dialog" aria-hidden="true">
                <div className="modal-dialog w-100 h-100 d-flex align-items-center justify-content-center m-0" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h3 className="mb-0">Edit Account</h3>
                            <button type="button" id="close_edit_account" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="form-group">
                                <label>Username<sup className="text-danger">*</sup></label>
                                <input type="text"
                                       placeholder="Enter username"
                                       className="form-control"
                                       value={accountStore.dataRequest.userName}
                                       onChange={(e: any) => accountStore.dataRequest.userName = e.currentTarget.value}
                                />
                            </div>
                            <div className="form-group">
                                <label>Full Name<sup className="text-danger">*</sup></label>
                                <input type="text"
                                       placeholder="Enter full name"
                                       className="form-control"
                                       value={accountStore.dataRequest.fullName}
                                       onChange={(e: any) => accountStore.dataRequest.fullName = e.currentTarget.value}
                                />
                            </div>
                            <div className="form-group">
                                <label>Password<sup className="text-danger">*</sup></label>
                                <input type="text"
                                       placeholder="Enter password"
                                       className="form-control"
                                       value={accountStore.dataRequest.password}
                                       onChange={(e: any) => accountStore.dataRequest.password = e.currentTarget.value}
                                />
                            </div>
                            <div className="form-group">
                                <label>Phone<sup className="text-danger">*</sup></label>
                                <input type="text"
                                       placeholder="Enter Phone number"
                                       className="form-control"
                                       value={accountStore.dataRequest.phone}
                                       onChange={(e: any) => accountStore.dataRequest.phone = e.currentTarget.value}
                                />
                            </div>
                            <div className="form-group">
                                <label>Email<sup className="text-danger">*</sup></label>
                                <input type="text"
                                       placeholder="Enter email"
                                       className="form-control"
                                       value={accountStore.dataRequest.email}
                                       onChange={(e: any) => accountStore.dataRequest.email = e.currentTarget.value}
                                />
                            </div>
                            <div className="form-group">
                                <label>Gender<sup className="text-danger">*</sup></label>
                                <select className="form-control"
                                        value={accountStore.dataRequest.gender}
                                        onChange={(e: any) => accountStore.dataRequest.gender = e.currentTarget.value}>
                                    <option value="">Choose Role</option>
                                    <option value="MALE">Nữ</option>
                                    <option value="MALE">Nữ</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Address<sup className="text-danger">*</sup></label>
                                <input type="text"
                                       placeholder="Enter name"
                                       className="form-control"
                                       value={accountStore.dataRequest.address}
                                       onChange={(e: any) => accountStore.dataRequest.address = e.currentTarget.value}
                                />
                            </div>
                        </div>
                        <div className="modal-footer border-top-0 pt-0">
                            <button type="button" className="btn" data-dismiss="modal">Cancel</button>
                            <button type="button" onClick={() => accountStore.updated()} className="btn btn-info">Update</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default EditAccount;