import React, {Component} from "react";
import {observer} from "mobx-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface DateSingleProps {
    selected?: Date,
    minDate?: Date,
    disabled?: boolean,
    onChange?: any,
    format?: any,
    timePicker?: boolean
}

@observer
class DateSingle extends Component<DateSingleProps, any>{

    constructor(props: DateSingleProps) {
        super(props);
    }

    handleChangeTime = (date: Date, event: any) => {
        this.props.onChange(date)
    };

    render() {

        return (
            <DatePicker
                showTimeSelect={this.props.timePicker ? this.props.timePicker : false}
                selected={this.props.selected != null ? this.props.selected : new Date()}
                minDate={this.props.minDate}
                disabled={this.props.disabled}
                dateFormat={this.props.format ? this.props.format : "yyyy-MM-dd"}
                onChange={this.handleChangeTime}/>
        )
    }

}

export default  DateSingle;