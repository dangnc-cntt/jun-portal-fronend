import 'bootstrap-daterangepicker/daterangepicker.css';
import DateRangePicker from 'react-bootstrap-daterangepicker';
import React, {Component} from "react";
import {observer} from "mobx-react";



@observer
class DatePickerSingle extends Component<any, any>{


    handleChangeTime = (event: any, picker: any) => {
        this.props.onChange(picker.startDate.format(this.props.format ? this.props.format : 'YYYY/MM/DD'))
    };

    render() {

        return (
            <DateRangePicker
                initialSettings={{ singleDatePicker: true,
                    timePicker: this.props.timePicker ? this.props.timePicker : false,
                    dateFormat: this.props.format ? this.props.format : 'YYYY/MM/DD',
                    locale: {format: this.props.format ? this.props.format : 'YYYY/MM/DD'},
                    startDate: this.props.selected,
                    minYear: 2021, autoApply: true
                }} onApply={this.handleChangeTime}>
                <input className="form-control" placeholder={this.props.format ? this.props.format : 'YYYY/MM/DD'}/>
            </DateRangePicker>
        )
    }

}

export default DatePickerSingle;
