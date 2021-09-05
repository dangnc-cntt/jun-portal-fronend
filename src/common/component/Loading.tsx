import React, {Component} from 'react';


class Loading extends Component<any, any> {
    render() {
        return (
            <div className="dot-opacity-loader my-5">
                <span className="text-info"/>
                <span className="text-info"/>
                <span className="text-info"/>
            </div>
        )
    }
}

export default Loading;
