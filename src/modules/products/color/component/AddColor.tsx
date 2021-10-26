import React, {Component} from 'react';
import {observer} from "mobx-react";
import {colorStore} from "../ColorStore";


@observer
class AddColor extends Component {
    
    
    render() {
        return (
            <div className="modal fade" id="addColor" tabIndex={-1} role="dialog" aria-hidden="true">
                <div className="modal-dialog w-100 h-100 d-flex align-items-center justify-content-center m-0" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h3 className="mb-0">Add Color</h3>
                            <button type="button" id="close_add_color" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="form-group">
                                <label>Name</label>
                                <input type="text"
                                       placeholder="Enter name"
                                       className="form-control"
                                       value={colorStore.dataRequest.name}
                                       onChange={(e: any) => colorStore.dataRequest.name = e.currentTarget.value}
                                />
                            </div>
                        </div>
                        <div className="modal-footer border-top-0 pt-0">
                            <button type="button" className="btn" data-dismiss="modal">Cancel</button>
                            <button type="button" onClick={() => colorStore.addColor()} className="btn btn-info">Create</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default AddColor;