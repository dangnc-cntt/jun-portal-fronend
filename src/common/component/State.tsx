import React, {Component} from 'react';
import {css} from "@emotion/core";


export enum IState {
    NEW = "NEW",
    ACTIVE = "ACTIVE",
    ACTIVATED = "ACTIVATED",
    COMING = "COMING",
    COMPLETED = "COMPLETED"
}

class Status extends Component<{ state: string }, any> {

    status(state: string) {
        switch (state) {
            case IState.NEW:
                return <span css={css_} className="btn-danger state_new">Inactive</span>;
                break;
            case IState.ACTIVE:
                return <span css={css_} className="btn-success state_active">Active</span>;
            case IState.COMING:
                return <span css={css_} className="btn-info state_active">Coming</span>;
                break;
            case IState.ACTIVATED:
                return <span css={css_} className="btn-success state_active">Activated</span>;
                break;
            case IState.COMPLETED:
                return <span css={css_} className="btn-info state_active">Completed</span>;
                break;
        }
    }

    render() {
        return this.status(this.props.state)
    }
}

export default Status;

const css_ = css`
    width: 80px;
    height: 35px;
    display: flex;
    border-radius: 4px;
    font-size: 14px;
    align-items: center;
    justify-content: center;
    padding: 0px 8px !important;
`;


