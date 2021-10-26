import React, {Component} from 'react';
import {observer} from "mobx-react";
import Loading from "../../../common/component/Loading";
import NoContent from "../../../common/component/NoContent";
import {sizeStore} from "./SizeStore";
import AddSize from "./component/AddSize";
import DeleteSize from "./component/DeleteSize";


@observer
class Size extends Component {

    async componentDidMount() {
        await sizeStore.getSize()
    }

    render() {
        return (
            <div className="product_size">
                <div className="content-wrapper">
                    <div className=" d-flex align-items-center justify-content-between mt-2 mb-3">
                        <div className="pl-2 pr-2 w-100 d-flex align-items-center justify-content-between">
                            <h3 className="mb-0">Size</h3>
                            <button type="button" className="btn btn-outline-info" data-toggle="modal" data-target="#addSize">Create</button>
                        </div>
                    </div>
                    <div className="card">
                        <div className="card-body">
                            {sizeStore.isLoading ? <Loading/> :
                                <div className="table-responsive mt-4">
                                    {sizeStore.listSize && sizeStore.listSize.length > 0 ?
                                        <table className="table table-striped">
                                            <thead>
                                            <tr>
                                                <th><strong>Id</strong></th>
                                                <th><strong>Name</strong></th>
                                                {/*<th className="text-center"><strong>Actions</strong></th>*/}
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {sizeStore.listSize.map((item, i) => (
                                                <tr key={i} className="position-relative">
                                                    <td width="18%">{item.id}</td>
                                                    <td width="40%">{item.name}</td>
                                                    {/*<td width="5%" className="text-center">*/}
                                                    {/*    <div className="btn-group">*/}
                                                    {/*        <button type="button"*/}
                                                    {/*                onClick={() => sizeStore.sizeId = item.id}*/}
                                                    {/*                className="btn btn-inverse-danger btn-icon"*/}
                                                    {/*                data-toggle="modal" data-target="#deleteSize">*/}
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
                    <AddSize/>
                    <DeleteSize/>
                </div>
            </div>
        );
    }
}

export default Size;