import React, {Component} from 'react';
import {userStore} from "../UserStore";
import {observer} from "mobx-react";
import Loading from '../../../common/component/Loading';
import {Gender} from "../UserModel";

@observer
class EditUser extends Component {
    render() {
        return (
            <div className="modal fade" id="editUser" tabIndex={-1} role="dialog" aria-hidden="true">
                <div className="modal-dialog w-100 h-100 d-flex align-items-center justify-content-center m-0" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h3 className="mb-0">Edit User</h3>
                            <button type="button" id="close_edit_user" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            {!userStore.isGetDetail ? <>
                            <div className="form-group">
                                <label>Full Name<sup className="text-danger">*</sup></label>
                                <input type="text" 
                                    placeholder="Enter full name"
                                    className="form-control" 
                                    value={userStore.dataRequest.fullName}
                                    onChange={(e: any) => userStore.dataRequest.fullName = e.currentTarget.value}
                                />
                            </div>
                                <div className="form-group">
                                    <label>Phone<sup className="text-danger">*</sup></label>
                                    <input type="text"
                                           placeholder="Enter Phone number"
                                           className="form-control"
                                           value={userStore.dataRequest.phone}
                                           onChange={(e: any) => userStore.dataRequest.phone = e.currentTarget.value}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Email<sup className="text-danger">*</sup></label>
                                    <input type="text"
                                           placeholder="Enter email"
                                           className="form-control"
                                           value={userStore.dataRequest.email}
                                           onChange={(e: any) => userStore.dataRequest.email = e.currentTarget.value}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Gender<sup className="text-danger">*</sup></label>
                                    <select className="form-control"
                                            value={userStore.dataRequest.gender}
                                            onChange={(e: any) => userStore.dataRequest.gender = e.currentTarget.value}>
                                        <option value="">Choose Gender</option>
                                        <option value={Gender.OTHER}>{Gender.OTHER}</option>
                                        <option value={Gender.MALE}>{Gender.MALE}</option>
                                        <option value={Gender.FEMALE}>{Gender.FEMALE}</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Address</label>
                                    <input type="text"
                                           placeholder="Enter address"
                                           className="form-control"
                                           value={userStore.dataRequest.address}
                                           onChange={(e: any) => userStore.dataRequest.address = e.currentTarget.value}
                                    />
                                </div>
                        </> : <Loading/> }
                        </div>
                        <div className="modal-footer border-top-0 pt-0">
                            <button type="button" className="btn" data-dismiss="modal">Cancel</button>
                            <button type="button" onClick={() => userStore.updated()} className="btn btn-info">Update</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default EditUser;