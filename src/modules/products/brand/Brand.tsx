import React, {Component} from 'react';
import Loading from "../../../common/component/Loading";
import NoContent from "../../../common/component/NoContent";
import {observer} from "mobx-react";
import {brandStore} from "./BrandStore";
import AddBrand from "./component/AddBrand";
import EditBrand from "./component/EditBrand";

@observer
class Brand extends Component {

    async componentDidMount() {
        await brandStore.getBrand();
    }

    render() {
        return (
            <div className="brand">
                <div className="content-wrapper">
                    <div className=" d-flex align-items-center justify-content-between mt-2 mb-3">
                        <div className="pl-2 pr-2 w-100 d-flex align-items-center justify-content-between">
                            <h3 className="mb-0">Brand</h3>
                            <button type="button" className="btn btn-outline-info" data-toggle="modal" data-target="#addBrand">Create</button>
                        </div>
                    </div>
                    <div className="card">
                        <div className="card-body">
                            {brandStore.isLoading ? <Loading/> :
                                <div className="table-responsive mt-4">
                                    {brandStore.listBrand && brandStore.listBrand.length > 0 ?
                                        <table className="table table-striped">
                                            <thead>
                                            <tr>
                                                <th><strong>Id</strong></th>
                                                <th><strong>Logo</strong></th>
                                                <th><strong>Name</strong></th>
                                                <th><strong>Description</strong></th>
                                                <th/>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {brandStore.listBrand.map((item, i) => (
                                                <tr key={i} className="position-relative">
                                                    <td>{item.id}</td>
                                                    <td><img src={item.logoUrl} alt=""/></td>
                                                    <td>{item.name}</td>
                                                    <td>{item.description}</td>
                                                    <td className="text-right">
                                                        <button type="button" onClick={() => brandStore.brandDetail(item.id)} data-toggle="modal" data-target="#editBrand" className="btn btn-inverse-warning btn-icon">
                                                            <i className="fad fa-pen"/>
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                            </tbody>
                                        </table>
                                        : <div className="p-5"> <NoContent/> </div> }
                                </div>
                            }
                        </div>
                        <AddBrand/>
                        <EditBrand/>
                    </div>
                </div>
            </div>
        );
    }
}

export default Brand;