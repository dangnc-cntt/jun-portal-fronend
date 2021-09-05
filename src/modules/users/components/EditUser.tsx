import React, {Component} from 'react';
import {userStore} from "../UserStore";
import {Role, State} from "../UserModel";
import {observer} from "mobx-react";
import Loading from '../../../common/component/Loading';

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
                            { !userStore.isGetDetail ? <>
                            <div className="form-group">
                                <label>Username<sup className="text-danger">*</sup></label>
                                <input type="text" 
                                    placeholder="Enter username" 
                                    className="form-control" 
                                    value={userStore.editUser.userName} 
                                    onChange={(e: any) => userStore.editUser.userName = e.currentTarget.value}
                                />
                            </div>
                            <div className="form-group">
                                <label>Display Name<sup className="text-danger">*</sup></label>
                                <input type="text" 
                                    placeholder="Enter display name" 
                                    className="form-control" 
                                    value={userStore.editUser.displayName} 
                                    onChange={(e: any) => userStore.editUser.displayName = e.currentTarget.value}
                                />
                            </div>
                            <div className="form-group">
                                <label>Role</label>
                                <select className="form-control" 
                                    value={userStore.editUser.role} 
                                    onChange={(e: any) => userStore.editUser.role = e.currentTarget.value}
                                >
                                    <option value="">Choose Role</option>
                                    <option value={Role.PUBLISHER}>{Role.PUBLISHER}</option>
                                    <option value={Role.USER}>{Role.USER}</option>
                                    {/* <option value={Role.ADMIN}>{Role.ADMIN}</option> */}
                                </select>
                            </div>
                            <div className="form-group">
                                <label>State<sup className="text-danger">*</sup></label> 
                                <select className="form-control" 
                                    value={userStore.editUser.state} 
                                    onChange={(e: any) => userStore.editUser.state = e.currentTarget.value}
                                >
                                    <option value="">Choose State</option>
                                    <option value={State.ACTIVATED}>{State.ACTIVATED}</option>
                                    <option value={State.BANNED}>{State.BANNED}</option>
                                    <option value={State.VERIFIED}>{State.VERIFIED}</option>
                                    <option value={State.NOT_VERIFIED}>{State.NOT_VERIFIED}</option>
                                </select>
                            </div>
                        </> : <Loading/> }
                        </div>
                        <div className="modal-footer border-top-0 pt-0">
                            <button type="button" className="btn" data-dismiss="modal">Cancel</button>
                            <button type="button" onClick={() => userStore.updated()} className="btn btn-info">Ok</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default EditUser;