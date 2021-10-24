import React, {Component} from 'react';
import Loading from "../../../common/component/Loading";
import {observer} from "mobx-react";
import {accountStore} from "../AccountStore";


@observer
class DetailAccount extends Component {

    render() {
        return (
            <div className="modal fade" id="detailUser" tabIndex={-1} role="dialog" aria-hidden="true">
                <div className="modal-dialog w-100 h-100 d-flex align-items-center justify-content-center m-0" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h3 className="mb-0">Detail Account</h3>
                            <button type="button" id="close_edit_user" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            {!accountStore.isGetDetail ? <>
                                <div className="form-group">
                                    <label>User Name</label>
                                    <input type="text" disabled={true}
                                           className="form-control"
                                           value={accountStore.dataRequest.username}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Full Name</label>
                                    <input type="text" disabled={true}
                                           placeholder="Full name"
                                           className="form-control"
                                           value={accountStore.dataRequest.fullName}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Phone</label>
                                    <input type="text" disabled={true}
                                           placeholder="Phone number"
                                           className="form-control"
                                           value={accountStore.dataRequest.phone}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Email</label>
                                    <input type="text" disabled={true}
                                           placeholder="Email"
                                           className="form-control"
                                           value={accountStore.dataRequest.email}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Gender</label>
                                    <input type="text" disabled={true}
                                           placeholder="Gender"
                                           className="form-control"
                                           value={accountStore.dataRequest.gender} />
                                </div>
                                <div className="form-group">
                                    <label>Address</label>
                                    <input type="text" disabled={true}
                                           placeholder="Address"
                                           className="form-control"
                                           value={accountStore.dataRequest.address}
                                    />
                                </div>
                            </> : <Loading/> }
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

export default DetailAccount;