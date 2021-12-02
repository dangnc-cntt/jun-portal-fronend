import React, {Component} from 'react';
import {observer} from "mobx-react";
import Loading from "../../common/component/Loading";
import NoContent from "../../common/component/NoContent";
import ReactPaginate from "react-paginate";
import {configStore} from "./ConfigStore";
import {requestUtils} from "../../common/utils/RequestUtil";
import {categoryStore} from "../category/CategoryStore";
import AddConfig from "./AddConfig";
import EditConfig from "./EditConfig";
import DeleteConfig from "./DeleteConfig";

@observer
class Config extends Component {

    async componentDidMount() {
        await configStore.getConfig()
    }

    handlePageClick = async (data: any) => {
        let selected: number = data.selected;
        configStore.page = selected;
        requestUtils.saveQueryParam(this.props, {page: configStore.page});
        await configStore.getConfig()
    };

    render() {
        return (
            <div className="config">
                <div className="content-wrapper">
                    <div className=" d-flex align-items-center justify-content-between mt-2 mb-3">
                        <div className="pl-2 pr-2 w-100 d-flex align-items-center justify-content-between">
                            <h3 className="mb-0">Config</h3>
                            <button type="button" className="btn btn-outline-info" data-toggle="modal" data-target="#addConfig">Create</button>
                        </div>
                    </div>
                    <div className="card">
                        <div className="card-body">
                            {configStore.isLoading ? <Loading/> :
                                <div className="table-responsive mt-4">
                                    {configStore.listConfig && configStore.listConfig.length > 0 ?
                                        <table className="table table-striped">
                                            <thead>
                                            <tr>
                                                <th><strong>Id</strong></th>
                                                <th><strong>Key</strong></th>
                                                <th><strong>Value</strong></th>
                                                <th><strong>Type</strong></th>
                                                <th/>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {configStore.listConfig.map((item, i) => (
                                                <tr key={i} className="position-relative">
                                                    <td>{item.id}</td>
                                                    <td>{item.key}</td>
                                                    <td>{item.type === "BANNER" ?
                                                        (item.value.split(',').map((val: any, i: number) => {
                                                            return <img className="mr-2" style={{width: 80, height: 40, borderRadius: 4}} src={val} key={i} alt=""/>
                                                        }))
                                                        : item.value}</td>
                                                    <td>{item.type}</td>
                                                    <td width="5%" className="text-center">
                                                        <div className="btn-group">
                                                            <button type="button" data-toggle="modal" data-target="#editConfig" onClick={() => configStore.configDetail(item.key)} className="btn btn-inverse-warning btn-icon">
                                                                <i className="fad fa-pen"/>
                                                            </button>
                                                            <button  onClick={() => configStore.key = item.key}
                                                                      className="btn btn-inverse-danger btn-icon"
                                                                      data-toggle="modal" data-target="#deleteConfig">
                                                                <i className="far fa-trash-alt"/>
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                            </tbody>
                                        </table>
                                        : <div className="p-5"> <NoContent/> </div> }
                                </div>
                            }
                            <div className="pagination mt-3">
                                {configStore.totalPages > 1 && <ReactPaginate
                                    previousLabel={'Previous'} nextLabel={'Next'} breakLabel={'...'}
                                    breakClassName={'break-me'}
                                    pageCount={configStore.totalPages}
                                    forcePage={configStore.page} marginPagesDisplayed={2}
                                    pageRangeDisplayed={5}
                                    onPageChange={this.handlePageClick} containerClassName={'pagination'}
                                    pageClassName={'paginate_button page-item'} pageLinkClassName={'page-link'}
                                    activeClassName={'active'}
                                    previousClassName={'paginate_button page-item previous'}
                                    previousLinkClassName={'page-link'}
                                    nextClassName={'paginate_button page-item next'} nextLinkClassName={'page-link'}
                                />}
                            </div>
                        </div>
                    </div>
                    <AddConfig/>
                    <EditConfig/>
                    <DeleteConfig/>
                </div>
            </div>
        );
    }
}

export default Config;