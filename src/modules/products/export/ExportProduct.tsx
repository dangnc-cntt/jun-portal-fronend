import React, {Component} from 'react';
import {observer} from "mobx-react";
import Loading from "../../../common/component/Loading";
import NoContent from "../../../common/component/NoContent";
import {exportStore} from "./ExportStore";
import {Link} from "react-router-dom";
import {productStore} from "../ProductStore";


@observer
class ExportProduct extends Component {

    async componentDidMount() {
       await exportStore.getExport()
    }


    render() {
        return (
            <div className="export_product">
                <div className="content-wrapper">
                    <div className=" d-flex align-items-center justify-content-between mt-2 mb-3">
                        <div className="pl-2 pr-2 w-100 d-flex align-items-center justify-content-between">
                            <h3 className="mb-0">Export Product</h3>
                            <Link to={"/product/add-export"}><button type="button" className="btn btn-outline-info" >Create</button></Link>
                        </div>
                    </div>
                    <div className="card">
                        <div className="card-body">
                            {exportStore.isLoading ? <Loading/> :
                                <div className="table-responsive mt-4">
                                    {exportStore.listExport && exportStore.listExport.length > 0 ?
                                        <table className="table table-striped">
                                            <thead>
                                            <tr>
                                                <th><strong>Id</strong></th>
                                                <th><strong>Description</strong></th>
                                                <th><strong>CreatedAt</strong></th>
                                                <th><strong>UpdatedAt</strong></th>
                                                <th className="text-center"><strong>Action</strong></th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {exportStore.listExport.map((item, i) => (
                                                <tr key={i} className="position-relative">
                                                    <td width="10%">{item.id}</td>
                                                    <td width="20%">{item.description}</td>
                                                    <td>{item.createdAt}</td>
                                                    <td>{item.updatedAt}</td>
                                                    <td className="text-center">
                                                        <Link to={`/product/add-export`}>
                                                            <button type="button" onClick={() => productStore.getProductDetail(item.id)}
                                                                                                  className="btn btn-inverse-warning btn-icon">
                                                            <i className="fal fa-info"/>
                                                        </button></Link>
                                                    </td>
                                                </tr>
                                            ))}
                                            </tbody>
                                        </table>
                                        : <div className="p-5"> <NoContent/> </div> }
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ExportProduct;