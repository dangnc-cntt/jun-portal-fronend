import React, {Component} from 'react';
import {observable} from "mobx";
import {storage} from "../../common/firebase/firebase";
import {configStore} from "./ConfigStore";
import {observer} from "mobx-react";


@observer
class EditConfig extends Component {
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
                        configStore.dataInfo.value.push(url);
                    });
            }
        )
    }


    render() {
        if(configStore.dataInfo){
            return (
                <div className="modal fade" id="editConfig" tabIndex={-1} role="dialog" aria-hidden="true">
                    <div className="modal-dialog w-100 h-100 d-flex align-items-center justify-content-center m-0" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h3 className="mb-0">Edit Config</h3>
                                <button type="button" id="close_edit" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="form-group">
                                    <label>Key</label>
                                    <input type="text"
                                           placeholder="Enter name"
                                           className="form-control"
                                           value={configStore.dataInfo.key}
                                           onChange={(e: any) => configStore.dataInfo.key = e.currentTarget.value}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Type</label>
                                    <select value={configStore.dataInfo.type} onChange={(e: any) => configStore.dataInfo.type = e.currentTarget.value} className="form-control">
                                        <option>Choose Type</option>
                                        {["BANNER", "STRING", "BOOLEAN", "INTEGER"].map((item) => {
                                            return <option value={item}>{item}</option>
                                        })}
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Value</label>
                                    <div className="d-flex">
                                        {configStore.dataInfo.value && configStore.dataInfo.value.map((value: any, i: number) => {
                                            return <div className="position-relative mr-2">
                                                <img style={{width: 80, height: 40}} className="mr-2 ml-2"
                                                     src={value} key={i} alt=""/>
                                                <i className="fal fa-times" css={i} onClick={() => configStore.dataInfo.value.splice(i, 1)}/>
                                            </div>
                                        })}
                                    </div>
                                    <input type="file" style={{width: 84, overflow: `hidden`}} className="mt-2"
                                           onChange={(e: any) => this.handleChange(e)}/>
                                </div>
                            </div>
                            <div className="modal-footer border-top-0 pt-0">
                                <button type="button" className="btn" data-dismiss="modal">Cancel</button>
                                <button type="button" onClick={() => configStore.editConfig()} className="btn btn-info">Update</button>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }else return true
    }
}

export default EditConfig;