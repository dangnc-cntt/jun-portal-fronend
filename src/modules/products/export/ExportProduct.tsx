import React, {Component} from 'react';
import {observer} from "mobx-react";
import Loading from "../../../common/component/Loading";
import NoContent from "../../../common/component/NoContent";
import {exportStore} from "./ExportStore";


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
                            <button type="button" className="btn btn-outline-info" data-toggle="modal" data-target="#addExport">Create</button>
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
                                                <th><strong>Name</strong></th>
                                                <th><strong>Description</strong></th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {exportStore.listExport.map((item, i) => (
                                                <tr key={i} className="position-relative">
                                                    <td width="18%">{item.id}</td>
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