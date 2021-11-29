import React, {Component} from 'react';
import {number_format} from "../utils/Utils";
import {observer} from "mobx-react";
import {css} from "@emotion/core";




@observer
class Statistics extends Component<{data: any}, any> {

    render() {
        const item = this.props.data;
        if(item){
            return (
                <div className="statistics mb-4">
                    <div className="row justify-content-center">
                        <div className="col-md-2">
                            <div className="col-md-11 p-2 info_statistic" css={css_statistic}>
                                <h2 className="font-weight-light w-100 text-center text-black">{item.totalRequest && number_format(item.totalRequest)}</h2>
                                <div className="title d-flex justify-content-center align-items-center">
                                    <span>Request</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-2">
                            <div className="col-md-11 p-2 info_statistic" css={css_statistic} >
                                <h2 className="font-weight-light w-100 text-center text-black">{item.totalImpression && number_format(item.totalImpression)}</h2>
                                <div className="title d-flex justify-content-center align-items-center">
                                    <span>Impression</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-2">
                            <div className="col-md-11 p-2 info_statistic" css={css_statistic} >
                                <h2 className="font-weight-light w-100 text-center text-black">{item.totalClick && number_format(item.totalClick)}</h2>
                                <div className="title d-flex justify-content-center align-items-center">
                                    <span>Click-Through</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-2">
                            <div className="col-md-11 p-2 info_statistic" css={css_statistic} >
                                <h2 className="font-weight-light w-100 text-center text-black">{item.totalComplete && number_format(item.totalComplete)}</h2>
                                <div className="title d-flex justify-content-center align-items-center">
                                    <span>Complete</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        } else return true
    }
}

export default Statistics;

const css_statistic = css`
  width: 240px !important;
`