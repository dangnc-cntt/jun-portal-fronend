import 'bootstrap-daterangepicker/daterangepicker.css';
import DateRangePicker from 'react-bootstrap-daterangepicker';
import React, {Component} from "react";
import {observer} from "mobx-react";

@observer
class DatePickerSingle extends Component<any, any>{

    constructor(props: any) {
        super(props);

        const today = new Date();
        const yesterday = new Date();
        yesterday.setDate(today.getDate() - 1);
        const pre7Day = new Date();
        pre7Day.setDate(today.getDate() - 6);
        const pre30Day = new Date();
        pre30Day.setDate(today.getDate() - 29);
        const pre6Month = new Date();
        pre6Month.setMonth(today.getMonth() - 6);
        this.state = {
            timeFilterText: '',
            ranges: {
                'Today': [today, today],
            },
        }

    }

    handleChangeTime = (event: any, picker: any) => {
        this.props.onChange(picker.startDate.format("YYYY-MM-DD"))
    };

    render() {

        return (
            <DateRangePicker
                initialSettings={{ singleDatePicker: true,
                    dateFormat: "YYYY-MM-DD",
                    locale: {format: 'YYYY-MM-DD',},
                    startDate: this.props.selected,
                    ranges: this.state.ranges,
                    minYear: 2021, autoApply: true
                }} onApply={this.handleChangeTime}>
                <input className="form-control"/>
            </DateRangePicker>
        )
    }

}

export default  DatePickerSingle;
