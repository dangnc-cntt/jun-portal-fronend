import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {commonStore} from "../../modules/layouts/CommonStore";
import {css} from "@emotion/core";

class Breadcrumbs extends Component<any> {
    render() {
        return (
            <nav aria-label="breadcrumb">
                <ol css={border} className="breadcrumb bg-inverse-info mb-0 pl-0">
                    {commonStore.breadScrumList.map((item, i) => {
                        if (item.link == "#") {
                            return <li css={css_bg} key={i} className="breadcrumb-item active" aria-current="page">
                                <span>{item.name}</span></li>
                        } else {
                            return (
                                <li css={css_bg} key={i} className="breadcrumb-item pl-0"><Link
                                    to={item.link}>{item.name}</Link></li>
                            )
                        }

                    })}
                </ol>
            </nav>
        );
    }
}

export default Breadcrumbs;

const border = css`
border: none !important;
background-color: transparent !important;
`;

const css_bg = css`
background-color: transparent !important;

`;
