import React, {Component} from 'react';
import Loading from "../../common/component/Loading";
import {getLocalDateTime} from "../../common/utils/Utils";
import NoContent from "../../common/component/NoContent";
import {observer} from "mobx-react";
import {voucherStore} from "./VoucherStore";
import AddVoucher from "./components/AddVoucher";
import EditVoucher from "./components/EditVoucher";
import DeleteVoucher from "./components/DeleteVoucher";
import AddVoucherUser from "./components/AddVoucherUser";
import {requestUtils} from "../../common/utils/RequestUtil";
import ReactPaginate from "react-paginate";

@observer
class Voucher extends Component {

    async componentDidMount() {
        await voucherStore.getVoucher()
    }


    async searchByName(){
        if(voucherStore.searchName || voucherStore){
            voucherStore.page = 0
        }
        await voucherStore.getVoucher()
    }

    async changeState(){
        voucherStore.page = 0
        await voucherStore.getVoucher()
    }

    async enterSearch(e: any){
        if(e.key === "Enter"){
            await this.searchByName();
        }
    }

    handlePageClick = async (data: any) => {
        let selected: number = data.selected;
        voucherStore.page = selected;
        requestUtils.saveQueryParam(this.props, {page: voucherStore.page});
        await voucherStore.getVoucher()
    };

    render() {
        return (
            <div className="voucher">
                <div className="content-wrapper">
                    <div className=" d-flex align-items-center justify-content-between mt-2 mb-3">
                        <div className="pl-2 pr-2 w-100 d-flex align-items-center justify-content-between">
                            <h3 className="mb-0">Voucher</h3>
                           <div className="d-flex">
                               <button type="button" className="btn btn-outline-info" data-toggle="modal" data-target="#addVoucher">Create</button>
                           </div>
                        </div>
                    </div>
                    <div className="card">
                        <div className="card-body">
                            <div className="d-flex align-items-center">
                                <div className="d-flex search_name from-ground">
                                    <input type="text" className="search form-control"
                                           onChange={(e: any) => voucherStore.searchName = e.currentTarget.value}
                                           onKeyDown={(e: any) => this.enterSearch(e)} placeholder="Search by name"/>
                                    <button type="button" onClick={() => this.searchByName()}
                                            className="btn btn-info d-flex align-items-center justify-content-center">
                                        <i className="far fa-search"/></button>
                                </div>
                                <div className="d-flex search_name from-ground ml-4">
                                    <input type="text" className="search form-control"
                                           onChange={(e: any) => voucherStore.code = e.currentTarget.value}
                                           onKeyDown={(e: any) => this.enterSearch(e)} placeholder="Search by code"/>
                                    <button type="button" onClick={() => this.searchByName()}
                                            className="btn btn-info d-flex align-items-center justify-content-center">
                                        <i className="far fa-search"/></button>
                                </div>
                            </div>
                            {voucherStore.isLoading ? <Loading/> :
                                <div className="table-responsive mt-4">
                                    {voucherStore.listVoucher && voucherStore.listVoucher.length > 0 ?
                                        <table className="table table-striped">
                                            <thead>
                                            <tr>
                                                <th><strong>Id</strong></th>
                                                <th><strong>Images</strong></th>
                                                <th><strong>Name</strong></th>
                                                <th><strong>Code</strong></th>
                                                <th><strong>Discount</strong></th>
                                                <th><strong>Description</strong></th>
                                                <th><strong>Type</strong></th>
                                                <th><strong>State</strong></th>
                                                <th><strong>ExpiryDate</strong></th>
                                                <th className="text-center"><strong>Actions</strong></th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {voucherStore.listVoucher.map((item, i) => (
                                                <tr key={i} className="position-relative">
                                                    <td>{item.id}</td>
                                                    <td><img src={item.imageUrl} alt=""/></td>
                                                    <td>{item.name}</td>
                                                    <td>{item.code}</td>
                                                    <td>{item.discount}</td>
                                                    <td>{item.description}</td>
                                                    <td>{item.type}</td>
                                                    <td>{item.state}</td>
                                                    <td>{item.expiryDate && getLocalDateTime(item.expiryDate, "dd/mm/yyyy, hh:m_m")}</td>
                                                    <td className="text-center">
                                                        <button type="button"
                                                                onClick={() => voucherStore.voucherId = item.id}
                                                                className="btn btn-inverse-info btn-icon"
                                                                data-toggle="modal" data-target="#addVoucherUser">
                                                            <i className="fal fa-gift"/>
                                                        </button>
                                                        <button type="button"
                                                                onClick={() => voucherStore.detail(item.id)}
                                                                className="btn btn-inverse-warning btn-icon"
                                                                data-toggle="modal" data-target="#editVoucher">
                                                            <i className="far fa-pen"/>
                                                        </button>
                                                        <button type="button"
                                                                onClick={() => voucherStore.voucherId = item.id}
                                                                className="btn btn-inverse-danger btn-icon"
                                                                data-toggle="modal" data-target="#deleteVoucher">
                                                            <i className="far fa-trash-alt"/>
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                            </tbody>
                                        </table>
                                        : <div className="p-5"> <NoContent/> </div> }
                                </div>
                            }
                            <div className="pagination mt-3">
                                {voucherStore.totalPages > 1 && <ReactPaginate
                                    previousLabel={'Previous'} nextLabel={'Next'} breakLabel={'...'}
                                    breakClassName={'break-me'}
                                    pageCount={voucherStore.totalPages}
                                    forcePage={voucherStore.page} marginPagesDisplayed={2}
                                    pageRangeDisplayed={5}
                                    onPageChange={this.handlePageClick} containerClassName={'pagination'}
                                    pageClassName={'paginate_button page-item'} pageLinkClassName={'page-link'}
                                    activeClassName={'active'}
                                    previousClassName={'paginate_button page-item previous'}
                                    previousLinkClassName={'page-link'}
                                    nextClassName={'paginate_button page-item next'} nextLinkClassName={'page-link'}
                                />}
                            </div>
                        </div>
                    </div>
                    <AddVoucher/>
                    <AddVoucherUser/>
                    <EditVoucher/>
                    <DeleteVoucher/>
                </div>
            </div>
        );
    }
}

export default Voucher;