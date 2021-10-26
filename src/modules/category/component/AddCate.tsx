import React, {Component} from 'react';
import {observer} from "mobx-react";
import {categoryStore} from "../CategoryStore";


@observer
class AddCate extends Component {
    
    
    render() {
        return (
            <div className="modal fade" id="addCate" tabIndex={-1} role="dialog" aria-hidden="true">
                <div className="modal-dialog w-100 h-100 d-flex align-items-center justify-content-center m-0" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h3 className="mb-0">Add Category</h3>
                            <button type="button" id="close_add_cate" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="form-group">
                                <label>Avatar</label>
                                <input type="text"
                                       placeholder="Enter AvatarUrl"
                                       className="form-control"
                                       value={categoryStore.dataRequest.imageUrl}
                                       onChange={(e: any) => categoryStore.dataRequest.imageUrl = e.currentTarget.value}
                                />
                            </div>
                            <div className="form-group">
                                <label>Name</label>
                                <input type="text"
                                       placeholder="Enter name"
                                       className="form-control"
                                       value={categoryStore.dataRequest.name}
                                       onChange={(e: any) => categoryStore.dataRequest.name = e.currentTarget.value}
                                />
                            </div>
                            <div className="form-group">
                                <label>Description</label>
                                <input type="text"
                                       placeholder="Enter Description"
                                       className="form-control"
                                       value={categoryStore.dataRequest.description}
                                       onChange={(e: any) => categoryStore.dataRequest.description = e.currentTarget.value}
                                />
                            </div>
                            <div className="form-group">
                                <label>State</label>
                                <select className="form-control"
                                        value={categoryStore.dataRequest.state}
                                        onChange={(e: any) => categoryStore.dataRequest.state = e.currentTarget.value}>
                                    <option value="">Choose</option>
                                    <option value="ACTIVE">Active</option>
                                    <option value="NOT_ACTIVE">Not Active</option>
                                </select>
                            </div>
                        </div>
                        <div className="modal-footer border-top-0 pt-0">
                            <button type="button" className="btn" data-dismiss="modal">Cancel</button>
                            <button type="button" onClick={() => categoryStore.addCate()} className="btn btn-info">Create</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default AddCate;