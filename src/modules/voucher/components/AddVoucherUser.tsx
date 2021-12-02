import React, {Component} from 'react';
import {voucherStore} from "../VoucherStore";
import {observer} from "mobx-react";
import Select from "react-select";
import {voucherService} from "../VoucherService";
import HttpStatusCode from "../../../common/constants/HttpErrorCode";
import {observable} from "mobx";
import {accountService} from "../../account/AccountService";
import {toastUtil} from "../../../common/utils/ToastUtil";


@observer
class AddVoucherUser extends Component {
    @observable listUser: any[] = [];
    @observable totalPages: any[] = [];

    async componentDidMount() {
       await this.getUser();
    }

    async getUser() {
        const result = await accountService.getAccount();
        if (result.status === HttpStatusCode.OK) {
            this.totalPages = result.body.metadata.totalPages;
            result.body.data.map((value: any) => {
                return this.listUser.push({
                    value: value.id,
                    label: value.fullName
                })
            })
        } else {
            toastUtil.error(result.body.message ? result.body.message : 'Get list user false.');
        }
    }

    changeSelect(value: any[]) {
        voucherStore.paramsAddVoucher.accountIds = value && value.map(item => item.value)
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
                                <Select
                                    onChange={(data: any) => this.changeSelect(data)}
                                    isMulti
                                    isClearable
                                    isSearchable
                                    options={this.listUser}
                                    classNamePrefix="select"
                                    menuPortalTarget={document.body}
                                    styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
                                    menuPosition={'fixed'}
                                    menuPlacement={'auto'}
                                    menuShouldScrollIntoView={false}
                                />
                            </div>}
                        </div>
                        <div className="modal-footer border-top-0 pt-0">
                            <button type="button" className="btn" data-dismiss="modal">Cancel</button>
                            <button type="button" onClick={() => voucherStore.addVoucherUser()}
                                    className="btn btn-info">Add
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default AddVoucherUser;