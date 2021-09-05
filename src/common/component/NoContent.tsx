import React, {Component} from 'react';


class NoContent extends Component<any, any> {
    render() {
        return (
            <h6 className="w-100 text-center p-5">{this.props.message ? this.props.message : 'No Content'}</h6>
        )
    }
}

export default NoContent;
