import React, {Component} from 'react';
import {observer} from "mobx-react";
import Loading from "../../common/component/Loading";
import NoContent from "../../common/component/NoContent";
import ReactPaginate from "react-paginate";
import {configStore} from "./ConfigStore";
import {requestUtils} from "../../common/utils/RequestUtil";

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
                                                <th><strong>Name</strong></th>
                                                <th className="text-center"><strong>Actions</strong></th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {configStore.listConfig.map((item, i) => (
                                                <tr key={i} className="position-relative">
                                                    <td>{item.id}</td>
                                                    <td><img src={item.imageUrl} alt=""/></td>
                                                    <td width="20%">{item.name}</td>
                                                    <td>{item.description}</td>
                                                    <td width="5%" className="text-center">
                                                        <div className="btn-group">
                                                            <button type="button" onClick={() => configStore.configDetail(item.key)} data-toggle="modal" data-target="#editConfig" className="btn btn-inverse-warning btn-icon">
                                                                <i className="fad fa-pen"/>
                                                            </button>
                                                            <button type="button"
                                                                    onClick={() => configStore.configKey = item.id}
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

                </div>
            </div>
        );
    }
}

export default Config;