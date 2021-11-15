import React, {Component} from 'react';
import {voucherStore} from "../VoucherStore";
import {observer} from "mobx-react";
import Select from "react-select";



@observer
class AddVoucherUser extends Component {

   async componentDidMount() {

    }

    changeSelect(e: any){

    }

    render() {
        return (
            <div className="modal fade" id="addVoucherUser" tabIndex={-1} role="dialog" aria-hidden="true">
                <div className="modal-dialog w-100 h-100 d-flex align-items-center justify-content-center m-0"
                     role="document">
                    <div className="modal-content" style={{maxWidth: 1600}}>
                        <div className="modal-header">
                            <h3 className="mb-0">Add Voucher User</h3>
                            <button type="button" id="close_add_voucher_user" className="close" data-dismiss="modal"
                                    aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="form-group">
                                <label>Type</label>
                                <select className="form-control" value={voucherStore.paramsAddVoucher.type}
                                        onChange={(e: any) => voucherStore.paramsAddVoucher.type = e.currentTarget.value}>
                                    <option value="">Choose</option>
                                    <option value="ALL">ALL</option>
                                    <option value="LIST">LIST</option>
                                </select>
                            </div>
                            {voucherStore.paramsAddVoucher.type === "LIST" && <div className="form-group">
                                <label>User</label>
                                {/*<Select*/}
                                {/*    onChange={(data: any) => changeSelect(data)}*/}
                                {/*    isMulti*/}
                                {/*    isClearable*/}
                                {/*    isSearchable*/}
                                {/*    options={item.options}*/}
                                {/*    classNamePrefix="select"*/}
                                {/*    menuPortalTarget={document.body}*/}
                                {/*    styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}*/}
                                {/*    menuPosition={'fixed'}*/}
                                {/*    menuPlacement={'auto'}*/}
                                {/*    menuShouldScrollIntoView={false}*/}
                                {/*/>*/}
                            </div>}
                        </div>
                        <div className="modal-footer border-top-0 pt-0">
                            <button type="button" className="btn" data-dismiss="modal">Cancel</button>
                            <button type="button" onClick={() => voucherStore.addVoucherUser()}
                                    className="btn btn-info">Create
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default AddVoucherUser;