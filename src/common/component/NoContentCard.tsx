import React, {Component} from 'react';
import NoContent from "./NoContent";


class NoContentCard extends Component<any, any> {
    render() {
        const {message} = this.props;
        return (
            <div className="content-wrapper">
                <div className="row">
                    <div className="col-lg-12 grid-margin stretch-card">
                        <div className="card">
                            <div className="card-body">
                                <NoContent message={message}/>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default NoContentCard;
