import React, {Component} from 'react';
import {observer} from "mobx-react";
import Loading from "../../../common/component/Loading";
import NoContent from "../../../common/component/NoContent";
import {colorStore} from "./ColorStore";
import AddColor from "./component/AddColor";
import DeleteColor from "./component/DeleteColor";
import {getLocalDateTime} from "../../../common/utils/Utils";


@observer
class Color extends Component {

    async componentDidMount() {
        await colorStore.getColor()
    }


    render() {
        return (
            <div className="product_color">
                <div className="content-wrapper">
                    <div className=" d-flex align-items-center justify-content-between mt-2 mb-3">
                        <div className="pl-2 pr-2 w-100 d-flex align-items-center justify-content-between">
                            <h3 className="mb-0">Color</h3>
                            <button type="button" className="btn btn-outline-info" data-toggle="modal" data-target="#addColor">Create</button>
                        </div>
                    </div>
                    <div className="card">
                        <div className="card-body">
                            {colorStore.isLoading ? <Loading/> :
                                <div className="table-responsive mt-4">
                                    {colorStore.listColor && colorStore.listColor.length > 0 ?
                                        <table className="table table-striped">
                                            <thead>
                                            <tr>
                                                <th><strong>Id</strong></th>
                                                <th><strong>Name</strong></th>
                                                <th><strong>CreatedAt</strong></th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {colorStore.listColor.map((item, i) => (
                                                <tr key={i} className="position-relative">
                                                    <td width="30%">{item.id}</td>
                                                    <td width="50%">{item.name}</td>
                                                    <td width="20%">{item.createdAt ? getLocalDateTime(item.createdAt, "dd/mm/yyyy") : "10/11/2021"}</td>
                                                </tr>
                                            ))}
                                            </tbody>
                                        </table>
                                        : <div className="p-5"> <NoContent/> </div> }
                                </div>
                            }
                        </div>
                    </div>
                    <AddColor/>
                    <DeleteColor/>
                </div>
            </div>
        );
    }
}

export default Color;