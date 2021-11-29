import React, {Component} from 'react';
import {observer} from "mobx-react";
import {observable} from "mobx";
import {storage} from "../../../../common/firebase/firebase";
import {brandStore} from "../BrandStore";


@observer
class EditBrand extends Component {

    @observable images: any;
    handleChange = (e: any) => {
        if (e.target.files[0]) {
            this.images = e.target.files[0];
            this.handleUpload()
        }
    }

    handleUpload = () => {
        const uploadTask = storage.ref(`images/${this.images.name}`).put(this.images);
        uploadTask.on(
            "state_changed",
            snapshot => {
                const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
            },
            error => {
                console.log(error);
            },
            () => {
                storage
                    .ref("images")
                    .child(this.images.name)
                    .getDownloadURL()
                    .then(url => {
                        brandStore.dataRequest.logoUrl = url;
                    });
            }
        )
    }


    render() {
        return (
            <div className="modal fade" id="editBrand" tabIndex={-1} role="dialog" aria-hidden="true">
                <div className="modal-dialog w-100 h-100 d-flex align-items-center justify-content-center m-0" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h3 className="mb-0">Edit Brand</h3>
                            <button type="button" id="close_edit" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="form-group">
                                <label>Logo</label>
                                <img style={{width: 45, height: 45}} className="mr-4 ml-4" src={brandStore.dataRequest.logoUrl} alt=""/>
                                <input type="file" style={{width: 80, overflow: `hidden`}} className="mt-2"
                                       onChange={(e: any) => this.handleChange(e)}/>
                            </div>
                            <div className="form-group">
                                <label>Name</label>
                                <input type="text"
                                       placeholder="Enter name"
                                       className="form-control"
                                       value={brandStore.dataRequest.name}
                                       onChange={(e: any) => brandStore.dataRequest.name = e.currentTarget.value}
                                />
                            </div>
                            <div className="form-group">
                                <label>Description</label>
                                <input type="text"
                                       placeholder="Enter Description"
                                       className="form-control"
                                       value={brandStore.dataRequest.description}
                                       onChange={(e: any) => brandStore.dataRequest.description = e.currentTarget.value}
                                />
                            </div>
                        </div>
                        <div className="modal-footer border-top-0 pt-0">
                            <button type="button" className="btn" data-dismiss="modal">Cancel</button>
                            <button type="button" onClick={() => brandStore.editBrand()} className="btn btn-info">Update</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default EditBrand;