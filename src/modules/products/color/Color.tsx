import React, {Component} from 'react';
import {observer} from "mobx-react";
import Loading from "../../../common/component/Loading";
import NoContent from "../../../common/component/NoContent";
import {colorStore} from "./ColorStore";
import AddColor from "./component/AddColor";
import DeleteColor from "./component/DeleteColor";


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
                                                {/*<th className="text-center"><strong>Actions</strong></th>*/}
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {colorStore.listColor.map((item, i) => (
                                                <tr key={i} className="position-relative">
                                                    <td width="18%">{item.id}</td>
                                                    <td width="40%">{item.name}</td>
                                                    {/*<td width="5%" className="text-center">*/}
                                                    {/*    <div className="btn-group">*/}
                                                    {/*        <button type="button"*/}
                                                    {/*                onClick={() => colorStore.colorId = item.id}*/}
                                                    {/*                className="btn btn-inverse-danger btn-icon"*/}
                                                    {/*                data-toggle="modal" data-target="#deleteColor">*/}
                                                    {/*            <i className="far fa-trash-alt"/>*/}
                                                    {/*        </button>*/}
                                                    {/*    </div>*/}
                                                    {/*</td>*/}
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